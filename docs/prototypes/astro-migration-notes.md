# Astro migration notes

## Component breakdown (Astro)

**Pages / routes**
- `src/pages/en/[tab].astro` (or explicit: `me.astro`, `luczak-consulting.astro`, …)
- `src/pages/pl/[tab].astro` (or explicit: `o-mnie.astro`, `luczak-consulting.astro`, …)
- Root redirects:
  - `/` → `/en/me`
  - `/en` → `/en/me`
  - `/pl` → `/pl/o-mnie`

**Layout**
- `src/layouts/AppLayout.astro`
  - `<head>` SEO + OG/Twitter + hreflang
  - JSON-LD output per route/locale
  - Theme CSS import (global): `docs/theme/tailwind-theme.css` (move to `src/styles/theme.css`)
  - Container shell

**UI components**
- `src/components/HeroHeader.astro`
  - avatar, name, headline, language switch links
  - quick actions row
  - social icon row
- `src/components/Tabs.astro`
  - renders tablist + buttons (icons + labels)
  - active tab driven by current route
- `src/components/TabPanel.astro`
  - wrapper for tab content (role="tabpanel" etc.)
- `src/components/GlassCard.astro`
  - `glass-surface rounded-2xl` + standard padding + content order
- `src/components/Button.astro`
  - variants: primary/secondary (contract tokens via CSS vars)
- `src/components/PublicationList.astro`
  - renders up to 5 items (newest first) + stable anchors
  - includes BibTeX link (static file)
- `src/components/EventList.astro`
  - filters and renders events within ±90 days
  - groups upcoming/recent (render sections only when non-empty)
- `src/components/ContactForm.astro`
  - renders form UI
  - success/error placeholder regions (hydrated island if needed)

## What becomes interactive JS vs stays static

**Stays static (preferred)**
- Tabs: route-driven, no client JS required if each tab is its own page route.
- Locale switching: static links that preserve tab via mapping.

**Interactive (minimal hydration only where needed)**
- Contact form submission:
  - Either full-page POST + redirect (no JS),
  - or a small hydrated island for async submit + inline success/error.

Optional (keep minimal):
- Theme preference (system default; optional toggle later if explicitly added).
- Client-side enhancements like smooth scrolling (avoid by default).

## Data loading plan (JSON/MD)

**Static content files**
- `src/content/identity.en.json`, `src/content/identity.pl.json`
- `src/content/company.en.json`, `src/content/company.pl.json`
- `src/content/publications.json` (language-neutral, with optional per-locale titles if needed)
- `src/content/events.json` (language-neutral + per-locale talk fields)

**BibTeX**
- `public/data/publications.bib` (generated/maintained from publications data)

**Assets**
- `public/assets/avatar.jpg`
- `public/assets/og/en.png`, `public/assets/og/pl.png`
- `public/assets/logo-luczak-consulting.svg` (if used later)

## i18n routing plan (`/en/`, `/pl/`)

- Follow IA slugs strictly:
  - EN: `/en/me`, `/en/luczak-consulting`, `/en/publications`, `/en/events`, `/en/contact`
  - PL: `/pl/o-mnie`, `/pl/luczak-consulting`, `/pl/publikacje`, `/pl/wydarzenia`, `/pl/kontakt`
- Language switch preserves active tab using a slug map:
  - `me` ↔ `o-mnie`, `publications` ↔ `publikacje`, `events` ↔ `wydarzenia`, `contact` ↔ `kontakt`
  - `luczak-consulting` is the same in both locales.

## Conditional visibility (build-time + runtime)

- Publications tab:
  - if `publications.length === 0`, do not render tab button and do not build the page (or build with redirect to `/[lang]/me`)
- Events tab:
  - compute `eventsInWindow = events.filter(date within ±90 days of build date)`
  - if empty, do not render the tab and do not build the page (or redirect)
- In Astro, prefer build-time filtering and rendering for SEO stability.

## Backend integration (NestJS)

- Contact form endpoint:
  - `POST /api/contact`
  - server-side validation + rate limiting + honeypot
  - topic-based routing
- CORS not needed if same origin (preferred).