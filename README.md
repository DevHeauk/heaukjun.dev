# heaukjun.dev

Personal site and writing. Next.js App Router + MDX, deployed on Vercel.
Pushing to `master` deploys.

## Writing a post

Korean is the source language. Write it first, then translate to English —
going the other way reads like a translation.

```
content/<slug>.ko.mdx    Korean original — carries `date`
content/<slug>.mdx       English translation — inherits the date
```

Frontmatter:

```yaml
---
title: "코인 잔액을 원장 위에 다시 세운 이야기"
date: "2026-07-27"     # Korean file only
summary: "선택"         # optional, used for meta description
---
```

A post with only a Korean file still publishes — it shows up at `/ko/writing`
and stays out of the English list until the translation exists. Prefix a
filename with `_` to keep it unpublished.

```
npm run check     # lists posts that exist in only one language
npm run dev       # http://localhost:3000
```

## Routes

```
/                     English home        /ko                     Korean home
/writing              English list        /ko/writing             Korean list
/writing/<slug>       English post        /ko/writing/<slug>      Korean post
```

The nav language link keeps you on the same page rather than sending you home.

## Where things live

| | |
|---|---|
| Intro copy | `app/page.tsx`, `app/ko/page.tsx` |
| Work history | `lib/work.ts` (`workKo` first, then `work`) |
| Post loading | `lib/posts.ts` |
| Styles | `app/globals.css` — 65ch, system fonts, `prefers-color-scheme` |

No web fonts, no client-side libraries, no analytics. Every page is static.

The previous todo app lives on the `legacy` branch.
