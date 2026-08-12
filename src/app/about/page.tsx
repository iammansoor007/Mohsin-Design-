"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Check,
  Plus,
  Compass,
  Eye,
  Target,
  Palette,
  Code,
  Rocket,
  ShoppingCart,
  Building2,
  Heart,
  GraduationCap,
  Landmark,
  Database,
  Utensils,
  Scale,
  Star,
  FolderClosed,
  Clock,
  Users,
  ShieldCheck,
  TrendingUp,
  FileText,
  Search,
  MessageSquare,
  Megaphone,
  Globe,
  Calendar,
  MoreVertical,
  BarChart2,
  Trophy,
  Image as ImageIcon,
  Pencil,
  Coins,
  Lightbulb,
  Briefcase,
  Handshake,
  Video,
  Headphones,
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import content from "@/data/content.json";

// ── Drawing Animation for Hand-Drawn SVG Underlines ────────────────
const drawVariants = {
  hidden: { pathLength: 0 },
  visible: (custom: { delay: number; duration: number }) => ({
    pathLength: 1,
    transition: {
      duration: custom?.duration ?? 0.4,
      delay: custom?.delay ?? 0.1,
      ease: "easeOut" as any
    }
  })
};

const TickerDigit = ({ digit }: { digit: number }) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <span
      className="relative inline-block overflow-hidden select-none"
      style={{
        width: "0.58em",
        height: "1em"
      }}
    >
      <motion.span
        className="absolute left-0 top-0 flex flex-col w-full"
        initial={{ y: 0 }}
        whileInView={{ y: `-${digit}em` }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 45,
          damping: 12,
          mass: 0.8,
          delay: 0.1
        }}
      >
        {numbers.map((num) => (
          <span
            key={num}
            className="flex items-center justify-center leading-none bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-blue-500 dark:from-brand-yellow dark:to-amber-400"
            style={{
              height: "1em",
              WebkitBackgroundClip: "text"
            }}
          >
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

const DigitTicker = ({ value }: { value: number }) => {
  const digits = String(value).split("");
  return (
    <span className="inline-flex items-baseline">
      {digits.map((digit, idx) => {
        if (isNaN(Number(digit))) {
          return (
            <span
              key={idx}
              className="leading-none bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-blue-500 dark:from-brand-yellow dark:to-amber-400"
              style={{ WebkitBackgroundClip: "text" }}
            >
              {digit}
            </span>
          );
        }
        return <TickerDigit key={idx} digit={Number(digit)} />;
      })}
    </span>
  );
};

export default function AboutPage() {
  const { aboutPage } = content;
  const [cardTilt, setCardTilt] = useState({ idx: null as number | null, x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, cardIdx: null as number | null });
  const [activeService, setActiveService] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [hoveredService, setHoveredService] = useState<number | null>(0);
  const [serviceMousePos, setServiceMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const iconMap: Record<string, any> = {
    Globe,
    Rocket,
    Heart,
    Trophy,
    Palette,
    Code,
    Search,
    Megaphone,
    Users,
    Video,
    Compass,
    ShieldCheck,
    ShoppingCart,
    Building2,
    GraduationCap,
    Coins,
    Database,
    Utensils,
    Scale,
    Target,
    Lightbulb,
    MessageSquare,
    Clock,
    Headphones,
    Handshake,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
          const topEntry = visible[0];
          const id = topEntry.target.getAttribute("id");
          if (id) {
            const numStr = id.replace("service-stage-", "");
            const idx = parseInt(numStr, 10) - 1;
            if (!isNaN(idx) && idx >= 0 && idx < 6) {
              setActiveService(idx);
            }
          }
        }
      },
      {
        rootMargin: "-10% 0px -30% 0px",
        threshold: [0.1, 0.3, 0.5],
      }
    );

    const stages = document.querySelectorAll("[id^='service-stage-']");
    stages.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main className="flex-1 w-full bg-white dark:bg-[#080710] text-brand-dark dark:text-white transition-colors duration-300 relative overflow-x-clip">

        {/* Awwwards-Level Floating Blurred Mesh Blobs */}
        <div className="absolute top-[3%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/[0.03] dark:bg-brand-blue/[0.06] blur-[120px] pointer-events-none select-none -z-10 animate-float-blob" />
        <div className="absolute top-[28%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-brand-yellow/[0.02] dark:bg-brand-yellow/[0.05] blur-[150px] pointer-events-none select-none -z-10 animate-float-blob-delayed" />
        <div className="absolute bottom-[30%] left-[-12%] w-[48vw] h-[48vw] rounded-full bg-brand-blue/[0.02] dark:bg-brand-blue/[0.04] blur-[140px] pointer-events-none select-none -z-10 animate-float-blob" />
        <div className="absolute bottom-[5%] right-[-12%] w-[42vw] h-[42vw] rounded-full bg-brand-yellow/[0.015] dark:bg-brand-yellow/[0.035] blur-[160px] pointer-events-none select-none -z-10 animate-float-blob-delayed" />

        {/* Awwwards-Level Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

        {/* ── 1. HERO SECTION (Badge, Title, CTAs, and Visual Image) ── */}
        <section className="relative overflow-hidden py-4 sm:py-6 md:py-8 border-b border-brand-zinc-200 dark:border-white/10">
          <div className="absolute inset-0 -z-10 bg-linear-grid-blue-4 [background-size:40px_40px] opacity-[0.05] dark:opacity-[0.08]" />

          {/* Ambient Glows */}
          <div className="absolute top-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-brand-blue/[0.02] dark:bg-brand-blue/[0.05] blur-[120px] pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column: Heading and CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-6 text-left"
              >
                {/* Yellow Badge */}
                <div className="inline-flex">
                  <span className="eyebrow-pill-yellow">
                    <Star className="h-3.5 w-3.5 fill-brand-dark text-brand-dark shrink-0" />
                    {aboutPage.hero.badgeText}
                  </span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-brand-dark dark:text-white max-w-xl">
                  {aboutPage.hero.titleIntro}
                  <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1">
                    {aboutPage.hero.titleHighlight}
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
                  {aboutPage.hero.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {/* Let's Work Together */}
                  <a
                    href={aboutPage.hero.ctaPrimaryHref}
                    className="btn-primary-cta"
                  >
                    <span>{aboutPage.hero.ctaPrimaryText}</span>
                    <span className="btn-icon">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </a>

                  {/* Watch Our Story */}
                  <button
                    className="btn-secondary-cta"
                  >
                    <span>{aboutPage.hero.ctaSecondaryText}</span>
                    <span className="btn-icon">
                      <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Hero Image */}
              <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex items-center justify-center pt-8 lg:pt-0">
                {/* Background Blobs for depth */}
                <div className="absolute top-[10%] right-[10%] w-[320px] h-[320px] rounded-full bg-brand-yellow/[0.05] dark:bg-brand-yellow/[0.1] blur-[80px] pointer-events-none -z-10" />
                <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-brand-blue/[0.03] dark:bg-brand-blue/[0.08] blur-[80px] pointer-events-none -z-10" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src={aboutPage.hero.heroImage}
                    alt={aboutPage.hero.heroImageAlt}
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 2. STATS BAR SECTION (Asymmetric Typographic Spread) ────────── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-zinc-50/10 dark:bg-white/[0.005]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

              {/* Left Column: Symmetrical Stat-Style Intro */}
              <div className="lg:col-span-4 flex flex-col justify-between self-stretch text-left">
                <div className="w-full space-y-4">
                  <div className="eyebrow-pill">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue dark:bg-brand-yellow opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue dark:bg-brand-yellow" />
                    </span>
                    {aboutPage.stats.eyebrow}
                  </div>

                  <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight leading-[1.12] text-brand-dark dark:text-white">
                    {aboutPage.stats.titleIntro}
                    <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">{aboutPage.stats.titleHighlight}</span>
                  </h2>

                  <p className="text-sm font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-xs">
                    {aboutPage.stats.description}
                  </p>
                </div>

                {/* Symmetrical Core Expertise List at the Bottom */}
                <div className="pt-6 mt-8 border-t border-brand-zinc-100 dark:border-white/5 w-full select-none">
                  <span className="text-[7.5px] font-mono tracking-widest text-brand-blue dark:text-brand-yellow uppercase font-black block mb-3">
                    {aboutPage.stats.expertiseHeader}
                  </span>
                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-6">
                    {aboutPage.stats.expertiseList.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-brand-dark dark:text-white text-[9.5px] font-bold uppercase tracking-wider">
                        <span className="text-[8px] font-mono text-brand-zinc-400 dark:text-zinc-500 font-normal">{item.num}</span>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: 2x2 Clean Typographic Grid */}
              <div className="lg:col-span-8 grid grid-cols-2 gap-x-12 gap-y-12 sm:gap-x-16 border-t lg:border-t-0 lg:border-l border-brand-zinc-200/60 dark:border-white/5 pt-10 lg:pt-0 lg:pl-16">
                {aboutPage.stats.metrics.map((metric: any, idx: number) => {
                  const MetricIcon = iconMap[metric.iconName] || Globe;
                  return (
                    <div key={idx} className="flex flex-col items-start relative w-full group hover:-translate-y-1 transition-transform duration-350 ease-out">
                      <div className="relative flex items-center justify-between w-full pb-2.5 mb-3">
                        <MetricIcon className="h-4.5 w-4.5 text-[#0306AC] dark:text-[#E9BD36] transition-transform duration-300 group-hover:rotate-[15deg]" />
                        <span className="text-[8px] font-mono tracking-widest text-brand-zinc-400 dark:text-zinc-500 select-none">{metric.num}</span>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-zinc-100 dark:bg-white/5" />
                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0306AC] dark:text-[#E9BD36] group-hover:w-full transition-all duration-500 ease-out" />
                      </div>
                      <div className="flex items-baseline gap-0.5 text-brand-dark dark:text-white">
                        <span className="font-heading font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-none text-brand-dark dark:text-white">
                          <DigitTicker value={metric.value} />
                        </span>
                        <span className="font-heading font-bold text-2xl sm:text-3xl leading-none text-[#0306AC] dark:text-[#E9BD36]">{metric.suffix}</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-black text-brand-dark dark:text-white uppercase tracking-widest mt-3.5 leading-none transition-colors duration-300 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36]">
                        {metric.label}
                      </p>
                      <p className="text-[9.5px] text-brand-zinc-400 dark:text-zinc-500 mt-2 font-semibold leading-normal max-w-[200px]">
                        {metric.sublabel}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. WHO WE ARE SECTION (Awwwards-Level Premium Collage & Editorial Rows) ──── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710]">
          <div className="absolute right-[5%] top-[10%] text-[15vw] sm:text-[12vw] font-heading font-black tracking-tighter text-[#0306AC]/[0.015] dark:text-white/[0.01] pointer-events-none select-none z-0 leading-none">
            {aboutPage.whoWeAre.watermark}
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

              {/* Left Column: Heading and Interactive Editorial Rows */}
              <div className="lg:col-span-6 space-y-10 text-left">
                <div className="space-y-4">
                  <div className="eyebrow-pill">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                    </span>
                    {aboutPage.whoWeAre.eyebrow}
                  </div>

                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                    {aboutPage.whoWeAre.titleIntro}
                    <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">
                      {aboutPage.whoWeAre.titleHighlight}
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-2xl">
                    {aboutPage.whoWeAre.description}
                  </p>
                </div>

                {/* Awwwards-Style Expandable Editorial Rows */}
                <div className="border-t border-brand-zinc-200 dark:border-white/10 divide-y divide-brand-zinc-200 dark:divide-white/10 w-full">
                  {aboutPage.whoWeAre.rows.map((row: any, idx: number) => (
                    <div key={idx} className="group relative py-6 flex items-start justify-between gap-6 cursor-pointer overflow-hidden transition-all duration-300">
                      <div className="absolute inset-y-0 left-0 w-0 bg-zinc-50 dark:bg-white/[0.02] group-hover:w-full transition-all duration-500 ease-out -z-10" />

                      <div className="flex items-start gap-4 sm:gap-6">
                        <span className="text-[10px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] mt-1 select-none">{row.num}</span>
                        <div className="space-y-1">
                          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-dark dark:text-white group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors duration-300">
                            {row.title}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-brand-zinc-550 dark:text-zinc-300 font-medium leading-normal max-w-md transition-colors duration-300 group-hover:text-brand-dark dark:group-hover:text-white">
                            {row.desc}
                          </p>
                        </div>
                      </div>
                      <div className="h-7 w-7 rounded-full border border-brand-zinc-300 dark:border-white/10 flex items-center justify-center text-brand-zinc-400 dark:text-zinc-500 group-hover:border-[#0306AC] dark:group-hover:border-[#E9BD36] group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] group-hover:rotate-45 transition-all duration-300 shrink-0">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive 3D Parallax Collage */}
              <div className="lg:col-span-6 relative h-[380px] sm:h-[480px] w-full flex items-center justify-center select-none">
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative w-full h-full max-w-[480px]"
                >
                  <motion.div
                    variants={{
                      rest: { x: 0, y: 0, rotate: -4, scale: 0.95 },
                      hover: { x: -25, y: -15, rotate: -8, scale: 0.96 }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute left-4 top-4 w-[60%] aspect-[1.1] rounded-2xl overflow-hidden border border-brand-zinc-200 dark:border-white/5 shadow-md bg-brand-dark -z-10"
                  >
                    <img
                      src={aboutPage.whoWeAre.imgAbstract}
                      alt="Abstract 3D Glass Render"
                      className="w-full h-full object-cover opacity-60 dark:opacity-80"
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      rest: { x: 0, y: 0, scale: 1 },
                      hover: { x: 0, y: 0, scale: 1.02 }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute left-[15%] top-[15%] w-[70%] aspect-[1.3] rounded-2xl overflow-hidden border border-brand-zinc-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white dark:bg-[#12121e]"
                  >
                    <img
                      src={aboutPage.whoWeAre.imgWorkspace}
                      alt="360 Designs Agency Workspace"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-grid-blue-4 opacity-[0.02] [background-size:16px_16px]" />
                  </motion.div>

                  <motion.div
                    variants={{
                      rest: { x: 0, y: 0, rotate: 6, scale: 0.98 },
                      hover: { x: 30, y: 25, rotate: 10, scale: 1.02 }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute right-2 bottom-6 w-[55%] aspect-[1.28] rounded-2xl overflow-hidden border border-[#E9BD36]/20 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-white dark:bg-[#12121e]"
                  >
                    <img
                      src={aboutPage.whoWeAre.imgUiDetail}
                      alt="Minimalist High-Fidelity Dashboard Interface"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0306AC]/10 to-transparent mix-blend-overlay pointer-events-none" />
                  </motion.div>

                  <div className="absolute top-[8%] right-[8%] bg-white/95 dark:bg-[#080710]/95 backdrop-blur-md border border-brand-zinc-200 dark:border-white/10 px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-lg select-none">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0306AC] dark:bg-[#E9BD36]" />
                    </span>
                    <span className="text-[8px] font-mono tracking-widest text-[#0306AC] dark:text-[#E9BD36] font-black uppercase">
                      {aboutPage.whoWeAre.parallaxBadge}
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. MISSION & VISION SECTION (Ultra-Advanced Alternating Editorial Split) ──────── */}
        <section
          ref={sectionRef}
          className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710] transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none -z-10" />
          <div className="absolute top-[15%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#0306AC]/[0.03] dark:bg-[#0306AC]/0.05 blur-[140px] pointer-events-none -z-10 animate-float-blob" />
          <div className="absolute bottom-[15%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#E9BD36]/[0.02] dark:bg-[#E9BD36]/0.04 blur-[150px] pointer-events-none -z-10 animate-float-blob-delayed" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 space-y-28 sm:space-y-40">
            <div className="text-left max-w-2xl space-y-4">
              <div className="eyebrow-pill">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                </span>
                {aboutPage.philosophy.eyebrow}
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                {aboutPage.philosophy.titleIntro}
                <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">
                  {aboutPage.philosophy.titleHighlight}
                </span>
              </h2>
            </div>

            <div className="space-y-32 sm:space-y-44">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center group"
              >
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left order-2 lg:order-1">
                  <div className="flex items-center gap-4">
                    <span className="font-serif italic text-5xl sm:text-6xl font-black text-brand-zinc-200 dark:text-white/10 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors duration-500 leading-none select-none">
                      {aboutPage.philosophy.mission.num}
                    </span>
                    <div className="h-[1px] w-8 bg-[#0306AC]/20 dark:bg-white/10" />
                    <span className="text-[8.5px] font-mono tracking-widest text-[#0306AC] dark:text-[#E9BD36] font-black uppercase">
                      {aboutPage.philosophy.mission.label}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark dark:text-white leading-[1.15] tracking-tight">
                    {aboutPage.philosophy.mission.titleIntro}
                    <span className="font-serif italic text-[#0306AC] dark:text-[#E9BD36] font-light">{aboutPage.philosophy.mission.titleHighlight}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                    {aboutPage.philosophy.mission.desc}
                  </p>

                  <div className="pl-4 border-l-2 border-[#0306AC] dark:border-[#E9BD36] italic text-xs font-serif text-brand-dark dark:text-zinc-200 py-0.5">
                    {aboutPage.philosophy.mission.quote}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {aboutPage.philosophy.mission.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        <Code className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="aspect-[1.45] w-full rounded-[32px] overflow-hidden border border-brand-zinc-200/80 dark:border-white/10 shadow-sm relative bg-[#090812]">
                    <img src="/agency_ui_detail.png" alt="Mission" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none" />
                    <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="text-[8.5px] font-mono font-black text-white uppercase tracking-wider">{aboutPage.philosophy.mission.badgeLatency}</span>
                    </div>
                    <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="text-[8.5px] font-mono font-black text-[#E9BD36] uppercase tracking-wider">{aboutPage.philosophy.mission.badgePerformance}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center group"
              >
                <div className="lg:col-span-7">
                  <div className="aspect-[1.45] w-full rounded-[32px] overflow-hidden border border-brand-zinc-200/80 dark:border-white/10 shadow-sm relative bg-[#090812]">
                    <img src="/agency_workspace.png" alt="Vision" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none" />
                    <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="text-[8.5px] font-mono font-black text-[#E9BD36] uppercase tracking-wider">{aboutPage.philosophy.vision.badgeAccessibility}</span>
                    </div>
                    <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="text-[8.5px] font-mono font-black text-white uppercase tracking-wider">{aboutPage.philosophy.vision.badgeLighthouse}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
                  <div className="flex items-center gap-4">
                    <span className="font-serif italic text-5xl sm:text-6xl font-black text-brand-zinc-200 dark:text-white/10 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors duration-500 leading-none select-none">
                      {aboutPage.philosophy.vision.num}
                    </span>
                    <div className="h-[1px] w-8 bg-[#0306AC]/20 dark:bg-white/10" />
                    <span className="text-[8.5px] font-mono tracking-widest text-[#0306AC] dark:text-[#E9BD36] font-black uppercase">
                      {aboutPage.philosophy.vision.label}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark dark:text-white leading-[1.15] tracking-tight">
                    {aboutPage.philosophy.vision.titleIntro}
                    <span className="font-serif italic text-[#0306AC] dark:text-[#E9BD36] font-light">{aboutPage.philosophy.vision.titleHighlight}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                    {aboutPage.philosophy.vision.desc}
                  </p>

                  <div className="pl-4 border-l-2 border-[#0306AC] dark:border-[#E9BD36] italic text-xs font-serif text-brand-dark dark:text-zinc-200 py-0.5">
                    {aboutPage.philosophy.vision.quote}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {aboutPage.philosophy.vision.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        <Palette className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Values */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center group"
              >
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left order-2 lg:order-1">
                  <div className="flex items-center gap-4">
                    <span className="font-serif italic text-5xl sm:text-6xl font-black text-brand-zinc-200 dark:text-white/10 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors duration-500 leading-none select-none">
                      {aboutPage.philosophy.values.num}
                    </span>
                    <div className="h-[1px] w-8 bg-[#0306AC]/20 dark:bg-white/10" />
                    <span className="text-[8.5px] font-mono tracking-widest text-[#0306AC] dark:text-[#E9BD36] font-black uppercase">
                      {aboutPage.philosophy.values.label}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark dark:text-white leading-[1.15] tracking-tight">
                    {aboutPage.philosophy.values.titleIntro}
                    <span className="font-serif italic text-[#0306AC] dark:text-[#E9BD36] font-light">{aboutPage.philosophy.values.titleHighlight}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                    {aboutPage.philosophy.values.desc}
                  </p>

                  <div className="pl-4 border-l-2 border-[#0306AC] dark:border-[#E9BD36] italic text-xs font-serif text-brand-dark dark:text-zinc-200 py-0.5">
                    {aboutPage.philosophy.values.quote}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {aboutPage.philosophy.values.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        <Target className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="aspect-[1.45] w-full rounded-[32px] overflow-hidden border border-brand-zinc-200/80 dark:border-white/10 shadow-sm relative bg-[#090812]">
                    <img src="/agency_abstract_graphics.png" alt="Values" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none" />
                    <div className="absolute top-5 left-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="text-[8.5px] font-mono font-black text-white uppercase tracking-wider">{aboutPage.philosophy.values.badgeSync}</span>
                    </div>
                    <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="text-[8.5px] font-mono font-black text-[#E9BD36] uppercase tracking-wider">{aboutPage.philosophy.values.badgeSprint}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 5. OUR SERVICES SECTION ──────── */}
        <section className="relative overflow-x-clip py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Sticky Nav */}
              <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 self-start z-20">
                <div className="p-6 sm:p-7 rounded-[32px] bg-zinc-50/90 dark:bg-[#0c0b18]/90 border border-brand-zinc-200/80 dark:border-white/10 shadow-2xl backdrop-blur-xl space-y-5 text-left relative overflow-hidden">
                  <div className="space-y-3">
                    <div className="eyebrow-pill">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                      </span>
                      {aboutPage.servicesDirectory.eyebrow}
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                      {aboutPage.servicesDirectory.titleIntro}
                      <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">{aboutPage.servicesDirectory.titleHighlight}</span>
                    </h2>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-brand-zinc-200/80 dark:border-white/10 select-none relative">
                    {aboutPage.servicesDirectory.stages.map((item: any, idx: number) => {
                      const isActive = activeService === idx;
                      return (
                        <a
                          key={item.id}
                          href={`#service-stage-${item.id}`}
                          className={`py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all duration-300 group relative ${isActive
                            ? "bg-[#0306AC] text-white dark:bg-[#E9BD36] dark:text-[#080710] shadow-xl scale-[1.02] font-bold"
                            : "hover:bg-zinc-200/60 dark:hover:bg-white/5 text-brand-zinc-600 dark:text-zinc-400"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveService(idx);
                            const el = document.getElementById(`service-stage-${item.id}`);
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-serif italic text-xs font-black transition-colors ${isActive ? "text-[#E9BD36] dark:text-[#080710]" : "text-brand-zinc-400 dark:text-zinc-400"}`}>{item.id}</span>
                            <span className="font-heading text-xs tracking-tight">{item.title}</span>
                          </div>
                          <ArrowRight className={`h-3.5 w-3.5 transition-transform ${isActive ? "translate-x-1 opacity-100 text-[#E9BD36] dark:text-[#080710]" : "opacity-30 group-hover:opacity-100"}`} />
                        </a>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-brand-zinc-200/80 dark:border-white/10">
                    <a
                      href={aboutPage.servicesDirectory.consultationBtnHref}
                      className="w-full py-3.5 rounded-2xl bg-[#E9BD36] text-[#080710] font-mono text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ffe554] hover:scale-[1.02] transition-all duration-300 shadow-lg"
                    >
                      <span>{aboutPage.servicesDirectory.consultationBtnText}</span>
                      <ArrowRight className="h-4 w-4 text-[#080710]" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Stages List */}
              <div className="lg:col-span-7 space-y-10 sm:space-y-14 lg:space-y-16 text-left">
                {aboutPage.servicesDirectory.stages.map((stage: any) => {
                  const StageIcon = iconMap[stage.iconName] || Palette;
                  return (
                    <div
                      id={`service-stage-${stage.id}`}
                      key={stage.id}
                      className="rounded-[28px] sm:rounded-[36px] bg-zinc-50/80 dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/10 p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 group hover:border-[#0306AC]/60 dark:hover:border-[#E9BD36]/60 transition-all duration-300 shadow-sm hover:shadow-2xl relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-serif italic text-2xl font-black text-[#0306AC] dark:text-[#E9BD36]">{stage.id}</span>
                          <div className="h-[1px] w-6 bg-brand-zinc-300 dark:bg-white/20" />
                          <span className="text-[9px] font-mono font-bold text-brand-zinc-500 dark:text-zinc-300 uppercase tracking-widest">// {stage.category}</span>
                        </div>
                        <div className="bg-white dark:bg-white/10 border border-brand-zinc-200 dark:border-white/15 px-3 py-1.5 rounded-xl text-[8.5px] font-mono font-bold text-brand-dark dark:text-white uppercase tracking-wider shadow-sm">{stage.badge}</div>
                      </div>

                      <div className="aspect-[1.65] w-full rounded-2xl overflow-hidden border border-brand-zinc-200/80 dark:border-white/10 relative bg-[#090812]">
                        <img src={stage.image} alt={stage.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white select-none">
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                            <StageIcon className="h-4 w-4 text-[#E9BD36]" />
                            <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider">{stage.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-dark dark:text-white tracking-tight leading-tight group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors">{stage.title}</h3>
                        <p className="text-xs sm:text-sm text-brand-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">{stage.desc}</p>
                      </div>

                      <div className="pt-6 border-t border-brand-zinc-200/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {stage.deliverables.map((del: string, dIdx: number) => (
                            <span key={dIdx} className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-white/5 border border-brand-zinc-200 dark:border-white/10 px-3 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-300 uppercase">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#0306AC] dark:bg-[#E9BD36]" />
                              {del}
                            </span>
                          ))}
                        </div>

                        <a href="/contact" className="inline-flex items-center gap-2 text-xs font-mono font-black text-brand-dark dark:text-white group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors">
                          <span>GET STARTED</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. PROCESS SECTION ──────── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-left border-b border-brand-zinc-200/80 dark:border-white/10 pb-12">
              <div className="max-w-2xl space-y-4">
                <div className="eyebrow-pill">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                  </span>
                  {aboutPage.methodology.eyebrow}
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                  {aboutPage.methodology.titleIntro}
                  <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">{aboutPage.methodology.titleHighlight}</span>
                </h2>
              </div>
              <div className="max-w-md space-y-3">
                <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">{aboutPage.methodology.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch text-left">
              {aboutPage.methodology.steps.map((process: any, idx: number) => {
                const StepIcon = iconMap[process.iconName] || Search;
                return (
                  <motion.div
                    key={process.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[36px] bg-zinc-50/90 dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/10 p-8 sm:p-9 text-brand-dark dark:text-white flex flex-col justify-between space-y-6 group hover:border-[#0306AC]/60 dark:hover:border-[#E9BD36]/60 transition-all duration-500 shadow-sm relative overflow-hidden"
                  >
                    <div className="space-y-6 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-serif italic text-4xl font-black text-[#0306AC] dark:text-[#E9BD36]">{process.step}</span>
                          <div className="h-[1px] w-6 bg-brand-zinc-300 dark:bg-white/20" />
                          <span className="text-[9px] font-mono font-bold text-brand-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{process.badge}</span>
                        </div>
                        <div className="h-12 w-12 rounded-2xl bg-[#0306AC]/10 dark:bg-white/10 border border-[#0306AC]/15 dark:border-white/15 flex items-center justify-center text-[#0306AC] dark:text-[#E9BD36] group-hover:scale-110 group-hover:bg-[#0306AC] group-hover:text-white dark:group-hover:bg-[#E9BD36] dark:group-hover:text-brand-dark transition-all duration-300 shadow-md">
                          <StepIcon className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-heading text-xl font-black text-brand-dark dark:text-white tracking-tight group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors">{process.title}</h3>
                        <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">{process.desc}</p>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-brand-zinc-200/70 dark:border-white/10 space-y-3 mt-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-brand-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">MILESTONE DELIVERABLES:</span>
                        <span className="text-[9px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] uppercase tracking-wider">STEP {idx + 1} OF 5</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {process.deliverables.map((del: string, dIdx: number) => (
                          <span key={dIdx} className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-white/5 border border-brand-zinc-200/80 dark:border-white/10 px-3 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-700 dark:text-zinc-300 uppercase shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0306AC] dark:bg-[#E9BD36]" />
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7. DOMAIN EXPERTISE SECTION ──────── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-left border-b border-brand-zinc-200/80 dark:border-white/10 pb-12">
              <div className="max-w-2xl space-y-4">
                <div className="eyebrow-pill">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                  </span>
                  {aboutPage.domainExpertise.eyebrow}
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                  {aboutPage.domainExpertise.titleIntro}
                  <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">{aboutPage.domainExpertise.titleHighlight}</span>
                </h2>
              </div>
              <div className="max-w-md space-y-3">
                <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">{aboutPage.domainExpertise.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch text-left">
              {aboutPage.domainExpertise.domains.map((domain: any, idx: number) => {
                const DomainIcon = iconMap[domain.iconName] || ShoppingCart;
                return (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[32px] bg-zinc-50/90 dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 group hover:border-[#0306AC]/60 dark:hover:border-[#E9BD36]/60 transition-all duration-500 shadow-sm relative overflow-hidden"
                  >
                    <div className="space-y-5 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="h-12 w-12 rounded-2xl bg-[#0306AC]/10 dark:bg-white/10 border border-[#0306AC]/15 dark:border-white/15 flex items-center justify-center text-[#0306AC] dark:text-[#E9BD36] group-hover:scale-110 transition-all duration-300 shadow-md">
                          <DomainIcon className="h-5 w-5" />
                        </div>
                        <span className="font-serif italic text-2xl font-black text-brand-zinc-300 dark:text-zinc-600 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors">{domain.id}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-heading text-lg sm:text-xl font-black text-brand-dark dark:text-white tracking-tight group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors">{domain.title}</h3>
                        <p className="text-xs text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">{domain.desc}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-brand-zinc-200/70 dark:border-white/10 flex flex-wrap gap-1.5 relative z-10">
                      {domain.tags.map((tag: string, tIdx: number) => (
                        <span key={tIdx} className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-white/5 border border-brand-zinc-200/80 dark:border-white/10 px-2.5 py-0.5 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-300 uppercase shadow-xs">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0306AC] dark:bg-[#E9BD36]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 8. WHY BUSINESSES CHOOSE US SECTION ──────── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 space-y-16">
            <div className="text-center flex flex-col items-center max-w-3xl mx-auto space-y-4">
              <div className="eyebrow-pill">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                </span>
                {aboutPage.whyChooseUs.eyebrow}
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                {aboutPage.whyChooseUs.titleIntro}
                <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">{aboutPage.whyChooseUs.titleHighlight}</span>
              </h2>

              <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto">
                {aboutPage.whyChooseUs.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-4 relative flex justify-center z-10">
                <div className="relative w-full rounded-[36px] overflow-hidden bg-brand-blue border border-brand-blue shadow-2xl p-8 sm:p-9 flex flex-col justify-between min-h-[460px] lg:min-h-[520px] z-10">
                  <div className="max-w-[220px] space-y-1.5 z-10 text-left">
                    <div className="h-[2.5px] w-7 bg-brand-yellow mb-4" />
                    <p className="text-white text-sm sm:text-base font-semibold leading-snug tracking-tight">{aboutPage.whyChooseUs.blueCardLine1}</p>
                    <p className="text-brand-yellow text-lg sm:text-xl font-extrabold leading-none pt-1">{aboutPage.whyChooseUs.blueCardLine2}</p>
                  </div>

                  <div className="relative mt-8 -mx-8 sm:-mx-9 -mb-8 sm:-mb-9 rounded-b-[36px] overflow-hidden shadow-inner">
                    <img src={aboutPage.whyChooseUs.blueCardImage} alt={aboutPage.whyChooseUs.blueCardImageAlt} className="w-full h-64 sm:h-72 lg:h-80 object-cover object-center" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 relative z-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
                {aboutPage.whyChooseUs.features.map((feat: any, idx: number) => {
                  const FeatIcon = iconMap[feat.iconName] || Target;
                  return (
                    <div key={idx} className="p-7 rounded-[24px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/70 dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between min-h-[220px] group">
                      <div className={`h-14 w-14 rounded-full flex items-center justify-center ${feat.iconBg === "amber" ? "bg-amber-50/80 dark:bg-amber-500/10 text-amber-500 dark:text-[#E9BD36]" : "bg-blue-50/80 dark:bg-white/5 text-[#0306AC] dark:text-[#E9BD36]"} group-hover:scale-110 transition-transform`}>
                        <FeatIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="h-[2.5px] w-6 bg-[#0306AC] dark:bg-[#E9BD36] mb-3" />
                        <h3 className="font-heading font-extrabold text-base text-brand-dark dark:text-white tracking-tight mb-2">{feat.title}</h3>
                        <p className="text-xs text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. ABOUT FOUNDER SECTION ──────── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative aspect-[4/5] w-full max-w-[440px] rounded-[32px] overflow-hidden shadow-2xl border border-brand-zinc-200/60 dark:border-white/10 relative group">
                  <img src={aboutPage.executiveLeadership.portraitSrc} alt={aboutPage.executiveLeadership.portraitAlt} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute left-6 bottom-6 text-white text-left z-10 select-none">
                    <div className="font-heading font-extrabold text-xl tracking-tight leading-none text-white">{aboutPage.executiveLeadership.founderName}</div>
                    <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest block mt-1">{aboutPage.executiveLeadership.founderTitle}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8 text-left">
                <div className="space-y-4">
                  <div className="eyebrow-pill">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                    </span>
                    {aboutPage.executiveLeadership.eyebrow}
                  </div>

                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                    {aboutPage.executiveLeadership.titleIntro}
                    <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">
                      {aboutPage.executiveLeadership.titleHighlight}
                    </span>
                  </h2>
                </div>

                <div className="space-y-4 text-base sm:text-lg font-sans leading-relaxed text-brand-zinc-600 dark:text-zinc-300">
                  <p>{aboutPage.executiveLeadership.bioParagraph1}</p>
                  <p>{aboutPage.executiveLeadership.bioParagraph2}</p>
                </div>

                <div className="grid grid-cols-3 gap-8 border-t border-brand-zinc-200/80 dark:border-white/10 pt-8">
                  {aboutPage.executiveLeadership.metrics.map((m: any, idx: number) => (
                    <div key={idx} className="space-y-1 text-left">
                      <div className="font-serif italic text-4xl sm:text-5xl font-black text-[#0306AC] dark:text-[#E9BD36]">{m.value}</div>
                      <span className="text-[10px] font-mono font-bold text-brand-dark dark:text-white uppercase tracking-wider block">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. REVIEWS CAROUSEL ──────── */}
        <ReviewsCarousel reviewsData={aboutPage.reviews} />

        {/* Cursive Font Injector */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
          .font-cursive {
            font-family: 'Dancing Script', cursive;
          }
        `}} />

        {/* ── 11. CTA BANNER SECTION ──────── */}
        <section className="relative overflow-hidden py-8 sm:py-12 bg-white dark:bg-[#080710]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
            <div className="cta-banner-card">
              <div className="relative z-10 flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14 lg:max-w-[58%]">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-[10px] font-mono tracking-widest text-[#E9BD36] font-extrabold uppercase w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9BD36] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E9BD36]" />
                  </span>
                  {aboutPage.ctaBanner.eyebrow}
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.18] tracking-tight text-white">
                  {aboutPage.ctaBanner.titleIntro}
                  <span className="whitespace-nowrap inline-block">
                    {aboutPage.ctaBanner.titleWord1}
                    <span className="relative inline-block">
                      <span className="font-cursive text-[#E9BD36] text-3xl sm:text-4xl lg:text-5xl font-normal pl-1">{aboutPage.ctaBanner.titleWord2}</span>
                      <svg className="absolute left-0 bottom-[-2px] w-full h-3 text-[#E9BD36]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M 5 6 C 30 9, 70 9, 95 4" />
                      </svg>
                    </span>
                  </span>
                </h2>

                <p className="text-sm sm:text-base font-sans text-white/90 font-normal leading-relaxed max-w-lg">
                  {aboutPage.ctaBanner.description}
                </p>

                <div className="flex items-center gap-4 flex-wrap pt-2">
                  <a href={aboutPage.ctaBanner.ctaPrimaryHref} className="btn-primary-cta">
                    <span>{aboutPage.ctaBanner.ctaPrimaryText}</span>
                    <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                  </a>

                  <button className="btn-secondary-cta">
                    <span>{aboutPage.ctaBanner.ctaSecondaryText}</span>
                    <span className="btn-icon"><Play className="h-3.5 w-3.5 fill-current ml-0.5" /></span>
                  </button>
                </div>
              </div>

              <div className="hidden lg:flex flex-1 items-end justify-center relative pr-8">
                <div className="absolute bottom-0 w-[320px] h-[320px] bg-gradient-to-t from-[#020485] to-[#0408d9] rounded-full opacity-90 border border-white/20 shadow-2xl" />
                <div className="relative z-10 w-[280px] h-[370px] self-end drop-shadow-2xl overflow-hidden rounded-t-[32px] border-t border-l border-r border-white/25 shadow-2xl">
                  <Image src={aboutPage.executiveLeadership.portraitSrc} alt={aboutPage.executiveLeadership.portraitAlt} width={320} height={420} className="w-full h-full object-cover object-top filter contrast-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010356]/80 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute top-16 right-28 h-3.5 w-3.5 rounded-full bg-[#E9BD36] shadow-[0_0_15px_#E9BD36] z-20" />
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

/* ── Inline Reviews Showcase Component ── */
function ReviewsCarousel({ reviewsData }: { reviewsData: any }) {
  const reviewsList = reviewsData?.list || [];
  const marqueeTrack1 = [...reviewsList, ...reviewsList, ...reviewsList, ...reviewsList];
  const marqueeTrack2 = [...reviewsList.slice().reverse(), ...reviewsList.slice().reverse(), ...reviewsList.slice().reverse(), ...reviewsList.slice().reverse()];

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-4 sm:pb-6 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710]">
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-track-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 48s linear infinite;
          will-change: transform;
        }
        .marquee-track-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 48s linear infinite;
          will-change: transform;
        }
        .marquee-wrapper:hover .marquee-track-left,
        .marquee-wrapper:hover .marquee-track-right {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="relative z-10 space-y-12">
        <div className="text-center flex flex-col items-center space-y-5 max-w-3xl mx-auto px-4">
          <div className="eyebrow-pill">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
            </span>
            {reviewsData.eyebrow}
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15] max-w-2xl">
            {reviewsData.titleIntro}
            <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">{reviewsData.titleHighlight}</span>
          </h2>

          <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 max-w-2xl font-normal leading-relaxed">
            {reviewsData.description}
          </p>

          <div className="pt-1 inline-flex items-center gap-3 sm:gap-4 rounded-full bg-zinc-100/80 dark:bg-white/5 border border-brand-zinc-200 dark:border-white/10 px-5 py-2 text-xs font-mono shadow-xs">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-brand-dark dark:text-white">{reviewsData.ratingValue}</span>
            <span className="text-zinc-300 dark:text-white/20">|</span>
            <span className="text-brand-zinc-600 dark:text-zinc-300 font-medium">{reviewsData.ratingSub}</span>
          </div>
        </div>

        <div className="marquee-wrapper space-y-8 overflow-hidden py-8">
          <div className="flex py-4 overflow-visible">
            <div className="marquee-track-left gap-6 items-stretch py-2">
              {marqueeTrack1.map((r: any, i: number) => (
                <div key={`t1-${i}`} className="w-[360px] sm:w-[420px] shrink-0 p-7 sm:p-8 rounded-[32px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/90 dark:border-white/10 shadow-sm relative overflow-hidden flex flex-col justify-between group select-none cursor-pointer">
                  <div className="space-y-4 relative z-10 text-left">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(5)].map((_, si) => (
                          <Star key={si} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] bg-[#0306AC]/10 dark:bg-white/10 border border-[#0306AC]/20 dark:border-white/15 px-3 py-1 rounded-full uppercase tracking-wider">
                        ⚡ {r.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-sans font-medium text-brand-zinc-700 dark:text-zinc-200 leading-relaxed italic pt-1">
                      "{r.quote}"
                    </p>

                    <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 text-[9.5px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{r.impact}</span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-brand-zinc-200/80 dark:border-white/10 mt-6 relative z-10">
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center font-heading font-black text-xs shadow-md shrink-0 border border-white/20" style={{ backgroundColor: r.accent === "#E9BD36" ? "#E9BD36" : "#0306AC", color: r.accent === "#E9BD36" ? "#080710" : "#ffffff" }}>
                        {r.initial}
                      </div>
                      <div>
                        <span className="block text-xs font-heading font-black text-brand-dark dark:text-white uppercase tracking-wider leading-none">{r.name}</span>
                        <span className="block text-[9.5px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] mt-1 leading-none">{r.role}</span>
                        <span className="block text-[8.5px] font-sans text-brand-zinc-400 dark:text-zinc-400 mt-0.5 leading-none">{r.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex py-4 overflow-visible">
            <div className="marquee-track-right gap-6 items-stretch py-2">
              {marqueeTrack2.map((r: any, i: number) => (
                <div key={`t2-${i}`} className="w-[360px] sm:w-[420px] shrink-0 p-7 sm:p-8 rounded-[32px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/90 dark:border-white/10 shadow-sm relative overflow-hidden flex flex-col justify-between group select-none cursor-pointer">
                  <div className="space-y-4 relative z-10 text-left">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(5)].map((_, si) => (
                          <Star key={si} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] bg-[#0306AC]/10 dark:bg-white/10 border border-[#0306AC]/20 dark:border-white/15 px-3 py-1 rounded-full uppercase tracking-wider">
                        ⚡ {r.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-sans font-medium text-brand-zinc-700 dark:text-zinc-200 leading-relaxed italic pt-1">
                      "{r.quote}"
                    </p>

                    <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 text-[9.5px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{r.impact}</span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-brand-zinc-200/80 dark:border-white/10 mt-6 relative z-10">
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center font-heading font-black text-xs shadow-md shrink-0 border border-white/20" style={{ backgroundColor: r.accent === "#E9BD36" ? "#E9BD36" : "#0306AC", color: r.accent === "#E9BD36" ? "#080710" : "#ffffff" }}>
                        {r.initial}
                      </div>
                      <div>
                        <span className="block text-xs font-heading font-black text-brand-dark dark:text-white uppercase tracking-wider leading-none">{r.name}</span>
                        <span className="block text-[9.5px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] mt-1 leading-none">{r.role}</span>
                        <span className="block text-[8.5px] font-sans text-brand-zinc-400 dark:text-zinc-400 mt-0.5 leading-none">{r.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

