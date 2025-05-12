"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"

const WebProjects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeFilter, setActiveFilter] = useState("all")

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

  const projects = [
    {
      id: 1,
      title: "Suchino",
      description:
        "Exploring Chinese culture and learning Mandarin Chinese, fostering a community of language enthusiasts and culture explorers.",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723031478/Portfolio/All%20Projects/suchino.png",
      tags: ["react", "node", "mongodb", "express"],
      demoLink: "https://suchino.com/",
    },
    {
      id: 2,
      title: "Train GRC",
      description:
        "Unlock cloud expertise with individual courses, customized training, and advisory support at Train GRC.",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723029965/Portfolio/All%20Projects/trainGrc.png",
      tags: ["react", "node", "mongodb", "express"],
      demoLink: "https://www.traingrc.com/",
    },
    {
      id: 3,
      title: "Wakacast",
      description:
        "Exploring Chinese culture and learning Mandarin Chinese, fostering a community of language enthusiasts and culture explorers.",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723031460/Portfolio/All%20Projects/wakacast.png",
      tags: ["react", "node", "mongodb", "express"],
      demoLink: "https://wakacast.com/",
    },
    {
      id: 4,
      title: "Ninja Warriors",
      description:
        "Unlock cloud expertise with individual courses, customized training, and advisory support at Train GRC.",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723031413/Portfolio/All%20Projects/Ninja_Warriors_meta.png",
      tags: ["react", "node", "mongodb", "express"],
      demoLink: "https://ninjawarriorsmeta.com/",
    },
    {
      id: 5,
      title: "Head Office",
      description:
        "AI Representatives embodying distinct personalities to embody your brand and engage effortlessly across multiple platforms.",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723030207/Portfolio/All%20Projects/headoffice.png",
      tags: ["react", "node", "ai", "api"],
      demoLink: "https://www.headoffice.space/",
    },
    {
      id: 6,
      title: "Amazing Concept Builder",
      description:
        "Amazing Concept Builder specializes in custom home construction, offering expert design and building services. Dedicated to quality and client satisfaction, they transform your vision into a high-quality, personalized home with attention to detail and craftsmanship.",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723027957/Portfolio/All%20Projects/amazing_builder.png",
      tags: ["react", "node", "mongodb", "express"],
      demoLink: "https://master-concept-builder.netlify.app/",
    },
    {
      id: 7,
      title: "Lebaba E-Commerce",
      description: "Lebaba ECommerce Platform that has secure ECommerce based features including real time carts",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1741524375/image_1_rxbseo.png",
      tags: ["react", "node", "mongodb", "ecommerce"],
      demoLink: "https://lebaba-ecommerce.netlify.app/",
    },
  ]

  const filters = [
    { name: "All", value: "all" },
    { name: "React", value: "react" },
    { name: "Node.js", value: "node" },
    { name: "MongoDB", value: "mongodb" },
    { name: "API", value: "api" },
    { name: "E-commerce", value: "ecommerce" },
    { name: "AI", value: "ai" },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.tags.includes(activeFilter))

  return (
    <section id="web-projects" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>

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
              Web <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore my web development projects built with modern technologies and best practices, showcasing
              expertise across the full stack.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
            {filters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.value
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700"
                }`}
              >
                {filter.name}
              </motion.button>
            ))}
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group gradient-border card-3d"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex gap-4">
                      <Link
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white rounded-full text-gray-900 hover:bg-purple-600 hover:text-white transition-colors transform hover:scale-110 flex items-center gap-2"
                      >
                        <Eye size={18} />
                        <span>Watch Project</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-6 card-3d-content">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors animated-underline">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full animate-pulse-glow"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WebProjects
