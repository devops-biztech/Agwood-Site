/**
 * Deployment environment.
 *
 * CHANGES OFTEN: no. This reads the environment; it is not configuration.
 * SIGNED OFF BY: build decision, Phase 3.
 */

/**
 * Whether this deploy should be indexed by search engines.
 *
 * Vercel sets VERCEL_ENV to 'production', 'preview' or 'development'. Only a
 * production deploy is indexable. Preview deploys carry BOTH a robots.txt
 * `Disallow: /` and a `noindex` meta tag on every page, because Disallow alone is
 * not enough: it asks a crawler not to fetch the page, but a preview URL that
 * someone links to can still be listed from the link alone, with no snippet.
 * `noindex` is the instruction that actually keeps it out of the index, and a
 * crawler has to fetch the page to see it — which is why both are needed rather
 * than either.
 *
 * The fallback is `false` on purpose. If the variable is missing for any reason,
 * failing closed means an unexpected deploy stays out of the index; failing open
 * means it silently gets listed. The first mistake is trivially recoverable.
 */
export const INDEXABLE: boolean = import.meta.env.VERCEL_ENV === 'production';
