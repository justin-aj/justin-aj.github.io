export type Project = {
  title: string;
  date: string;
  github?: string;
  external?: string;
  tech: string[];
  description: string;
};

// Ordered most recent first.
export const projects: Project[] = [
  {
    title: 'EssayBot — AI-Powered Essay Grading Platform',
    date: '2026-01-01',
    github: 'https://github.com/justin-aj',
    tech: ['TypeScript', 'Node.js', 'LlamaIndex', 'LangGraph', 'RabbitMQ', 'MongoDB'],
    description:
      'Architected scalable microservices platform with 300-600x performance improvement. Features RAG with Qdrant vector database, multi-agent LLM orchestration with LangGraph, and real-time WebSocket updates handling 100+ concurrent users.',
  },
  {
    title: 'TTAR Predictive Model',
    date: '2025-12-01',
    tech: ['Python', 'PySpark', 'MLLib', 'Databricks', 'SQL'],
    description:
      'Transition-to-Auto-Renew model for AARP to personalize premium digital offers. Built scalable feature pipeline with 3,000+ signals, achieved 5-8% improvement in F1 and AUC-ROC using Gradient Boosting.',
  },
  {
    title: 'ML Model Performance Monitoring System',
    date: '2025-08-01',
    tech: ['Databricks', 'PySpark', 'SQL', 'Statistical Analysis'],
    description:
      'Built Databricks monitoring framework for 25 ML models with statistical threshold alerts. Developed automated pipeline to process 3B+ scored records for real-time performance and drift analysis, increasing campaign conversion rate by 15%.',
  },
  {
    title: 'ELT Pipeline for TCGA DNA Methylation',
    date: '2025-06-04',
    github: 'https://github.com/justin-aj/ELTBigQuery',
    tech: ['Apache Airflow', 'BigQuery', 'dbt', 'DVC', 'GCS'],
    description:
      'Full ELT workflow extracting DNA methylation and clinical datasets from GDC Data Portal into Google BigQuery. Automated with Airflow DAGs and dbt for modular SQL transformations.',
  },
  {
    title: 'Product Usage Time Series Forecasting',
    date: '2025-06-03',
    github: 'https://github.com/justin-aj/ProductUsage-TimeSeriesForecasting',
    tech: ['Python', 'ARIMA', 'XGBoost', 'Random Forest'],
    description:
      'Modular time series forecasting pipeline predicting weekly product usage across multiple SKUs using ARIMA, Linear Regression, Random Forest, and XGBoost with engineered temporal features.',
  },
  {
    title: 'PR Summarizer',
    date: '2025-06-02',
    github: 'https://github.com/justin-aj/PRSummarizer',
    tech: ['Python', 'GCP', 'Gmail API', 'Pub/Sub', 'Gemini AI'],
    description:
      'Cloud-native event-driven pipeline to identify, extract, and summarize press releases from Gmail in real-time using GCP Pub/Sub and Gemini AI for classification and summarization.',
  },
  {
    title: 'Cold Email / Job Application Automation',
    date: '2025-06-01',
    github: 'https://github.com/justin-aj/ces-automation',
    tech: ['Python', 'Dagster', 'Gemini AI', 'Gmail API', 'Web Scraping'],
    description:
      'Dagster-orchestrated ETL pipeline automating job applications: job scraping with Crawl4AI, AI-driven email generation with Gemini, and Gmail draft creation with OAuth2.',
  },
  {
    title: 'AskNEU — RAG System',
    date: '2025-04-01',
    github: 'https://github.com/justin-aj/AskNEU',
    tech: ['LangChain', 'LangGraph', 'Pinecone', 'GCP', 'Cohere', 'Docker'],
    description:
      'Retrieval-Augmented Generation system with Cohere reranking using GPT-4.1 and Gemini APIs. Scraped 50,000+ NEU web pages via Selenium, scaled with Docker, Kubernetes, and Terraform.',
  },
  {
    title: 'Amazon Product Sales Analysis',
    date: '2025-01-02',
    tech: ['pandas', 'NumPy', 'Tableau', 'ARIMA', 'Prophet'],
    description:
      'Preprocessed 2M+ rows for KPI tracking and visualization. Forecasted sales with ARIMA & Prophet (22% accuracy improvement), implemented customer segmentation boosting campaign response by 20%.',
  },
  {
    title: 'AI Banking Assistant',
    date: '2025-01-01',
    github: 'https://github.com/justin-aj/AIBankingAssistant',
    tech: ['Transformers', 'PEFT', 'Hugging Face', 'PyTorch', 'QLoRA'],
    description:
      'QA and conditional text generation with 25,000+ QA pairs. Fine-tuned T5-small, GPT2-small, DistilBERT via QLoRA (4-bit quantization). Achieved BLEU 0.25, ROUGE-1 F1 0.54 on NVIDIA V100 GPU.',
  },
  {
    title: 'Deep Learning on Knee MRI Scans',
    date: '2024-12-04',
    github: 'https://github.com/justin-aj/MRNet-Deep-Learning-Chirag',
    tech: ['PyTorch', 'ResNet', 'EfficientNet', '3D CNN'],
    description:
      'Leveraged 3D CNN, ResNet 50, and Transfer Learning on EfficientNet to classify knee MRI scans. Data augmentation on 1,370 MRI exams achieved 82.5% validation accuracy.',
  },
  {
    title: 'Food Categorization using Machine Learning',
    date: '2024-12-03',
    github: 'https://github.com/justin-aj/USDA-Branded-Foods',
    tech: ['sklearn', 'Random Forest', 'TF-IDF', 'PCA'],
    description:
      'Classified USDA food products into 70+ categories with 91.98% accuracy and 91.87% F1-score on 1.7M entries. Optimized with TF-IDF vectorization, PCA, and A/B testing.',
  },
  {
    title: 'Kambaz — Learning Management System',
    date: '2024-12-02',
    tech: ['Next.js', 'TypeScript', 'Express.js', 'RESTful APIs', 'Vercel'],
    description:
      'Comprehensive LMS replicating Canvas functionality. Features role-based access control, course management with modules and assignments, and intuitive dashboard for tracking progress.',
  },
  {
    title: 'GoodReads Clone — Book Discovery Platform',
    date: '2024-12-01',
    tech: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'Google Books API'],
    description:
      'Full-stack web application for discovering, tracking, and reviewing books. Built with Next.js, features personalized bookshelves, book reviews, and Google Books API integration.',
  },
];
