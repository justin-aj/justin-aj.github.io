export type Job = {
  company: string;
  title: string;
  location: string;
  range: string;
  url: string;
  summary: string;
};

// Ordered most recent first.
export const jobs: Job[] = [
  {
    company: 'DASH AI Lab, Northeastern University',
    title: 'AI Research Assistant',
    location: 'Boston, MA',
    range: 'January 2025 - Present',
    url: 'https://damore-mckim.northeastern.edu/dash/',
    summary:
      'I work on multiple products at DASH, which include DASH API and AVA. DASH API is a platform that uses SLURM and Open OnDemand to run AI models and workloads on 4x Blackwell GPUs. AVA is a stealth AI product currently being used by real users.',
  },
  {
    company: 'AARP',
    title: 'Machine Learning Co-op',
    location: 'Washington DC, USA',
    range: 'June 2025 - December 2025',
    url: 'https://www.aarp.org/',
    summary:
      'I worked on the model that targets premium digital offers to members, a gradient boosting model over roughly three thousand features built from membership history, demographics and engagement. The other half of the role was a monitoring framework in Databricks that tracks AUC, KS and lift for the 25 or so models AARP runs in production.',
  },
  {
    company: 'Dynapac (Fayat Group)',
    title: 'Data Engineer / Software Engineer',
    location: 'Bangalore, India',
    range: 'June 2023 - June 2024',
    url: 'https://dynapac.com/',
    summary:
      "Dyn@Lyzer, Dynapac's telemetry product, working with the team in Sweden. I rebuilt the PostgreSQL schema behind it into a partitioned, normalized design, and wrote the ETL that ingests several hundred million telemetry records from over a thousand nodes on Azure Durable Functions. I also did the ARIMA forecasting on fuel efficiency data and the Tableau and Power BI dashboards on top.",
  },
];
