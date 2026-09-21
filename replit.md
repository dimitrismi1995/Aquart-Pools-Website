# Aquart Pools

A premium mobile-first enquiry website for pool construction, renovation, maintenance, repairs, and equipment upgrades in Cyprus.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/aquart-pools run dev` — run the Aquart Pools website through its managed workflow
- `pnpm --filter @workspace/aquart-pools run typecheck` — check the Aquart Pools frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/aquart-pools/src/App.tsx` — single-page website content and interactions
- `artifacts/aquart-pools/src/index.css` — responsive styling, theme, and motion
- `attached_assets/generated_images/aquart-pool-hero.jpg` — replaceable hero/poster image

## Architecture decisions

- The first release is frontend-only; the quote form demonstrates validation and a success state but does not send or persist enquiries.
- WhatsApp remains disabled until the business confirms the listed phone number accepts WhatsApp.
- Unverified address, service areas, opening hours, legal URLs, project details, and company claims remain explicit placeholders.
- The hero uses a poster-based replaceable video placeholder until an approved 10-second MP4 is supplied.

## Product

- Responsive single-page service website with sticky navigation and a mobile contact bar
- Call, email, service, project, FAQ, and quote-request flows
- Accessible quote form with client-side validation, consent, optional image selection, and no-refresh success state
- Search and social metadata plus placeholder-safe LocalBusiness structured data

## User preferences

- Do not invent certifications, awards, reviews, customer numbers, years of experience, prices, guarantees, manufacturer partnerships, or unverified business details.

## Gotchas

- Keep WhatsApp links inactive until confirmed by the business.
- Replace the hero media, project imagery, map, legal-page URLs, address, hours, and detailed service areas before publishing.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
