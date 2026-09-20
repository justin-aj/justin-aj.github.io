import { site } from '@/data/site';
import { jobs } from '@/data/jobs';
import { projects } from '@/data/projects';
import { testimonials } from '@/data/testimonials';

export default function Home() {
  return (
    <>
      <h1>Ajin Frank Justin</h1>

      <p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/me.jpeg" alt="Ajin Frank Justin" width="180" height="180" />
      </p>

      <p>
        I write software. Mostly data pipelines, machine learning models, and the backend plumbing
        that keeps them running.
      </p>
      <p>
        I&apos;m doing an MS in Data Science at{' '}
        <a href="https://www.northeastern.edu/">Northeastern</a>, and I build AI systems at the{' '}
        <a href="https://damore-mckim.northeastern.edu/dash/">DASH AI Lab</a>.
      </p>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>About</h2>
      <p>
        I got into this through math. Calculus, mostly. That turned into programming, then machine
        learning, and here we are.
      </p>
      <p>
        Before Northeastern I spent a year at <a href="https://dynapac.com/">Dynapac</a> in
        Bangalore, on the telemetry database and ETL behind Dyn@Lyzer. Since then:{' '}
        <a href="https://www.aarp.org/">AARP</a>, where I worked on offer targeting and model
        monitoring, and a research assistant stint at Northeastern on financial NLP.
      </p>
      <p>
        Right now I&apos;m building EssayBot, an essay grading tool. Most of my side projects are
        on <a href="https://github.com/justin-aj">GitHub</a>.
      </p>
      <p>Things I use a lot: {site.skills.join(', ')}.</p>

      <h2>Work</h2>
      {jobs.map(job => (
        <div key={`${job.company}-${job.range}`}>
          <h3>
            {job.title}, <a href={job.url}>{job.company}</a>
          </h3>
          <p>
            <small>
              {job.range} &middot; {job.location}
            </small>
          </p>
          <p>{job.summary}</p>
        </div>
      ))}

      <h2>Projects</h2>
      <ul className="projects">
        {projects.map(project => {
          const href = project.external || project.github;

          return (
            <li key={project.title}>
              <h3>{href ? <a href={href}>{project.title}</a> : project.title}</h3>
              <p>{project.description}</p>
              <p>
                <small>{project.tech.join(', ')}</small>
              </p>
            </li>
          );
        })}
      </ul>

      <h2>What people say</h2>
      {testimonials.map(item => (
        <blockquote key={item.name}>
          <p>{item.content}</p>
          <p>
            <a href={item.link}>{item.name}</a>, {item.role}
          </p>
        </blockquote>
      ))}

      <h2>Get in touch</h2>
      <p>
        Email is best: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
