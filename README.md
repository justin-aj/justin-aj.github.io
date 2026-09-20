# justin-aj.github.io

Personal site of Ajin Frank Justin. Black-and-white, minimal, statically exported.

Live at **https://justin-aj.github.io**

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4 |
| Editor | Tiptap 3 + `tiptap-markdown` (dev only) |
| Output | Static export (`out/`) deployed to GitHub Pages |

Requires Node 20.9+ (see `.nvmrc`).

## Local development

```sh
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```sh
npm run build      # static export into out/
npm run lint
npm run typecheck
```

## Content

Page content lives in plain TypeScript modules under `data/` — edit these directly:

- `data/site.ts` — name, role, email, nav, social links, skills
- `data/jobs.ts` — experience entries
- `data/projects.ts` — project cards
- `data/testimonials.ts` — recommendations

Blog posts are markdown files in `content/posts/`, with frontmatter:

```yaml
---
title: Hello, world
date: '2026-09-20'
description: One-line summary.
draft: false
---
```

Posts with `draft: true` are excluded from the build.

## Writing with the studio

The studio is a rich-text (word-processor style) editor for blog posts. It is
**development only** — the page and its route handlers are excluded from
production builds via `pageExtensions` in `next.config.ts`, because a static
export cannot serve route handlers. Nothing is exposed on the deployed site.

```sh
npm run dev
open http://localhost:3000/studio
```

1. Type a title, then the body. Formatting buttons cover headings, bold,
   italic, lists, quotes, code blocks, and dividers.
2. **Save** writes `content/posts/<slug>.md`. Uncheck *draft* to make it
   publishable.
3. **Commit & push** commits `content/posts` and pushes the current branch.

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `out/` to the `gh-pages` branch.

## Deployment

GitHub Actions on every push to `main`: `npm ci` → `npm run build` → publish
`out/` to `gh-pages` via `peaceiris/actions-gh-pages`.

## Credit

Versions 1–4 of this site were based on
[bchiang7/v4](https://github.com/bchiang7/v4) by Brittany Chiang. This version
is a ground-up rewrite and no longer shares code with it.

## License

MIT

> Only pushes from `main` trigger a deploy; the studio says so after pushing
> from any other branch.
