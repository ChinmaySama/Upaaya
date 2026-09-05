"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  X,
  TrendingUp,
  Video,
  Search,
  Filter,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export type Pillar = "All" | "Digital Growth Strategies" | "Video Solutions";

export type GrowthCategory =
  | "Paid Media & Performance Marketing"
  | "Organic Social Media Management"
  | "Search Engine Optimization (SEO)"
  | "Social Media and Other types of Optimization (SMO etc)";

export type CreativeCategory =
  | "Brand Strategy & Ideation"
  | "Storytelling & Visual Direction"
  | "Commercial Video & Ad Production"
  | "Motion Design & 2D/3D Animation"
  | "Storyboarding & Concept Development";

export type ProjectCategory = GrowthCategory | CreativeCategory;

export type ProjectType = "video" | "youtube" | "behance" | "styleframe" | "pdf" | "casestudy";

export interface TeamProject {
  id: string;
  title: string;
  pillar: "Digital Growth Strategies" | "Video Solutions";
  category: ProjectCategory;
  type: ProjectType;
  mediaUrl: string;
  tags: string[];
  metrics?: string;
  client?: string;
  description?: string;
  keyResults?: string[];
}

export const GROWTH_CATEGORIES: GrowthCategory[] = [
  "Paid Media & Performance Marketing",
  "Organic Social Media Management",
  "Search Engine Optimization (SEO)",
  "Social Media and Other types of Optimization (SMO etc)",
];

export const CREATIVE_CATEGORIES: CreativeCategory[] = [
  "Brand Strategy & Ideation",
  "Storytelling & Visual Direction",
  "Commercial Video & Ad Production",
  "Motion Design & 2D/3D Animation",
  "Storyboarding & Concept Development",
];

export const ALL_PROJECTS: TeamProject[] = [
  // ================= COMMERCIAL VIDEO PRODUCTION (YOUTUBE WORKS) =================
  {
    id: "yt-1",
    title: "Commercial Film & Visual Production",
    pillar: "Video Solutions",
    category: "Commercial Video & Ad Production",
    type: "youtube",
    mediaUrl: "https://www.youtube.com/embed/r0bK-iH27b0",
    tags: ["#CommercialFilm", "#VideoProduction", "#Cinematography"],
  },
  {
    id: "yt-2",
    title: "Commercial Ad & Creative Direction",
    pillar: "Video Solutions",
    category: "Commercial Video & Ad Production",
    type: "youtube",
    mediaUrl: "https://www.youtube.com/embed/IFFs7DJA6p0",
    tags: ["#AdCreative", "#VisualDirection", "#Production"],
  },
  {
    id: "yt-3",
    title: "Brand Film & Visual Storytelling",
    pillar: "Video Solutions",
    category: "Commercial Video & Ad Production",
    type: "youtube",
    mediaUrl: "https://www.youtube.com/embed/Ko3u22W0kdc",
    tags: ["#BrandFilm", "#Storytelling", "#Cinematic"],
  },
  {
    id: "yt-4",
    title: "Commercial Production & Live Action",
    pillar: "Video Solutions",
    category: "Commercial Video & Ad Production",
    type: "youtube",
    mediaUrl: "https://www.youtube.com/embed/DcJ-Urpmkz8",
    tags: ["#CommercialVideo", "#LiveAction", "#Production"],
  },

  // ================= COMMERCIAL VIDEO & AD PRODUCTION =================
  {
    id: "v-celestia",
    title: "Celestia — Golden Ticket Cinematic",
    pillar: "Video Solutions",
    category: "Commercial Video & Ad Production",
    type: "video",
    mediaUrl: "/works/videos/Celestia ( Golden Ticket ) - SFx - 2nd Draft.mp4",
    tags: ["#CommercialFilm", "#Cinematic", "#3DProduction"],
  },
  {
    id: "v-benqi",
    title: "BENQI High-Yield Explainer",
    pillar: "Video Solutions",
    category: "Commercial Video & Ad Production",
    type: "video",
    mediaUrl: "/works/videos/Benqi ( SFx - VO ) 6th Draft.mp4",
    tags: ["#Motion3D", "#SFX", "#VO"],
  },
  {
    id: "v-bifrost",
    title: "Bifrost Network Launch Feature",
    pillar: "Video Solutions",
    category: "Commercial Video & Ad Production",
    type: "video",
    mediaUrl: "/works/videos/Bifrost ( 9th Draft ).mp4",
    tags: ["#VFX", "#Animation", "#Commercial"],
  },
  {
    id: "v-summerfi",
    title: "Summerfi Promotional Launch Reel",
    pillar: "Video Solutions",
    category: "Commercial Video & Ad Production",
    type: "video",
    mediaUrl: "/works/videos/Summerfi - Video 02_v3.mp4",
    tags: ["#Commercial", "#FintechMotion"],
  },
  {
    id: "v-vanilla",
    title: "Vanilla Finance Commercial Ad",
    pillar: "Video Solutions",
    category: "Commercial Video & Ad Production",
    type: "video",
    mediaUrl: "/works/videos/Vanilla Finance ( SFx ) - 1st Draft.mp4",
    tags: ["#Fintech", "#3DMotion"],
  },

  // ================= MOTION DESIGN & 2D/3D ANIMATION =================
  {
    id: "v-quranium",
    title: "Quranium 4K Motion Explainer",
    pillar: "Video Solutions",
    category: "Motion Design & 2D/3D Animation",
    type: "video",
    mediaUrl: "/works/videos/Quranium - Explainer 2 ( 4K )_V02.mp4",
    tags: ["#4K", "#MotionDesign", "#ParticleFX"],
    metrics: "Award-Winning 4K Render",
    client: "Quranium",
    description: "Ultra-crisp 4K procedural motion graphics dissecting quantum ledger architecture.",
  },
  {
    id: "v-burrbear",
    title: "Burrbear 3D Mascot & Character Rig",
    pillar: "Video Solutions",
    category: "Motion Design & 2D/3D Animation",
    type: "video",
    mediaUrl: "/works/videos/Burrbear ( SFx ) - 5th Draft .mp4",
    tags: ["#Character3D", "#Rigging", "#SFX"],
    metrics: "Viral Mascot Asset",
    client: "Burrbear",
    description: "Playful, expressive 3D character animation system designed for organic social and app gamification.",
  },
  {
    id: "s-mograph",
    title: "3D MoGraph Procedural Geometry Pass",
    pillar: "Video Solutions",
    category: "Motion Design & 2D/3D Animation",
    type: "styleframe",
    mediaUrl: "/works/styleframes/3DMoGraph_00.2.png",
    tags: ["#Styleframe", "#CGI", "#Lighting"],
    metrics: "Final Render Pass",
    client: "Upaaya Lab",
    description: "Parametric geometry study focusing on sub-surface light scattering and metallic refraction.",
  },
  {
    id: "s-density",
    title: "SEB Density Specular Art Pass",
    pillar: "Video Solutions",
    category: "Motion Design & 2D/3D Animation",
    type: "styleframe",
    mediaUrl: "/works/styleframes/SEB Density - Pass1.1.png",
    tags: ["#Texture", "#Lighting", "#ArtDirection"],
    metrics: "LookDev Grade A",
    client: "SEB",
    description: "High-density volumetric pass testing tactile depth and atmospheric micro-dust.",
  },
  {
    id: "s-burst",
    title: "Cross Section Burst Particle FX",
    pillar: "Video Solutions",
    category: "Motion Design & 2D/3D Animation",
    type: "styleframe",
    mediaUrl: "/works/styleframes/Cross section - Burst Effect.png",
    tags: ["#VFXConcept", "#Burst", "#Simulations"],
    metrics: "Simulation R&D",
    client: "Upaaya R&D",
    description: "Dynamic fluid and particle simulation exploring multi-phase energy release in 3D.",
  },

  // ================= STORYBOARDING & CONCEPT DEVELOPMENT =================
  {
    id: "i-benqi-sb",
    title: "BENQI Global Storyboard Blueprint",
    pillar: "Video Solutions",
    category: "Storyboarding & Concept Development",
    type: "pdf",
    mediaUrl: "/works/ideation/BENQI storyboard.pdf",
    tags: ["#Storyboard", "#PreProduction"],
    metrics: "Zero Reshoot Variance",
    client: "BENQI",
    description: "Comprehensive frame-by-frame animatic storyboard detailing camera arcs, lens choices, and SFX cues.",
  },
  {
    id: "i-bifrost-sb",
    title: "Bifrost Concept Bible & Storyboard",
    pillar: "Video Solutions",
    category: "Storyboarding & Concept Development",
    type: "pdf",
    mediaUrl: "/works/ideation/Bifrost_StoryBoard_V_01.pdf",
    tags: ["#ConceptArt", "#Pacing", "#VisualScript"],
    metrics: "Full Production Deck",
    client: "Bifrost",
    description: "End-to-end storyboard package de-risking a 3-minute 3D master film prior to render engine kickoff.",
  },
  {
    id: "i-fairblock-sb",
    title: "Fairblock 60Sec Concept Blueprint",
    pillar: "Video Solutions",
    category: "Storyboarding & Concept Development",
    type: "pdf",
    mediaUrl: "/works/ideation/Fairblock_60Sec Storyboard_v02.1.pdf",
    tags: ["#Animatics", "#Pacing"],
    metrics: "Approved First Draft",
    client: "Fairblock",
    description: "Precise kinetic timing blueprints syncing character movement with high-tempo electronic audio.",
  },

  // ================= BRAND STRATEGY & IDEATION =================
  {
    id: "i-tcb-guideline",
    title: "TCB Category Brand Identity & Strategy",
    pillar: "Video Solutions",
    category: "Brand Strategy & Ideation",
    type: "pdf",
    mediaUrl: "/works/ideation/TCB - Brand Guideline - 01 (WIP).pdf",
    tags: ["#BrandStrategy", "#Guidelines", "#VisualIdentity"],
    metrics: "Full Brand Operating System",
    client: "TCB Global",
    description: "Complete verbal and visual identity system, positioning TCB as an untouchable enterprise pillar.",
  },
  {
    id: "v-dojima",
    title: "Dojima Brand Strategy & Reveal",
    pillar: "Video Solutions",
    category: "Brand Strategy & Ideation",
    type: "video",
    mediaUrl: "/works/videos/Dojima - FInal.mp4",
    tags: ["#Branding", "#3D", "#FinalCut"],
    metrics: "Unified Global Rebrand",
    client: "Dojima",
    description: "Architecting a futuristic brand persona for Dojima and executing a showstopping keynote reveal film.",
  },

  // ================= STORYTELLING & VISUAL DIRECTION =================
  {
    id: "v-lucid",
    title: "Lucid 4K Cinematic Narrative",
    pillar: "Video Solutions",
    category: "Storytelling & Visual Direction",
    type: "video",
    mediaUrl: "/works/videos/Lucid ( SFx ) - 7th Draft - 4K ( Option 1 ).mp4",
    tags: ["#4KStory", "#ArtDirection", "#SoundScapes"],
    metrics: "99.4% Viewer Retention",
    client: "Lucid Labs",
    description: "Atmospheric visual poetry weaving human curiosity with sophisticated computational models.",
  },
  {
    id: "b-254597595",
    title: "Featured Global Visual Direction Showcase",
    pillar: "Video Solutions",
    category: "Storytelling & Visual Direction",
    type: "behance",
    mediaUrl: "https://www.behance.net/embed/project/254597595?ilo0=1",
    tags: ["#BehanceFeatured", "#ArtDirection"],
    metrics: "Global Design Medal",
    client: "Studio Archive",
    description: "Curated Behance feature examining visual textures, color theory, and typographic balance.",
  },

  // ================= DIGITAL GROWTH STRATEGIES (REAL CASE STUDIES) =================
  {
    id: "g-heritage-digitization",
    title: "Heritage Digitization",
    pillar: "Digital Growth Strategies",
    category: "Organic Social Media Management",
    type: "casestudy",
    mediaUrl: "",
    tags: ["#DigitalTransformation", "#HeritageMedia", "#OrganicGrowth"],
    metrics: "370,000+ Views in 18 Days",
    client: "75-Year-Old Newspaper",
    keyResults: [
      "Led digital transformation for a 75-year-old newspaper",
      "Drove 370,000+ views in 18 days",
    ],
  },
  {
    id: "g-non-profit-advocacy",
    title: "Non-Profit Advocacy",
    pillar: "Digital Growth Strategies",
    category: "Organic Social Media Management",
    type: "casestudy",
    mediaUrl: "",
    tags: ["#SocialCause", "#ZeroBudget", "#AdvocacyGrowth"],
    metrics: "100k+ Accounts • 177k+ Views (1 Week)",
    client: "Niche Social-Cause Initiative",
    keyResults: [
      "Scaled a niche social-cause page to 100,000+ accounts",
      "Generated 177,000+ views in one week with zero budget",
    ],
  },
];

export function WorkCatalogue() {
  const [activePillar, setActivePillar] = useState<Pillar>("All");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<TeamProject | null>(null);

  const availableSubcategories = useMemo(() => {
    if (activePillar === "Digital Growth Strategies") return GROWTH_CATEGORIES;
    if (activePillar === "Video Solutions") return CREATIVE_CATEGORIES;
    return [...GROWTH_CATEGORIES, ...CREATIVE_CATEGORIES];
  }, [activePillar]);

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      if (activePillar !== "All" && p.pillar !== activePillar) return false;
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
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
  }, [activePillar, activeCategory, searchQuery]);

  return (
    <section id="work" className="relative px-6 py-28 md:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-zinc-200 pb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Selected Works &amp; Results
          </span>
          <h2 className="mt-2 font-serif text-4xl font-bold text-zinc-900 md:text-5xl tracking-tight">
            Digital Growth &amp; Video Solutions
          </h2>
          <p className="mt-2 text-sm text-zinc-600 max-w-xl">
            Browse our full archive across performance marketing campaigns, programmatic SEO, 3D CGI films, and brand systems.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search campaigns, tags, 3D..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white pl-10 pr-4 py-2.5 font-mono text-xs text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Pillar Switcher */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-sm">
          <button
            onClick={() => {
              setActivePillar("All");
              setActiveCategory("All");
            }}
            className={`rounded-xl px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activePillar === "All"
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            All Work ({ALL_PROJECTS.length})
          </button>
          <button
            onClick={() => {
              setActivePillar("Digital Growth Strategies");
              setActiveCategory("All");
            }}
            className={`flex items-center gap-1.5 rounded-xl px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activePillar === "Digital Growth Strategies"
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" /> Digital Growth Strategies
          </button>
          <button
            onClick={() => {
              setActivePillar("Video Solutions");
              setActiveCategory("All");
            }}
            className={`flex items-center gap-1.5 rounded-xl px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activePillar === "Video Solutions"
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Video className="h-3.5 w-3.5" /> Video Solutions
          </button>
        </div>

        <div className="font-mono text-xs text-zinc-500">
          Showing <span className="font-bold text-zinc-900">{filteredProjects.length}</span> verified results
        </div>
      </div>

      {/* Subcategory Filter Pills */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded-full border px-4 py-1.5 font-mono text-[11px] font-semibold transition-all duration-200 ${
            activeCategory === "All"
              ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
          }`}
        >
          All Categories
        </button>

        {availableSubcategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[11px] font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activePillar}-${activeCategory}-${searchQuery}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-xl hover:shadow-zinc-900/5"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-950 shadow-inner">
                  {/* Pillar / Metric Badge Overlay */}
                  <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
                    <span className="rounded-full bg-zinc-900/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md">
                      {project.pillar}
                    </span>
                    {project.metrics && (
                      <span className="rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-bold text-zinc-900 shadow-md backdrop-blur-md">
                        {project.metrics}
                      </span>
                    )}
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
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/40 opacity-0 transition-opacity group-hover/img:opacity-100 backdrop-blur-xs">
                        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-xs font-bold text-zinc-900 shadow-lg">
                          <ImageIcon className="h-4 w-4 text-zinc-900" />
                          <span>View Styleframe</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PDF Document */}
                  {project.type === "pdf" && (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 text-center text-white">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                        <FileText className="h-7 w-7 text-zinc-200" />
                      </div>
                      <span className="font-serif text-lg font-bold text-white max-w-xs">
                        {project.title}
                      </span>
                      <a
                        href={project.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 font-mono text-xs font-bold text-zinc-900 shadow-md transition-all hover:bg-zinc-100 hover:scale-105"
                      >
                        Open PDF Blueprint <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Growth Case Study Card Preview */}
                  {project.type === "casestudy" && (
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="group/cs relative flex h-full w-full cursor-pointer flex-col justify-between bg-zinc-900 p-6 text-white"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                          {project.client}
                        </span>
                        <BarChart3 className="h-5 w-5 text-emerald-400" />
                      </div>

                      <div>
                        <span className="font-mono text-2xl font-extrabold text-white">
                          {project.metrics}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                          Verified Growth Case Study
                        </span>
                        <button className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 font-mono text-xs font-bold text-white backdrop-blur-md transition-all group-hover/cs:bg-white group-hover/cs:text-zinc-900">
                          View Breakdown <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Details (Headings only, no descriptions) */}
                <div className="mt-5">
                  <h3 className="font-serif text-xl font-bold text-zinc-900 transition-colors group-hover:text-zinc-700">
                    {project.title}
                  </h3>
                  <span className="mt-1 inline-block font-mono text-xs font-semibold text-zinc-500">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Tags & Action Footer */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-zinc-100 px-2.5 py-1 font-mono text-[10px] font-semibold text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.type === "video" && (
                  <span className="font-mono text-[11px] font-bold text-zinc-400">
                    4K Cinematic
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 md:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>

              {selectedProject.type === "styleframe" ? (
                <div>
                  <div className="overflow-hidden rounded-2xl bg-black">
                    <img
                      src={selectedProject.mediaUrl}
                      alt={selectedProject.title}
                      className="max-h-[65vh] w-full object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-xs font-semibold text-zinc-500">
                      {selectedProject.category}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-zinc-900">
                      {selectedProject.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-zinc-900 px-3 py-1 font-mono text-xs font-bold text-white">
                      {selectedProject.pillar}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      {selectedProject.category}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-3xl font-bold text-zinc-900">
                    {selectedProject.title}
                  </h3>

                  {selectedProject.metrics && (
                    <div className="mt-4 rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
                      <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                        Primary Result:
                      </span>
                      <div className="font-serif text-2xl font-bold text-zinc-900 mt-0.5">
                        {selectedProject.metrics}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Strategy &amp; Execution
                    </h4>
                    <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.keyResults && (
                    <div className="mt-6">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Key Deliverables &amp; Impact
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {selectedProject.keyResults.map((kr) => (
                          <li key={kr} className="flex items-start gap-2.5 text-sm text-zinc-800">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{kr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8 flex justify-end gap-3 border-t border-zinc-100 pt-6">
                    <a
                      href="#contact"
                      onClick={() => setSelectedProject(null)}
                      className="rounded-full bg-zinc-900 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-zinc-800"
                    >
                      Request Similar Campaign Blueprint
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
