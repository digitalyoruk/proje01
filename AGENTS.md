# Agent guide — PROJE 01

This is a Next.js migration of the WordPress site **proje01.com** (Turkish luxury
architecture & renovation studio), driven by Sanity CMS.

## Read first

Always read `/docs` before working:

- `docs/00-PROJECT-OVERVIEW.md` — goals, stack, phases
- `docs/01-BRAND.md` — colors, type, logo, voice
- `docs/02-CONTENT-MAP.md` — every page + exact Turkish copy
- `docs/03-RULES.md` — engineering + design rules (non-negotiable)
- `docs/04-TODO.md` — live task list
- `docs/05-SANITY.md` — CMS model + intern guide

## Key rules (summary)

- Copy is Turkish and EXACT — pull from `docs/02-CONTENT-MAP.md` / `src/content/site.ts`.
- Brand: warm editorial, single clay accent `#B55329`, one theme. No em-dashes.
- Everything should be CMS-editable (Sanity) for a non-coder intern.
- Responsive from day 0. Honor `prefers-reduced-motion`. Icons = Phosphor only.
- Forms are visual-only placeholders until wired later.
- Use the design skills (`design-taste-frontend` / `stitch-design-taste`) when
  designing new sections.
- Run `npm run lint` and `npm run build` before declaring work done.

## Workflow

Phase 1 = landing page only (review gate). Phase 2 = all other pages AFTER the
owner approves the landing page. Do not jump ahead.

## Stack

Next.js 16 (App Router, `src/`, TS) · Tailwind v4 · shadcn/ui · Motion
(`motion/react`) · Sanity (`/studio`) · fonts Inter Tight + Inter.
