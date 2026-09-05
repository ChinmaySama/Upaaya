"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Award,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Zap,
} from "lucide-react";

interface ScooterGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Obstacle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isGood: boolean;
  shape: "coin" | "auto" | "bus" | "pothole" | "trap";
  label: string;
  inrImpact: number;
  inrText: string;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

// 10% RARE HIGH-GROWTH MOVES (Simple words & Indian Currency)
const GOOD_GROWTH_ITEMS = [
  { label: "+₹25L Viral 3D", shape: "coin" as const, width: 105, height: 26, inrImpact: 2500000, inrText: "+₹25 Lakhs" },
  { label: "+₹50L Meta Ads", shape: "coin" as const, width: 105, height: 26, inrImpact: 5000000, inrText: "+₹50 Lakhs" },
  { label: "+₹35L SEO Rank", shape: "coin" as const, width: 105, height: 26, inrImpact: 3500000, inrText: "+₹35 Lakhs" },
  { label: "+₹15L CRO Boost", shape: "coin" as const, width: 105, height: 26, inrImpact: 1500000, inrText: "+₹15 Lakhs" },
  { label: "+₹1Cr Brand Moat", shape: "coin" as const, width: 115, height: 26, inrImpact: 10000000, inrText: "+₹1 Crore" },
  { label: "+₹2Cr Retention", shape: "coin" as const, width: 110, height: 26, inrImpact: 20000000, inrText: "+₹2 Crores" },
  { label: "+₹40L 4K Film", shape: "coin" as const, width: 100, height: 26, inrImpact: 4000000, inrText: "+₹40 Lakhs" },
];

// 90% TRAFFIC OBSTACLES & TRAPS (Simple words & Distinct Shapes)
const TRAFFIC_TRAPS = [
  { label: "Auto -₹5L", shape: "auto" as const, width: 90, height: 30, inrImpact: -500000, inrText: "-₹5 Lakhs" },
  { label: "Pothole -₹2L", shape: "pothole" as const, width: 90, height: 24, inrImpact: -200000, inrText: "-₹2 Lakhs" },
  { label: "Fake Bots -₹3L", shape: "trap" as const, width: 105, height: 26, inrImpact: -300000, inrText: "-₹3 Lakhs" },
  { label: "Ad Waste -₹8L", shape: "trap" as const, width: 105, height: 26, inrImpact: -800000, inrText: "-₹8 Lakhs" },
  { label: "Bus -₹7L", shape: "bus" as const, width: 100, height: 32, inrImpact: -700000, inrText: "-₹7 Lakhs" },
  { label: "No Track -₹10L", shape: "trap" as const, width: 110, height: 26, inrImpact: -1000000, inrText: "-₹10 Lakhs" },
  { label: "Slow Site -₹9L", shape: "trap" as const, width: 105, height: 26, inrImpact: -900000, inrText: "-₹9 Lakhs" },
  { label: "Traffic -₹4L", shape: "trap" as const, width: 95, height: 26, inrImpact: -400000, inrText: "-₹4 Lakhs" },
];

export function ScooterGameModal({ isOpen, onClose }: ScooterGameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [valuationINR, setValuationINR] = useState(100000);
  const [highScoreINR, setHighScoreINR] = useState(100000);
  const [timeLeft, setTimeLeft] = useState(40);
  const [goodCaught, setGoodCaught] = useState(0);
  const [trapsHit, setTrapsHit] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const gameState = useRef({
    scooter: { x: 260, y: 320, targetX: 260, width: 26, height: 48, tilt: 0 },
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    roadOffset: 0,
    lastSpawn: 0,
    valuationINR: 100000,
    goodCount: 0,
    trapsHitCount: 0,
    startTime: 0,
    duration: 40,
    running: false,
    width: 520,
    height: 380,
  });

  const formatINR = (amount: number) => {
    if (amount >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr.toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      const lk = amount / 100000;
      return `₹${lk.toFixed(2)} Lakh`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const getIndianBusinessRank = (amount: number) => {
    if (amount >= 1000000000) return "🦄 ₹100+ Crore Unicorn Titan";
    if (amount >= 500000000) return "💎 ₹50 Crore Category Leader";
    if (amount >= 100000000) return "🚀 ₹10 Crore Series B Scale";
    if (amount >= 25000000) return "⚡ ₹2.5 Crore Series A";
    if (amount >= 5000000) return "🌱 ₹50 Lakh Seed Growth";
    return "🛵 Early Bootstrapped Hustle";
  };

  const playSound = useCallback(
    (freq: number, type: OscillatorType = "sine", duration = 0.1) => {
      if (!soundEnabled) return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {}
    },
    [soundEnabled]
  );

  const spawnParticles = (x: number, y: number, color: string, count = 16) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      gameState.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 4 + 2,
        alpha: 1,
      });
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setValuationINR(100000);
    setTimeLeft(40);
    setGoodCaught(0);
    setTrapsHit(0);

    const canvas = canvasRef.current;
    const w = canvas?.clientWidth || 520;
    const h = canvas?.clientHeight || 380;

    gameState.current = {
      scooter: { x: w / 2, y: h - 55, targetX: w / 2, width: 26, height: 48, tilt: 0 },
      obstacles: [],
      particles: [],
      roadOffset: 0,
      lastSpawn: Date.now(),
      valuationINR: 100000,
      goodCount: 0,
      trapsHitCount: 0,
      startTime: Date.now(),
      duration: 40,
      running: true,
      width: w,
      height: h,
    };

    playSound(440, "triangle", 0.15);
    setTimeout(() => playSound(660, "triangle", 0.2), 100);
  };

  const endGame = () => {
    gameState.current.running = false;
    setIsPlaying(false);
    setGameOver(true);
    const finalVal = gameState.current.valuationINR;
    setValuationINR(finalVal);
    setGoodCaught(gameState.current.goodCount);
    setTrapsHit(gameState.current.trapsHitCount);

    if (finalVal > highScoreINR) {
      setHighScoreINR(finalVal);
      try {
        localStorage.setItem("upaaya_scooter_inr", finalVal.toString());
      } catch {}
    }

    playSound(350, "sawtooth", 0.25);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("upaaya_scooter_inr");
      if (saved) setHighScoreINR(parseInt(saved, 10));
    } catch {}
  }, []);

  // Main Canvas Render
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      gameState.current.width = rect.width;
      gameState.current.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const roadMin = rect.width * 0.15;
      const roadMax = rect.width * 0.85;
      const px = Math.max(roadMin, Math.min(roadMax, clientX - rect.left));
      gameState.current.scooter.targetX = px;
    };

    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("touchmove", handlePointerMove, { passive: true });

    let nextId = 1;

    const render = () => {
      const { width, height, scooter, obstacles, particles, running, startTime, duration } =
        gameState.current;

      ctx.clearRect(0, 0, width, height);

      // Footpaths
      ctx.fillStyle = "#1A1E27";
      ctx.fillRect(0, 0, width, height);

      // Asphalt Road
      const roadLeft = width * 0.12;
      const roadWidth = width * 0.76;
      ctx.fillStyle = "#0F1115";
      ctx.fillRect(roadLeft, 0, roadWidth, height);

      // Kerb Stripes (Electric Cyan Neon Borders)
      ctx.fillStyle = "#00F0FF";
      ctx.fillRect(roadLeft - 3, 0, 3, height);
      ctx.fillRect(roadLeft + roadWidth, 0, 3, height);

      // Animated Lane Markings
      gameState.current.roadOffset = (gameState.current.roadOffset + 5) % 40;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([18, 22]);
      ctx.lineDashOffset = -gameState.current.roadOffset;

      ctx.beginPath();
      ctx.moveTo(roadLeft + roadWidth * 0.33, 0);
      ctx.lineTo(roadLeft + roadWidth * 0.33, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(roadLeft + roadWidth * 0.66, 0);
      ctx.lineTo(roadLeft + roadWidth * 0.66, height);
      ctx.stroke();

      ctx.setLineDash([]);

      if (running) {
        const elapsed = (Date.now() - startTime) / 1000;
        const remaining = Math.max(0, Math.ceil(duration - elapsed));
        setTimeLeft(remaining);

        if (remaining <= 0) {
          endGame();
          return;
        }

        const now = Date.now();
        if (now - gameState.current.lastSpawn > 550) {
          const isGood = Math.random() < 0.1;
          const pool = isGood ? GOOD_GROWTH_ITEMS : TRAFFIC_TRAPS;
          const template = pool[Math.floor(Math.random() * pool.length)];

          const spawnX = roadLeft + 20 + Math.random() * (roadWidth - 40);

          obstacles.push({
            id: nextId++,
            x: spawnX,
            y: -40,
            width: template.width,
            height: template.height,
            isGood,
            shape: template.shape,
            label: template.label,
            inrImpact: template.inrImpact,
            inrText: template.inrText,
            speed: isGood ? 3.5 : Math.random() * 1.5 + 3.2,
          });

          gameState.current.lastSpawn = now;
        }

        const dx = scooter.targetX - scooter.x;
        scooter.x += dx * 0.22;
        scooter.tilt = dx * 0.03;

        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.y += obs.speed;

          const hitX = Math.abs(scooter.x - obs.x) < scooter.width / 2 + obs.width / 2.2;
          const hitY = Math.abs(scooter.y - obs.y) < scooter.height / 2 + obs.height / 2;

          if (hitX && hitY) {
            if (obs.isGood) {
              spawnParticles(obs.x, obs.y, "#ffd100", 22);
              gameState.current.valuationINR = Math.max(
                50000,
                gameState.current.valuationINR + obs.inrImpact
              );
              gameState.current.goodCount++;
              setGoodCaught(gameState.current.goodCount);
              setValuationINR(gameState.current.valuationINR);
              playSound(880, "sine", 0.15);
            } else {
              spawnParticles(obs.x, obs.y, "#EF4444", 18);
              gameState.current.valuationINR = Math.max(
                10000,
                gameState.current.valuationINR + obs.inrImpact
              );
              gameState.current.trapsHitCount++;
              setTrapsHit(gameState.current.trapsHitCount);
              setValuationINR(gameState.current.valuationINR);
              playSound(160, "sawtooth", 0.2);
            }

            obstacles.splice(i, 1);
            continue;
          }

          if (obs.y > height + 40) {
            obstacles.splice(i, 1);
          }
        }
      }

      // Draw Falling Obstacles & Growth Elements with Distinct Shapes
      for (const obs of obstacles) {
        ctx.save();
        ctx.translate(obs.x, obs.y);
        const w = obs.width;
        const h = obs.height;

        if (obs.isGood) {
          // 1. GOLD COIN & GROWTH CAPSULE
          ctx.save();
          ctx.shadowColor = "rgba(255, 209, 0, 0.75)";
          ctx.shadowBlur = 12;
          const grad = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
          grad.addColorStop(0, "#ffd100");
          grad.addColorStop(1, "#e5a910");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
          ctx.fill();
          ctx.restore();

          // Gold border
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Left circular gold star emblem
          ctx.fillStyle = "#111111";
          ctx.beginPath();
          ctx.arc(-w / 2 + h / 2, 0, h / 2 - 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffd100";
          ctx.font = "bold 9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("★", -w / 2 + h / 2, 0);

          // Simple Punchy Text
          ctx.fillStyle = "#111111";
          ctx.font = "bold 9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(obs.label, 8, 0);
        } else if (obs.shape === "auto") {
          // 2. AUTO-RICKSHAW VEHICLE SHAPE
          // Green bottom chassis
          ctx.fillStyle = "#15803d";
          ctx.beginPath();
          ctx.roundRect(-w / 2, -h / 2, w, h, 5);
          ctx.fill();

          // Yellow canopy top
          ctx.fillStyle = "#eab308";
          ctx.fillRect(-w / 2 + 3, -h / 2 + 2, w - 6, 5);

          // Windshield text panel
          ctx.fillStyle = "#111111";
          ctx.beginPath();
          ctx.roundRect(-w / 2 + 4, -h / 2 + 8, w - 8, h - 11, 3);
          ctx.fill();

          ctx.fillStyle = "#fef08a";
          ctx.font = "bold 9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(obs.label, 0, 3);
        } else if (obs.shape === "bus") {
          // 3. DTC BUS VEHICLE SHAPE
          // Red bus body
          ctx.fillStyle = "#dc2626";
          ctx.beginPath();
          ctx.roundRect(-w / 2, -h / 2, w, h, 5);
          ctx.fill();

          // White roof trim
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(-w / 2 + 3, -h / 2 + 2, w - 6, 3);

          // Dark window area
          ctx.fillStyle = "#18181b";
          ctx.fillRect(-w / 2 + 4, -h / 2 + 6, w - 8, h - 10);

          ctx.fillStyle = "#fee2e2";
          ctx.font = "bold 9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(obs.label, 0, 2);
        } else if (obs.shape === "pothole") {
          // 4. POTHOLE (Dark Elliptical Crater)
          ctx.fillStyle = "#09090b";
          ctx.beginPath();
          ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "#475569";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = "#f87171";
          ctx.font = "bold 9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(obs.label, 0, 0);
        } else {
          // 5. MARKETING HAZARD BARRIER (Angular Hazard Box)
          ctx.fillStyle = "#1c1917";
          ctx.beginPath();
          ctx.roundRect(-w / 2, -h / 2, w, h, 4);
          ctx.fill();

          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Red caution left bar
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(-w / 2, -h / 2, 5, h);

          ctx.fillStyle = "#f8fafc";
          ctx.font = "bold 9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(obs.label, 3, 0);
        }

        ctx.restore();
      }

      // Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.035;

        if (pt.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Player Scooter (Yellow Gold Chassis)
      if (running || !gameOver) {
        ctx.save();
        ctx.translate(scooter.x, scooter.y);
        ctx.rotate(scooter.tilt);

        // Headlight Beam
        const beamGrad = ctx.createLinearGradient(0, -18, 0, -85);
        beamGrad.addColorStop(0, "rgba(255, 209, 0, 0.6)");
        beamGrad.addColorStop(1, "rgba(255, 209, 0, 0)");
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(-26, -85);
        ctx.lineTo(26, -85);
        ctx.closePath();
        ctx.fill();

        // Shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.beginPath();
        ctx.ellipse(3, 4, 14, 26, 0, 0, Math.PI * 2);
        ctx.fill();

        // Rear Wheel
        ctx.fillStyle = "#000000";
        ctx.fillRect(-5, 14, 10, 14);

        // Body Chassis (Gold)
        ctx.fillStyle = "#ffd100";
        ctx.beginPath();
        ctx.roundRect(-10, -12, 20, 28, 6);
        ctx.fill();

        // Seat
        ctx.fillStyle = "#090A0D";
        ctx.beginPath();
        ctx.roundRect(-6, -4, 12, 16, 4);
        ctx.fill();

        // Handlebars
        ctx.fillStyle = "#E2E8F0";
        ctx.fillRect(-14, -18, 28, 4);

        // Mirrors
        ctx.fillStyle = "#00F0FF";
        ctx.beginPath();
        ctx.arc(-14, -20, 3, 0, Math.PI * 2);
        ctx.arc(14, -20, 3, 0, Math.PI * 2);
        ctx.fill();

        // Headlamp
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(0, -19, 4, 0, Math.PI * 2);
        ctx.fill();

        // Front Fender & Wheel
        ctx.fillStyle = "#00F0FF";
        ctx.fillRect(-4, -26, 8, 8);
        ctx.fillStyle = "#000000";
        ctx.fillRect(-3, -28, 6, 6);

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("touchmove", handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, [isOpen, soundEnabled, playSound, gameOver]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md font-sans"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#1E232F] bg-[#0F1115] p-6 shadow-2xl md:p-8 text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#1E232F] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-bold">
                🛵
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Indian Traffic &amp; Growth Hustle
                </h3>
                <p className="text-[11px] text-slate-400 font-normal">
                  Dodge 90% traffic traps • Catch 10% ₹ Lakhs/Crore boosts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#1E232F] text-slate-300 hover:text-white"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4 text-[#00F0FF]" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#1E232F] text-slate-300 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Top HUD */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-[#14171E] p-2.5 border border-[#1E232F] text-center">
              <span className="block text-[9px] uppercase text-slate-400 font-semibold tracking-wider">
                Valuation
              </span>
              <span className="font-heading text-lg font-bold text-[#00F0FF]">
                {formatINR(valuationINR)}
              </span>
            </div>

            <div className="rounded-xl bg-[#14171E] p-2.5 border border-[#1E232F] text-center">
              <span className="block text-[9px] uppercase text-slate-400 font-semibold tracking-wider">
                Timer
              </span>
              <span className="text-sm font-bold text-white">
                {timeLeft}s
              </span>
            </div>

            <div className="rounded-xl bg-[#14171E] p-2.5 border border-[#1E232F] text-center">
              <span className="block text-[9px] uppercase text-slate-400 font-semibold tracking-wider">
                High Score
              </span>
              <span className="text-xs font-bold text-white">
                {formatINR(highScoreINR)}
              </span>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative mt-3 h-[360px] w-full overflow-hidden rounded-2xl border border-[#1E232F] bg-[#090A0D]">
            <canvas ref={canvasRef} className="h-full w-full touch-none cursor-ew-resize" />

            {/* Start Screen */}
            {!isPlaying && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090A0D]/90 p-6 text-center backdrop-blur-xs">
                <div className="mb-2 text-4xl">🛵💨</div>
                <h4 className="font-heading text-2xl font-bold text-white">
                  Ready for the Traffic Sprint?
                </h4>
                <p className="mt-1 text-xs text-slate-300 max-w-sm font-normal">
                  Steer your scooter through Indian traffic. Dodge 90% bad advice &amp; autos, and catch the 10% golden ₹ Lakh &amp; Crore growth rewards!
                </p>

                <button
                  onClick={startGame}
                  className="mt-5 flex items-center gap-2 rounded-full bg-[#00F0FF] px-7 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:bg-white"
                >
                  <Play className="h-4 w-4 fill-black" /> Kick Start Scooter
                </button>
              </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090A0D]/95 p-6 text-center backdrop-blur-sm">
                <div className="mb-2 text-3xl">🏆</div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Sprint Complete — Final Valuation:
                </span>
                <h4 className="mt-1 font-heading text-3xl font-extrabold text-[#00F0FF]">
                  {formatINR(valuationINR)}
                </h4>
                <div className="mt-1 rounded-full bg-[#14171E] px-3.5 py-1 text-xs font-semibold text-white border border-[#1E232F]">
                  {getIndianBusinessRank(valuationINR)}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 w-full max-w-xs text-xs">
                  <div className="rounded-lg bg-[#00F0FF]/10 p-2 text-[#00F0FF] border border-[#00F0FF]/30 font-semibold">
                    Boosts: <strong>{goodCaught}</strong>
                  </div>
                  <div className="rounded-lg bg-red-500/10 p-2 text-red-400 border border-red-500/30 font-semibold">
                    Traps Hit: <strong>{trapsHit}</strong>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={startGame}
                    className="flex items-center gap-2 rounded-full border border-slate-700 bg-black px-5 py-2.5 text-xs font-semibold text-white hover:border-[#00F0FF]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Ride Again
                  </button>
                  <button
                    onClick={onClose}
                    className="rounded-full bg-[#00F0FF] px-6 py-2.5 text-xs font-bold uppercase text-black hover:bg-white"
                  >
                    Close Game
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>🖱️ Move mouse / touch horizontally to steer</span>
            <span>⏱️ 40s Sprint</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
