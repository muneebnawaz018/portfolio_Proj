"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillConstellation from "@/components/skill-constellation";

const TechStack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const techCategories = [
    {
      name: "Frontend",
      technologies: [
        "React",
        "Next.js",
        "Vue.js",
        "Angular",
        "TypeScript",
        "Redux / Pinia / NgRx",
        "TanStack Query",
        "Tailwind CSS",
        "Design Systems (Storybook)",
        "SSR / SSG",
        "PWA / Service Workers",
        "Micro-frontends",
        "Vite / Webpack / Module Federation",
        "Web Performance",
        "Accessibility (WCAG / ARIA)",
        "i18n / Localization",
      ],
    },
    {
      name: "Backend",
      technologies: [
        "Node.js",
        "Express.js",
        "NestJS",
        "Fastify",
        "Django",
        "FastAPI",
        "Flask",
        "REST / GraphQL / gRPC / tRPC",
        "WebSockets / Socket.io",
        "Microservices & Modular Monolith",
        "Domain-Driven Design (DDD)",
        "Event-Driven Architecture",
        "Kafka / RabbitMQ / Celery",
        "Caching & CDN",
        "Distributed Systems & Scalability",
        "Serverless (AWS Lambda)",
        "i18n / Localization",
      ],
    },
    {
      name: "AI & Machine Learning",
      technologies: [
        "GPT / LLMs",
        "Multi-model (OpenAI / Anthropic / Gemini)",
        "LangChain",
        "Vercel AI SDK / LlamaIndex",
        "RAG",
        "Embeddings & Semantic Search",
        "Vector Databases",
        "Conversational AI & Agents",
        "Function / Tool Calling",
        "MCP (Model Context Protocol)",
        "Prompt Engineering",
        "Structured Outputs",
        "Streaming Responses",
        "LLM Observability (LangSmith / Langfuse)",
      ],
    },
    {
      name: "Mobile",
      technologies: [
        "React Native",
        "Expo",
        "Cross-Platform (iOS & Android)",
        "Native Modules & Bridges",
        "Deep Linking / Universal Links",
        "Offline-First Architecture",
        "App Performance Optimization",
        "Push Notifications & Real-time",
        "OTA Updates / CodePush",
        "Mobile Security",
        "Apple / Google Wallet",
        "App Store & Play Deployment (Fastlane)",
      ],
    },
    {
      name: "Databases & Data",
      technologies: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "DynamoDB",
        "Redis",
        "Firebase",
        "Supabase",
        "Elasticsearch / OpenSearch",
        "Data Warehousing (Snowflake / BigQuery / Redshift)",
        "Sharding & Replication",
        "Indexing & Query Optimization",
        "Mongoose / Prisma / SQLAlchemy",
      ],
    },
    {
      name: "DevOps & Cloud",
      technologies: [
        "AWS",
        "Google Cloud",
        "Docker",
        "Kubernetes",
        "GitOps (ArgoCD / Helm)",
        "Terraform",
        "GitHub Actions / Jenkins",
        "NGINX",
        "Vercel / Netlify",
      ],
    },
    {
      name: "Security & Quality",
      technologies: [
        "Auth (JWT / OAuth2 / OIDC)",
        "RBAC / ABAC / PBAC (Cedar)",
        "OWASP / Encryption / SSL",
        "Testing (Unit / Integration / E2E)",
        "Jest / Cypress / Playwright",
        "Monitoring (Sentry / Datadog / Grafana)",
        "Core Web Vitals / Lighthouse",
      ],
    },
  ];

  return (
    <section
      id="tech-stack"
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              My Tech <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A comprehensive collection of technologies, frameworks, and tools
              I work with
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="space-y-6">
            {techCategories.map((category, index) => (
              <SkillConstellation
                key={index}
                name={category.name}
                technologies={category.technologies}
                index={index}
                inView={inView}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
