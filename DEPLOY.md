# Deploying

Static build, deployed to Vercel. `npm run build` emits `dist/`; there is no
server runtime and no serverless function.

## The domain

**Not yet confirmed.** `astro.config.mjs` sets:

```js
site: 'https://www.agwoodml.com'
```

That value is written down **exactly once**. Canonical `<link>` tags, `og:url`,
every `<loc>` in `sitemap.xml`, and the `Sitemap:` line in `robots.txt` all derive
from it, so changing hosts is a one-line edit.

**Which spelling is canonical:** `www.agwoodml.com`, with the `www`. The apex
should 301 to it in Vercel's domain settings so a page has one address rather than
two that both answer.

`agwoodml.com` is the strongest candidate rather than a settled decision, for one
reason: the client confirmed `info@agwoodml.com` as the inquiry address, so the
company already uses that domain. It also avoids the three consecutive Ls in
`agwoodmilllumber.com`, which is a typo magnet. **Confirm with the client before
the first production deploy.**

## Redirects

**There are none, and none are needed.** Agwood has no existing website — this is
the first one. There is no legacy URL structure to preserve, no old paths to map,
and nothing that will 404 for an existing visitor because there are no existing
visitors.

This is written down so that nobody goes looking for a redirect map, finds none,
and assumes it was forgotten.

The one redirect worth configuring is apex → `www`, and that is a domain setting
in Vercel rather than anything in this repo.

## Trailing slashes

`astro.config.mjs` sets `trailingSlash: 'always'` and `build.format: 'directory'`,
and `vercel.json` sets `"trailingSlash": true` to match. All three have to agree:
if Vercel strips a slash that Astro emitted, every canonical URL on the site points
at an address that redirects, which is a small ongoing tax on every crawl.

`vercel.json` deliberately does **not** set `cleanUrls`. It would fight the above.

## The preview-indexing guard

Preview deploys must not be indexed, and this takes two mechanisms, not one:

1. `robots.txt` serves `Disallow: /` on any non-production deploy.
2. Every page carries `<meta name="robots" content="noindex, nofollow">`.

Both are needed. `Disallow` only asks a crawler not to *fetch* the page — a preview
URL that somebody links to can still be **listed** from the link alone, with no
snippet. `noindex` is the instruction that actually keeps it out of the index, and
a crawler has to be allowed to fetch the page to see it.

Both derive from `INDEXABLE` in [`src/data/deploy.ts`](src/data/deploy.ts), which
reads `VERCEL_ENV`. It fails **closed**: if the variable is missing, the deploy is
treated as non-production and stays out of the index. Being wrongly excluded is
trivially recoverable; being wrongly listed is not.

The `404` page carries `noindex` in **every** environment including production, and
declares no canonical URL at all — it answers at every wrong URL on the site, so
naming `/404/` as its one true address would be a claim that is false everywhere it
is actually served.

## Caching headers

Set in `vercel.json`:

| Path | Policy | Why |
|---|---|---|
| `/assets/fonts/*` | `max-age=31536000, immutable` | Content-hashed by filename in practice and never edited in place. A year is safe. |
| `/assets/*` | `max-age=604800` | Icons and the og image. A week, because these are replaced by hand rather than by hash. |
| `*.html` | `max-age=0, must-revalidate` | A copy fix must be visible immediately. HTML is small; revalidation is cheap. |

Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Permissions-Policy`) are applied to all paths.

## Analytics

**Nothing is installed.** The site ships with zero third-party scripts and no
cookies, which is worth keeping unless there is a reason not to.

When analytics are wanted, Vercel Web Analytics is the least invasive option:
`@vercel/analytics`, one component in `Base.astro`. Note the practicalities before
promising anything:

- The **Hobby** plan includes Web Analytics with a limited event allowance and
  roughly one month of retention. Adequate for "did anybody visit."
- **Longer retention, custom events, and filtering need a paid plan** (Pro).
- It adds a script to every page, which means the "no third-party requests" claim
  above stops being true. That is a real trade, not a formality.

Google Analytics would additionally require a cookie banner to be defensible for
Californian visitors. If the client wants that, budget for the banner.

## After the first production deploy

- [ ] Confirm `https://www.agwoodml.com/robots.txt` shows `Allow: /` and the
      `Sitemap:` line — **not** `Disallow: /`. If it shows Disallow, `VERCEL_ENV`
      is not reaching the build.
- [ ] Confirm no page carries a `noindex` tag. View source on all three.
- [ ] Confirm the apex redirects to `www` with a 301.
- [ ] Submit `sitemap.xml` in Google Search Console and request indexing for `/`.
- [ ] Validate the JSON-LD in Google's Rich Results Test.
- [ ] **Check the address, phone and hours in the Google Business Profile match
      the site byte for byte.** This is the single highest-value item on the list:
      the profile and the structured data have to agree or neither is trusted.
- [ ] Test the site on a phone on cellular data, not office wifi. The audience is
      often on rural North Coast signal.
- [ ] Check the favicon and the home-screen icon on an actual iPhone and an actual
      Android handset.
- [ ] Send the og image through a link preview — post the URL into a Slack DM to
      yourself — and confirm it is the drawn vault, not the logo scan.
