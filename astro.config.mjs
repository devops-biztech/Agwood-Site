// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // The canonical hostname is written down exactly once, here. Canonical <link>
  // tags, og:url, the sitemap's <loc> entries and the robots.txt Sitemap: line all
  // derive from this value, so moving the site to a different host is a one-line
  // change rather than a search-and-replace across the tree.
  //
  // NOT YET CONFIRMED. The client deferred the domain decision and production is
  // not imminent. This is the strongest candidate rather than a settled answer:
  // the confirmed inquiry address is info@agwoodml.com, so the company already
  // uses agwoodml.com, and it avoids the three consecutive Ls in
  // "agwoodmilllumber.com" that make that spelling a typo magnet. Confirm before
  // the first production deploy. See DEPLOY.md.
  site: 'https://www.agwoodml.com',

  // Trailing slashes are emitted and enforced consistently so that a page has one
  // address rather than two that both answer. Vercel's cleanUrls would fight this,
  // which is why vercel.json does not set it.
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
