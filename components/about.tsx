"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { CheckCircle, Calendar, Users } from "lucide-react";

const About = () => {
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

  const stats = [
    {
      value: "6+",
      label: "Years Experience",
      icon: (
        <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      ),
    },
    {
      value: "50+",
      label: "Projects Completed",
      icon: (
        <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      ),
    },
    {
      value: "20+",
      label: "Happy Clients",
      icon: <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    },
  ];

  return (
    <section
      id="about"
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
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A passionate Full Stack Developer with expertise in building
              exceptional digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="relative h-[400px] md:h-[580px] rounded-xl overflow-hidden shadow-xl gradient-border">
                <Image
                  src="https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723016725/Profile_Pic_cafjay.png"
                  alt="Muneeb Nawaz"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-6">
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                Full Stack Developer & Mobile App Developer
              </motion.h3>

              <motion.p
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-400"
              >
                I'm Muneeb Nawaz, a passionate Full Stack Developer with over 6
                years of experience specializing in MERN stack and React Native
                development. I have a strong foundation in building scalable web
                and mobile applications that deliver exceptional user
                experiences.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-400"
              >
                My expertise spans across frontend and backend technologies,
                allowing me to create comprehensive solutions from concept to
                deployment. I'm dedicated to writing clean, maintainable code
                and implementing best practices to ensure optimal performance
                and user satisfaction.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Web Development
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Mobile Development
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      System Architecture
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Backend Development
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Database Design
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Cloud Infrastructure
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center group hover:-translate-y-2 gradient-border"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
