"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  X,
  TrendingUp,
  Target,
  Share2,
  Sliders,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { ALL_PROJECTS, TeamProject } from "@/components/WorkCatalogue";

const GROWTH_CATS = [
  "All Growth Work",
  "Paid Media & Performance Marketing",
  "Organic Social Media Management",
  "Search Engine Optimization (SEO)",
  "Social Media and Other types of Optimization (SMO etc)",
] as const;

export default function DigitalGrowthPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Growth Work");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<TeamProject | null>(null);

  // Filter only Digital Growth projects
  const growthProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => p.pillar === "Digital Growth Strategies");
  }, []);

  const filteredProjects = useMemo(() => {
    return growthProjects.filter((p) => {
      if (activeCategory !== "All Growth Work" && p.category !== activeCategory) return false;
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
  }, [growthProjects, activeCategory, searchQuery]);

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
            Growth Department
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="mt-8 border-b border-[#e2e2e2] pb-10">
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#111111]">
            Strategic Digital Growth
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
            your growth, our responsibility. We build strategic pathways that elevate your brand&apos;s digital footprint and capture your ideal audience at exactly the right time
          </p>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {GROWTH_CATS.map((cat) => (
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
              placeholder="Search growth case studies..."
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

        {/* Growth Projects Grid */}
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
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#e2e2e2] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd100] hover:shadow-lg cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#e5a910]">
                      {project.client}
                    </span>
                    <BarChart3 className="h-5 w-5 text-[#e5a910]" />
                  </div>

                  <h3 className="mt-4 font-heading text-2xl font-bold text-[#111111] transition-colors group-hover:text-[#e5a910]">
                    {project.title}
                  </h3>

                  <span className="mt-1 inline-block text-xs font-semibold text-slate-500">
                    {project.category}
                  </span>

                  {project.metrics && (
                    <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-[#e2e2e2]">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Primary Result:
                      </span>
                      <div className="font-heading text-2xl font-bold text-[#111111] mt-0.5">
                        {project.metrics}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#e2e2e2] pt-4">
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

                  <button className="flex items-center gap-1.5 text-xs font-bold text-[#111111] group-hover:text-[#e5a910]">
                    <span>View Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Case Study Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 md:p-8 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#e2e2e2] bg-white p-6 md:p-8 shadow-2xl text-[#111111]"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:text-[#111111] hover:bg-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#ffd100] px-3 py-1 text-xs font-bold text-[#111111]">
                    Digital Growth
                  </span>
                  <span className="text-xs text-slate-500">
                    {selectedProject.category}
                  </span>
                </div>

                <h3 className="mt-3 font-heading text-3xl font-bold text-[#111111]">
                  {selectedProject.title}
                </h3>

                {selectedProject.metrics && (
                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-[#e2e2e2]">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Primary Result:
                    </span>
                    <div className="font-heading text-2xl font-bold text-[#111111] mt-0.5">
                      {selectedProject.metrics}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Strategy &amp; Execution
                  </h4>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.keyResults && (
                  <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Deliverables &amp; Impact
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {selectedProject.keyResults.map((kr) => (
                        <li key={kr} className="flex items-start gap-2.5 text-sm text-slate-800">
                          <CheckCircle2 className="h-4 w-4 text-[#e5a910] mt-0.5 flex-shrink-0" />
                          <span>{kr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 flex justify-end gap-3 border-t border-[#e2e2e2] pt-6">
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-[#ffd100] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#111111] shadow-[0_0_20px_rgba(255,209,0,0.4)] hover:bg-[#e5a910]"
                  >
                    Request Similar Growth Blueprint
                  </a>
                </div>
              </motion.div>
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
