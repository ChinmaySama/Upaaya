"use client";

import { motion } from "framer-motion";
import { X, Play } from "lucide-react";

const SPRING = { type: "spring" as const, stiffness: 120, damping: 24, mass: 0.8 };

interface ReelOverlayProps {
  onClose: () => void;
}

export function ReelOverlay({ onClose }: ReelOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative aspect-video w-[92vw] max-w-5xl overflow-hidden rounded-3xl border border-slate-700/60 bg-black shadow-2xl"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={SPRING}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          className="h-full w-full object-cover"
          src="/works/videos/Celestia ( Golden Ticket ) - SFx - 2nd Draft.mp4"
          autoPlay
          controls
          playsInline
        />
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900"
          aria-label="Close reel"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}
