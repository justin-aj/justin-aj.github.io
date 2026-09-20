export type Job = {
  company: string;
  title: string;
  location: string;
  range: string;
  url: string;
  points: string[];
};

// Ordered most recent first.
export const jobs: Job[] = [
  {
    company: 'DASH AI Hub',
    title: 'Full-Stack AI Research Assistant',
    location: 'Boston, MA',
    range: 'January 2026 — Present',
    url: 'https://damore-mckim.northeastern.edu/dash/',
    points: [
      'Architected scalable microservices platform handling 100+ concurrent users with 300-600x performance improvement (30-60s → <100ms API response) using RabbitMQ, Redis, and worker pools',
      'Developed hybrid TypeScript/Node.js backend with Python Flask microservice for AI/ML processing, implementing JWT authentication, AWS S3 integration, and WebSocket-based real-time updates',
      'Engineered intelligent RAG system using LlamaIndex and Qdrant vector database with 1024-dimensional BGE embeddings for semantic document retrieval',
      'Built multi-agent LLM orchestration system with LangGraph for parallel essay evaluation, reducing grading time from 10s to 3s per essay',
      'Deployed production infrastructure using Docker, PM2 (4 API instances, 6 workers), nginx reverse proxy, and horizontal scaling',
    ],
  },
  {
    company: 'AARP',
    title: 'Machine Learning Co-op',
    location: 'Washington DC, USA',
    range: 'June 2025 — December 2025',
    url: 'https://www.aarp.org/',
    points: [
      'Developed gradient boosting model to personalize premium digital offers, boosting auto-renewal conversions by 7% through targeted customer scoring',
      'Built ML model performance monitoring framework in Databricks using PySpark and SQL, tracking AUC, KS, and lift across 25+ production models',
      'Engineered a rich feature set (~3000 features) spanning membership history, demographics, and engagement patterns',
      'Applied advanced feature selection techniques (recursive feature elimination, mutual information, regularization) to reduce dimensionality',
      'Achieved measurable business impact with conversion lift (+18%) and retention uplift (+12%)',
    ],
  },
  {
    company: 'Northeastern University',
    title: 'AI Research Assistant',
    location: 'Boston, MA',
    range: 'January 2025 — April 2025',
    url: 'https://www.northeastern.edu/',
    points: [
      'Built NLP ETL pipeline (Airflow, RegEx, NLTK, spaCy) to preprocess 2000+ financial filings for ML workflows',
      'Created robust PDF/TXT parser (PyMuPDF, RegEx) to extract entities and structure financial text for compliance tracking',
      'Benchmarked LLMs (Gemini, Claude, GPT-4) on 10-class financial classification, achieving 0.86+ F1-scores',
      'Fine-tuned RoBERTa model on custom financial dataset, achieving 70% reduction in GPU memory utilization',
      'Integrated LLaMA 3.3 70B for multi-class classification, enhancing semantic parsing by 200%',
    ],
  },
  {
    company: 'Dynapac (Fayat Group)',
    title: 'Data Engineer / Software Engineer',
    location: 'Bangalore, India',
    range: 'June 2023 — June 2024',
    url: 'https://dynapac.com/',
    points: [
      "Restructured Dyn@Lyzer's multi-join PostgreSQL telemetry GIS database into a partitioned, normalized schema with 200% read query improvement",
      'Designed ETL orchestrator to process 300M+ telemetry records from 1000+ nodes using Azure Durable Functions',
      'Conducted ARIMA-based time series forecasting on fuel efficiency data, improving operational ROI by 20%',
      'Built interactive Tableau & Power BI dashboards to visualize GIS patterns and operational KPIs',
      'Automated microservices deployment with Bitbucket Pipelines, Django REST, and FastAPI for scalable REST APIs',
    ],
  },
];
