import type { Metadata } from 'next';
import { StudioEditor } from '@/components/studio-editor';

// Dev-only page: excluded from production builds via `pageExtensions`.
export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
          Studio — local only
        </p>
      </div>
      <StudioEditor />
    </>
  );
}
