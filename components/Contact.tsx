"use client";

import { useState } from "react";
import { Float } from "@/components/ui/Float";
import { CheckCircle2, Send, Clock, Mail, ShieldCheck, Sparkles } from "lucide-react";

const SLOTS = ["10:00 AM EST", "1:30 PM EST", "3:45 PM EST", "5:15 PM EST"];

const SERVICE_OPTIONS = [
  "Paid Media & ROAS Scaling",
  "3D Motion & CGI Animation",
  "Search Engine Optimization (SEO)",
  "Commercial Video Production",
  "Brand Strategy & Ideation",
  "Organic Social Management & SMO",
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative px-6 py-28 md:px-16 max-w-7xl mx-auto border-t border-[#e2e2e2] font-sans text-[#111111]"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-start">
        {/* Contact Info Header */}
        <Float distance={6} duration={5}>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd100] bg-[#ffd100]/20 px-4 py-1.5 text-xs font-bold text-[#111111] shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#e5a910]" />
              <span>// Direct Studio Access</span>
            </div>

            <h2 className="mt-4 font-heading text-4xl font-extrabold text-[#111111] md:text-6xl leading-[1.08] tracking-tight">
              Ready to scale your vision?
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-slate-600 md:text-base font-normal">
              Tell us where you want your brand to go. From smart search optimization and targeted media to full-scale commercial production , we have the tools to engineer the path for you.
            </p>

            <div className="mt-10 space-y-4 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[#111111] border border-[#e2e2e2]">
                  <Mail className="h-4 w-4" />
                </div>
                <span>hello@upaaya.studio</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffd100]/20 text-[#111111] border border-[#ffd100]/40">
                  <ShieldCheck className="h-4 w-4 text-[#e5a910]" />
                </div>
                <span>Confidential NDA Guaranteed • 24hr Response Time</span>
              </div>
            </div>
          </div>
        </Float>

        {/* Basic Clean Contact Form */}
        <div className="rounded-3xl border border-[#e2e2e2] bg-white p-8 shadow-md">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffd100]/20 text-[#111111] mb-4 border border-[#ffd100]">
                <CheckCircle2 className="h-8 w-8 text-[#e5a910]" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#111111]">
                Message Received!
              </h3>
              <p className="mt-2 text-sm text-slate-600 max-w-sm font-normal">
                Thank you, <strong className="text-[#111111]">{name || "there"}</strong>. We have received your message and will get back to <strong>{email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-full border border-[#ffd100] bg-[#ffd100] px-6 py-2 text-xs font-bold text-[#111111] hover:bg-[#e5a910]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#e2e2e2] bg-white px-4 py-3 text-xs text-[#111111] placeholder:text-slate-400 focus:border-[#ffd100] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#e2e2e2] bg-white px-4 py-3 text-xs text-[#111111] placeholder:text-slate-400 focus:border-[#ffd100] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Message / Project Goals
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your brand, what you're looking to build or scale..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-[#e2e2e2] bg-white px-4 py-3 text-xs text-[#111111] placeholder:text-slate-400 focus:border-[#ffd100] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#ffd100] py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] shadow-[0_0_20px_rgba(255,209,0,0.35)] transition-all hover:bg-[#e5a910] hover:scale-[1.01]"
              >
                <Send className="h-3.5 w-3.5 fill-black" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
