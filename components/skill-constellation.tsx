"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface SkillConstellationProps {
  name: string;
  technologies: string[];
  index: number;
  inView: boolean;
  icon?: ReactNode;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// One category rendered as a node graph: the category label is the hub, each
// technology is a node, and SVG lines connect hub → node. Hovering a node lights
// up its connection. The same linking-line motif as the particle field, made of
// real skills.
const SkillConstellation = ({
  name,
  technologies,
  index,
  inView,
  icon,
}: SkillConstellationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLHeadingElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [lines, setLines] = useState<Line[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [hub, setHub] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<number | null>(null);

  useLayoutEffect(() => {
    let raf = 0;

    const compute = () => {
      const c = containerRef.current;
      const h = hubRef.current;
      if (!c || !h) return;
      const cRect = c.getBoundingClientRect();
      const hRect = h.getBoundingClientRect();
      const hx = hRect.left + hRect.width / 2 - cRect.left;
      const hy = hRect.bottom - cRect.top;
      const next = pillRefs.current.flatMap((p) => {
        if (!p) return [];
        const r = p.getBoundingClientRect();
        return [
          {
            x1: hx,
            y1: hy,
            x2: r.left + r.width / 2 - cRect.left,
            y2: r.top + r.height / 2 - cRect.top,
          },
        ];
      });
      setHub({ x: hx, y: hy });
      setDims({ w: cRect.width, h: cRect.height });
      setLines(next);
    };

    // Measure after layout settles; coalesce bursts of resize callbacks.
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", schedule);
    // Recompute once web fonts settle (metrics shift pill positions).
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [technologies.length, inView]);

  return (
    <div ref={containerRef} className="relative space-y-4">
      {/* connection layer */}
      <svg
        aria-hidden
        width={dims.w}
        height={dims.h}
        className="pointer-events-none absolute left-0 top-0 z-0"
      >
        {hub.x > 0 && (
          <circle cx={hub.x} cy={hub.y} r={3} fill="#a855f7" opacity={0.9} />
        )}
        {lines.map((l, i) => {
          const active = hovered === i;
          return (
            <motion.line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={active ? "#a855f7" : "#8b5cf6"}
              strokeWidth={active ? 1.6 : 0.8}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? (active ? 0.9 : 0.16) : 0 }}
              transition={{
                opacity: {
                  duration: active ? 0.15 : 0.5,
                  delay: active ? 0 : index * 0.08 + i * 0.02,
                },
              }}
            />
          );
        })}
      </svg>

      <h3
        ref={hubRef}
        className="font-display relative z-10 inline-flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white"
      >
        {icon}
        <span className="animated-underline">{name}</span>
      </h3>

      <div ref={wrapRef} className="relative z-10 flex flex-wrap gap-3">
        {technologies.map((tech, techIndex) => (
          <motion.div
            key={techIndex}
            ref={(el) => {
              pillRefs.current[techIndex] = el;
            }}
            onMouseEnter={() => setHovered(techIndex)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{
              duration: 0.4,
              delay: techIndex * 0.04 + index * 0.08,
            }}
            className={`cursor-default px-4 py-2 rounded-xl border text-sm font-medium transition-colors duration-300 ${
              hovered === techIndex
                ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {tech}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillConstellation;
