import { jobs } from '@/data/jobs';
import { Section } from '@/components/section';

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-12">
        {jobs.map(job => (
          <li key={`${job.company}-${job.range}`}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-medium">
                {job.title} ·{' '}
                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4">
                  {job.company}
                </a>
              </h3>
              <p className="font-mono text-xs whitespace-nowrap" style={{ color: 'var(--muted)' }}>
                {job.range}
              </p>
            </div>
            <p className="mt-1 font-mono text-xs" style={{ color: 'var(--muted)' }}>
              {job.location}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {job.points.map(point => (
                <li key={point} className="pl-5 -indent-5 before:mr-3 before:content-['—']">
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
