---
name: Agwood Mill & Lumber — Slow Grown
description: A world built from drawn wood, where the grain on a board is the record of what the mill gave up to produce it.
colors:
  paper: "#F4EDE3"
  paper-deep: "#E9DFD1"
  ink: "#241A12"
  ink-dim: "#6A5544"
  grain: "#8A6A4A"
  forest: "#0A5417"
  forest-deep: "#05240B"
  russet: "#8B4A2F"
typography:
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.4rem, 6.6vw, 4rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'opsz' 144, 'SOFT' 0, 'WONK' 0"
  headline:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.5rem, 3.4vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 72, 'SOFT' 0, 'WONK' 0"
  title:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.0rem, 1.6vw, 1.15rem)"
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
  section: "clamp(2.25rem, 5.5vw, 3.5rem)"
  cardPadding: "clamp(1.125rem, 3vw, 1.5rem)"
  stack: "clamp(0.75rem, 2vw, 1.125rem)"
  measure: "56ch"
  vaultHeight: "clamp(230px, 30vw, 400px)"
  bandHeight: "34px"
components:
  header:
    background: "{colors.paper}"
    emblem: "{colors.forest}"
    wordmark: "{typography.title}"
    minEmblemHeight: "64px"
  nav-link:
    color: "{colors.ink-dim}"
    currentColor: "{colors.russet}"
    typography: "{typography.control}"
  action:
    background: "{colors.forest}"
    color: "{colors.paper}"
    typography: "{typography.control}"
    radius: "{rounded}"
    focusRing: "{colors.forest}"
  vault:
    fill: "{colors.grain}"
    height: "{spacing.vaultHeight}"
    motion: "surface, 1.7s, once"
  grain-band:
    fill: "{colors.grain}"
    height: "{spacing.bandHeight}"
  drawn-slot:
    fill: "{colors.grain}"
    border: "{colors.grain}"
    labelBackground: "{colors.paper}"
    labelRule: "{colors.russet}"
    labelType: "{typography.label}"
  spec-row:
    label: "{colors.ink}"
    value: "{colors.ink-dim}"
    unknownValue: "{colors.russet}"
    divider: "{colors.grain}"
    typography: "{typography.body}"
  section-alt:
    background: "{colors.paper-deep}"
  footer:
    background: "{colors.forest-deep}"
    color: "{colors.paper-deep}"
    emphasis: "{colors.paper}"
---

# Design System: Agwood Mill & Lumber — Slow Grown

## Overview

**North star: tight grain costs more log to get.**

Cut a log radially and you take fewer boards from the same tree. You leave more
behind. The grain on a finished board is therefore not decoration — it is the
physical record of how much yield the mill gave up to produce that board. That is
the owner's stated position (*"I'd rather sacrifice production output than
sacrifice the quality of my product"*) written into the material instead of
claimed in marketing copy.

**What it forces.** The site is built from **drawn wood** — generated geometry,
never photography. Three things follow, and none of them is a style preference:

1. **Agwood owns no photographs of itself,** so a world that needs photography
   cannot be built. A world made of drawn material can.
2. **The trade draws grain; the web photographs it.** Grade rule books and
   wood-anatomy plates render grain as ink. Every lumber site on the internet
   renders it as a brown photographic tile. Drawing it is simultaneously more
   authentic to the buyer and unfamiliar as a website.
3. **Rings per inch is the trade's own quality measure,** so line density is
   information a buyer already reads fluently. Density carries hierarchy here; it
   is not texture.

### Anti-references — both named, deliberately

**1. The generic lumber-company template.** Full-bleed forest photo with the
company name centred over it, a "quality and service since 19XX" block, three
icon cards, a contact form. The Webflow scaffold in this repo already is that
page. This world refuses it structurally rather than by taste: there is no
photographic hero available, there is no founding year we can print, and a
three-icon card row is forbidden outright below.

**2. Schmidbauer Lumber — "The Line."** Built by the same studio, also a North
Coast redwood mill, which makes borrowing easy and the result worthless. That
site is a graphite control room about material *moving through stations*; this
one is a pale plate about material *standing still and being read*. Specifically
banned here, and each is a device that would work unchanged on both sites:
the dark cool ground, any monospace face, station rows, the conveyor rail,
instrument strips, hairline-and-tick-mark framing, and gold in any role.

### Open item — carried, not settled

The client approved the Vault to proceed but explicitly did not approve of it:
*"still not in love with your rendition of the arches though but im done fighting
it. lets see how it looks after full execution."* This is recorded so nobody
later mistakes it for a settled decision. It is reviewed again after Phase 3. If
it still does not land in context, the arch idea is abandoned rather than tuned
further.

## Colors

| Token | Value | Role |
|---|---|---|
| `paper` | `#F4EDE3` | The page ground. Warm, dry, neither cream nor white. |
| `paper-deep` | `#E9DFD1` | Alternate section ground — the only surface change on the site. |
| `ink` | `#241A12` | All headings and body copy. |
| `ink-dim` | `#6A5544` | Secondary copy, spec values, captions. |
| `grain` | `#8A6A4A` | Every drawn grain line and band. **Never carries text.** |
| `forest` | `#0A5417` | **The action colour.** |
| `forest-deep` | `#05240B` | Footer ground. |
| `russet` | `#8B4A2F` | **The state colour.** |

`forest` and `forest-deep` are measured, not chosen. The logo's opaque pixels
cluster into exactly two inks: a fill green with median `#005314` and an outline
green averaging `#05240B`. These are the only genuinely verified brand colours
Agwood has. Every Webflow `:root` swatch in the scaffold — including
`--forest-green: #25681d` — was discarded; none matches the mark.

### Named rule: **Green acts, russet locates**

Green appears **only** on something you can do: the email action, the phone and
email links, focus rings. Russet appears **only** on where you are: the current
nav item, an active state, and the label rule on a declared placeholder.

**They never cross.** Green never marks position. Russet never invites a click.

Green-and-brown is the default costume of every lumber site on the internet. This
is how it is earned: the two colours mean two different things, and a reader
learns the difference within one page.

**Don'ts for this rule specifically:**
- Don't use green for a heading, an eyebrow, a rule, a border, or a bullet.
- Don't use green to show which page you are on.
- Don't use russet on a button, a link, or anything else clickable.
- Don't introduce a third accent for warnings, success, or emphasis. There isn't
  one. An unknown value is russet because russet marks state, and "we don't know
  yet" is a state.
- Don't tint `grain` toward either accent to "tie the palette together." Grain is
  neutral material; the moment it drifts green the whole page reads as decorated.

### Contrast — verified, not assumed

**Every text colour was checked against every ground it actually sits on**, by
computation rather than by eye. Thirteen real pairings, all clearing WCAG 2.1 AA:

| | on `paper` | on `paper-deep` |
|---|---|---|
| `ink` | 14.67:1 | 12.94:1 |
| `ink-dim` | 6.03:1 | 5.32:1 |
| `forest` | 7.88:1 | 6.95:1 |
| `russet` | 5.79:1 | 5.11:1 |

`paper` on `forest` (the action button) is 7.88:1. `paper` on `forest-deep` (the
footer) is 14.30:1. `grain` on `paper` is 4.26:1 — it clears the 3:1 bar for
non-text, and it is never used for text.

The tightest text pair on the site is **russet on `paper-deep` at 5.11:1**. Note
that `#9A4E2A`, the more attractive russet, failed at 4.44:1 and was rejected;
`#8B4A2F` is the darkest value in the heartwood range that passes everywhere.

## Typography

**Two families, both variable, every axis set explicitly.**

**Fraunces** carries display, headline, and title — with `SOFT 0` and `WONK 0`
set deliberately. Those axes are what give Fraunces its playful wobble; switching
them off leaves a sharp, high-contrast serif that belongs on an engraved
technical plate. This is the single most important type decision in the system
and it is invisible unless you know to look for it.

**Archivo** carries lede, body, label, and control at `wdth 100` (105 for labels,
which need to hold their tracking).

**There is no monospace anywhere in this system.** A grade stamp is the obvious
thing to reach for on a lumber site and it leads directly to mono technical
labels — which is Schmidbauer's vocabulary, not this one. Labels are Archivo 700
with wide tracking instead.

## Layout

**One shell, one gutter, one container width.** No nested insets and no second
max-width anywhere in the build.

- Gutter: `clamp(1.125rem, 4vw, 2rem)`
- Section rhythm: `clamp(2.25rem, 5.5vw, 3.5rem)`
- Measure: `56ch` on running prose, `42ch` on a lede under a display line

Sections alternate `paper` and `paper-deep` and are separated by a **Grain Band**
rather than a rule. The band is the only divider in the system.

## Elevation & Depth

**There are no shadows.** Not one. This is a drawn plate, and a drop shadow makes
a plate look like a card — which imports the whole card-grid vocabulary the
direction exists to avoid. Depth comes from two sources only: the tonal step
between `paper` and `paper-deep`, and the density of drawn grain.

## Shapes

**Radius is `0` everywhere.** Nothing drawn on a plate has rounded corners. This
applies to the action button, the drawn slot, and any container added later.

## Components

Full specifications, HTML, and CSS live in `.impeccable/design.json`. Three are
signature and only make sense for Agwood:

### The Vault (signature)

The cathedral figure of a flatsawn redwood board, generated at build time and
rendered as **filled latewood bands, not stroked contours**. This distinction is
the whole component: a growth ring is a pale earlywood zone followed by a dense
dark band, and it is that alternation the eye reads as wood. Drawing ring
boundaries as hairlines produces an accurate contour map of a board that does not
look like a board — four rounds of parameter tuning could not fix it, because the
representation was wrong rather than the values.

The geometry is physical: rings are ellipses about a pith below the board, with
the vertical axis stretched because a board face is a *tangential* cut. That
elongation is what makes it read as a board rather than a log end. Nested arches
at the centre relax continuously into vertical grain at the edges, which is what
a real flatsawn board does; it falls out of the geometry rather than being
composed.

Appears **exactly once per site**, on Home. Type sits above it, never inside it —
the arch legs cut through the measure at every width under about 900px.

### The Grain Band (signature)

Replaces every hairline rule. A band of drawn vertical grain whose **line density
encodes the weight of the section beneath it**. Rings per inch is how the trade
measures redwood, so density is information, not decoration.

### The Drawn Slot (signature)

The declared placeholder, built from the design's own material. A missing
photograph is a framed panel of drawn redwood with a label naming what belongs
there. Never a grey box, never dashed scaffolding, never stock photography.

## Motion

One gesture. The Vault **surfaces from the bottom up** on load, the way grain
appears as a board is planed — the crown of the arch completes last. `clip-path`
inset over 1.7s, runs once, never repeats.

Every reveal's hidden start state lives under a `:root.js` selector only, so a
visitor with JavaScript disabled sees content rather than blank space.
`prefers-reduced-motion: reduce` is honoured on every animation, and the
reduced-motion branch reveals content **immediately** rather than leaving it
hidden. Scroll state is observed with a single `IntersectionObserver`, never a
scroll handler.

## Do's and Don'ts

### Do

- Draw the wood. Every grain mark is generated geometry, produced at build time
  and shipped as static SVG.
- Set `SOFT 0` and `WONK 0` on every Fraunces instance.
- Use green for actions and russet for state, and nothing else for either.
- Render an unknown as a Drawn Slot or a russet spec value that says what to do
  instead — "Call the mill" beats an empty cell and beats an invented number.
- Keep the emblem at **64px or taller**. Below that the conifer branches merge
  into a blob; this was measured at 44, 56, 64, 72, and 88.
- Set the company name in live type beside the emblem. The wordmark baked into
  the raster is never used.
- Check any new colour pair against its actual ground before shipping it.

### Don't

- **Don't put a three-icon card row on any page.** It is the category template's
  load-bearing device and the fastest way back into it.
- **Don't add a shadow.** A plate that casts a shadow is a card, and a card wants
  a grid, and a grid wants three of them.
- **Don't round a corner.** Radius is 0 and there is no exception.
- **Don't use a monospace face** for labels, specs, or anything else. It reads as
  a grade stamp, which is the correct instinct and the wrong site.
- **Don't hero a photograph**, and don't let any image or caption imply Agwood
  owns a stand of trees, a yard, or equipment it has not shown us.
- **Don't print a founding year.** "Since 1954" appears only in draft copy and is
  contradicted by three independent sources. See `PRODUCT.md`.
- **Don't write a sustainability or certification claim.** Agwood holds no FSC or
  SFI certification. The California Forest Practice Act may be stated as
  jurisdictional fact only, never as Agwood's practice or credit.
- **Don't let grain sit behind body text.** It is a 4.26:1 non-text material.
  Text goes on clean ground; the vault and the bands hold their own space.
- **Don't stretch the vault SVG.** It uses `preserveAspectRatio="xMidYMin slice"`
  so a narrow viewport crops the sides and keeps the apexes. `none` squashes the
  arches flat and destroys the figure.
- **Don't tune the vault by parameter when it looks wrong.** Twice now the fault
  was structural — once a viewBox crop eating the apexes, once contours that
  should have been filled bands. Check the representation before the numbers.
- **Don't reuse anything from Schmidbauer.** If a device would work unchanged on
  both sites, it is wrong for this one.
