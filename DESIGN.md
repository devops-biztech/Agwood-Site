---
name: Agwood Mill & Lumber — Stated Flat
description: Hard-edged fields of the company's own two greens, each carrying exactly one statement of what the mill will and will not do.
colors:
  paper: "#F4EDE3"
  paper-deep: "#E9DFD1"
  ink: "#241A12"
  ink-dim: "#6A5544"
  forest: "#0A5417"
  forest-hover: "#073F11"
  forest-deep: "#05240B"
  russet: "#8B4A2F"
  on-deep: "#F4EDE3"
  on-deep-dim: "#C3CEC2"
  on-deep-mark: "#E0A077"
  rule: "rgba(36, 26, 18, 0.13)"
typography:
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.4rem, 6.6vw, 4.6rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.032em"
    fontVariation: "'opsz' 144, 'SOFT' 0, 'WONK' 0"
  headline:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.5rem, 3.4vw, 2.15rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 72, 'SOFT' 0, 'WONK' 0"
  title:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.0rem, 1.6vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.005em"
    fontVariation: "'opsz' 40, 'SOFT' 0, 'WONK' 0"
  lede:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1rem, 1.4vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.17em"
    textTransform: "uppercase"
    fontVariation: "'wdth' 105"
  control:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 100"
rounded: "0"
spacing:
  gutter: "clamp(1.125rem, 4vw, 2rem)"
  field: "clamp(3rem, 8vw, 6rem)"
  stack: "clamp(0.75rem, 2vw, 1.125rem)"
  container: "68rem"
  measure: "56ch"
components:
  field-paper:
    background: "{colors.paper}"
    paddingBlock: "{spacing.field}"
  field-deep:
    background: "{colors.paper-deep}"
    paddingBlock: "{spacing.field}"
  field-forest:
    background: "{colors.forest-deep}"
    color: "{colors.on-deep}"
    paddingBlock: "{spacing.field}"
  cell:
    label: "{colors.russet}"
    heading: "{typography.headline}"
    body: "{colors.ink-dim}"
    value: "{typography.headline}"
    valueUnknown: "{colors.russet}"
    divider: "{colors.rule}"
  statement:
    numeral: "{colors.russet}"
    numeralOnDeep: "{colors.on-deep-mark}"
    heading: "{typography.headline}"
    body: "{colors.ink-dim}"
    value: "{typography.headline}"
    valueUnknown: "{colors.russet}"
  header:
    background: "{colors.forest-deep}"
    emblem: "{colors.on-deep}"
    wordmark: "{typography.title}"
    minEmblemHeight: "64px"
  nav-link:
    color: "{colors.on-deep-dim}"
    currentColor: "{colors.on-deep-mark}"
    typography: "{typography.control}"
  action:
    background: "{colors.forest}"
    color: "{colors.paper}"
    hover: "{colors.forest-hover}"
    onDeepBackground: "{colors.on-deep}"
    onDeepColor: "{colors.forest-deep}"
    radius: "{rounded}"
  reach-map:
    land: "{colors.on-deep}"
    home: "{colors.on-deep}"
    reference: "{colors.on-deep-dim}"
    distance: "{colors.on-deep-mark}"
  phone-display:
    color: "{colors.on-deep}"
    typography: "{typography.display}"
  spec-row:
    label: "{colors.ink}"
    value: "{colors.ink-dim}"
    unknownValue: "{colors.russet}"
    typography: "{typography.body}"
  footer:
    background: "{colors.forest-deep}"
    color: "{colors.on-deep-dim}"
    emphasis: "{colors.on-deep}"
---

# Design System: Agwood Mill & Lumber — Stated Flat

## Overview

**North star: every field is a flat declaration of what the mill will do.**

The site is a stack of hard-edged, full-bleed bands in the company's own two
greens and its paper. A field makes one point. Where that point is a set of
related narrowings — one species, one channel, one specification — it is carried
by a three-cell row rather than three separate fields, because they answer the
same question and belong at the same altitude.

### What it forces

1. **A field makes one point.** It may be carried by one statement or by the
   three-cell row, and by nothing else. A field with two unrelated things in it
   has stopped being a declaration.
2. **Colour is the division.** There are no rules, borders, or dividers between
   fields — the colour change is the section break. A hairline between two fields
   would be admitting the colour is not doing its job.
3. **Colour is structural, not decorative.** The two greens are measured out of
   the logo. They do the work that photography does on other lumber sites.
4. **No ornament of any kind.** No texture, no pattern, no generated material, no
   illustration. See the history below — this is the load-bearing rule.

### The rule this world was built to obey

A previous direction for this site was built and rejected. It generated drawn
redwood grain — cathedral arches, grain bands, drawn placeholder panels — as its
primary visual material. The client's verdict was that it "feel[s] cheesy and
poorly executed," after four rounds of refining the geometry.

The lesson is not that the grain was drawn badly. It is that **on a site with six
confirmed facts, ornament reads as compensation.** It looks like something is
being covered up, because something is. The replacement makes the few real facts
carry the page and lets type, colour and structure do everything else.

**That rejected vocabulary is dead.** No drawn grain, no arches, no generated
texture, no wood imagery. Do not reintroduce any of it in a softened form.

### Anti-references — both named, deliberately

**1. The generic lumber-company template.** Full-bleed forest photo with the name
centred over it, a "quality and service since 19XX" block, three icon cards, a
contact form. The Webflow scaffold in this repo already is that page. This world
refuses it structurally: there is no photography, no founding year we can print,
and a three-card row is banned outright below.

**2. Schmidbauer Lumber — "The Line."** Built by the same studio, also a North
Coast redwood mill, which makes borrowing easy and the result worthless. That site
is a graphite control room about material moving through stations. This one is a
warm, flat, declarative stack. Specifically banned, each being a device that would
work unchanged on both sites: the dark cool ground, any monospace face, station
rows, the conveyor rail, instrument strips, hairline-and-tick-mark framing, and
gold in any role.

## Colors

| Token | Value | Role |
|---|---|---|
| `paper` | `#F4EDE3` | The light field. |
| `paper-deep` | `#E9DFD1` | The second light field, and the `Pending` ground. |
| `ink` | `#241A12` | Headings and body on light fields. |
| `ink-dim` | `#6A5544` | Secondary copy on light fields. |
| `forest` | `#0A5417` | **The action colour.** |
| `forest-hover` | `#073F11` | Action hover. Darker, so contrast rises rather than falls. |
| `forest-deep` | `#05240B` | The dark field, the header, and the footer. |
| `russet` | `#8B4A2F` | **The state colour.** |
| `on-deep` | `#F4EDE3` | Text on the dark field. |
| `on-deep-dim` | `#C3CEC2` | Secondary text on the dark field. |
| `on-deep-mark` | `#E0A077` | The state colour's reversed variant. |

`forest` and `forest-deep` are measured, not chosen. The logo's opaque pixels
cluster into two inks: a fill green with median `#005314` and an outline green
averaging `#05240B`. Every Webflow `:root` swatch in the original scaffold —
including `--forest-green: #25681d` — was discarded; none matched the mark.

### Named rule: **Green acts, russet locates**

Green appears **only** on something you can do: the action, inline links, focus
rings. Russet appears **only** on where you are or what is missing: the current
nav item, the statement numerals, an unknown value, the `Pending` marker.

**They never cross.** Green never marks position. Russet never invites a click.

On the dark field both take reversed variants (`on-deep`, `on-deep-mark`) because
neither is legible at `#05240B`. The meaning does not change — only the value.

**Don'ts for this rule specifically:**
- Don't use green for a heading, an eyebrow, a border, or a bullet.
- Don't use green to show which page you are on.
- Don't use russet on a button, a link, or anything else clickable.
- Don't add a third accent for warnings, success, or emphasis. There is none. An
  unknown is russet because "we don't know yet" is a state.
- Don't use `forest` as a field background. The dark field is `forest-deep`. Two
  greens doing the same job is how the palette starts drifting.

### Contrast — verified, not assumed

**Every text colour was checked against every ground it actually sits on**, by
computation against the shipped tokens rather than by eye. Fourteen pairings, all
clearing WCAG 2.1 AA:

| | on `paper` | on `paper-deep` | on `forest-deep` |
|---|---|---|---|
| `ink` / `on-deep` | 14.67:1 | 12.94:1 | 14.30:1 |
| `ink-dim` / `on-deep-dim` | 6.03:1 | 5.32:1 | 10.23:1 |
| `forest` | 7.88:1 | 6.95:1 | — (inverts to `on-deep`) |
| `russet` / `on-deep-mark` | 5.79:1 | 5.11:1 | 7.49:1 |

`paper` on `forest` (the action) is 7.88:1, rising to 10.46:1 on hover. The
tightest pair on the site is **russet on `paper-deep` at 5.11:1**. `#9A4E2A`, the
more attractive russet, failed at 4.44:1 and was rejected.

## Typography

**Two families, both variable, every axis set explicitly.**

**Fraunces** carries display, headline and title — with `SOFT 0` and `WONK 0` set
deliberately. Those axes are what give Fraunces its wobble; switching them off
leaves a sharp, high-contrast serif. This is the single most important type
decision in the system and it is invisible unless you know to look.

**Archivo** carries lede, body, label and control at `wdth 100` (105 for labels,
which need to hold their tracking).

**There is no monospace anywhere.** A grade stamp is the obvious thing to reach
for on a lumber site and it leads straight to mono technical labels — which is
Schmidbauer's vocabulary, not this one.

## Layout

**One shell, one gutter, one container width.** A `Field` is a full-bleed
background wrapper; the `.shell` inside owns the width and the gutter. The wrapper
never sets a max-width — doing that is what creates two competing widths.

- Gutter: `clamp(1.125rem, 4vw, 2rem)`
- Field padding: `clamp(3rem, 8vw, 6rem)` — one value, applied to every field
- Container: `68rem` · Measure: `56ch`

Fields alternate so the page never places two of the same tone together, and the
sequence bookends on `forest-deep`: the header and hero open dark, the footer
closes dark.

## Elevation & Depth

**There are no shadows.** Not one. Depth comes from the tonal step between fields
and nothing else. A panel that casts a shadow is a card, a card wants a grid, and
a grid wants three of them — which is how the category template gets back in.

## Shapes

**Radius is `0` everywhere**, including the action and the `Pending` block. The
`Pending` marker and the dealer rows use a 4px left edge in the state colour; that
edge is the only border in the system that is not a row hairline.

## Components

Full specifications live in `.impeccable/design.json`. Four are signature:

### The Field (signature)

A full-bleed band of one colour carrying exactly one statement. The colour change
between consecutive fields is the only section division on the site. `tone` is
`paper`, `deep` or `forest`; the dark tone flips every child to reversed tokens.

### The Cell Row (signature)

Three cells on one field, each carrying a small label in the state colour, a
Fraunces argument, supporting prose, and the fact the argument resolves to. The
facts are bottom-aligned across the row so they line up regardless of how long the
arguments above them run.

This is the closest the site comes to the icon-card triad the category runs on,
and the distance is held by three things: the cells have no box of any kind, each
carries a checkable claim rather than a benefit, and there are three because there
are three things to say. The conditions are written as Don'ts below and are not
negotiable — they are the whole reason this row is allowed.

### The Reach Map (signature)

The northern half of California drawn from real boundary data, with Ukiah marked
and straight-line distances to seven reference towns computed from coordinates.
Generated at build time; the browser receives static SVG.

It is the one graphic on the site, and it earns its place by being information
rather than decoration: a lumber buyer thinks in logistics before grades, and
"how far is this mill from my yard" is a question this site can answer exactly on
a page where very little else can be. The towns are **reference points, not
customers** — Agwood sells "across Northern California", and naming towns as
destinations would claim delivery relationships nobody has described to us.

The outline is never to be redrawn by hand. A recognisable shape approximated
from memory is a factual error readers spot instantly.

### The Phone Display (signature)

The telephone number set as the largest element on the page. The telephone is the
only way into this business — there is no form and no email address — so the
number wears the size that importance warrants rather than hiding in a button.
Tabular figures, because proportional numerals in a serif this high-contrast make
a phone number look accidental.

## Motion

One gesture: fields reveal on scroll with a short fade and rise. The hidden start
state lives under `:root.js` only, so a visitor without scripting sees everything.
`prefers-reduced-motion: reduce` reveals content **immediately** rather than
leaving it hidden. Scroll state is observed with a single `IntersectionObserver`,
never a scroll handler.

## Do's and Don'ts

### Do

- Give each field one point, carried by prose, a record, or the three-cell row.
- Bottom-align the facts across a cell row so they read as a set.
- Let the colour change be the section break.
- Set `SOFT 0` and `WONK 0` on every Fraunces instance.
- Use green for actions and russet for state, and nothing else for either.
- Demote an unknown to Archivo in russet so it cannot read as a held fact.
- Keep the emblem at **64px or taller** — measured at 44, 56, 64, 72 and 88; below
  64 the conifer branches merge and the monogram stops reading.
- Set the company name in live type. The wordmark baked into the raster is never
  used.
- Check any new colour pair against its actual ground before shipping it.

### Don't

- **Don't reintroduce ornament in any form.** No texture, no pattern, no generated
  material, no wood imagery. This world exists because that was rejected.
- **Don't put two unrelated points in one field.**
- **Don't turn the three-cell row into an icon-card triad.** No icons, no cards,
  no borders around cells, no shadows, no radius, no per-cell background. The
  cells sit on the field and are separated by one hairline. The moment a cell gets
  a box, the row becomes the category template's load-bearing device and the whole
  structure goes with it.
- **Don't add a fourth cell.** Three is the count because there are exactly three
  things to say. A fourth is the signal the row has stopped being a structure and
  become a container — split it into fields instead.
- **Don't put a benefit in a cell.** A cell carries an argument and the fact it
  resolves to, both checkable. "One species, run properly — Redwood only" is a
  claim a buyer can test; "Quality Craftsmanship" is what this site exists to
  avoid.
- **Don't draw a rule between two fields.** The colour change is the division.
- **Don't add a shadow**, and don't round a corner.
- **Don't use a monospace face** anywhere.
- **Don't hero a photograph**, and don't let any image or caption imply Agwood owns
  a stand of trees, a yard, or equipment it has not shown us.
- **Don't print a founding year.** "Since 1954" appears only in draft copy and is
  contradicted by three independent sources. See `PRODUCT.md`.
- **Don't write a sustainability or certification claim.** Agwood holds no FSC or
  SFI certification. The California Forest Practice Act may be stated as
  jurisdictional fact only, never as Agwood's practice or credit.
- **Don't let a field wrapper set its own max-width.** The `.shell` inside owns the
  width; a second one produces nested insets.
- **Don't reuse anything from Schmidbauer.** If a device would work unchanged on
  both sites, it is wrong for this one.
