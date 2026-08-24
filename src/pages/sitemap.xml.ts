import type { APIRoute } from 'astro';
import { PAGES } from '../data/site.ts';

/**
 * Built from the same PAGES list the navigation renders from, so a page cannot be
 * added to the site and forgotten here.
 *
 * The 404 is absent by construction rather than by an exclusion rule: it is not in
 * PAGES because it is not a destination. Listing it would invite a crawler to
 * index the one page that must never rank.
 */
export const GET: APIRoute = ({ site }) => {
  const urls = PAGES.map((p) => {
    const loc = new URL(p.path, site).href;
    return `  <url><loc>${loc}</loc></url>`;
  }).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
