"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import ProjectModal, { type ModalProject } from "@/components/project-modal";

const WebProjects = () => {
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

  type WebProject = {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    role: string;
    engagement?: string;
    tenure?: string;
    highlights: string[];
    image: string | null;
    images?: string[];
    imgPos: string;
    stack: string[];
    fullStack: string[];
    filters: string[];
    demoLink: string;
  };

  const projects: WebProject[] = [
    {
      id: 1,
      title: "Gluu Flex",
      description:
        "Admin console for an enterprise identity and access platform built on the Linux Foundation's Janssen Project. The React UI manages SSO, MFA and passkeys, OIDC/OAuth 2.0 and SAML clients, token issuance, and SCIM, and enforces browser-side Cedar authorization (Rust compiled to WebAssembly).",
      longDescription:
        "A commercial enterprise IAM platform built on the Linux Foundation's Janssen Project. I work on the React Admin-UI, the console administrators use to run the identity server: single sign-on, multi-factor authentication and FIDO2 passkeys, OIDC and OAuth 2.0 clients, SAML federation, token issuance and lifecycle, and SCIM provisioning, with live active-user, session, and token dashboards. A core part of the work is Cedarling, Janssen's policy-based authorization engine: a Rust engine compiled to WebAssembly that runs directly in the browser and evaluates Cedar policies on the client to authorize each module and action per the user's permissions. I rebuilt how the console enforces permissions so every screen and action is governed by fine-grained policies, delivered the policy and role-mapping screens, and added multi-issuer authorization plus the new policy-store format. I also modernized the platform, migrating the build to Vite and upgrading the core framework and UI libraries.",
      role: "Full-stack web, front-end primary, plus deployments and VM provisioning",
      engagement: "Full-time",
      tenure: "Joined mid-project, active since May 2025",
      highlights: [
        "SSO, MFA and FIDO2 passkeys, OIDC / OAuth 2.0, SAML, and token management",
        "Browser-side Cedar authorization (Rust to WebAssembly) enforcing fine-grained, per-action permissions across every module",
        "Policy and role-mapping screens, multi-issuer authorization, and the new policy-store format",
        "GovOps continuous governance layer for automated compliance monitoring and policy enforcement",
        "Full design revamp to the new Figma system with light and dark theming, multi-language, and responsive layouts",
        "Migrated the build to Vite and streamlined API access with Orval-generated OpenAPI clients",
      ],
      image: "/projects/gluu.webp",
      images: [
        "/projects/gluu.webp",
        "/projects/gluu-2.webp",
        "/projects/gluu-3.webp",
        "/projects/gluu-4.webp",
        "/projects/gluu-5.webp",
      ],
      imgPos: "object-center",
      stack: [
        "React 19",
        "TypeScript",
        "Cedar / WASM",
        "React Query",
        "MUI",
        "IAM",
      ],
      fullStack: [
        "React 19",
        "TypeScript",
        "Vite",
        "Redux Toolkit",
        "React Query",
        "Cedarling / WASM",
        "MUI",
        "React Router 7",
        "Orval (OpenAPI)",
        "Formik + Yup",
        "i18next",
        "Java (Janssen)",
      ],
      filters: ["react", "java", "enterprise"],
      demoLink: "https://gluu.org/flex/",
    },
    {
      id: 2,
      title: "Streamlyne",
      description:
        "A cloud research administration platform for universities. Covers the full sponsored-research lifecycle, from pre-award proposals to awards, compliance, and reporting, with AI modules for funding discovery, benchmarking, and an enterprise assistant.",
      longDescription:
        "A cloud-based electronic research administration (eRA) platform for research institutions and universities. It manages the full sponsored-research lifecycle: pre-award proposal tracking, award management, compliance monitoring, and reporting and analytics. Its AI layer includes Sara AI, a multi-skilled enterprise assistant that handles trainable tasks across a research office, Lyn Pro for secure enterprise AI, FundFit AI for funding discovery across thousands of sources, the HERD Visualizer for benchmarking, and QuickForms. Institutions report saving 60+ hours a month on AI-assisted research administration.",
      role: "Full-stack web",
      engagement: "Full-time",
      tenure: "Joined mid-project",
      highlights: [
        "Full sponsored-research lifecycle: proposals, awards, compliance, and reporting",
        "Sara AI, a multi-skilled enterprise assistant for the research office",
        "Lyn Pro enterprise AI, FundFit AI funding discovery, and QuickForms",
        "HERD Visualizer for cross-institution benchmarking",
        "React front end over Python services with a legacy Kuali Rice (Java) eRA core",
      ],
      image: "/projects/streamlyne.webp",
      images: [
        "/projects/streamlyne.webp",
        "/projects/streamlyne-2.webp",
        "/projects/streamlyne-3.webp",
        "/projects/streamlyne-4.webp",
        "/projects/streamlyne-5.webp",
      ],
      imgPos: "object-center",
      stack: [
        "React",
        "Python",
        "REST APIs",
        "Kuali Rice (Java)",
        "AI Modules",
      ],
      fullStack: [
        "React",
        "Python",
        "REST APIs",
        "Kuali Rice (Java)",
        "AI Modules",
      ],
      filters: ["react", "python", "java", "ai", "enterprise"],
      demoLink: "https://streamlyne.com/",
    },
    {
      id: 3,
      title: "AAS Platform",
      description:
        "A bilingual full-stack marketplace connecting customers, contractors, and admins for home and commercial services. Contractor bidding on job requests, staged Stripe payments, tiered memberships, property investment listings, and role-based analytics dashboards.",
      longDescription:
        "A full-stack marketplace connecting customers, contractors, and admins for home and commercial services in Quebec. Customers post job requests, contractors bid, and payments release in stages through Stripe. It also carries tiered memberships with a 15% saving on annual plans, off-market property investment listings, and role-based dashboards with analytics and maps. The whole interface is localized in English and French.",
      role: "Full-stack web",
      tenure: "Built from scratch",
      highlights: [
        "Job requests with contractor bidding and staged Stripe payments",
        "Tiered memberships and subscription billing, 15% off annual plans",
        "Off-market property investment listings",
        "Role-based dashboards with Recharts analytics and React Leaflet maps",
        "Fully bilingual English and French interface",
      ],
      image: "/projects/aas.webp",
      images: [
        "/projects/aas.webp",
        "/projects/aas-2.webp",
        "/projects/aas-3.webp",
        "/projects/aas-4.webp",
        "/projects/aas-5.webp",
      ],
      imgPos: "object-center",
      stack: [
        "React 19",
        "Vite",
        "Redux Toolkit",
        "Node.js / Express",
        "MongoDB",
        "Stripe",
        "AWS S3",
      ],
      fullStack: [
        "React 19",
        "Vite",
        "TypeScript",
        "Redux Toolkit",
        "Tailwind CSS",
        "React Hook Form + Zod",
        "Recharts",
        "React Leaflet",
        "Node.js / Express",
        "MongoDB",
        "Stripe",
        "AWS S3",
        "JWT",
        "Nodemailer",
      ],
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
      role: "Full-stack web",
      tenure: "Built from scratch",
      highlights: [
        "Build AI TeamAgents with distinct personalities, trained in natural language on your files",
        "Deploy to a web portal, website widget, WhatsApp, and API",
        "Dedicated Express and Socket.IO tier for real-time chat",
        "OpenAI agents, Stripe billing, and Google, Microsoft, and LinkedIn OAuth",
      ],
      image: "/projects/headoffice.webp",
      images: [
        "/projects/headoffice.webp",
        "/projects/headoffice-2.webp",
        "/projects/headoffice-3.webp",
        "/projects/headoffice-4.webp",
        "/projects/headoffice-5.webp",
      ],
      imgPos: "object-center",
      stack: [
        "Angular",
        "Node.js / Express",
        "Socket.IO",
        "OpenAI",
        "Stripe",
        "OAuth",
      ],
      fullStack: [
        "Angular",
        "TypeScript",
        "Node.js / Express",
        "Socket.IO",
        "OpenAI",
        "Stripe",
        "OAuth",
        "AWS S3 / CloudFront",
        "nginx",
      ],
      filters: ["angular", "node", "ai"],
      demoLink: "https://headoffice.ai/",
    },
    {
      id: 5,
      title: "Evolo AI Web",
      description:
        "An AI education platform for K-12 and adult learners covering both careers and student well-being: swipe-to-apply job matching, employer matching, career exploration, AI guidance, counseling sessions, incident reporting, and chat.",
      longDescription:
        "An AI-powered education platform for K-12 and adult learners, spanning both career outcomes and student well-being. Students swipe to apply on simplified job listings, get matched to employers through a few quick questions, explore careers, and receive AI guidance that highlights their strengths. Staff schedule and track counseling sessions, log behavioral and bullying incident reports, and message students, employers, and consortium partners through built-in chat, alongside a real-time notification center. The web console is a Create React App SPA backed by an Express and MongoDB API, deployed on Vercel behind a Cloudflare CDN, with companion student and instructor apps on iOS and Android.",
      role: "Full-stack, web and mobile",
      tenure: "From the start",
      highlights: [
        "Swipe-to-apply on simplified job listings with employer matching",
        "Career exploration and AI guidance that highlights student strengths",
        "Student well-being: counseling session scheduling and tracking",
        "Behavioral and bullying incident reporting",
        "Chat across school, consortium, and employer channels",
        "Real-time notification center over FCM and APNs",
        "React SPA over an Express and MongoDB API, JWT auth, AWS S3, Cloudflare CDN",
      ],
      image: "/projects/evolo-web.webp",
      images: [
        "/projects/evolo-web.webp",
        "/projects/evolo-web-2.webp",
        "/projects/evolo-web-3.webp",
        "/projects/evolo-web-4.webp",
      ],
      imgPos: "object-center",
      stack: [
        "React",
        "Redux Toolkit",
        "Node.js / Express",
        "MongoDB",
        "JWT",
        "AWS S3",
      ],
      fullStack: [
        "React (CRA SPA)",
        "Redux Toolkit",
        "React Router",
        "Yup",
        "Axios",
        "Node.js / Express",
        "MongoDB / Mongoose",
        "JWT (access + refresh)",
        "AWS S3",
        "Vercel",
        "Cloudflare CDN",
      ],
      filters: ["react", "node", "ai"],
      demoLink: "https://goevolo.com/",
    },
    {
      id: 6,
      title: "NWFIT AI",
      description:
        "A personalized fitness-coaching platform serving AI-generated, adaptive workout plans for weight loss, muscle gain, and endurance, with progress tracking and move-to-earn rewards. Next.js web app over a hardened Express API, plus iOS and Android apps.",
      longDescription:
        "A personalized fitness-coaching platform that serves AI-generated workout and training plans built around each member's goal, schedule, and preferences, across weight loss, muscle gain, and endurance. Plans auto-adjust day to day, progress is tracked over 14-day windows with workout, time, and calorie stats, and a move-to-earn mechanic rewards activity. The Next.js and Material UI web app runs on a hardened Express API (helmet and CSP), stores media on DigitalOcean Spaces, and shares its backend with native iOS and Android apps serving 39,000+ members.",
      role: "Full-stack, web and mobile",
      tenure: "Joined mid-project",
      highlights: [
        "AI-generated personalized plans for weight loss, muscle gain, and endurance",
        "Adaptive plans that auto-adjust to the member's day",
        "Progress tracking with workout, time-saved, and calorie stats",
        "Move-to-earn rewards for completed activity",
        "Next.js and MUI web app on a helmet and CSP hardened Express API",
        "Shared backend across web and native iOS and Android apps",
        "Media storage on DigitalOcean Spaces, deployed on Cloudflare",
      ],
      image: "/projects/nwfit.webp",
      images: [
        "/projects/nwfit.webp",
        "/projects/nwfit-2.webp",
        "/projects/nwfit-3.webp",
        "/projects/nwfit-4.webp",
        "/projects/nwfit-5.webp",
      ],
      imgPos: "object-center",
      stack: ["Next.js", "TypeScript", "MUI", "Node.js / Express", "DO Spaces"],
      fullStack: [
        "Next.js",
        "TypeScript",
        "Material UI",
        "Node.js / Express",
        "DigitalOcean Spaces",
        "Cloudflare",
      ],
      filters: ["react", "node", "ai"],
      demoLink: "https://nwfit.ai/",
    },
    {
      id: 7,
      title: "Train GRC",
      description:
        "A cloud-auditing training platform: Teachable-hosted courses, hands-on labs on real AWS accounts, and Calendly-booked advisory sessions, on a React SPA served from S3 and CloudFront with a serverless signup flow.",
      longDescription:
        "A GRC and cloud-auditing training platform. It runs an academy of Teachable-hosted courses, hands-on labs where students practise against real AWS accounts with boto3, and advisory and training sessions booked through Calendly. The React SPA is served statically from S3 behind CloudFront, with a serverless signup flow on Lambda and API Gateway.",
      role: "Full-stack web",
      tenure: "Built from scratch",
      highlights: [
        "Cloud-auditing courses hosted on Teachable",
        "Hands-on labs practising against real AWS accounts",
        "Advisory and training bookings via Calendly",
        "Serverless signup flow on Lambda and API Gateway",
        "Static hosting on S3 and CloudFront",
      ],
      image: "/projects/traingrc.webp",
      images: [
        "/projects/traingrc.webp",
        "/projects/traingrc-2.webp",
        "/projects/traingrc-3.webp",
        "/projects/traingrc-4.webp",
        "/projects/traingrc-5.webp",
      ],
      imgPos: "object-center",
      stack: [
        "React",
        "AWS Lambda",
        "API Gateway",
        "S3 / CloudFront",
        "Serverless",
      ],
      fullStack: [
        "React",
        "Bootstrap",
        "AWS Lambda",
        "API Gateway",
        "S3 / CloudFront",
        "Teachable",
        "Calendly",
      ],
      filters: ["react"],
      demoLink: "https://www.traingrc.com/",
    },
    {
      id: 8,
      title: "House Screw",
      description:
        "A LinkedIn-style professional network for the construction and trades industry: a post feed, profiles with engagement analytics, connections, job listings, and real-time chat, built on the MERN stack.",
      longDescription:
        "A LinkedIn-style professional network for the construction and trades industry, built on the MERN stack. Members post photos, videos, events, and articles to a community feed, build out profiles that track profile viewers and post impressions, send connection requests, and browse or publish job listings. Real-time chat and notifications run over Socket.IO, on a REST API with Redux Toolkit state, JWT authentication, and Cloudinary or S3 media uploads.",
      role: "Full-stack web",
      tenure: "Joined mid-project",
      highlights: [
        "Community feed with photo, video, event, and article posts",
        "Profiles with profile-viewer and post-impression analytics",
        "Connection requests and network building",
        "Job listings and hiring posts",
        "Real-time chat and notifications over Socket.IO",
        "REST API with JWT auth, Redux Toolkit state, and Cloudinary or S3 uploads",
      ],
      image: "/projects/housescrew.webp",
      images: [
        "/projects/housescrew.webp",
        "/projects/housescrew-2.webp",
        "/projects/housescrew-3.webp",
        "/projects/housescrew-4.webp",
        "/projects/housescrew-5.webp",
      ],
      imgPos: "object-center",
      stack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Redux Toolkit",
        "Socket.IO",
        "JWT",
      ],
      fullStack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Redux Toolkit",
        "Socket.IO",
        "JWT",
        "Cloudinary / S3",
        "Tailwind CSS",
      ],
      filters: ["react", "node"],
      demoLink: "",
    },
    {
      id: 9,
      title: "KiddieCove Web",
      description:
        "The web half of the KiddieCove school platform: the public kiddiecove.io site and the admin console schools run day to day. A React front end over the same NestJS API that backs the parent, teacher, and driver apps.",
      longDescription:
        "The web half of KiddieCove, a school-management platform used by private schools, daycares, and Montessoris in Pakistan. It runs on the same NestJS API as the React Native apps, so the admin console and the parent, teacher, and driver apps share one source of truth. Schools handle admissions, attendance, weekly timetables, exam and result cards, and fee invoices from the browser, and follow live bus tracking on the same Socket.io channels the apps use. The public site carries the pricing and use-case pages.",
      role: "Full-stack web",
      engagement: "Full-time",
      tenure: "Joined mid-project",
      highlights: [
        "Admin console for admissions, attendance, timetables, exam and result cards, and fee invoices",
        "Live GPS bus tracking shared with the parent and driver apps",
        "React front end over the same NestJS API that backs the mobile apps",
        "Real-time updates over Socket.io, so a change in the console reaches the apps",
        "Child-safety-first platform built for the Pakistani school market",
      ],
      image: "/projects/kiddiecove.webp",
      images: [
        "/projects/kiddiecove.webp",
        "/projects/kiddiecove-2.webp",
        "/projects/kiddiecove-3.webp",
        "/projects/kiddiecove-4.webp",
        "/projects/kiddiecove-5.webp",
      ],
      imgPos: "object-center",
      stack: ["React", "NestJS", "Socket.io", "REST API"],
      fullStack: [
        "React",
        "NestJS",
        "Socket.io",
        "Axios",
        "REST API",
        "Token injection + session handling",
      ],
      filters: ["react", "node", "enterprise"],
      demoLink: "https://kiddiecove.io/",
    },
  ];

  const filters = [
    { name: "All", value: "all" },
    { name: "React", value: "react" },
    { name: "Angular", value: "angular" },
    { name: "Node.js", value: "node" },
    { name: "Python", value: "python" },
    { name: "Java", value: "java" },
    { name: "AI", value: "ai" },
    { name: "Enterprise", value: "enterprise" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.filters.includes(activeFilter));

  const openModal = (project: (typeof projects)[number]) => {
    setSelected({
      title: project.title,
      image: project.image,
      images: project.images,
      imgPos: project.imgPos,
      role: project.role,
      engagement: project.engagement,
      tenure: project.tenure,
      description: project.description,
      longDescription: project.longDescription,
      highlights: project.highlights,
      stack: project.fullStack ?? project.stack,
      links: project.demoLink
        ? [{ label: "Visit Site", href: project.demoLink, kind: "demo" }]
        : [],
    });
  };

  return (
    <section
      id="web-projects"
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
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
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Web <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Production platforms I have shipped across enterprise IAM,
              research administration, AI, and full-stack marketplaces, from
              front-end console to cloud backend.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    "--mx",
                    `${e.clientX - rect.left}px`,
                  );
                  e.currentTarget.style.setProperty(
                    "--my",
                    `${e.clientY - rect.top}px`,
                  );
                }}
                className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group gradient-border card-3d spotlight-card"
              >
                <div className="relative aspect-video overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1536px) 470px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className={`object-cover ${project.imgPos} transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
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
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
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
  );
};

export default WebProjects;
