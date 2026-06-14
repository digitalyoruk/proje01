# Brand & Design System — PROJE 01

> Extracted from the live WordPress site (redesign-PRESERVE mode).
> These tokens are the brand. Do not "improve" them away.

## Positioning

Luxury, warm, editorial, calm. Architecture + interior design + turnkey
renovation + custom furniture. Premium but approachable. Aegean / İzmir.

Vibe read: *Premium-consumer / editorial architecture studio, warm-minimalist
language, leaning toward Tailwind + shadcn + restrained Motion.*

Dials: **VARIANCE 7 · MOTION 5 · DENSITY 3** (airy, premium, gentle motion).

## Color tokens (from the live theme)

| Token            | Hex       | Use                                        |
| ---------------- | --------- | ------------------------------------------ |
| `bg`             | `#FFFFFF` | Primary background                         |
| `bg-warm`        | `#F6F5F0` | Section background (warm paper)            |
| `border`         | `#E5E7DE` | Hairlines, card borders                    |
| `ink`            | `#121414` | Primary text / dark sections              |
| `ink-deep`       | `#0A0A0A` | Deepest dark section bg                     |
| `meta`           | `#ACAFB2` | Secondary / muted text                     |
| `clay` (accent)  | `#B55329` | Brand accent — CTAs, links, active states  |
| `clay-hover`     | `#9F4017` | Accent hover                               |

- **Single accent = `#B55329` (terracotta/clay).** Locked across the whole site.
  This warm clay is the EXISTING BRAND, so it overrides the usual "no warm-craft
  palette" default. Use it consistently; do not introduce a second accent.
- Never pure black `#000000`; use `#121414` / `#0A0A0A`.

## Typography

- **Display / headings:** `Inter Tight` (the brand display face). Tight tracking
  (`tracking-tight`), `leading-[1.05]`, weight 500–600. Large but controlled.
- **Body:** `Inter`, `leading-relaxed`, muted color, max ~65ch.
- **Eyebrows:** small uppercase, wide tracking, `#ACAFB2` or clay. Use sparingly
  (max ~1 per 3 sections per design rules).
- Loaded via `next/font/google` (self-hosted, `display: swap`).

> Note: Inter is normally discouraged, but it is the established brand type here
> (`--wp--preset--font-family--h-1-font: "Inter Tight"`). Brand fidelity wins.

## Logo & brand assets (live public URLs)

- Wordmark (header, light contexts): `https://proje01.com/wp-content/uploads/2026/05/Adsiz-tasarim.png`
- Black logo: `https://proje01.com/wp-content/uploads/2026/05/Proje-01-Siyah-Logo.png`
- Favicon 32: `https://proje01.com/wp-content/uploads/2026/05/cropped-PROJE01-LOGO-CALISMLARI-scaled-1-32x32.png`
- Favicon 192: `.../cropped-PROJE01-LOGO-CALISMLARI-scaled-1-192x192.png`
- Apple touch 180: `.../cropped-PROJE01-LOGO-CALISMLARI-scaled-1-180x180.png`

In the live header the wordmark renders simply as **"proje01"** (lowercase).

## Shape & elevation

- Corner radius: soft, restrained. Cards/images ~ `rounded-lg` to `rounded-xl`.
  Buttons: subtle radius or pill for the round arrow CTAs. Pick one scale, lock it.
- Shadows: minimal, tinted warm. Prefer hairline borders + negative space over
  drop shadows. Round "→" icon buttons for service rows / sliders.

## Motion language (MOTION 5)

- Gentle entrance fades + small `y` rises on scroll (`whileInView`, once).
- Slow image reveals / parallax-lite on hero. Spring, not linear.
- Honor `prefers-reduced-motion` everywhere.
- Marquee allowed max once (e.g. the client-logo strip). No motion-for-show.

## Imagery

- Warm interiors: beige/cream textiles, terracotta walls, oak wood, stone, clay
  objects. High-end, editorial, lots of negative space.
- For now: use live `https://proje01.com/wp-content/uploads/...` URLs (allowed in
  `next.config` remotePatterns). Later migrate into Sanity / repo.
- Hero image: `https://proje01.com/wp-content/uploads/2025/12/custom-img-50.jpg`
