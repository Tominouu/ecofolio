# Contributing to Ecofolio

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. By participating, you agree to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## License

Ecofolio is [MIT licensed](../LICENSE). By contributing, you agree that your contributions will be licensed under the same license.

## How to Contribute

### 1. Find an issue

- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to express interest
- Wait for a maintainer to assign it to you

### 2. Development Setup

```bash
# Clone the repository
git clone https://github.com/Tominouu/ecofolio.git
cd ecofolio

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint
```

### 3. Branch naming

```
feature/short-description    # New features
fix/short-description        # Bug fixes
docs/short-description       # Documentation
refactor/short-description   # Code refactoring
```

### 4. Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add gallery block with lightbox support
fix: preview not updating on image upload
docs: update README with quick start guide
refactor: extract block validation logic
style: improve card component spacing
test: add unit tests for git service
chore: update dependencies
```

Format: `<type>(<scope>): <description>`

### 5. Pull Request Process

1. Create a branch from `main`
2. Write tests for your changes
3. Ensure all tests pass: `npm test`
4. Ensure type checking passes: `npm run typecheck`
5. Ensure linter passes: `npm run lint`
6. Create a PR with a clear description
7. Link the related issue
8. Wait for review

### 6. Code Style

- **TypeScript** — Strict mode enabled. No `any` unless absolutely necessary.
- **Formatting** — Prettier (default config). Run `npm run format`.
- **Imports** — Use ES modules. Group: built-in → external → internal.
- **Naming** — camelCase for functions/variables, PascalCase for types/classes, kebab-case for files.
- **Exports** — Named exports preferred over default exports.
- **Error handling** — Use custom error classes. Never swallow errors silently.

```typescript
// Good
export function createProject(slug: string, data: ProjectData): Promise<Project> {
  // ...
}

// Avoid
export default function(slug, data) {
  // ...
}
```

### 7. Architecture rules

- **No database**: All storage is file-based (JSON)
- **No framework JS**: Use EJS + HTMX + vanilla CSS. No React/Vue/Svelte.
- **Eco-first**: Every feature must consider its environmental impact
- **Accessibility**: All UI must meet WCAG 2.2 AA minimum
- **Performance**: Server startup < 500ms, preview rebuild < 200ms

## Project Structure

```
src/
  core/        # Types, interfaces, shared utilities
  server/      # Fastify HTTP server, API routes, middleware
  editor/      # Dashboard & editor UI (EJS + HTMX + CSS)
  preview/     # Live preview server
  generator/   # Static site generator
  blocks/      # Block system + native block implementations
  themes/      # Theme engine
  git/         # Git abstraction layer
  metrics/     # Eco metrics engine
  cli/         # CLI entry point
```

## Testing

- Unit tests: `vitest` — One file per module in `tests/unit/`
- Integration tests: API endpoint testing in `tests/integration/`
- E2E tests: Playwright in `tests/e2e/`

```bash
npm run test          # Run all tests
npm run test:unit     # Unit tests only
npm run test:watch    # Watch mode
```

## Questions?

Open a [Discussion](https://github.com/Tominouu/ecofolio/discussions) or ask in the issue.
