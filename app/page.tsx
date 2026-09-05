"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VideoSolutionsSection } from "@/components/VideoSolutionsSection";
import { DigitalGrowthSection } from "@/components/DigitalGrowthSection";
import { EmbeddedScooterGame } from "@/components/EmbeddedScooterGame";
import { TeamSection } from "@/components/TeamSection";
import { Contact } from "@/components/Contact";
import { ArrowUp } from "lucide-react";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full transition-colors duration-700 bg-white">
        <Header />

        <main className="relative">
          {/* 1. Top Statement Hero (Pure White) */}
          <div className="w-full bg-[#ffffff] transition-colors duration-700">
            <Hero />
          </div>

          {/* 2. Video and Creative Solutions (Deep Obsidian Dark 01) */}
          <div className="w-full bg-[#111111] transition-colors duration-700">
            <VideoSolutionsSection />
          </div>

          {/* 3. Digital Growth Strategies (Deep Obsidian Dark 02) */}
          <div className="w-full bg-[#181818] transition-colors duration-700">
            <DigitalGrowthSection />
          </div>

          {/* 4. Embedded Indian Traffic Game (Pure White / Light Lab) */}
          <div className="w-full bg-[#ffffff] transition-colors duration-700 border-t border-[#e2e2e2]">
            <EmbeddedScooterGame />
          </div>

          {/* 5. Team & Collective Section */}
          <div className="w-full bg-[#f6f6f7] transition-colors duration-700">
            <TeamSection />
          </div>

          {/* 6. Contact & Discovery Booking (Pure White) */}
          <div className="w-full bg-[#ffffff] transition-colors duration-700">
            <Contact />
          </div>

          {/* Studio Footer */}
          <footer className="border-t border-[#e2e2e2] bg-white py-12 px-6 md:px-16 transition-colors duration-700 font-sans text-[#111111]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffd100] font-heading font-extrabold text-[#111111] text-sm shadow-[0_0_15px_rgba(255,209,0,0.4)]">
                  U
                </div>
                <span className="font-heading text-xl font-bold text-[#111111] tracking-tight">upaaya</span>
                <span className="text-xs text-slate-500 font-medium">| Video Solutions &amp; Digital Growth</span>
              </div>

              <div className="text-xs text-slate-500 text-center">
                © {new Date().getFullYear()} Upaaya Studio. All rights reserved. Cinematic Production &amp; Algorithmic Growth.
              </div>

              <a
                href="#"
                className="flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#e5a910]"
              >
                <span>Back to top</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </a>
            </div>
          </footer>
        </main>
      </div>
    </SmoothScroll>
  );
}
