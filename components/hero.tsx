"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import VanillaTilt from "vanilla-tilt";

const Hero = () => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/MnbNwz",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/muneeb-nawaz-a6272419b/",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:muneebnawaz2018@gmail.com",
      label: "Email",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="order-2 lg:order-1"
          >
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-purple-600 dark:text-purple-400 font-medium mb-2"
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Muneeb Nawaz
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium mb-6 h-[40px]"
            >
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  1000,
                  "Full Stack Developer",
                  1000,
                  "React Native Developer",
                  1000,
                  "Cloud Engineer",
                  1000,
                  "System Architect",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className="gradient-text"
              />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg"
            >
              I build exceptional digital experiences that are fast, accessible,
              visually appealing, and responsive. With expertise in both web and
              mobile development, I create solutions that drive business growth.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-full hover:opacity-90 transition-all duration-300 hover:shadow-lg animate-pulse-glow shine"
              >
                Get In Touch
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
              >
                <Download size={18} />
                <span>Download CV</span>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Follow me:
              </span>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-purple-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div
              ref={tiltRef}
              className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full p-1 shadow-xl animate-pulse-glow"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Circular background that appears on hover */}
              <motion.div
                className="absolute -inset-8 rounded-full bg-gradient-to-r from-purple-400/30 to-blue-400/30 z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Second circular background for layered effect */}
              <motion.div
                className="absolute -inset-16 rounded-full bg-gradient-to-r from-blue-300/20 to-purple-300/20 z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.2 : 0.8,
                }}
                transition={{ duration: 0.7, delay: 0.1 }}
              />

              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800 relative z-10">
                {mounted && (
                  <Image
                    src="https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723016725/Profile_Pic_cafjay.png"
                    alt="Muneeb Nawaz"
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-purple-600 dark:border-purple-500 flex items-center justify-center shadow-lg animate-float z-20">
                <span className="text-3xl">👨‍💻</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <Link
            href="#about"
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
