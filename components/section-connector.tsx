"use client";

import { motion } from "framer-motion";

// A node + dashed line that draws itself as it scrolls into view. Placed on the
// seam between sections so the whole page reads as one connected network,
// echoing the interactive particle field.
const SectionConnector = () => (
  <div
    aria-hidden
    className="relative z-10 -my-6 flex justify-center overflow-visible"
  >
    <svg width="24" height="96" viewBox="0 0 24 96" fill="none">
      <defs>
        <linearGradient
          id="connector-grad"
          x1="12"
          y1="0"
          x2="12"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9333ea" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a855f7" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.line
        x1="12"
        y1="4"
        x2="12"
        y2="92"
        stroke="url(#connector-grad)"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      <motion.circle
        cx="12"
        cy="48"
        r="4"
        fill="#a855f7"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="animate-pulse-glow"
        style={{ transformOrigin: "12px 48px" }}
      />
    </svg>
  </div>
);

export default SectionConnector;
