"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const experiences = [
    {
      role: "Senior Full Stack Engineer & Solution Architect",
      company: "Walqalum Technologies",
      period: "Jan 2025 - Present",
      current: true,
      points: [
        "Architect distributed, event-driven microservices in Node.js and NestJS with domain-driven design, an API gateway, and gRPC, REST, and GraphQL service contracts.",
        "Lead database architecture across MongoDB sharding, replica sets, compound indexing, and aggregation pipelines, with Redis caching, rate limiting, and Kafka or RabbitMQ message queues.",
        "Build for resilience and scale with circuit breakers, load balancing, and horizontal auto-scaling on AWS (ECS, EKS, S3, CloudFront), secured with OAuth2, OIDC, JWT, and RBAC.",
        "Own CI/CD and observability with Docker, Kubernetes, Terraform, and blue-green deployments, plus structured logging and automated testing across React Native native modules and offline-first data.",
      ],
      tech: [
        "Node.js",
        "NestJS",
        "TypeScript",
        "Microservices",
        "GraphQL",
        "gRPC",
        "MongoDB",
        "Redis",
        "Kafka",
        "Kubernetes",
        "Terraform",
        "AWS",
      ],
    },
    {
      role: "Senior Full Stack Engineer",
      company: "YieldWerx Semiconductor",
      period: "Nov 2023 - Dec 2024",
      current: false,
      points: [
        "Engineered scalable, secure full-stack systems on a React and TypeScript frontend and a Node.js and NestJS backend built on layered clean architecture.",
        "Built high-throughput REST and GraphQL APIs on NestJS with Prisma, and tuned PostgreSQL indexing, partitioning, and query plans for large-scale semiconductor yield datasets.",
        "Delivered data-intensive UIs with React Router, JWT-secured routes, Plotly.js charts, and DevExtreme grids, served through an NGINX reverse proxy with caching and gzip.",
      ],
      tech: [
        "React",
        "TypeScript",
        "Node.js",
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "Plotly.js",
        "DevExtreme",
        "JWT",
        "NGINX",
      ],
    },
    {
      role: "Full Stack Engineer",
      company: "WalQalum Technologies",
      period: "Nov 2020 - Oct 2023",
      current: false,
      points: [
        "Built scalable MERN and React Native apps with REST and GraphQL (Apollo) APIs and real-time WebSocket and Socket.io communication across web and mobile.",
        "Engineered state with Redux middleware and the Context API, and optimized rendering with memoization, lazy loading, and code splitting.",
        "Secured services with JWT and OAuth2 token refresh and role-based access control, and designed indexed, aggregation-optimized MongoDB schemas with offline-first sync.",
      ],
      tech: [
        "MERN",
        "React Native",
        "Node.js",
        "Express",
        "GraphQL",
        "Apollo",
        "WebSockets",
        "Redux",
        "MongoDB",
        "OAuth2",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-3"></div>

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
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              6+ years designing and shipping scalable full-stack, mobile, and
              AI-powered systems.
            </p>
          </motion.div>

          {/* timeline */}
          <div className="relative mx-auto max-w-3xl">
            {/* spine */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-purple-500 via-purple-400/40 to-blue-500 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative pl-12 md:pl-0"
                >
                  {/* node */}
                  <span className="absolute left-4 top-6 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 ring-4 ring-gray-50 dark:ring-gray-900 md:left-1/2 animate-pulse-glow" />

                  <div
                    className={`md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "md:ml-auto" : "md:mr-auto md:text-right"
                    }`}
                  >
                    <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-md transition-all duration-300 hover:shadow-xl gradient-border spotlight-card">
                      <div
                        className={`flex flex-wrap items-center gap-2 ${
                          i % 2 === 0 ? "" : "md:justify-end"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                          <Briefcase size={13} />
                          {exp.period}
                        </span>
                        {exp.current && (
                          <span className="rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                            Current
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-purple-600 dark:text-purple-400 font-medium">
                        {exp.company}
                      </p>

                      <ul
                        className={`mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400 ${
                          i % 2 === 0 ? "" : "md:text-left"
                        }`}
                      >
                        {exp.points.map((p, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>

                      <div
                        className={`mt-4 flex flex-wrap gap-2 ${
                          i % 2 === 0 ? "" : "md:justify-end"
                        }`}
                      >
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
