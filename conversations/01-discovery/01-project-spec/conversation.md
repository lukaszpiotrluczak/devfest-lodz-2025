<!--
Prompt: prompts/01-discovery/01-project-spec.md
Date: 2025-12-12
Model: GPT-5.2
-->

# Project specification finalization

## Prompt:

# Role

You are a senior product architect and technical lead.

# Goal

Help me validate and finalize a production-ready project specification.

# Context

I am building a **digital business card platform** for myself (Łukasz Piotr Łuczak).

Primary goals (in order):

1. Personal branding / thought leadership
2. Conference networking
3. Client acquisition
4. Collaboration & recruitment

Audience:

- Potential clients
- CTOs / Tech Leads
- Academic community
- Conference networkers

Key constraints:

- This is NOT a full website or blog
- Single-page application with tabs
- Mobile-first
- EN / PL full i18n
- No analytics or tracking
- Production-grade quality

Tabs:

- Me
- Luczak Consulting
- Publications
- Events
- Contact

# Inputs

I will provide:

- Project scope
- User journeys
- Functional and non-functional requirements

# Expected Output (Markdown)

1. Refined project overview
2. Clear scope & non-scope
3. Functional requirements (MVP / nice-to-have)
4. Non-functional requirements
5. Acceptance criteria
6. Risks and mitigations

Avoid marketing language. Be concise and practical.

## Response:

## 1\. Refined project overview

A **mobile-first, single-page digital business card** for **Łukasz Piotr Łuczak**, designed for fast sharing during conferences and professional interactions.

- **Form factor:** SPA with **tabbed navigation** (no multi-page site)
- **Languages:** Full **PL / EN i18n**
- **Primary outcomes:** personal credibility → networking → inbound leads → collaboration
- **Content nature:** curated, static/mostly-static, intentionally small surface area
- **Privacy:** **no analytics, no tracking, no third-party marketing pixels**

Tabs (fixed IA):

- **Me**
- **Luczak Consulting**
- **Publications**
- **Events**
- **Contact**

---

## 2\. Clear scope & non-scope

### In scope

- One SPA with the five tabs above
- PL/EN language switch with consistent URL behavior (see NFR)
- Shareable identity: clean URL, rich link previews, QR-friendly
- Accessible, fast, resilient, SEO-friendly for a single page
- Contact methods with anti-spam measures **without tracking**
- Content administration approach that remains production-grade (even if manual)

### Out of scope (explicit)

- Full website, blog, news feed, CMS-driven portal
- User accounts, personalization, comments, likes, subscriptions
- Analytics, tracking, A/B testing, marketing automation
- Complex lead funnels, chat widgets, retargeting
- Conference/event ticketing, RSVP systems, calendars that require auth
- Recruitment pipelines, job listings, applicant management

---

## 3\. Functional requirements

### MVP (must ship)

#### Global / shell

- Tabbed navigation across the 5 tabs
- Mobile-first layout; desktop is supported but not optimized at the expense of mobile
- Language switch: PL ↔ EN
- Consistent content parity between languages (no “missing translations” states)
- Share-friendly metadata (OpenGraph/Twitter cards) per language
- Basic error states (e.g., missing content sections) handled gracefully

#### Tab: Me

- Short professional summary (PL/EN)
- Key competencies / focus areas (curated list)
- Selected highlights (e.g., 3–6 bullets: certifications, roles, research focus)
- Downloadable vCard (VCF) **or** “Add to contacts” instructions (device-friendly)

#### Tab: Luczak Consulting

- Clear “what I do” (service themes, not a catalog)
- Engagement modes (e.g., advisory, audits, architecture, workshops)
- Trust signals (e.g., standards/certs list, selected domains) without case-study depth

#### Tab: Publications

- Curated list of publications with:
  - title, venue, year, authorship line
  - link(s): DOI / publisher / PDF where legally hosted
- Optional: BibTeX download per entry (simple link)

#### Tab: Events

- List of upcoming and past speaking/attendance items:
  - event name, city/country, date (ISO formatting internally), role (speaker/attendee)
  - link to event page when available
- Ability to highlight “next event” at the top

#### Tab: Contact

- Contact options (at least 3):
  - email (click-to-mail)
  - LinkedIn / GitHub / Scholar / ORCID (as relevant)
  - optional contact form **only if** it can be implemented without tracking and with anti-spam
- If contact form exists:
  - minimal fields (name, email, message)
  - server-side validation
  - anti-spam (rate limit + honeypot; optionally CAPTCHA only if privacy-aligned)
  - clear success/failure feedback
- Legal: minimal privacy statement explaining **no tracking** and how messages are handled

---

### Nice-to-have (post-MVP)

- Deep links to tabs (e.g., `/#/publications` or `?tab=publications`) and language-prefixed routes
- QR code generation page/overlay for conference sharing (generated locally, no tracking)
- “Copy link” + “Copy email” one-tap actions
- Offline-first caching for static content (service worker) with careful update strategy
- Print-friendly view / PDF export of “Me” + “Contact” (client-side)
- Content source as versioned data files (e.g., JSON/YAML) to reduce code churn
- Micro-search within Publications/Events (client-side only)

---

## 4\. Non-functional requirements

### Quality attributes

- **Performance:** fast on mid-tier mobile devices; avoid heavy client bundles
- **Accessibility:** WCAG 2.1 AA baseline (keyboard nav, contrast, ARIA for tabs)
- **Reliability:** works without third-party JS/CDN dependencies for core UX
- **Security:** secure headers, form hardening (if any backend), dependency hygiene
- **Privacy:** no analytics, no tracking, no fingerprinting, no third-party beacons
- **Maintainability:** content updates should not require refactoring UI logic
- **Internationalization:** full PL/EN coverage; locale-safe dates, typography, hyphenation where possible

### Technical constraints (derived)

- SPA with tabs (single-page behavior)
- Mobile-first responsive design
- i18n must cover:
  - UI labels
  - content strings
  - metadata (title/description/OG)
- No analytics SDKs, no embedded trackers (including “privacy-friendly” ones)

---

## 5\. Acceptance criteria

### Global

- App loads and is usable on a mobile viewport (360×800) with no horizontal scrolling
- Tab navigation:
  - supports keyboard navigation
  - preserves focus correctly
  - has a visible active state
- Language switching:
  - toggling language updates **all** UI + content + metadata (where applicable)
  - no mixed-language screen after switch
- No analytics/tracking:
  - no third-party analytics scripts
  - no calls to known tracking endpoints
- Lighthouse-style checks (conceptual):
  - no critical accessibility issues
  - no blocking errors in console on normal navigation

### Me tab

- Displays summary, competencies, highlights (PL/EN)
- vCard download (if included) produces a valid `.vcf` file and imports on at least one mobile platform

### Luczak Consulting tab

- Clearly states service themes and engagement modes in both languages
- All external links open safely (no leaking referrer if you choose to enforce that)

### Publications tab

- Each entry includes required fields (title, venue, year, link)
- Links are valid and distinguish between DOI/publisher/PDF where present

### Events tab

- Upcoming vs past is correctly determined from dates
- “Next event” (if implemented) matches the nearest future date

### Contact tab

- Email and at least two professional profiles are present and clickable
- If a form exists:
  - validation blocks empty/invalid email
  - rate limiting works (repeated submits are throttled)
  - submissions succeed end-to-end and produce a delivered message (or stored message) without exposing secrets

---

## 6\. Risks and mitigations

| Risk                            | Why it matters                         | Mitigation                                                                                                    |
| ------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Scope creep into “full site”    | Dilutes the goal and extends timelines | Maintain explicit non-scope list; limit tabs and content volume                                               |
| i18n drift (PL/EN mismatch)     | Professional credibility hit           | Enforce “no missing translations” checks; treat content parity as release gate                                |
| Contact form abuse/spam         | Reputation and operational burden      | Prefer mailto + profiles; if form exists: honeypot + rate limit + server-side validation                      |
| SEO/preview issues in SPA       | Link previews may be wrong without SSR | Ensure metadata strategy supports per-language previews (build-time rendering or static generation if needed) |
| Overweight UI bundle            | Hurts mobile performance               | Keep dependencies minimal; avoid heavy component libraries unless justified                                   |
| External links rot              | Publications/events become stale       | Store links in versioned data; periodic link check (manual or CI)                                             |
| “No analytics” reduces feedback | Harder to iterate based on usage       | Use qualitative feedback loops (direct conversations), not tracking                                           |

---

If you paste your **project scope + user journeys + FR/NFR draft**, I’ll fold them into this structure and tighten any ambiguities into testable requirements.

## Prompt:

## Project Scope (Draft)

markdown

### In Scope

- A production-grade **digital business card platform** acting as a primary online contact hub.
- Single-page application with **tab-based navigation**.
- Tabs:
  - Me
  - Luczak Consulting
  - Publications
  - Events
  - Contact
- Mobile-first design, optimized for fast scanning and networking use cases (QR / link / NFC).
- Full bilingual support (**EN / PL**) with content parity.
- Public personal and company information only (no private data).
- Static content storage (JSON / Markdown) for:
  - publications
  - events
- Contact form with backend handling (NestJS).
- SEO and structured data to make this page a primary reference point for search engines.
- Deployment-ready setup (Coolify).

### Out of Scope

- Blog or CMS
- User accounts or authentication
- Analytics, tracking, cookies
- Marketing automation
- Payments or subscriptions

---

## User Journeys (Draft)

markdown

### 1. Conference Networking Journey

- User scans a QR code during a conference.
- Lands on the default "Me" tab.
- Quickly sees name, role, company, and photo.
- Uses quick actions (Call / WhatsApp / Email).
- Optionally opens the Events tab to see the current talk.

### 2. Potential Client Journey

- User arrives from LinkedIn or a direct referral.
- Reads short professional bio and roles.
- Switches to the "Luczak Consulting" tab.
- Reviews company details and credentials.
- Uses the Contact form or schedules a meeting.

### 3. Academic / Research Journey

- User arrives from a search engine via a publication or DOI.
- Navigates to the Publications tab.
- Opens DOI link or downloads citation data.
- Optionally checks Events or Contact information.

### 4. Recruiter / Collaborator Journey

- User lands on the profile.
- Reviews roles and areas of expertise.
- Uses Contact or Meeting CTA to initiate conversation.

---

## Functional Requirements (Draft)

markdown

### Core Functional Requirements (MVP)

- Display a hero section with:
  - photo
  - full name
  - headline / short description
  - primary role and company
- Tab-based navigation with keyboard accessibility.
- "Me" tab:
  - short bio
  - quick contact actions (call, SMS, WhatsApp, email)
  - social profile links
- "Luczak Consulting" tab:
  - company description
  - full registry data (address, KRS, NIP, REGON)
  - company contact details
- "Publications" tab:
  - list of publications (if present)
  - DOI links
  - citation export (e.g. BibTeX)
- "Events" tab:
  - list of upcoming events only
  - visible only if events occur within the next 90 days
- "Contact" tab:
  - contact form (email + topic + message)
  - topic-based routing on the backend
- Full EN / PL language switch with identical structure.

### Nice-to-Have

- vCard download
- NFC usage hints
- Print-friendly layout

---

## Non-Functional Requirements (Draft)

markdown

### Performance

- Fast initial load (Astro static output).
- Minimal client-side JavaScript.
- Optimized assets.

### Security

- Input validation on backend endpoints.
- Rate limiting on contact form.
- Honeypot field for spam protection.
- GDPR-compliant captcha (no tracking).
- Secure HTTP headers (CSP, HSTS where applicable).

### Accessibility

- Keyboard-navigable tabs.
- Proper ARIA roles.
- Sufficient color contrast.
- Visible focus states.

### SEO / Discoverability

- Semantic HTML.
- OpenGraph and Twitter meta tags.
- hreflang for EN / PL.
- JSON-LD structured data for:
  - Person
  - Organization
  - Event
  - ScholarlyArticle.

### Maintainability

- Clear separation between content and presentation.
- Static content editable without code changes.
- Production-ready repository structure and CI checks.

## Response:

## 1\. Refined project overview

A **production-grade digital business card** (primary online contact hub) for **Łukasz Piotr Łuczak**, optimized for **conference networking** and **professional discovery**.

- **UI:** single-page, tab-based navigation (mobile-first, keyboard-accessible)
- **Content:** public-only; curated; mostly static
- **i18n:** full PL/EN parity, including metadata and structured data
- **Stack intent:** Astro for static output + minimal JS; NestJS backend only for contact form
- **Privacy:** no analytics, tracking, cookies, marketing pixels

---

## 2\. Scope and non-scope

### In scope (final)

- SPA with tabs: **Me / Luczak Consulting / Publications / Events / Contact**
- Hero section: photo, full name, headline, role/company
- Mobile-first UX for QR/link/NFC usage; fast “scan & act” interactions
- Full **PL/EN** with identical structure and content parity
- Publications & events stored as **versioned static data** (JSON and/or Markdown)
- **Contact form + NestJS backend** with spam protection and topic routing
- **SEO-first single-page**: semantic HTML, OpenGraph/Twitter, hreflang, JSON-LD
- Deployment-ready for **Coolify** (build + runtime separation, env handling)

### Out of scope (final)

- Blog, CMS, newsletter, feed, dynamic content editing UI
- Accounts/auth, user-generated content
- Analytics/tracking/cookies, marketing automation
- Payments/subscriptions
- Complex scheduling system (can link out to external calendar tool)

> Note: “Primary reference point for search engines” is in-scope **only** via SEO/structured data and high-quality content—not via growth mechanisms.

---

## 3\. Functional requirements

### MVP (must ship)

#### Global / shell

- **Tab navigation**
  - Click/tap + keyboard (Arrow keys / Tab / Enter/Space) with correct ARIA roles
  - Deep-linkable state (either `/#contact` or `?tab=contact`) **and** language-aware URLs (`/pl/…`, `/en/…`)
- **Language switch**
  - PL/EN toggle; persists choice (localStorage allowed; no cookies required)
  - Updates: UI strings, content, **meta tags**, **JSON-LD**, `hreflang`
- **Hero**
  - Photo + name + headline + primary role/company
  - At least one primary CTA: “Contact” / “Email”
- **External links policy**
  - `rel="noopener noreferrer"`; consistent icon/labeling; optionally `referrerpolicy="no-referrer"`

#### Me tab

- Short bio (PL/EN)
- Quick actions:
  - call, SMS, WhatsApp, email (rendered conditionally if data present)
- Social links (curated set; e.g., LinkedIn, GitHub, Scholar/ORCID)

#### Luczak Consulting tab

- Company description (PL/EN)
- Company registry block (address, KRS/NIP/REGON where applicable)
- Company contact details (email/phone, optionally office location link)

#### Publications tab

- List of publications from static data with fields:
  - title, authors, venue, year, identifiers (DOI optional), links
- **Citation export**
  - BibTeX (minimum); optional CSL-JSON later
- Each entry has a stable anchor for deep-linking (`#pub-<id>`)

#### Events tab

- Shows **upcoming events only**
- **Visibility rule:** tab/section is hidden if there are no events within the next **90 days**
- Each event: name, date range, location, role (speaker/attendee), link
- Optional “Current/Next talk” highlight if an event is within a short window (e.g., next 14 days)

#### Contact tab

- Contact form fields:
  - email, topic, message (name optional)
- Backend routing by topic (e.g., consulting / research / speaking / collaboration)
- Success + error UI states (including rate-limit message)
- Alternative contact methods always present (email + at least 1 profile link)

---

### Nice-to-have (post-MVP)

- vCard download (`.vcf`)
- NFC usage hints (OS-specific short tips)
- Print-friendly layout (CSS print) for Me + Contact
- Local QR overlay (generated client-side) for current language/tab link
- Client-side search/filter in Publications (no tracking)

---

## 4\. Non-functional requirements

### Performance

- Static-first build (Astro output); hydrate only where needed
- Budget targets (suggested):
  - <= ~150–200 KB gzipped JS total for MVP (excluding images/fonts)
  - LCP on mobile: “good” range (avoid heavy hero media)
- Images: responsive (`srcset`), modern formats, lazy-load below the fold

### Security (backend + frontend)

- Contact API:
  - strict input validation (schema-based), server-side sanitization
  - rate limiting (IP + optionally email-based)
  - honeypot field + timing threshold
  - CSRF not needed if only same-origin + no cookies; otherwise include CSRF strategy
- HTTP headers (at minimum):
  - CSP (script-src tight, no unsafe-inline if feasible)
  - HSTS (when HTTPS is assured)
  - X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Dependency hygiene:
  - lockfile, automated vulnerability scanning in CI

### Privacy / GDPR

- No analytics/tracking/cookies
- Contact form privacy notice:
  - purpose + retention policy + controller contact
- CAPTCHA: only if needed; must be **privacy-aligned** (prefer no third-party CAPTCHA)

### Accessibility

- WCAG 2.1 AA baseline:
  - ARIA tab pattern implemented correctly
  - focus visible, contrast compliant
  - reduced-motion support

### SEO / Discoverability

- Semantic HTML + per-language metadata
- `hreflang` correctness (PL/EN + x-default optional)
- JSON-LD entities:
  - Person, Organization
  - ScholarlyArticle (for publications)
  - Event (for upcoming events)
- Share previews: OG/Twitter cards per language

### Maintainability / ops

- Content separated from UI; updates do not require code changes beyond data files
- CI checks: lint, typecheck, tests, formatting, link validation (nice-to-have)
- Coolify-ready:
  - build-time env vs runtime env clearly separated
  - secrets only on backend; frontend contains no secrets

---

## 5\. Acceptance criteria (testable)

### Navigation & i18n

- Tabs usable with keyboard and screen reader (roles/state announced correctly)
- Deep link opens the correct tab and correct language
- Switching language updates:
  - visible content
  - `<title>` + meta description
  - OG/Twitter tags
  - JSON-LD output
- No mixed-language UI after switching

### Events visibility rule

- If `now + 90 days` contains no events → Events tab is hidden
- If at least one upcoming event within 90 days → tab visible and list shows only upcoming

### Contact form

- Invalid email / empty message blocked (client + server)
- Rate limiting triggers on repeated submissions
- Honeypot triggers rejection without revealing spam logic
- Topic routing verified (e.g., different recipient or mailbox tag)
- No third-party trackers loaded during submit flow

### Privacy

- No analytics scripts, no tracking pixels, no calls to common analytics endpoints in network log
- No cookies set by the app (unless strictly necessary; if any, documented)

### SEO

- `hreflang` present and correct for both languages
- JSON-LD validates (no critical schema errors) for Person/Organization, and for items present (Event/ScholarlyArticle)

---

## 6\. Risks and mitigations

| Risk                                       | Impact                             | Mitigation                                                                                                                          |
| ------------------------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| SPA metadata limitations                   | Broken share previews / weaker SEO | Use Astro routes per language (even if UI is “single-page”), or build-time rendered variants; avoid purely client-side meta updates |
| Contact form spam                          | Operational noise                  | Prefer minimal form; add honeypot + rate limits; add privacy-friendly CAPTCHA only if needed                                        |
| i18n drift / missing parity                | Credibility hit                    | Treat parity as release gate; automate checks for missing keys/content                                                              |
| Over-scoping “SEO primary reference point” | Unclear success criteria           | Define measurable acceptance: correct metadata, structured data, fast page, stable URLs—not ranking guarantees                      |
| Registry data changes                      | Stale information                  | Version content; add a lightweight review cadence (manual quarterly check)                                                          |
| Dependency bloat                           | Performance regressions            | Keep UI library minimal; enforce bundle budget in CI (nice-to-have)                                                                 |

---

### One spec-level adjustment I recommend (important)

To satisfy **SEO + share previews + i18n** while still being “single-page with tabs”, implement **two static entry routes**:

- `/pl/` and `/en/` (and optionally tab anchors like `/en/#contact`)  
  This keeps UX “single-page”, but avoids relying on client-side meta updates that many crawlers/social scrapers ignore.

If you want, I can turn this into a **single “Project Specification” markdown file** (ready to commit) with a crisp checklist section for MVP readiness and CI gates.

## Prompt:

Thanks — this is very helpful and more complete than the initial draft.

Please produce a **final, clean project specification document** by:

- merging your refined version with the original scope, journeys, and requirements I provided,
- keeping the structure clear and production-oriented,
- removing any conversational or meta commentary.

Please use the following **document header exactly as written**:

---

# Digital Business Card Platform

## Project Specification

**Owner:** Łukasz Piotr Łuczak  
**Primary domain:** https://lukaszpiotrluczak.me  
**Languages:** English (EN), Polish (PL)

---

Guidelines for the final output:

- Treat this as the **authoritative project artifact**.
- Use clear, testable language where possible.
- Keep scope boundaries explicit (no scope creep).
- Preserve the following sections (you may refine wording, but not remove intent):
  - Project Overview
  - Target Audience
  - Core UX Concept
  - User Journeys
  - Functional Requirements (MVP / Nice-to-have)
  - Non-Functional Requirements
  - Architecture Overview
  - Acceptance Criteria
  - Out of Scope
  - Key Risks & Mitigations

The output should be ready to save directly as docs/project-spec.md in a public repository.

## Response:

---

# Digital Business Card Platform

## Project Specification

**Owner:** Łukasz Piotr Łuczak  
**Primary domain:** [https://lukaszpiotrluczak.me](https://lukaszpiotrluczak.me)  
**Languages:** English (EN), Polish (PL)

---

## Project Overview

The Digital Business Card Platform is a **production-grade, single-page application** that serves as the primary online contact and reference point for Łukasz Piotr Łuczak.

The platform is intentionally **not a full website**. Its purpose is to support fast, high-quality professional discovery and contact initiation in contexts such as conferences, referrals, academic citations, and client introductions.

Key characteristics:

- Single-page application with **tab-based navigation**
- **Mobile-first**, optimized for QR, link, and NFC usage
- Fully bilingual (**EN / PL**) with strict content parity
- Mostly static, curated content
- **No analytics, tracking, cookies, or marketing automation**
- Production-grade quality in performance, accessibility, security, and maintainability

---

## Target Audience

Primary audiences:

- Potential clients
- CTOs / Tech Leads
- Academic and research community
- Conference networkers and collaborators

Secondary audiences:

- Recruiters
- Event organizers
- Industry peers

---

## Core UX Concept

- A **single-page interface** with clearly defined tabs representing distinct information areas.
- Default entry point is the **“Me”** tab.
- Content is optimized for **fast scanning**, not long reading.
- Actions (contact, links, downloads) are always one or two interactions away.
- Language selection is explicit and persistent.
- Visual and interaction design prioritizes clarity, accessibility, and speed over visual complexity.

Tabs:

1.  Me
2.  Luczak Consulting
3.  Publications
4.  Events
5.  Contact

---

## User Journeys

### 1\. Conference Networking Journey

- User scans a QR code during a conference.
- Lands on the default **Me** tab.
- Sees name, role, company, and photo immediately.
- Uses a quick action (call, WhatsApp, email).
- Optionally opens the **Events** tab to see the current or upcoming talk.

### 2\. Potential Client Journey

- User arrives from LinkedIn or a direct referral.
- Reads a short professional summary.
- Navigates to **Luczak Consulting**.
- Reviews company description, credentials, and registry data.
- Uses the **Contact** tab to initiate communication or schedule a meeting (via external link if used).

### 3\. Academic / Research Journey

- User arrives via a search engine, DOI, or citation link.
- Navigates directly to **Publications**.
- Opens DOI or publisher link.
- Optionally exports citation data and checks **Events** or **Contact**.

### 4\. Recruiter / Collaborator Journey

- User lands on the profile.
- Reviews roles, expertise areas, and professional focus.
- Uses **Contact** or direct email to initiate a conversation.

---

## Functional Requirements

### MVP (Must Ship)

#### Global / Shell

- Single-page application with **tab-based navigation**
- Keyboard-accessible tabs with correct ARIA roles
- Deep-linkable tab state (anchor or query-based)
- Language-aware entry points (`/en/`, `/pl/`)
- Persistent EN/PL language switch (no cookies required)
- Hero section with:
  - photo
  - full name
  - headline / short description
  - primary role and company
- External links use safe attributes (`noopener`, `noreferrer`)

#### Me Tab

- Short professional bio (EN / PL)
- Quick contact actions:
  - call
  - SMS
  - WhatsApp
  - email  
    (rendered conditionally based on availability)
- Curated social/profile links (e.g. LinkedIn, GitHub, Scholar/ORCID)

#### Luczak Consulting Tab

- Company description (EN / PL)
- Engagement focus (themes, not a service catalog)
- Company registry data:
  - address
  - KRS
  - NIP
  - REGON
- Company contact details

#### Publications Tab

- Static list of publications stored as versioned data (JSON / Markdown)
- Each entry includes:
  - title
  - authors
  - venue
  - year
  - identifiers (DOI where applicable)
  - external links
- Citation export:
  - BibTeX (minimum)
- Stable anchors per publication for deep linking

#### Events Tab

- Displays **upcoming events only**
- Events sourced from static data
- Visibility rule:
  - tab is hidden if no events occur within the next **90 days**
- Each event includes:
  - name
  - date or date range
  - location
  - role (speaker / attendee)
  - external link
- Optional highlight for the nearest upcoming event

#### Contact Tab

- Contact form with backend handling (NestJS)
- Fields:
  - email
  - topic
  - message
- Topic-based routing on the backend
- Clear success and error states
- Alternative contact methods always visible (email + profile link)
- Minimal privacy notice (no tracking, purpose of contact data)

---

### Nice-to-Have (Post-MVP)

- vCard (`.vcf`) download
- NFC usage hints
- Client-side QR code generation for sharing
- Print-friendly layout (CSS print) for Me + Contact
- Client-side filtering/search for Publications
- Offline-first static caching (service worker)

---

## Non-Functional Requirements

### Performance

- Static-first output (Astro)
- Minimal client-side JavaScript
- Optimized images with responsive formats
- Fast initial load on mid-tier mobile devices

### Security

- Strict server-side input validation for contact form
- Rate limiting on contact endpoint
- Honeypot field and timing-based spam detection
- No third-party CAPTCHA unless strictly required and privacy-aligned
- Secure HTTP headers:
  - CSP
  - HSTS (when applicable)
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy

### Privacy / GDPR

- No analytics, tracking, cookies, or fingerprinting
- Contact data used only for response purposes
- Clear data controller information
- No third-party data sharing

### Accessibility

- WCAG 2.1 AA baseline
- Fully keyboard-navigable UI
- Proper ARIA roles and states
- Visible focus indicators
- Sufficient color contrast
- Reduced-motion support

### SEO / Discoverability

- Semantic HTML
- Per-language metadata
- `hreflang` for EN / PL
- OpenGraph and Twitter cards
- JSON-LD structured data for:
  - Person
  - Organization
  - ScholarlyArticle
  - Event (when applicable)

### Maintainability

- Clear separation between content and presentation
- Static content editable without UI code changes
- Versioned content files
- CI checks for linting, type safety, and build correctness
- Deployment-ready for Coolify with clean env separation

---

## Architecture Overview

- **Frontend**
  - Astro-based static build
  - Tabbed SPA behavior
  - Minimal hydration for interactive elements
  - Language-specific entry routes (`/en/`, `/pl/`)
- **Content**
  - Static data files (JSON / Markdown)
  - Version-controlled
- **Backend**
  - NestJS service for contact form handling only
  - No session state
  - No user authentication
- **Deployment**
  - Static frontend + backend service deployed via Coolify
  - HTTPS enforced

---

## Acceptance Criteria

### Navigation & i18n

- Tabs are usable via keyboard and screen reader
- Deep links open the correct tab and language
- Language switch updates:
  - visible content
  - page title and meta description
  - OpenGraph/Twitter metadata
  - JSON-LD output
- No mixed-language UI states

### Events Visibility

- Events tab is hidden if no events occur within the next 90 days
- Only upcoming events are displayed

### Contact Form

- Invalid input is rejected client-side and server-side
- Rate limiting activates on repeated submissions
- Honeypot triggers silent rejection
- Topic-based routing works as configured
- No tracking or third-party scripts are loaded during submission

### Privacy

- No cookies set by the application
- No network calls to analytics or tracking endpoints

### SEO

- Valid `hreflang` configuration
- JSON-LD validates without critical errors
- Share previews render correctly for both languages

---

## Out of Scope

- Blog, CMS, newsletter, or content feed
- User accounts, authentication, or personalization
- Analytics, tracking, cookies, marketing automation
- Payments, subscriptions, or gated content
- Complex scheduling or booking systems
- Recruitment pipelines or job listings

---

## Key Risks & Mitigations

| Risk                             | Mitigation                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| Metadata limitations in SPA      | Use language-specific static entry routes rendered at build time                   |
| Contact form spam                | Prefer minimal form; use honeypot and rate limiting; add CAPTCHA only if necessary |
| EN/PL content drift              | Treat language parity as a release gate; validate content completeness             |
| Over-expansion into full website | Enforce explicit out-of-scope list and fixed tab structure                         |
| Dependency bloat                 | Keep frontend dependencies minimal; review bundle size regularly                   |
| Stale registry or event data     | Version content and review periodically                                            |

---

---

Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)
