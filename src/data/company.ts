/**
 * Agwood Mill & Lumber — the company record.
 *
 * THIS IS THE ONLY PLACE the name, address, phone, email, or hours are written.
 * Page copy, the footer, the contact page and the JSON-LD structured data all
 * render from these constants. They are never retyped anywhere in the tree.
 *
 * That matters more here than on a normal build. Agwood has no website, and the
 * third-party listings that currently describe it disagree with each other on the
 * street address (650 Kunzler Ranch Rd vs 650 Hollow Tree Rd), the phone (-5486
 * vs -5487), the legal entity (Inc vs LLC) and the number of locations. Search
 * engines reconcile a business across sources by matching name, address and phone
 * byte for byte. A single stray character in one of them — "Rd." instead of "Rd",
 * "(707)468-5486" instead of "(707) 468-5486" — reads as a different business and
 * costs exactly the consistency this site exists to establish.
 *
 * CHANGES OFTEN: nothing here should. Treat any edit as a NAP change and check it
 * against the Google Business Profile in the same sitting.
 * SIGNED OFF BY: the client, in the Phase 1 interview — address, phone, email,
 * species and channel confirmed directly. Hours come from the original brief.
 * Everything NOT confirmed lives in `unknowns` below rather than being guessed.
 */

export interface PostalAddress {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface Company {
  name: string;
  address: PostalAddress;
  /** Human display form. The digits-only form for tel: links is derived, never typed. */
  phone: string;
  hours: { days: string; opens: string; closes: string; display: string };
  species: string;
  products: readonly string[];
  channel: string;
}

export const COMPANY: Company = {
  name: 'Agwood Mill & Lumber',
  address: {
    street: '650 Kunzler Ranch Rd',
    locality: 'Ukiah',
    region: 'CA',
    postalCode: '95482',
    country: 'US',
  },
  phone: '(707) 468-5486',
  hours: {
    days: 'Mo,Tu,We,Th,Fr',
    opens: '07:00',
    closes: '16:00',
    display: 'Monday to Friday, 7AM – 4PM',
  },
  species: 'Redwood',
  products: ['Decking', 'Fencing', 'Custom milling'],
  channel: 'Wholesale — retailers and distributors across Northern California',
};

/** tel: needs digits only; deriving it means the display string stays canonical. */
export const PHONE_HREF = `tel:+1${COMPANY.phone.replace(/\D/g, '')}`;

/**
 * There is deliberately NO email address on this site.
 *
 * The client confirmed on 2026-08-26 that email is not a channel Agwood wants
 * published. The telephone is the only way in. That is a product decision, not an
 * oversight: do not add a mailto: link, an enquiry form, or a contact address to
 * "make it easier" — every one of those routes an enquiry somewhere nobody is
 * reading. The structured data omits `email` for the same reason.
 */

/**
 * The product list as running prose: "Decking, fencing and custom milling".
 *
 * The array above is title-cased because that is correct in a spec row, where each
 * value stands alone. Dropping that array straight into a sentence produces
 * "Decking, Fencing, Custom milling from one mill in Ukiah", which reads as three
 * proper nouns. Derived rather than written out a second time so the two forms
 * cannot drift apart when a product is added.
 */
export const PRODUCTS_SENTENCE: string = (() => {
  const [first, ...rest] = COMPANY.products;
  if (!first) return '';
  const lower = rest.map((p) => p.toLowerCase());
  const last = lower.pop();
  if (!last) return first;
  return `${[first, ...lower].join(', ')} and ${last}`;
})();

/** One-line address, used wherever the full block would be too much. */
export const ADDRESS_LINE =
  `${COMPANY.address.street}, ${COMPANY.address.locality}, ${COMPANY.address.region} ${COMPANY.address.postalCode}`;

/**
 * The ownership record — three dated beats, client-confirmed 2026-08-25.
 *
 * This exists because of the SECOND job in PRODUCT.md: the company has to be
 * findable and verifiably real. The public record currently disagrees with itself
 * about the address, the phone, the entity and the founding year, and several live
 * listings describe the predecessor company. A buyer who lands here off a stale
 * listing is asking one question — "is this the same outfit, and is it running?" —
 * and these three lines are the only thing on the site that answers it.
 *
 * WHAT MAY BE PRINTED, AND WHY IT IS NOT THE BANNED FOUNDING YEAR. DESIGN.md says
 * do not print a founding year. That ban is aimed at "Since 1954", which appears
 * only in draft marketing copy and is contradicted by three independent sources.
 * The dates below are a different class of fact with recorded provenance: client
 * confirmation, contemporaneous trade-press coverage of the 2017 acquisition, and
 * the California Secretary of State registration dated 29 January 2025. The first
 * beat stays deliberately vague — "the early 1980s", never a specific year — because
 * that is the resolution the evidence actually supports.
 *
 * DO NOT rewrite these into a heritage claim. "Milling redwood since 1981" is
 * precisely the sentence the evidence does not support and the ban exists to stop.
 *
 * CHANGES OFTEN: no.
 * SIGNED OFF BY: the client, 2026-08-25, in response to a direct question.
 */
export interface Beat {
  /** Deliberately a string, not a number: "Early 1980s" is the honest resolution. */
  date: string;
  say: string;
}

export const RECORD: readonly Beat[] = [
  {
    date: 'Early 1980s',
    say: 'The Agwood name goes on a redwood mill on Kunzler Ranch Road in Ukiah.',
  },
  {
    date: '2017',
    say: 'The business and its assets are sold to Conrad Forest Products of North Bend, Oregon.',
  },
  {
    date: '2025',
    say: 'The mill is restarted under local family ownership. Same name, same ground.',
  },
];

/**
 * Whether the ownership record is published.
 *
 * Ships OFF until the client signs off on printing the 2017 and 2025 dates. The
 * reasoning for why they are printable is directly above; this flag exists so that
 * reasoning can be overruled with a one-character edit rather than a revert.
 */
export const SHOW_RECORD = false;

/**
 * Facts the client has NOT confirmed, kept here so the site can name the gap in
 * its own material rather than inventing an answer or silently omitting one.
 *
 * A wholesale buyer's first question is grades and dimensions. We cannot answer
 * it. Saying "call the mill" is worth more than an empty table and infinitely
 * more than a plausible invented spec — see PRODUCT.md, "Unverified".
 */
export interface Unknown {
  field: string;
  say: string;
}

export const UNKNOWNS: readonly Unknown[] = [
  { field: 'Grades and dimensions', say: 'Call the mill — not yet published' },
  { field: 'Lead times', say: 'Call the mill' },
  { field: 'Minimum order', say: 'Call the mill' },
];

/**
 * Third-party profiles for structured data `sameAs`.
 *
 * DELIBERATELY EMPTY. The client deferred claiming and auditing the existing
 * listings, and several of the ones in circulation appear to describe the
 * predecessor company rather than the current entity. Pointing sameAs at a
 * listing that contradicts the address above would actively harm the thing this
 * data exists to do. Fill this in only with profiles that have been claimed and
 * corrected — see the launch list in README.md.
 */
export const SAME_AS: readonly string[] = [];
