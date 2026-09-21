import { Greeting } from '@/components/greeting';
import { site } from '@/data/site';
import { jobs } from '@/data/jobs';
import { testimonials } from '@/data/testimonials';

export default function Home() {
  return (
    <>
      <Greeting />

      <h1>Ajin Frank Justin</h1>

      <p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/me.jpeg" alt="Ajin Frank Justin" width="180" height="180" />
      </p>

  
      <p>
        I&apos;m in my last semester of Master of Science in Data Science at{' '}
        <a href="https://www.northeastern.edu/">Northeastern University, Boston</a>, and currently working as an AI Research Assistant at the{' '}
        <a href="https://damore-mckim.northeastern.edu/dash/">DASH AI Lab</a>.
      </p>
      <p>
        Reach out to me at <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>About</h2>
      <p>
        When I was in my 7th grade, I understood math is actually the most easiest subject because it uses numbers and it is the only language with logic/common sense.
      </p>
      <p>
        I did my undergrad at <a href="https://www.reva.edu.in/">REVA University</a>, Bangalore. I
        do have a story to why I did my undergrad at REVA.
      </p>
      <p>
        After my undergrad, I spent a year at <a href="https://dynapac.com/">Dynapac</a> in
        Bangalore, where I worked with the Dynapac Sweden team full time as a Software Engineer.
      </p>
      <p>
        Now, I am in the US, pursuing my Master of Science in Data Science at{' '}
        <a href="https://www.northeastern.edu/">Northeastern University</a>, Boston Campus.
      </p>
      <p>
        Stack I use a lot:{' '}
        {site.skills.map((skill, i) => (
          <span key={skill.name}>
            {i > 0 && ', '}
            <a href={skill.url}>{skill.name}</a>
          </span>
        ))}
        .
      </p>

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
      <p>
        Everything I build in my own time is on{' '}
        <a href="https://github.com/justin-aj">github.com/justin-aj</a>.
      </p>

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
