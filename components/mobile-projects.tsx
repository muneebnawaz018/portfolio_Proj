"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

const MobileProjects = () => {
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

  const mobileProjects = [
    {
      id: 1,
      title: "Uroots",
      description:
        "Uroots is a student-centric app that simplifies academic management. It enables assignment submissions, tracks progress, offers skill-building resources, and includes a chat feature for effective communication with peers and instructors.",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723030925/Portfolio/All%20Projects/uroots.png",
      storeLink: "https://apps.apple.com/pk/app/uroots/id1441176645",
      platform: "ios",
      technologies: ["React Native", "Redux", "Firebase", "REST API"],
    },
    {
      id: 2,
      title: "Shabaas",
      description:
        "It is an Australian-based payments app to facilitate easy to use, secure and fast payments using the Banking-as-a-Service (BaaS) model.",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723030770/Portfolio/All%20Projects/shabaas.png",
      storeLink: "https://play.google.com/store/apps/details?id=com.shabaas.payout",
      platform: "android",
      technologies: ["React Native", "Context API", "Node.js", "MongoDB"],
    },
    {
      id: 3,
      title: "Soken",
      description:
        "Soken has been designed to help employees who live busy lives make simple small changes, to help positively impact their physical and mental health. We do so through physical challenges, designed to improve health through increasing sleep or physical activity.",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723029322/Portfolio/All%20Projects/soken.png",
      storeLink: "https://play.google.com/store/apps/details?id=com.soken",
      platform: "android",
      technologies: ["React Native", "Redux", "Socket.io", "Google Maps API"],
    },
    {
      id: 4,
      title: "Vitev",
      description:
        "Vitev is your ultimate hydration companion! Vitev is your comprehensive hydration assistant designed to ensure you never miss a sip of refreshing water and stay on top of your water filter maintenance schedule. With Vitev, you'll receive timely reminders to drink water, helping you maintain optimal hydration levels throughout the day.",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723031440/Portfolio/All%20Projects/vitev.png",
      storeLink: "https://play.google.com/store/apps/details?id=com.vitev",
      platform: "android",
      technologies: ["React Native", "AI Integration", "Node.js", "MongoDB"],
    },
    {
      id: 5,
      title: "Crypto App",
      description:
        "This is coin base react native based mobile application, that basically upto dates us with the Crypto market rates",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723029603/Portfolio/All%20Projects/cryptoApp.png",
      storeLink: "#",
      platform: "android",
      technologies: ["React Native", "Crypto API", "Charts", "Real-time Data"],
    },
    {
      id: 6,
      title: "Coin Base",
      description:
        "This is coin base react native based mobile application, that basically upto dates us with the coins prices and market rates",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723028795/Portfolio/All%20Projects/coin_detail.png",
      storeLink: "#",
      platform: "android",
      technologies: ["React Native", "Crypto API", "Charts", "Real-time Data"],
    },
    {
      id: 7,
      title: "Music App",
      description: "A music streaming application with playlist management, audio controls, and user profiles",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723030479/Portfolio/All%20Projects/musicapp.png",
      storeLink: "#",
      platform: "android",
      technologies: ["React Native", "Audio API", "User Authentication", "Cloud Storage"],
    },
    {
      id: 8,
      title: "Evolo AI",
      description: "Evolo AI, An app that provides student career guidance",
      image: "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1741524692/1741524589687_iik7lc.jpg",
      storeLink: "https://play.google.com/store/apps/details?id=com.hiddenworkers.evoloaiapp&hl=en",
      platform: "android",
      technologies: ["React Native", "AI Integration", "Career API", "Student Data"],
    },
  ]

  return (
    <section id="mobile-projects" className="py-20 relative overflow-hidden">
      <div className="floating-element floating-element-1 animation-delay-1000"></div>
      <div className="floating-element floating-element-2 animation-delay-3000"></div>

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
              Mobile <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Check out my React Native mobile applications available on app stores, showcasing cross-platform
              development expertise.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobileProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group gradient-border card-3d"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <Link
                      href={project.storeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white rounded-full text-gray-900 hover:bg-purple-600 hover:text-white transition-colors flex items-center gap-2 transform hover:scale-110 shine"
                    >
                      <ExternalLink size={16} />
                      <span>View on {project.platform === "android" ? "Play Store" : "App Store"}</span>
                    </Link>
                  </div>
                </div>
                <div className="p-6 card-3d-content">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors animated-underline">
                      {project.title}
                    </h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.platform === "android"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {project.platform === "android" ? "Android" : "iOS"}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full animate-pulse-glow"
                      >
                        {tech}
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

export default MobileProjects
