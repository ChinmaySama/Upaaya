"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface ZeroGravityConfig {
  /** Distance in px at which the element starts drifting away from the cursor */
  radius?: number;
  /** Max offset in px applied at the closest point of contact */
  strength?: number;
}

/**
 * Tracks the cursor globally and pushes the returned x/y motion values away
 * from an element's center once the pointer enters `radius`, spring-damping
 * back to origin once it leaves — the "magnetic zero-gravity push" from the brief.
 */
export function useZeroGravity({ radius = 150, strength = 30 }: ZeroGravityConfig = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 24, mass: 0.8 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius) {
        const pushFactor = (1 - distance / radius) * strength;
        const angle = Math.atan2(dy, dx);
        rawX.set(-Math.cos(angle) * pushFactor);
        rawY.set(-Math.sin(angle) * pushFactor);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [radius, strength, rawX, rawY]);

  return { ref, x, y };
}
