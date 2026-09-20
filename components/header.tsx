'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}>
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-mono text-sm tracking-tight hover:opacity-60">
          {site.name.toLowerCase()}
        </Link>

        <nav className="hidden gap-6 text-sm sm:flex">
          {site.nav.map(item => (
            <Link key={item.href} href={`/${item.href}`} className="hover:opacity-60">
              {item.name}
            </Link>
          ))}
          <Link href="/blog/" className="hover:opacity-60">
            Blog
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(v => !v)}
          className="text-sm underline underline-offset-4 sm:hidden">
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t px-6 py-4 sm:hidden"
          style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}>
          <ul className="flex flex-col gap-4 text-sm">
            {site.nav.map(item => (
              <li key={item.href}>
                <Link href={`/${item.href}`} onClick={() => setOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog/" onClick={() => setOpen(false)}>
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
