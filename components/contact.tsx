import { site } from '@/data/site';
import { Section } from '@/components/section';

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-xl text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
        My inbox is open. Whether you have a question, a role, or just want to say hello, I&apos;ll
        get back to you.
      </p>
      <a
        href={`mailto:${site.email}`}
        className="mt-6 inline-block border px-4 py-2 text-sm hover:opacity-60"
        style={{ borderColor: 'var(--fg)' }}>
        {site.email}
      </a>
    </Section>
  );
}
