<!--
Prompt: prompts/01-discovery/01-project-spec.md
Date: 2025-12-12
Model: GPT-5.2
-->

# Tab-based UX design

## Prompt:
# Role
You are a UX architect specializing in mobile-first information architecture.

# Goal
Design a clean tab-based UX for a digital business card.

# Context
Single-page application with tabs:
- Me
- Luczak Consulting
- Publications
- Events
- Contact

The experience should feel like a professional mix of:
about.me, carrd, linktree, blinq, cardtree.

Constraints:
- Mobile-first
- Fast scanning
- Keyboard accessible
- Deep-linkable tabs
- EN / PL parity

# Inputs
I will provide:
- Content blocks
- Visibility rules (events only within 90 days, publications only if present)

# Expected Output
1. Tab-by-tab content structure
2. Component list
3. Interaction rules
4. Empty states & conditional visibility
5. URL / deep-link strategy

## Response:
Below is a **mobile-first, tab-based UX architecture** tailored for a **digital business card SPA**, optimized for fast scanning, accessibility, and deep linking, with **full EN/PL parity**.

* * *

Digital Business Card — Tab-Based UX Architecture
=================================================

Global UX Principles (applies to all tabs)
------------------------------------------

*   **Mobile-first**: single-column, max-width container
*   **Scan-first**: short labels, bullets, visual hierarchy
*   **Zero cognitive load**: no nested navigation inside tabs
*   **Keyboard & a11y**:
    *   Tabs = `role="tablist"`
    *   Panels = `role="tabpanel"`
    *   Arrow keys switch tabs
*   **State-driven rendering**:
    *   Tabs may be hidden or disabled based on content rules
*   **Language parity**:
    *   Identical structure, different content
*   **Deep-linkable**:
    *   Each tab has a stable URL

* * *

1\. Tab-by-Tab Content Structure
--------------------------------

### 1\. **Me**

**Purpose:** Immediate personal positioning

**Content order (top → bottom):**

1.  **Identity Block**
    *   Name
    *   Professional title
    *   Location (optional)
2.  **Short Bio (2–3 lines max)**
3.  **Key Roles / Focus Areas**
    *   Bullet list or chips
4.  **Primary Links**
    *   LinkedIn
    *   GitHub
    *   Website / Blog (if separate)

**Scanning priority:**  
Name → Role → Proof of competence → Where to go next

* * *

### 2\. **Luczak Consulting**

**Purpose:** Business credibility without sales pressure

**Content order:**

1.  **Company Snapshot**
    *   Name
    *   One-liner value proposition
2.  **Services (max 5)**
    *   Short labels (not descriptions)
3.  **Who It’s For**
    *   2–3 audience types
4.  **CTA**
    *   “Visit website”
    *   “Contact regarding consulting”

**Rule:**  
No pricing, no long descriptions.

* * *

### 3\. **Publications**

**Purpose:** Thought leadership proof

**Visibility rule:**  
Displayed **only if at least one publication exists**

**Content order:**

1.  **Section Intro (optional)**
2.  **Publication List**
    *   Title
    *   Type (paper / article / talk)
    *   Year
    *   External link

**Sorting:**  
Newest first

**Limit:**  
Show max 5, then “View all” (external)

* * *

### 4\. **Events**

**Purpose:** Show activity & public presence

**Visibility rule:**  
Only events **±90 days from now**

**Content order:**

1.  **Upcoming / Recent Events**
    *   Event name
    *   Role (speaker / attendee)
    *   Date
    *   Location (optional)

**Grouping:**

*   Upcoming (future)
*   Recent (past 90 days)

* * *

### 5\. **Contact**

**Purpose:** Frictionless reachability

**Content order:**

1.  **Primary Contact Actions**
    *   Email
    *   LinkedIn DM
2.  **Optional Contact Form**
    *   Name
    *   Email
    *   Message
3.  **Legal / Meta**
    *   Privacy link
    *   Language switch (if global)

* * *

2\. Component List
------------------

### Core Layout

*   `AppShell`
*   `TabBar`
*   `TabButton`
*   `TabPanel`

### Content Components

*   `IdentityCard`
*   `BioBlock`
*   `LinkList`
*   `ServiceList`
*   `PublicationItem`
*   `EventItem`
*   `ContactActions`
*   `ContactForm`

### Utility

*   `EmptyState`
*   `ConditionalRenderer`
*   `LanguageSwitcher`

* * *

3\. Interaction Rules
---------------------

### Tabs

*   Tap / click switches panel
*   Keyboard:
    *   `← / →` switch tabs
    *   `Home / End` jump first / last
*   URL updates on tab change
*   No page reload

### Links

*   External links open in new tab
*   Clear icon or label (`↗`)

### Forms

*   Minimal validation
*   Inline error messages
*   No modals

* * *

4\. Empty States & Conditional Visibility
-----------------------------------------

### Publications

*   **If empty:** tab hidden
*   **If API error:** show empty state with retry

### Events

*   **If no events in ±90 days:** tab hidden
*   **If all past:** show “No upcoming events”

### Luczak Consulting

*   **If disabled by config:** tab hidden
*   **If minimal content:** show snapshot + CTA only

### Contact Form

*   **If disabled:** show contact actions only

**Empty State Pattern:**

*   Icon (subtle)
*   One-line explanation
*   No dead ends

* * *

5\. URL / Deep-Link Strategy
----------------------------

### Base

```
/[lang]/
```

### Tabs

```
/en/me
/en/consulting
/en/publications
/en/events
/en/contact

/pl/o-mnie
/pl/konsulting
/pl/publikacje
/pl/wydarzenia
/pl/kontakt
```

### Rules

*   Direct navigation opens correct tab
*   Language switch preserves tab context
*   Default redirect:
    *   `/` → `/[lang]/me`

* * *

Final UX Outcome
----------------

This structure delivers:

*   **Instant clarity** (who / what / why)
*   **Zero-scroll fatigue**
*   **Professional credibility**
*   **Linktree-like speed with consulting-grade seriousness**

If you want, next steps could be:

*   wireframe per tab (mobile)
*   tab naming microcopy EN/PL
*   accessibility checklist
*   animation & motion rules

## Prompt:
Luczak Consulting is name of company, can we use that name and not Consulting as tab name etc. ?

## Response:
Yes — **and you absolutely should**.  
Using **`Luczak Consulting` as the tab label** is the _correct_ choice for clarity, branding, and credibility.

Below is a **clean, adjusted UX decision** with rationale and concrete rules.

* * *

Decision: Use **“Luczak Consulting”** as the Tab Name
=====================================================

Why this is the right move
--------------------------

### 1\. **Brand clarity**

*   `Consulting` alone is generic and ambiguous
*   `Luczak Consulting`:
    *   Signals a real, registered entity
    *   Builds trust instantly
    *   Matches how people recognize companies

### 2\. **Scan-first UX**

On mobile, users scan **labels**, not meanings.

Compare:

| Label | Cognitive load |
| --- | --- |
| Consulting | “Consulting… whose?” |
| Luczak Consulting | “Ah, company tab.” |

Lower cognitive friction wins.

* * *

### 3\. **Parity with real-world usage**

*   Email signature
*   Invoice
*   Website
*   LinkedIn company page

→ All use **Luczak Consulting**, not “Consulting”

UX should mirror reality.

* * *

### 4\. **Future-proofing**

If later you add:

*   multiple brands
*   side ventures
*   personal vs company separation

You already have a **clear boundary**.

* * *

Updated Tab Set (Final Recommendation)
--------------------------------------

```
[ Me ] [ Luczak Consulting ] [ Publications ] [ Events ] [ Contact ]
```

No abbreviations. No icons replacing text (icons may supplement).

* * *

Mobile-Specific Adjustment (Optional)
-------------------------------------

If width becomes tight on very small screens:

*   Use **horizontal scrollable tab bar**
*   Do **NOT** truncate or shorten the name

❌ Avoid:

*   “LC”
*   “Company”
*   “Biz”

* * *

URL Strategy (Aligned)
----------------------

**EN**

```
/en/luczak-consulting
```

**PL**

```
/pl/luczak-consulting
```

> Note: keep slug identical across languages for brand stability  
> (labels are translated, slugs are not)

* * *

Tab Content Header (Inside Panel)
---------------------------------

Inside the tab, you may repeat branding:

**Luczak Consulting**  
_Strategy • Security • Digital Systems_

This reinforces context after deep linking.

* * *

Summary (UX Rule)
-----------------

> **Tabs represent entities, not categories.**

*   `Me` → person
*   `Luczak Consulting` → company
*   others → content streams / actions

This keeps the digital business card **credible, minimal, and professional**.

If you want, next we can:

*   refine EN/PL tab labels precisely
*   test extreme small-screen behavior
*   align tab naming with SEO + OpenGraph titles



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)