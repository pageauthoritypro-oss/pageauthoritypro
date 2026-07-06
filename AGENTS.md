<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Project: Page Authority Pro - Agent Mandates

## Tech Stack
- **Framework:** Next.js 16.2.6 (App Router)
- **UI:** React 19.2.4 + Tailwind CSS v4 + shadcn/ui
- **CMS:** Sanity 5.28.0 (next-sanity 12.4.5)
- **Validation/Forms:** Zod 4.4.3 + React Hook Form 7.76.1
- **State:** Zustand 5.0.14
- **Package Manager:** pnpm 10.x

---

## Non-negotiable Architectural Rules

### Data Fetching
- **Strictly use `sanityFetch`** from `@/sanity/lib/live` for all page and helper data.
- Never use `client.fetch()` directly in components.
- Real-time updates are handled via `<SanityLive />` in the root layout.

### Folder Conventions
- `src/app/`: App Router routes and layouts.
- `src/components/ui/`: Auto-generated shadcn components (do not edit).
- `src/sanity/helpers/`: All data-fetching logic (getPage, getSettings, etc.).
- `src/sanity/queries/`: Pure GROQ strings only. No logic allowed here.
- `src/sanity/schemaTypes/`: CMS schema definitions.
- `src/sanity/types/`: TypeScript interfaces/types for Sanity data.
- `src/stores/`: Zustand stores (one per feature domain).

### Implementation Standards
- **Validation:** Always use React Hook Form + Zod. No manual validation.
- **UI Components:** Always use shadcn/ui via `pnpm dlx shadcn@latest add`.
- **State:** Use Zustand for global state, `useState` for local state.
- **Schemas:** Maximum 350 lines per schema file. Use reusable objects in `schemaTypes/objects/`.
- **SEO:** Use `generateMetadata()` from `@/sanity/helpers/seo` on all pages.
- **TypeScript:** Strictly no `any`. Use `unknown` or proper interfaces.
- **File Size:** Strictly no file over 350 lines. Modularize if approaching limit.

### Sanity Specifics
- `siteSettings` is a strictly enforced singleton (`_id: "siteSettings"`).
- All page-level documents must include the `advancedSeo` object type.
- Do not place GROQ strings inside helpers; import them from `queries/`.

---

## Common Commands
- `pnpm dev`: Local development.
- `pnpm build`: Production build.
- `pnpm lint`: Code quality check.
- `pnpm dlx shadcn@latest add <name>`: Add UI component.

---

## Documentation References
- `docs/DEVELOPER_GUIDE.md`: Deep dive into patterns.
- `docs/ARCHITECTURE.md`: System design and data flow.
- `docs/EXAMPLES.md`: Reference implementation examples.
