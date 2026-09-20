import { site } from '@/data/site';
import { Section } from '@/components/section';

export function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
        <p>
          Hello. I&apos;m Ajin. I build software, AI-powered systems and data solutions. Solving
          math problems (especially calculus) is what pulled me into software engineering, machine
          learning and data science.
        </p>
        <p>
          I&apos;ve worked at <Ext href="https://www.aarp.org/">AARP</Ext> as a Machine
          Learning Co-op, <Ext href="https://www.northeastern.edu/">Northeastern University</Ext>{' '}
          as an AI Research Assistant, and <Ext href="https://dynapac.com/">Dynapac (Fayat Group)</Ext>{' '}
          as a Data Engineer. These days I build scalable AI systems at{' '}
          <Ext href="https://damore-mckim.northeastern.edu/dash/">DASH AI Hub, Northeastern</Ext>.
        </p>
        <p>
          Currently working on <Ext href="https://github.com/justin-aj">several projects</Ext>{' '}
          including EssayBot, an AI-powered grading platform.
        </p>
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
        {site.skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </Section>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-4"
      style={{ color: 'var(--fg)' }}>
      {children}
    </a>
  );
}
