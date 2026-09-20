import { projects } from '@/data/projects';
import { Section } from '@/components/section';

export function Work() {
  return (
    <Section id="work" title="Work">
      <ul className="grid gap-px sm:grid-cols-2" style={{ background: 'var(--line)' }}>
        {projects.map(project => {
          const href = project.external || project.github;

          return (
            <li key={project.title} className="p-5" style={{ background: 'var(--bg)' }}>
              <h3 className="text-base font-medium">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4">
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
                {project.tech.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
