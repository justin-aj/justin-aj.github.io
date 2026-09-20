import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s - ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: ['/og.png'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> | <Link href="/blog/">Blog</Link> |{' '}
          <a href="https://github.com/justin-aj">GitHub</a> |{' '}
          <a href="https://www.linkedin.com/in/ajin-frank-j">LinkedIn</a> |{' '}
          <a href="/resume.pdf">Resume</a>
        </nav>
        <hr />
        {children}
        <hr />
        <footer>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
