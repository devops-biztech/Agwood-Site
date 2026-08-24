import type { APIRoute } from 'astro';
import { INDEXABLE } from '../data/deploy.ts';

/**
 * A real endpoint rather than a static file in public/, so the Sitemap: line is
 * derived from `site` in astro.config.mjs and the rules react to the deploy
 * environment. A checked-in robots.txt would need editing by hand every time
 * either of those changed, and would silently rot when nobody did.
 */
export const GET: APIRoute = ({ site }) => {
  const body = INDEXABLE
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${new URL('sitemap.xml', site).href}`,
        '',
      ].join('\n')
    : [
        '# Preview deploy. Not for indexing.',
        '# Every page also carries a noindex meta tag: Disallow alone only asks a',
        '# crawler not to fetch the page, and a linked preview URL can still be',
        '# listed from the link alone. noindex is what keeps it out of the index.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
