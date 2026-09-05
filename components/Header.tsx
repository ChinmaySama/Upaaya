"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ScooterGameModal } from "@/components/ScooterGameModal";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Video Solutions", href: "/video-solutions" },
  { name: "Strategic Digital Growth", href: "/digital-growth" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gameModalOpen, setGameModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 font-sans ${
          scrolled
            ? "bg-white/95 py-4 shadow-xs backdrop-blur-md border-b border-[#e2e2e2]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Brand Anchor (Syne) */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-[#111111] transition-colors group-hover:text-[#e5a910]">
              upaaya
            </span>
            <span className="rounded-md bg-[#111111] px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest text-[#ffd100] border border-[#ffd100]/30">
              studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase font-semibold tracking-[0.16em] text-slate-600 transition-colors hover:text-[#111111]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Scooter Game Button */}
            <button
              onClick={() => setGameModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-[#e2e2e2] bg-white px-4 py-2 text-xs font-bold text-[#111111] shadow-xs transition-all hover:border-[#ffd100] hover:bg-[#ffd100]/15 hover:scale-105"
            >
              <span>🛵 Take a break • Play Game</span>
            </button>

            <Link
              href="/#contact"
              className="flex items-center gap-1.5 rounded-full bg-[#ffd100] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] shadow-xs transition-all hover:bg-[#e5a910] hover:shadow-[0_0_15px_rgba(255,209,0,0.4)]"
            >
              <span>Talk</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setGameModalOpen(true)}
              className="rounded-full border border-[#e2e2e2] bg-white px-3 py-1 text-xs font-bold text-[#111111]"
            >
              🛵 Play Game
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e2e2e2] bg-white text-[#111111]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-[#e2e2e2] bg-white px-6 py-6 shadow-xl md:hidden font-sans">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-slate-700 hover:text-[#111111]"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#ffd100] py-3 text-xs font-bold uppercase text-[#111111]"
              >
                Book Discovery Call
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Scooter Game Modal */}
      <ScooterGameModal
        isOpen={gameModalOpen}
        onClose={() => setGameModalOpen(false)}
      />
    </>
  );
}
