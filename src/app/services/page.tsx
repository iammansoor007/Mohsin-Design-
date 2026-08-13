"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Monitor,
  Megaphone,
  MousePointerClick,
  Palette,
  PenTool,
  ShoppingCart,
  BarChart2,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import contentData from "@/data/content.json";

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

// ── Helper: individual animated div ──────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  const { hero, grid, cta } = contentData.servicesPage;

  return (
    <main className="min-h-screen bg-white dark:bg-[#080710] text-brand-dark dark:text-white font-sans overflow-x-clip">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="-mt-[110px] sm:-mt-[125px] lg:-mt-[140px] pt-[150px] sm:pt-[170px] lg:pt-[190px] pb-16 sm:pb-20 relative overflow-hidden">

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-20 -left-32 w-[520px] h-[520px] rounded-full bg-brand-blue/10 dark:bg-brand-blue/5 blur-[100px]" />
          <div className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-brand-yellow/10 dark:bg-brand-yellow/5 blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(circle, #1D4ED8 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text */}
            <div>
              <FadeUp delay={0}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-yellow border border-brand-blue/20 dark:border-brand-yellow/20 mb-6">
                  <Sparkles className="w-3 h-3" />
                  {hero.badgeText}
                </span>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-5">
                  {hero.titleIntro}
                  <span className="text-brand-blue dark:text-brand-yellow">
                    {hero.titleHighlight}
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.16}>
                <p className="text-base sm:text-lg text-brand-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-lg">
                  {hero.description}
                </p>
              </FadeUp>

              <FadeUp delay={0.24}>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={hero.ctaPrimary.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue dark:bg-brand-yellow text-white dark:text-brand-dark text-sm font-bold tracking-wide shadow-lg hover:shadow-brand-blue/30 dark:hover:shadow-brand-yellow/30 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {hero.ctaPrimary.label}
                  </Link>
                  <Link
                    href={hero.ctaSecondary.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-zinc-200 dark:border-white/15 text-brand-dark dark:text-white text-sm font-bold tracking-wide hover:border-brand-blue dark:hover:border-brand-yellow hover:text-brand-blue dark:hover:text-brand-yellow hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Calendar className="w-4 h-4" />
                    {hero.ctaSecondary.label}
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right: Stats card */}
            <FadeUp delay={0.3} className="hidden lg:flex justify-end">
              <div className="relative w-full max-w-[380px]">
                <div className="bg-white dark:bg-[#12121e] rounded-2xl border border-brand-zinc-200/80 dark:border-white/10 shadow-2xl p-7 space-y-5">
                  {[
                    { label: "Projects Completed", value: "500+", color: "#2563EB" },
                    { label: "Happy Clients",       value: "300+", color: "#7C3AED" },
                    { label: "Years of Experience", value: "7+",   color: "#059669" },
                    { label: "Client Satisfaction", value: "98%",  color: "#D97706" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${stat.color}18` }}
                      >
                        <CheckCircle2 className="w-5 h-5" style={{ color: stat.color }} />
                      </div>
                      <div>
                        <p
                          className="font-heading text-2xl font-black leading-none"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-xs text-brand-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-brand-blue/20 dark:bg-brand-yellow/10 blur-2xl rounded-full" />
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F8F9FC] dark:bg-[#0c0c1a] relative">

        {/* Section header */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center mb-14">
          <FadeUp delay={0}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-yellow border border-brand-blue/20 dark:border-brand-yellow/20 mb-5">
              <Sparkles className="w-3 h-3" />
              {grid.eyebrow}
            </span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              {grid.titleIntro}
              <span className="text-brand-blue dark:text-brand-yellow">{grid.titleHighlight}</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="text-brand-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
              {grid.subtext}
            </p>
          </FadeUp>
        </div>

        {/* Cards grid */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {grid.cards.map((card, i) => {
              const Icon = iconMap[card.iconName] ?? Search;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                  className="group relative bg-white dark:bg-[#12121e] rounded-2xl border border-brand-zinc-200/80 dark:border-white/8 p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Top accent bar on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: card.color }}
                  />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${card.color}18` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>

                  {/* Tag */}
                  <span
                    className="text-[10px] font-mono font-black uppercase tracking-widest"
                    style={{ color: card.color }}
                  >
                    {card.tag}
                  </span>

                  {/* Title & desc */}
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-bold text-brand-dark dark:text-white mb-2 leading-snug group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="text-sm text-brand-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Learn More */}
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider mt-1 transition-colors duration-200"
                    style={{ color: card.color }}
                  >
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-[#1E3A8A] to-[#3730A3] dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#0f172a]" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-brand-yellow/10 blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Portrait */}
            <div className="shrink-0 hidden lg:block">
              <div className="relative w-[190px] h-[230px]">
                <div className="absolute inset-0 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm" />
                <Image
                  src={cta.portraitSrc}
                  alt={cta.portraitAlt}
                  fill
                  className="object-cover object-top rounded-2xl"
                />
              </div>
            </div>

            {/* Text + buttons */}
            <div className="flex-1 text-center lg:text-left">
              <FadeUp delay={0}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-white/10 text-brand-yellow border border-white/20 mb-5">
                  <Sparkles className="w-3 h-3" />
                  {cta.badgeText}
                </span>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-4">
                  {cta.titleIntro}
                  <span className="text-brand-yellow underline decoration-wavy decoration-brand-yellow/50 underline-offset-4">
                    {cta.titleHighlight}
                  </span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.16}>
                <p className="text-white/75 text-base leading-relaxed max-w-xl mb-2">
                  {cta.description}
                </p>
                <p className="text-white/45 text-xs font-mono font-medium mb-8">
                  {cta.guaranteeText}
                </p>
              </FadeUp>

              <FadeUp delay={0.24}>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Link
                    href={cta.ctaPrimary.href}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-yellow text-brand-dark text-sm font-black tracking-wide shadow-xl hover:shadow-brand-yellow/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Calendar className="w-4 h-4" />
                    {cta.ctaPrimary.label}
                  </Link>
                  <Link
                    href={cta.ctaSecondary.href}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white text-sm font-bold tracking-wide hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {cta.ctaSecondary.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
