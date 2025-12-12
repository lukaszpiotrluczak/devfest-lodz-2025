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
├─ app/                   # Application code (future: Astro + NestJS)
│
├─ docs/                  # Approved documentation and artifacts
│  ├─ project-spec.md     # Product specification
│  ├─ roadmap.md          # Delivery plan
│  ├─ design-profile.json # Design contract
│  ├─ prototypes/         # HTML/UI prototypes
│  ├─ theme/              # Theme CSS and tokens
│  └─ contributing/       # Contribution guides
│
├─ conversations/         # AI conversation logs (archived by phase)
│
├─ prompts/               # AI prompts used at each project phase
│  ├─ 01-discovery/
│  ├─ 02-branding/
│  ├─ 03-ui/
│  ├─ 04-architecture/
│  ├─ 05-backend/
│  └─ 06-seo/
│
├─ stacks/
│  └─ production/         # Coolify production stack
│
├─ dist/                  # Build artifacts (safe to delete)
│
├─ .devcontainer/         # Dev container configuration
├─ .vscode/               # VS Code workspace & settings
├─ .githooks/             # Git hooks (commit validation)
└─ .github/               # GitHub workflows and templates
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

* **Node.js** 20+ (LTS)
* **pnpm** 9+ (package manager)
* **Docker or Podman** (optional, for Dev Container)
* **VS Code** (recommended, for workspace configuration)

### Option 1: Using Dev Container (recommended)

This method provides a fully configured development environment with all tools pre-installed:

1. Open the repository in **VS Code**
2. Install the **Dev Containers** extension if not already installed
3. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
4. Select **"Dev Containers: Reopen in Container"**
5. Wait for the container to build and dependencies to install automatically

The Dev Container includes:
- Node.js 20
- pnpm pre-configured
- All VS Code extensions (ESLint, Prettier, Tailwind, Astro, cspell)
- Git hooks enabled automatically
- Timezone set to Europe/Warsaw

### Option 2: Manual setup

If you prefer to work without a container:

```bash
# Install dependencies
pnpm install

# Run quality checks
pnpm run validate

# Run linting
pnpm run lint

# Format code
pnpm run format:fix

# Spell check
pnpm run spell
```

### Git Hooks Setup

Git hooks are automatically configured via the `prepare` script when you run `pnpm install`.

To manually set up hooks:

```bash
# The hooks are stored in .githooks/
git config core.hooksPath .githooks
```

To skip hooks temporarily:

```bash
SKIP_HOOKS=true git commit -m "message"
```

---

## 🧪 Quality Gates & CI

This repository enforces strict quality gates from day one:

### Local Checks (via npm scripts)

```bash
pnpm run lint        # ESLint validation
pnpm run format      # Prettier format check
pnpm run spell       # cspell spell check
pnpm run validate    # Run all checks
```

### Commit Message Validation

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

**Allowed types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`, `revert`

**Example:**
```
feat(dx): add ESLint and Prettier configuration

Establishes code quality gates with flat config ESLint supporting
TypeScript and Astro, and Prettier for consistent formatting.

This is enforced via git hooks and CI validation.
```

See [docs/contributing/commit-messages.md](docs/contributing/commit-messages.md) for detailed guidance.

### CI Pipeline

On every push and pull request, GitHub Actions runs:

1. Install dependencies (pnpm with caching)
2. ESLint validation
3. Prettier format check
4. cspell spell check
5. Repository structure validation

All checks must pass before merging.

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
