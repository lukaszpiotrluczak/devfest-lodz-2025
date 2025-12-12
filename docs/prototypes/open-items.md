# Open items

## Design tokens / theme contract items that are `"UNDEFINED"`

From the design contract + compiled theme:

- `color.tokens.gray-100.value` (light surfaces)
- `color.tokens.gray-800.value` (dark surfaces)
- `color.tokens.gray-500.value` (secondary text)
- `color.tokens.gray-300.value` (dividers/outlines)
- `components.forms.fields` (form field styling contract)

Impact:

- Prototype uses theme fallbacks already present in `docs/theme/tailwind-theme.css`.
- Form field visuals are kept generic (border + padding + focus-visible baseline).

## Content gaps / missing required URLs

- Company primary website URL (if there is a canonical Luczak Consulting site).
  - Prototype uses Contact tab as primary CTA + external ZenCal link.
- Privacy policy URL/content:
  - Prototype uses placeholder routes:
    - EN: `/en/privacy`
    - PL: `/pl/polityka-prywatnosci`
- Event external link for “DevFest Łódź 2015” is `TBD` (seed does not provide a URL).
- Publication external links for 2024 conference papers are `TBD` (seed does not provide URLs/DOIs).

## Requirements needing NestJS (blocked for full fidelity)

Contact form submission (project spec):

- `POST /api/contact` implementation:
  - strict server-side input validation
  - rate limiting
  - honeypot handling + timing-based spam detection
  - topic-based routing
  - consistent success/error responses (no tracking)

## Implementation clarifications needed

- Events window rule:
  - IA: events tab visible if any events exist within ±90 days
  - Project spec: display upcoming events only (next 90 days)
  - Prototype supports both upcoming + recent sections, but “Recent” only renders if non-empty.
  - Decision needed: keep “Recent” in MVP (IA) or remove to match MVP spec strictly.

- Publications max visible:
  - IA: max 5 items visible
  - Seed currently has 4 items (OK)
  - Decide behavior when >5 (e.g., “View all” is out of IA; must not add without IA change).

- Head/OG images:
  - Provide final asset paths and per-locale OG images for OpenGraph/Twitter tags.

- Locale-specific structured data:
  - Prototype updates JSON-LD client-side for demonstration.
  - In Astro production, JSON-LD must be rendered per route at build time (no client-side mutation).
