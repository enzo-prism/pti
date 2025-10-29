# Repository Guidelines

## Project Structure & Module Organization
The Vite + React app lives in `src/`, with feature views under `src/pages`, reusable UI in `src/components`, hooks in `src/hooks`, and shared helpers in `src/lib`. Static copy, testimonials, and other content live in `src/data`. Global styles are defined in `src/index.css` and Tailwind tokens in `tailwind.config.ts`. Public assets (favicons, sitemap seed) reside in `public`, while build artifacts land in `dist` after a production build. Automation utilities for sitemap upkeep are kept in `scripts/`.

## Build, Test, and Development Commands
Run `npm run dev` for the Vite dev server with hot reload. Use `npm run build` for an optimized production bundle and `npm run build:dev` when you need a debuggable development build. Execute `npm run preview` to serve the last build locally. Lint the project with `npm run lint`, which enforces the repo’s ESLint + TypeScript ruleset.

## Coding Style & Naming Conventions
Write all production code in TypeScript with strict typing. Follow 2-space indentation and prefer functional React components. Name components with PascalCase files (for example `HeroSection.tsx`), co-locate supporting styles or utilities as needed, and prefix custom hooks with `use`. Favor Tailwind utility classes for styling; when adding variants, extend the design tokens in `tailwind.config.ts`. ESLint and Prettier defaults are encoded via `eslint.config.js`, so run the linter before submitting work.

## Testing Guidelines
No automated test suite ships yet; when adding coverage, place Vitest specs alongside source files using the `.test.ts(x)` suffix. Mock external services (e.g., Supabase) and ensure new UI logic includes accessibility assertions. Until a test harness exists, manually validate critical flows in both development and production preview builds.

## Commit & Pull Request Guidelines
Commit messages should mirror the existing history: concise, imperative summaries such as “Fix blog post runtime error”. For pull requests, describe user-facing changes, list verification steps (`npm run build`, lint results), and link to any Lovable tasks or issues. Include screenshots or recordings for UI updates and call out new environment variables or migrations so reviewers can replicate your setup.
