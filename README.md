# MONOREPO


Ovaj monorepo sadrži dvije Next.js (App Router, TypeScript) aplikacije: `web` i `admin`.

- **Monorepo managed by:** pnpm
- **Apps:**
  - `apps/web` — Main web app
  - `apps/admin` — Admin dashboard
- **Shared packages:**
  - `packages/shared` — Prisma schema, generated types, and shared Tailwind config (including shadcn/ui)
s
## Features
- Next.js (App Router, TypeScript)
- Tailwind CSS (shared config)
- shadcn/ui (shared components)
- Prisma (shared schema, types)
- pnpm workspaces

## Getting Started

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Generate Prisma client:
   ```sh
   pnpm --filter @sport/shared prisma generate
   ```
3. Run apps:
   ```sh
   pnpm --filter web dev
   pnpm --filter admin dev
   ```

## Structure
- `apps/web` — User-facing app
- `apps/admin` — Admin dashboard
- `packages/shared` — Prisma schema, types, Tailwind config, shadcn/ui components

---

Replace this README with more details as you build out the project.
