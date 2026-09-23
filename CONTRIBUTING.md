# Contributing to Supportly

Thank you for contributing to **Supportly**! To maintain code quality, reliable releases, and engineering consistency across the full-stack codebase, all contributors and team members must adhere to these branching, versioning, and contribution guidelines.

---

## 🌳 Git Branching Strategy

We follow a **Trunk-Based / GitHub Flow** development lifecycle:

- **`main`**: Production-ready branch. Code on `main` must always build cleanly, pass all validation gates, and be deployable to production.
- **Feature Branches**: Created directly from `main` and merged via Pull Requests after verification.

### Branch Naming Conventions

All branches must use lowercase alphanumeric characters with hyphens, prefixed with an appropriate categorization:

| Prefix | Usage | Example |
|---|---|---|
| `feat/` | New functionality or user-facing features | `feat/ticket-csv-export` |
| `fix/` | Bug fixes or issue resolutions | `fix/search-debounce-leak` |
| `perf/` | Performance optimizations | `perf/gin-index-tuning` |
| `refactor/` | Code restructuring without feature or bug changes | `refactor/ticket-service-layer` |
| `docs/` | Documentation changes or additions | `docs/api-endpoint-spec` |
| `chore/` | Tooling, dependencies, and build pipeline updates | `chore/update-tailwind-deps` |

---

## 📝 Conventional Commits

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard:

```text
<type>(<optional scope>): <imperative description>
```

### Commit Types:
- **`feat`**: A new feature
- **`fix`**: A bug fix
- **`docs`**: Documentation changes only
- **`style`**: Code formatting or aesthetic styling changes
- **`refactor`**: Code refactoring with no behavioral change
- **`perf`**: Performance improvement
- **`test`**: Adding or modifying automated tests
- **`chore`**: Build process, configuration, or dependency updates

### Examples:
```bash
git commit -m "feat(tickets): add bulk status transition endpoint"
git commit -m "fix(search): prevent empty query execution on clear"
git commit -m "docs(api): document paginated response envelope"
git commit -m "chore(release): bump version to 1.1.0"
```

---

## 🏷️ Versioning Protocol (SemVer 2.0.0)

Supportly strictly adheres to **Semantic Versioning 2.0.0** (`MAJOR.MINOR.PATCH`):

```text
vMAJOR.MINOR.PATCH
```

### When to Increment:
1. **MAJOR (`v2.0.0`)**:
   - Incompatible, breaking API changes.
   - Breaking database schema migrations requiring manual intervention.
   - Removal of existing endpoints or authentication contract shifts.
2. **MINOR (`v1.1.0`)**:
   - Backward-compatible new features (e.g. new endpoints, new filter capabilities, new UI views).
   - Non-breaking database column additions.
3. **PATCH (`v1.0.1`)**:
   - Backward-compatible bug fixes.
   - Security patches and dependency security updates.
   - Performance improvements and UI styling adjustments.

---

## 🔄 Global Version Synchronization Rule

To ensure consistent dependencies across the monorepo, **every release or version bump MUST update all 3 `package.json` files simultaneously**:

1. **Root**: [`package.json`](file:///c:/Users/Yash/VS_PROJECTS/Supportly/package.json) (`"version": "X.Y.Z"`)
2. **Client**: [`client/package.json`](file:///c:/Users/Yash/VS_PROJECTS/Supportly/client/package.json) (`"version": "X.Y.Z"`)
3. **Server**: [`server/package.json`](file:///c:/Users/Yash/VS_PROJECTS/Supportly/server/package.json) (`"version": "X.Y.Z"`)

Never publish, merge, or tag a release if these three files have mismatched version numbers.

---

## 📋 Changelog Maintenance (`CHANGELOG.md`)

Every merged pull request and release **MUST** be recorded in [`CHANGELOG.md`](file:///c:/Users/Yash/VS_PROJECTS/Supportly/CHANGELOG.md) according to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/):

### Categories:
- **`Added`**: New features or capabilities.
- **`Changed`**: Changes in existing functionality.
- **`Deprecated`**: Soon-to-be removed features.
- **`Removed`**: Removed features.
- **`Fixed`**: Any bug fixes.
- **`Security`**: Security improvements or vulnerability patches.

When preparing a release:
1. Move items from `[Unreleased]` into a new section: `## [X.Y.Z] - YYYY-MM-DD`.
2. Commit the changelog with `chore(release): prepare vX.Y.Z`.

---

## 🚀 Development & Release Workflow

### 1. Starting a New Task
```bash
# Ensure local main is synchronized with remote
git checkout main
git pull origin main

# Create a dedicated feature branch
git checkout -b feat/your-feature-name
```

### 2. Verification Gates (Must Pass Before Merge)
Both the frontend and backend builds must complete with **0 errors**:
```bash
# Verify client build
npm run build:client

# Verify server build
npm run build:server
```

### 3. Submitting a Pull Request
1. Commit your changes following conventional commit syntax.
2. Push your feature branch to GitHub:
   ```bash
   git push -u origin feat/your-feature-name
   ```
3. Open a Pull Request against `main`. Provide:
   - Summary of changes and problem solved.
   - Testing steps and visual confirmation (screenshots / recordings for UI changes).
   - Confirmation that builds pass with 0 errors.

### 4. Tagging a Release
Once merged to `main`:
```bash
# Create an annotated release tag
git tag -a v1.0.0 -m "Release v1.0.0 - Stable MVP"

# Push the tag to remote
git push origin v1.0.0
```
