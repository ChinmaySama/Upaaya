"use client";

import { useState } from "react";
import { Users, Sparkles, ArrowRight, Play } from "lucide-react";
import { ReelOverlay } from "@/components/ReelOverlay";

const TEAM_MEMBERS = [
  {
    name: "Chinmay",
    role: "Filmmaker & Cinematographer",
    focus: "Directs commercial films, cinematic storytelling, camera direction, and visual narratives.",
  },
  {
    name: "Ishita",
    role: "Brand Strategy & Communications",
    focus: "Crafts compelling brand stories and creative strategies that connect with people.",
  },
  {
    name: "Nishaad",
    role: "Creative Director & 3D Lead",
    focus: "Designs stunning 3D animations, CGI visuals, and creative world-building.",
  },
  {
    name: "Rohit",
    role: "Video Editing & Videography",
    focus: "Specializes in cinematic video editing, pacing, color grading, and videography.",
  },
  {
    name: "Sachin",
    role: "Commercial Film Director & Storytelling",
    focus: "Directs commercial video shoots, live-action films, and storytelling that inspires.",
  },
  {
    name: "Asha",
    role: "Creative Producer & Project Lead",
    focus: "Manages production pipelines, creative workflows, and smooth end-to-end delivery.",
  },
];

export function TeamSection() {
  const [btsVideoOpen, setBtsVideoOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#f6f6f7] text-[#111111] flex flex-col lg:flex-row overflow-hidden border-t border-[#e2e2e2] font-sans"
    >
      {/* LEFT COLUMN: Team Members & Philosophy */}
      <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-between p-8 md:p-16 lg:p-20 order-1 bg-[#f6f6f7]">
        <div>
          {/* Section Kicker with #ffd100 Accent Line */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#e5a910] font-bold">
              // Who are we?
            </span>
            <div className="h-0.5 w-12 bg-[#ffd100] shadow-[0_0_10px_rgba(255,209,0,0.8)]" />
          </div>

          {/* Bold Geometric Headline (Syne) */}
          <h2 className="mt-8 font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] text-[#111111] tracking-tight">
            A studio built for visual storytelling and digital growth.
          </h2>

          {/* Body Statement (Inter) */}
          <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
            We bridge the gap between art and data. Our directors handle the storyboarding and production, while our strategists ensure your message reaches the exact right customers.
          </p>

          {/* Team Members Roster */}
          <div className="mt-10 space-y-3.5 border-t border-[#e2e2e2] pt-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between rounded-2xl bg-white p-5 shadow-xs border border-[#e2e2e2] transition-all hover:border-[#ffd100] hover:shadow-md"
              >
                <div>
                  <h4 className="font-heading text-xl font-bold text-[#111111] group-hover:text-black">
                    {member.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {member.focus}
                  </p>
                </div>
                <span className="mt-3 sm:mt-0 text-[11px] font-bold tracking-wide text-[#111111] bg-[#ffd100] px-3.5 py-1 rounded-full border border-[#ffd100] flex-shrink-0 shadow-xs">
                  {member.role}
                </span>
              </div>
            ))}
          </div>

          {/* Tiny Portfolio Disclaimer */}
          <div className="mt-8 border-t border-[#e2e2e2] pt-4">
            <p className="text-[10px] text-slate-400 leading-relaxed font-normal">
              *Disclaimer: The portfolio works showcased across this website represent individual and collective projects executed by our team members during past agency tenures and freelance engagements, presented here to demonstrate our capabilities.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Studio Visual */}
      <div
        onClick={() => setBtsVideoOpen(true)}
        className="group relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen cursor-pointer overflow-hidden bg-[#111111] flex items-center justify-center order-2"
      >
        {/* Visual Background: Studio Styleframe */}
        <img
          src="/works/styleframes/3DMoGraph_00.2.png"
          alt="Upaaya Studio BTS & Render Lab"
          className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
        />

        {/* Pixel Mesh Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 209, 0, 0.5) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Circular Translucent Play Button */}
        <div className="relative z-10 flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#ffd100] group-hover:bg-[#ffd100] group-hover:text-black group-hover:shadow-[0_0_35px_rgba(255,209,0,0.6)] shadow-2xl">
          <Play className="h-8 w-8 md:h-10 md:w-10 fill-current ml-1 text-white group-hover:text-black transition-colors" />
        </div>

        {/* Studio Label Badge */}
        <div className="absolute bottom-6 right-6 z-10 rounded-full bg-black/80 px-4 py-1.5 text-[11px] uppercase tracking-wider text-[#ffd100] backdrop-blur-md border border-[#ffd100]/30 font-semibold">
          Studio LookDev &amp; 3D Lab
        </div>
      </div>

      {/* Full-Screen Showreel Video Modal */}
      {btsVideoOpen && <ReelOverlay onClose={() => setBtsVideoOpen(false)} />}
    </section>
  );
}
