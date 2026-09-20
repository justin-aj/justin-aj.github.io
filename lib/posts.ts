import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  draft: boolean;
};

export type Post = PostMeta & { html: string };

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function readDir(): string[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  return fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
}

function parse(file: string) {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    date: typeof data.date === 'string' ? data.date : '',
    description: typeof data.description === 'string' ? data.description : '',
    draft: data.draft === true,
    body: content,
  };
}

/** Published posts, newest first. Drafts are excluded from the built site. */
export function getPosts(): PostMeta[] {
  return readDir()
    .map(parse)
    .filter(post => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ slug, title, date, description, draft }) => ({
      slug,
      title,
      date,
      description,
      draft,
    }));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!readDir().includes(file)) {
    return null;
  }

  const { body, ...meta } = parse(file);
  return { ...meta, html: marked.parse(body, { async: false }) };
}

export function formatDate(date: string): string {
  if (!date) {
    return '';
  }
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
