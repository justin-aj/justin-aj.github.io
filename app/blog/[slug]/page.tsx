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
    <article>
      <h1>{post.title}</h1>
      <p>
        <small>{formatDate(post.date)}</small>
      </p>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <p>
        <Link href="/blog/">Back to the blog</Link>
      </p>
    </article>
  );
}
