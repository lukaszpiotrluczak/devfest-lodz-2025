# Contributing

Thanks for your interest in contributing!

This is a **public, educational, production-grade** repository demonstrating an **AI-assisted software delivery workflow**.

The project optimizes for:
- clarity,
- reproducibility,
- human-readable history,
- and strong quality gates.

---

## Code of Conduct

Be respectful and constructive. Prefer issues and discussions for proposals before large changes.

---

## Development Principles

- **CI-first**: changes must keep CI green.
- **No tracking / analytics**: avoid GDPR scope creep.
- **Accessibility matters**: keyboard navigation, focus states, ARIA correctness.
- **EN/PL parity**: changes must not break bilingual consistency.
- **Commit history is documentation**: prefer clarity over brevity.

---

## Conventional Commits (Verbose)

This repository enforces **Conventional Commits** and expects **verbose, educational** commit messages.

- Use meaningful scopes (e.g. `astro`, `nest`, `ci`, `dx`, `seo`)
- Include a body explaining **why** the change exists and key decisions
- Squash merges should keep the same level of detail

---

## Pull Requests

- Use the provided PR template
- Include:
  - what changed,
  - why,
  - how to test,
  - and key decisions / trade-offs

For AI-assisted PR preparation guidance, see:
- `docs/contributing/ai-assisted-pr-workflow.md`

---

## Local Setup

Recommended:
- VS Code + Dev Container

Basic:
- Node.js (LTS)
- pnpm
- (optional) Docker/Podman

---

## Reporting Issues

When opening an issue, include:
- expected behavior,
- actual behavior,
- steps to reproduce,
- environment details.
