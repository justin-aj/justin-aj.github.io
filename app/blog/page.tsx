import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts, formatDate } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing on software engineering, machine learning and data.',
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm" style={{ color: 'var(--muted)' }}>
          Nothing published yet.
        </p>
      ) : (
        <ul className="mt-10 divide-y" style={{ borderColor: 'var(--line)' }}>
          {posts.map(post => (
            <li key={post.slug} className="py-6 first:pt-0">
              <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                {formatDate(post.date)}
              </p>
              <h2 className="mt-1 text-lg font-medium">
                <Link href={`/blog/${post.slug}/`} className="underline underline-offset-4">
                  {post.title}
                </Link>
              </h2>
              {post.description && (
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {post.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
