# NestJS + Astro Architecture

## Overview

This document describes the production architecture for the digital business card platform.
The application integrates **Astro** (static site generator with SSR capabilities) with **NestJS**
(Node.js backend framework) to deliver a bilingual (EN/PL) single-page application with server-side
routing, static content management, and a secure contact form API.

## Architecture Diagram (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          HTTP Request                               │
│                      (e.g., /en/me, /pl/kontakt)                    │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         NestJS Server                               │
│                       (Port 3000 by default)                        │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Security Middleware                                       │   │
│  │  - CSP, HSTS, X-Content-Type-Options, Referrer-Policy     │   │
│  │  - Rate limiting (global + endpoint-specific)             │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                │                                    │
│                                ▼                                    │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Routing Logic                                             │   │
│  │                                                            │   │
│  │  • /api/contact (POST) → ContactController                │   │
│  │  • /en/*, /pl/*, / → Astro SSR Adapter Middleware         │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                │                                    │
│                ┌───────────────┴───────────────┐                   │
│                ▼                               ▼                   │
│  ┌──────────────────────┐         ┌──────────────────────┐        │
│  │  ContactController   │         │  Astro Handler       │        │
│  │                      │         │  (SSR/Static)        │        │
│  │  - Validation        │         │                      │        │
│  │  - Honeypot check    │         │  Renders:            │        │
│  │  - Rate limiting     │         │  - /en/me            │        │
│  │  - Topic routing     │         │  - /en/luczak-...    │        │
│  │  - Email stub        │         │  - /pl/o-mnie        │        │
│  └──────────────────────┘         │  - /pl/kontakt       │        │
│                                    │  - etc.              │        │
│                                    └──────────────────────┘        │
│                                               │                     │
│                                               ▼                     │
│                                    ┌──────────────────────┐        │
│                                    │  Static Content      │        │
│                                    │  (JSON/MD)           │        │
│                                    │                      │        │
│                                    │  - identity.en.json  │        │
│                                    │  - identity.pl.json  │        │
│                                    │  - company.en.json   │        │
│                                    │  - company.pl.json   │        │
│                                    │  - publications.json │        │
│                                    │  - events.json       │        │
│                                    └──────────────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
                        HTTP Response
                  (HTML page or JSON API response)
```

## Request Flow

### Page Requests (e.g., `/en/me`, `/pl/kontakt`)

1. **Client** sends HTTP GET to NestJS server (e.g., `GET /en/me`)
2. **NestJS Middleware** applies:
   - Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy)
   - Global rate limiting (if applicable)
3. **NestJS Routing** determines the request doesn't match `/api/*`, passes to Astro middleware
4. **Astro Handler** (via `@astrojs/node` adapter integrated into NestJS):
   - Matches route against Astro pages (`/en/me` → `app/astro/src/pages/en/me.astro`)
   - Loads static content from JSON files at runtime or build-time (see strategy below)
   - Renders HTML with proper SEO metadata, hreflang tags, JSON-LD structured data
5. **NestJS** returns rendered HTML to client with security headers

### API Requests (e.g., `POST /api/contact`)

1. **Client** sends HTTP POST to `/api/contact` with form data
2. **NestJS Middleware** applies:
   - Security headers
   - Rate limiting (stricter limit for contact endpoint: e.g., 3 requests/hour/IP)
3. **NestJS Routing** matches `/api/contact` → `ContactController`
4. **ContactController** performs:
   - **Validation**: Check required fields (name, email, message), email format
   - **Honeypot check**: Reject if honeypot field (`company`) is filled
   - **Timing-based spam detection**: Reject if submission is too fast (<2 seconds from page load)
   - **Topic-based routing**: Log topic (consulting, speaking, research, other)
   - **Email stub**: Log to console (in MVP; later: send email via transactional service)
5. **NestJS** returns JSON response:
   - Success: `{ "success": true, "message": "Message received" }`
   - Error: `{ "success": false, "error": "Validation failed" }` (with details)

## Build & Runtime Strategy

### Development Mode

**Command:** `pnpm run dev`

**Flow:**

1. NestJS starts in watch mode (hot reload enabled)
2. Astro dev server runs embedded within NestJS via `@astrojs/node` adapter
3. Static content (JSON/MD) is loaded at runtime from `app/astro/src/content/`
4. Changes to Astro files trigger Astro rebuilds
5. Changes to NestJS files trigger NestJS restart
6. Server listens on `http://localhost:3000`

**Rationale:** Fast feedback loop for development; no separate ports/proxies needed.

### Preview Mode

**Command:** `pnpm run build && pnpm run start`

**Flow:**

1. **Build step** (`pnpm run build`):
   - Astro builds static assets + SSR handler to `dist/astro/`
   - NestJS compiles TypeScript to `dist/backend/`
   - Static content is embedded in Astro build output
2. **Start step** (`pnpm run start`):
   - NestJS starts in production mode, serving Astro SSR handler
   - No watch mode; simulates production environment locally

**Rationale:** Test production build behavior before deployment.

### Production Mode

**Command:** `pnpm run start:prod`

**Flow:**

1. Uses pre-built artifacts from `dist/`
2. NestJS serves Astro SSR handler with production optimizations
3. Security headers enforced (HSTS with `max-age`, strict CSP)
4. Rate limiting enforced (stricter than dev)
5. Static assets served with long cache headers

**Deployment:** Docker/Podman image with:

- Node.js runtime
- `dist/` directory containing built backend + Astro
- Environment variables for configuration (e.g., `NODE_ENV=production`)

## Static Content Strategy

### Where Content Lives

Static content is stored in **JSON files** under `app/astro/src/content/`:

```
app/astro/src/content/
├── identity.en.json      # Personal bio, roles, links (EN)
├── identity.pl.json      # Personal bio, roles, links (PL)
├── company.en.json       # Luczak Consulting info (EN)
├── company.pl.json       # Luczak Consulting info (PL)
├── publications.json     # Language-neutral publication list (with per-locale titles if needed)
└── events.json           # Language-neutral event list (with per-locale talk fields)
```

**BibTeX export:**

- Generated from `publications.json` and placed in `public/data/publications.bib`
- Served as static file

### How Content is Loaded

**Strategy chosen:** **Build-time loading** (default Astro behavior)

- Astro pages import JSON files directly at build time using `import` statements
- Content is embedded in the SSR handler or pre-rendered HTML
- No runtime file I/O required in production (faster, more secure)

**Alternative (runtime loading) not chosen because:**

- Adds I/O overhead in production
- Requires file system access from NestJS context (complicates containerization)
- Build-time loading is Astro's recommended pattern for static content

**Conditional visibility (Publications, Events tabs):**

- **Publications tab:** Hidden if `publications.length === 0` (build-time check)
- **Events tab:** Hidden if no events within ±90 days of build date (build-time check)
- Astro pages use conditionals to exclude tab buttons and routes

## Security Headers Strategy

### What Headers Are Configured

NestJS applies the following security headers via middleware:

1. **Content-Security-Policy (CSP):**
   - `default-src 'self'`
   - `script-src 'self' 'unsafe-inline'` (required for Astro hydration; refine post-MVP)
   - `style-src 'self' 'unsafe-inline'` (required for Tailwind; refine post-MVP)
   - `img-src 'self' data: https:`
   - `font-src 'self'`
   - `connect-src 'self'`
   - `frame-ancestors 'none'`
   - `base-uri 'self'`
   - `form-action 'self'`

2. **Strict-Transport-Security (HSTS):**
   - `max-age=31536000; includeSubDomains; preload` (production only)

3. **X-Content-Type-Options:**
   - `nosniff`

4. **Referrer-Policy:**
   - `strict-origin-when-cross-origin`

5. **X-Frame-Options:**
   - `DENY`

6. **Permissions-Policy:**
   - `geolocation=(), microphone=(), camera=()`

### Where Configured

Headers are applied in **NestJS global middleware** (`app/backend/src/main.ts`):

```typescript
import helmet from 'helmet';

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);
```

**Note:** In development mode, HSTS is disabled to avoid local HTTPS warnings.

## Risks & Mitigations

### Risk 1: Astro SSR Handler Memory Leaks

**Description:** Embedding Astro's SSR handler in NestJS could lead to memory leaks if not properly managed.

**Mitigation:**

- Use official `@astrojs/node` adapter with standalone mode disabled (integrated mode)
- Monitor memory usage in production (e.g., PM2, Docker stats)
- Implement health checks (`/health` endpoint) to detect degraded performance

### Risk 2: Rate Limiting Bypass

**Description:** Attackers could bypass rate limiting using distributed IPs or proxy rotation.

**Mitigation:**

- Implement rate limiting at multiple layers:
  - NestJS: Per-IP rate limiting using `@nestjs/throttler`
  - Reverse proxy (Nginx/Traefik): Connection limits
  - Application-level: Track submission fingerprints (e.g., email + message hash)
- Add CAPTCHA for repeated failures (post-MVP; must be GDPR-friendly and not tracking-based)

### Risk 3: CSP Too Permissive for Production

**Description:** `'unsafe-inline'` in CSP allows inline scripts/styles, reducing XSS protection.

**Mitigation:**

- **Short-term (MVP):** Accept `'unsafe-inline'` for Astro/Tailwind compatibility
- **Post-MVP:** Refactor to use CSP nonces or hashes for inline scripts/styles
- Audit Astro build output to minimize inline scripts

### Risk 4: Build-Time Content Stale Dates

**Description:** Events tab visibility is determined at build time (±90 days). If the site isn't rebuilt regularly, events may appear/disappear incorrectly.

**Mitigation:**

- **Short-term (MVP):** Document requirement for weekly rebuilds
- **Post-MVP:** Implement automated nightly builds (CI/CD cron job)
- **Alternative:** Move event filtering to runtime (trade-off: adds I/O overhead)

### Risk 5: No Email Sending in MVP

**Description:** Contact form logs to console instead of sending emails, risking lost messages.

**Mitigation:**

- **MVP:** Clearly document stub behavior; add TODO for transactional email integration
- **Post-MVP:** Integrate transactional email service (e.g., SendGrid, AWS SES, Resend)
- **Fallback:** Provide direct email link (`mailto:`) as alternative contact method

## Repository Path Mapping

| **Logical Component**      | **Repository Path**                             |
| -------------------------- | ----------------------------------------------- |
| NestJS application root    | `app/backend/`                                  |
| NestJS source code         | `app/backend/src/`                              |
| NestJS main entry          | `app/backend/src/main.ts`                       |
| Contact controller         | `app/backend/src/contact/contact.controller.ts` |
| Astro application root     | `app/astro/`                                    |
| Astro pages (routes)       | `app/astro/src/pages/`                          |
| Astro layouts              | `app/astro/src/layouts/`                        |
| Astro components           | `app/astro/src/components/`                     |
| Static content (JSON/MD)   | `app/astro/src/content/`                        |
| Public assets (avatar, OG) | `app/astro/public/`                             |
| Build output (all)         | `dist/`                                         |
| NestJS build output        | `dist/backend/`                                 |
| Astro build output         | `dist/astro/`                                   |
| Deployment stack config    | `stacks/production/` (not implemented in MVP)   |

## Technology Choices & Justification

### Why NestJS + Astro Integration?

1. **Single deployment artifact:** No need to run separate frontend/backend servers
2. **Shared security middleware:** Headers, rate limiting applied uniformly
3. **Simplified routing:** NestJS handles `/api/*`, Astro handles everything else
4. **Performance:** Astro SSR is fast; NestJS adds minimal overhead
5. **Developer experience:** Single `pnpm run dev` command

### Why Build-Time Content Loading?

1. **Performance:** No file I/O in production
2. **Security:** No file system access required at runtime
3. **Simplicity:** Aligns with Astro's static-first philosophy
4. **Trade-off:** Requires rebuilds to update content (acceptable for MVP)

### Why Helmet for Security Headers?

1. **Industry standard:** Widely used in Node.js ecosystem
2. **Comprehensive:** Covers CSP, HSTS, X-Frame-Options, etc.
3. **Configurable:** Easy to adjust for dev vs prod
4. **Maintained:** Active development, security updates

### Why JSON Over Markdown for Content?

1. **Structured data:** JSON is easier to parse and validate
2. **Typed interfaces:** TypeScript types can be generated from JSON schema
3. **Astro compatibility:** Astro has first-class JSON import support
4. **Trade-off:** Markdown is more human-friendly (could be added post-MVP for long-form content)

## Next Steps (Out of Scope for This Document)

1. **Email integration:** Replace console logging with transactional email service
2. **CAPTCHA:** Add GDPR-friendly CAPTCHA for contact form (e.g., hCaptcha, Cloudflare Turnstile)
3. **Monitoring:** Add APM (Application Performance Monitoring) for NestJS + Astro
4. **Deployment automation:** CI/CD pipeline for Docker builds and Coolify deployment
5. **CSP hardening:** Remove `'unsafe-inline'` by using nonces/hashes
6. **Analytics (privacy-first):** Add Plausible or similar (no tracking, GDPR-compliant)
