"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Target, Share2, Search, Sliders, Play } from "lucide-react";
import { ReelOverlay } from "@/components/ReelOverlay";

export function DigitalGrowthSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="growth-strategies"
      className="relative min-h-screen w-full bg-[#181818] text-white flex flex-col lg:flex-row overflow-hidden border-t border-[#222222]"
    >
      {/* LEFT COLUMN: Info Panel */}
      <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-between bg-[#181818] p-8 md:p-16 lg:p-20 order-1">
        <div>
          {/* Section Kicker with #e5a910 Accent Line */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#e5a910] font-semibold">
              // 02 Social &amp; Digital Growth
            </span>
            <div className="h-0.5 w-12 bg-[#ffd100] shadow-[0_0_10px_#ffd100]" />
          </div>

          {/* Bold Geometric Headline (Syne) */}
          <h2 className="mt-8 font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] text-white tracking-tight">
            Strategic Social &amp;
            <br />
            Digital Growth.
          </h2>

          {/* Body Paragraph (Inter) */}
          <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
            your growth, our responsibility. We build strategic pathways that elevate your brand&apos;s digital footprint and capture your ideal audience at exactly the right time
          </p>

          {/* Core Growth Capabilities */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-[#2a2a2a] pt-8">
            <div className="flex items-start gap-3.5">
              <Target className="h-5 w-5 text-[#ffd100] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Paid Media &amp; Performance
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Meta &amp; Google performance scaling.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Share2 className="h-5 w-5 text-[#ffd100] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Organic Social Management
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Viral short-form &amp; community loops.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Search className="h-5 w-5 text-[#ffd100] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Search Engine Optimization
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Programmatic SEO &amp; keyword monopoly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Sliders className="h-5 w-5 text-[#ffd100] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Social &amp; Funnel Optimization
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Full-funnel CRO, ASO &amp; viral loops.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Framed Button: [ past work ] -> links to /digital-growth */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/digital-growth"
            className="group inline-flex items-center gap-3 border border-[#ffd100] bg-[#ffd100] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] transition-all duration-300 hover:bg-[#e5a910] hover:shadow-[0_0_25px_rgba(255,209,0,0.5)]"
          >
            <span>past work</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/digital-growth"
            className="text-xs text-slate-400 hover:text-[#ffd100] transition-colors font-medium underline underline-offset-4"
          >
            Explore Growth Showcase →
          </Link>
        </div>
      </div>

      {/* RIGHT COLUMN: Video / Media Preview */}
      <div
        onClick={() => setVideoOpen(true)}
        className="group relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen cursor-pointer overflow-hidden bg-black flex items-center justify-center order-2"
      >
        {/* Looping Performance Ad Video */}
        <video
          src="/works/videos/Vanilla Finance ( SFx ) - 1st Draft.mp4"
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

        {/* Circular Translucent Play Button */}
        <div className="relative z-10 flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#ffd100] group-hover:bg-[#ffd100] group-hover:text-black group-hover:shadow-[0_0_35px_rgba(255,209,0,0.5)] shadow-2xl">
          <Play className="h-9 w-9 md:h-11 md:w-11 fill-current ml-1 text-white group-hover:text-black transition-colors" />
        </div>

        {/* Live Metrics Overlay Card */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-black/90 p-4 backdrop-blur-md border border-[#ffd100]/30 font-sans">
          <div className="flex items-center gap-6">
            <div>
              <span className="block font-heading text-2xl font-bold text-white">4.8x</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg ROAS</span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <span className="block font-heading text-2xl font-bold text-white">48M+</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Organic Views</span>
            </div>
          </div>
          <span className="rounded-full bg-[#ffd100]/20 px-3 py-1 text-[11px] font-bold text-[#ffd100] border border-[#ffd100]/40 shadow-[0_0_10px_rgba(255,209,0,0.2)]">
            ● Active Campaigns
          </span>
        </div>
      </div>

      {/* Full-Screen Video Modal */}
      {videoOpen && <ReelOverlay onClose={() => setVideoOpen(false)} />}
    </section>
  );
}
