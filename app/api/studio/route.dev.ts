import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

// Dev-only: this file is excluded from production builds via `pageExtensions`
// in next.config.ts, because a static export cannot serve route handlers.

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

/** Reject anything that is not a plain lowercase slug, so no path traversal. */
function safeSlug(slug: string): string | null {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null;
}

function fileFor(slug: string) {
  return path.join(POSTS_DIR, `${slug}.md`);
}

async function listFiles() {
  await fs.mkdir(POSTS_DIR, { recursive: true });
  const entries = await fs.readdir(POSTS_DIR);
  return entries.filter(entry => entry.endsWith('.md'));
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get('slug');

  if (!slug) {
    const files = await listFiles();
    const posts = await Promise.all(
      files.map(async file => {
        const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf8');
        const { data } = matter(raw);
        return {
          slug: file.replace(/\.md$/, ''),
          title: String(data.title ?? ''),
          date: String(data.date ?? ''),
          draft: data.draft === true,
        };
      }),
    );
    posts.sort((a, b) => b.date.localeCompare(a.date));
    return NextResponse.json({ posts });
  }

  const safe = safeSlug(slug);
  if (!safe) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    const raw = await fs.readFile(fileFor(safe), 'utf8');
    const { data, content } = matter(raw);
    return NextResponse.json({
      slug: safe,
      title: String(data.title ?? ''),
      date: String(data.date ?? ''),
      description: String(data.description ?? ''),
      draft: data.draft === true,
      markdown: content.trimStart(),
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const safe = safeSlug(String(body.slug ?? ''));

  if (!safe) {
    return NextResponse.json(
      { error: 'Slug must be lowercase words separated by hyphens' },
      { status: 400 },
    );
  }

  const file = matter.stringify(`\n${String(body.markdown ?? '').trim()}\n`, {
    title: String(body.title ?? 'Untitled'),
    date: String(body.date ?? new Date().toISOString().slice(0, 10)),
    description: String(body.description ?? ''),
    draft: body.draft !== false,
  });

  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.writeFile(fileFor(safe), file, 'utf8');

  return NextResponse.json({ ok: true, slug: safe });
}

export async function DELETE(request: Request) {
  const safe = safeSlug(new URL(request.url).searchParams.get('slug') ?? '');

  if (!safe) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  await fs.rm(fileFor(safe), { force: true });
  return NextResponse.json({ ok: true });
}
