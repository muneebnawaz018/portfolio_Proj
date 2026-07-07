"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin gradient bar pinned to the top that fills as the page scrolls.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-500"
    />
  );
};

export default ScrollProgress;
