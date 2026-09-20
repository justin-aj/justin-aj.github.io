import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-6 py-32">
      <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Page not found</h1>
      <Link href="/" className="mt-8 border px-4 py-2 text-sm hover:opacity-60" style={{ borderColor: 'var(--fg)' }}>
        Go home
      </Link>
    </div>
  );
}
