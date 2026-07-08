"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"
import ProjectModal, { type ModalProject } from "@/components/project-modal"

const WebProjects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeFilter, setActiveFilter] = useState("all")
  const [selected, setSelected] = useState<ModalProject | null>(null)

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
      title: "Gluu Flex",
      description:
        "Admin console for an enterprise identity and access platform built on the Linux Foundation's Janssen Project. The React UI manages OAuth2/OIDC clients, FIDO2 passkeys, and SCIM, and enforces browser-side Cedar authorization (Rust compiled to WebAssembly), with live active-user and session dashboards.",
      longDescription:
        "A commercial enterprise IAM platform built on the Linux Foundation's Janssen Project. I work on the React Admin-UI, the console administrators use to run the identity server. A core part of the work is Cedarling, Janssen's policy-based authorization engine: a Rust engine compiled to WebAssembly that runs directly in the browser and evaluates Cedar policies on the client to authorize each module and action per the user's permissions. I rebuilt how the console enforces permissions so every screen and action is governed by fine-grained policies, delivered the policy and role-mapping screens, and added multi-issuer authorization plus the new policy-store format. I also modernized the platform, migrating the build to Vite and upgrading the core framework and UI libraries.",
      role:
        "Full-time web, front end (primary) and backend (secondary), plus deployments and VM provisioning. Joined mid-project, active since May 2025.",
      highlights: [
        "Browser-side Cedar authorization (Rust to WebAssembly) enforcing fine-grained, per-action permissions across every module",
        "Policy and role-mapping screens, multi-issuer authorization, and the new policy-store format",
        "GovOps continuous governance layer for automated compliance monitoring and policy enforcement",
        "Full design revamp to the new Figma system with light and dark theming, multi-language, and responsive layouts",
        "Migrated the build to Vite and streamlined API access with Orval-generated OpenAPI clients",
      ],
      image: "/projects/gluu.png",
      imgPos: "object-center",
      stack: ["React 19", "TypeScript", "Cedar / WASM", "React Query", "MUI", "IAM"],
      fullStack: ["React 19", "TypeScript", "Vite", "Redux Toolkit", "React Query", "Cedarling / WASM", "MUI", "React Router 7", "Orval (OpenAPI)", "Formik + Yup", "i18next", "Java (Janssen)"],
      filters: ["react", "enterprise"],
      demoLink: "https://gluu.org/flex/",
    },
    {
      id: 2,
      title: "Streamlyne",
      description:
        "A cloud research administration platform for universities. Covers the full sponsored-research lifecycle, from pre-award proposals to awards, compliance, and reporting, with newer AI modules for funding discovery and benchmarking.",
      longDescription:
        "A cloud-based electronic research administration (eRA) platform for research institutions and universities. It manages the full sponsored-research lifecycle: pre-award proposal tracking, award management, compliance monitoring, and reporting and analytics, with newer AI-enhanced modules including the Lyn Pro AI assistant, FundFit AI funding discovery, and the HERD Visualizer for benchmarking.",
      role: "Full-time full-stack web. Joined mid-project.",
      highlights: [
        "Full sponsored-research lifecycle: proposals, awards, compliance, and reporting",
        "React front end over Python services with a legacy Kuali Rice (Java) eRA core",
        "AI modules: Lyn Pro assistant, FundFit funding discovery, and HERD Visualizer benchmarking",
      ],
      image: "/projects/streamlyne.png",
      imgPos: "object-center",
      stack: ["React", "Python", "REST APIs", "Kuali Rice (Java)", "AI Modules"],
      fullStack: ["React", "Python", "REST APIs", "Kuali Rice (Java)", "AI Modules"],
      filters: ["react", "ai", "enterprise"],
      demoLink: "https://streamlyne.com/",
    },
    {
      id: 3,
      title: "AAS Platform",
      description:
        "A full-stack marketplace connecting customers, contractors, and admins for home services. Contractor bidding on job requests, staged Stripe payments, tiered memberships, property investment listings, and role-based analytics dashboards.",
      longDescription:
        "A full-stack marketplace connecting customers, contractors, and admins for home and commercial services. Customers post job requests, contractors bid, and payments release in stages through Stripe. It also carries tiered memberships, off-market property investment listings, and role-based dashboards with analytics and maps.",
      role: "Full-stack web developer. Built from scratch.",
      highlights: [
        "Job requests with contractor bidding and staged Stripe payments",
        "Tiered memberships and subscription billing",
        "Off-market property investment listings",
        "Role-based dashboards with Recharts analytics and React Leaflet maps",
      ],
      image: "/projects/aas.png",
      imgPos: "object-center",
      stack: ["React 19", "Vite", "Redux Toolkit", "Node.js / Express", "MongoDB", "Stripe", "AWS S3"],
      fullStack: ["React 19", "Vite", "TypeScript", "Redux Toolkit", "Tailwind CSS", "React Hook Form + Zod", "Recharts", "React Leaflet", "Node.js / Express", "MongoDB", "Stripe", "AWS S3", "JWT", "Nodemailer"],
      filters: ["react", "node"],
      demoLink: "https://aasquebec.com/en",
    },
    {
      id: 4,
      title: "Head Office AI",
      description:
        "A no-code platform for building AI TeamAgents with distinct personalities, trained in natural language on your own files and deployed to a web portal, website widget, WhatsApp, and API. Angular front end over an Express and Socket.IO real-time tier, powered by OpenAI, with Stripe billing.",
      longDescription:
        "A no-code platform for building AI TeamAgents with distinct personalities, trainable in natural language on uploaded files and deployable across a web portal, a website chat bubble, WhatsApp, and an API. The Angular portal is backed by an Express API and a dedicated Socket.IO real-time chat tier, with OpenAI-powered agents, Stripe billing, and Google, Microsoft, and LinkedIn social login.",
      role: "Full-stack web developer. Built from scratch.",
      highlights: [
        "Build AI TeamAgents with distinct personalities, trained in natural language on your files",
        "Deploy to a web portal, website widget, WhatsApp, and API",
        "Dedicated Express and Socket.IO tier for real-time chat",
        "OpenAI agents, Stripe billing, and Google, Microsoft, and LinkedIn OAuth",
      ],
      image: "/projects/headoffice.png",
      imgPos: "object-center",
      stack: ["Angular", "Node.js / Express", "Socket.IO", "OpenAI", "Stripe", "OAuth"],
      fullStack: ["Angular", "TypeScript", "Node.js / Express", "Socket.IO", "OpenAI", "Stripe", "OAuth", "AWS S3 / CloudFront", "nginx"],
      filters: ["ai", "node"],
      demoLink: "https://headoffice.ai/",
    },
    {
      id: 5,
      title: "Evolo AI",
      description:
        "An AI education platform for K-12 and adult learners: swipe-to-apply job matching, employer matching, career exploration, and AI guidance, plus a real-time notification center. Web console backed by an Express and MongoDB API.",
      longDescription:
        "An AI-powered education platform for K-12 and adult learners. Students swipe to apply on simplified job listings, get matched to employers through a few quick questions, explore careers, and receive AI guidance that highlights their strengths, all with a real-time notification center. The web console is a React SPA backed by an Express and MongoDB API, deployed on AWS with a Cloudflare CDN.",
      role: "Full-stack development (web, iOS, Android). Joined from the start.",
      highlights: [
        "Swipe-to-apply on simplified job listings with employer matching",
        "Career exploration and AI guidance that highlights student strengths",
        "Real-time notification center over FCM and APNs",
        "React SPA over an Express and MongoDB API, JWT auth, AWS S3, Cloudflare CDN",
      ],
      image: "/projects/evolo.png",
      imgPos: "object-center",
      stack: ["React", "Redux Toolkit", "Node.js / Express", "MongoDB", "JWT", "AWS S3"],
      fullStack: ["React", "Redux Toolkit", "React Router", "Node.js / Express", "MongoDB", "JWT", "AWS S3", "Cloudflare"],
      filters: ["react", "node", "ai"],
      demoLink: "https://goevolo.com/",
    },
    {
      id: 6,
      title: "NWFIT AI",
      description:
        "A personalized fitness-coaching platform serving AI-generated workout and training plans. Next.js and MUI web app over a hardened Express API, with companion iOS and Android apps sharing the same backend.",
      longDescription:
        "A personalized fitness-coaching platform that serves AI-generated workout and training plans. The Next.js and Material UI web app runs on a hardened Express API (helmet and CSP), stores media on DigitalOcean Spaces, and shares its backend with native iOS and Android apps.",
      role: "Full-stack development (web, iOS, Android). Joined mid-project.",
      highlights: [
        "AI-generated personalized workout and training plans",
        "Next.js and MUI web app on a helmet and CSP hardened Express API",
        "Shared backend across web and native iOS and Android apps",
        "Media storage on DigitalOcean Spaces, deployed on Cloudflare",
      ],
      image: "/projects/nwfit.png",
      imgPos: "object-center",
      stack: ["Next.js", "TypeScript", "MUI", "Node.js / Express", "DO Spaces"],
      fullStack: ["Next.js", "TypeScript", "Material UI", "Node.js / Express", "DigitalOcean Spaces", "Cloudflare"],
      filters: ["react", "node", "ai"],
      demoLink: "https://nwfit.ai/",
    },
    {
      id: 7,
      title: "Train GRC",
      description:
        "A governance, risk, and compliance training platform. Marketing site wired to a serverless AWS signup flow, a hosted course academy for learners, and integrated scheduling for advisory and custom training.",
      longDescription:
        "A governance, risk, and compliance training platform. The marketing site wires a signup flow to a serverless AWS backend (Lambda and API Gateway), hosts its course academy on Teachable, and books advisory and custom-training sessions through Calendly. Static assets are served from S3 and CloudFront.",
      role: "Full-stack web developer. Built from scratch.",
      highlights: [
        "Signup flow wired to a serverless AWS backend (Lambda and API Gateway)",
        "Course academy hosted on Teachable",
        "Advisory and training bookings via Calendly",
        "Static hosting on S3 and CloudFront",
      ],
      image: "/projects/traingrc.png",
      imgPos: "object-center",
      stack: ["React", "AWS Lambda", "API Gateway", "S3 / CloudFront", "Serverless"],
      fullStack: ["React", "Bootstrap", "AWS Lambda", "API Gateway", "S3 / CloudFront", "Teachable", "Calendly"],
      filters: ["react"],
      demoLink: "https://www.traingrc.com/",
    },
    {
      id: 8,
      title: "House Screw",
      description:
        "A MERN home-services platform with real-time chat and notifications over Socket.IO, JWT auth, and Cloudinary media uploads, built on a REST API with Redux Toolkit state.",
      longDescription:
        "A MERN home-services platform with real-time chat and notifications over Socket.IO. It runs on a REST API with Redux Toolkit state, JWT authentication, and Cloudinary or S3 media uploads, styled with Tailwind CSS.",
      role: "Full-stack developer. Joined mid-project.",
      highlights: [
        "Real-time chat and notifications over Socket.IO",
        "REST API with JWT auth and Redux Toolkit state",
        "Cloudinary and S3 media uploads",
      ],
      image: null,
      imgPos: "object-center",
      stack: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Socket.IO", "JWT"],
      fullStack: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Socket.IO", "JWT", "Cloudinary / S3", "Tailwind CSS"],
      filters: ["react", "node"],
      demoLink: "",
    },
  ]

  const filters = [
    { name: "All", value: "all" },
    { name: "React", value: "react" },
    { name: "Node.js", value: "node" },
    { name: "AI", value: "ai" },
    { name: "Enterprise", value: "enterprise" },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.filters.includes(activeFilter))

  const openModal = (project: (typeof projects)[number]) => {
    setSelected({
      title: project.title,
      image: project.image,
      imgPos: project.imgPos,
      role: project.role,
      description: project.description,
      longDescription: project.longDescription,
      highlights: project.highlights,
      stack: project.fullStack ?? project.stack,
      links: project.demoLink
        ? [{ label: "Visit Site", href: project.demoLink, kind: "demo" }]
        : [],
    })
  }

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
              Production platforms I have shipped across enterprise IAM, research administration, AI, and
              full-stack marketplaces, from front-end console to cloud backend.
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
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover ${project.imgPos} transition-transform duration-500 group-hover:scale-110`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white/90 select-none px-4 text-center">
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex gap-3">
                      <span className="px-4 py-2 bg-white rounded-full text-gray-900 flex items-center gap-2 text-sm font-medium">
                        <Eye size={18} />
                        <span>View Details</span>
                      </span>
                      {project.demoLink ? (
                        <Link
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          <span>Visit Site</span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="p-6 card-3d-content">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors animated-underline">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full"
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
  )
}

export default WebProjects
