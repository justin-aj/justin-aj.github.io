import Image from 'next/image';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
            {site.role}
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg" style={{ color: 'var(--muted)' }}>
            {site.title} Currently an MS Data Science student at{' '}
            <a
              href="https://www.northeastern.edu/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
              style={{ color: 'var(--fg)' }}>
              Northeastern University
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="border px-4 py-2 text-sm hover:opacity-60"
              style={{ borderColor: 'var(--fg)' }}>
              Get in touch
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="border px-4 py-2 text-sm hover:opacity-60"
              style={{ borderColor: 'var(--line)' }}>
              Résumé
            </a>
          </div>
        </div>

        <Image
          src="/me.jpeg"
          alt={site.name}
          width={128}
          height={128}
          priority
          className="h-28 w-28 shrink-0 rounded-full object-cover grayscale sm:h-32 sm:w-32"
        />
      </div>
    </section>
  );
}
