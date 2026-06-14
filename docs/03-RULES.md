# Engineering & Design Rules — PROJE 01

> Non-negotiable rules for this repo. Applies to every agent and PR.

## Content & language
1. All UI copy is **Turkish**. Use the **exact** strings from `02-CONTENT-MAP.md`.
   Never translate, paraphrase, or invent marketing copy.
2. `lang="tr"` on `<html>`. Use proper Turkish characters (İ, ı, ş, ğ, ç, ö, ü).

## CMS (Sanity)
3. **Everything an intern might change must be CMS-editable** — text, images,
   stats, nav labels, services, testimonials, SEO fields. No hardcoded marketing
   copy in components once a field exists in Sanity.
4. Studio lives at `/studio`. Keep schemas friendly: clear titles, descriptions,
   and previews so a non-coder understands each field.
5. Provide sensible fallbacks so the site renders even if a field is empty.

## Design
6. **Redesign = PRESERVE.** Match the existing layout, spacing rhythm, and warm
   editorial feel. Brand tokens in `01-BRAND.md` are law.
7. Single accent `#B55329`. One radius scale. One theme (light, warm). Lock them.
8. Use the relevant design skill (`design-taste-frontend` / `stitch-design-taste`)
   whenever designing a new section/page.
9. Premium = generous whitespace (DENSITY 3), controlled type scale, real images.
10. No AI tells: no em-dashes (—) in UI text, no fake screenshots, no neon glow,
    no 3 equal generic cards without rhythm, no scroll cues, no decorative dots.

## Responsiveness
11. **Responsive from day 0.** Every section declares its mobile (<768px) collapse.
12. `min-h-[100dvh]` not `h-screen`. CSS Grid over flex math. `max-w-[1400px]`.

## Animation (Motion)
13. Use `motion/react`. MOTION dial = 5: gentle fades/rises on scroll, slow hero
    reveals. Spring easing. Isolate motion in `"use client"` leaf components.
14. Honor `prefers-reduced-motion` (`useReducedMotion`). No `window` scroll
    listeners — use `useScroll` / `whileInView` / IntersectionObserver.

## Icons & deps
15. Icons: `@phosphor-icons/react` only. No hand-rolled SVG icon paths.
16. Check `package.json` before importing any new dependency.

## Forms
17. Forms are **visual-only placeholders for now.** Render fields + button, but do
    NOT wire submission. Leave a clear `// TODO: wire form` and a note in 04-TODO.

## Images
18. For now use live `https://proje01.com/wp-content/uploads/...` URLs via
    `next/image` (allowlisted in `next.config.ts`). Migrate to Sanity later.
19. Always set descriptive `alt` (Turkish), width/height or `fill` + `sizes`.

## SEO
20. Per-route `metadata` (title, description, canonical, OG, Twitter). Turkish.
21. `app/sitemap.ts` + `app/robots.ts`. JSON-LD: `LocalBusiness` /
    `Organization` on the homepage (İzmir address, Egekale Group).
22. Semantic headings (one `<h1>` per page), good contrast (WCAG AA).

## Code quality
23. TypeScript strict. Components small and composable under `src/components`.
24. Run `npm run lint` and `npm run build` before declaring a page done.
25. Keep these `/docs` files updated as the source of truth.
