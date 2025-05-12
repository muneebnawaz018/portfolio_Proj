"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Skills = () => {
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

  // Enhanced skills list with more engineering-focused skills
  const skills = [
    { name: "JavaScript/TypeScript", level: 95 },
    { name: "React & React Native", level: 90 },
    { name: "Node.js & Express", level: 87 },
    { name: "AWS Cloud Services", level: 80 },
    { name: "Google Cloud Platform", level: 80 },
    { name: "DevOps", level: 82 },
    { name: "Frontend Development", level: 90 },
    { name: "Backend Development", level: 90 },
    { name: "Database Design", level: 88 },
    { name: "Solution Architect", level: 88 },
    { name: "Microservices & Serverless Architecture", level: 80 },
    { name: "Scalable Systems & Security Implementation", level: 75 },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
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
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A comprehensive overview of my engineering expertise across
              various domains and technologies
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                    initial={{ width: 0 }}
                    animate={
                      inView ? { width: `${skill.level}%` } : { width: 0 }
                    }
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
