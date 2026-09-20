import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts, formatDate } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on software, machine learning and data.',
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <h1>Blog</h1>

      {posts.length === 0 ? (
        <p>Nothing here yet.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
              {post.date && <small> &middot; {formatDate(post.date)}</small>}
              {post.description && <p>{post.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
