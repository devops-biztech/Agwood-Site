/**
 * Per-page metadata.
 *
 * Titles and descriptions are written for someone typing "redwood mill Ukiah"
 * into a search box, not for a brand slogan. The company has no website today, so
 * these strings are the first description of it that a search engine will hold
 * that Agwood actually controls.
 *
 * CHANGES OFTEN: yes — descriptions are the most likely thing to be tuned after
 * launch once there is search data to tune against.
 * SIGNED OFF BY: nobody yet. Copy was written in Phase 3 against the Verified
 * facts in PRODUCT.md and has not been through client review.
 */

export interface PageMeta {
  /** Appended to the company name in <title>. */
  title: string;
  description: string;
  /** Pages listed here appear in sitemap.xml, in this order. */
  path: string;
}

/**
 * The label a page wears in a navigation bar, derived from its title rather than
 * stored beside it — a second field would be a second thing to keep in step.
 *
 * Titles are written for a search result ("About the Mill"); a nav is read in a
 * glance and takes the short form. Used by the header and the footer, so the two
 * menus can never drift apart.
 */
export const navLabel = (p: PageMeta): string =>
  p.path === '/' ? 'Home' : p.title.replace('About the Mill', 'About');

export const PAGES: readonly PageMeta[] = [
  {
    path: '/',
    title: 'Redwood Mill in Ukiah, California',
    description:
      'Agwood Mill & Lumber is a redwood sawmill in Ukiah, California, supplying decking, fencing and custom milling wholesale to distributors across Northern California.',
  },
  {
    path: '/about/',
    title: 'About the Mill',
    description:
      'A family-owned redwood sawmill at 650 Kunzler Ranch Rd in Ukiah, Mendocino County. What Agwood Mill & Lumber runs, who it sells to, and how to reach it.',
  },
  {
    path: '/contact/',
    title: 'Contact',
    description:
      'Contact Agwood Mill & Lumber in Ukiah, California. Address, telephone, email and hours for the mill office. Wholesale redwood enquiries welcome.',
  },
];
