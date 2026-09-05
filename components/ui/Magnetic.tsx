"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useZeroGravity } from "@/hooks/useZeroGravity";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
}

/** Glides an element away from the cursor within `radius`, spring-drifts back on exit. */
export function Magnetic({ children, className = "", radius = 150, strength = 30 }: MagneticProps) {
  const { ref, x, y } = useZeroGravity({ radius, strength });

  return (
    <motion.div ref={ref} className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
