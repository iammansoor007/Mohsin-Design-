"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Play,
  MapPin,
  Clock,
  Trophy,
  Users,
  Smile,
  ArrowUpRight,
  Sparkles,
  Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import content from "@/data/content.json";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const drawVariants = {
  hidden: { pathLength: 0 },
  visible: (custom: { delay: number; duration: number }) => ({
    pathLength: 1,
    transition: {
      duration: custom?.duration ?? 0.5,
      delay: custom?.delay ?? 0.1,
      ease: "easeOut" as any
    }
  })
};

// ── 3D SPRING COUNTER COMPONENT ──
function RollerCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 80,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numValue);
    }
  }, [motionValue, numValue, isInView]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

// ── DYNAMIC CURSOR SPOTLIGHT CARD WRAPPER (Awwwards-Winner UI Effect) ──
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group/spotlight ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Spotlight Hover Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), rgba(3, 6, 172, 0.08), transparent 80%)`
        }}
      />
      {/* Dark mode Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 dark:group-hover/spotlight:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), rgba(233, 189, 54, 0.08), transparent 80%)`
        }}
      />

      {/* Inject custom variables dynamically to bypass CSS compiling limitations */}
      <div
        ref={(el) => {
          if (el) {
            mouseX.on("change", (x) => el.style.setProperty("--x", `${x}px`));
            mouseY.on("change", (y) => el.style.setProperty("--y", `${y}px`));
          }
        }}
        className="w-full h-full relative z-20"
      >
        {children}
      </div>
    </motion.div>
  );
}



// ── CUSTOM AD PLATFORM LOGOS ──
const GoogleAdsLogo = () => (
  <svg viewBox="0 0 48 48" className="h-5.5 w-auto shrink-0 filter drop-shadow-md">
    <path d="M34.7 4.3c-2.1 0-3.9 1-5.1 2.6L12.5 35.8c-1 1.7-1 3.8 0 5.5.9 1.6 2.6 2.5 4.5 2.5h20.3c3.2 0 5.7-2.6 5.7-5.7V10c0-3.1-2.5-5.7-5.7-5.7h-2.6z" fill="#F9BC05" />
    <path d="M12.5 35.8L29.6 6.9c1.2-1.6 3-2.6 5.1-2.6H17c-1.9 0-3.6.9-4.5 2.5L2.6 24.3c-1.8 3.1-.7 7.1 2.4 8.9l7.5 2.6z" fill="#4285F4" />
  </svg>
);

const MetaLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5.5 w-auto fill-[#0668E1] shrink-0 filter drop-shadow-md">
    <path d="M16.48 7.38c-1.34 0-2.58.55-3.5 1.55-.92-1-2.16-1.55-3.5-1.55-2.73 0-4.96 2.23-4.96 4.96s2.23 4.96 4.96 4.96c1.34 0 2.58-.55 3.5-1.55.92 1 2.16 1.55 3.5 1.55 2.73 0 4.96-2.23 4.96-4.96s-2.23-4.96-4.96-4.96zm-7 8.08c-1.72 0-3.12-1.4-3.12-3.12s1.4-3.12 3.12-3.12 3.12 1.4 3.12 3.12-1.4 3.12-3.12 3.12zm7 0c-1.72 0-3.12-1.4-3.12-3.12s1.4-3.12 3.12-3.12 3.12 1.4 3.12 3.12-1.4 3.12-3.12 3.12z" />
  </svg>
);

const AmazonLogo = () => (
  <svg viewBox="0 0 48 48" className="h-4.5 w-auto fill-brand-dark dark:fill-white shrink-0">
    <path d="M26.4 12c-6.1 0-10.4 3.6-10.4 9.8 0 5.4 3.2 8.4 8.1 8.4 4 0 6.6-1.9 8.1-3.9v3.1h5.8V12.4h-5.8v3.1c-1.6-2.1-4.2-3.5-8.1-3.5zm.9 12.3c-3 0-4.6-1.6-4.6-4.2s1.6-4.2 4.6-4.2 4.6 1.6 4.6 4.2-1.6 4.2-4.6 4.2z" />
    <path d="M12 38c10.4 6 22.4 4 28-2" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M38 34l3.5 3.5-1.5 4" fill="#FF9900" />
  </svg>
);

const BingLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5.5 w-auto fill-[#008373] dark:fill-[#00b29a] shrink-0">
    <path d="M5 2L15 6v12l-6 4v-9l6-2V6L5 2z" />
  </svg>
);

const AppleLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5.5 w-auto fill-brand-dark dark:fill-white shrink-0">
    <path d="M18.7 18.5c-.8 1.2-1.7 2.4-3 2.4-1.3 0-1.7-.8-3.2-.8s-2 .8-3.2.8c-1.3 0-2.3-1.2-3.1-2.4C4.6 16 3.3 10.9 4.9 8.1c.8-1.4 2.2-2.3 3.8-2.3 1.2 0 2.4.8 3.2.8.7 0 2.1-.9 3.6-.9 1.5 0 2.9.5 3.8 1.8-3.1 1.8-2.6 6-0.1 7.2-.9 2.2-2.1 4.5-3.5 5.8zM15.9 4.2c.8-.9 1.3-2.2 1.1-3.5-1.1.1-2.5.8-3.3 1.8-.7.8-1.3 2.1-1.1 3.4 1.2.1 2.5-.7 3.3-1.7z" />
  </svg>
);

const EbayLogo = () => (
  <svg viewBox="0 0 48 24" className="h-6 w-auto shrink-0">
    <text x="0" y="18" className="font-sans font-black text-lg tracking-tight" fill="#E53238">e</text>
    <text x="11" y="18" className="font-sans font-black text-lg tracking-tight" fill="#0064D2">b</text>
    <text x="23" y="18" className="font-sans font-black text-lg tracking-tight" fill="#F5B100">a</text>
    <text x="34" y="18" className="font-sans font-black text-lg tracking-tight" fill="#86B817">y</text>
  </svg>
);

const RedditLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5.5 w-auto fill-[#FF4500] shrink-0">
    <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.23-1.72l1.32-4.14 4.3.92c.04.9.78 1.6 1.7 1.6 1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8c-.84 0-1.54.58-1.74 1.36l-4.78-1.02c-.2-.04-.4.06-.48.24l-1.54 4.8c-2.42.04-4.66.68-6.32 1.68-.56-.74-1.46-1.2-2.42-1.2-1.65 0-3 1.35-3 3 0 1.1.6 2.06 1.48 2.58-.08.3-.12.62-.12.94 0 3.86 4.48 7 10 7s10-3.14 10-7c0-.32-.04-.64-.12-.94.88-.52 1.48-1.48 1.48-2.58z" />
  </svg>
);

export default function LocationPage() {
  const router = useRouter();
  const { locationPage } = content;

  return (
    <main className="flex-1 w-full bg-white dark:bg-[#080710] text-brand-dark dark:text-white transition-colors duration-300 relative overflow-x-clip">

      {/* ── BACKGROUND ART & EFFECTS ── */}
      <div className="absolute top-0 left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-brand-blue/[0.04] to-indigo-500/[0.02] dark:from-brand-blue/[0.08] dark:to-indigo-500/[0.04] blur-[140px] pointer-events-none select-none -z-10 animate-float-blob" />
      <div className="absolute top-[25%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-brand-yellow/[0.03] to-amber-500/[0.01] dark:from-brand-yellow/[0.06] dark:to-amber-500/[0.02] blur-[160px] pointer-events-none select-none -z-10 animate-float-blob-delayed" />
      <div className="absolute bottom-[20%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/[0.02] dark:bg-brand-blue/[0.05] blur-[150px] pointer-events-none select-none -z-10 animate-float-blob" />
      <div className="absolute bottom-0 right-[-10%] w-[45vw] h-[45vw] rounded-full bg-brand-yellow/[0.02] dark:bg-brand-yellow/[0.04] blur-[130px] pointer-events-none select-none -z-10 animate-float-blob-delayed" />

      {/* Modern thin interactive background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0306ac05_1px,transparent_1px),linear-gradient(to_bottom,#0306ac05_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none -z-10" />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 min-h-[460px] lg:min-h-[520px] flex items-center">

        {/* Full-Bleed Background Images */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {/* Light Theme BG Image */}
          <img
            src="/locationhero.png"
            alt="Locations Hero Background"
            className="w-full h-full object-cover object-right block dark:hidden"
          />
          {/* Dark Theme BG Image */}
          <img
            src="/locationherodark.png"
            alt="Locations Hero Background Dark"
            className="w-full h-full object-cover object-right hidden dark:block"
          />

          {/* Readability Gradient Vignette (Left to Right) */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#080710] dark:via-[#080710]/80 dark:to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-[#080710] dark:to-transparent pointer-events-none" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Star Badge Matching About & Home */}
              <div className="inline-flex pointer-events-auto">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-[10px] font-black tracking-wider uppercase text-[#080710] select-none shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-[#080710] text-[#080710] shrink-0" />
                  {locationPage.hero.eyebrow}
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-brand-dark dark:text-white max-w-xl">
                {locationPage.hero.titleIntro}
                <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1 font-black">
                  {locationPage.hero.titleHighlight}
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3.5 pointer-events-none text-brand-yellow opacity-90" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <motion.path
                      d="M 2 5 Q 50 1.5, 98 3.5 C 99 3.5, 99 4.5, 98 5 Q 50 7, 2 5.5 Z"
                      fill="currentColor"
                      custom={{ delay: 0.45, duration: 0.65 }}
                      variants={drawVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-lg">
                {locationPage.hero.description}
              </p>

              {/* Standard Primary & Secondary Buttons matching About & Home */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href={locationPage.hero.ctaPrimaryHref} className="btn-primary-cta">
                  <span>{locationPage.hero.ctaPrimaryText}</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>

                <button className="btn-secondary-cta">
                  <span>{locationPage.hero.ctaSecondaryText}</span>
                  <span className="btn-icon"><Play className="h-3.5 w-3.5 fill-current ml-0.5" /></span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: Open space to let full background image show through */}
            <div className="lg:col-span-5 hidden lg:block" />

          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR SECTION with 3D Spring Roller Counters ── */}
      <section className="relative overflow-hidden py-12 md:py-16 border-b border-brand-zinc-200 dark:border-white/10 bg-zinc-50/10 dark:bg-[#0c0b18]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Experience Card */}
            <div className="bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/5 p-6 rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex items-center gap-4 hover:-translate-y-1 hover:border-brand-blue/30 dark:hover:border-brand-yellow/30 transition-all duration-300 group">
              <div className="h-11 w-11 rounded-full bg-blue-50 dark:bg-blue-500/10 text-brand-blue dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block font-heading font-black text-3xl text-brand-dark dark:text-white leading-none">
                  <RollerCounter value={locationPage.stats.experience.value} />
                </span>
                <span className="block text-[11px] font-sans text-brand-zinc-550 dark:text-zinc-400 mt-1">{locationPage.stats.experience.label}</span>
              </div>
            </div>

            {/* Countries Card */}
            <div className="bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/5 p-6 rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex items-center gap-4 hover:-translate-y-1 hover:border-brand-blue/30 dark:hover:border-brand-yellow/30 transition-all duration-300 group">
              <div className="h-11 w-11 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block font-heading font-black text-3xl text-brand-dark dark:text-white leading-none">
                  <RollerCounter value={locationPage.stats.countries.value} />
                </span>
                <span className="block text-[11px] font-sans text-brand-zinc-550 dark:text-zinc-400 mt-1">{locationPage.stats.countries.label}</span>
              </div>
            </div>

            {/* Clients Card */}
            <div className="bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/5 p-6 rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex items-center gap-4 hover:-translate-y-1 hover:border-brand-blue/30 dark:hover:border-brand-yellow/30 transition-all duration-300 group">
              <div className="h-11 w-11 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block font-heading font-black text-3xl text-brand-dark dark:text-white leading-none">
                  <RollerCounter value={locationPage.stats.clients.value} />
                </span>
                <span className="block text-[11px] font-sans text-brand-zinc-550 dark:text-zinc-400 mt-1">{locationPage.stats.clients.label}</span>
              </div>
            </div>

            {/* Satisfaction Card */}
            <div className="bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/5 p-6 rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex items-center gap-4 hover:-translate-y-1 hover:border-brand-blue/30 dark:hover:border-brand-yellow/30 transition-all duration-300 group">
              <div className="h-11 w-11 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Smile className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block font-heading font-black text-3xl text-brand-dark dark:text-white leading-none">
                  <RollerCounter value={locationPage.stats.satisfaction.value} />
                </span>
                <span className="block text-[11px] font-sans text-brand-zinc-550 dark:text-zinc-400 mt-1">{locationPage.stats.satisfaction.label}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. LOGO RUNS ADS INFINITE MARQUEE ── */}
      <section className="py-7 border-b border-brand-zinc-200 dark:border-white/10 bg-zinc-50/20 dark:bg-[#0c0b18]/40 select-none overflow-hidden logo-marquee-wrapper relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#080710] z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#080710] z-20 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center gap-6">
          <span className="text-[11px] font-mono font-black text-brand-blue dark:text-brand-yellow uppercase tracking-widest text-center md:text-left shrink-0">
            {locationPage.brandsStrip.heading}
          </span>

          <div className="flex-1 overflow-hidden relative">
            <div className="logo-marquee-track gap-12 md:gap-16 items-center">

              {[...Array(3)].map((_, outerIdx) => (
                <div key={outerIdx} className="flex gap-12 md:gap-16 items-center">
                  {locationPage.brandsStrip.logos.map((logoItem: any, lIdx: number) => {
                    const LogoComponent =
                      logoItem.name.includes("Google") ? GoogleAdsLogo :
                        logoItem.name.includes("Meta") ? MetaLogo :
                          logoItem.name.includes("Amazon") ? AmazonLogo :
                            logoItem.name.includes("Bing") ? BingLogo :
                              logoItem.name.includes("Apple") ? AppleLogo :
                                logoItem.name.includes("eBay") ? EbayLogo : RedditLogo;

                    return (
                      <div key={lIdx} className="flex items-center gap-2.5 font-sans text-xs font-black uppercase text-brand-dark dark:text-white tracking-wider whitespace-nowrap">
                        <LogoComponent />
                        <span>{logoItem.name}</span>
                      </div>
                    );
                  })}
                </div>
              ))}

            </div>
          </div>
        </div>

        <style>{`
          @keyframes marqueeLogos {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.33%, 0, 0); }
          }
          .logo-marquee-track {
            display: flex;
            width: max-content;
            animation: marqueeLogos 24s linear infinite;
            will-change: transform;
          }
          .logo-marquee-wrapper:hover .logo-marquee-track {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ── 4. COUNTRIES WE SERVE ── */}
      <section className="relative overflow-hidden py-20 md:py-28 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 space-y-16">

          {/* Header Block with Cursive Indicator Aligned Cleanly */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-widest text-brand-blue dark:text-brand-yellow uppercase select-none">
                <span>{locationPage.presence.eyebrow}</span>
                <span className="h-[2px] w-8 bg-brand-blue dark:bg-brand-yellow" />
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                {locationPage.presence.titleIntro}{" "}
                <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">
                  {locationPage.presence.titleHighlight}
                </span>
              </h2>

              <p className="text-sm sm:text-base font-sans text-brand-zinc-650 dark:text-zinc-355 font-normal leading-relaxed">
                {locationPage.presence.description}
              </p>
            </div>

            {/* Cursive Text & Arrow Block Aligned Next to Header */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-end pb-2 md:pr-10 select-none pointer-events-none">
              <svg className="w-12 h-12 text-brand-blue dark:text-brand-yellow transform rotate-[15deg] animate-bounce-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M20 70 Q 50 60, 70 20" />
                <path d="M55 25 L70 20 L75 35" strokeLinejoin="round" />
              </svg>
              <span className="font-cursive text-2xl text-brand-blue dark:text-brand-yellow font-bold transform -rotate-[5deg]">
                {locationPage.presence.cursiveText}
              </span>
            </div>
          </div>

          {/* Location Cards Stack with Spotlight Hover Glow Effects */}
          <div className="space-y-10">
            {locationPage.presence.countries.map((country: any) => {
              const flagSrc = country.id === "USA" ? "/flag_usa.png" : country.id === "NZ" ? "/flag_nz.png" : "/flag_au.png";
              const countrySlug = country.id === "USA" ? "usa" : slugify(country.name);
              const countryUrl = `/${countrySlug}/`;
              return (
                <div
                  key={country.id}
                  onClick={() => router.push(countryUrl)}
                  className="block no-underline group/card-link cursor-pointer"
                >
                  <SpotlightCard 
                    className="rounded-[28px] border border-brand-zinc-200 dark:border-white/10"
                  >
                    <div className="bg-white dark:bg-[#0c0b18] p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-center relative overflow-hidden group/card cursor-pointer">
                      
                      {/* Subtle background radial glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(#0306ac02_1px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff01_1px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none" />

                      {/* Left Column: Visual Artwork & Flag */}
                      <div className="w-full lg:w-[35%] h-[260px] sm:h-[280px] rounded-[22px] overflow-hidden relative border border-brand-zinc-200 dark:border-white/10 shrink-0 bg-[#0c0b18]">
                        <img 
                          src={country.image} 
                          alt={country.name} 
                          className="w-full h-full object-cover group-hover/card:scale-[1.05] transition-transform duration-700 pointer-events-none filter contrast-[1.03]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Country Tag Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-[#080710]/90 backdrop-blur-md border border-white/20 dark:border-white/10 px-3 py-1 rounded-full">
                          <span className="text-[10px] font-mono font-black text-brand-blue dark:text-brand-yellow uppercase tracking-wider">
                            {country.subtitle}
                          </span>
                        </div>

                        {/* Floating Flag Badge */}
                        <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full overflow-hidden border-2 border-white dark:border-[#080710] shadow-2xl flex items-center justify-center bg-white dark:bg-[#0c0b18]">
                          <img 
                            src={flagSrc}
                            alt={`${country.name} Flag`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Right Column: Information & Interactive States */}
                      <div className="flex-1 flex flex-col justify-between space-y-5 text-left relative z-20 w-full">
                        <div className="space-y-4">
                          
                          {/* Title & Button Row */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-zinc-200/80 dark:border-white/10 pb-4">
                            <div>
                              <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-dark dark:text-white tracking-tight group-hover/card:text-brand-blue dark:group-hover/card:text-brand-yellow transition-colors duration-300">
                                {country.name}
                              </h3>
                              <span className="block text-[11px] font-mono font-bold text-brand-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
                                {country.tagline}
                              </span>
                            </div>

                            <Link 
                              href={countryUrl}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 dark:bg-brand-yellow/10 border border-brand-blue/20 dark:border-brand-yellow/20 px-5 py-2 text-[11px] font-mono font-black uppercase text-brand-blue dark:text-brand-yellow group-hover/card:bg-brand-blue dark:group-hover/card:bg-brand-yellow group-hover/card:text-white dark:group-hover/card:text-[#080710] transition-all duration-300 shrink-0 no-underline"
                            >
                              <span>{country.buttonText}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                            </Link>
                          </div>

                          {/* Country Description */}
                          <p className="text-xs sm:text-sm font-sans text-brand-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {country.description}
                          </p>

                          {/* States Badge List */}
                          <div className="pt-2 space-y-2.5">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-brand-blue dark:text-brand-yellow" />
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-zinc-400 dark:text-zinc-500">{locationPage.presence.locationsLabel}</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {country.states.map((state: string, sIdx: number) => (
                                <Link 
                                  key={sIdx} 
                                  href={`/${countrySlug}/${slugify(state)}/`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-brand-zinc-200/80 dark:border-white/10 px-3.5 py-1.5 text-[10px] font-mono font-bold text-brand-zinc-700 dark:text-zinc-300 uppercase hover:border-brand-blue dark:hover:border-brand-yellow hover:text-brand-blue dark:hover:text-brand-yellow hover:scale-105 transition-all duration-200 no-underline"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue dark:bg-brand-yellow" />
                                  {state}
                                </Link>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Cursive Font Injector */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }
      `}} />

      {/* ── 5. CTA BANNER SECTION ── */}
      <section className="relative overflow-hidden py-8 sm:py-12 bg-white dark:bg-[#080710]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
          <div className="cta-banner-card">
            <div className="relative z-10 flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14 lg:max-w-[58%]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-[10px] font-mono tracking-widest text-[#E9BD36] font-extrabold uppercase w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9BD36] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E9BD36]" />
                </span>
                {locationPage.ctaBanner.eyebrow}
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.18] tracking-tight text-white">
                {locationPage.ctaBanner.titleIntro}
                <span className="whitespace-nowrap inline-block">
                  {locationPage.ctaBanner.titleWord1}
                  <span className="relative inline-block">
                    <span className="font-cursive text-[#E9BD36] text-3xl sm:text-4xl lg:text-5xl font-normal pl-1">{locationPage.ctaBanner.titleWord2}</span>
                    <svg className="absolute left-0 bottom-[-2px] w-full h-3 text-[#E9BD36]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M 5 6 C 30 9, 70 9, 95 4" />
                    </svg>
                  </span>
                </span>
              </h2>

              <p className="text-sm sm:text-base font-sans text-white/90 font-normal leading-relaxed max-w-lg">
                {locationPage.ctaBanner.description}
              </p>

              <div className="flex items-center gap-4 flex-wrap pt-2">
                <a href={locationPage.ctaBanner.ctaPrimaryHref} className="btn-primary-cta">
                  <span>{locationPage.ctaBanner.ctaPrimaryText}</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>

                <a href={locationPage.ctaBanner.ctaSecondaryHref} className="btn-secondary-cta no-underline">
                  <span>{locationPage.ctaBanner.ctaSecondaryText}</span>
                  <span className="btn-icon"><Play className="h-3.5 w-3.5 fill-current ml-0.5" /></span>
                </a>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 items-end justify-center relative pr-8">
              <div className="absolute bottom-0 w-[320px] h-[320px] bg-gradient-to-t from-[#020485] to-[#0408d9] rounded-full opacity-90 border border-white/20 shadow-2xl" />
              <div className="relative z-10 w-[280px] h-[370px] self-end drop-shadow-2xl overflow-hidden rounded-t-[32px] border-t border-l border-r border-white/25 shadow-2xl">
                <Image src={locationPage.ctaBanner.portraitSrc} alt={locationPage.ctaBanner.portraitAlt} width={320} height={420} className="w-full h-full object-cover object-top filter contrast-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010356]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute top-16 right-28 h-3.5 w-3.5 rounded-full bg-[#E9BD36] shadow-[0_0_15px_#E9BD36] z-20" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
