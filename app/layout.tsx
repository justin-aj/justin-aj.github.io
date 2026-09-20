import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { site } from '@/data/site';
import './globals.css';

// 700 is included so headings and <strong> get a real bold face
// rather than a synthesised one.
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

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

function Separator() {
  return <span aria-hidden="true">|</span>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Separator />
          <Link href="/blog/">Blog</Link>
          <Separator />
          <a href="https://github.com/justin-aj">GitHub</a>
          <Separator />
          <a href="https://www.linkedin.com/in/ajin-frank-j">LinkedIn</a>
          <Separator />
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
