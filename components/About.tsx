"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Globe2, Sparkles, TrendingUp, Award } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: TrendingUp,
    title: "Performance First",
    desc: "Every creative asset is engineered to drive measurable conversions, lower CAC, and compound ROAS.",
  },
  {
    icon: Sparkles,
    title: "Cinematic 3D Fidelity",
    desc: "Hollywood-grade rendering, tactile textures, and physics-driven motion design that stops scrolling thumbs.",
  },
  {
    icon: Globe2,
    title: "Global Execution",
    desc: "Cross-functional strategists, directors, media buyers, and animators operating seamlessly worldwide.",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacityA = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 0.2, 0]);
  const opacityB = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0, 1, 1, 0]);
  const opacityC = useTransform(scrollYProgress, [0.5, 0.75, 1], [0, 1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 py-28 md:px-16 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
        {/* Text Details */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 font-mono text-xs font-semibold text-zinc-800 shadow-sm">
            <Users className="h-3.5 w-3.5 text-zinc-900" />
            <span>The Multidisciplinary Collective</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-zinc-900 md:text-5xl tracking-tight">
            Where Algorithmic Growth Meets Uncompromising Craft.
          </h2>

          <p className="mt-5 font-mono text-sm leading-relaxed text-zinc-600 md:text-base">
            Most agencies force you to choose: either a data-obsessed growth shop with uninspired templates, or an artsy creative studio that doesn&apos;t understand unit economics.
          </p>
          <p className="mt-3 font-mono text-sm leading-relaxed text-zinc-600 md:text-base">
            <strong className="text-zinc-900 font-semibold">Upaaya bridges both worlds.</strong> We combine quantitative acquisition rigor (Meta, Google, SEO, SMO) with breathtaking 3D CGI animation and strategic brand direction.
          </p>

          <div className="mt-8 space-y-4">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-zinc-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Morphing Kinetic Illustration in Clean Monochrome Theme */}
        <div className="relative flex items-center justify-center rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-stone-50 p-10 shadow-sm">
          <div className="absolute -top-5 -right-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg">
            <Award className="h-8 w-8" />
          </div>

          <motion.svg
            style={{ rotate }}
            viewBox="0 0 240 240"
            className="h-72 w-72 text-zinc-900 md:h-96 md:w-96"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <motion.g style={{ opacity: opacityA }}>
              <circle cx="120" cy="90" r="46" stroke="#18181B" />
              <path d="M60 220 C60 150 90 130 120 130 C150 130 180 150 180 220" stroke="#71717A" />
              <circle cx="120" cy="90" r="16" fill="#18181B" fillOpacity="0.08" />
            </motion.g>

            <motion.g style={{ opacity: opacityB }}>
              <polygon points="120,40 170,90 150,150 90,150 70,90" stroke="#27272A" />
              <path d="M55 220 C55 155 85 135 120 135 C155 135 185 155 185 220" stroke="#71717A" />
              <circle cx="120" cy="100" r="10" fill="#18181B" fillOpacity="0.1" />
            </motion.g>

            <motion.g style={{ opacity: opacityC }}>
              <path d="M75 55 L165 55 L150 135 L90 135 Z" stroke="#3F3F46" />
              <circle cx="120" cy="95" r="20" stroke="#18181B" />
              <path d="M50 220 C50 150 80 140 120 140 C160 140 190 150 190 220" stroke="#71717A" />
            </motion.g>
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
