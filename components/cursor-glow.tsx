"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Soft radial light that trails the cursor. Sits behind the content
// (z-0, same layer as the particle background) and blends with `screen`
// so it brightens rather than covers. Disabled on touch / coarse pointers.
const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full"
      style={{
        x: springX,
        y: springY,
        mixBlendMode: "screen",
        background:
          "radial-gradient(circle, rgba(147,51,234,0.18) 0%, rgba(59,130,246,0.12) 40%, rgba(0,0,0,0) 70%)",
      }}
    />
  );
};

export default CursorGlow;
