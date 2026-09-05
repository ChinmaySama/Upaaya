"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Palette,
  Target,
  Share2,
  Search,
  Sliders,
  Compass,
  Film,
  Video,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const GROWTH_SERVICES = [
  {
    id: "paid-media",
    title: "Paid Media & Performance Marketing",
    icon: Target,
    badge: "Scale & ROAS",
    summary:
      "Data-driven multi-channel acquisition across Meta, Google, TikTok, LinkedIn, and programmatic networks tuned for sub-dollar CAC and compounding ROAS.",
    deliverables: [
      "Full-Funnel Paid Acquisition",
      "Dynamic Creative Optimization (DCO)",
      "Omnichannel Attribution Modeling",
      "High-Converting Landing Pages",
    ],
    metric: "4.8x Avg ROAS",
  },
  {
    id: "organic-social",
    title: "Organic Social Media Management",
    icon: Share2,
    badge: "Audience & Community",
    summary:
      "Algorithm-native social distribution, cult-like community nurturing, and trend-jacking systems that generate tens of millions of organic views without ad spend.",
    deliverables: [
      "Viral Short-Form Content (Reels/TikTok/Shorts)",
      "Daily Community Management",
      "Executive Ghostwriting & Thought Leadership",
      "Growth Loops & Referral Mechanics",
    ],
    metric: "48M+ Organic Views",
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    icon: Search,
    badge: "High-Intent Inbound",
    summary:
      "Technical infrastructure audits, programmatic content engines, and high-authority digital PR designed to dominate high-value commercial search queries.",
    deliverables: [
      "Technical Core Web Vitals Audits",
      "Semantic & Keyword Architecture",
      "Programmatic SEO Pipelines",
      "Authority Backlink Engineering",
    ],
    metric: "Top #1 Keyword Ranks",
  },
  {
    id: "smo",
    title: "Social Media and Other types of Optimization (SMO etc)",
    icon: Sliders,
    badge: "Channel Optimization",
    summary:
      "Holistic conversion rate optimization (CRO), app store optimization (ASO), and social algorithm tuning to maximize every touchpoint across the funnel.",
    deliverables: [
      "Conversion Rate Optimization (CRO)",
      "App Store & Platform Optimization (ASO)",
      "Viral Coefficient Tuning",
      "A/B Multivariate Funnel Testing",
    ],
    metric: "+48% Conversion Lift",
  },
];

export const CREATIVE_SERVICES = [
  {
    id: "brand-strategy",
    title: "Brand Strategy & Ideation",
    icon: Compass,
    badge: "Core Positioning",
    summary:
      "Category design, unmistakable brand positioning, and proprietary narrative frameworks that turn ambitious companies into magnetic market leaders.",
    deliverables: [
      "Category Design & Market Positioning",
      "Brand Narrative & Messaging Hierarchy",
      "Naming, Verbal Identity & Tone of Voice",
      "Competitive Moat Architecture",
    ],
    metric: "100% Differentiation",
  },
  {
    id: "storytelling",
    title: "Storytelling & Visual Direction",
    icon: Film,
    badge: "Cinematic Aesthetic",
    summary:
      "World-building, art direction, and visceral visual narratives that trigger emotional resonance and forge lasting consumer loyalty.",
    deliverables: [
      "Visual Identity Systems & Brand Books",
      "Art Direction & World-Building Guidelines",
      "Cinematic Narrative Architecture",
      "Campaign Moodboarding & Design Archetypes",
    ],
    metric: "Award-Grade Aesthetics",
  },
  {
    id: "commercial-video",
    title: "Commercial Video & Ad Production",
    icon: Video,
    badge: "Live Action & Film",
    summary:
      "End-to-end commercial film production with cinematic cameras, elite directors, and sound design tailored for TV, streaming, and high-impact digital ads.",
    deliverables: [
      "Live Action Commercial Direction",
      "Studio & Location Cinematography",
      "Voiceover, Foley & Sound Design",
      "Cross-Platform High-Res Deliverables",
    ],
    metric: "Cinema-Standard 4K",
  },
  {
    id: "motion-design",
    title: "Motion Design & 2D/3D Animation",
    icon: Layers,
    badge: "Hyper-Realistic CGI",
    summary:
      "Cutting-edge 3D product visualization, stylized motion design, and photorealistic particle simulations that captivate audiences within milliseconds.",
    deliverables: [
      "Hyper-Realistic 3D Product CGI",
      "Abstract Procedural Motion Graphics",
      "Character & Mascot 3D Animation",
      "Interactive UI Micro-Interactions",
    ],
    metric: "300+ 3D Assets Built",
  },
  {
    id: "storyboarding",
    title: "Storyboarding & Concept Development",
    icon: Sparkles,
    badge: "Pre-Visualization",
    summary:
      "Shot-by-shot hand-drawn storyboards, animatics, and visual script blueprints that de-risk massive productions before a single frame is rendered.",
    deliverables: [
      "Shot-by-Shot Frame Storyboards",
      "Animatic Timing & Rhythm Prototyping",
      "Concept Art & Character Turnarounds",
      "Director's Treatment & Pitch Decks",
    ],
    metric: "Zero Production Waste",
  },
];

export function ServicesSection() {
  const [activePillar, setActivePillar] = useState<"growth" | "creative">("growth");

  return (
    <section id="services" className="relative px-6 py-28 md:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 font-mono text-xs font-semibold text-zinc-800 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-zinc-900" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="mt-4 font-serif text-3xl font-bold text-zinc-900 md:text-5xl tracking-tight">
          Engineered for Hyper-Growth. Crafted with Cinematic Soul.
        </h2>
        <p className="mt-4 text-zinc-600 text-sm md:text-base leading-relaxed">
          We eliminate the gap between ruthless performance marketing metrics and unforgettable creative artistry. Explore our two specialized powerhouses.
        </p>

        {/* Dual Pillar Switcher */}
        <div className="mt-8 inline-flex rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-sm">
          <button
            onClick={() => setActivePillar("growth")}
            className={`flex items-center gap-2 rounded-xl px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activePillar === "growth"
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <TrendingUp className="h-4 w-4" /> Growth Engine
          </button>
          <button
            onClick={() => setActivePillar("creative")}
            className={`flex items-center gap-2 rounded-xl px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activePillar === "creative"
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Palette className="h-4 w-4" /> Creative Studio
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePillar}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {(activePillar === "growth" ? GROWTH_SERVICES : CREATIVE_SERVICES).map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg hover:shadow-zinc-900/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-[11px] font-semibold text-zinc-800">
                      {service.metric}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-bold text-zinc-900">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-zinc-100 pt-5">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      Key Deliverables:
                    </span>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-zinc-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-4">
                  <span className="font-mono text-xs text-zinc-800 font-semibold">
                    {service.badge}
                  </span>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-900 transition-colors hover:text-zinc-600"
                  >
                    Explore Case Studies <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
