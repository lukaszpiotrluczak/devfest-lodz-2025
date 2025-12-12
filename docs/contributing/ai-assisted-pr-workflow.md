# AI-Assisted Pull Request Workflow

This document defines how pull requests are prepared and finalized in this repository.

The goal is to keep the project:

- educational,
- auditable,
- reproducible,
- and readable for humans — even when AI is involved.

---

## Why this exists

This repository demonstrates **AI-assisted software delivery**.

AI can significantly accelerate implementation, but without structure it can also:

- reduce clarity,
- obscure intent,
- and produce shallow or misleading change history.

This workflow ensures that:

> AI generates output, CI verifies it, and humans remain responsible for decisions.

---

## When to use this workflow

Use this workflow **at the end of each implementation phase**, especially when:

- code was generated or refined with AI,
- architectural or tooling decisions were made,
- the change is meant to be educational or demonstrational.

---

## Final PR Preparation Prompt

When you are ready to open or finalize a pull request, start a new AI conversation and send the message below **verbatim**.

```markdown
I’m about to finish this implementation step and would like you to help me prepare the GitHub pull request.

Please generate:

1. A clear, conventional PR title
2. A detailed PR description (educational, explaining _why_ decisions were made, not only _what_ was done)
3. A squash commit message that:
   - follows Conventional Commits
   - is verbose and descriptive
   - is suitable for a public, educational repository
   - summarizes the intent, scope, and key decisions of this change

Context:

- This is a demonstrational, production-grade project
- The repository is public
- The PR should be understandable for readers learning AI-assisted software development
- The PR description should reference architecture, DX, and quality considerations where relevant

I will paste the summary of changes below.
```

---

## Commit Message Expectations

All commits and squash messages must follow these rules:

- Use **Conventional Commits**
- Be **verbose and explanatory**
- Explain:
  - intent,
  - reasoning,
  - trade-offs,
  - and future implications where relevant

This repository prioritizes **clarity over brevity** in commit history.

---

## Example Squash Commit Structure

```text
feat(ci): introduce early CI quality gates for AI-assisted workflow

This change introduces CI pipelines immediately after repository
initialization to ensure that all subsequent AI-generated and
human-authored changes are validated consistently.

Key decisions:
- CI is treated as a first-class architectural component
- Conventional commits are enforced early to stabilize history
- Fast feedback loops are preferred over exhaustive pipelines

This approach aligns with the repository’s goal of demonstrating
production-grade AI-assisted software delivery.
```

---

## Final Notes

- CI is a guardrail, not a formality
- Commit history is documentation
- AI is a collaborator, not an authority

If something is unclear in the history, the process has failed — not the tools.
