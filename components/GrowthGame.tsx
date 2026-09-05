"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
} from "lucide-react";

interface DecisionItem {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isGood: boolean;
  label: string;
  impactValue: number; // in dollars
  impactText: string;
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

interface ZapLaser {
  x: number;
  y: number;
  vy: number;
}

// 10% RARE GOOD DECISIONS (High-leverage growth & creative moves)
const GOOD_DECISIONS = [
  { label: "High-Hook 3D Video Ads", impactValue: 1200000, impactText: "+$1.2M ARR" },
  { label: "Full-Funnel Meta & Google DCO", impactValue: 1800000, impactText: "+$1.8M ARR" },
  { label: "Programmatic SEO Monopoly", impactValue: 1500000, impactText: "+$1.5M ARR" },
  { label: "A/B Test Checkout & CRO", impactValue: 900000, impactText: "+$900K ARR" },
  { label: "Organic Viral 3D Shorts", impactValue: 1100000, impactText: "+$1.1M ARR" },
  { label: "Category Narrative & Moat", impactValue: 3500000, impactText: "+$3.5M Valuation" },
  { label: "Relentless CAC & ROAS Tuning", impactValue: 2000000, impactText: "+$2.0M ARR" },
  { label: "High-Intent Keyword Capture", impactValue: 1400000, impactText: "+$1.4M ARR" },
  { label: "Retain 85%+ Customer Cohorts", impactValue: 4000000, impactText: "+$4.0M Valuation" },
  { label: "Cinema-Grade Product LookDev", impactValue: 1300000, impactText: "+$1.3M ARR" },
];

// 90% BAD DECISIONS (Traps, vanity metrics & reckless mistakes to avoid)
const BAD_DECISIONS = [
  { label: "Buy 50k Fake Followers", impactValue: -300000, impactText: "-$300K" },
  { label: "Burn $50k on Broad Billboards", impactValue: -600000, impactText: "-$600K" },
  { label: "Copy Competitor Blindly", impactValue: -400000, impactText: "-$400K" },
  { label: "Discount Prices by 80%", impactValue: -750000, impactText: "-$750K" },
  { label: "Ignore Customer Churn", impactValue: -1200000, impactText: "-$1.2M" },
  { label: "Spam Cold DMs on LinkedIn", impactValue: -200000, impactText: "-$200K" },
  { label: "Launch with Broken Mobile UX", impactValue: -900000, impactText: "-$900K" },
  { label: "Overhire 20 Reps Prematurely", impactValue: -1500000, impactText: "-$1.5M" },
  { label: "Redesign Logo 12 Times", impactValue: -250000, impactText: "-$250K" },
  { label: "Pay $30k for Fluff PR", impactValue: -450000, impactText: "-$450K" },
  { label: "Target 'Everyone' on Meta", impactValue: -800000, impactText: "-$800K" },
  { label: "Skip SEO & Rely Only on Ads", impactValue: -500000, impactText: "-$500K" },
  { label: "Cheesy Stock AI Videos", impactValue: -350000, impactText: "-$350K" },
  { label: "Zero Attribution Tracking", impactValue: -700000, impactText: "-$700K" },
  { label: "Switch Strategy Every Week", impactValue: -650000, impactText: "-$650K" },
  { label: "Pay Influencers with No ROI", impactValue: -550000, impactText: "-$550K" },
  { label: "Ignore Core Web Vitals", impactValue: -400000, impactText: "-$400K" },
  { label: "No Retargeting Pipeline", impactValue: -500000, impactText: "-$500K" },
  { label: "Rely on Single Ad Creative", impactValue: -600000, impactText: "-$600K" },
  { label: "Zero Retention Mechanics", impactValue: -1100000, impactText: "-$1.1M" },
];

export function GrowthGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [valuation, setValuation] = useState(100000); // starts at $100k
  const [highValuation, setHighValuation] = useState(100000);
  const [timeLeft, setTimeLeft] = useState(40);
  const [goodCaught, setGoodCaught] = useState(0);
  const [badAvoided, setBadAvoided] = useState(0);
  const [badHit, setBadHit] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<{ msg: string; type: "good" | "bad" } | null>(null);

  const gameState = useRef({
    player: { x: 400, y: 420, targetX: 400, width: 80, height: 26 },
    decisions: [] as DecisionItem[],
    particles: [] as Particle[],
    lasers: [] as ZapLaser[],
    lastSpawn: 0,
    valuation: 100000,
    goodCount: 0,
    badAvoidedCount: 0,
    badHitCount: 0,
    startTime: 0,
    duration: 40, // 40 seconds
    running: false,
    width: 800,
    height: 500,
  });

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(2)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  const getBusinessStage = (val: number) => {
    if (val >= 100000000) return "🦄 $100M+ Unicorn Industry Titan";
    if (val >= 50000000) return "💎 $50M Series C Category Leader";
    if (val >= 20000000) return "🚀 $20M Series B Scale-Up";
    if (val >= 5000000) return "⚡ $5M Series A High-Growth";
    if (val >= 1000000) return "🌱 $1M Seed Stage Growth";
    return "🛠️ Early Stage Startup";
  };

  const playSynth = useCallback(
    (freq: number, type: OscillatorType = "sine", duration = 0.12) => {
      if (!soundEnabled) return;
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
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
      const speed = Math.random() * 4 + 1.5;
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
    setValuation(100000);
    setTimeLeft(40);
    setGoodCaught(0);
    setBadAvoided(0);
    setBadHit(0);
    setFeedbackToast(null);

    const canvas = canvasRef.current;
    const w = canvas?.clientWidth || 800;
    const h = canvas?.clientHeight || 500;

    gameState.current = {
      player: { x: w / 2, y: h - 50, targetX: w / 2, width: 90, height: 24 },
      decisions: [],
      particles: [],
      lasers: [],
      lastSpawn: Date.now(),
      valuation: 100000,
      goodCount: 0,
      badAvoidedCount: 0,
      badHitCount: 0,
      startTime: Date.now(),
      duration: 40,
      running: true,
      width: w,
      height: h,
    };

    playSynth(520, "triangle", 0.15);
    setTimeout(() => playSynth(650, "triangle", 0.2), 100);
  };

  const endGame = () => {
    gameState.current.running = false;
    setIsPlaying(false);
    setGameOver(true);
    const finalVal = gameState.current.valuation;
    setValuation(finalVal);
    setGoodCaught(gameState.current.goodCount);
    setBadAvoided(gameState.current.badAvoidedCount);
    setBadHit(gameState.current.badHitCount);

    if (finalVal > highValuation) {
      setHighValuation(finalVal);
      try {
        localStorage.setItem("upaaya_business_val", finalVal.toString());
      } catch {}
    }

    playSynth(440, "sine", 0.3);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("upaaya_business_val");
      if (saved) setHighValuation(parseInt(saved, 10));
    } catch {}
  }, []);

  // Main Game Loop
  useEffect(() => {
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
      const px = Math.max(50, Math.min(rect.width - 50, clientX - rect.left));
      gameState.current.player.targetX = px;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      handlePointerMove(e);
      if (gameState.current.running) {
        // Fire Rejector Laser to blast bad decision
        const { x, y } = gameState.current.player;
        gameState.current.lasers.push({ x: x - 20, y: y - 10, vy: -12 }, { x: x + 20, y: y - 10, vy: -12 });
        playSynth(700, "sine", 0.05);
      }
    };

    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("mousedown", handlePointerDown);
    canvas.addEventListener("touchmove", handlePointerMove, { passive: true });
    canvas.addEventListener("touchstart", handlePointerDown, { passive: true });

    let nextId = 1;

    const render = () => {
      const { width, height, player, decisions, particles, lasers, running, startTime, duration } =
        gameState.current;

      ctx.clearRect(0, 0, width, height);

      // Clean minimal grid background
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (running) {
        const elapsed = (Date.now() - startTime) / 1000;
        const remaining = Math.max(0, Math.ceil(duration - elapsed));
        setTimeLeft(remaining);

        if (remaining <= 0) {
          endGame();
          return;
        }

        const now = Date.now();
        // Constant waterfall of decisions
        if (now - gameState.current.lastSpawn > 480) {
          // 90% Bad Decisions, 10% Good Decisions
          const isGood = Math.random() < 0.1; // EXACT 10% Good ratio
          const pool = isGood ? GOOD_DECISIONS : BAD_DECISIONS;
          const template = pool[Math.floor(Math.random() * pool.length)];

          decisions.push({
            id: nextId++,
            x: Math.random() * (width - 240) + 120,
            y: -30,
            width: isGood ? 170 : 160,
            height: 28,
            isGood,
            label: template.label,
            impactValue: template.impactValue,
            impactText: template.impactText,
            speed: isGood ? Math.random() * 0.8 + 2.2 : Math.random() * 1.2 + 2.0,
          });

          gameState.current.lastSpawn = now;
        }

        // Smooth player follow
        player.x += (player.targetX - player.x) * 0.22;

        // Update Lasers
        for (let i = lasers.length - 1; i >= 0; i--) {
          const l = lasers[i];
          l.y += l.vy;

          // Check if laser hits a bad decision (Dismiss it!)
          for (let j = decisions.length - 1; j >= 0; j--) {
            const dec = decisions[j];
            if (!dec.isGood) {
              const dx = Math.abs(l.x - dec.x);
              const dy = Math.abs(l.y - dec.y);
              if (dx < dec.width / 2 && dy < dec.height / 2 + 6) {
                // Successfully rejected bad decision
                spawnParticles(dec.x, dec.y, "#71717A", 12);
                decisions.splice(j, 1);
                lasers.splice(i, 1);
                gameState.current.badAvoidedCount++;
                setBadAvoided(gameState.current.badAvoidedCount);
                playSynth(300, "triangle", 0.08);
                break;
              }
            }
          }

          if (l.y < -20) {
            lasers.splice(i, 1);
          }
        }

        // Update Decisions
        for (let i = decisions.length - 1; i >= 0; i--) {
          const dec = decisions[i];
          dec.y += dec.speed;

          // Check collision with Player Basket
          const hitX = Math.abs(player.x - dec.x) < player.width / 2 + dec.width / 2.5;
          const hitY = Math.abs(player.y - dec.y) < player.height / 2 + dec.height / 2;

          if (hitX && hitY) {
            if (dec.isGood) {
              // CAUGHT 10% GOLD DECISION! -> Compounding Growth
              spawnParticles(dec.x, dec.y, "#10B981", 24);
              gameState.current.valuation = Math.max(50000, gameState.current.valuation + dec.impactValue);
              gameState.current.goodCount++;
              setGoodCaught(gameState.current.goodCount);
              setValuation(gameState.current.valuation);
              setFeedbackToast({ msg: `✨ Executed: ${dec.label} (${dec.impactText})`, type: "good" });
              playSynth(880, "sine", 0.18);
            } else {
              // HIT 90% BAD DECISION TRAP! -> Penalty
              spawnParticles(dec.x, dec.y, "#EF4444", 22);
              gameState.current.valuation = Math.max(10000, gameState.current.valuation + dec.impactValue);
              gameState.current.badHitCount++;
              setBadHit(gameState.current.badHitCount);
              setValuation(gameState.current.valuation);
              setFeedbackToast({ msg: `⚠️ Pitfall: ${dec.label} (${dec.impactText})`, type: "bad" });
              playSynth(180, "sawtooth", 0.2);
            }

            decisions.splice(i, 1);
            continue;
          }

          // Off screen bottom
          if (dec.y > height + 30) {
            if (!dec.isGood) {
              gameState.current.badAvoidedCount++;
              setBadAvoided(gameState.current.badAvoidedCount);
            }
            decisions.splice(i, 1);
          }
        }
      }

      // Draw Lasers
      for (const l of lasers) {
        ctx.fillStyle = "#18181B";
        ctx.fillRect(l.x - 1.5, l.y - 8, 3, 14);
      }

      // Draw Falling Decisions
      for (const dec of decisions) {
        ctx.save();
        ctx.translate(dec.x, dec.y);

        if (dec.isGood) {
          // Rare 10% Good Decision: Luminous Emerald/Gold Card
          ctx.shadowColor = "rgba(16, 185, 129, 0.4)";
          ctx.shadowBlur = 12;
          ctx.fillStyle = "#10B981"; // Emerald
          ctx.beginPath();
          ctx.roundRect(-dec.width / 2, -dec.height / 2, dec.width, dec.height, 14);
          ctx.fill();

          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 10px JetBrains Mono, monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`★ ${dec.label}`, 0, 0);
        } else {
          // 90% Bad Decision: Crisp Neutral Crimson/Slate Card
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.roundRect(-dec.width / 2, -dec.height / 2, dec.width, dec.height, 8);
          ctx.fill();

          ctx.strokeStyle = "#F87171"; // soft red border
          ctx.lineWidth = 1.2;
          ctx.stroke();

          ctx.fillStyle = "#DC2626";
          ctx.font = "500 10px JetBrains Mono, monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`✕ ${dec.label}`, 0, 0);
        }

        ctx.restore();
      }

      // Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.03;

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

      // Draw Player: Minimalist Obsidian Enterprise Catcher
      if (running || !gameOver) {
        ctx.save();
        ctx.translate(player.x, player.y);

        // Core Bar
        ctx.fillStyle = "#09090B";
        ctx.beginPath();
        ctx.roundRect(-player.width / 2, -player.height / 2, player.width, player.height, 12);
        ctx.fill();

        // High-end subtle highlight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label on catcher
        ctx.fillStyle = "#FAFAFA";
        ctx.font = "bold 9px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("STRATEGY CORE", 0, 0);

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("mousedown", handlePointerDown);
      cancelAnimationFrame(animId);
    };
  }, [soundEnabled, playSynth, gameOver]);

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-950/5 md:p-8">
      {/* Header & HUD */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl font-bold text-zinc-900 md:text-2xl">
              The Founder&apos;s Simulator: Scale to $100M+
            </h3>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-700 border border-amber-200">
              90% Traps • 10% Gold
            </span>
          </div>
          <p className="mt-0.5 font-mono text-xs text-zinc-500">
            Catch only the rare 10% winning moves. Dodge or zap the 90% bad advice.
          </p>
        </div>

        {/* Live HUD Stats */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-zinc-50 px-4 py-2 border border-zinc-200">
            <span className="block font-mono text-[10px] uppercase text-zinc-500">
              Business Valuation
            </span>
            <span className="font-serif text-lg font-bold text-zinc-900 md:text-xl">
              {formatCurrency(valuation)}
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 px-3.5 py-2 border border-zinc-200 text-center">
            <span className="block font-mono text-[10px] uppercase text-zinc-500">
              Timer
            </span>
            <span className="font-mono text-sm font-bold text-zinc-900">
              {timeLeft}s
            </span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-[#FAFAFA] md:h-[420px]">
        <canvas ref={canvasRef} className="h-full w-full cursor-crosshair touch-none" />

        {/* Toast alert feedback */}
        {feedbackToast && isPlaying && (
          <div
            className={`absolute top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 font-mono text-xs font-semibold shadow-md transition-all ${
              feedbackToast.type === "good"
                ? "bg-emerald-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {feedbackToast.msg}
          </div>
        )}

        {/* Start Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 p-6 text-center backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex max-w-md flex-col items-center"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-zinc-900 md:text-3xl">
                Can You Scale Your Business?
              </h4>
              <p className="mt-2 font-mono text-xs text-zinc-600 leading-relaxed">
                In the real world, <strong>90% of marketing tactics are expensive traps</strong>, and only <strong>10% generate real compounding growth</strong>.
              </p>
              <p className="mt-1 font-mono text-[11px] text-zinc-500">
                Catch the green decisions (★) and steer clear of the red traps (✕).
              </p>

              <button
                onClick={startGame}
                className="mt-6 flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-zinc-800 hover:scale-105"
              >
                <Play className="h-4 w-4 fill-white" /> Start Decision Sprint
              </button>

              <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                <span>🖱️ Move mouse to catch</span>
                <span>•</span>
                <span>💥 Click or Tap to blast bad advice</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Game Over / Final Valuation Screen */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 p-6 text-center backdrop-blur-md"
            >
              <div className="flex max-w-md flex-col items-center rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                  <Award className="h-6 w-6" />
                </div>

                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  Sprint Complete — Final Valuation:
                </span>
                <h4 className="mt-1 font-serif text-3xl font-extrabold text-zinc-900 md:text-4xl">
                  {formatCurrency(valuation)}
                </h4>

                <div className="mt-2 rounded-full bg-zinc-100 px-3.5 py-1 font-mono text-xs font-semibold text-zinc-800">
                  {getBusinessStage(valuation)}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 w-full border-t border-zinc-100 pt-3 text-center">
                  <div className="rounded-lg bg-emerald-50 p-2 border border-emerald-100">
                    <span className="block font-mono text-[10px] text-emerald-700">Good Moves</span>
                    <span className="font-mono text-sm font-bold text-emerald-900">{goodCaught}</span>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-2 border border-zinc-200">
                    <span className="block font-mono text-[10px] text-zinc-600">Traps Dodged</span>
                    <span className="font-mono text-sm font-bold text-zinc-900">{badAvoided}</span>
                  </div>
                  <div className="rounded-lg bg-red-50 p-2 border border-red-100">
                    <span className="block font-mono text-[10px] text-red-700">Traps Hit</span>
                    <span className="font-mono text-sm font-bold text-red-900">{badHit}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={startGame}
                    className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 font-mono text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Try Again
                  </button>

                  <a
                    href="#contact"
                    className="flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-zinc-800"
                  >
                    Deploy Real Growth Strategy <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rules Breakdown Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span>10% Winning Moves (3D CGI, Meta DCO, SEO Monopoly)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400" />
          <span>90% Expensive Traps (Vanity Metrics, Premature Hiring, Zero Attribution)</span>
        </div>
      </div>
    </div>
  );
}
