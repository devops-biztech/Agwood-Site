# Agwood Mill & Lumber

The company's first website. Astro 5, static output, no UI framework, no runtime
JavaScript beyond two small inline modules. Three pages: Home, About, Contact.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output into dist/
npm run preview  # serve dist/ as it will be served in production
```

Node is managed with nvm. If `npm` is not on the path:

```bash
export PATH="$HOME/.nvm/versions/node/v24.18.0/bin:$PATH"
```

## The design direction

The world is called **Stated Flat**, and the whole of it is written down in
[DESIGN.md](DESIGN.md). The short version:

Each field states one thing the mill will do, and nothing else. The site is a
stack of hard-edged, full-bleed bands in the company's own two greens and its
paper, each carrying exactly one statement. The statements are numbered because
they genuinely are a sequence of narrowings — one species, one channel, one place
— and not because numbering makes a list look considered.

The thing to understand before changing anything: **there is no ornament, and that
is the point.** No texture, no pattern, no generated material, no imagery. Agwood
owns no photographs of its own operation and has six confirmed facts, and an
earlier direction that generated drawn wood grain to fill that space was built in
full and rejected for feeling cheesy. The finding was not that the grain was drawn
badly — it was that ornament on a thin-fact site reads as compensation, because
something is in fact being covered up. This world makes the few real facts carry
the page and lets type, colour and structure do everything else.

## Where the content lives

| What | File | Notes |
|---|---|---|
| Name, address, phone, email, hours | [`src/data/company.ts`](src/data/company.ts) | **The only place these exist.** Page copy, footer and JSON-LD all render from it. |
| Facts we do not have | `UNKNOWNS` in the same file | Drives the russet "call the mill" rows. |
| Third-party profile links | `SAME_AS` in the same file | Deliberately empty — see below. |
| Page titles and meta descriptions | [`src/data/site.ts`](src/data/site.ts) | Also drives the nav and `sitemap.xml`. |
| Whether a deploy is indexable | [`src/data/deploy.ts`](src/data/deploy.ts) | Reads `VERCEL_ENV`. |
| Design tokens | [`src/styles/global.css`](src/styles/global.css) | Colour, type, spacing. No component defines a raw hex. |
| Field and Statement | [`src/components/`](src/components/) | The two signature components. A page is a sequence of `Field`s. |
| Page copy | `src/pages/*.astro` | Prose is in the pages; facts come from the data modules. |

A copy edit never requires touching a component. A NAP change touches exactly one
file.

## Before this goes live

- [ ] **Register the domain and confirm the spelling.** `astro.config.mjs` currently
      says `https://www.agwoodml.com` on the strength of the confirmed email
      address. It is a candidate, not a decision. See [DEPLOY.md](DEPLOY.md).
- [ ] **Redraw the logo as a vector.** The supplied PNG is a 784px scan containing
      46,015 distinct colours in what should be a two-colour mark. It will not
      survive print or large display.
- [ ] **Claim and fill the Google Business Profile**, then add its coordinates to
      the JSON-LD `geo` field and its URL to `SAME_AS`.
- [ ] **Audit the existing third-party listings.** Several describe the predecessor
      company and carry a different street address and telephone.
- [ ] **Get photography of the mill**, then replace the `Pending` blocks.
- [ ] **Confirm the remaining unknowns** — grades, dimensions, lead times, minimum
      order, founding year, family history. All are listed in
      [PRODUCT.md](PRODUCT.md) under "Unverified, and flagged in code."
- [ ] **Get the stockist list** so `DealerList` can carry real retailers.
- [ ] **Client review of all page copy.** It was written against the verified facts
      and has not been through review.

## Decisions on record

Things a future reader would otherwise mistake for a bug, an oversight, or
something to tidy up.

**Nothing from the Webflow export survived except facts and the logo.** The export
was `index.html` plus 2,709 lines of Webflow boilerplate CSS and a jQuery
dependency loaded from a CDN to render a static page. Its `:root` block held ten
untouched Webflow default swatches — `--indian-red`, `--steel-blue`,
`--gold: #ffde03`, `--forest-green: #25681d`. None of them was chosen and none
matched the logo, so all were discarded. Do not "restore" them.

**There is no contact form, deliberately.** Confirmed with the client. A static
build cannot process a POST without adding a service dependency; the audience
picks up the phone or writes an email; and a form that fails silently is worse
than no form. This is stated on the contact page so a visitor knows it is a choice.

**No founding year appears anywhere.** The draft copy's "Since 1954" is
contradicted by three independent sources, which variously give 1976, 1981 and
2002 — and the 2002 record belongs to a Fortuna entity. A founding year is
checkable by anyone and wrong is embarrassing, so the site prints none until the
owner confirms one.

**`SAME_AS` is empty and `geo` is absent from the structured data.** Both are
omissions on purpose. Several listings currently in circulation describe the
predecessor company at a different street address, so linking them would
undermine the record the structured data exists to establish. Unverified
coordinates would be the one field guaranteed to contradict the Google Business
Profile once it is claimed. An omission is recoverable; a wrong assertion that
search engines have already ingested is not.

**Only Ukiah is named.** Listings exist for a Fortuna address in Humboldt County,
but they appear to describe the pre-2017 predecessor. Client confirmed the site
claims one location.

**The dealer list shows "Dealer name / City, CA", not real-looking names.** A
plausible invented stockist reads as finished in a screenshot, can survive into
production unnoticed, and names a business that never agreed to be listed. These
rows do the same job at a client meeting and cannot do any of that.

**Every gap is a `Pending` block, and that is the finished state for now** — not
scaffolding someone forgot to replace. Replacing one is a deletion, not a
redesign.

**There is no imagery and no texture anywhere, deliberately.** See the design
direction above. Adding a photograph, a pattern, or a generated material to "warm
it up" would undo the reason this world exists.

**`lumber-stack.png` sits in the repo root and is not used.** It was supplied
during the build. It is a photograph of stacked lumber that is not Agwood's and
its licensing is unestablished. It is kept only so it is not lost. See LICENSE §5.

**`AML-logo-white.png` is also unused.** The white knockout the site actually
serves is derived from the alpha channel of `AML-logo.png` at asset-build time, so
there is one source of truth for the mark. The supplied white file is kept for
reference.

**The `.claude/` directory is gitignored.** It is the impeccable design skill —
149 files of third-party tooling that is not part of this website.

**There are no shadows and no rounded corners anywhere.** Both are enforced
decisions from DESIGN.md, not omissions. A plate that casts a shadow is a card, a
card wants a grid, and a grid wants three of them — which is the category template
this direction exists to refuse.

**Known-but-accepted, with dates:**

- *2026-08-25* — **A previous direction was built in full and rejected.** It
  generated drawn redwood grain — cathedral arches, grain bands, drawn placeholder
  panels — as its primary visual material, and the client's verdict after four
  rounds of geometry refinement was that it felt "cheesy and poorly executed." The
  palette and both typefaces were explicitly kept; everything else was replaced.
  That vocabulary is dead and is recorded here so nobody proposes reviving a
  softened version of it. It is recoverable from git history if ever wanted.
- *2026-08-25* — Page copy has not been through client review.
- *2026-08-25* — The domain is unconfirmed and production is not imminent.
