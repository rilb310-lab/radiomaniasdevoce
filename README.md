# Rádio Manias de Você

Landing page for Rádio Manias de Você, an online radio station. The page includes a live player,
a programming schedule, a community section, and a "Clube de Sorteios" giveaway signup form that
stores entries in a Postgres database.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router)
- Vite 7
- Netlify Database (managed Postgres) with Drizzle ORM, for giveaway signups
- Deployed on Netlify

## Running locally

```bash
npm install
npm run dev
```

This starts the Vite dev server. For full local emulation of Netlify features (including the
database), use the Netlify CLI instead:

```bash
netlify dev
```

## Database

The giveaway signup form writes to a `giveaway_signups` table, defined in `db/schema.ts` and
managed with Drizzle Kit. After changing the schema, generate a migration with:

```bash
npx drizzle-kit generate --name <descriptive_name>
```

Migrations are applied automatically on deploy.
