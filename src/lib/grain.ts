/**
 * Drawn redwood grain, generated as SVG at build time.
 *
 * Why this exists at all: Agwood owns no photographs of itself, and the trade
 * draws grain rather than photographing it — a grade rule book or a wood-anatomy
 * plate renders it as ink. Drawing it is both more honest (we are not claiming a
 * picture of someone else's yard is theirs) and unlike every other lumber site,
 * which uses a brown photographic tile.
 *
 * Why build time: the stack is zero-JavaScript by default. Every function here
 * runs during `astro build` and what ships to the browser is static SVG markup.
 * Nothing in this file reaches the client.
 *
 * The PRNG is seeded and deterministic on purpose. An unseeded generator would
 * emit different geometry on every build, so every deploy would show a diff in
 * files nobody edited and no two environments would render the same page.
 */

/** Mulberry32. Small, fast, and — the only property that matters here — stable. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A few summed sines standing in for noise, so grain wanders instead of ruling. */
function wave(seed: number, octaves = 3): (t: number) => number {
  const r = rng(seed);
  const parts = Array.from({ length: octaves }, (_, i) => ({
    f: 0.4 + r() * 1.2,
    p: r() * Math.PI * 2,
    a: (0.35 + r() * 0.65) / (i + 1),
  }));
  return (t) => parts.reduce((s, o) => s + o.a * Math.sin(o.f * t * Math.PI * 2 + o.p), 0);
}

export interface VerticalGrainOptions {
  width?: number; height?: number;
  /** Line count across the width. The trade measures redwood in rings per inch,
   *  so this is the knob that carries meaning: denser reads as higher grade. */
  rpi?: number;
  seed?: number; amp?: number; stroke?: number; steps?: number;
}

/** Quartersawn (vertical) grain: near-parallel lines, irregularly spaced. */
export function verticalGrain(o: VerticalGrainOptions = {}) {
  const { width: w = 1400, height: h = 34, rpi = 40, seed = 7, amp = 1.6, stroke = 0.9, steps = 6 } = o;
  const r = rng(seed);
  const out: { d: string; op: number; sw: number }[] = [];
  const xs: number[] = [];
  const spacings = [0.45, 0.6, 0.75, 0.9, 1.0, 1.1, 1.35];
  for (let x = 0; x < w; ) {
    x += (w / rpi) * spacings[Math.floor(r() * spacings.length)]!;
    xs.push(x);
  }
  xs.forEach((x0, i) => {
    const f = wave(seed * 991 + i);
    const pts: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      pts.push(`${(x0 + f(t) * amp).toFixed(2)} ${(t * h).toFixed(2)}`);
    }
    out.push({ d: `M ${pts[0]} ${pts.slice(1).map((p) => `L ${p}`).join(' ')}`,
               op: 0.3 + 0.55 * r(), sw: stroke * (0.6 + 0.9 * r()) });
  });
  return out;
}

export interface CathedralOptions {
  width?: number; height?: number; rings?: number; seed?: number;
  /** Horizontal position of the pith, 0..1 of the width. */
  pith?: number;
  /** Vertical exaggeration. A board face is a TANGENTIAL cut through the log, so
   *  each ring shows as an arc elongated along the board. At 1.0 you get end grain
   *  — concentric circles, a different cut and a different picture entirely. The
   *  elongation is what makes this read as a board face rather than a log end. */
  stretch?: number;
  r0?: number; gapf?: number; tight?: number; latefrac?: number;
  lo?: number; hi?: number; steps?: number;
}

/**
 * The cathedral figure, as FILLED LATEWOOD BANDS rather than stroked contours.
 *
 * This distinction is the entire component. A growth ring is not a line: it is a
 * pale earlywood zone followed by a dense dark latewood band, and it is that
 * alternation the eye reads as wood. Drawing ring boundaries as hairlines yields
 * an accurate contour map of a board that does not look like a board — four
 * rounds of parameter tuning failed to fix that during design, because the
 * representation was wrong rather than the values. If this ever looks wrong
 * again, check what is being drawn before changing any number below.
 */
export function cathedralBands(o: CathedralOptions = {}) {
  const { width: w = 1400, height: h = 480, rings = 32, seed = 21, pith = 0.5,
          stretch = 2.15, r0 = 0.06, gapf = 0.07, tight = 0.38, latefrac = 0.3,
          lo = 0.14, hi = 0.62, steps = 200 } = o;
  const r = rng(seed);
  const cx = w * pith, cy = h * 1.02;
  const f = wave(seed * 17, 2);
  const out: { pts: [number, number][]; op: number }[] = [];
  let rad = h * r0;

  for (let i = 0; i < rings; i++) {
    // Spacing narrows outward, which is the fact the whole direction rests on:
    // tight rings mean slow growth mean better wood.
    const gap = h * gapf * (1 - tight * (i / Math.max(1, rings - 1))) * (0.62 + r() * 0.8);
    rad += Math.max(4, gap);
    const t = Math.max(2, gap * latefrac * (0.55 + r() * 0.95));
    const ri = rad - t;
    if (ri <= 2) continue;

    // Each contiguous visible stretch becomes its own polygon. A ring whose crown
    // is above the frame must break into two separate legs; joining them would
    // draw a straight line across the top of the frame, which reads as a stray
    // rule rather than as wood.
    const runs: [number, number, number][][] = [];
    let cur: [number, number, number][] = [];
    const flush = () => { if (cur.length) { runs.push(cur); cur = []; } };

    for (let s = 0; s <= steps; s++) {
      const tt = s / steps;
      const dx = tt * w - cx;
      const a = rad * rad - dx * dx;
      if (a <= 0) { flush(); continue; }
      const wob = f(tt) * 2;
      const yo = cy - Math.sqrt(a) * stretch + wob;
      const b = ri * ri - dx * dx;
      const yi = b > 0 ? cy - Math.sqrt(b) * stretch + wob : cy + 40;
      if ((yo > h + 40 && yi > h + 40) || yi < 0) { flush(); continue; }
      cur.push([dx + cx, Math.max(yo, -2), Math.min(yi, h + 40)]);
    }
    flush();

    const k = i / Math.max(1, rings - 1);
    // Per-band density jitter. A real board has heavy latewood years and faint
    // ones; a uniform ramp is what makes generated grain look printed, not grown.
    const op = Math.max(0.05, Math.min(0.95, (lo + (hi - lo) * Math.pow(1 - k, 1.2)) * (0.55 + r() * 0.9)));
    for (const q of runs) {
      if (q.length < 3) continue;
      const pts: [number, number][] = [
        ...q.map(([x, aY]) => [x, aY] as [number, number]),
        ...[...q].reverse().map(([x, , bY]) => [x, bY] as [number, number]),
      ];
      out.push({ pts, op });
    }
  }
  return out;
}

const open = (w: number, h: number, par: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" ` +
  `preserveAspectRatio="${par}" aria-hidden="true" focusable="false">`;

/** Stroked grain (the bands between sections). */
export function verticalGrainSvg(o: VerticalGrainOptions & { color?: string } = {}) {
  const { width: w = 1400, height: h = 34, color = 'var(--grain)' } = o;
  const paths = verticalGrain(o);
  return open(w, h, 'none') +
    `<g fill="none" stroke="${color}" stroke-linecap="round">` +
    paths.map((p) => `<path d="${p.d}" stroke-opacity="${p.op.toFixed(3)}" stroke-width="${p.sw.toFixed(2)}"/>`).join('') +
    '</g></svg>';
}

/**
 * The vault.
 *
 * `xMidYMin slice` rather than `none` is load-bearing: `none` scales the two axes
 * independently, which squashes the arches flat on any viewport whose aspect
 * differs from the viewBox and destroys the figure. `slice` keeps the proportions
 * and crops instead, anchored to the top so a narrow phone loses the outer edges
 * and keeps the apexes, which are the subject.
 */
export function cathedralSvg(o: CathedralOptions & { color?: string; par?: string } = {}) {
  const { width: w = 1400, height: h = 480, color = 'var(--grain)', par = 'xMidYMin slice' } = o;
  const bands = cathedralBands(o);
  return open(w, h, par) + `<g fill="${color}">` +
    bands.map((b) => `<path d="M ${b.pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')} Z" ` +
                     `fill-opacity="${b.op.toFixed(3)}"/>`).join('') +
    '</g></svg>';
}
