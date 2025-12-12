# Lockfile and Dependency Management

This document explains how dependency management works in this repository and why the lockfile is required.

## Overview

This repository uses **pnpm** with a **committed lockfile** (`pnpm-lock.yaml`) to ensure deterministic, reproducible builds across all environments.

## Why Commit the Lockfile?

The `pnpm-lock.yaml` file is **critical for production-grade projects** because it:

1. **Ensures reproducibility** — everyone gets the exact same dependency versions
2. **Prevents drift** — local dev, CI, and production all use identical dependencies
3. **Enables frozen installs** — CI can install without network requests for version resolution
4. **Catches missing updates** — if someone forgets to commit a dependency change, CI fails
5. **Documents the exact dependency tree** — useful for security audits and debugging

## CI Enforcement: `--frozen-lockfile`

The CI pipeline ([.github/workflows/ci.yml](../../.github/workflows/ci.yml)) runs:

```bash
pnpm install --frozen-lockfile
```

This flag means:

- ✅ **Install dependencies** from the lockfile
- ❌ **Fail if lockfile is missing**
- ❌ **Fail if lockfile is out of sync** with `package.json`
- ❌ **Never modify the lockfile**

**Why this matters:**

- Prevents accidental dependency changes in CI
- Ensures CI uses the exact versions that were tested locally
- Catches when someone updates `package.json` but forgets to update the lockfile

## How to Manage Dependencies

### Adding a New Dependency

```bash
# Add a production dependency
pnpm add <package-name>

# Add a dev dependency
pnpm add -D <package-name>

# This automatically updates pnpm-lock.yaml
# Commit BOTH package.json AND pnpm-lock.yaml
git add package.json pnpm-lock.yaml
git commit -m "build(deps): add <package-name>"
```

### Updating Dependencies

```bash
# Update a specific package
pnpm update <package-name>

# Update all packages (respecting semver in package.json)
pnpm update

# Update to latest (ignoring semver)
pnpm update --latest

# Always commit the updated lockfile
git add pnpm-lock.yaml
git commit -m "build(deps): update dependencies"
```

### Removing a Dependency

```bash
# Remove a dependency
pnpm remove <package-name>

# This automatically updates pnpm-lock.yaml
git add package.json pnpm-lock.yaml
git commit -m "build(deps): remove <package-name>"
```

## Lockfile Out of Sync

If CI fails with:

```
ERR_PNPM_OUTDATED_LOCKFILE  pnpm-lock.yaml is out of sync with package.json
```

**Cause:** `package.json` was modified but `pnpm-lock.yaml` wasn't updated.

**Fix:**

```bash
# Regenerate the lockfile
pnpm install

# Commit the updated lockfile
git add pnpm-lock.yaml
git commit -m "build(deps): sync lockfile with package.json"
```

## `.gitignore` Configuration

The lockfile is **NOT ignored** (unlike `node_modules/`):

```gitignore
# .gitignore

# Dependencies
node_modules/
# pnpm-lock.yaml is committed for reproducible builds  ✅
```

**Why:**

- `node_modules/` is generated from the lockfile (never commit)
- `pnpm-lock.yaml` is the source of truth for exact versions (always commit)

## Version Control Best Practices

### Always Commit Lockfile Changes

When you update dependencies:

1. ✅ **Commit `package.json` AND `pnpm-lock.yaml` together**
2. ✅ **Use descriptive commit messages** (follow Conventional Commits)
3. ✅ **Test locally before pushing**

```bash
# Good: both files committed together
git add package.json pnpm-lock.yaml
git commit -m "build(deps): upgrade ESLint to v9.39.1

Updates ESLint from 9.17.0 to 9.39.1 to fix security vulnerability
CVE-2024-XXXXX.

Includes upstream bugfixes for flat config handling."
```

### Never Skip Lockfile Updates

```bash
# ❌ Bad: only package.json committed
git add package.json
git commit -m "add new dependency"
# This will fail in CI!
```

## Troubleshooting

### CI Fails: `ERR_PNPM_NO_LOCKFILE`

**Problem:** No `pnpm-lock.yaml` exists

**Solution:**

```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "build(deps): add lockfile for reproducible builds"
```

### CI Fails: `ERR_PNPM_OUTDATED_LOCKFILE`

**Problem:** `pnpm-lock.yaml` is out of sync with `package.json`

**Solution:**

```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "build(deps): sync lockfile"
```

### Local Install Fails

**Problem:** Corrupt lockfile or cache

**Solution:**

```bash
# Clean pnpm cache
pnpm store prune

# Delete node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml

# Reinstall from scratch
pnpm install
```

## Related Documentation

- [pnpm-version-fix.md](./pnpm-version-fix.md) — How pnpm version is managed
- [dx-setup-summary.md](./dx-setup-summary.md) — Complete DX setup reference
- [package.json](../../package.json) — Package manager configuration
- [.github/workflows/ci.yml](../../.github/workflows/ci.yml) — CI pipeline
