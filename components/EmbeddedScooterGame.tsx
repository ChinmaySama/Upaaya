"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Award, Zap } from "lucide-react";

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
  { label: "+₹25L Viral 3D", shape: "coin" as const, width: 110, height: 26, inrImpact: 2500000, inrText: "+₹25 Lakhs" },
  { label: "+₹50L Meta Ads", shape: "coin" as const, width: 110, height: 26, inrImpact: 5000000, inrText: "+₹50 Lakhs" },
  { label: "+₹35L SEO Rank", shape: "coin" as const, width: 110, height: 26, inrImpact: 3500000, inrText: "+₹35 Lakhs" },
  { label: "+₹15L CRO Boost", shape: "coin" as const, width: 110, height: 26, inrImpact: 1500000, inrText: "+₹15 Lakhs" },
  { label: "+₹1Cr Brand Moat", shape: "coin" as const, width: 120, height: 26, inrImpact: 10000000, inrText: "+₹1 Crore" },
  { label: "+₹2Cr Retention", shape: "coin" as const, width: 115, height: 26, inrImpact: 20000000, inrText: "+₹2 Crores" },
  { label: "+₹40L 4K Film", shape: "coin" as const, width: 105, height: 26, inrImpact: 4000000, inrText: "+₹40 Lakhs" },
];

// 90% TRAFFIC OBSTACLES & TRAPS (Simple words & Distinct Shapes)
const TRAFFIC_TRAPS = [
  { label: "Auto -₹5L", shape: "auto" as const, width: 95, height: 32, inrImpact: -500000, inrText: "-₹5 Lakhs" },
  { label: "Pothole -₹2L", shape: "pothole" as const, width: 95, height: 26, inrImpact: -200000, inrText: "-₹2 Lakhs" },
  { label: "Fake Bots -₹3L", shape: "trap" as const, width: 110, height: 26, inrImpact: -300000, inrText: "-₹3 Lakhs" },
  { label: "Ad Waste -₹8L", shape: "trap" as const, width: 110, height: 26, inrImpact: -800000, inrText: "-₹8 Lakhs" },
  { label: "Bus -₹7L", shape: "bus" as const, width: 105, height: 34, inrImpact: -700000, inrText: "-₹7 Lakhs" },
  { label: "No Track -₹10L", shape: "trap" as const, width: 115, height: 26, inrImpact: -1000000, inrText: "-₹10 Lakhs" },
  { label: "Slow Site -₹9L", shape: "trap" as const, width: 110, height: 26, inrImpact: -900000, inrText: "-₹9 Lakhs" },
  { label: "Traffic -₹4L", shape: "trap" as const, width: 100, height: 26, inrImpact: -400000, inrText: "-₹4 Lakhs" },
];

export function EmbeddedScooterGame() {
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
    scooter: { x: 350, y: 360, targetX: 350, width: 28, height: 50, tilt: 0 },
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
    width: 700,
    height: 440,
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
    const w = canvas?.clientWidth || 700;
    const h = canvas?.clientHeight || 440;

    gameState.current = {
      scooter: { x: w / 2, y: h - 65, targetX: w / 2, width: 28, height: 52, tilt: 0 },
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
      ctx.fillStyle = "#EAEAEA";
      ctx.fillRect(0, 0, width, height);

      // Asphalt Road
      const roadLeft = width * 0.12;
      const roadWidth = width * 0.76;
      ctx.fillStyle = "#111111";
      ctx.fillRect(roadLeft, 0, roadWidth, height);

      // Kerb Stripes (#ffd100)
      ctx.fillStyle = "#ffd100";
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
          ctx.font = "bold 10px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("★", -w / 2 + h / 2, 0);

          // Simple Punchy Text
          ctx.fillStyle = "#111111";
          ctx.font = "bold 10px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(obs.label, 8, 0);
        } else if (obs.shape === "auto") {
          // 2. AUTO-RICKSHAW VEHICLE SHAPE
          // Green bottom chassis
          ctx.fillStyle = "#15803d";
          ctx.beginPath();
          ctx.roundRect(-w / 2, -h / 2, w, h, 6);
          ctx.fill();

          // Yellow canopy top
          ctx.fillStyle = "#eab308";
          ctx.fillRect(-w / 2 + 3, -h / 2 + 2, w - 6, 6);

          // Windshield text panel
          ctx.fillStyle = "#111111";
          ctx.beginPath();
          ctx.roundRect(-w / 2 + 4, -h / 2 + 9, w - 8, h - 12, 3);
          ctx.fill();

          ctx.fillStyle = "#fef08a";
          ctx.font = "bold 9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(obs.label, 0, 4);
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
          ctx.fillRect(-w / 2 + 4, -h / 2 + 7, w - 8, h - 11);

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

        // Body Chassis (#ffd100)
        ctx.fillStyle = "#ffd100";
        ctx.beginPath();
        ctx.roundRect(-10, -12, 20, 28, 6);
        ctx.fill();

        // Seat
        ctx.fillStyle = "#111111";
        ctx.beginPath();
        ctx.roundRect(-6, -4, 12, 16, 4);
        ctx.fill();

        // Handlebars
        ctx.fillStyle = "#E2E8F0";
        ctx.fillRect(-14, -18, 28, 4);

        // Mirrors
        ctx.fillStyle = "#ffd100";
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
        ctx.fillStyle = "#ffd100";
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
  }, [soundEnabled, playSound, gameOver]);

  return (
    <section id="game-section" className="relative px-6 py-20 md:px-16 max-w-5xl mx-auto font-sans">
      {/* Section CTA Header */}
      <div className="mb-6">
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          Take a break. Play a quick game.
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#e2e2e2] bg-white p-6 shadow-xl md:p-8 text-[#111111]">
        {/* Game Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e2e2e2] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd100]/20 text-2xl border border-[#ffd100]/40">
              🛵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-2xl font-bold text-[#111111]">
                  Indian Traffic &amp; Growth Hustle
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                Use mouse / finger to steer scooter • Collect gold boosts &amp; avoid traps
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-50 px-4 py-2 border border-[#e2e2e2] text-center">
              <span className="block text-[9px] uppercase text-slate-400 font-semibold tracking-wider">
                Valuation (INR)
              </span>
              <span className="font-heading text-xl font-bold text-[#e5a910]">
                {formatINR(valuationINR)}
              </span>
            </div>

            <div className="rounded-xl bg-slate-50 px-3.5 py-2 border border-[#e2e2e2] text-center">
              <span className="block text-[9px] uppercase text-slate-400 font-semibold tracking-wider">
                Timer
              </span>
              <span className="text-sm font-bold text-[#111111]">
                {timeLeft}s
              </span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2e2e2] text-slate-600 hover:text-[#111111] hover:border-[#ffd100]"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-[#e5a910]" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Embedded Canvas */}
        <div className="relative mt-4 h-[380px] md:h-[420px] w-full overflow-hidden rounded-2xl border border-[#e2e2e2] bg-[#111111]">
          <canvas ref={canvasRef} className="h-full w-full touch-none cursor-ew-resize" />

          {/* Start Screen */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 p-6 text-center backdrop-blur-xs">
              <div className="mb-2 text-4xl">🛵💨</div>
              <h4 className="font-heading text-3xl font-extrabold text-white">
                Can You Master Traffic &amp; Scale Up?
              </h4>
              <p className="mt-2 text-xs text-slate-300 max-w-md leading-relaxed font-normal">
                Steer your scooter through city traffic and collect golden growth rewards!
              </p>

              <button
                onClick={startGame}
                className="mt-6 flex items-center gap-2 rounded-full bg-[#ffd100] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] shadow-[0_0_25px_rgba(255,209,0,0.4)] hover:bg-[#e5a910] hover:scale-105 transition-all"
              >
                <Play className="h-4 w-4 fill-black" /> Kick Start Scooter
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 p-6 text-center backdrop-blur-sm">
              <div className="mb-2 text-3xl">🏆</div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Sprint Complete — Final Valuation:
              </span>
              <h4 className="mt-1 font-heading text-4xl font-extrabold text-[#ffd100]">
                {formatINR(valuationINR)}
              </h4>
              <div className="mt-2 rounded-full bg-[#222222] px-4 py-1 text-xs font-bold text-white border border-[#333333]">
                {getIndianBusinessRank(valuationINR)}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 w-full max-w-xs text-xs">
                <div className="rounded-lg bg-[#ffd100]/20 p-2.5 text-[#ffd100] border border-[#ffd100]/40 font-semibold">
                  Boosts: <strong>{goodCaught}</strong>
                </div>
                <div className="rounded-lg bg-red-500/20 p-2.5 text-red-400 border border-red-500/30 font-semibold">
                  Traps Hit: <strong>{trapsHit}</strong>
                </div>
              </div>

              <button
                onClick={startGame}
                className="mt-6 flex items-center gap-2 rounded-full bg-[#ffd100] px-7 py-3 text-xs font-bold uppercase text-[#111111] hover:bg-[#e5a910]"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Ride Again
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium">
          <span>🖱️ Move mouse / touch horizontally to steer scooter</span>
          <span>10% Winning Moves • 90% Traffic Traps</span>
        </div>
      </div>
    </section>
  );
}
