import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { getPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().map(post => ({
    url: `${site.url}/blog/${post.slug}/`,
    lastModified: post.date || undefined,
  }));

  return [{ url: `${site.url}/` }, { url: `${site.url}/blog/` }, ...posts];
}
