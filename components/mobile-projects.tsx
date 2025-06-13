"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const MobileProjects = () => {
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

  const mobileProjects = [
    {
      id: 1,
      title: "Uroots",
      description:
        "Uroots is a student-centric app that simplifies academic management. It enables assignment submissions, tracks progress, offers skill-building resources, and includes a chat feature for effective communication with peers and instructors.",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723030925/Portfolio/All%20Projects/uroots.png",
      playStoreLink: "",
      appStoreLink: "https://apps.apple.com/pk/app/uroots/id1441176645",
      technologies: [
        "React Native",
        "Redux",
        "Firebase",
        "Camera",
        "WebSockets",
      ],
    },
    {
      id: 2,
      title: "Mooner",
      description:
        "Mooner is a platform where users, service seekers and service providers, can book or offer services they can provide to earn an income. The platform is about “ Enabling Everyone To Be Self-Employed”, (Our Company Motto). The difference: prices on the app are not rate card based. We like to think of our app as revolutionary and unconventional, just as we are.",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1749845491/Mooner_celbno.png",
      playStoreLink:
        "https://play.google.com/store/apps/details?id=com.app.mooner&hl=en",
      appStoreLink:
        "https://apps.apple.com/pk/app/mooner-services-on-demand/id1554244768",
      technologies: ["React Native", "Redux", "Location", "REST API"],
    },
    // {
    //   id: 2,
    //   title: "Shabaas",
    //   description:
    //     "It is an Australian-based payments app to facilitate easy to use, secure and fast payments using the Banking-as-a-Service (BaaS) model.",
    //   image:
    //     "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723030770/Portfolio/All%20Projects/shabaas.png",
    //   playStoreLink:
    //     "https://play.google.com/store/apps/details?id=com.shabaas.payout",
    //   appStoreLink: "",
    //   technologies: ["React Native", "Context API", "Node.js", "MongoDB"],
    // },
    {
      id: 3,
      title: "Soken",
      description:
        "Soken has been designed to help employees who live busy lives make simple small changes, to help positively impact their physical and mental health. We do so through physical challenges, designed to improve health through increasing sleep or physical activity.",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723029322/Portfolio/All%20Projects/soken.png",
      playStoreLink: "https://play.google.com/store/apps/details?id=com.soken",
      appStoreLink: "",
      technologies: ["React Native", "Redux", "Socket.io", "Google Maps API"],
    },
    {
      id: 4,
      title: "Vitev",
      description:
        "Vitev is your ultimate hydration companion! Vitev is your comprehensive hydration assistant designed to ensure you never miss a sip of refreshing water and stay on top of your water filter maintenance schedule. With Vitev, you'll receive timely reminders to drink water, helping you maintain optimal hydration levels throughout the day.",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723031440/Portfolio/All%20Projects/vitev.png",
      playStoreLink: "https://play.google.com/store/apps/details?id=com.vitev",
      appStoreLink: "",
      technologies: ["React Native", "AI Integration", "Node.js", "MongoDB"],
    },
    {
      id: 5,
      title: "GeoFace",
      description:
        "The purpose of the GeoFace app is for a person to use our patented technology to prove that the person was physically in a particular place at a particular time, as well as photos that are proven to be taken at a particular place and time.",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1749845844/GeoFace_guennh.png",
      playStoreLink: "",
      appStoreLink: "https://apps.apple.com/pk/app/geoface/id1602781941",
      technologies: [
        "React Native",
        "Redux",
        "REST API",
        "GPS & Location APIs",
        "Camera APIs",
        "WebSockets",
      ],
    },
    // {
    //   id: 5,
    //   title: "Crypto App",
    //   description:
    //     "This is coin base react native based mobile application, that basically upto dates us with the Crypto market rates",
    //   image:
    //     "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723029603/Portfolio/All%20Projects/cryptoApp.png",
    //   playStoreLink: "",
    //   appStoreLink: "",
    //   technologies: ["React Native", "Crypto API", "Charts", "Real-time Data"],
    // },
    {
      id: 6,
      title: "Coin Base",
      description:
        "This is coin base react native based mobile application, that basically upto dates us with the coins prices and market rates",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723028795/Portfolio/All%20Projects/coin_detail.png",
      playStoreLink: "",
      appStoreLink: "",
      technologies: ["React Native", "Crypto API", "Charts", "Real-time Data"],
    },
    {
      id: 7,
      title: "A'men",
      description:
        "A digital platform for monitoring the content circulating in the UAE across various platforms to ensure its compatibility with national identity, societal values ​​and media content standards.",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1749845933/Amen_m1itzh.png",
      playStoreLink:
        "https://play.google.com/store/apps/details?id=com.uaemediacouncil.amen",
      appStoreLink: "",
      technologies: ["React Native", "WebSockets", "Charts.js / D3.js"],
    },
    // {
    //   id: 7,
    //   title: "Music App",
    //   description:
    //     "A music streaming application with playlist management, audio controls, and user profiles",
    //   image:
    //     "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723030479/Portfolio/All%20Projects/musicapp.png",
    //   playStoreLink: "",
    //   appStoreLink: "",
    //   technologies: [
    //     "React Native",
    //     "Audio API",
    //     "User Authentication",
    //     "Cloud Storage",
    //   ],
    // },
    {
      id: 8,
      title: "Evolo AI",
      description: "Evolo AI, An app that provides student career guidance",
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1741524692/1741524589687_iik7lc.jpg",
      playStoreLink:
        "https://play.google.com/store/apps/details?id=com.hiddenworkers.evoloaiapp&hl=en",
      appStoreLink: "",
      technologies: [
        "React Native",
        "AI Integration",
        "Career API",
        "Student Data",
      ],
    },
  ];

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
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Mobile <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Check out my React Native mobile applications available on app
              stores, showcasing cross-platform development expertise.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
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
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2 sm:p-4">
                    <div className="flex flex-col gap-1.5 sm:gap-2 w-full max-w-xs">
                      {project.playStoreLink ? (
                        <Link
                          href={project.playStoreLink}
                          target="_blank"
                          rel="noopener"
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 transform hover:scale-105 shine text-sm sm:text-base"
                        >
                          <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                          <span className="truncate">Play Store</span>
                        </Link>
                      ) : null}

                      {project.appStoreLink ? (
                        <Link
                          href={project.appStoreLink}
                          target="_blank"
                          rel="noopener"
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 transform hover:scale-105 shine text-sm sm:text-base"
                        >
                          <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                          <span className="truncate">App Store</span>
                        </Link>
                      ) : null}

                      {!project.playStoreLink && !project.appStoreLink ? (
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-600 rounded-full text-white opacity-75 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                          <span className="truncate">Not yet published</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 card-3d-content">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors animated-underline flex-1 min-w-0">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 shrink-0">
                      {project.playStoreLink && (
                        <div className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          Android
                        </div>
                      )}
                      {project.appStoreLink && (
                        <div className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          iOS
                        </div>
                      )}
                      {!project.playStoreLink && !project.appStoreLink && (
                        <div className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400">
                          Unpublished
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full animate-pulse-glow"
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
  );
};

export default MobileProjects;
