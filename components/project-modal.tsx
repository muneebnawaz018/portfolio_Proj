"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  RotateCwSquare,
} from "lucide-react";
import { AppleIcon, GooglePlayIcon } from "@/components/brand-icons";

/** True on touch devices. A 16:9 screenshot fills only ~23% of a portrait
 *  phone, so those users get a rotate control. Pointer-precise devices have
 *  the room already and do not. */
const useCoarsePointer = () => {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return coarse;
};

export type ModalLink = {
  label: string;
  href: string;
  kind: "app" | "play" | "site" | "demo";
};

export type ModalProject = {
  title: string;
  /** Single hero image. Ignored when `images` is set. */
  image: string | null;
  /** Gallery. Falls back to `image` when absent. */
  images?: string[];
  imgPos?: string;
  role?: string;
  engagement?: string;
  tenure?: string;
  description: string;
  longDescription?: string;
  highlights?: string[];
  stack: string[];
  platforms?: string[];
  links: ModalLink[];
};

const platformStyle: Record<string, string> = {
  ios: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  android:
    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  web: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
};
const platformLabel: Record<string, string> = {
  ios: "iOS",
  android: "Android",
  web: "Web",
};

const linkIcon = (kind: ModalLink["kind"]) => {
  if (kind === "app") return <AppleIcon size={16} />;
  if (kind === "play") return <GooglePlayIcon size={16} />;
  return <ExternalLink size={16} />;
};

const ProjectMeta = ({
  role,
  engagement,
  tenure,
}: {
  role?: string;
  engagement?: string;
  tenure?: string;
}) => {
  const items = [
    { label: "Role", value: role },
    { label: "Engagement", value: engagement },
    { label: "Tenure", value: tenure },
  ].filter((i) => i.value);

  if (items.length === 0) return null;

  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-3">
      {items.map((i) => (
        <div key={i.label} className="space-y-0.5">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {i.label}
          </dt>
          <dd className="text-sm font-medium text-purple-600 dark:text-purple-400">
            {i.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

/* ---------------------------------------------------------------- carousel */

const SWIPE_THRESHOLD = 60;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

// bg-origin-border: a gradient defaults to the padding box but paints across
// the border box and repeats, so the 1px border shows the opposite end of the
// gradient. Sizing it to the border box leaves nothing to tile.
const navButton =
  "flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md " +
  "border border-white/20 transition-all bg-origin-border hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 " +
  "hover:border-transparent hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-0";

const Arrow = ({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`absolute top-1/2 z-20 -translate-y-1/2 ${
      side === "left" ? "left-3" : "right-3"
    } ${navButton} opacity-0 group-hover/gallery:opacity-100 focus-visible:opacity-100`}
  >
    {side === "left" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
  </button>
);

const Dots = ({
  count,
  index,
  onSelect,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
}) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-md"
  >
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        type="button"
        aria-label={`Go to image ${i + 1}`}
        aria-current={i === index}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(i);
        }}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          i === index
            ? "w-6 bg-gradient-to-r from-purple-500 to-blue-400"
            : "w-1.5 bg-white/50 hover:bg-white/80"
        }`}
      />
    ))}
  </div>
);

const Carousel = ({
  images,
  title,
  imgPos,
  index,
  direction,
  onSelect,
  onStep,
  onZoom,
}: {
  images: string[];
  title: string;
  imgPos?: string;
  index: number;
  direction: number;
  onSelect: (i: number) => void;
  onStep: (d: number) => void;
  onZoom: () => void;
}) => {
  const reduce = useReducedMotion();
  const many = images.length > 1;

  return (
    <div className="group/gallery relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-800">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          className="absolute inset-0"
          custom={direction}
          variants={reduce ? undefined : slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 320, damping: 34 },
            opacity: { duration: 0.18 },
          }}
          drag={many && !reduce ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) onStep(1);
            else if (info.offset.x > SWIPE_THRESHOLD) onStep(-1);
          }}
        >
          <button
            type="button"
            onClick={onZoom}
            aria-label="Open image full screen"
            className="group/zoom absolute inset-0 h-full w-full cursor-zoom-in"
          >
            <Image
              src={images[index]}
              alt={`${title} screenshot ${index + 1} of ${images.length}`}
              fill
              priority={index === 0}
              draggable={false}
              sizes="(max-width: 896px) 100vw, 896px"
              className={`object-cover ${imgPos ?? "object-center"} transition-transform duration-700 ease-out group-hover/zoom:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover/zoom:scale-100`}
            />
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <span className="pointer-events-none absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md opacity-0 transition-opacity group-hover/gallery:opacity-100">
        <Maximize2 size={13} />
        View full image
      </span>

      {many && (
        <>
          <Arrow
            side="left"
            label="Previous image"
            onClick={() => onStep(-1)}
          />
          <Arrow side="right" label="Next image" onClick={() => onStep(1)} />
          <Dots count={images.length} index={index} onSelect={onSelect} />
          <span className="pointer-events-none absolute bottom-3 right-3 z-20 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white backdrop-blur-md">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------- modal */

const ProjectModal = ({
  project,
  onClose,
}: {
  project: ModalProject | null;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [rotation, setRotation] = useState(0);
  const coarse = useCoarsePointer();

  useEffect(() => setMounted(true), []);

  // A rotation belongs to the image the user turned, not to the next one.
  useEffect(() => setRotation(0), [index, zoom]);

  const gallery = useMemo(() => {
    if (!project) return [];
    if (project.images?.length) return project.images;
    return project.image ? [project.image] : [];
  }, [project]);

  // reset the carousel whenever a different project opens
  useEffect(() => {
    setIndex(0);
    setDirection(0);
    if (!project) setZoom(false);
  }, [project]);

  const step = useCallback(
    (d: number) => {
      if (gallery.length < 2) return;
      const next = (index + d + gallery.length) % gallery.length;
      const wrapped = d > 0 ? next < index : next > index;
      setDirection(wrapped ? -d : d);
      setIndex(next);
    },
    [gallery.length, index],
  );

  const select = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index],
  );

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoom) setZoom(false);
        else onClose();
        return;
      }
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose, zoom, step]);

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* header */}
              <div className="relative">
                {gallery.length > 0 ? (
                  <Carousel
                    images={gallery}
                    title={project.title}
                    imgPos={project.imgPos}
                    index={index}
                    direction={direction}
                    onSelect={select}
                    onStep={step}
                    onZoom={() => setZoom(true)}
                  />
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
                      <span className="text-4xl font-extrabold tracking-tight text-white/90 select-none px-6 text-center">
                        {project.title}
                      </span>
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}

                <button
                  onClick={onClose}
                  aria-label="Close"
                  // The lightbox sits above this on a 90% black scrim, where a
                  // second X still shows through and reads as a stray control.
                  className={`absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors ${
                    zoom ? "invisible" : ""
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* body */}
              <div className="p-6 sm:p-8 pb-10 sm:pb-12 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    {project.platforms?.map((p) => (
                      <span
                        key={p}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${platformStyle[p]}`}
                      >
                        {platformLabel[p]}
                      </span>
                    ))}
                  </div>
                  <ProjectMeta
                    role={project.role}
                    engagement={project.engagement}
                    tenure={project.tenure}
                  />
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.longDescription ?? project.description}
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Highlights
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0 text-purple-600 dark:text-purple-400"
                          />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Tech Stack
                  </h4>
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

                {project.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                      >
                        {linkIcon(l.kind)}
                        <span>{l.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* lightbox */}
      <AnimatePresence>
        {project && zoom && gallery.length > 0 && (
          <motion.div
            // A turned image should reach the screen edges, so drop the inset
            // that keeps the upright one clear of the controls.
            className={`fixed inset-0 z-[110] flex items-center justify-center bg-black/90 cursor-zoom-out ${
              rotation % 180 === 0 ? "p-4" : "p-0"
            }`}
            onClick={() => setZoom(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* No close button: tapping outside the image closes, and Escape
                closes. A second X on top of the modal's own read as a bug. */}
            {coarse && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRotation((r) => (r + 90) % 360);
                }}
                aria-label="Rotate image"
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 transition-colors"
              >
                <RotateCwSquare size={20} />
              </button>
            )}

            {gallery.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20 transition-all bg-origin-border hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:border-transparent"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20 transition-all bg-origin-border hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:border-transparent"
                >
                  <ChevronRight size={22} />
                </button>
                <Dots count={gallery.length} index={index} onSelect={select} />
              </>
            )}

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={index}
                src={gallery[index]}
                alt={`${project.title} screenshot ${index + 1} of ${gallery.length}`}
                onClick={(e) => e.stopPropagation()}
                // A rotate transform leaves the layout box alone, so on a
                // quarter turn the box has to be measured against the swapped
                // axes or the turned image spills off screen.
                className={`object-contain shadow-2xl cursor-default ${
                  rotation % 180 === 0
                    ? "max-h-[92vh] max-w-[95vw] rounded-lg"
                    : "max-h-[100vw] max-w-[100vh] rounded-none"
                }`}
                custom={direction}
                initial={{ scale: 0.96, opacity: 0, rotate: rotation }}
                animate={{ scale: 1, opacity: 1, rotate: rotation }}
                exit={{ scale: 0.96, opacity: 0, rotate: rotation }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
};

export default ProjectModal;
