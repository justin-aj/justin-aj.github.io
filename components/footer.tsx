import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--line)' }}>
      <div
        className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-10 font-mono text-xs sm:flex-row sm:items-center sm:justify-between"
        style={{ color: 'var(--muted)' }}>
        <p>© {new Date().getFullYear()} {site.name}</p>
        <div className="flex gap-4">
          {site.social.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline underline-offset-4">
              {link.name}
            </a>
          ))}
          <a href={site.resume} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">
            Résumé
          </a>
        </div>
      </div>
    </footer>
  );
}
