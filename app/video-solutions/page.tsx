"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  X,
  Play,
  FileText,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { ALL_PROJECTS, TeamProject } from "@/components/WorkCatalogue";

const VIDEO_CATS = [
  "All Video Work",
  "Commercial Video & Ad Production",
  "Motion Design & 2D/3D Animation",
  "Storyboarding & Concept Development",
  "Brand Strategy & Ideation",
  "Storytelling & Visual Direction",
] as const;

export default function VideoSolutionsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Video Work");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<TeamProject | null>(null);

  // Filter only Video Solutions projects
  const videoProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => p.pillar === "Video Solutions");
  }, []);

  const filteredProjects = useMemo(() => {
    return videoProjects.filter((p) => {
      if (activeCategory !== "All Video Work" && p.category !== activeCategory) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const matchesClient = p.client?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCat && !matchesTags && !matchesClient) return false;
      }
      return true;
    });
  }, [videoProjects, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#ffd100] selection:text-black font-sans">
      <Header />

      <main className="relative px-6 pt-32 pb-24 md:px-16 max-w-7xl mx-auto">
        {/* Top Back Link & Badge */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 hover:text-[#111111] transition-colors font-semibold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Studio Overview</span>
          </Link>

          <span className="rounded-full bg-[#ffd100]/25 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#111111] border border-[#ffd100]/50">
            Creative &amp; 3D Department
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="mt-8 border-b border-[#e2e2e2] pb-10">
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#111111]">
            Video &amp; Creative Solutions
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
            From storyboarding and visual direction to motion design, we produce the commercial videos and ad creatives that bring your brand to life.
          </p>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {VIDEO_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "border-[#ffd100] bg-[#ffd100] text-[#111111] shadow-[0_0_15px_rgba(255,209,0,0.4)]"
                    : "border-[#e2e2e2] bg-white text-slate-700 hover:border-slate-400 hover:text-[#111111]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search 3D, films, PDFs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[#e2e2e2] bg-white pl-10 pr-4 py-2.5 text-xs text-[#111111] placeholder:text-slate-400 shadow-xs focus:border-[#ffd100] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#111111]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Video Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#e2e2e2] bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd100] hover:shadow-lg"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
                    <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
                      <span className="rounded-full bg-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ffd100] border border-[#ffd100]/30">
                        {project.category}
                      </span>
                    </div>

                    {/* Video Player */}
                    {project.type === "video" && (
                      <video
                        src={project.mediaUrl}
                        controls
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    )}

                    {/* YouTube Player */}
                    {project.type === "youtube" && (
                      <iframe
                        src={project.mediaUrl}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        title={project.title}
                      />
                    )}

                    {/* Behance Embed */}
                    {project.type === "behance" && (
                      <iframe
                        src={project.mediaUrl}
                        className="h-full w-full border-0"
                        allowFullScreen
                        loading="lazy"
                        allow="clipboard-write"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={project.title}
                      />
                    )}

                    {/* Styleframe Image */}
                    {project.type === "styleframe" && (
                      <div
                        onClick={() => setSelectedProject(project)}
                        className="group/img relative h-full w-full cursor-pointer overflow-hidden"
                      >
                        <img
                          src={project.mediaUrl}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/img:opacity-100 backdrop-blur-xs">
                          <div className="flex items-center gap-2 rounded-full bg-[#ffd100] px-4 py-2 text-xs font-bold text-[#111111] shadow-lg">
                            <ImageIcon className="h-4 w-4" />
                            <span>View Styleframe</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PDF Document */}
                    {project.type === "pdf" && (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 p-6 text-center text-white">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffd100]/20 backdrop-blur-md border border-[#ffd100]/40 text-[#ffd100]">
                          <FileText className="h-7 w-7" />
                        </div>
                        <span className="font-heading text-lg font-bold text-white max-w-xs">
                          {project.title}
                        </span>
                        <a
                          href={project.mediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#ffd100] px-5 py-2 text-xs font-bold text-[#111111] shadow-[0_0_15px_rgba(255,209,0,0.4)] transition-all hover:bg-[#e5a910]"
                        >
                          Open PDF <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Title (Headings only, no descriptions) */}
                  <div className="mt-5">
                    <h3 className="font-heading text-2xl font-bold text-[#111111] transition-colors group-hover:text-[#e5a910]">
                      {project.title}
                    </h3>
                    {project.metrics && (
                      <span className="mt-1 inline-block text-xs font-semibold text-[#e5a910]">
                        {project.metrics}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#e2e2e2] pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 border border-[#e2e2e2]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-[#e5a910]">
                    4K Cinematic Pipeline
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Styleframe Lightbox Modal */}
        <AnimatePresence>
          {selectedProject && selectedProject.type === "styleframe" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8 backdrop-blur-md"
            >
              <div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl border border-[#333333] bg-[#111111] p-4 text-white">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
                <img
                  src={selectedProject.mediaUrl}
                  alt={selectedProject.title}
                  className="max-h-[75vh] w-auto object-contain rounded-2xl mx-auto"
                />
                <div className="mt-4 p-2 text-center">
                  <span className="text-xs text-[#ffd100] font-semibold">
                    {selectedProject.category}
                  </span>
                  <h4 className="font-heading text-2xl font-bold text-white mt-1">
                    {selectedProject.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Booking Section */}
        <div className="mt-24 border-t border-[#e2e2e2] pt-16">
          <Contact />
        </div>
      </main>
    </div>
  );
}
