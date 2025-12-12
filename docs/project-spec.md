# Digital Business Card Platform
## Project Specification

**Owner:** Łukasz Piotr Łuczak  
**Primary domain:** https://lukaszpiotrluczak.me  
**Languages:** English (EN), Polish (PL)

---

## 1. Project Overview

This project delivers a **production-grade digital business card** acting as a primary online contact hub for Łukasz Piotr Łuczak.

The platform:
- serves as a **single entry point** for personal branding and professional contact,
- supports **networking at conferences and meetups** (QR / link / NFC),
- routes visitors to relevant destinations based on intent (contact, publications, events, company),
- is optimized for **SEO, structured data, and discoverability**,
- demonstrates a **best-practice AI-assisted development workflow**.

The product is intentionally **not a full website or blog**. It is a focused, fast, mobile-first profile with strong information architecture.

---

## 2. Target Audience

Primary:
- Potential clients
- CTOs / Tech Leads
- Conference networkers
- Academic community

Secondary:
- Recruiters
- Collaborators
- Students / trainees

---

## 3. Core UX Concept

- **Single-page application**
- Central navigation via **Tabs**
- Mobile-first, fast-scanning layout
- Light/Dark mode
- Full EN/PL parity

### Tabs
1. **Me** (default)
2. **Luczak Consulting**
3. **Publications**
4. **Events**
5. **Contact**

---

## 4. User Journeys

### 4.1 Conference Networking
1. User scans QR code.
2. Lands on “Me” tab.
3. Uses quick actions (Call / WhatsApp / Email).
4. Optionally navigates to Events or Publications.

### 4.2 Potential Client
1. User arrives from LinkedIn or referral.
2. Reads short bio and role.
3. Switches to “Luczak Consulting” tab.
4. Uses Contact form or Meeting link.

### 4.3 Academic Visitor
1. User arrives via search (publication / DOI).
2. Navigates to Publications tab.
3. Opens DOI or downloads citation.
4. Optionally checks Events or Bio.

### 4.4 Recruiter / Collaborator
1. User scans profile.
2. Reviews roles and experience.
3. Uses Contact or Meeting CTA.

---

## 5. Functional Requirements

### 5.1 Core (MVP)

- Hero section with photo, name, roles, and headline
- Public contact data (personal + company)
- Social profile links
- CTA actions:
  - Call
  - SMS
  - WhatsApp
  - Email
  - Schedule meeting
- Tabs-based navigation
- Events section:
  - visible only if events occur within next 90 days
- Publications section:
  - visible only if publications exist
  - DOI links
  - citation export
- Company tab with **full registry data**
- Contact form:
  - topic-based routing
  - spam protection
- Full i18n (EN/PL)

### 5.2 Nice-to-have

- vCard download
- NFC-friendly interaction hints
- Print-friendly view
- Additional publication formats

---

## 6. Non-Functional Requirements

### Security
- Input validation (DTOs)
- Rate limiting
- Honeypot field
- GDPR-compliant captcha (no tracking)
- Secure headers (CSP, HSTS, etc.)

### SEO / GEO
- OpenGraph & Twitter Cards
- JSON-LD structured data:
  - Person
  - Organization
  - Event
  - ScholarlyArticle
- hreflang for EN/PL
- Clean semantic HTML

### Accessibility
- Keyboard-accessible tabs
- ARIA roles
- Contrast-compliant color palette
- Focus-visible styles

### Performance
- Astro static output
- Minimal JS
- Optimized assets
- Fast TTFB

---

## 7. Architecture Overview

- **Frontend:** Astro + Tailwind CSS 4.1
- **Backend:** NestJS
- Astro served as middleware via NestJS
- Content stored statically (JSON / Markdown)
- Deployment via Coolify

---

## 8. Acceptance Criteria

- The site works fully in EN and PL with content parity.
- Tabs are accessible via keyboard and deep-linkable.
- Contact form routes messages based on selected topic.
- No analytics or tracking scripts are present.
- Structured data validates for Person, Organization, Event, and ScholarlyArticle.
- The application can be deployed reproducibly using the provided stack.

---

## 9. Out of Scope

- Blog engine
- CMS
- User accounts
- Analytics / tracking
- Marketing automation

---

## 10. Key Risks & Mitigations

| Risk | Mitigation |
|----|----|
| Scope creep | Strict MVP definition |
| Overdesign | Design tokens + minimal components |
| GDPR complexity | No tracking, minimal data |
| AI hallucinations | Human review + acceptance criteria |

---
