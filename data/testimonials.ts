export type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  link: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Ekaagar Singh Hara',
    role: 'Data Scientist at AARP',
    company: 'AARP',
    content:
      'I had the pleasure of working with Ajin during his internship at AARP, and he quickly distinguished himself as someone who learns fast, thinks critically, and delivers reliably. He took ownership of a technically demanding analytics project. He approached it with maturity well beyond an intern level, breaking down ambiguous problems, validating results carefully, and communicating his progress with clarity and professionalism.',
    link: 'https://www.linkedin.com/in/ekaagar/',
  },
  {
    name: 'Sharon Xu',
    role: 'Senior Director of Data Science at AARP',
    company: 'AARP',
    content:
      'Ajin quickly learned the business and built a Databricks-based model tracking system to monitor campaign ML model accuracy month by month, with an automated pipeline and clear visualizations. He proactively partnered with stakeholders to expand the scope and move this work into production, significantly reducing manual effort. Ajin is hardworking, flexible, and thoughtful in his approach.',
    link: 'https://www.linkedin.com/in/sharonxu123456/',
  },
  {
    name: 'Taylor Sorgini',
    role: 'Team Leader Digitalization at Dynapac',
    company: 'Dynapac',
    content:
      'Ajin consistently demonstrated a strong work ethic, an unrelenting curiosity for learning, and a desire to tackle complex problems with innovative solutions. Almost immediately after joining the team, it was evident that Ajin possessed a natural talent for software development as well as strong communication skills. His proficiency in Python quickly became an asset to our projects.',
    link: 'https://www.linkedin.com/in/taylor-sorgini-531274144/',
  },
  {
    name: 'Petr Hutar',
    role: 'System Engineer at Dynapac',
    company: 'Dynapac',
    content:
      'I have had the pleasure to have Ajin on my team... I have seen an outstanding performance from a technical point of view, but from my perspective even more importantly a commitment to independently find, understand and deliver a solution.',
    link: 'https://www.linkedin.com/in/petr-hutar-20812649/',
  },
];
