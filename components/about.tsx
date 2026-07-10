"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { CheckCircle, Calendar, Users } from "lucide-react";
import CountUp from "@/components/count-up";
import { getYearsExperience } from "@/lib/experience";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const years = getYearsExperience();

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
      end: years,
      suffix: "+",
      label: "Years Experience",
      icon: (
        <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      ),
    },
    {
      end: 50,
      suffix: "+",
      label: "Projects Completed",
      icon: (
        <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      ),
    },
    {
      end: 20,
      suffix: "+",
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
              A Sr. Full Stack Developer & Solution Architect building scalable,
              secure, AI-powered web and mobile products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="relative h-[400px] md:h-[580px] rounded-xl overflow-hidden shadow-xl gradient-border">
                <Image
                  src="https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723016725/Profile_Pic_cafjay.png"
                  alt="Muneeb Nawaz"
                  fill
                  sizes="(min-width: 1536px) 720px, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-6">
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                Sr. Full Stack Developer & Solution Architect
              </motion.h3>

              <motion.p
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-400"
              >
                I'm Muneeb Nawaz, a Sr. Full Stack Developer and Solution
                Architect with over {years} years of experience. I help startups and
                growing businesses build scalable web applications and AI-powered
                products with the MERN stack, React Native, and Next.js. I focus
                on systems that stay reliable, secure, and ready to grow over
                time.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-400"
              >
                I deliver complete solutions from planning and architecture
                through development and deployment: full-stack applications,
                AI-integrated features (LLMs, RAG, conversational AI, and
                autonomous agents), and cloud-ready systems on AWS with
                Docker, Kubernetes, and CI/CD. My focus is performance,
                maintainability, and scalability as products grow.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-8"
              >
                {[
                  "Web Development",
                  "Mobile Apps",
                  "Backend & APIs",
                  "Databases & Data",
                  "AI Engineering",
                  "DevOps & Cloud",
                  "Security & Compliance",
                  "Solution Architecture",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
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
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center group hover:scale-[1.03] gradient-border"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  <CountUp end={stat.end} suffix={stat.suffix} />
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
