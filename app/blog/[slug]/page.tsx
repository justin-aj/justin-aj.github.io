import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts, formatDate } from '@/lib/posts';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post || post.draft) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/blog/" className="font-mono text-xs underline underline-offset-4">
        ← Blog
      </Link>

      <p className="mt-10 font-mono text-xs" style={{ color: 'var(--muted)' }}>
        {formatDate(post.date)}
      </p>
      <h1 className="mt-2 text-3xl leading-tight font-semibold tracking-tight">{post.title}</h1>

      <div
        className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-a:underline-offset-4"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
