"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, ArrowRight, Compass, Film, Video, Layers, Sparkles } from "lucide-react";
import { ReelOverlay } from "@/components/ReelOverlay";

export function VideoSolutionsSection() {
  const [reelOpen, setReelOpen] = useState(false);

  return (
    <section
      id="video-solutions"
      className="relative min-h-screen w-full bg-[#111111] text-white flex flex-col lg:flex-row overflow-hidden border-t border-[#222222]"
    >
      {/* LEFT COLUMN: 4K Cinematic Video Preview */}
      <div
        onClick={() => setReelOpen(true)}
        className="group relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen cursor-pointer overflow-hidden bg-black flex items-center justify-center order-1"
      >
        {/* Looping 4K Background Video */}
        <video
          src="/works/videos/Celestia ( Golden Ticket ) - SFx - 2nd Draft.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
        />

        {/* Pixel Mesh Halftone Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 209, 0, 0.4) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Circular Translucent Play Button with #ffd100 Accent */}
        <div className="relative z-10 flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#ffd100] group-hover:bg-[#ffd100] group-hover:text-black group-hover:shadow-[0_0_35px_rgba(255,209,0,0.5)] shadow-2xl">
          <Play className="h-9 w-9 md:h-11 md:w-11 fill-current ml-1 text-white group-hover:text-black transition-colors" />
        </div>

        {/* Corner Badge */}
        <div className="absolute bottom-6 left-6 z-10 rounded-full bg-black/80 px-4 py-1.5 text-[11px] uppercase tracking-wider text-[#ffd100] backdrop-blur-md border border-[#ffd100]/30 font-sans font-semibold">
          ● Master 4K Showreel
        </div>
      </div>

      {/* RIGHT COLUMN: Info Panel */}
      <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-between bg-[#111111] p-8 md:p-16 lg:p-20 order-2">
        <div>
          {/* Section Kicker with #e5a910 Accent Line */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#e5a910] font-semibold">
              // Cinematic Precision &amp; Storytelling
            </span>
            <div className="h-0.5 w-12 bg-[#ffd100] shadow-[0_0_10px_#ffd100]" />
          </div>

          {/* Bold Geometric Headline (Syne) */}
          <h2 className="mt-8 font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] text-white tracking-tight">
            Video and
            <br />
            creative solutions.
          </h2>

          {/* Body Paragraph (Inter) */}
          <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
            From storyboarding and visual direction to motion design, we produce the commercial videos and ad creatives that bring your brand to life.
          </p>

          {/* 5 Video & Creative Disciplines */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-[#222222] pt-8">
            <div className="flex items-start gap-3.5">
              <Compass className="h-5 w-5 text-[#ffd100] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Brand Strategy &amp; Ideation
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Category design &amp; visual positioning.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Film className="h-5 w-5 text-[#ffd100] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Storytelling &amp; Visual Direction
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Cinematic world-building &amp; moodboards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Video className="h-5 w-5 text-[#ffd100] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Commercial Video &amp; Production
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Live action direction &amp; high-end production.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Layers className="h-5 w-5 text-[#ffd100] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Motion Design &amp; 2D/3D Animation
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Motion graphics &amp; high-end 2D/3D animation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 sm:col-span-2">
              <Sparkles className="h-5 w-5 text-[#ffd100] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Storyboarding &amp; Concept Dev
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Frame-by-frame visual blueprints to eliminate production waste.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: [ watch showreel ] & [ explore gallery ] */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setReelOpen(true)}
            className="group inline-flex items-center gap-3 border border-[#ffd100] bg-[#ffd100] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] transition-all duration-300 hover:bg-[#e5a910] hover:shadow-[0_0_25px_rgba(255,209,0,0.5)]"
          >
            <span>watch showreel</span>
            <Play className="h-3.5 w-3.5 fill-current" />
          </button>

          <Link
            href="/video-solutions"
            className="group inline-flex items-center gap-2 border border-slate-700 px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-300 transition-colors hover:text-white hover:border-[#ffd100]"
          >
            <span>explore gallery</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:text-[#ffd100]" />
          </Link>
        </div>
      </div>

      {/* Full-Screen Showreel Overlay */}
      {reelOpen && <ReelOverlay onClose={() => setReelOpen(false)} />}
    </section>
  );
}
