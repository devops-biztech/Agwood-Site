/**
 * The reach map, generated as SVG at build time.
 *
 * Nothing here reaches the browser — every function runs during `astro build` and
 * the page receives static markup, which is what keeps the site at zero runtime
 * JavaScript.
 *
 * Why a map at all: a lumber buyer thinks in logistics before they think in
 * grades. "How far is this mill from my yard" is a question we can answer exactly,
 * with real coordinates, on a site that can answer very few questions exactly.
 */
import { PLACES, CALIFORNIA_NORTH, type Place } from '../data/geography.ts';

/** Great-circle distance. Straight-line, not road miles — the caption says so. */
export function haversineMiles(a: Place, b: Place): number {
  const R = 3958.8;
  const p1 = (a.lat * Math.PI) / 180;
  const p2 = (b.lat * Math.PI) / 180;
  const dp = p2 - p1;
  const dl = ((b.lon - a.lon) * Math.PI) / 180;
  const x = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export interface MapOptions { width?: number; height?: number; padding?: number; }

export interface ReachMap {
  svg: string;
  /**
   * How far in from the figure's left edge the state's bottom-left corner sits,
   * as a percentage of the rendered width. The caption is indented by this so it
   * starts under the base of the state rather than under the westernmost point of
   * the coastline, which is several hundred miles further out and reads as a
   * misalignment. Derived from the geometry, so it stays correct if the clip
   * latitude or the outline ever changes.
   */
  captionInset: string;
}

/**
 * Colours are emitted as inline `style` declarations, never as SVG presentation
 * attributes.
 *
 * This is not a preference. A browser does not perform custom-property
 * substitution inside a presentation attribute, so `fill="var(--map-land)"` is an
 * invalid value and the element falls back to the SVG default — solid black. The
 * whole map rendered as a black silhouette with invisible labels until this was
 * changed. `style="fill:var(--map-land)"` is a real declaration and substitutes
 * correctly. Do not "tidy" these back into attributes.
 */

/**
 * Label and marker sizes are in viewBox units, not pixels, and the map renders
 * into roughly half the shell rather than all of it. A 13-unit label in a
 * 700-unit box displayed at 490px lands at about 9px on screen, which is below
 * reading size. These are set so the rendered result sits near 12–13px; if the
 * map is ever given a wider or narrower column, they need revisiting with it.
 */
const SIZE = { home: 21, ref: 17, dist: 16, dotHome: 9, dotRef: 5, ring: 24 } as const;

/**
 * Rough advance width of a label, used only to size the viewBox.
 *
 * The viewBox has to be tight to the drawn content or the caption underneath sits
 * against the figure's edge while the coastline floats somewhere inside it, and
 * the two visibly fail to line up. Measuring text properly needs font metrics we
 * do not have at build time, so this approximates: Archivo's average advance is
 * close enough to 0.55em for a bounding box, and the margin absorbs the error.
 */
const textWidth = (s: string, size: number) => s.length * size * 0.55;

export function reachMapSvg(o: MapOptions = {}): ReachMap {
  const { width: w = 720, height: h = 800, padding: pad = 34 } = o;

  const lats = CALIFORNIA_NORTH.map((p) => p[1]);
  const lons = CALIFORNIA_NORTH.map((p) => p[0]);
  const la0 = Math.min(...lats), la1 = Math.max(...lats);
  const lo0 = Math.min(...lons), lo1 = Math.max(...lons);

  // A degree of longitude is shorter than a degree of latitude everywhere but the
  // equator. Without this cosine the state comes out visibly too wide, and on a
  // shape this recognisable that reads as a mistake rather than a projection.
  const k = Math.cos((((la0 + la1) / 2) * Math.PI) / 180);
  const spanX = (lo1 - lo0) * k;
  const spanY = la1 - la0;
  const s = Math.min((w - 2 * pad) / spanX, (h - 2 * pad) / spanY);
  const ox = (w - spanX * s) / 2;
  const oy = (h - spanY * s) / 2;
  const xy = (lat: number, lon: number): [number, number] => [ox + (lon - lo0) * k * s, oy + (la1 - lat) * s];

  const land = CALIFORNIA_NORTH.map(([lon, lat], i) => {
    const [x, y] = xy(lat, lon);
    return `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ') + ' Z';

  const home = PLACES.find((p) => p.home)!;
  const dots = PLACES.map((p) => {
    const [x, y] = xy(p.lat, p.lon);
    const right = x > w * 0.58;
    const off = p.home ? SIZE.ring + 13 : 13;
    const dx = right ? -off : off;
    const anchor = right ? 'end' : 'start';
    const miles = p.home ? null : Math.round(haversineMiles(home, p));
    const fill = p.home ? 'var(--map-home)' : 'var(--map-ref)';
    return [
      p.home ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${SIZE.ring}" style="fill:none;stroke:var(--map-home)" stroke-opacity="0.5" stroke-width="1.75"/>` : '',
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${p.home ? SIZE.dotHome : SIZE.dotRef}" style="fill:${fill}"/>`,
      `<text x="${(x + dx).toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="${anchor}" style="fill:${fill}" font-size="${p.home ? SIZE.home : SIZE.ref}" font-weight="${p.home ? 700 : 500}">${p.name}</text>`,
      miles === null ? '' : `<text x="${(x + dx).toFixed(1)}" y="${(y + 25).toFixed(1)}" text-anchor="${anchor}" style="fill:var(--map-dist)" font-size="${SIZE.dist}" letter-spacing="0.08em">${miles} MI</text>`,
    ].join('');
  }).join('');

  // Tight bounding box over everything actually drawn — land, dots, labels — so
  // the figure's edges are the artwork's edges.
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const grow = (x: number, y: number) => {
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
  };
  for (const [lon, lat] of CALIFORNIA_NORTH) { const [x, y] = xy(lat, lon); grow(x, y); }
  for (const p of PLACES) {
    const [x, y] = xy(p.lat, p.lon);
    const right = x > w * 0.58;
    const label = textWidth(p.name, p.home ? SIZE.home : SIZE.ref);
    const dist = p.home ? 0 : textWidth('000 MI', SIZE.dist);
    const reach = Math.max(label, dist) + (p.home ? SIZE.ring + 13 : 13);
    grow(right ? x - reach : x + reach, y);
    grow(x, y - SIZE.ring - 4); grow(x, y + 32);
  }
  const m = 2;
  const vbX = x0 - m, vbW = x1 - x0 + m * 2;
  const vb = `${vbX.toFixed(1)} ${(y0 - m).toFixed(1)} ${vbW.toFixed(1)} ${(y1 - y0 + m * 2).toFixed(1)}`;

  // The southern edge is the clip line, so its westernmost point is the state's
  // bottom-left corner. Everything on that edge shares the minimum latitude.
  const southLat = Math.min(...CALIFORNIA_NORTH.map((p) => p[1]));
  const onSouthEdge = CALIFORNIA_NORTH.filter((p) => Math.abs(p[1] - southLat) < 1e-6);
  const cornerLon = Math.min(...onSouthEdge.map((p) => p[0]));
  const [cornerX] = xy(southLat, cornerLon);
  const captionInset = `${(((cornerX - vbX) / vbW) * 100).toFixed(2)}%`;

  const svg = (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" height="auto" ` +
    `role="img" aria-label="Map of northern California showing Ukiah, where the mill is, with straight-line distances to Eureka, Redding, Fort Bragg, Chico, Santa Rosa, Sacramento and San Francisco.">` +
    `<g font-family="Archivo, system-ui, sans-serif">` +
    `<path d="${land}" style="fill:var(--map-land);stroke:var(--map-line)" stroke-opacity="0.55" stroke-width="1.25" stroke-linejoin="round"/>` +
    dots + `</g></svg>`
  );

  return { svg, captionInset };
}
