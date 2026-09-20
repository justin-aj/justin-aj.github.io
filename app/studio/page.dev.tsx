import type { Metadata } from 'next';
import { StudioEditor } from '@/components/studio-editor';

// Dev-only page: excluded from production builds via `pageExtensions`.
export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioEditor />;
}
