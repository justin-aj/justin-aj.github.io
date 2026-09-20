# justin-aj.github.io

My personal site. Plain HTML with browser default layout - the only styling
is the Roboto webfont, self-hosted via `next/font`. Built with Next.js and
exported as static files to GitHub Pages.

https://justin-aj.github.io

## Running it

Needs Node 20.9 or newer.

```sh
npm install
npm run dev      # http://localhost:3000
```

```sh
npm run build      # writes out/
npm run lint
npm run typecheck
```

## Editing content

The page text lives in `app/page.tsx`. Everything else is data:

- `data/site.ts` - name, email, skills (the nav and social links are in
  `app/layout.tsx`)
- `data/jobs.ts` - jobs
- `data/projects.ts` - projects
- `data/testimonials.ts` - recommendations

Blog posts are markdown in `content/posts/`:

```yaml
---
title: Hello, world
date: '2026-09-20'
description: One line.
draft: false
---
```

Drafts do not get built.

## Writing posts

There is an editor at http://localhost:3000/studio when the dev server is
running. Type, hit Save, and it writes `content/posts/<slug>.md`. "Commit and
push" commits and pushes `content/posts`.

The studio only exists in development. Its page and route handlers are left out
of production builds by the `pageExtensions` setting in `next.config.ts`,
because a static export has no server to run route handlers on.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and pushes
`out/` to the `gh-pages` branch.

## Credit

Older versions of this site were built on
[bchiang7/v4](https://github.com/bchiang7/v4). This one is written from
scratch and shares no code with it.

## License

MIT
