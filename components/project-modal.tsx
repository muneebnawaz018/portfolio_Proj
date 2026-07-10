"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const useBackToClose = (layer: string, open: boolean, close: () => void) => {
  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    if (!open) return;
    const tagged = () => window.history.state?.overlay === layer;

    window.history.pushState({ overlay: layer }, "");
    const onPop = () => {
      if (!tagged()) closeRef.current();
    };
    window.addEventListener("popstate", onPop);

    return () => {
      window.removeEventListener("popstate", onPop);
      // Closed from the UI rather than by going back, so our entry is still on
      // the stack. Drop it, or the next back press would be swallowed.
      if (tagged()) window.history.back();
    };
  }, [layer, open]);
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
  className = "",
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  className?: string;
}) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className={`absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-md ${className}`}
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
  const [chrome, setChrome] = useState(true);
  const panned = useRef(false);
  const coarse = useCoarsePointer();

  useEffect(() => setMounted(true), []);

  // Rotation survives paging: once the user turns the phone's worth of screen
  // sideways they want to stay there. Closing the lightbox puts it back, and
  // so does it bring back any controls the user tapped away.
  useEffect(() => {
    setRotation(0);
    setChrome(true);
  }, [zoom]);

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

  // Back closes the lightbox first, then the modal, one press each.
  useBackToClose("modal", !!project, onClose);
  useBackToClose("lightbox", zoom, () => setZoom(false));

  const turned = rotation % 180 !== 0;

  // Tapping the photo hides the controls, the way a phone's own viewer does.
  // A mouse has hover to reveal things with, so it keeps them on screen.
  const chromeClass = `transition-opacity duration-200 ${
    coarse && !chrome ? "opacity-0 pointer-events-none" : "opacity-100"
  }`;

  /** A pan reports screen pixels, but the stage under the finger may be turned.
   *  Project the drag back onto the stage's own x axis so a swipe along the
   *  image always pages, whichever way up the image is. */
  const swipe = useCallback(
    (offset: { x: number; y: number }) => {
      const rad = (rotation * Math.PI) / 180;
      const along = offset.x * Math.cos(rad) + offset.y * Math.sin(rad);
      if (along < -SWIPE_THRESHOLD) step(1);
      else if (along > SWIPE_THRESHOLD) step(-1);
    },
    [rotation, step],
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
              className="relative z-10 w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800"
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
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
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

                    {project.links.length > 0 && (
                      <div className="flex flex-wrap items-center justify-end gap-2 ml-auto">
                        {project.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                          >
                            {linkIcon(l.kind)}
                            <span>{l.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* lightbox */}
      <AnimatePresence>
        {project && zoom && gallery.length > 0 && (
          <motion.div
            // dvh, not vh: on a phone `100vh` is the viewport with the address
            // bar hidden, so a vh-tall box runs off the bottom of the screen and
            // takes the controls pinned to its edges with it.
            className="fixed inset-x-0 top-0 z-[110] overflow-hidden bg-black/90 cursor-zoom-out"
            style={{ height: "100dvh" }}
            onClick={() => setZoom(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* The whole stage turns, not just the image, so the arrows, the
                dots and the swipe axis stay where the eye expects them once
                the phone is held sideways. Its box takes the swapped viewport
                axes, because a rotate transform never resizes the layout box. */}
            <div
              className="absolute left-1/2 top-1/2 flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                width: turned ? "100dvh" : "100vw",
                height: turned ? "100vw" : "100dvh",
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
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
                  className={`absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 ${chromeClass}`}
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
                    className={`absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20 transition-all bg-origin-border hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:border-transparent ${chromeClass}`}
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    aria-label="Next image"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    className={`absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20 transition-all bg-origin-border hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:border-transparent ${chromeClass}`}
                  >
                    <ChevronRight size={22} />
                  </button>
                  <Dots
                    count={gallery.length}
                    index={index}
                    onSelect={select}
                    className={chromeClass}
                  />
                </>
              )}

              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={index}
                  src={gallery[index]}
                  alt={`${project.title} screenshot ${index + 1} of ${gallery.length}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    // A swipe ends in a click too. Only a real tap, one that
                    // travelled nowhere, should toggle the controls.
                    if (coarse && !panned.current) setChrome((c) => !c);
                  }}
                  // onPanStart never runs for a tap, so the flag has to clear on
                  // the press itself or the last swipe would suppress the tap.
                  onPointerDown={() => (panned.current = false)}
                  onPan={(_, info) => {
                    if (Math.hypot(info.offset.x, info.offset.y) > 10)
                      panned.current = true;
                  }}
                  onPanEnd={(_, info) => swipe(info.offset)}
                  draggable={false}
                  // touch-none: the browser claims horizontal drags for its own
                  // gestures otherwise, and the pan never reaches us.
                  // Turned, the image gives up its margin and fills the screen.
                  className={`touch-none object-contain shadow-2xl cursor-default ${
                    turned
                      ? "max-h-full max-w-full"
                      : "max-h-[92%] max-w-[95%] rounded-lg"
                  }`}
                  custom={direction}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
};

export default ProjectModal;
