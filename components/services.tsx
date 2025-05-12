"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Smartphone, Globe, Server, Database, Cloud, Cpu, Lock } from "lucide-react"

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
        "Architecting and developing scalable, high-performance web applications using modern frameworks and microservices architecture. Implementing responsive designs with progressive enhancement for optimal user experience across all devices.",
    },
    {
      icon: <Smartphone className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Mobile App Development",
      description:
        "Creating cross-platform mobile applications with React Native that leverage native device capabilities. Implementing offline-first architecture, efficient state management, and optimized rendering for smooth performance on both iOS and Android platforms.",
    },
    {
      icon: <Server className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Backend Architecture",
      description:
        "Designing robust server-side architectures with Node.js, Express, and other backend technologies. Implementing RESTful and GraphQL APIs, microservices, event-driven systems, and message queues for scalable and maintainable backend solutions.",
    },
    {
      icon: <Database className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Database Engineering",
      description:
        "Designing efficient database schemas and implementing data models for relational and NoSQL databases. Optimizing query performance, implementing data sharding strategies, and creating robust data access layers with proper indexing and caching mechanisms.",
    },
    {
      icon: <Cloud className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Cloud Infrastructure & DevOps",
      description:
        "Implementing CI/CD pipelines, containerization with Docker, and orchestration with Kubernetes. Designing cloud-native architectures on AWS, GCP, or Azure with infrastructure as code, automated scaling, and comprehensive monitoring solutions.",
    },
    {
      icon: <Lock className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Security Implementation",
      description:
        "Implementing robust security measures including authentication systems, authorization frameworks, and data encryption. Conducting security audits, implementing OWASP best practices, and ensuring compliance with data protection regulations.",
    },
    {
      icon: <Cpu className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "System Architecture",
      description:
        "Designing comprehensive system architectures that balance scalability, performance, and maintainability. Creating technical specifications, component diagrams, and implementation roadmaps for complex distributed systems.",
    },
    {
      icon: <Code className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Full Stack Development",
      description:
        "End-to-end development services covering both frontend and backend aspects of your application. Implementing domain-driven design principles, clean architecture patterns, and comprehensive testing strategies for robust, maintainable codebases.",
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
              Comprehensive development and architectural services to bring your digital vision to life
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
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
