# PROJE 01 — WordPress → Next.js Migration

> Master reference for any agent or developer working on this codebase.
> Read this file **first**, then the sibling docs in `/docs`.

## What this is

Migration of **https://proje01.com/** (a Turkish luxury **architecture, interior
design & turnkey renovation studio** based in İzmir / Manisa, Aegean region) from
**WordPress (Elementor + ThemeREX theme)** to a modern, maintainable **Next.js**
stack driven by **Sanity CMS**.

The brand is premium and warm-editorial. The studio promotes high-end interior /
renovation work, so the site must feel **elegant, calm, and expensive** — never
templated or "AI-default".

Company legal note (footer): *"© Proje 01, Bir Egekale Group Markasıdır."*
(Proje 01 is a brand of **Egekale Group**.)

## Goals (from the site owner)

1. Pixel-faithful migration of the existing design + **exact Turkish copy**.
2. Easy maintenance via **"vibe coding"** + a CMS an **intern can run without code**.
3. **Responsive from day 0.**
4. **SEO best practice** (metadata, sitemap, robots, structured data, OG).
5. **Elegant premium** feel (luxury positioning).
6. **Sanity CMS** so almost everything is editable without touching code.
7. Forms are **non-functional placeholders for now** (wired up later).
8. Images use the **live WordPress public URLs for now**; later downloaded and
   moved into Sanity / the repo.

## Workflow / sequencing (IMPORTANT)

- **Phase 1 (current):** Build the **landing page only**. Owner reviews it.
- **Phase 2 (after approval):** Build all remaining pages using the same system.
- Do **not** start Phase 2 pages until the landing page is approved.

## Tech stack

| Concern        | Choice                                    |
| -------------- | ----------------------------------------- |
| Framework      | Next.js 16 (App Router, `src/`, TS)       |
| Styling        | Tailwind CSS v4                           |
| UI primitives  | shadcn/ui                                 |
| Animation      | Motion (`motion/react`)                   |
| Icons          | `@phosphor-icons/react` (one family only) |
| CMS            | Sanity (embedded Studio at `/studio`)     |
| Fonts          | Inter Tight (display) + Inter (body)      |
| Language       | Turkish (`lang="tr"`), single locale      |

## Source-of-truth docs

- `01-BRAND.md` — colors, type, logo, voice, design tokens.
- `02-CONTENT-MAP.md` — every page, its URL, and exact copy.
- `03-RULES.md` — non-negotiable engineering + design rules for this repo.
- `04-TODO.md` — live task list across phases.
- `05-SANITY.md` — CMS model + how the intern edits content.
