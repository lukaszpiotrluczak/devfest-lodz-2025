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

1. Me
2. Luczak Consulting
3. Publications
4. Events
5. Contact

---

## User Journeys

### 1. Conference Networking Journey

- User scans a QR code during a conference.
- Lands on the default **Me** tab.
- Sees name, role, company, and photo immediately.
- Uses a quick action (call, WhatsApp, email).
- Optionally opens the **Events** tab to see the current or upcoming talk.

### 2. Potential Client Journey

- User arrives from LinkedIn or a direct referral.
- Reads a short professional summary.
- Navigates to **Luczak Consulting**.
- Reviews company description, credentials, and registry data.
- Uses the **Contact** tab to initiate communication or schedule a meeting (via external link if used).

### 3. Academic / Research Journey

- User arrives via a search engine, DOI, or citation link.
- Navigates directly to **Publications**.
- Opens DOI or publisher link.
- Optionally exports citation data and checks **Events** or **Contact**.

### 4. Recruiter / Collaborator Journey

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
