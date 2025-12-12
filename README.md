# Digital Business Card — AI-Assisted, Production-Grade Web Platform

This repository contains the full source code, assets, AI prompts, and conversation logs for a **production-ready digital business card platform** built for **Łukasz Piotr Łuczak**.

The project demonstrates how **generative AI can be used responsibly and effectively** across the entire software delivery lifecycle — from discovery and design to architecture, implementation, security, and deployment.

---

## ✨ What is this project?

This is **not** a traditional website or blog.

It is a:
- **single-link digital business card**
- **primary online contact hub**
- **networking tool** for conferences and meetups (QR / link / NFC)
- **routing point** to social profiles, publications, events, and contact channels

The platform is:
- mobile-first
- bilingual (EN / PL)
- SEO- and structured-data-optimized
- built with real production standards

---

## 🎯 Goals

1. Personal branding & thought leadership
2. Conference networking
3. Client acquisition
4. Collaboration & recruitment
5. Demonstrating **AI-assisted software engineering best practices**

---

## 🧠 AI-Assisted Workflow (Core Idea)

This project was built using **AI as a collaborator**, not a code generator.

AI was used to:
- clarify requirements and scope
- design information architecture
- synthesize brand and visual identity
- define system architecture
- generate UI prototypes
- scaffold infrastructure and tooling
- iterate and refine implementation

**All AI prompts, conversations, and generated assets are preserved** to make the process transparent and reproducible.

For details on how pull requests and commit history are handled in this project,
see [AI-Assisted Pull Request Workflow](docs/contributing/ai-assisted-pr-workflow.md).

---

## 🗂 Repository Structure

```text
/
├─ app/
│  ├─ backend/            # NestJS application
│  └─ astro/              # Astro frontend (served via NestJS middleware)
│
├─ prompts/               # AI prompts used at each project phase
│  ├─ 01-discovery/
│  ├─ 02-branding/
│  ├─ 03-architecture/
│  ├─ 04-ui/
│  ├─ 05-implementation/
│  └─ 06-refinement/
│
├─ conversations/         # Saved AI conversations + generated assets
│
├─ docs/                  # Project documentation
│  ├─ project-spec.md
│  └─ roadmap.md
│
├─ stacks/
│  └─ production/         # Coolify production stack
│
├─ dist/                  # Build artifacts (safe to delete)
│
├─ compose.yml             # Container orchestration (Docker/Podman agnostic)
├─ Containerfile           # Container build definition
├─ .devcontainer/          # Dev container configuration
├─ .vscode/                # VS Code workspace & settings
└─ README.md
```

---

## 🧩 Tech Stack

### Frontend

* **Astro**
* **Tailwind CSS 4.1**
* Semantic HTML, minimal JavaScript
* Light / Dark mode
* Full EN / PL i18n

### Backend

* **NestJS**
* Contact form API
* Security controls (rate-limit, honeypot, GDPR-compliant captcha)
* Astro served as middleware

### Infrastructure & DX

* Docker / Podman agnostic
* Coolify deployment
* ESLint, Prettier, cspell
* Conventional Commits
* Git hooks & CI checks
* Dev Container + VS Code workspace

---

## 🔐 Security & Privacy

* No analytics
* No tracking
* No cookies
* GDPR-aware by design
* Minimal data collection
* Structured input validation
* Secure headers and CSP

---

## 🌍 SEO & Structured Data

The platform implements:

* OpenGraph & Twitter cards
* hreflang (EN / PL)
* JSON-LD for:

  * Person
  * Organization
  * Event
  * ScholarlyArticle

This makes the site suitable as a **primary identity reference point** for search engines and external links.

---

## 🚀 Getting Started (Local Development)

### Prerequisites

* Node.js (LTS)
* pnpm (recommended)
* Docker or Podman (optional but recommended)

### Using Dev Container (recommended)

1. Open the repository in VS Code
2. Reopen in Dev Container
3. Install dependencies and run the project

### Manual setup

```bash
pnpm install
pnpm dev
```

---

## 🧪 Quality Gates

This repository enforces:

* linting (ESLint)
* formatting (Prettier)
* spell checking (cspell)
* commit message conventions
* CI validation on pull requests

---

## 📦 Deployment

Production deployment is handled via **Coolify** using the stack defined in:

```text
stacks/production/
```

The application is deployed under:

* **[https://lukaszpiotrluczak.me](https://lukaszpiotrluczak.me)**

---

## 🎤 Conference Context

This project is used as a **live case study** in the talk:

**EN:**
*“Are Frontend Developers at Risk? AI Is Already Writing HTML for Us…”*

**PL:**
*„Czy programiści frontendu są zagrożeni? AI już pisze HTML za nas…”*

The repository intentionally exposes the **entire AI-assisted process**, including mistakes, refinements, and architectural decisions.

---

## 📜 License

MIT — feel free to reuse the ideas, structure, and workflow.

---

## 🤝 Contributing

This is a personal project, but issues and discussions are welcome — especially around:

* AI-assisted development workflows
* frontend architecture
* developer experience
* security-by-design

---

## 🧠 Author

**Łukasz Piotr Łuczak**
Software Architect • Consultant • Researcher • Speaker
Managing Partner @ Luczak Consulting

* Website: [https://lukasz.luczak.org](https://lukasz.luczak.org)
* LinkedIn: [https://www.linkedin.com/in/lukaszpiotrluczak/](https://www.linkedin.com/in/lukaszpiotrluczak/)
* GitHub: [https://github.com/lukaszpiotrluczak](https://github.com/lukaszpiotrluczak)
