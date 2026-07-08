"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, CheckCircle2, Maximize2 } from "lucide-react";
import { AppleIcon, GooglePlayIcon } from "@/components/brand-icons";

export type ModalLink = {
  label: string;
  href: string;
  kind: "app" | "play" | "site" | "demo";
};

export type ModalProject = {
  title: string;
  image: string | null;
  imgPos?: string;
  role?: string;
  description: string;
  longDescription?: string;
  highlights?: string[];
  stack: string[];
  platforms?: string[];
  links: ModalLink[];
};

const platformStyle: Record<string, string> = {
  ios: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  android: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  web: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
};
const platformLabel: Record<string, string> = { ios: "iOS", android: "Android", web: "Web" };

const linkIcon = (kind: ModalLink["kind"]) => {
  if (kind === "app") return <AppleIcon size={16} />;
  if (kind === "play") return <GooglePlayIcon size={16} />;
  return <ExternalLink size={16} />;
};

const ProjectModal = ({
  project,
  onClose,
}: {
  project: ModalProject | null;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!project) setZoom(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoom) setZoom(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose, zoom]);

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
            {/* header image */}
            <div className="relative h-52 sm:h-60 w-full overflow-hidden rounded-t-2xl">
              {project.image ? (
                <button
                  type="button"
                  onClick={() => setZoom(true)}
                  className="absolute inset-0 h-full w-full cursor-zoom-in group/zoom"
                  aria-label="Open image full screen"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover ${project.imgPos ?? "object-center"} transition-transform duration-500 group-hover/zoom:scale-105`}
                  />
                  <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                    <Maximize2 size={13} />
                    View full image
                  </span>
                </button>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
                  <span className="text-4xl font-extrabold tracking-tight text-white/90 select-none px-6 text-center">
                    {project.title}
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
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
                {project.role && (
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {project.role}
                  </p>
                )}
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
                      <li key={i} className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-300">
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

    <AnimatePresence>
      {project && zoom && project.image && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          onClick={() => setZoom(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => setZoom(false)}
            aria-label="Close image"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 transition-colors"
          >
            <X size={20} />
          </button>
          <motion.img
            src={project.image}
            alt={project.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[95vw] rounded-lg object-contain shadow-2xl cursor-default"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </>,
    document.body
  );
};

export default ProjectModal;
