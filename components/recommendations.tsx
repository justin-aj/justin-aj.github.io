import { testimonials } from '@/data/testimonials';
import { Section } from '@/components/section';

export function Recommendations() {
  return (
    <Section id="recommendations" title="Recommendations">
      <ul className="space-y-10">
        {testimonials.map(item => (
          <li key={item.name}>
            <blockquote
              className="border-l pl-5 text-sm leading-relaxed"
              style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
              {item.content}
            </blockquote>
            <p className="mt-3 pl-5 text-sm">
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4">
                {item.name}
              </a>
              <span style={{ color: 'var(--muted)' }}> — {item.role}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
