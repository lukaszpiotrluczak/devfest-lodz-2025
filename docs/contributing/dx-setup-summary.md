# DX Setup Summary

This document summarizes the repository DX setup and tooling configuration.

## Overview

This repository has been configured with production-grade developer experience (DX) tooling from day one, ensuring that all code (whether AI-generated or human-written) meets consistent quality standards.

## What Was Created

### 1. Directory Structure

```
/
├── app/                      # Application code (future: Astro + NestJS)
├── stacks/production/        # Coolify deployment stack
├── .devcontainer/            # Dev Container configuration
├── .vscode/                  # VS Code workspace settings
├── .githooks/                # Git hooks for local validation
└── .github/workflows/        # GitHub Actions CI pipeline
```

### 2. Tooling Configuration

#### ESLint ([eslint.config.js](../../eslint.config.js))

- **Flat config** (ESLint 9+, future-proof)
- TypeScript support via `typescript-eslint`
- Astro plugin for `.astro` files
- Prettier integration (no formatting conflicts)
- Configured for browser + Node.js globals

**Key features:**

- Unused variable warnings (with `_` prefix exemption)
- TypeScript strict mode
- Astro-specific overrides
- Ignores: `node_modules`, `dist`, `.astro`, build artifacts

#### Prettier ([.prettierrc](../../.prettierrc))

- Single quotes
- 2-space indentation
- Semicolons enforced
- 80-character line width
- LF line endings (cross-platform)
- Astro plugin support

#### cspell ([cspell.json](../../cspell.json))

- English + Polish language support
- Custom dictionary for domain terms:
  - Polish names: Łukasz, Łuczak, Łódź
  - Project terms: DevFest, Politechnika, ZenCal
  - Tech stack: Astro, NestJS, Tailwind, Coolify
  - Company identifiers: REGON, NIP, KRS

**Ignores:** node_modules, dist, lock files, URLs, hashes

#### commitlint ([commitlint.config.js](../../commitlint.config.js))

- Conventional Commits enforcement
- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`, `revert`
- Scope validation (kebab-case)
- Header max length: 100 characters
- Body and footer spacing enforced

### 3. Git Hooks ([.githooks/](../../.githooks/))

**commit-msg hook:**

- Validates commit messages using commitlint
- Skips in CI (`CI=true`)
- Can be bypassed with `SKIP_HOOKS=true` (not recommended)

**Setup:**

- Automatically configured via `pnpm install` (prepare script)
- Stored in `.githooks/` (not `.git/hooks/`)
- Uses `git config core.hooksPath .githooks`

**pnpm version:**

- Single source of truth: `packageManager` field in `package.json`
- CI automatically respects this via `pnpm/action-setup@v4`
- Ensures identical versions in local dev and CI

### 4. CI Pipeline ([.github/workflows/ci.yml](../../.github/workflows/ci.yml))

Runs on every push and pull request to `main`:

1. **Setup:**
   - Checkout repository
   - Install Node.js 20
   - Setup pnpm 9
   - Cache pnpm store
   - Install dependencies (frozen lockfile)

2. **Quality checks:**
   - ESLint validation
   - Prettier format check
   - cspell spell check
   - Repository structure validation

3. **Repository validation:**
   - Ensures `docs/`, `conversations/` exist
   - Ensures `README.md`, `LICENSE`, `CONTRIBUTING.md` exist

**All checks must pass** before merging.

### 5. Dev Container ([.devcontainer/devcontainer.json](../../.devcontainer/devcontainer.json))

Provides a fully configured development environment:

**Base image:** `mcr.microsoft.com/devcontainers/typescript-node:20`

**Features:**

- Node.js 20
- Git pre-installed
- pnpm (installed via postCreateCommand)

**VS Code extensions:**

- ESLint
- Prettier
- cspell (Code Spell Checker)
- Astro
- Tailwind CSS IntelliSense
- EditorConfig

**Settings:**

- Format on save (Prettier)
- ESLint auto-fix on save
- LF line endings
- Trim trailing whitespace
- Insert final newline

**Environment:**

- Timezone: `Europe/Warsaw`
- User: `node`

### 6. VS Code Workspace ([.vscode/](../../.vscode/))

**settings.json:**

- Format on save enabled
- ESLint auto-fix enabled
- cspell enabled
- Search/file exclusions for build artifacts

**extensions.json:**

- Recommended extensions list
- VS Code prompts to install on workspace open

### 7. Root Package Management ([package.json](../../package.json))

**Package manager:** pnpm 9.15.0 (enforced via `packageManager` field)

**Node version:** >=20.0.0 (enforced via `engines` field)

**Scripts:**

```bash
pnpm run lint          # ESLint check
pnpm run lint:fix      # ESLint auto-fix
pnpm run format        # Prettier check
pnpm run format:fix    # Prettier auto-fix
pnpm run spell         # cspell check
pnpm run validate      # Run all checks
pnpm run validate:fix  # Run all auto-fixes
```

**Prepare script:**
Automatically sets up git hooks on `pnpm install`.

## How to Use

### First-time Setup

```bash
# Clone the repository
git clone <repo-url>
cd devfest-lodz-2015

# Install dependencies (also sets up git hooks)
pnpm install

# Run validation to ensure everything works
pnpm run validate
```

### Daily Workflow

```bash
# Before committing, run checks
pnpm run validate

# Auto-fix issues
pnpm run validate:fix

# Commit with a conventional commit message
git commit -m "feat(scope): descriptive message"
```

The commit hook will validate your message format automatically.

### Using Dev Container

1. Open repository in VS Code
2. Install "Dev Containers" extension
3. `Cmd+Shift+P` → "Dev Containers: Reopen in Container"
4. Wait for build and dependency installation
5. Start coding with all tools pre-configured

### Skipping Hooks (Emergency Only)

```bash
# Skip commit-msg validation
SKIP_HOOKS=true git commit -m "emergency fix"
```

**Not recommended** — only use in emergencies (CI is broken, urgent hotfix, etc.)

## Design Decisions

### Why pnpm?

- Faster installs via content-addressable storage
- Strict mode prevents phantom dependencies
- Better monorepo support (future: app/astro, app/backend)
- Smaller disk footprint

### Why Flat Config ESLint?

- New ESLint standard (9+)
- Better TypeScript integration
- Cleaner, more maintainable config
- Future-proof (legacy config deprecated)

### Why `.githooks/` Instead of Husky?

- Simpler: no installation step, no scripts in package.json
- Explicit: hooks visible in repository
- Transparent: uses native git `core.hooksPath`
- Fewer dependencies

### Why Verbose Commit Messages?

This is an **educational repository** demonstrating AI-assisted workflows. The commit history serves as **first-class documentation** explaining:

- What changed
- Why it changed
- Design decisions made
- Tradeoffs considered

See [commit-messages.md](./commit-messages.md) for detailed guidance.

### Why CI-First Approach?

Quality gates are enforced in CI, not just locally:

- Prevents "works on my machine" issues
- Ensures all contributors (human or AI) meet the same standards
- Makes quality checks transparent and auditable
- Blocks PRs that don't meet quality standards

## Troubleshooting

### Git hooks not running

```bash
# Verify hooks are configured
git config core.hooksPath

# Should output: .githooks
# If not, manually configure:
git config core.hooksPath .githooks
```

### ESLint errors in VS Code

```bash
# Reload VS Code window
Cmd+Shift+P → "Developer: Reload Window"

# Or restart ESLint server
Cmd+Shift+P → "ESLint: Restart ESLint Server"
```

### Prettier not formatting on save

1. Check that Prettier extension is installed
2. Verify default formatter: `Cmd+Shift+P` → "Format Document With..." → "Prettier"
3. Check `.vscode/settings.json` is loaded

### cspell false positives

Add words to [cspell.json](../../cspell.json) `words` array:

```json
{
  "words": ["newterm"]
}
```

Or add to custom dictionary:

```bash
echo "newterm" >> cspell-custom-dictionary.txt
```

## Next Steps

With the DX foundation in place, the next phases are:

1. **Astro app setup** (`app/astro/`)
2. **NestJS backend setup** (`app/backend/`)
3. **Coolify deployment stack** (`stacks/production/`)
4. **Container builds** (`Containerfile`, `compose.yml`)

Each phase will build on this foundation, ensuring consistent quality gates throughout.

## References

- [README.md](../../README.md) — Project overview
- [commit-messages.md](./commit-messages.md) — Commit message guide
- [ai-assisted-pr-workflow.md](./ai-assisted-pr-workflow.md) — PR workflow
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — Contribution guidelines
