"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Search,
  Monitor,
  Megaphone,
  MousePointerClick,
  Palette,
  PenTool,
  ShoppingCart,
  BarChart2,
  CheckCircle2,
} from "lucide-react";
import contentData from "@/data/content.json";
import Link from "next/link";
import { slugify } from "@/lib/services";


// ── Icon resolver ─────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Search,
  Monitor,
  Megaphone,
  MousePointerClick,
  Palette,
  PenTool,
  ShoppingCart,
  BarChart2,
};

// ── SVG underline draw variant ────────────────────────────────────────────────
const drawVariants = {
  hidden: { pathLength: 0 },
  visible: (custom: { delay: number; duration: number }) => ({
    pathLength: 1,
    transition: {
      duration: custom?.duration ?? 0.4,
      delay: custom?.delay ?? 0.1,
      ease: "easeOut" as const,
    },
  }),
};

// ── Interactive ServiceCard helper (award-level micro-interactions) ───────────
function ServiceCard({
  card,
  index,
}: {
  card: {
    id: string;
    iconName: string;
    tag: string;
    title: string;
    desc: string;
    features: string[];
    color: string;
    href: string;
  };
  index: number;
}) {
  const Icon = iconMap[card.iconName] ?? Search;
  const [coords, setCoords] = useState({ x: "50%", y: "50%" });

  // Calculate cursor position for interactive card spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <Link href={`/services/${slugify(card.title)}`} className="w-full flex">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        style={{
          ["--x" as any]: coords.x,
          ["--y" as any]: coords.y,
        }}
        className="group interactive-border-shine rounded-[32px] p-8 flex flex-col gap-6 overflow-hidden cursor-pointer w-full"
      >
        {/* Border Beam Accent line that slides on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-blue via-blue-500 to-brand-blue dark:from-brand-yellow dark:via-amber-400 dark:to-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

        {/* Premium Grid Dot Background texture */}
        <div className="absolute inset-0 bg-grid-blue-8 bg-[size:24px_24px] opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none z-0" />

        {/* Ghost large number — decorative background */}
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 font-heading font-black text-[96px] leading-none select-none pointer-events-none
            text-brand-blue/[0.04] dark:text-brand-yellow/[0.02] group-hover:text-brand-blue/[0.08] dark:group-hover:text-brand-yellow/[0.05]
            group-hover:-translate-y-1 transition-all duration-500 z-0"
        >
          {card.id}
        </span>

        {/* Interactive Cursor Spotlight Glow Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 dark:hidden"
          style={{
            background: "radial-gradient(circle 120px at var(--x) var(--y), rgba(3, 6, 172, 0.05), transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 hidden dark:block"
          style={{
            background: "radial-gradient(circle 120px at var(--x) var(--y), rgba(233, 189, 54, 0.06), transparent 80%)",
          }}
        />

        {/* Decorative colored radial background glow on hover */}
        <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full opacity-0 group-hover:opacity-[0.12] blur-3xl transition-all duration-500 pointer-events-none z-0 bg-brand-blue dark:bg-brand-yellow" />

        {/* Icon Wrapper (Solid fill on hover) */}
        <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500
          bg-brand-blue/[0.06] border border-brand-blue/10 group-hover:bg-gradient-to-br group-hover:from-brand-blue group-hover:to-blue-600 group-hover:border-transparent group-hover:shadow-[0_8px_20px_rgba(3,6,172,0.2)]
          dark:bg-brand-yellow/[0.10] dark:border-brand-yellow/15 dark:group-hover:from-brand-yellow dark:group-hover:to-amber-500 dark:group-hover:border-transparent dark:group-hover:shadow-[0_8px_20px_rgba(233,189,54,0.25)]
          group-hover:scale-105 group-hover:rotate-[2deg]"
        >
          <Icon className="w-6 h-6 text-brand-blue dark:text-brand-yellow transition-all duration-300 group-hover:text-white dark:group-hover:text-[#0c0b18] group-hover:scale-110" />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col gap-3.5 flex-1">
          <h3 className="font-heading text-[16px] font-extrabold leading-snug text-brand-dark dark:text-white transition-colors duration-300 group-hover:text-brand-blue dark:group-hover:text-brand-yellow">
            {card.title}
          </h3>
          <p className="text-[13px] text-brand-zinc-550 dark:text-zinc-400 leading-relaxed font-normal">
            {card.desc}
          </p>

          {/* Feature Checkpoints */}
          <ul className="flex flex-col gap-3 pt-4 mt-auto border-t border-brand-zinc-100 dark:border-white/[0.05] group-hover:border-brand-blue/20 dark:group-hover:border-brand-yellow/20 transition-colors duration-500">
            {card.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-xs text-brand-zinc-650 dark:text-zinc-350 transition-all duration-300 group-hover:translate-x-1.5"
              >
                <span className="w-5 h-5 rounded-full bg-brand-blue/[0.06] dark:bg-brand-yellow/[0.08] flex items-center justify-center shrink-0 mt-0.5 border border-brand-blue/10 dark:border-brand-yellow/10 transition-all duration-300 group-hover:bg-brand-blue dark:group-hover:bg-brand-yellow group-hover:border-transparent group-hover:shadow-[0_2px_8px_rgba(3,6,172,0.2)] dark:group-hover:shadow-[0_2px_8px_rgba(233,189,54,0.25)]">
                  <CheckCircle2 className="w-3 h-3 text-brand-blue dark:text-brand-yellow transition-colors duration-300 group-hover:text-white dark:group-hover:text-[#0c0b18]" />
                </span>
                <span className="font-semibold leading-normal pt-0.5">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Footer Action Area */}
        <div className="relative z-10 flex items-center justify-between pt-5 border-t border-brand-zinc-150 dark:border-white/[0.05] group-hover:border-brand-blue/20 dark:group-hover:border-brand-yellow/20 transition-colors duration-500 mt-auto">
          <span className="text-[10.5px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 text-brand-zinc-600 dark:text-zinc-400 group-hover:text-brand-blue dark:group-hover:text-brand-yellow">
            {contentData.servicesPage.grid.ctaText}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          {/* Decorative arrow circle container that slides in on hover */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0
            border-brand-blue/15 bg-brand-blue/[0.05] dark:border-brand-yellow/20 dark:bg-brand-yellow/[0.08]
            group-hover:shadow-[0_4px_12px_rgba(3,6,172,0.15)] dark:group-hover:shadow-[0_4px_12px_rgba(233,189,54,0.2)]"
          >
            <ArrowRight className="w-4 h-4 text-brand-blue dark:text-brand-yellow" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}


export default function ServicesPage() {
  const { hero, grid, ctaBanner } = contentData.servicesPage;

  return (
    <main className="flex-1 w-full bg-white dark:bg-[#080710] text-brand-dark dark:text-white transition-colors duration-300 relative overflow-x-clip font-sans">

      {/* ── Floating blobs ─────────────────────────────────────────────────── */}
      <div className="absolute top-[3%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/[0.03] dark:bg-brand-blue/[0.06] blur-[120px] pointer-events-none select-none -z-10 animate-float-blob" />
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-brand-yellow/[0.02] dark:bg-brand-yellow/[0.05] blur-[150px] pointer-events-none select-none -z-10 animate-float-blob-delayed" />
      <div className="absolute bottom-[20%] left-[-12%] w-[48vw] h-[48vw] rounded-full bg-brand-blue/[0.02] dark:bg-brand-blue/[0.04] blur-[140px] pointer-events-none select-none -z-10 animate-float-blob" />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="-mt-[110px] sm:-mt-[125px] lg:-mt-[140px] pt-[135px] sm:pt-[150px] lg:pt-[165px] pb-16 sm:pb-20 relative overflow-hidden border-b border-brand-zinc-200 dark:border-white/10">

        {/* Full background bleed image — same as contact/portfolio */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <img
            src="/portfolio_hero_bg.png"
            alt="Services Background"
            className="w-full h-full object-cover object-right opacity-100 dark:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#080710] dark:via-[#080710]/85 dark:to-transparent pointer-events-none" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 py-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* LEFT: Text */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-[10px] font-mono font-black tracking-widest uppercase text-[#080710] shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#080710]" />
                  {hero.badgeText}
                </span>
                <div className="h-[1px] w-12 bg-brand-zinc-300 dark:bg-zinc-700" />
              </div>

              {/* Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-brand-dark dark:text-white max-w-3xl">
                {hero.titleIntro}
                <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1 ml-1">
                  {hero.titleHighlight}
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-3.5 pointer-events-none text-brand-yellow opacity-90"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 2 5 Q 50 1.5, 98 3.5 C 99 3.5, 99 4.5, 98 5 Q 50 7, 2 5.5 Z"
                      fill="currentColor"
                      custom={{ delay: 0.5, duration: 0.65 }}
                      variants={drawVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg">
                {hero.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href={hero.ctaPrimary.href} className="btn-primary-cta">
                  <span>{hero.ctaPrimary.label}</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>
                <a href={hero.ctaSecondary.href} className="btn-secondary-cta">
                  <span>{hero.ctaSecondary.label}</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>
              </div>
            </motion.div>



          </div>
        </div>
      </section>

      {/* ── 2. SERVICES GRID ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 border-b border-brand-zinc-200 dark:border-white/10">

        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-14 space-y-4"
          >
            <div className="flex justify-center">
              <span className="eyebrow-pill">{grid.eyebrow}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] text-brand-dark dark:text-white">
              {grid.titleIntro}
              <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1 ml-1">
                {grid.titleHighlight}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3.5 pointer-events-none text-brand-yellow opacity-90"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 2 5 Q 50 1.5, 98 3.5 C 99 3.5, 99 4.5, 98 5 Q 50 7, 2 5.5 Z"
                    fill="currentColor"
                    custom={{ delay: 0.3, duration: 0.65 }}
                    variants={drawVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  />
                </svg>
              </span>
            </h2>
            <p className="text-sm sm:text-base text-brand-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {grid.subtext}
            </p>
          </motion.div>

          {/* Cards — 4 col grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {(grid.cards as Array<{
              id: string;
              iconName: string;
              tag: string;
              title: string;
              desc: string;
              features: string[];
              color: string;
              href: string;
            }>).map((card, i) => (
              <ServiceCard key={card.id} card={card} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. CTA BANNER — exact same as contact/blog pages ────────────────── */}
      <section className="my-8 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="cta-banner-card !shadow-[0_16px_40px_-12px_rgba(3,6,172,0.22)] dark:!shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
          >
            {/* Left text column */}
            <div className="relative z-10 flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14 lg:max-w-[62%]">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-[10px] font-mono tracking-widest text-[#E9BD36] font-extrabold uppercase w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9BD36] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E9BD36]" />
                </span>
                {ctaBanner.eyebrow}
              </div>

              {/* Headline */}
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.35] tracking-tight text-white">
                {ctaBanner.titleIntro}{" "}
                <span className="relative inline-block">
                  <span className="font-cursive text-[#E9BD36] text-3xl sm:text-4xl lg:text-5xl font-normal pl-1">
                    {ctaBanner.titleHighlight}
                  </span>
                  <svg
                    className="absolute left-0 bottom-[-2px] w-full h-3 text-[#E9BD36]"
                    viewBox="0 0 100 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <path d="M 5 6 C 30 9, 70 9, 95 4" />
                  </svg>
                </span>{" "}
                {ctaBanner.titleLine2}
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base font-sans text-white/90 leading-relaxed max-w-lg">
                {ctaBanner.description}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4 flex-wrap pt-2">
                <a href={ctaBanner.ctaPrimary.href} className="btn-primary-cta">
                  <span>{ctaBanner.ctaPrimary.label}</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>
                <a href={ctaBanner.ctaSecondary.href} className="btn-secondary-cta">
                  <span>{ctaBanner.ctaSecondary.label}</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>
              </div>
            </div>

            {/* Right portrait arch — identical to contact page */}
            <div className="hidden lg:flex flex-1 items-end justify-center relative pr-8">
              <div className="absolute bottom-0 w-[320px] h-[320px] bg-gradient-to-t from-[#020485] to-[#0408d9] rounded-full opacity-90 border border-white/20 shadow-2xl" />
              <div className="relative z-10 w-[280px] h-[370px] self-end drop-shadow-2xl overflow-hidden rounded-t-[32px] border-t border-l border-r border-white/25 shadow-2xl">
                <Image
                  src={ctaBanner.portraitSrc}
                  alt={ctaBanner.portraitAlt}
                  width={320}
                  height={420}
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010356]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute top-16 right-28 h-3.5 w-3.5 rounded-full bg-[#E9BD36] shadow-[0_0_15px_#E9BD36] z-20" />
            </div>
          </motion.div>
        </div>
      </section>
      {/* Cursive Font Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }
      `}} />
    </main>
  );
}
