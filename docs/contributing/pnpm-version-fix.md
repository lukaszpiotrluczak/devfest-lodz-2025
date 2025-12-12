# pnpm Version Conflict Resolution

## Problem

CI was failing with `ERR_PNPM_BAD_PM_VERSION` due to conflicting pnpm version specifications:

1. **`.github/workflows/ci.yml`** specified `version: 9` (major version only)
2. **`package.json`** specified `"packageManager": "pnpm@9.15.0"` (exact version)

When both are present, pnpm/action-setup@v4 detects a conflict and fails.

## Solution

**Remove the explicit `version` field from the CI workflow** and let `pnpm/action-setup@v4` automatically read the `packageManager` field from `package.json`.

### Changes Made

**File: [.github/workflows/ci.yml](../../.github/workflows/ci.yml)**

```diff
       - name: Setup pnpm
         uses: pnpm/action-setup@v4
-        with:
-          version: 9
```

The `pnpm/action-setup@v4` action automatically detects and respects the `packageManager` field in `package.json` when no explicit `version` is provided.

## Why This Approach?

### Single Source of Truth: `package.json`

The `packageManager` field in `package.json` is the **standard, recommended way** to specify package manager versions:

1. **Node.js Corepack standard** — officially supported by Node.js
2. **Reproducible across environments** — local dev, CI, and production all use the exact same version
3. **No version drift** — developers cannot accidentally use different pnpm versions locally
4. **Automatic enforcement** — tools like Corepack and pnpm/action-setup@v4 respect this field automatically

### Why NOT Pin Only in CI?

**Alternative rejected:** Remove `packageManager` from `package.json` and pin pnpm only in `.github/workflows/ci.yml`

**Why this is worse:**
- **No local version enforcement** — developers could use pnpm 8, 9, or 10 locally with unpredictable results
- **Violates "production-grade" requirement** — production-grade projects ensure reproducibility across all environments
- **Hidden drift** — local dev and CI could behave differently, leading to "works on my machine" issues
- **Manual coordination required** — developers must manually install the correct pnpm version (no automated enforcement)

## Verification

### Before (CI Failure)

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 9  # ❌ Conflicts with package.json
```

```json
{
  "packageManager": "pnpm@9.15.0"  // ❌ Conflicts with CI workflow
}
```

**Result:** `ERR_PNPM_BAD_PM_VERSION` in CI

### After (CI Success)

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4
  # ✅ Automatically reads packageManager from package.json
```

```json
{
  "packageManager": "pnpm@9.15.0"  // ✅ Single source of truth
}
```

**Result:** CI uses pnpm 9.15.0 (same as local dev)

## How It Works

When `pnpm/action-setup@v4` runs **without** an explicit `version` parameter:

1. Checks for `packageManager` field in `package.json`
2. Reads the exact version (e.g., `pnpm@9.15.0`)
3. Installs that exact version
4. All subsequent `pnpm` commands use 9.15.0

This ensures **local dev and CI are identical**.

## Benefits

✅ **Reproducible builds** — same pnpm version everywhere
✅ **Zero configuration** — developers run `pnpm install` and get the correct version automatically
✅ **No drift** — impossible for local and CI to diverge
✅ **Standards-compliant** — uses Node.js Corepack standard
✅ **Educational transparency** — single source of truth is clear and documented

## Related Documentation

- [package.json](../../package.json) — `packageManager` field (line 11)
- [.github/workflows/ci.yml](../../.github/workflows/ci.yml) — pnpm setup (line 25-26)
- [dx-setup-summary.md](./dx-setup-summary.md) — Full DX setup reference
