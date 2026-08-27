/**
 * Trace the Agwood emblem from the delivered logo raster into vector paths.
 *
 * DEV-TIME ONLY. Nothing here runs during `astro build` and nothing reaches the
 * browser; it exists so the SVG in src/components/Emblem.astro is reproducible
 * rather than being an opaque blob somebody pasted in once. Run it again if the
 * client ever supplies a better logo file:
 *
 *   node scripts/trace-emblem.mjs
 *
 * WHY A TRACE AND NOT A HAND REDRAW. `AML-logo.png` is a 784px scan holding 46,015
 * distinct colours in what should be a two-colour mark, so it cannot be colour-picked
 * and it bands if reproduced large. Its ALPHA channel, however, is clean — measured
 * at 2 ink components, 1 enclosed counter (the A's) and zero speckles under 20px. The
 * silhouette is sound even though the colour is noise, which is exactly what makes a
 * mechanical trace of the alpha honest: it is a transform of the supplied asset, not
 * a new mark invented on the client's behalf.
 *
 * The one thing this script must do beyond tracing is REMOVE THE SCAN WOBBLE. A
 * faithful trace of a scan reproduces its ragged edges as vector, which buys nothing.
  * The simplify pass keeps shape fidelity — at the sizes this mark is actually used
 * straight, because this mark is geometric — stacked triangles and chunky letterforms.
 */

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { optimize } from 'svgo';

const SRC = 'AML-logo.png';
const ALPHA_THRESHOLD = 127;

/** Douglas–Peucker tolerance, in source pixels. Tuned against the 691px-wide emblem:
 *  the scan's edge wobble measures 2–4px, so this sits just above it. Raising it
 *  starts clipping the conifers' branch notches, which are shallow to begin with and
 *  are the first detail to disappear (see the 64px legibility floor in PRODUCT.md). */
const SIMPLIFY = Number(process.env.SIMPLIFY ?? 0.6);

// ── Load alpha ───────────────────────────────────────────────────────────────
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, CH = info.channels;
const alphaAt = (x, y) => data[(y * W + x) * CH + (CH - 1)];

/**
 * Crop away the wordmark.
 *
 * The mark separates into an emblem and a wordmark divided by a band of empty rows.
 * That band is DETECTED rather than hard-coded: the row numbers recorded in
 * PRODUCT.md were measured on a differently sized copy of this file, and a hard-coded
 * crop silently produces a wrong emblem the day the source is re-exported.
 *
 * The wordmark is never used — the company name is set in live type so it is
 * selectable, crisp at every density, and not pushed through a lossy scan.
 */
const rowHasInk = (y) => {
  for (let x = 0; x < W; x++) if (alphaAt(x, y) > ALPHA_THRESHOLD) return true;
  return false;
};
const inkRows = [];
for (let y = 0; y < H; y++) inkRows.push(rowHasInk(y));

// Walk up from the bottom: skip the wordmark's own rows, then find the empty band.
let y = H - 1;
while (y >= 0 && !inkRows[y]) y--;          // trailing blank rows
while (y >= 0 && inkRows[y]) y--;           // the wordmark itself
const gapBottom = y;
while (y >= 0 && !inkRows[y]) y--;          // the dividing band
const emblemBottom = y;                     // last row of the emblem
if (emblemBottom < 0) throw new Error('Could not find the emblem/wordmark divider.');
console.log(`divider band rows ${y + 1}..${gapBottom}; emblem ends at row ${emblemBottom}`);

// Tight bounds of the emblem itself.
let x0 = W, x1 = -1, y0 = H, y1 = -1;
for (let yy = 0; yy <= emblemBottom; yy++) {
  for (let xx = 0; xx < W; xx++) {
    if (alphaAt(xx, yy) > ALPHA_THRESHOLD) {
      if (xx < x0) x0 = xx; if (xx > x1) x1 = xx;
      if (yy < y0) y0 = yy; if (yy > y1) y1 = yy;
    }
  }
}
const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
console.log(`emblem bounds ${bw}×${bh} at (${x0},${y0})`);

const solid = (x, y) =>
  x >= 0 && y >= 0 && x < bw && y < bh && alphaAt(x + x0, y + y0) > ALPHA_THRESHOLD;

// ── Crack following ──────────────────────────────────────────────────────────
/**
 * Walk the boundary between solid and empty pixels along the integer lattice.
 *
 * Chosen over marching squares because the source is a hard-thresholded raster, so
 * every true contour is an axis-aligned staircase anyway; following the cracks gives
 * those staircases exactly, with no interpolation guesswork, and the simplify pass
 * below is what turns them back into clean lines. Every edge is emitted with the
 * solid side on a consistent hand, so outer contours and the counter come out wound
 * oppositely — though `fill-rule="evenodd"` on the output means winding is not load
 * bearing.
 */
const key = (x, y) => `${x},${y}`;
const out = new Map(); // vertex -> array of destination vertices
const addEdge = (ax, ay, bx, by) => {
  const k = key(ax, ay);
  if (!out.has(k)) out.set(k, []);
  out.get(k).push([bx, by]);
};

for (let yy = 0; yy < bh; yy++) {
  for (let xx = 0; xx < bw; xx++) {
    if (!solid(xx, yy)) continue;
    if (!solid(xx, yy - 1)) addEdge(xx, yy, xx + 1, yy);             // top
    if (!solid(xx + 1, yy)) addEdge(xx + 1, yy, xx + 1, yy + 1);     // right
    if (!solid(xx, yy + 1)) addEdge(xx + 1, yy + 1, xx, yy + 1);     // bottom
    if (!solid(xx - 1, yy)) addEdge(xx, yy + 1, xx, yy);             // left
  }
}

const loops = [];
for (const [startKey, dests] of out) {
  while (dests.length) {
    const loop = [];
    let [cx, cy] = startKey.split(',').map(Number);
    let next = dests.pop();
    loop.push([cx, cy]);
    while (next) {
      const [nx, ny] = next;
      if (nx === Number(startKey.split(',')[0]) && ny === Number(startKey.split(',')[1])) break;
      loop.push([nx, ny]);
      const list = out.get(key(nx, ny));
      if (!list || !list.length) break;
      // At a vertex where two diagonal corners touch there are two ways out. Take the
      // last added, which keeps the walk local instead of jumping across the shape.
      next = list.pop();
    }
    if (loop.length > 7) loops.push(loop);
  }
}
console.log(`traced ${loops.length} closed loop(s): ${loops.map((l) => l.length).join(', ')} points`);

// ── Simplify ─────────────────────────────────────────────────────────────────
const perpDist = (p, a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const d = Math.hypot(dx, dy);
  if (d === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / d;
};
function douglasPeucker(pts, tol) {
  if (pts.length < 3) return pts;
  let maxD = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perpDist(pts[i], pts[0], pts[pts.length - 1]);
    if (d > maxD) { maxD = d; idx = i; }
  }
  if (maxD <= tol) return [pts[0], pts[pts.length - 1]];
  return [
    ...douglasPeucker(pts.slice(0, idx + 1), tol).slice(0, -1),
    ...douglasPeucker(pts.slice(idx), tol),
  ];
}
/** A closed ring has no natural endpoints, so simplifying it as an open polyline
 *  pins whichever arbitrary point the trace happened to start on. Rotating the ring
 *  to its most extreme point first puts the seam on a real corner instead. */
function simplifyRing(ring, tol) {
  let far = 0, best = -Infinity;
  const cx = ring.reduce((s, p) => s + p[0], 0) / ring.length;
  const cy = ring.reduce((s, p) => s + p[1], 0) / ring.length;
  ring.forEach((p, i) => {
    const d = Math.hypot(p[0] - cx, p[1] - cy);
    if (d > best) { best = d; far = i; }
  });
  const rot = [...ring.slice(far), ...ring.slice(0, far)];
  const simplified = douglasPeucker([...rot, rot[0]], tol);
  simplified.pop();
  return simplified;
}

const rings = loops.map((l) => simplifyRing(l, SIMPLIFY)).filter((r) => r.length >= 3);
rings.sort((a, b) => Math.abs(area(b)) - Math.abs(area(a)));
function area(r) {
  let s = 0;
  for (let i = 0; i < r.length; i++) {
    const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % r.length];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
}
console.log(`simplified to: ${rings.map((r) => r.length).join(', ')} points  (total ${rings.reduce((s, r) => s + r.length, 0)})`);

// ── Emit ─────────────────────────────────────────────────────────────────────
/** viewBox is the emblem's own tight bounds, so the SVG carries no built-in padding
 *  and callers size it purely with height — the same contract the raster had. */
const r2 = (n) => Math.round(n * 100) / 100;
const rawD = rings
  .map((r) => `M${r.map(([x, yv]) => `${r2(x)} ${r2(yv)}`).join('L')}Z`)
  .join('');

const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${bw} ${bh}"><path d="${rawD}"/></svg>`;
const { data: optSvg } = optimize(rawSvg, {
  multipass: true,
  floatPrecision: 1,
});
const d = optSvg.match(/ d="([^"]+)"/)[1];
console.log(`path data: ${rawD.length} B raw -> ${d.length} B optimised`);

const component = `---
/**
 * The Agwood emblem, as vector.
 *
 * GENERATED — do not hand-edit the path below. Run \`node scripts/trace-emblem.mjs\`
 * to regenerate it from \`AML-logo.png\`; that script carries the reasoning for how
 * the trace is taken and why it is taken from the alpha channel rather than the
 * colour data.
 *
 * This replaces \`emblem-white.png\`. The raster was a ${bw}px-wide crop of a scan
 * being rendered at 64px, so its edge wobble was visible on any retina display, and
 * it could not be enlarged at all — the logo file holds 46,015 distinct colours in
 * what should be a two-colour mark and bands when reproduced large.
 *
 * DECORATIVE BY DEFAULT. The company name is set beside this in live type, so the
 * mark is \`aria-hidden\` unless a caller passes \`title\` — announcing "Agwood Mill &
 * Lumber" twice in a row is worse than not announcing the logo at all.
 *
 * The 64px legibility floor still applies. It was measured on the raster at 44, 56,
 * 64, 72 and 88, and below 64 the conifer branches merge into a blob — that is the
 * mark's own geometry, not a resolution problem, so going vector does not lift it.
 */
interface Props {
  /** Rendered height in px. Do not go below 64 — see above. */
  height?: number;
  /** Supply only where the mark is the sole naming of the company. */
  title?: string;
  class?: string;
}
const { height = 64, title, class: cls } = Astro.props;
const width = Math.round((height * ${bw}) / ${bh});
---
<svg
  class={cls}
  width={width}
  height={height}
  viewBox="0 0 ${bw} ${bh}"
  fill="currentColor"
  fill-rule="evenodd"
  role={title ? 'img' : undefined}
  aria-hidden={title ? undefined : 'true'}
  focusable="false"
  xmlns="http://www.w3.org/2000/svg"
>{title && <title>{title}</title>}<path d="${d}" /></svg>
`;

await writeFile('src/components/Emblem.astro', component);
console.log(`wrote src/components/Emblem.astro (${component.length} B)`);
