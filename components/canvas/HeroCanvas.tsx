"use client";

import { useEffect, useRef } from "react";

/**
 * Minimalist, elegant interactive particle & light wave canvas.
 * Replaces the 3D crystal with a clean, high-end editorial particle field that reacts gently to the pointer.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    interface Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      phase: number;
    }

    let nodes: Node[] = [];

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      nodes = [];
      const count = Math.min(80, Math.floor((width * height) / 10000));
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.25 + 0.08,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    init();
    window.addEventListener("resize", init);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw subtle connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        // subtle float
        a.x += a.vx + Math.sin(time + a.phase) * 0.15;
        a.y += a.vy + Math.cos(time + a.phase) * 0.15;

        // Wrap around boundaries
        if (a.x < 0) a.x = width;
        if (a.x > width) a.x = 0;
        if (a.y < 0) a.y = height;
        if (a.y > height) a.y = 0;

        // Mouse avoidance/attraction
        const mdx = mouse.x - a.x;
        const mdy = mouse.y - a.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < 140) {
          const force = (1 - mDist / 140) * 8;
          a.x -= (mdx / mDist) * force * 0.1;
          a.y -= (mdy / mDist) * force * 0.1;
        }

        // Connect to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(161, 161, 170, ${(1 - dist / 110) * 0.15})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(39, 39, 42, ${a.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-80">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
