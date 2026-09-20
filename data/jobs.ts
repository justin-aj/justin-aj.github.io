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
    company: 'DASH AI Hub',
    title: 'Full-Stack AI Research Assistant',
    location: 'Boston, MA',
    range: 'January 2026 - Present',
    url: 'https://damore-mckim.northeastern.edu/dash/',
    summary:
      'I build the backend for an AI essay grading platform: a TypeScript and Node.js service alongside a Python service for the model work, a retrieval pipeline on LlamaIndex and Qdrant, and multi-agent evaluation with LangGraph. Much of the work is throughput. Request queueing on RabbitMQ and Redis, worker pools, and the Docker and nginx deployment underneath.',
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
    company: 'Northeastern University',
    title: 'AI Research Assistant',
    location: 'Boston, MA',
    range: 'January 2025 - April 2025',
    url: 'https://www.northeastern.edu/',
    summary:
      'Financial NLP. I built the Airflow pipeline that parses and structures filings for downstream models, then moved onto classification, benchmarking Gemini, Claude and GPT-4 against a fine-tuned RoBERTa on a ten-class problem.',
  },
  {
    company: 'Dynapac (Fayat Group)',
    title: 'Data Engineer / Software Engineer',
    location: 'Bangalore, India',
    range: 'June 2023 - June 2024',
    url: 'https://dynapac.com/',
    summary:
      "Dyn@Lyzer, Dynapac's telemetry product. I rebuilt the PostgreSQL schema behind it into a partitioned, normalized design, and wrote the ETL that ingests several hundred million telemetry records from over a thousand nodes on Azure Durable Functions. I also did the ARIMA forecasting on fuel efficiency data and the Tableau and Power BI dashboards on top.",
  },
];
