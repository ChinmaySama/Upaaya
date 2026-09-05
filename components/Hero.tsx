"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

const DYNAMIC_WORDS = [
  "Marketing",
  "Social media",
  "SEO",
  "Branding",
  "Campaigning",
  "Strategy",
  "Advertising",
  "Performance marketing",
  "Video Production",
] as const;

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sequential infinite cycle in exact order
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 2600); // 2s pause + 0.6s float transition

    return () => clearInterval(timer);
  }, []);

  const currentWord = DYNAMIC_WORDS[currentIndex];

  const scrollToNext = () => {
    const nextSection = document.getElementById("video-solutions");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between px-6 pt-24 pb-12 md:px-16 bg-[#ffffff] text-[#111111]"
    >
      {/* Top Anchors (Syne) */}
      <div className="flex items-center justify-between font-heading text-lg md:text-xl font-bold tracking-tight text-[#111111]">
        <span className="uppercase tracking-[0.2em] text-xs font-semibold text-slate-400">
          studio
        </span>
      </div>

      {/* Main Centered Hero Typography */}
      <div className="my-auto flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-black leading-[1.08] tracking-[-0.025em] text-[#111111]"
        >
          Upaya means solution.
          <br className="hidden md:inline" />
          {" "}The solution to your{" "}
          <span className="inline-flex items-baseline relative overflow-hidden align-baseline mx-1.5">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={currentWord}
                initial={{ y: "120%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-120%", opacity: 0, filter: "blur(4px)" }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block font-sans font-black tracking-[-0.025em] px-1 text-[#e5a910] border-b-2 border-[#ffd100]"
              >
                {currentWord}
              </motion.span>
            </AnimatePresence>
          </span>.
        </motion.h1>

        {/* Interactive Highlight Dot */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            boxShadow: [
              "0 0 0 0px rgba(255, 209, 0, 0.4)",
              "0 0 0 12px rgba(255, 209, 0, 0)",
              "0 0 0 0px rgba(255, 209, 0, 0.4)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="mt-12 h-3.5 w-3.5 rounded-full bg-[#ffd100] cursor-pointer hover:scale-150 transition-transform shadow-[0_0_12px_#ffd100]"
          onClick={scrollToNext}
          title="Scroll down"
        />
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-1 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-slate-400 transition-colors hover:text-[#111111]"
        >
          <span>explore</span>
          <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-1 text-slate-400 group-hover:text-[#e5a910]" />
        </button>
      </div>
    </section>
  );
}
