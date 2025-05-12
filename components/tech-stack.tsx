"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
        "JavaScript",
        "HTML5 & CSS3",
        "Tailwind CSS",
        "UI Libraries",
        "CSS Libraries",
        "SASS",
        "Context API",
        "State Management Libraries",
        "Styled Components",
      ],
    },
    {
      name: "Backend",
      technologies: [
        "Node.js",
        "Express.js",
        "NestJS",
        "Django",
        "Flask",
        "ASP.NET",
        "RESTful APIs",
        "GraphQL",
        "JWT",
        "OAuth 2.0",
        "Passport.js",
        "Firebase Auth",
      ],
    },
    {
      name: "Mobile",
      technologies: [
        "React Native",
        "Flutter",
        "Expo",
        "Android Studio",
        "Xcode",
        "Navigation",
        "App Store Deployment",
        "Google Play Deployment",
        "Fastlane",
      ],
    },
    {
      name: "Database",
      technologies: [
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "Redis",
        "Firebase",
        "DynamoDB",
        "Supabase",
      ],
    },
    {
      name: "DevOps & Cloud",
      technologies: [
        "AWS",
        "Google Cloud",
        "Vercel",
        "Netlify",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "GitHub Actions",
        "Jenkins",
      ],
    },
    {
      name: "Tools & Others",
      technologies: [
        "Git",
        "GitHub",
        "GitLab",
        "Jira",
        "Figma",
        "Adobe XD",
        "Postman",
        "Swagger",
        "GraphQL",
        "REST API",
        "WebSockets",
        "Socket.io",
        "MQTT",
        "JWT",
        "OAuth",
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

          <motion.div variants={containerVariants} className="space-y-10">
            {techCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white inline-block relative animated-underline">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        inView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      transition={{
                        duration: 0.4,
                        delay: techIndex * 0.05 + index * 0.1,
                      }}
                      className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors hover:-translate-y-1 hover:shadow-md"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
