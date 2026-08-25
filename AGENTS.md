# AGENTS.md

Overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

Landing page for Rádio Manias de Você, an online radio station. Single-page site with a hero player,
programming schedule, community section, and a "Clube de Sorteios" (giveaway club) email signup form
backed by a Postgres database. Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Plain CSS scoped under `#manias-preview` (no Tailwind classes used on this page) |
| Database | Netlify Database (managed Postgres) via Drizzle ORM |
| Language | TypeScript 5.9 |
| Deployment | Netlify |

## Directory Structure

```
├── db
│   ├── index.ts        # Drizzle client (Netlify Database adapter)
│   └── schema.ts        # giveaway_signups table definition
├── drizzle.config.ts     # Drizzle Kit config; migrations output to netlify/database/migrations
├── netlify/database/migrations  # Generated SQL migrations, applied automatically on deploy
├── src
│   ├── router.tsx        # TanStack Router setup
│   ├── routes
│   │   ├── __root.tsx     # Root HTML shell, page title/meta
│   │   └── index.tsx      # The entire Rádio Manias de Você landing page
│   ├── server
│   │   └── giveaway.functions.ts  # Server function that inserts giveaway signups
│   └── styles.css        # Global Tailwind import (used only by the base template shell)
├── netlify.toml           # Build command (vite build), publish dir (dist/client), dev settings
├── package.json
└── vite.config.ts
```

## Key Concepts

### File-Based Routing (TanStack Router)

- `__root.tsx` — root layout wrapping all pages
- `index.tsx` — the `/` route; renders the full radio station landing page as one component

### Giveaway signups

The "Clube de Sorteios Manias" form on the homepage collects a name and email. Submission calls the
`joinGiveawayList` server function (`src/server/giveaway.functions.ts`), which validates the input
with Zod and inserts a row into the `giveaway_signups` table via Drizzle. Duplicate emails are
silently ignored (`onConflictDoNothing`).

### Database schema changes

Any change to `db/schema.ts` requires a new migration:

```bash
npx drizzle-kit generate --name <descriptive_name>
```

Migrations live in `netlify/database/migrations/` and are applied automatically at deploy time.

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
```

## Conventions

- The landing page styling is intentionally kept as plain CSS (ported from the original design mockup)
  scoped under the `#manias-preview` root id, rather than converted to Tailwind utility classes, to
  preserve the exact visual design.
- Server-side data access lives in `src/server/*.functions.ts` files using `createServerFn`; these are
  the only files that should import from `db/`.
