"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AppleIcon, GooglePlayIcon } from "@/components/brand-icons";
import ProjectModal, { type ModalProject, type ModalLink } from "@/components/project-modal";

const MobileProjects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState<ModalProject | null>(null);

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
      title: "Evolo AI Student",
      description:
        "The student app for the Evolo AI education platform: swipe-to-apply on simplified job listings, employer matching, career exploration, AI guidance, and a real-time push notification center.",
      longDescription:
        "The student-facing app for the Evolo AI education platform. Students swipe to apply on simplified job listings, get matched to employers through a few quick questions, explore careers, and receive AI guidance, with a notification center driven by real-time push over Firebase Cloud Messaging and APNs. It runs on a Node.js, Express, and MongoDB backend with JWT access and refresh tokens.",
      role: "Full-stack mobile",
      tenure: "From the start",
      highlights: [
        "Swipe-to-apply on simplified job listings with employer matching",
        "Career exploration and AI guidance",
        "Notification center with real-time push over FCM and APNs",
        "Node.js, Express, and MongoDB backend with JWT access and refresh tokens",
      ],
      image: "/projects/evolo-student.webp",
      imgPos: "object-center",
      platforms: ["ios", "android"],
      playStoreLink: "https://play.google.com/store/apps/details?id=com.hiddenworkers.evoloaiapp&hl=en",
      appStoreLink: "https://apps.apple.com/us/app/evolo-ai/id6569237819",
      siteLink: "",
      technologies: ["React Native", "Redux Toolkit", "React Navigation", "JWT", "FCM / APNs"],
      fullStack: ["React Native", "Redux Toolkit + redux-persist", "React Navigation", "Axios", "JWT (access + refresh)", "FCM / APNs", "In-app notification center", "Deep Linking", "AsyncStorage", "Node.js / Express", "MongoDB / Mongoose", "AWS S3", "Cloudflare CDN"],
      filters: ["react-native", "node", "ai"],
    },
    {
      id: 2,
      title: "Evolo AI School",
      description:
        "The instructor app for the Evolo AI education platform: track student applications, give resume feedback, monitor employment progress, and run sessions, career fairs, and incident reports.",
      longDescription:
        "The instructor-facing app for the Evolo AI education platform. Teachers track their students' job applications, give resume feedback, and monitor employment progress across a class, alongside session scheduling, career fairs, and incident reporting. It shares the same Node.js, Express, and MongoDB backend as the student app, with role-scoped JWT auth separating instructor and student access.",
      role: "Full-stack, web and mobile",
      tenure: "From the start",
      highlights: [
        "Class-wide tracking of student applications and employment progress",
        "Resume feedback and AI-assisted student guidance",
        "Session scheduling, career fairs, and incident reports",
        "Shared backend with the student app, role-scoped JWT auth",
      ],
      image: "/projects/evolo-school.webp",
      imgPos: "object-center",
      platforms: ["ios", "android"],
      playStoreLink: "https://play.google.com/store/apps/details?id=com.hiddenworkers.evoloaiinstructor&hl=en",
      appStoreLink: "https://apps.apple.com/us/app/evolo-ai-school/id6741904184",
      siteLink: "https://goevolo.com/",
      technologies: ["React Native", "Redux Toolkit", "React Navigation", "JWT", "FCM / APNs"],
      fullStack: ["React Native", "Redux Toolkit + redux-persist", "React Navigation", "Axios", "JWT (access + refresh)", "FCM / APNs", "In-app notification center", "Deep Linking", "Node.js / Express", "MongoDB / Mongoose", "AWS S3", "SMTP transactional email", "Cloudflare CDN"],
      filters: ["react-native", "node", "ai"],
    },
    {
      id: 3,
      title: "KiddieCove",
      description:
        "A school-management app linking parents, teachers, and drivers with schools. Parents track kids, chat in real time, and view timetables, attendance, invoices, and transport; teachers manage attendance and diaries. Backed by a NestJS API.",
      longDescription:
        "A React Native school-management app connecting parents, teachers, and drivers with schools. It runs three role-based experiences: parents track their kids, chat in real time, and view timetables, attendance, invoices, a daily diary, photo albums, transport tracking, and QR scanning; teachers manage attendance, diary, albums, and applications; and a planned driver module handles live tracking and travel history. It is backed by 90+ React Query hooks over an Axios API with token injection and session handling.",
      role: "Full-stack mobile",
      engagement: "Full-time",
      tenure: "Joined mid-project",
      highlights: [
        "Three role-based experiences for parents, teachers, and drivers",
        "Real-time chat, live transport tracking, and QR scanning",
        "Timetables, attendance, invoices, daily diary, and photo albums",
        "90+ React Query hooks over an Axios API with token injection and session handling",
      ],
      image: "/projects/kiddiecove.webp",
      imgPos: "object-top",
      platforms: ["ios", "android"],
      playStoreLink: "",
      appStoreLink: "",
      siteLink: "https://kiddiecove.io/",
      technologies: ["React Native", "Zustand", "React Query", "Socket.io", "Maps", "NestJS"],
      fullStack: ["React Native 0.85", "TypeScript", "Zustand", "TanStack React Query 5", "React Navigation 7", "react-native-unistyles", "Formik + Yup", "Axios", "Socket.io", "react-native-maps", "Vision Camera", "Firebase Cloud Messaging", "NestJS"],
      filters: ["react-native", "node", "enterprise"],
    },
    {
      id: 4,
      title: "VemosPay",
      description:
        "A QR-at-table payments app for restaurants and bars: pay checks, open, join, and split tabs, order and take out, plus loyalty, memberships, and event tickets. Ships iOS, Android, and web with a main app and an App Clip.",
      longDescription:
        "A QR-at-table mobile payments app for restaurants and bars. Diners pay checks, open, join, and split tabs, order, and take out, with loyalty and rewards, memberships, events and ticket QR, and venue discovery. It ships on iOS, Android, and web as two iOS apps, a main app and an App Clip built to a 15 MB budget.",
      role: "Full-stack mobile",
      engagement: "Full-time",
      tenure: "Joined mid-project",
      highlights: [
        "QR-at-table checks: pay, open, join, and split tabs",
        "Ordering, takeout, loyalty and rewards, and memberships",
        "Events and ticket QR plus venue discovery",
        "iOS, Android, and web, including an App Clip under a 15 MB budget",
      ],
      image: "/projects/vemospay.webp",
      imgPos: "object-center",
      platforms: ["ios", "android"],
      playStoreLink: "https://play.google.com/store/apps/details?id=com.vemos.vemospay",
      appStoreLink: "https://apps.apple.com/us/app/vemos-pay/id1521512947",
      siteLink: "",
      technologies: ["React Native", "Expo", "Redux Toolkit", "Apple / Google Pay", "Firebase", "Reanimated"],
      fullStack: ["React Native 0.85", "React 19", "Expo", "TypeScript", "Redux Toolkit", "MMKV", "React Navigation 7", "Apple / Google Pay", "Firebase", "Vision Camera", "Reanimated 4", "FlashList", "PostHog + Sentry", "Branch", "Stallion OTA", "Node.js / Express"],
      filters: ["react-native", "node"],
    },
    {
      id: 5,
      title: "NWFIT",
      description:
        "Companion iOS and Android apps for NWFIT, serving AI-generated workout and training plans from the same hardened Express backend as the web app.",
      longDescription:
        "The companion iOS and Android apps for NWFIT, serving AI-generated workout and training plans from the same hardened Express backend as the web app, with media stored on DigitalOcean Spaces.",
      role: "Full-stack, web and mobile",
      tenure: "Joined mid-project",
      highlights: [
        "AI-generated workout and training plans on iOS and Android",
        "Shared, helmet and CSP hardened Express backend with the web app",
        "Media storage on DigitalOcean Spaces",
      ],
      image: "/projects/nwfit.webp",
      imgPos: "object-center",
      platforms: ["ios", "android"],
      playStoreLink: "https://play.google.com/store/apps/details?id=com.ninjawarriorsmeta.nwfit",
      appStoreLink: "https://apps.apple.com/us/app/nwfit-fitness-weight-loss/id6475285888",
      siteLink: "",
      technologies: ["React Native", "Node.js / Express", "REST API", "DO Spaces"],
      fullStack: ["React Native", "Node.js / Express", "REST API", "DigitalOcean Spaces"],
      filters: ["react-native", "node", "ai"],
    },
    {
      id: 6,
      title: "GeoFace",
      description:
        "A patented proof-of-presence app: prove a person was physically at a given place and time, with photos verifiably captured there. Live Google Maps capture, wallet-based ID verification, and a tamper-evident flow over an Express and MongoDB API.",
      longDescription:
        "A patented proof-of-presence platform: prove a person was physically at a given place and time, plus photos verifiably captured at that place and time. The React Native app pairs live Google Maps geolocation with wallet-based ID verification and a tamper-evident capture flow, backed by a Node.js, Express, and MongoDB API with JWT auth and AWS S3 for proof-of-location photos. Android is intentionally unpublished because most users in the Australia region are on iOS.",
      role: "Mobile front-end",
      engagement: "Full-time",
      tenure: "From the start",
      highlights: [
        "Patented proof of a person's presence at a place and time",
        "Live Google Maps geolocation capture and rendering",
        "Wallet-based ID verification and in-app recharges",
        "Tamper-evident capture over an Express and MongoDB API with S3 photo storage",
      ],
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1749845844/GeoFace_guennh.png",
      imgPos: "object-center",
      platforms: ["ios"],
      playStoreLink: "",
      appStoreLink: "https://apps.apple.com/pk/app/geoface/id1602781941",
      siteLink: "",
      technologies: ["React Native", "Redux", "Google Maps SDK", "Wallet / IAP", "Node.js", "MongoDB"],
      fullStack: ["React Native", "Redux Thunk", "Google Maps SDK", "Mobile Wallet / IAP", "Node.js / Express", "MongoDB", "JWT", "AWS S3"],
      filters: ["react-native", "node"],
    },
    {
      id: 7,
      title: "A'men",
      description:
        "A government content-monitoring app for the UAE Media Council. Residents flag misleading or non-compliant media with link, image, and voice-note reports, using UAE Pass or guest sign-in, in a full RTL Arabic and English UI.",
      longDescription:
        "A government content-monitoring platform for the UAE Media Council that lets residents flag media as misleading, unsafe, or non-compliant advertising. I built the React Native app with UAE Pass and guest sign-in, category-based reporting with link, image, and voice-note attachments, and a full RTL Arabic and English UI, consuming the council's ASP.NET Core API.",
      role: "Mobile front-end",
      engagement: "Full-time",
      tenure: "From the start",
      highlights: [
        "Report misleading, unsafe, or non-compliant media",
        "UAE Pass national-identity sign-in plus guest reporting",
        "Link, image, and voice-note attachments with push status updates",
        "Full RTL Arabic and English UI over the council's ASP.NET Core API",
      ],
      image: "/projects/amen.webp",
      imgPos: "object-center",
      platforms: ["ios"],
      playStoreLink: "",
      appStoreLink: "https://apps.apple.com/ae/app/amen/id6737225589",
      siteLink: "https://amen.ae/",
      technologies: ["React Native", "Redux Toolkit", "RTK Query", "Arabic / English RTL", "UAE Pass OAuth"],
      fullStack: ["React Native", "TypeScript", "Redux Toolkit", "RTK Query", "React Navigation", "Arabic / English RTL", "UAE Pass OAuth", "ASP.NET Core API"],
      filters: ["react-native", "enterprise"],
    },
    {
      id: 8,
      title: "Uroots",
      description:
        "A campus social network for college students: real-time chat, a social feed, media sharing, and event scheduling that connect peers within their community.",
      longDescription:
        "A campus social network for college students that connects peers within their community and helps them find new friendships, with real-time chat, a social feed, media sharing, and event scheduling, on a Node.js backend.",
      role: "Full-stack mobile",
      engagement: "Full-time",
      tenure: "From the start",
      highlights: [
        "Campus community networking and friend discovery",
        "Real-time chat and a social feed",
        "Media sharing and event scheduling",
      ],
      image:
        "https://res.cloudinary.com/dpwy3mjiz/image/upload/v1723030925/Portfolio/All%20Projects/uroots.png",
      imgPos: "object-center",
      platforms: ["ios", "android"],
      playStoreLink: "",
      appStoreLink: "",
      siteLink: "",
      technologies: ["React Native", "TypeScript", "Redux", "Firebase", "AWS S3", "Pusher"],
      fullStack: ["React Native", "TypeScript", "Redux (thunk + persist)", "React Navigation", "Firebase (Auth, FCM, Crashlytics)", "AWS S3", "Pusher", "Axios", "ImageKit", "Lottie", "Node.js"],
      filters: ["react-native", "node"],
    },
    {
      id: 9,
      title: "Adalo Chart Component",
      description:
        "A custom bar-chart component for the Adalo no-code platform, built with React Native and Victory. Renders natively on iOS and Android, adding charting the builder lacks out of the box.",
      longDescription:
        "A custom bar-chart component for the Adalo no-code platform, built with React Native and Victory using the Adalo Component Developer Kit. One component renders natively on both iOS and Android, with accent colors and dark mode driven by theme props, extending Adalo apps with charting the no-code builder does not provide out of the box.",
      role: "Component developer, UI only",
      engagement: "Part-time",
      tenure: "Joined an existing project",
      highlights: [
        "Custom bar-chart component via the Adalo Component Developer Kit",
        "Single codebase rendering natively on iOS and Android",
        "Accent colors and dark mode via theme props",
        "Adds native charting the no-code builder lacks",
      ],
      image: "/projects/adalo.webp",
      imgPos: "object-center",
      platforms: ["ios", "android"],
      playStoreLink: "",
      appStoreLink: "",
      siteLink: "https://www.adalo.com/",
      technologies: ["Adalo", "React Native", "Victory", "JavaScript"],
      fullStack: ["Adalo", "React Native", "Victory", "JavaScript"],
      filters: ["react-native"],
    },
  ];

  const filters = [
    { name: "All", value: "all" },
    { name: "React Native", value: "react-native" },
    { name: "Node.js", value: "node" },
    { name: "AI", value: "ai" },
    { name: "Enterprise", value: "enterprise" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? mobileProjects
      : mobileProjects.filter((project) => project.filters.includes(activeFilter));

  const platformBadge: Record<string, string> = {
    ios: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    android: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    web: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  };
  const platformLabel: Record<string, string> = {
    ios: "iOS",
    android: "Android",
    web: "Web",
  };

  const openModal = (project: (typeof mobileProjects)[number]) => {
    const links: ModalLink[] = [];
    if (project.appStoreLink) links.push({ label: "App Store", href: project.appStoreLink, kind: "app" });
    if (project.playStoreLink) links.push({ label: "Play Store", href: project.playStoreLink, kind: "play" });
    if (project.siteLink) links.push({ label: "Visit Site", href: project.siteLink, kind: "site" });
    setSelected({
      title: project.title,
      image: project.image,
      imgPos: project.imgPos,
      role: project.role,
      engagement: project.engagement,
      tenure: project.tenure,
      description: project.description,
      longDescription: project.longDescription,
      highlights: project.highlights,
      stack: project.fullStack ?? project.technologies,
      platforms: project.platforms,
      links,
    });
  };

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
              Cross-platform React Native apps shipped to the App Store and Google Play, spanning payments,
              education, government, and AI, most wired to backends I also built.
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

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onClick={() => openModal(project)}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
                  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
                }}
                className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group gradient-border card-3d spotlight-card"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover ${project.imgPos} transition-transform duration-500 group-hover:scale-110`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white/90 text-center select-none">
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                    <div className="flex flex-row flex-wrap justify-center gap-2 w-full">
                      {project.appStoreLink ? (
                        <Link
                          href={project.appStoreLink}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[104px] px-3 py-2 rounded-full flex items-center justify-center gap-1.5 text-sm font-medium text-white backdrop-blur-md bg-white/15 border border-white/30 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:border-transparent hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                        >
                          <AppleIcon size={15} />
                          <span className="truncate">App Store</span>
                        </Link>
                      ) : null}

                      {project.playStoreLink ? (
                        <Link
                          href={project.playStoreLink}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[104px] px-3 py-2 rounded-full flex items-center justify-center gap-1.5 text-sm font-medium text-white backdrop-blur-md bg-white/15 border border-white/30 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:border-transparent hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
                        >
                          <GooglePlayIcon size={15} />
                          <span className="truncate">Play Store</span>
                        </Link>
                      ) : null}

                      {project.siteLink ? (
                        <Link
                          href={project.siteLink}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[104px] px-3 py-2 rounded-full flex items-center justify-center gap-1.5 text-sm font-medium text-white backdrop-blur-md bg-white/15 border border-white/30 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:border-transparent hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                        >
                          <ExternalLink size={15} />
                          <span className="truncate">Visit Site</span>
                        </Link>
                      ) : null}

                      {!project.appStoreLink && !project.playStoreLink && !project.siteLink ? (
                        <span className="flex-1 min-w-[104px] px-3 py-2 rounded-full flex items-center justify-center text-sm font-medium text-white backdrop-blur-md bg-white/15 border border-white/30">
                          View Details
                        </span>
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
                      {project.platforms.map((p) => (
                        <div
                          key={p}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${platformBadge[p]}`}
                        >
                          {platformLabel[p]}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full"
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

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default MobileProjects;
