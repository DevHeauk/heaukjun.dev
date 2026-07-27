# heaukjun.com

Personal site and writing. Next.js App Router + MDX, deployed on Vercel.
Pushing to `master` deploys.

## Writing

Korean is the source language. Write it first, then translate to English —
going the other way reads like a translation.

```
content/writing/<slug>.ko.mdx    Korean original — carries `date`
content/writing/<slug>.mdx       English translation — inherits the date
content/notes/<slug>.ko.mdx      same rules for concept write-ups
```

Frontmatter:

```yaml
---
title: "코인 잔액이 자꾸 틀어졌다"
date: "2026-07-27"     # Korean file only
summary: "선택"         # optional, used for meta description
---
```

An entry with only a Korean file still publishes — it appears under `/ko/…` and
stays out of the English list until the translation exists. Prefix a filename
with `_` to keep it unpublished.

```
npm run check     # lists entries that exist in only one language
npm run dev       # http://localhost:3000
```

**writing** is for things that happened at work. **notes** is for concepts the
posts keep referring back to, so a post can link out instead of explaining a
whole subject inline.

Dates are stored and used for ordering, but not rendered.

## What a post can use

- **Diagrams** — SVG components in `components/mdx.tsx`, called as `<TwoTruths />`.
  Labels switch language automatically, so they aren't baked images.
- **Tables** — plain markdown tables (remark-gfm).
- **Code** — highlighted at build time (rehype-highlight). No client-side JS.
- **Table of contents** — generated from `##`/`###`, shown at ≥1280px when a
  page has three or more headings.

Only chart data that exists. Inventing numbers to fill a graph costs more
credibility than the graph is worth.

## Routes

```
/                     English home        /ko                     Korean home
/writing              /notes              /ko/writing             /ko/notes
/writing/<slug>       /notes/<slug>       /ko/writing/<slug>      /ko/notes/<slug>
```

The nav language link keeps you on the same page rather than sending you home.
`www` redirects to the apex via a host rule in `next.config.ts`.

## Where things live

| | |
|---|---|
| Intro copy | `app/page.tsx`, `app/ko/page.tsx` |
| Work history | `lib/work.ts` (`workKo` first, then `work`) |
| Section titles | `lib/sections.ts` |
| Content loading | `lib/posts.ts` |
| Diagrams | `components/mdx.tsx` |
| Table of contents | `components/toc.tsx` |
| Styles | `app/globals.css` — 65ch, system fonts, `prefers-color-scheme` |

No web fonts, no analytics, no client-side libraries beyond the small
scroll-tracking in the table of contents. Every page is static.

The previous todo app lives on the `legacy` branch.
