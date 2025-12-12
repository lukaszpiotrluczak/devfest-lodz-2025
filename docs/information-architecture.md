# Digital Business Card Platform

## Information Architecture Specification

---

## 1. Purpose & Scope

This document defines the final, authoritative Information Architecture for a mobile-first digital business card implemented as a single-page application (SPA).  
It specifies tab structure, content hierarchy, visibility rules, deep-linking, and accessibility requirements.  
The scope covers UX structure only; visual design and content authoring are out of scope.

---

## 2. Global UX Rules

- Mobile-first, single-column layout
- One navigation level only (tab-based)
- No nested navigation within tabs
- Fast-scanning content with strict vertical hierarchy
- State-driven rendering of tabs and content
- EN / PL structural parity (identical IA, localized labels)
- All tabs are deep-linkable
- No modal navigation flows
- External links open in a new browser tab

---

## 3. Final Tab Set (Labels EN / PL)

| Order | EN Label          | PL Label          |
| ----: | ----------------- | ----------------- |
|     1 | Me                | O mnie            |
|     2 | Luczak Consulting | Luczak Consulting |
|     3 | Publications      | Publikacje        |
|     4 | Events            | Wydarzenia        |
|     5 | Contact           | Kontakt           |

---

## 4. Tab-by-Tab Content Structure

### 4.1 Me

1. Identity Block
   - Full name
   - Professional title
   - Location (if provided)

2. Short Bio
   - Maximum 3 lines

3. Key Roles / Focus Areas
   - Bullet list or chips

4. Primary Links
   - LinkedIn
   - GitHub
   - Personal website / blog

---

### 4.2 Luczak Consulting

1. Company Snapshot
   - Company name
   - One-line value proposition

2. Services
   - Maximum 5 service labels

3. Target Audience
   - 2–3 audience descriptors

4. Primary Call-to-Action
   - Link to company website or contact entry point

---

### 4.3 Publications

1. Publications List
   - Title
   - Type (paper / article / talk)
   - Year
   - External link

- Sorted by newest first
- Maximum 5 items visible in the tab

---

### 4.4 Events

1. Events List
   - Event name
   - Role (speaker / participant)
   - Date
   - Location (if provided)

2. Grouping
   - Upcoming events
   - Recent events

---

### 4.5 Contact

1. Primary Contact Actions
   - Email
   - LinkedIn direct contact

2. Contact Form
   - Name
   - Email
   - Message

3. Legal / Meta
   - Privacy policy link

---

## 5. Visibility & Empty-State Rules

### Tab Visibility

- **Publications**
  - Tab is hidden if no publications exist

- **Events**
  - Tab is hidden if no events exist within ±90 days from the current date

- **Luczak Consulting**
  - Tab is hidden if company profile is disabled by configuration

### Content Visibility

- Publications list shows only existing items
- Events list includes only events within ±90 days

### Empty States

- If a visible tab has no renderable content due to runtime error:
  - Display a non-blocking empty state with a single-line message
- No empty states are shown for hidden tabs

---

## 6. URL and Deep-Link Strategy

### Base Path

```

/{lang}/

```

Where `{lang}` is:

- `en`
- `pl`

### Tab Routes

**English**

```

/en/me
/en/luczak-consulting
/en/publications
/en/events
/en/contact

```

**Polish**

```

/pl/o-mnie
/pl/luczak-consulting
/pl/publikacje
/pl/wydarzenia
/pl/kontakt

```

### Routing Rules

- Direct URL access opens the corresponding tab
- Tab change updates the URL without page reload
- Language switch preserves the active tab
- Root path redirects to `/[lang]/me`

---

## 7. Accessibility Requirements

- Tab navigation implemented with `role="tablist"`
- Tabs implemented with `role="tab"`
- Panels implemented with `role="tabpanel"`
- Keyboard support:
  - Left / Right arrows switch tabs
  - Home / End jump to first / last tab
- Active tab is programmatically indicated
- Visible focus indicators on all interactive elements
- Sufficient color contrast per WCAG 2.1 AA

---

## 8. Non-Goals

- No multi-level navigation
- No dashboards or analytics views
- No marketing funnels or sales pages
- No user accounts or personalization
- No content authoring or CMS workflows
- No visual branding or animation specification

---
