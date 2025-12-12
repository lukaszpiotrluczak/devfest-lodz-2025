# Execution log — Repository & DX setup

Prompt:

- prompts/04-architecture/01-repo-dx-setup.md

AI tool:

- Claude Code

Date:

- 2025-12-12

Mode:

- Direct repository write access (no conversational transcript)

---

## Preflight inventory

Initial inspection performed before changes:

- Repository root existed but lacked DX tooling and CI foundations
- No `.devcontainer/`, `.vscode/`, `.githooks/`, or CI workflows present
- No enforced commit conventions or quality gates
- Documentation present but required expansion for DX and contribution guidelines

Conclusion:

- Safe to scaffold DX, tooling, and CI from scratch without overwriting existing critical files.

---

## Files created

### Repository structure

- `app/`
- `stacks/production/`
- `.devcontainer/`
- `.vscode/`
- `.githooks/`

### Tooling & configuration

- `package.json`
- `eslint.config.js`
- `.prettierrc`
- `.prettierignore`
- `cspell.json`
- `cspell-custom-dictionary.txt`
- `commitlint.config.js`
- `.editorconfig`
- `.gitignore`

### Git hooks

- `.githooks/commit-msg`

### CI

- `.github/workflows/ci.yml`

### Dev Container

- `.devcontainer/devcontainer.json`

### VS Code workspace

- `.vscode/settings.json`
- `.vscode/extensions.json`

### Documentation

- `README.md`
- `docs/contributing/commit-messages.md`
- `docs/contributing/dx-setup-summary.md`

---

## Files modified

- `README.md` (expanded with DX setup, Dev Container usage, and quality gates)

---

## Files intentionally NOT changed

- No application code created yet (`app/` remains empty)
- No Astro or NestJS configuration introduced at this stage
- No build or test pipelines added (no app code exists yet)

---

## Summary of decisions

### Root tooling strategy

- Chosen: root `package.json` as a tooling orchestrator
- Rationale:
  - Centralized DX and CI configuration
  - Prepares for future monorepo-style structure (`app/astro`, `app/backend`)
  - Enables consistent quality gates from day one

### Git hooks strategy

- Chosen: `.githooks/` with `core.hooksPath`
- Rationale:
  - No extra dependencies
  - Hooks are explicit and visible in the repository
  - Works consistently in local dev and CI environments
- Tradeoff:
  - Less commonly used than Husky
- Mitigation:
  - Documented clearly in contribution guides

### Package manager

- Chosen: `pnpm` (v9)
- Rationale:
  - Faster installs
  - Strict dependency resolution
  - Better long-term support for multi-package setups
- Tradeoff:
  - Slight learning curve for contributors
- Enforcement:
  - `packageManager` and `engines` fields in `package.json`

### ESLint configuration

- Chosen: Flat config (ESLint 9+)
- Rationale:
  - Future-proof
  - Better TypeScript and Astro integration
- Tradeoff:
  - Fewer legacy examples
- Mitigation:
  - Only stable, well-supported plugins used
  - Configuration documented in `dx-setup-summary.md`

### CI scope

- Current CI validates:
  - ESLint
  - Prettier formatting
  - cspell
  - Repository structure sanity
- Explicitly deferred:
  - Build validation
  - Tests
  - Type checking
- Rationale:
  - No application code yet
  - CI is designed to evolve incrementally with the codebase

### Commit message policy

- Chosen: Verbose, educational Conventional Commits
- Rationale:
  - Public, educational repository
  - Commit history acts as documentation
- Tradeoff:
  - Higher effort per commit
- Mitigation:
  - Detailed commit message guide provided
  - Enforced via commitlint and git hooks

---

## Known limitations / open questions

- Application-level tooling (Astro, NestJS) intentionally deferred
- Type checking and build validation will be added once app code exists
- Test strategy not yet defined
- Coolify stack files (`stacks/production/`) are placeholders pending deployment phase

---

## Outcome

The repository now has a **production-grade DX foundation** with:

- Strict quality gates (local + CI)
- Reproducible development environment (Dev Container)
- Clear contribution and commit standards
- Incremental CI strategy aligned with project maturity

Next planned phase:

- Introduce Astro frontend structure under `app/astro/`
- Promote existing HTML prototypes into real Astro components

---

## Patch: CI fix (pnpm version conflict)

See: docs/contributing/pnpm-version-fix.md

- Modified: .github/workflows/ci.yml
  - Removed explicit pnpm version pin to avoid conflict with package.json `packageManager`
- Decision: `package.json` is the single source of truth for pnpm version via Corepack
- Result: CI and local dev use the same pnpm version (9.15.0)

---

## Patch: CI lockfile enforcement & dependency hardening

### Problem observed

CI failed during dependency installation:

- `pnpm install --frozen-lockfile` failed with:
  `ERR_PNPM_NO_LOCKFILE`
- Root cause: `pnpm-lock.yaml` was not committed, while CI correctly enforced frozen installs.

This surfaced a missing but required production-grade artifact.

---

### Solution applied

#### Lockfile enforcement

- Generated and committed `pnpm-lock.yaml` using pnpm 9.15.0 (via `packageManager`).
- Ensured lockfile is **not ignored** by git.

Created:

- `pnpm-lock.yaml` (~87 KB, 326 resolved dependencies)

Modified:

- `.gitignore`
  - Removed `pnpm-lock.yaml` from ignore list
  - Added explanatory comment about reproducibility

#### Tooling stabilization

Additional fixes were applied to ensure CI and local validation remain green:

Created:

- `tsconfig.json`
  - Minimal TypeScript config required for ESLint TypeScript parser
  - Covers `.ts`, `.tsx`, `.js`, `.mjs` files

Modified:

- `cspell.json`
  - Added Polish names and domain-specific technical terms
  - Ignored conversation logs and prototype HTML files (data-heavy, multilingual content)

- `scripts/convert-conversation-json-to-md.ts`
  - Removed unused import (ESLint error)
  - Reformatted with Prettier

#### Documentation

Created:

- `docs/contributing/lockfile-and-dependencies.md`

This document explains:

- Why the lockfile is committed
- Why `--frozen-lockfile` is enforced in CI
- How contributors should add/update dependencies
- How to recover from lockfile-related CI failures

---

### Why `--frozen-lockfile` remains enabled

CI intentionally continues to enforce frozen installs:

- Deterministic builds (local = CI = production)
- Early detection of human error (package.json changed without lockfile)
- Faster, registry-independent CI installs
- Reduced supply-chain risk
- Explicit audit trail for dependency changes

Rejected alternative:

- Switching to `--no-frozen-lockfile`
  Reason:
- Allows dependency drift
- Reintroduces “works on my machine” issues
- Violates production-grade and educational goals of the repository

---

### Verification

Local verification:

- `pnpm run validate`
  - ESLint: 0 errors
  - Prettier: all files formatted
  - cspell: 0 errors

Dependency install:

- `pnpm install --frozen-lockfile`
  - Lockfile unchanged
  - 326 packages installed deterministically

Git hooks:

- `core.hooksPath` correctly set to `.githooks/`

---

### Outcome

- CI dependency installation step is now stable and deterministic
- Lockfile is treated as a first-class artifact
- Tooling configuration is aligned across ESLint, Prettier, and cspell
- Contributors have clear, documented guidance for dependency management

This patch completes the transition to **production-grade dependency handling**
with strict reproducibility guarantees.
