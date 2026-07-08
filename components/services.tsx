"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Smartphone, Globe, Server, Database, Cloud, Cpu, Lock, Bot, Activity } from "lucide-react"

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const services = [
    {
      icon: <Globe className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Web Application Development",
      description:
        "Fast, accessible web apps in React and Next.js, from marketing sites to data-heavy dashboards. Component systems, sensible state, and clean data flow that stay maintainable as the product grows.",
    },
    {
      icon: <Smartphone className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Mobile App Development",
      description:
        "Cross-platform iOS and Android apps in React Native and Expo, with offline-first data, native modules, deep linking, push, and payments. Shipped to the App Store and Google Play, including wallet and App Clip work.",
    },
    {
      icon: <Server className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Backend & Microservices",
      description:
        "APIs and services in Node.js and NestJS across REST, GraphQL, and gRPC, with event-driven messaging on Kafka or RabbitMQ. Circuit breakers, load balancing, and auto-scaling for systems that hold up under load.",
    },
    {
      icon: <Database className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Database & Data Engineering",
      description:
        "Schema and data-model design across PostgreSQL, MongoDB, and Elasticsearch, with indexing, sharding, and replication for scale. Caching and warehousing on Snowflake, BigQuery, or Redshift when the data grows.",
    },
    {
      icon: <Bot className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "AI Engineering",
      description:
        "LLM features that do real work: RAG over your own data, conversational assistants, and autonomous agents, wired into production apps with the right guardrails, evaluation, and cost control.",
    },
    {
      icon: <Cloud className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Cloud & DevOps",
      description:
        "AWS-native infrastructure with Docker, Kubernetes, and Terraform. CI/CD pipelines, blue-green deploys, autoscaling, and monitoring so releases stay boring and the platform stays up.",
    },
    {
      icon: <Lock className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Security & Compliance",
      description:
        "Authentication and authorization done right with JWT, OAuth2, and OIDC, plus role and policy-based access (RBAC, ABAC, Cedar). OWASP hardening, encryption, TLS, and security headers built in from the start.",
    },
    {
      icon: <Activity className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Testing & Observability",
      description:
        "Confidence in every release: unit, integration, and end-to-end tests with Jest, Cypress, and Playwright, plus monitoring and tracing through Sentry, Datadog, and Grafana, with Core Web Vitals kept in check.",
    },
    {
      icon: <Cpu className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Solution Architecture",
      description:
        "End-to-end system design that balances scale, cost, and delivery speed. Domain-driven boundaries, clear service contracts, and a roadmap that takes a product from idea to production.",
    },
  ]

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="floating-element floating-element-1 animation-delay-2000"></div>
      <div className="floating-element floating-element-2 animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              My <span className="gradient-text">Services</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              End-to-end product engineering, from front-end and mobile through backend, data, AI, and the cloud that runs it.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group gradient-border card-3d"
              >
                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit mb-6 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
