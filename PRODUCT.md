# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 5, static output, no UI framework. Scoped `<style>` blocks in `.astro`
files plus one `src/styles/global.css` token layer. Deployed static to Vercel.

Chosen over the alternative it actually beat: **the Webflow scaffold already in
hand.** That export renders a static three-section page and pulls jQuery from a
CDN to do it — 2,709 lines of CSS for a page with one heading, two paragraphs,
and an address. Astro emits the same page as HTML with zero runtime JavaScript,
which matters because the primary visitor is a trade buyer on a phone, often on
rural North Coast signal. Next.js was not a candidate: nothing here is dynamic,
there is no application to hydrate, and a React runtime would be pure cost.

## Users

**Primary.** A buyer at a Northern California lumber retailer or distributor,
on a phone, mid-sourcing — checking whether Agwood is a real operating mill,
what it runs, and who to contact. They have a job to fill and are comparing
suppliers. They are not browsing.

**Secondary.**
- Contractors and builders sourcing redwood directly.
- Homeowners searching "redwood decking Ukiah," who cannot buy here and must be
  routed to a retailer rather than invited to call the mill.
- Anyone verifying the company exists before sending money or freight —
  including, given the operating context below, someone who found a stale
  listing and is trying to work out what is current.

## Product Purpose

**A qualified buyer — a reseller or lumber yard — telephones the mill.**

The telephone is the *only* channel. The client confirmed on 2026-08-26 that
email is not to be published, superseding the earlier Phase 1 answer that email
was preferred. There is no email address, no enquiry form and no contact address
anywhere on the site, and none should be added: every one of them routes an
enquiry somewhere nobody is reading. The single call to action on every page is
the telephone number.

**Second job, and not decoration: the company is findable and verifiably real.**
Agwood has no website. What the internet currently says about it is wrong or
stale in specific, documented ways (see Operating Context). Structured data and
NAP consistency are therefore build requirements, not enhancements — they are
the mechanism by which the correct record starts to outrank the incorrect ones.

## Positioning

A redwood mill that competes on grade rather than throughput, selling wholesale
to the retailers who serve Northern California.

The owner's stated operating principle, as reported by the client: *"I'd rather
sacrifice production output than sacrifice the quality of my product."* This is
the sharpest thing known about the business and it is a real position — it is
the opposite of what a commodity mill claims, and a competitor optimizing for
volume could not truthfully copy it.

Recorded as **client-reported paraphrase, not an attributable quotation.** It
may drive the site's argument. It may not appear inside quotation marks with the
owner's name attached until he confirms the wording.

## Operating Context

- **There is no live site.** This is the first digital presence.
- **The Webflow export is a scaffold, not a site,** and is the anti-reference.
  Nothing carries over from it except facts and the logo. Its `:root` block is
  ten untouched Webflow default swatches (`--indian-red`, `--steel-blue`,
  `--gold: #ffde03`, `--forest-green: #25681d`); none was chosen and none
  matches the logo. Do not treat any of them as a brand color.
- **The public record is contradictory, and correcting it is part of the job.**
  Live third-party listings currently disagree on the street address
  (650 Kunzler Ranch Rd vs. 650 Hollow Tree Rd), the phone ((707) 468-5486 vs.
  -5487), the legal entity (Inc vs. LLC), the founding year (1954 vs. 1976 vs.
  1981 vs. 2002), and the number of locations. Several appear to describe a
  predecessor company rather than the current one. This is why NAP bytes are
  rendered from a single module and never retyped.
- **Wholesale channel — assumed, not confirmed.** The client's instruction was
  "let's assume wholesale only." The site is built on that assumption and it is
  listed under Unverified. If it is wrong, the homeowner routing is wrong too.
- **No contact form and no email address.** Confirmed with the client; email was
  withdrawn as a channel on 2026-08-26. The telephone is the only route in.
- **Three pages: Home, About, Contact.** Fixed scope. Not a starting point.

## Capabilities and Constraints

- **Redwood only, for now** — client-confirmed. No second species may appear.
- **Grades, dimensions, volumes, lead times, and minimum order are unknown.**
  The client answered "unknown" to all of them. These are the first questions a
  wholesale buyer asks, so the design must hold honest, named space for them
  rather than hiding the gap behind atmosphere.
- **No contact form; no e-commerce; no pricing.**
- **Zero JavaScript by default.** Any script is a small inline module with a
  comment justifying it. Every page must be complete and readable with
  JavaScript disabled.
- **WCAG 2.1 AA.**
- **One location on the site: Ukiah.** Client-confirmed. Fortuna is not claimed.
- **The forestry sentence is capped.** The client approved including California
  Forest Practice Act framing. Its permitted scope is exactly: a statement that
  timber harvest in California is regulated under the Act. It may **not** be
  written so as to describe Agwood's own sourcing, imply certification, or
  attribute the regulation to Agwood as a practice or a virtue. Agwood holds no
  FSC or SFI certification and no sentence may suggest otherwise.

## Brand Commitments

- **Name:** Agwood Mill & Lumber. Legal entity is an LLC (see Evidence).
- **Voice:** plain and factual. Short sentences. No hype, no exclamation points,
  no buzzwords. The draft's "redwood's beauty, strength, and durability" is the
  register to move away from. Applies to page copy, docs, and commit messages.
- **Logo:** `AML-logo.png` — the only asset delivered. Two conifers above an
  "AML" monogram whose letterforms read as a ridgeline, wordmark beneath.
- **The logo's color data is noise; its silhouette is sound.** The file contains
  **46,015 distinct colors** across 224k opaque pixels in what should be a
  two-color mark — there is no flat fill anywhere in it, so it cannot be
  color-picked reliably and it will band if reproduced large in color. The alpha
  channel, measured separately, is clean: 60.4% clear, 37.3% solid, 2.3% ordinary
  antialiasing. These are two different problems and only the first one is bad.
- **The mark separates into an emblem and a wordmark.** A 15px empty band at rows
  640–654 divides the conifers-and-monogram emblem (691×589) from the wordmark
  "Agwood Mill & Lumber" (693×60). Use the emblem as the mark and set the company
  name in **live type**, never as the baked raster: live type is selectable,
  translatable, crisp at every density, and does not push the company's own name
  through a lossy scan.
- **Emblem legibility floor: 64px tall.** Verified by rendering at 44/56/64/72/88.
  Below 64 the conifer branches merge into a blob and the monogram stops reading.
  Do not place the emblem smaller than 64px anywhere except the favicon, where the
  wordmark is absent anyway.
- **A white knockout is derivable and is better than the color original.** Keying
  the alpha channel to flat white discards all 46,015 noisy colors and keeps only
  the silhouette; the counter of the "A", the tree/monogram separation, and the
  ridgeline all survive because that detail is carried by alpha, not by color. A
  dark ground is therefore fully available to the design.
- A vector redraw remains a launch item, but **the design must not depend on it
  landing** — everything above works with the raster as delivered.
- **Verified brand color:** the mark's forest green. Measured mean of all green
  pixels is `#064D15`, inside the brief's stated `#00540C`–`#006018` range. This
  is the only genuinely verified brand color Agwood has.
- **Color scarcity is a brand commitment, enforced in DESIGN.md:** one action
  color and one state color, and they never cross. Recorded here so it survives
  a future designer who only reads this file.

## Evidence on Hand

### Verified facts

- **Name:** Agwood Mill & Lumber. *(Client, brief, and every listing found.)*
- **Physical address:** 650 Kunzler Ranch Rd, Ukiah, CA 95482. *(Client-confirmed
  in interview; matches the LLC's registered address and the majority of
  listings.)*
- **Phone:** (707) 468-5486. *(Client-confirmed as the number a buyer should
  call.)*
- **Hours:** Mon–Fri, 7AM–4PM. *(Brief; consistent with the draft copy.)*
- **Species:** redwood only, at present. *(Client-confirmed.)*
- **Products:** decking, fencing, custom wood products. *(Brief.)*
- **Channel intent:** sells to retailers and distributors across Northern
  California. *(Draft copy and client.)*
- **No FSC or SFI certification** for its processing facilities.
  *(Client-confirmed against forestry certification registries.)*
- **California Forest Practice Act** governs timber harvest on private and
  industrial land statewide. *(Matter of law — true independent of Agwood.)*
- **Customer quotation.** "These guys mill some nice redwood. Good, thick cut
  lumber, well graded." *(Public Google review. Permission to reproduce the quote
  and the accompanying photograph confirmed by the client on 2026-08-26. The
  original's closing sentence named the retailer where the wood was bought; it is
  omitted because that business has closed. The trim does not alter what the
  reviewer said about the lumber.)*
- **Wholesale channel corroborated.** The same review records the wood being
  bought at a retailer rather than from the mill, which is the wholesale model
  working as described. This supersedes an earlier concern of mine that consumer
  reviews implied direct retail sales; they do not.
- **Operating principle:** grade over throughput. *(Client-reported paraphrase
  of the owner. Not attributable verbatim — see Positioning.)*
- **No existing website.** *(Brief; confirmed by search.)*
- **Company history.** The Agwood name has been on a redwood mill in Ukiah since
  the early 1980s; the business and its assets were sold to Conrad Forest Products
  of North Bend, Oregon, effective 1 April 2017; the mill was restarted under local
  family ownership in 2025, keeping the name and the Kunzler Ranch Road site.
  *(Confirmed by the client on 2026-08-25 in response to a direct question. Originally
  assembled from a March 1981 trade-journal listing, contemporaneous trade-press
  coverage of the Conrad acquisition, and the California Secretary of State
  registration of Agwood Mill & Lumber LLC dated 29 January 2025. Recorded with its
  provenance so that if any part is later found wrong, the record shows who
  confirmed it and when.)*
- **Family-owned.** *(Brief and client; corroborated by listings.)*

### Unverified, and flagged in code

Nothing below may appear on the site as stated fact. Each ships as a declared
placeholder or does not ship.

- **"Since 1954."** Almost certainly wrong. It appears only in draft marketing
  copy. Three independent sources give three other years — a 1981 trade journal
  listing, an "established 1981" record, and a "founded 2002" record for the
  Fortuna entity. No source supports 1954. **Do not print a founding year.**
- **Owner and family names.** Present in public filings. Being public is not
  consent to be published on the company's own site, and the About page's story
  works without them. Requires the owner's explicit approval before any individual
  is named. Currently NOT on the site by deliberate choice.

- **Mailing address: P.O. Box 1443, Ukiah, CA 95482.** From the LLC filing. It
  plausibly explains the garbled "PO Box Kunzler Ranch Rd" line in the repo,
  which collapsed a PO Box and a street address into one. Needs client
  confirmation before it is printed anywhere.
- **Grades, dimensions, lengths, lead times, minimum order, custom capability.**
  Client answered "unknown."
- **Annual production.** A figure of 15–20 MMBF surfaced in a search summary; both
  candidate source pages are dead links and it could not be corroborated. **Do
  not use it.** Recorded only so nobody rediscovers it and assumes it is sound.
- **Employee count.** Aggregators say 50–99. Aggregators also say the company has
  two employees and was founded in 2002. Unusable.
- **Fortuna / Humboldt County.** Listings exist (2832 Old State Hwy, Fortuna;
  (707) 725-2196) but appear to describe the pre-2017 predecessor. Client
  confirmed the site claims Ukiah only. Auditing and correcting or removing these
  listings is a launch item.
- **`sameAs` listing URLs.** Deferred by the client. Structured data ships with
  no `sameAs` array rather than a guessed one.
- **Domain.** Not chosen; the client deferred it and production is not imminent.
  `agwoodml.com` is the strongest candidate because the confirmed inquiry email
  already uses it, and it avoids the three consecutive L's in
  "agwoodmilllumber.com." The canonical hostname lives in exactly one place,
  `site` in `astro.config.mjs`, so this resolves with a one-line change.
- **Distributor list.** No real distributor names exist yet. One candidate
  surfaced from a customer review — Artisan Outdoor, Loomis, CA — and was
  rejected: the client established it has since closed permanently. Any future
  name needs the owner's confirmation that the relationship is current, for
  exactly that reason. The component
  ships with declared placeholder rows in the design's own material, per the
  client's decision, so the owner can fill it at the next meeting and so it
  cannot reach production looking finished.

### Assets, stated plainly

The **logo PNG is the only asset delivered.** The photography referenced in the
brief — `redwoods.jpg`, `lumber-stack-min.png`, `Redwood-Mixed-Grain.webp` — was
not included and is out of scope.

Two things follow, and future work must not undo them:

1. **There is no photography of Agwood's mill, yard, product, or crew,** and the
   client has directed that placeholders stand for now. No stock photograph may
   be positioned as Agwood's operation, ever.
2. **There is not even a material texture to fall back on.** The redwood grain
   image is not in hand. The visual world must therefore be built from type,
   color, structure, and drawn form — not from imagery. This is a constraint on
   the design, and it is the reason the design cannot lean on a photographic
   hero the way its category habitually does.

**No white knockout was delivered, and none is needed.** `AML-logo-white.png` is
not in the project. One is derived mechanically from the delivered PNG's alpha
channel — a transform of the supplied asset, not a new asset and not an
invention. It is generated at build time from `AML-logo.png` so there is one
source of truth for the mark and no second file to drift.

## Product Principles

1. **A fact appears on this site because someone confirmed it, not because it is
   probably true.** Anything from the Unverified list ships as a declared
   placeholder or does not ship. *(Use this to reject any design whose
   composition only works once the empty slots are full.)*
2. **The site answers a buyer's questions in the order a buyer asks them:** is
   this mill real, what does it run, who do I contact. *(Use this to reject any
   layout that spends the first viewport on atmosphere.)*
3. **Grade over throughput is the argument, so restraint is the medium.** A mill
   that refuses to over-produce cannot be sold with a site that over-decorates.
   *(Use this to reject ornament that says nothing, and to reject any effect
   added because the page felt empty.)*
4. **Every gap is named rather than hidden.** The unknown grades, the missing
   photography, and the unbuilt dealer list are stated in the design's own
   material — because a buyer trusts a mill that says "call for dimensions" more
   than one that quietly has no specifications at all. *(Use this to reject any
   placeholder that is a gray box, dashed scaffolding, or decorative filler.)*

## Accessibility & Inclusion

WCAG 2.1 AA. Every text color is checked against every ground it actually sits
on, and the check is recorded in DESIGN.md.

The primary visitor is on a phone, outdoors or in a yard, possibly in sunlight
and on weak rural signal. That drives real requirements, not generic ones: high
contrast rather than fashionable low-contrast grays; large tap targets; the
phone number and email as real tappable links; no hover-only affordances, since
the primary device has no hover; and a page that is complete with JavaScript
disabled.

Reveal animations keep their hidden start state under a `:root.js` selector
only, so a JS-off visitor sees content rather than blank space.
`prefers-reduced-motion: reduce` is honored on every animation, and the
reduced-motion branch reveals content immediately rather than leaving it hidden.
Scroll state is observed with a single `IntersectionObserver`, never a scroll
handler.
