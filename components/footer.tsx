"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowUpRight, ArrowUp } from "lucide-react";
import { GithubIcon, UpworkIcon, FiverrIcon } from "@/components/brand-icons";
import { getYearsExperience } from "@/lib/experience";

const socials = [
  {
    icon: <Mail size={20} />,
    href: "mailto:muneeb.fusion@gmail.com",
    label: "Email",
  },
  {
    icon: <GithubIcon size={20} />,
    href: "https://github.com/muneebnawaz018",
    label: "GitHub",
  },
  {
    icon: <FiverrIcon size={20} />,
    href: "https://www.fiverr.com/s/KerqVVW",
    label: "Fiverr",
  },
  {
    icon: <UpworkIcon size={20} />,
    href: "https://www.upwork.com/freelancers/~01113fcaa500ee9108?mp_source=share",
    label: "Upwork",
  },
];

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#web-projects" },
  { name: "Contact", href: "#contact" },
];

/** The site's linking-line signature spread across the whole footer as faint
 *  atmosphere: nodes breathe, edges pulse, echoing the hero's particle field.
 *  Sits behind the content at low opacity so it reads as depth, not decoration. */
const nodes = [
  { cx: 80, cy: 70 },
  { cx: 240, cy: 40 },
  { cx: 300, cy: 150 },
  { cx: 470, cy: 90 },
  { cx: 560, cy: 200 },
  { cx: 700, cy: 60 },
  { cx: 820, cy: 160 },
  { cx: 960, cy: 90 },
  { cx: 1080, cy: 190 },
  { cx: 1160, cy: 70 },
];
const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [7, 9],
  [4, 6],
];

const FooterField = () => (
  <svg
    viewBox="0 0 1240 240"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 h-full w-full"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="footer-edge" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    {edges.map(([a, b], i) => (
      <motion.line
        key={i}
        x1={nodes[a].cx}
        y1={nodes[a].cy}
        x2={nodes[b].cx}
        y2={nodes[b].cy}
        stroke="url(#footer-edge)"
        strokeWidth={1}
        initial={{ opacity: 0.08 }}
        animate={{ opacity: [0.08, 0.35, 0.08] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
    {nodes.map((n, i) => (
      <motion.circle
        key={i}
        cx={n.cx}
        cy={n.cy}
        r={3}
        fill={i % 2 ? "#3b82f6" : "#9333ea"}
        initial={{ opacity: 0.25 }}
        animate={{ opacity: [0.25, 0.8, 0.25], scale: [1, 1.4, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
      />
    ))}
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const years = getYearsExperience();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="relative overflow-hidden bg-gray-950 text-white"
    >
      {/* The linking line that runs between every section, carried across the
          top of the footer. */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      {/* Atmosphere: faint animated constellation, plus a soft purple bloom. */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <FooterField />
      </div>
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-purple-600/15 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Call to action: a big, on-theme prompt that gives the footer weight. */}
        <div className="flex flex-col gap-8 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Let&apos;s build something
              <br />
              <span className="gradient-text">worth shipping.</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Open to full-stack, mobile, and AI work. Tell me what you are
              building and I&apos;ll tell you how I&apos;d approach it.
            </p>
          </div>
          <Link
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5"
          >
            Start a conversation
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-12 border-t border-white/10 pt-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-6 lg:col-span-5">
            <Link
              href="#home"
              className="inline-block text-2xl font-bold text-purple-400"
            >
              Muneeb Nawaz
            </Link>
            <p className="mt-4 max-w-md text-gray-400">
              Sr. Full Stack Developer and Solution Architect with {years}+
              years of experience. I build scalable web and mobile products with
              the MERN stack and React Native, and AI systems with LLMs, RAG,
              and intelligent agents.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-gray-300 ring-1 ring-white/10 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:text-white hover:ring-transparent hover:-translate-y-0.5"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav className="md:col-span-3 lg:col-span-4 lg:col-start-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Explore
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-gray-300 transition-colors hover:text-white"
                  >
                    <span className="mr-0 h-px w-0 bg-gradient-to-r from-purple-500 to-blue-400 transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Muneeb Nawaz. All rights reserved.
          </p>
          <Link
            href="#home"
            className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-white/10 group-hover:-translate-y-0.5">
              <ArrowUp size={16} />
            </span>
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
