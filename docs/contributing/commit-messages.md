# Writing Verbose Commit Messages

This guide explains how to write clear, educational commit messages in this repository.

## Why Verbose Commit Messages?

This is a **public, educational project** demonstrating AI-assisted software delivery. The commit history serves as **first-class documentation** that shows:

- What changed (the code diff)
- Why it changed (the intent)
- How decisions were made (the context)
- What tradeoffs were considered

Readers (including conference attendees, developers learning AI-assisted workflows, and future contributors) should be able to **understand the evolution of the project** by reading commit messages alone.

## Format: Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): short imperative subject line (max 100 characters)

Detailed body explaining:
- What changed and why
- Design decisions made
- Tradeoffs considered
- Context for future readers

Optional footer with references, breaking changes, etc.
```

### Allowed Types

- `feat` — new feature or capability
- `fix` — bug fix
- `docs` — documentation only
- `style` — formatting, missing semicolons, etc. (no code change)
- `refactor` — code restructuring without changing behavior
- `test` — adding or updating tests
- `chore` — maintenance tasks (deps, config, etc.)
- `ci` — CI/CD pipeline changes
- `build` — build system or tooling changes
- `perf` — performance improvement
- `revert` — reverting a previous commit

### Scope

Use meaningful scopes that reflect the area of change:

- `dx` — developer experience (tooling, linting, CI)
- `repo` — repository structure
- `ui` — user interface
- `backend` — backend logic
- `infra` — infrastructure or deployment
- `a11y` — accessibility
- `i18n` — internationalization
- `seo` — SEO or structured data
- `theme` — design tokens or styling system

## Examples

### Good: Verbose and Educational

```
feat(dx): establish ESLint, Prettier, and cspell for code quality gates

This commit introduces linting, formatting, and spell-checking tooling
to enforce consistency and catch errors early in the development cycle.

Key decisions:
- ESLint flat config (new format, future-proof)
- Prettier for consistent formatting (integrates with Astro plugin)
- cspell for spell-checking with custom dictionary for Polish names
  and domain-specific terms (Łódź, Łuczak, DevFest, etc.)

All tools are enforced via:
- Git hooks (commit-msg validation via commitlint)
- CI pipeline (GitHub Actions on every push/PR)
- Editor integration (VS Code settings)

This ensures that AI-generated code and human edits maintain the same
quality standards, and that the codebase remains accessible to new
contributors.
```

### Bad: Too Brief

```
chore: add linting
```

**Why it's bad:**
- Doesn't explain what linting tools were added
- Doesn't explain why this decision was made
- Doesn't provide context for future readers
- Not useful as documentation

### Good: Fixing a Bug

```
fix(ui): correct tab focus order in keyboard navigation

The tab navigation was not correctly updating `tabindex` when switching
tabs via keyboard (Left/Right arrows). This caused the next Tab keypress
to jump to an inactive tab.

Root cause: `setActiveTab()` was not updating `tabindex` attributes before
calling `focus()` on the newly active tab.

Solution: Ensure `tabindex` is set to `0` for active tab and `-1` for all
inactive tabs before calling `focus()`.

This fix ensures compliance with WCAG 2.1 AA keyboard navigation requirements
and matches the behavior described in the ARIA Authoring Practices Guide.
```

### Bad: Vague Fix

```
fix: tabs
```

**Why it's bad:**
- Doesn't explain what was broken
- Doesn't explain how it was fixed
- Doesn't provide context for reviewers or future maintainers

## Squash Commits and Pull Request Messages

When squashing commits during a pull request merge, the **squash message must remain verbose and educational**.

The squash message should:
1. Summarize all changes in the PR
2. Explain the overall intent and design decisions
3. Reference any key implementation details
4. Maintain the educational value of the commit history

### Example Squash Message

```
feat(architecture): scaffold repository DX setup with quality gates

This PR establishes the foundational developer experience and tooling
setup for the project, including:

1. Repository structure:
   - `app/` for application code
   - `docs/` for approved artifacts
   - `stacks/production/` for deployment config
   - `.devcontainer/` and `.vscode/` for workspace setup

2. Tooling and quality gates:
   - ESLint (flat config) for TypeScript + Astro
   - Prettier for formatting
   - cspell for spell-checking (with Polish terms)
   - commitlint for Conventional Commits validation

3. Git hooks and CI:
   - `.githooks/commit-msg` validates commit messages locally
   - GitHub Actions CI runs lint/format/spell checks on every push/PR
   - Repository structure validation ensures required files exist

4. Dev Container:
   - Node.js 20 + pnpm 9 pre-installed
   - All VS Code extensions configured
   - Timezone set to Europe/Warsaw

Design decisions:
- Chose pnpm over npm/yarn for faster installs and strict mode
- Used flat config ESLint (future-proof, recommended by ESLint team)
- Git hooks via `core.hooksPath` instead of Husky (simpler, no install step)
- CI-first approach: all checks run in CI, not just locally

This setup ensures that all future work (whether AI-generated or human-written)
meets consistent quality standards and that the repository remains accessible
to new contributors and conference attendees learning about AI-assisted workflows.
```

## Tips for Writing Verbose Messages

1. **Assume the reader has no context** — they may be reading this commit in isolation months or years later.

2. **Explain "why" before "what"** — the diff shows what changed; the message explains why.

3. **Document design decisions and tradeoffs** — if you considered multiple approaches, explain why you chose this one.

4. **Use multiple paragraphs** — break complex explanations into sections (what, why, how, tradeoffs, next steps).

5. **Reference external resources when helpful** — link to documentation, RFCs, or discussions that provide additional context.

6. **Think of the commit message as documentation** — it should be as useful as inline code comments or README sections.

## Validation

All commit messages are validated using `commitlint` via a git hook. The hook runs automatically on `git commit`.

To skip the hook temporarily (not recommended):

```bash
SKIP_HOOKS=true git commit -m "message"
```

To manually validate a commit message:

```bash
echo "feat(dx): add tooling" | npx commitlint
```

## Further Reading

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [How to Write a Git Commit Message (Chris Beams)](https://chris.beams.io/posts/git-commit/)
- [AI-Assisted Pull Request Workflow](./ai-assisted-pr-workflow.md)
