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
  const { aboutOwner } = content;
  const [cardTilt, setCardTilt] = useState({ idx: null as number | null, x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, cardIdx: null as number | null });
  const [activeService, setActiveService] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [hoveredService, setHoveredService] = useState<number | null>(0);
  const [serviceMousePos, setServiceMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
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
                    ABOUT 360 DESIGNS AGENCY
                  </span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-brand-dark dark:text-white max-w-xl">
                  We Build Digital Experiences That{" "}
                  <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1">
                    Drive Real Growth.
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
                  We are a digital agency with a passion for performance. We help brands grow with smart strategies, creative design, and powerful digital solutions that deliver measurable results.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {/* Let's Work Together */}
                  <a
                    href="/#contact"
                    className="btn-primary-cta"
                  >
                    <span>LET'S WORK TOGETHER</span>
                    <span className="btn-icon">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </a>

                  {/* Watch Our Story */}
                  <button
                    className="btn-secondary-cta"
                  >
                    <span>WATCH OUR STORY</span>
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
                    src="/mohsinaboutowner.png"
                    alt="About 360 Designs Agency Overview"
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
                    SUMMARY & METRICS
                  </div>

                  <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight leading-[1.12] text-brand-dark dark:text-white">
                    We shape the future of digital{" "}
                    <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">brands.</span>
                  </h2>

                  <p className="text-sm font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-xs">
                    Every strategic choice, line of code, and creative pixel is engineered to establish market leadership and drive commercial value.
                  </p>
                </div>

                {/* Symmetrical Core Expertise List at the Bottom */}
                <div className="pt-6 mt-8 border-t border-brand-zinc-100 dark:border-white/5 w-full select-none">
                  <span className="text-[7.5px] font-mono tracking-widest text-brand-blue dark:text-brand-yellow uppercase font-black block mb-3">
                    // EXPERTISE
                  </span>
                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-6">
                    <div className="flex items-center gap-2 text-brand-dark dark:text-white text-[9.5px] font-bold uppercase tracking-wider">
                      <span className="text-[8px] font-mono text-brand-zinc-400 dark:text-zinc-500 font-normal">[ 01 ]</span>
                      Strategy
                    </div>
                    <div className="flex items-center gap-2 text-brand-dark dark:text-white text-[9.5px] font-bold uppercase tracking-wider">
                      <span className="text-[8px] font-mono text-brand-zinc-400 dark:text-zinc-500 font-normal">[ 02 ]</span>
                      UI / UX
                    </div>
                    <div className="flex items-center gap-2 text-brand-dark dark:text-white text-[9.5px] font-bold uppercase tracking-wider">
                      <span className="text-[8px] font-mono text-brand-zinc-400 dark:text-zinc-500 font-normal">[ 03 ]</span>
                      Next.js
                    </div>
                    <div className="flex items-center gap-2 text-brand-dark dark:text-white text-[9.5px] font-bold uppercase tracking-wider">
                      <span className="text-[8px] font-mono text-brand-zinc-400 dark:text-zinc-500 font-normal">[ 04 ]</span>
                      Growth
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 2x2 Clean Typographic Grid */}
              <div className="lg:col-span-8 grid grid-cols-2 gap-x-12 gap-y-12 sm:gap-x-16 border-t lg:border-t-0 lg:border-l border-brand-zinc-200/60 dark:border-white/5 pt-10 lg:pt-0 lg:pl-16">

                {/* Stat 1 */}
                <div className="flex flex-col items-start relative w-full group hover:-translate-y-1 transition-transform duration-350 ease-out">
                  <div className="relative flex items-center justify-between w-full pb-2.5 mb-3">
                    <Globe className="h-4.5 w-4.5 text-[#0306AC] dark:text-[#E9BD36] transition-transform duration-300 group-hover:rotate-[15deg]" />
                    <span className="text-[8px] font-mono tracking-widest text-brand-zinc-400 dark:text-zinc-500 select-none">[ 01 ]</span>
                    {/* Hover animated border line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-zinc-100 dark:bg-white/5" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0306AC] dark:text-[#E9BD36] group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                  <div className="flex items-baseline gap-0.5 text-brand-dark dark:text-white">
                    <span className="font-heading font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-none text-brand-dark dark:text-white">
                      <DigitTicker value={300} />
                    </span>
                    <span className="font-heading font-bold text-2xl sm:text-3xl leading-none text-[#0306AC] dark:text-[#E9BD36]">+</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-black text-brand-dark dark:text-white uppercase tracking-widest mt-3.5 leading-none transition-colors duration-300 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36]">
                    Global Clients
                  </p>
                  <p className="text-[9.5px] text-brand-zinc-400 dark:text-zinc-500 mt-2 font-semibold leading-normal max-w-[200px]">
                    Active partnerships across borders and industries
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-start relative w-full group hover:-translate-y-1 transition-transform duration-350 ease-out">
                  <div className="relative flex items-center justify-between w-full pb-2.5 mb-3">
                    <Rocket className="h-4.5 w-4.5 text-[#0306AC] dark:text-[#E9BD36] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="text-[8px] font-mono tracking-widest text-brand-zinc-400 dark:text-zinc-500 select-none">[ 02 ]</span>
                    {/* Hover animated border line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-zinc-100 dark:bg-white/5" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0306AC] dark:text-[#E9BD36] group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                  <div className="flex items-baseline gap-0.5 text-brand-dark dark:text-white">
                    <span className="font-heading font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-none text-brand-dark dark:text-white">
                      <DigitTicker value={250} />
                    </span>
                    <span className="font-heading font-bold text-2xl sm:text-3xl leading-none text-[#0306AC] dark:text-[#E9BD36]">+</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-black text-brand-dark dark:text-white uppercase tracking-widest mt-3.5 leading-none transition-colors duration-300 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36]">
                    Projects Built
                  </p>
                  <p className="text-[9.5px] text-brand-zinc-400 dark:text-zinc-500 mt-2 font-semibold leading-normal max-w-[200px]">
                    Delivered with absolute pixel perfection
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-start relative w-full group hover:-translate-y-1 transition-transform duration-350 ease-out">
                  <div className="relative flex items-center justify-between w-full pb-2.5 mb-3">
                    <Heart className="h-4.5 w-4.5 text-[#0306AC] dark:text-[#E9BD36] transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-[8px] font-mono tracking-widest text-brand-zinc-400 dark:text-zinc-500 select-none">[ 03 ]</span>
                    {/* Hover animated border line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-zinc-100 dark:bg-white/5" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0306AC] dark:bg-[#E9BD36] group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                  <div className="flex items-baseline gap-0.5 text-brand-dark dark:text-white">
                    <span className="font-heading font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-none text-brand-dark dark:text-white">
                      <DigitTicker value={98} />
                    </span>
                    <span className="font-heading font-bold text-2xl sm:text-3xl leading-none text-[#0306AC] dark:text-[#E9BD36]">%</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-black text-brand-dark dark:text-white uppercase tracking-widest mt-3.5 leading-none transition-colors duration-300 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36]">
                    Satisfaction Rate
                  </p>
                  <p className="text-[9.5px] text-brand-zinc-400 dark:text-zinc-500 mt-2 font-semibold leading-normal max-w-[200px]">
                    Ranked by our clients' success and reviews
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-start relative w-full group hover:-translate-y-1 transition-transform duration-350 ease-out">
                  <div className="relative flex items-center justify-between w-full pb-2.5 mb-3">
                    <Trophy className="h-4.5 w-4.5 text-[#0306AC] dark:text-[#E9BD36] transition-transform duration-300 group-hover:rotate-[-10deg]" />
                    <span className="text-[8px] font-mono tracking-widest text-brand-zinc-400 dark:text-zinc-500 select-none">[ 04 ]</span>
                    {/* Hover animated border line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-zinc-100 dark:bg-white/5" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0306AC] dark:text-[#E9BD36] group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                  <div className="flex items-baseline gap-0.5 text-brand-dark dark:text-white">
                    <span className="font-heading font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-none text-brand-dark dark:text-white">
                      <DigitTicker value={7} />
                    </span>
                    <span className="font-heading font-bold text-2xl sm:text-3xl leading-none text-[#0306AC] dark:text-[#E9BD36]">+</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-black text-brand-dark dark:text-white uppercase tracking-widest mt-3.5 leading-none transition-colors duration-300 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36]">
                    Years Active
                  </p>
                  <p className="text-[9.5px] text-brand-zinc-400 dark:text-zinc-500 mt-2 font-semibold leading-normal max-w-[200px]">
                    Pioneering industry-leading digital design
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── 3. WHO WE ARE SECTION (Awwwards-Level Premium Collage & Editorial Rows) ──── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710]">

          {/* Gigantic background watermarked agency identifier */}
          <div className="absolute right-[5%] top-[10%] text-[15vw] sm:text-[12vw] font-heading font-black tracking-tighter text-[#0306AC]/[0.015] dark:text-white/[0.01] pointer-events-none select-none z-0 leading-none">
            CREATIVE
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
                    WHO WE ARE
                  </div>

                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                    Designing landmarks,{" "}
                    <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">
                      not just interfaces.
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-2xl">
                    We are an elite coalition of design purists, engineering craftspeople, and performance strategists who build high-ticket platforms that command market attention and scale digital authority.
                  </p>
                </div>

                {/* Awwwards-Style Expandable Editorial Rows */}
                <div className="border-t border-brand-zinc-200 dark:border-white/10 divide-y divide-brand-zinc-200 dark:divide-white/10 w-full">

                  {/* Row 1 */}
                  <div className="group relative py-6 flex items-start justify-between gap-6 cursor-pointer overflow-hidden transition-all duration-300">
                    <div className="absolute inset-y-0 left-0 w-0 bg-zinc-50 dark:bg-white/[0.02] group-hover:w-full transition-all duration-500 ease-out -z-10" />

                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="text-[10px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] mt-1 select-none">[ 01 ]</span>
                      <div className="space-y-1">
                        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-dark dark:text-white group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors duration-300">
                          Radical Aesthetics
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-brand-zinc-550 dark:text-zinc-300 font-medium leading-normal max-w-md transition-colors duration-300 group-hover:text-brand-dark dark:group-hover:text-white">
                          Avant-garde layout architectures and bespoke identity systems built to visually isolate your brand from standard templates.
                        </p>
                      </div>
                    </div>
                    <div className="h-7 w-7 rounded-full border border-brand-zinc-300 dark:border-white/10 flex items-center justify-center text-brand-zinc-400 dark:text-zinc-500 group-hover:border-[#0306AC] dark:group-hover:border-[#E9BD36] group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] group-hover:rotate-45 transition-all duration-300 shrink-0">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="group relative py-6 flex items-start justify-between gap-6 cursor-pointer overflow-hidden transition-all duration-300">
                    <div className="absolute inset-y-0 left-0 w-0 bg-zinc-50 dark:bg-white/[0.02] group-hover:w-full transition-all duration-500 ease-out -z-10" />

                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="text-[10px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] mt-1 select-none">[ 02 ]</span>
                      <div className="space-y-1">
                        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-dark dark:text-white group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors duration-300">
                          High-Fidelity Engineering
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-brand-zinc-550 dark:text-zinc-300 font-medium leading-normal max-w-md transition-colors duration-300 group-hover:text-brand-dark dark:group-hover:text-white">
                          Next.js production engines engineered with semantic HTML, precise performance caching, and custom Framer Motion dynamics.
                        </p>
                      </div>
                    </div>
                    <div className="h-7 w-7 rounded-full border border-brand-zinc-300 dark:border-white/10 flex items-center justify-center text-brand-zinc-400 dark:text-zinc-500 group-hover:border-[#0306AC] dark:group-hover:border-[#E9BD36] group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] group-hover:rotate-45 transition-all duration-300 shrink-0">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="group relative py-6 flex items-start justify-between gap-6 cursor-pointer overflow-hidden transition-all duration-300">
                    <div className="absolute inset-y-0 left-0 w-0 bg-zinc-50 dark:bg-white/[0.02] group-hover:w-full transition-all duration-500 ease-out -z-10" />

                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="text-[10px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] mt-1 select-none">[ 03 ]</span>
                      <div className="space-y-1">
                        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-dark dark:text-white group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors duration-300">
                          Commercial Growth Engines
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-brand-zinc-550 dark:text-zinc-300 font-medium leading-normal max-w-md transition-colors duration-300 group-hover:text-brand-dark dark:group-hover:text-white">
                          Strategic landing funnels and advanced SEO frameworks focused on positioning, high intent search rankings, and enterprise sales.
                        </p>
                      </div>
                    </div>
                    <div className="h-7 w-7 rounded-full border border-brand-zinc-300 dark:border-white/10 flex items-center justify-center text-brand-zinc-400 dark:text-zinc-500 group-hover:border-[#0306AC] dark:group-hover:border-[#E9BD36] group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] group-hover:rotate-45 transition-all duration-300 shrink-0">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Interactive 3D Parallax Collage */}
              <div className="lg:col-span-6 relative h-[380px] sm:h-[480px] w-full flex items-center justify-center select-none">

                {/* Collage Container with Hover Group Parallax */}
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative w-full h-full max-w-[480px]"
                >

                  {/* Card A: Background Abstract Art (Parallax Layer 1 - Deep) */}
                  <motion.div
                    variants={{
                      rest: { x: 0, y: 0, rotate: -4, scale: 0.95 },
                      hover: { x: -25, y: -15, rotate: -8, scale: 0.96 }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute left-4 top-4 w-[60%] aspect-[1.1] rounded-2xl overflow-hidden border border-brand-zinc-200 dark:border-white/5 shadow-md bg-brand-dark -z-10"
                  >
                    <img
                      src="/agency_abstract_graphics.png"
                      alt="Abstract 3D Glass Render"
                      className="w-full h-full object-cover opacity-60 dark:opacity-80"
                    />
                  </motion.div>

                  {/* Card B: Midground Studio workspace (Parallax Layer 2 - Center) */}
                  <motion.div
                    variants={{
                      rest: { x: 0, y: 0, scale: 1 },
                      hover: { x: 0, y: 0, scale: 1.02 }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute left-[15%] top-[15%] w-[70%] aspect-[1.3] rounded-2xl overflow-hidden border border-brand-zinc-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white dark:bg-[#12121e]"
                  >
                    <img
                      src="/agency_workspace.png"
                      alt="360 Designs Agency Workspace"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-grid-blue-4 opacity-[0.02] [background-size:16px_16px]" />
                  </motion.div>

                  {/* Card C: Foreground High-Fidelity UI Detail (Parallax Layer 3 - Close) */}
                  <motion.div
                    variants={{
                      rest: { x: 0, y: 0, rotate: 6, scale: 0.98 },
                      hover: { x: 30, y: 25, rotate: 10, scale: 1.02 }
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute right-2 bottom-6 w-[55%] aspect-[1.28] rounded-2xl overflow-hidden border border-[#E9BD36]/20 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-white dark:bg-[#12121e]"
                  >
                    <img
                      src="/agency_ui_detail.png"
                      alt="Minimalist High-Fidelity Dashboard Interface"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0306AC]/10 to-transparent mix-blend-overlay pointer-events-none" />
                  </motion.div>

                  {/* Spinning active dot indicator badge overlay */}
                  <div className="absolute top-[8%] right-[8%] bg-white/95 dark:bg-[#080710]/95 backdrop-blur-md border border-brand-zinc-200 dark:border-white/10 px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-lg select-none">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0306AC] dark:bg-[#E9BD36]" />
                    </span>
                    <span className="text-[8px] font-mono tracking-widest text-[#0306AC] dark:text-[#E9BD36] font-black uppercase">
                      STUDIO PARALLAX // ACTIVE
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
          {/* Architectural grid background overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none -z-10" />

          {/* Drifting ambient background color orbs */}
          <div className="absolute top-[15%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#0306AC]/[0.03] dark:bg-[#0306AC]/0.05 blur-[140px] pointer-events-none -z-10 animate-float-blob" />
          <div className="absolute bottom-[15%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#E9BD36]/[0.02] dark:bg-[#E9BD36]/0.04 blur-[150px] pointer-events-none -z-10 animate-float-blob-delayed" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 space-y-28 sm:space-y-40">

            {/* Header Block */}
            <div className="text-left max-w-2xl space-y-4">
              <div className="eyebrow-pill">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                </span>
                PHILOSOPHY & CONVICTIONS
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                Our Strategic{" "}
                <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">
                  Foundation.
                </span>
              </h2>
            </div>

            {/* Alternating Grid Rows */}
            <div className="space-y-32 sm:space-y-44">

              {/* Row 1: Mission */}
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
                      01
                    </span>
                    <div className="h-[1px] w-8 bg-[#0306AC]/20 dark:bg-white/10" />
                    <span className="text-[8.5px] font-mono tracking-widest text-[#0306AC] dark:text-[#E9BD36] font-black uppercase">
                      // OUR MISSION
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark dark:text-white leading-[1.15] tracking-tight">
                    We engineer digital architectures that multiply commercial <span className="font-serif italic text-[#0306AC] dark:text-[#E9BD36] font-light">authority.</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                    To empower organizations with strategy-led Next.js configurations and conversion-focused design systems that scale organic visibility and brand value.
                  </p>

                  {/* Editorial Quote Callout */}
                  <div className="pl-4 border-l-2 border-[#0306AC] dark:border-[#E9BD36] italic text-xs font-serif text-brand-dark dark:text-zinc-200 py-0.5">
                    "We build software meant to dominate digital markets, not just exist online."
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      <Code className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                      Custom Next.js
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      <Rocket className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                      High-Velocity Load
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      <Globe className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                      Organic SEO
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="aspect-[1.45] w-full rounded-[32px] overflow-hidden border border-brand-zinc-200/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.45)] group-hover:shadow-[0_30px_90px_rgba(3,6,172,0.2)] dark:group-hover:shadow-[0_30px_90px_rgba(233,189,54,0.15)] transition-all duration-700 group relative bg-[#090812]">
                    <img
                      src="/agency_ui_detail.png"
                      alt="Our Mission Graphic"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0306AC]/15 via-transparent to-transparent mix-blend-overlay" />

                    {/* Corner Crosshairs */}
                    <span className="absolute top-3.5 left-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>
                    <span className="absolute top-3.5 right-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>
                    <span className="absolute bottom-3.5 left-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>
                    <span className="absolute bottom-3.5 right-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>

                    {/* Top-Right Telemetry Badge Overlay */}
                    <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span className="text-[8.5px] font-mono font-black text-white uppercase tracking-wider">
                        LATENCY // 12ms
                      </span>
                    </div>

                    {/* Bottom-Left Core Vital Metric Overlay */}
                    <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="text-[8.5px] font-mono font-black text-[#E9BD36] uppercase tracking-wider">
                        PERFORMANCE // 99.4%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Row 2: Vision */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center group"
              >
                <div className="lg:col-span-7">
                  <div className="aspect-[1.45] w-full rounded-[32px] overflow-hidden border border-brand-zinc-200/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.45)] group-hover:shadow-[0_30px_90px_rgba(3,6,172,0.2)] dark:group-hover:shadow-[0_30px_90px_rgba(233,189,54,0.15)] transition-all duration-700 group relative bg-[#090812]">
                    <img
                      src="/agency_workspace.png"
                      alt="Our Vision Graphic"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0306AC]/15 via-transparent to-transparent mix-blend-overlay" />

                    {/* Corner Crosshairs */}
                    <span className="absolute top-3.5 left-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>
                    <span className="absolute top-3.5 right-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>
                    <span className="absolute bottom-3.5 left-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>
                    <span className="absolute bottom-3.5 right-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>

                    {/* Bottom-Left Telemetry Badge Overlay */}
                    <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9BD36] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E9BD36]" />
                      </span>
                      <span className="text-[8.5px] font-mono font-black text-[#E9BD36] uppercase tracking-wider">
                        ACCESSIBILITY // AAA
                      </span>
                    </div>

                    {/* Top-Right Standards Overlay */}
                    <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="text-[8.5px] font-mono font-black text-white uppercase tracking-wider">
                        LIGHTHOUSE // 100/100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
                  <div className="flex items-center gap-4">
                    <span className="font-serif italic text-5xl sm:text-6xl font-black text-brand-zinc-200 dark:text-white/10 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors duration-500 leading-none select-none">
                      02
                    </span>
                    <div className="h-[1px] w-8 bg-[#0306AC]/20 dark:bg-white/10" />
                    <span className="text-[8.5px] font-mono tracking-widest text-[#0306AC] dark:text-[#E9BD36] font-black uppercase">
                      // OUR VISION
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark dark:text-white leading-[1.15] tracking-tight">
                    We establish the digital standards that others <span className="font-serif italic text-[#0306AC] dark:text-[#E9BD36] font-light">replicate.</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                    To pioneer an era where web engineering matches the tier of luxury brand design, proving that accessibility, speed, and clean typography are commercially absolute.
                  </p>

                  {/* Editorial Quote Callout */}
                  <div className="pl-4 border-l-2 border-[#0306AC] dark:border-[#E9BD36] italic text-xs font-serif text-brand-dark dark:text-zinc-200 py-0.5">
                    "Design without technical rigor is just decorative artwork."
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      <Palette className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                      Design Systems
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      <ShieldCheck className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                      Universal WCAG
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      <TrendingUp className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                      Brand Architecture
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Row 3: Values */}
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
                      03
                    </span>
                    <div className="h-[1px] w-8 bg-[#0306AC]/20 dark:bg-white/10" />
                    <span className="text-[8.5px] font-mono tracking-widest text-[#0306AC] dark:text-[#E9BD36] font-black uppercase">
                      // SHARED VALUES
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark dark:text-white leading-[1.15] tracking-tight">
                    Absolute precision, transparent pipelines, zero <span className="font-serif italic text-[#0306AC] dark:text-[#E9BD36] font-light">clutter.</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                    We view our partnerships as collaborative sprints, aligning through direct synchronization and zero-downtime engineering cycles.
                  </p>

                  {/* Editorial Quote Callout */}
                  <div className="pl-4 border-l-2 border-[#0306AC] dark:border-[#E9BD36] italic text-xs font-serif text-brand-dark dark:text-zinc-200 py-0.5">
                    "Direct technical alignment eliminates management noise."
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      <Target className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                      Modular Sprints
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      <BarChart2 className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                      Direct Discord Sync
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-zinc-50 dark:bg-white/5 border border-brand-zinc-200/60 dark:border-white/10 px-3.5 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      <Trophy className="h-3 w-3 text-[#0306AC] dark:text-[#E9BD36]" />
                      Zero Downtime
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="aspect-[1.45] w-full rounded-[32px] overflow-hidden border border-brand-zinc-200/80 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.45)] group-hover:shadow-[0_30px_90px_rgba(3,6,172,0.2)] dark:group-hover:shadow-[0_30px_90px_rgba(233,189,54,0.15)] transition-all duration-700 group relative bg-[#090812]">
                    <img
                      src="/agency_abstract_graphics.png"
                      alt="Our Values Graphic"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0306AC]/15 via-transparent to-transparent mix-blend-overlay" />

                    {/* Corner Crosshairs */}
                    <span className="absolute top-3.5 left-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>
                    <span className="absolute top-3.5 right-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>
                    <span className="absolute bottom-3.5 left-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>
                    <span className="absolute bottom-3.5 right-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">+</span>

                    {/* Top-Left Telemetry Badge Overlay */}
                    <div className="absolute top-5 left-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span className="text-[8.5px] font-mono font-black text-white uppercase tracking-wider">
                        SYNC STATUS // CONNECTED
                      </span>
                    </div>

                    {/* Bottom-Right Department Badge Overlay */}
                    <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl select-none">
                      <span className="text-[8.5px] font-mono font-black text-[#E9BD36] uppercase tracking-wider">
                        AGENCY SPRINT // ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* ── 5. OUR SERVICES SECTION (Sticky Split-Screen Visual Canvas - Locomotive/Awwwards Style) ──────── */}
        <section className="relative overflow-x-clip py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710] transition-colors duration-300">

          {/* Drifting Ambient Lighting Orbs */}
          <div className="absolute top-[10%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-[#0306AC]/[0.035] dark:bg-[#0306AC]/0.06 blur-[150px] pointer-events-none -z-10 animate-float-blob" />
          <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#E9BD36]/[0.025] dark:bg-[#E9BD36]/0.05 blur-[150px] pointer-events-none -z-10 animate-float-blob-delayed" />

          {/* Mobile Sticky Horizontal Capability Bar (Visible on Mobile & Tablet) */}
          <div className="sticky top-14 sm:top-16 z-30 flex lg:hidden overflow-x-auto no-scrollbar py-3 px-4 gap-2 bg-white/95 dark:bg-[#080710]/95 backdrop-blur-xl border-b border-brand-zinc-200 dark:border-white/10 shadow-sm mb-8 select-none">
            {[
              { id: "01", name: "Brand Identity" },
              { id: "02", name: "Next.js Web" },
              { id: "03", name: "Technical SEO" },
              { id: "04", name: "Paid Ads" },
              { id: "05", name: "Social Growth" },
              { id: "06", name: "4K Studio" },
            ].map((item, idx) => {
              const isActive = activeService === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveService(idx);
                    const el = document.getElementById(`service-stage-${item.id}`);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset - 110;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold shrink-0 flex items-center gap-2 transition-all duration-300 ${isActive
                    ? "bg-[#0306AC] text-white dark:bg-[#E9BD36] dark:text-brand-dark shadow-md"
                    : "bg-zinc-100 text-brand-zinc-600 dark:bg-white/5 dark:text-zinc-400"
                    }`}
                >
                  <span>{item.id}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

              {/* Left Pinned Sticky Navigation Panel (Hidden on mobile, Sticky on LG desktop) */}
              <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 self-start z-20">
                <div className="p-6 sm:p-7 rounded-[32px] bg-zinc-50/90 dark:bg-[#0c0b18]/90 border border-brand-zinc-200/80 dark:border-white/10 shadow-2xl backdrop-blur-xl space-y-5 text-left relative overflow-hidden">

                  {/* Header */}
                  <div className="space-y-3">
                    <div className="eyebrow-pill">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                      </span>
                      SERVICES DIRECTORY
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                      Capabilities built to{" "}
                      <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">elevate your brand.</span>
                    </h2>
                  </div>

                  {/* Dynamic Vertical Navigation Menu (Live Scroll Highlight) */}
                  <div className="space-y-1.5 pt-3 border-t border-brand-zinc-200/80 dark:border-white/10 select-none relative">
                    {[
                      { id: "01", name: "Brand Identity & Systems", tag: "Design" },
                      { id: "02", name: "Next.js Web Engineering", tag: "Development" },
                      { id: "03", name: "Search Engine Optimization", tag: "SEO" },
                      { id: "04", name: "Paid Advertising & Funnels", tag: "Marketing" },
                      { id: "05", name: "Social Media Strategy", tag: "Growth" },
                      { id: "06", name: "Creative Video & Copy", tag: "Studio" },
                    ].map((item, idx) => {
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
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-serif italic text-xs font-black transition-colors ${isActive ? "text-[#E9BD36] dark:text-[#080710]" : "text-brand-zinc-400 dark:text-zinc-400"
                              }`}>
                              {item.id}
                            </span>
                            <span className="font-heading text-xs tracking-tight">
                              {item.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors ${isActive
                              ? "bg-white/20 text-white dark:bg-black/15 dark:text-[#080710]"
                              : "bg-black/5 dark:bg-white/10 text-brand-zinc-500 dark:text-zinc-300"
                              }`}>
                              {item.tag}
                            </span>
                            <ArrowRight className={`h-3.5 w-3.5 transition-transform ${isActive ? "translate-x-1 opacity-100 text-[#E9BD36] dark:text-[#080710]" : "opacity-30 group-hover:opacity-100"
                              }`} />
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Glass Card Footer CTA */}
                  <div className="pt-2 border-t border-brand-zinc-200/80 dark:border-white/10">
                    <a
                      href="/contact"
                      className="w-full py-3.5 rounded-2xl bg-[#E9BD36] text-[#080710] font-mono text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ffe554] hover:scale-[1.02] transition-all duration-300 shadow-lg"
                    >
                      <span>SCHEDULE FREE CONSULTATION</span>
                      <ArrowRight className="h-4 w-4 text-[#080710]" />
                    </a>
                  </div>

                </div>
              </div>

              {/* Right Scrolling Visual Stages (7 Columns) */}
              <div className="lg:col-span-7 space-y-10 sm:space-y-14 lg:space-y-16 text-left">
                {[
                  {
                    id: "01",
                    icon: Palette,
                    category: "BRANDING & VISUAL IDENTITY",
                    title: "Brand Identity Systems & Design Tokens",
                    desc: "We create distinctive logos, custom color schemes, typography guidelines, and design tokens that make your brand stand out and build instant customer trust.",
                    image: "/agency_ui_detail.png",
                    badge: "100% BESPOKE DESIGN",
                    deliverables: ["Logo Architecture", "Color Tokens", "Brand Style Guide", "Design Systems"],
                  },
                  {
                    id: "02",
                    icon: Code,
                    category: "WEB & PLATFORM ENGINEERING",
                    title: "Next.js 15 Web Design & App Development",
                    desc: "Building ultra-fast, mobile-responsive Next.js websites powered by Tailwind CSS and Framer Motion graphics engineered to maximize visitor conversions.",
                    image: "/agency_workspace.png",
                    badge: "VELOCITY // 99.8% LIGHTHOUSE",
                    deliverables: ["Next.js 15 Engine", "Tailwind CSS", "Framer Motion", "Edge API Routes"],
                  },
                  {
                    id: "03",
                    icon: Search,
                    category: "SEARCH ENGINE OPTIMIZATION",
                    title: "Technical SEO & Search Authority",
                    desc: "Boost your Google rankings and attract high-intent organic traffic through technical SEO audits, JSON-LD schema markup, and strategic keyword silos.",
                    image: "/agency_abstract_graphics.png",
                    badge: "RANK #1 GOOGLE TARGET",
                    deliverables: ["Technical SEO Audits", "JSON-LD Schemas", "Keyword Silos", "Search Authority"],
                  },
                  {
                    id: "04",
                    icon: Megaphone,
                    category: "PAID MEDIA & FUNNELS",
                    title: "Paid Advertising & High-ROAS Funnels",
                    desc: "Executing ROI-focused Google and Meta ad campaigns targeted at ready-to-buy customers to deliver measurable commercial returns on ad spend.",
                    image: "/agency_ui_detail.png",
                    badge: "4.8X AVERAGE ROAS",
                    deliverables: ["Google PPC Ads", "Meta Campaigns", "Pixel Analytics", "Retargeting Funnels"],
                  },
                  {
                    id: "05",
                    icon: Users,
                    category: "COMMUNITY & SOCIAL MEDIA",
                    title: "Social Media Strategy & Audience Growth",
                    desc: "Cultivating dedicated brand communities across Instagram, LinkedIn, and YouTube using custom motion graphics, video reels, and data-backed posting.",
                    image: "/agency_workspace.png",
                    badge: "+340% ENGAGEMENT LIFT",
                    deliverables: ["Omnichannel Strategy", "Motion Reels", "Community Growth", "Channel Management"],
                  },
                  {
                    id: "06",
                    icon: Video,
                    category: "CREATIVE STUDIO & PRODUCTION",
                    title: "High-End 4K Video Production & Copywriting",
                    desc: "Producing cinematic media assets, persuasive copywriting, and brand editorial content designed to engage audiences and convert leads.",
                    image: "/agency_abstract_graphics.png",
                    badge: "4K CINEMA PRODUCTION",
                    deliverables: ["Brand Copywriting", "4K Video Media", "Social Reels", "Editorial Layouts"],
                  },
                ].map((stage, idx) => {
                  const StageIcon = stage.icon;

                  return (
                    <div
                      id={`service-stage-${stage.id}`}
                      key={stage.id}
                      className="rounded-[28px] sm:rounded-[36px] bg-zinc-50/80 dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/10 p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 group hover:border-[#0306AC]/60 dark:hover:border-[#E9BD36]/60 transition-all duration-300 shadow-sm hover:shadow-2xl relative overflow-hidden will-change-transform"
                    >
                      {/* Top Bar: Index & Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-serif italic text-2xl font-black text-[#0306AC] dark:text-[#E9BD36]">
                            {stage.id}
                          </span>
                          <div className="h-[1px] w-6 bg-brand-zinc-300 dark:bg-white/20" />
                          <span className="text-[9px] font-mono font-bold text-brand-zinc-500 dark:text-zinc-300 uppercase tracking-widest">
                            // {stage.category}
                          </span>
                        </div>

                        <div className="bg-white dark:bg-white/10 border border-brand-zinc-200 dark:border-white/15 px-3 py-1.5 rounded-xl text-[8.5px] font-mono font-bold text-brand-dark dark:text-white uppercase tracking-wider shadow-sm">
                          {stage.badge}
                        </div>
                      </div>

                      {/* Visual Graphic Stage Box */}
                      <div className="aspect-[1.65] w-full rounded-2xl overflow-hidden border border-brand-zinc-200/80 dark:border-white/10 relative bg-[#090812]">
                        <img
                          src={stage.image}
                          alt={stage.title}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white select-none">
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                            <StageIcon className="h-4 w-4 text-[#E9BD36]" />
                            <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider">
                              {stage.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content & Description */}
                      <div className="space-y-3">
                        <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-dark dark:text-white tracking-tight leading-tight group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors">
                          {stage.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                          {stage.desc}
                        </p>
                      </div>

                      {/* Deliverables & Get Started Link */}
                      <div className="pt-6 border-t border-brand-zinc-200/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {stage.deliverables.map((del, dIdx) => (
                            <span
                              key={dIdx}
                              className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-white/5 border border-brand-zinc-200 dark:border-white/10 px-3 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-300 uppercase"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#0306AC] dark:bg-[#E9BD36]" />
                              {del}
                            </span>
                          ))}
                        </div>

                        <a
                          href="/contact"
                          className="inline-flex items-center gap-2 text-xs font-mono font-black text-brand-dark dark:text-white group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors"
                        >
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

        {/* ── 6. OUR PROCESS SECTION (Clean & Spacious 3-Column Glass Grid) ──────── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710] transition-colors duration-300">

          {/* Drifting Ambient Lighting Orbs */}
          <div className="absolute top-[15%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-[#0306AC]/[0.035] dark:bg-[#0306AC]/0.06 blur-[150px] pointer-events-none -z-10 animate-float-blob" />
          <div className="absolute bottom-[15%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#E9BD36]/[0.025] dark:bg-[#E9BD36]/0.05 blur-[150px] pointer-events-none -z-10 animate-float-blob-delayed" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 space-y-16">

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-left border-b border-brand-zinc-200/80 dark:border-white/10 pb-12">
              <div className="max-w-2xl space-y-4">
                <div className="eyebrow-pill">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                  </span>
                  THE METHODOLOGY
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                  Our 5-Step Process for{" "}
                  <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">Predictable Results.</span>
                </h2>
              </div>

              <div className="max-w-md space-y-3">
                <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                  A transparent, structured workflow engineered to deliver high-speed web platforms with zero friction and guaranteed deadlines.
                </p>
              </div>
            </div>

            {/* 3-Column Glass Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch text-left">
              {[
                {
                  step: "01",
                  icon: Search,
                  title: "Discovery & Market Audit",
                  desc: "We analyze your business model, target audience personas, conversion bottlenecks, and competitor strategies to build an actionable blueprint.",
                  deliverables: ["Market Positioning", "User Personas", "Bottleneck Audit"],
                  badge: "PHASE 01 // AUDIT"
                },
                {
                  step: "02",
                  icon: Compass,
                  title: "Architecture & Sprint Spec",
                  desc: "Designing site sitemaps, interactive wireframes, component design tokens, and technical requirements before writing a single line of code.",
                  deliverables: ["Design Tokens", "Wireframe Specs", "Tech Stack Spec"],
                  badge: "PHASE 02 // PLAN"
                },
                {
                  step: "03",
                  icon: Code,
                  title: "High-Speed Engineering",
                  desc: "Building custom Next.js 15 web components, Tailwind CSS design systems, and Framer Motion micro-animations with weekly demo builds.",
                  deliverables: ["Next.js Engine", "Motion System", "API Routes"],
                  badge: "PHASE 03 // BUILD"
                },
                {
                  step: "04",
                  icon: ShieldCheck,
                  title: "Testing & Accessibility QA",
                  desc: "Rigorous cross-browser testing, mobile WCAG accessibility audits, SEO schema verification, and Lighthouse 99+ speed optimizations.",
                  deliverables: ["WCAG 2.1 Audit", "Lighthouse 99+", "SEO Schemas"],
                  badge: "PHASE 04 // VERIFY"
                },
                {
                  step: "05",
                  icon: Rocket,
                  title: "Launch & Growth Scaling",
                  desc: "Zero-downtime production deployment followed by post-launch conversion rate optimization (CRO) and ongoing performance enhancements.",
                  deliverables: ["Zero Downtime", "CRO Analytics", "Growth Sprints"],
                  badge: "PHASE 05 // SCALE"
                },
              ].map((process, idx) => {
                const StepIcon = process.icon;

                return (
                  <motion.div
                    key={process.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[36px] bg-zinc-50/90 dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/10 p-8 sm:p-9 text-brand-dark dark:text-white flex flex-col justify-between space-y-6 group hover:border-[#0306AC]/60 dark:hover:border-[#E9BD36]/60 transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden will-change-transform transform-gpu"
                  >
                    {/* Background Lighting Orb */}
                    <div className="absolute top-[-20%] right-[-20%] w-32 h-32 rounded-full bg-[#0306AC]/10 dark:bg-[#E9BD36]/15 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                    <div className="space-y-6 relative z-10">
                      {/* Top Bar: Step Index & Icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-serif italic text-4xl font-black text-[#0306AC] dark:text-[#E9BD36]">
                            {process.step}
                          </span>
                          <div className="h-[1px] w-6 bg-brand-zinc-300 dark:bg-white/20" />
                          <span className="text-[9px] font-mono font-bold text-brand-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            {process.badge}
                          </span>
                        </div>

                        <div className="h-12 w-12 rounded-2xl bg-[#0306AC]/10 dark:bg-white/10 border border-[#0306AC]/15 dark:border-white/15 flex items-center justify-center text-[#0306AC] dark:text-[#E9BD36] group-hover:scale-110 group-hover:bg-[#0306AC] group-hover:text-white dark:group-hover:bg-[#E9BD36] dark:group-hover:text-brand-dark transition-all duration-300 shadow-md">
                          <StepIcon className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="font-heading text-xl font-black text-brand-dark dark:text-white tracking-tight group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors">
                          {process.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                          {process.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Deliverables */}
                    <div className="pt-5 border-t border-brand-zinc-200/70 dark:border-white/10 space-y-3 mt-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-brand-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                          MILESTONE DELIVERABLES:
                        </span>
                        <span className="text-[9px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] uppercase tracking-wider">
                          STEP {idx + 1} OF 5
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {process.deliverables.map((del, dIdx) => (
                          <span
                            key={dIdx}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-white/5 border border-brand-zinc-200/80 dark:border-white/10 px-3 py-1 text-[8.5px] font-mono font-bold text-brand-zinc-700 dark:text-zinc-300 uppercase shadow-xs"
                          >
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

        {/* ── 7. INDUSTRIES WE SERVE SECTION (Ultra-Modern 8-Domain Interactive Spotlight Grid) ──────── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710] transition-colors duration-300">

          {/* Drifting Ambient Background Glow */}
          <div className="absolute top-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[#0306AC]/[0.03] dark:bg-[#0306AC]/0.05 blur-[150px] pointer-events-none -z-10 animate-float-blob" />
          <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-[#E9BD36]/[0.02] dark:bg-[#E9BD36]/0.04 blur-[150px] pointer-events-none -z-10 animate-float-blob-delayed" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 space-y-16">

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-left border-b border-brand-zinc-200/80 dark:border-white/10 pb-12">
              <div className="max-w-2xl space-y-4">
                <div className="eyebrow-pill">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                  </span>
                  DOMAIN EXPERTISE
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                  Empowering Ambitious Brands Across{" "}
                  <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">Key Industries.</span>
                </h2>
              </div>

              <div className="max-w-md space-y-3">
                <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                  Tailored Next.js web platforms, technical SEO strategies, and high-ROAS marketing funnels engineered specifically for domain customer journeys.
                </p>
              </div>
            </div>

            {/* 8-Domain Interactive Spotlight Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch text-left">
              {[
                {
                  id: "01",
                  icon: ShoppingCart,
                  title: "E-Commerce & DTC",
                  desc: "High-converting online store platforms with Shopify/Next.js integrations, frictionless checkout, and high-ROAS paid Meta ad campaigns.",
                  tags: ["Custom Checkouts", "High ROAS", "Shopify Engine"]
                },
                {
                  id: "02",
                  icon: Building2,
                  title: "Real Estate & Property",
                  desc: "Luxury property showcases, interactive listing search platforms, and high-intent lead generation funnels for brokers and developers.",
                  tags: ["Property Portals", "Lead Funnels", "3D Showcases"]
                },
                {
                  id: "03",
                  icon: Heart,
                  title: "Healthcare & Wellness",
                  desc: "Patient-first medical websites, HIPAA-compliant appointment booking systems, and local SEO campaigns that drive high patient inquiries.",
                  tags: ["HIPAA Booking", "Local SEO", "Patient Trust"]
                },
                {
                  id: "04",
                  icon: GraduationCap,
                  title: "Education & EdTech",
                  desc: "Interactive course platforms, student enrollment portals, and brand identity systems for modern academies and digital learning platforms.",
                  tags: ["EdTech Portals", "Enrollment", "LMS Integrations"]
                },
                {
                  id: "05",
                  icon: Coins,
                  title: "Finance & Fintech",
                  desc: "Bank-grade web platforms, investor relation portals, and trust-building visual identity systems for financial advisory firms.",
                  tags: ["Fintech UI", "Trust Design", "Investor Portals"]
                },
                {
                  id: "06",
                  icon: Database,
                  title: "SaaS & B2B Technology",
                  desc: "High-speed marketing platforms, developer documentation portals, and product demo funnels designed to increase SaaS MRR.",
                  tags: ["SaaS Landing", "MRR Scaling", "Doc Portals"]
                },
                {
                  id: "07",
                  icon: Utensils,
                  title: "Hospitality & Luxury",
                  desc: "Immersive culinary websites, hotel reservation engines, and digital brand experiences for premium restaurants and hospitality groups.",
                  tags: ["Reservation Engine", "Luxury UI", "Brand Experience"]
                },
                {
                  id: "08",
                  icon: Scale,
                  title: "Legal & Professional",
                  desc: "Authoritative law firm platforms, client consultation scheduling, and high-intent local search optimization that attracts high-value legal cases.",
                  tags: ["Law Firm UI", "Case Intake", "Authority SEO"]
                },
              ].map((domain, idx) => {
                const DomainIcon = domain.icon;

                return (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[32px] bg-zinc-50/90 dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6 group hover:border-[#0306AC]/60 dark:hover:border-[#E9BD36]/60 transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden will-change-transform transform-gpu"
                  >
                    {/* Background Glow */}
                    <div className="absolute top-[-20%] right-[-20%] w-28 h-28 rounded-full bg-[#0306AC]/10 dark:bg-[#E9BD36]/15 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                    <div className="space-y-5 relative z-10">
                      {/* Top Bar: Icon & ID */}
                      <div className="flex items-center justify-between">
                        <div className="h-12 w-12 rounded-2xl bg-[#0306AC]/10 dark:bg-white/10 border border-[#0306AC]/15 dark:border-white/15 flex items-center justify-center text-[#0306AC] dark:text-[#E9BD36] group-hover:scale-110 group-hover:bg-[#0306AC] group-hover:text-white dark:group-hover:bg-[#E9BD36] dark:group-hover:text-brand-dark transition-all duration-300 shadow-md">
                          <DomainIcon className="h-5 w-5" />
                        </div>

                        <span className="font-serif italic text-2xl font-black text-brand-zinc-300 dark:text-zinc-600 group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors">
                          {domain.id}
                        </span>
                      </div>

                      {/* Domain Title & Description */}
                      <div className="space-y-2">
                        <h3 className="font-heading text-lg sm:text-xl font-black text-brand-dark dark:text-white tracking-tight group-hover:text-[#0306AC] dark:group-hover:text-[#E9BD36] transition-colors">
                          {domain.title}
                        </h3>
                        <p className="text-xs text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                          {domain.desc}
                        </p>
                      </div>
                    </div>

                    {/* Specialty Tags */}
                    <div className="pt-4 border-t border-brand-zinc-200/70 dark:border-white/10 flex flex-wrap gap-1.5 relative z-10">
                      {domain.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-white/5 border border-brand-zinc-200/80 dark:border-white/10 px-2.5 py-0.5 text-[8.5px] font-mono font-bold text-brand-zinc-600 dark:text-zinc-300 uppercase shadow-xs"
                        >
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

        {/* ── 8. WHY BUSINESSES CHOOSE US SECTION (Pixel-Perfect Match to UI Design Screenshot) ─────────────────────── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710] transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 space-y-16">

            {/* Section Header */}
            <div className="text-center flex flex-col items-center max-w-3xl mx-auto space-y-4">
              <div className="eyebrow-pill">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                </span>
                WHY BUSINESSES CHOOSE US
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                Results. Reliability.{" "}
                <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">
                  Long-Term Partnerships.
                </span>
              </h2>

              <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto">
                We go beyond just delivering services — we build long-term partnerships that drive real growth and lasting impact for your business.
              </p>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* Left Column: Pixel-Perfect Blue Card with Team Photo & Outer Arc Detail */}
              <div className="lg:col-span-4 relative flex justify-center z-10">

                {/* Outer Curved Yellow Arc SVG Line & Yellow Dot Node */}
                <div className="absolute -top-6 -right-4 w-36 h-36 pointer-events-none z-20 hidden sm:block">
                  <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
                    <path
                      d="M 15,120 A 90,90 0 0,1 120,15"
                      fill="none"
                      stroke="#E9BD36"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="120" cy="15" r="6" fill="#E9BD36" />
                  </svg>
                </div>

                {/* Outer Dot Matrix Grid overlay behind right edge */}
                <div className="absolute -right-3 top-1/4 w-12 h-36 pointer-events-none hidden sm:block z-0 opacity-25">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 21 }).map((_, i) => (
                      <span key={i} className="h-1.5 w-1.5 rounded-full bg-brand-blue dark:bg-brand-yellow" />
                    ))}
                  </div>
                </div>



                {/* Main Blue Card Container */}
                <div className="relative w-full rounded-[36px] overflow-hidden bg-brand-blue border border-brand-blue shadow-2xl p-8 sm:p-9 flex flex-col justify-between min-h-[460px] lg:min-h-[520px] z-10">

                  {/* Top Text Block */}
                  <div className="max-w-[220px] space-y-1.5 z-10 text-left">
                    <div className="h-[2.5px] w-7 bg-brand-yellow mb-4" />
                    <p className="text-white text-sm sm:text-base font-semibold leading-snug tracking-tight">
                      We focus on what matters most —
                    </p>
                    <p className="text-brand-yellow text-lg sm:text-xl font-extrabold leading-none pt-1">
                      your growth.
                    </p>
                  </div>

                  {/* Team Photo Container flush at bottom */}
                  <div className="relative mt-8 -mx-8 sm:-mx-9 -mb-8 sm:-mb-9 rounded-b-[36px] overflow-hidden shadow-inner">
                    <img
                      src="/why_choose_us_team.png"
                      alt="Why Businesses Choose Us Team"
                      className="w-full h-64 sm:h-72 lg:h-80 object-cover object-center"
                    />
                  </div>

                </div>
              </div>

              {/* Right Column: 6 Feature Cards Grid */}
              <div className="lg:col-span-8 relative z-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">

                {/* Feature 1: Proven Results */}
                <div className="p-7 rounded-[24px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/70 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between min-h-[220px] group">
                  <div className="h-14 w-14 rounded-full bg-blue-50/80 dark:bg-white/5 flex items-center justify-center text-[#0306AC] dark:text-[#E9BD36] group-hover:scale-110 transition-transform">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="h-[2.5px] w-6 bg-[#0306AC] dark:bg-[#E9BD36] mb-3" />
                    <h3 className="font-heading font-extrabold text-base text-brand-dark dark:text-white tracking-tight mb-2">
                      Proven Results
                    </h3>
                    <p className="text-xs text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                      We deliver measurable outcomes that drive real growth for your business.
                    </p>
                  </div>
                </div>

                {/* Feature 2: Creative Excellence */}
                <div className="p-7 rounded-[24px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/70 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between min-h-[220px] group">
                  <div className="h-14 w-14 rounded-full bg-amber-50/80 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 dark:text-[#E9BD36] group-hover:scale-110 transition-transform">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="h-[2.5px] w-6 bg-[#0306AC] dark:bg-[#E9BD36] mb-3" />
                    <h3 className="font-heading font-extrabold text-base text-brand-dark dark:text-white tracking-tight mb-2">
                      Creative Excellence
                    </h3>
                    <p className="text-xs text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                      Unique designs & strategies that make your brand stand out in the market.
                    </p>
                  </div>
                </div>

                {/* Feature 3: Transparent Process */}
                <div className="p-7 rounded-[24px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/70 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between min-h-[220px] group">
                  <div className="h-14 w-14 rounded-full bg-blue-50/80 dark:bg-white/5 flex items-center justify-center text-[#0306AC] dark:text-[#E9BD36] group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="h-[2.5px] w-6 bg-[#0306AC] dark:bg-[#E9BD36] mb-3" />
                    <h3 className="font-heading font-extrabold text-base text-brand-dark dark:text-white tracking-tight mb-2">
                      Transparent Process
                    </h3>
                    <p className="text-xs text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                      Clear communication and full visibility at every stage of the project.
                    </p>
                  </div>
                </div>

                {/* Feature 4: On-Time Delivery */}
                <div className="p-7 rounded-[24px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/70 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between min-h-[220px] group">
                  <div className="h-14 w-14 rounded-full bg-amber-50/80 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 dark:text-[#E9BD36] group-hover:scale-110 transition-transform">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="h-[2.5px] w-6 bg-[#0306AC] dark:bg-[#E9BD36] mb-3" />
                    <h3 className="font-heading font-extrabold text-base text-brand-dark dark:text-white tracking-tight mb-2">
                      On-Time Delivery
                    </h3>
                    <p className="text-xs text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                      We respect deadlines and deliver on time, every time.
                    </p>
                  </div>
                </div>

                {/* Feature 5: Dedicated Support */}
                <div className="p-7 rounded-[24px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/70 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between min-h-[220px] group">
                  <div className="h-14 w-14 rounded-full bg-blue-50/80 dark:bg-white/5 flex items-center justify-center text-[#0306AC] dark:text-[#E9BD36] group-hover:scale-110 transition-transform">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="h-[2.5px] w-6 bg-[#0306AC] dark:bg-[#E9BD36] mb-3" />
                    <h3 className="font-heading font-extrabold text-base text-brand-dark dark:text-white tracking-tight mb-2">
                      Dedicated Support
                    </h3>
                    <p className="text-xs text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                      Our team is always here to support you, whenever you need us.
                    </p>
                  </div>
                </div>

                {/* Feature 6: Long-Term Partnership */}
                <div className="p-7 rounded-[24px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/70 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between min-h-[220px] group">
                  <div className="h-14 w-14 rounded-full bg-amber-50/80 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 dark:text-[#E9BD36] group-hover:scale-110 transition-transform">
                    <Handshake className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="h-[2.5px] w-6 bg-[#0306AC] dark:bg-[#E9BD36] mb-3" />
                    <h3 className="font-heading font-extrabold text-base text-brand-dark dark:text-white tracking-tight mb-2">
                      Long-Term Partnership
                    </h3>
                    <p className="text-xs text-brand-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">
                      We believe in building long-term relationships, not just one-off projects, for sustainable growth.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ── 9. ABOUT FOUNDER SECTION (Apple-Style Minimalist Executive Bio) ─────────────────────────────────── */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710] transition-colors duration-300">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

              {/* Left Column: Pure High-Res Executive Portrait Canvas */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative aspect-[4/5] w-full max-w-[440px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-brand-zinc-200/60 dark:border-white/10 relative group">
                  <img
                    src="/founder_portrait.png"
                    alt="Founder & Chief Digital Strategist"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Minimal Floating Name Label */}
                  <div className="absolute left-6 bottom-6 text-white text-left z-10 select-none">
                    <div className="font-heading font-extrabold text-xl tracking-tight leading-none text-white">
                      Mohsin
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest block mt-1">
                      // Founder & Chief Digital Strategist
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Pure Apple-Style Typography & Stats */}
              <div className="lg:col-span-7 space-y-8 text-left">

                <div className="space-y-4">
                  <div className="eyebrow-pill">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
                    </span>
                    EXECUTIVE LEADERSHIP
                  </div>

                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                    Driven by purpose.{" "}
                    <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">
                      Built for global impact.
                    </span>
                  </h2>
                </div>

                <div className="space-y-4 text-base sm:text-lg font-sans leading-relaxed text-brand-zinc-600 dark:text-zinc-300">
                  <p>
                    Over the past 7+ years, I've had the privilege of partnering with 300+ ambitious founders and global enterprises — transforming complex digital challenges into high-performing web engines.
                  </p>
                  <p>
                    We believe in strategic clarity, high-speed engineering, and conversion-focused design that predictably turns visitor engagement into real business revenue.
                  </p>
                </div>

                {/* Subtle Apple-Style Metric Line (No Heavy Cards) */}
                <div className="grid grid-cols-3 gap-8 border-t border-brand-zinc-200/80 dark:border-white/10 pt-8">
                  <div className="space-y-1 text-left">
                    <div className="font-serif italic text-4xl sm:text-5xl font-black text-[#0306AC] dark:text-[#E9BD36]">
                      7+
                    </div>
                    <span className="text-[10px] font-mono font-bold text-brand-dark dark:text-white uppercase tracking-wider block">
                      Years Experience
                    </span>
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="font-serif italic text-4xl sm:text-5xl font-black text-[#0306AC] dark:text-[#E9BD36]">
                      300+
                    </div>
                    <span className="text-[10px] font-mono font-bold text-brand-dark dark:text-white uppercase tracking-wider block">
                      Global Projects
                    </span>
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="font-serif italic text-4xl sm:text-5xl font-black text-[#0306AC] dark:text-[#E9BD36]">
                      99.8%
                    </div>
                    <span className="text-[10px] font-mono font-bold text-brand-dark dark:text-white uppercase tracking-wider block">
                      CSAT Score
                    </span>
                  </div>
                </div>




              </div>

            </div>

          </div>
        </section>

        {/* ── 10. CLIENT REVIEWS CAROUSEL SECTION ───────────────────────── */}
        <ReviewsCarousel />

        {/* Cursive Font Injector for 'Together' */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
          .font-cursive {
            font-family: 'Dancing Script', cursive;
          }
        `}} />

        {/* ── 11. BOTTOM CTA BANNER SECTION ──────────────────────────── */}
        <section className="relative overflow-hidden py-8 sm:py-12 bg-white dark:bg-[#080710] transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
            <div className="cta-banner-card">

              {/* Glowing Radial Background Lighting */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E9BD36]/15 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0306AC]/30 rounded-full blur-[120px] pointer-events-none" />

              {/* Radial Grid Dots */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Decorative Concentric Orbit Circles on Right */}
              <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none hidden lg:block select-none opacity-30">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#E9BD36]">
                  <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.4" />
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 2" />
                </svg>
              </div>

              {/* Halftone Dot Grid Accent */}
              <div className="absolute right-6 top-12 grid grid-cols-5 gap-2.5 opacity-20 hidden lg:grid">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
                ))}
              </div>

              {/* Left Column: Copy & Actions */}
              <div className="relative z-10 flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14 lg:max-w-[58%]">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-[10px] font-mono tracking-widest text-[#E9BD36] font-extrabold uppercase w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9BD36] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E9BD36]" />
                  </span>
                  READY TO GROW YOUR BUSINESS?
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.18] tracking-tight text-white">
                  Let's Build Something{" "}
                  <span className="whitespace-nowrap inline-block">
                    Amazing{" "}
                    <span className="relative inline-block">
                      <span className="font-cursive text-[#E9BD36] text-3xl sm:text-4xl lg:text-5xl font-normal pl-1">Together</span>
                      <svg className="absolute left-0 bottom-[-2px] w-full h-3 text-[#E9BD36]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M 5 6 C 30 9, 70 9, 95 4" />
                      </svg>
                    </span>
                  </span>
                </h2>

                <p className="text-sm sm:text-base font-sans text-white/90 font-normal leading-relaxed max-w-lg">
                  Have a project in mind? Let's discuss your ideas and turn them into powerful digital solutions that drive real results for your business.
                </p>

                <div className="flex items-center gap-4 flex-wrap pt-2">
                  <a
                    href="/#contact"
                    className="btn-primary-cta"
                  >
                    <span>GET STARTED TODAY</span>
                    <span className="btn-icon">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </a>

                  <button className="btn-secondary-cta">
                    <span>WATCH OUR STORY</span>
                    <span className="btn-icon">
                      <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column: Founder Portrait Image + Floating Card */}
              <div className="hidden lg:flex flex-1 items-end justify-center relative pr-8">

                {/* Glowing Circle Backdrop */}
                <div className="absolute bottom-0 w-[320px] h-[320px] bg-gradient-to-t from-[#020485] to-[#0408d9] rounded-full opacity-90 border border-white/20 shadow-2xl" />

                {/* Founder Image Frame */}
                <div className="relative z-10 w-[280px] h-[370px] self-end drop-shadow-2xl overflow-hidden rounded-t-[32px] border-t border-l border-r border-white/25 shadow-2xl">
                  <Image
                    src="/founder_portrait.png"
                    alt="Founder & Chief Digital Strategist"
                    width={320}
                    height={420}
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010356]/80 via-transparent to-transparent pointer-events-none" />
                </div>



                {/* Accent Glowing Yellow Dot */}
                <div className="absolute top-16 right-28 h-3.5 w-3.5 rounded-full bg-[#E9BD36] shadow-[0_0_15px_#E9BD36] z-20" />
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}

/* ── Inline Reviews Showcase Component (Awwwards Spotlight Showcase) ─────────────────────────────────── */
const REVIEWS = [
  {
    quote: "360 Designs Agency transformed our product architecture and brand presence into an award-winning Next.js engine. Their engineering velocity, strategic clarity, and ongoing support are unmatched.",
    name: "John Carter",
    role: "CEO & Co-Founder",
    company: "TechNova Inc. (USA)",
    initial: "J",
    accent: "#0306AC",
    impact: "+140% ORGANIC LEAD CONVERSION",
    tag: "SAAS & ENTERPRISE",
  },
  {
    quote: "The team delivered far beyond our highest expectations. Our organic traffic and leads jumped by 240% within the first 60 days following launch. Truly a world-class digital partner.",
    name: "Sarah Mitchell",
    role: "Chief Marketing Officer",
    company: "BrightWave Global (UK)",
    initial: "S",
    accent: "#E9BD36",
    impact: "4.8X ORGANIC ROAS LIFT",
    tag: "FINTECH & WEALTH",
  },
  {
    quote: "Professional, hyper-responsive, and relentlessly focused on conversion ROI. 360 Designs Agency is our long-term strategic growth engine and primary technical partner.",
    name: "David Thompson",
    role: "Founder & Managing Director",
    company: "Nexus Solutions (UAE)",
    initial: "D",
    accent: "#0306AC",
    impact: "99.8% CSAT & ZERO DOWNTIME",
    tag: "E-COMMERCE & RETAIL",
  },
  {
    quote: "Absolutely exceptional craftsmanship. They understood our brand vision immediately and delivered a flawless web platform ahead of schedule with zero post-launch bugs.",
    name: "Emily Rodriguez",
    role: "Chief Operating Officer",
    company: "BrightPath Tech (Germany)",
    initial: "E",
    accent: "#E9BD36",
    impact: "100/100 LIGHTHOUSE PERFORMANCE",
    tag: "HEALTHCARE & BIO",
  },
  {
    quote: "From complex UX architecture to high-converting funnels — they executed with military precision. Our conversion rate increased by 42% in month one alone.",
    name: "Marcus Liu",
    role: "Head of Growth",
    company: "Apex Digital Capital (Singapore)",
    initial: "M",
    accent: "#0306AC",
    impact: "+42% MONTH-1 CRO LIFT",
    tag: "VENTURE CAPITAL",
  },
];

function ReviewsCarousel() {
  const marqueeTrack1 = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];
  const marqueeTrack2 = [...REVIEWS.slice().reverse(), ...REVIEWS.slice().reverse(), ...REVIEWS.slice().reverse(), ...REVIEWS.slice().reverse()];

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-4 sm:pb-6 border-b border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#080710] transition-colors duration-300">

      {/* Inline Keyframes for Smooth Hardware-Accelerated Marquee with Hover Pause */}
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

      {/* Background Lighting Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0306AC]/[0.035] dark:bg-[#0306AC]/0.06 blur-[180px] pointer-events-none -z-10 animate-float-blob" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#E9BD36]/[0.025] dark:bg-[#E9BD36]/0.05 blur-[180px] pointer-events-none -z-10 animate-float-blob-delayed" />

      {/* Edge Fading Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-white dark:from-[#080710] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-white dark:from-[#080710] to-transparent z-20 pointer-events-none" />

      <div className="relative z-10 space-y-12">

        {/* Section Header */}
        <div className="text-center flex flex-col items-center space-y-5 max-w-3xl mx-auto px-4">

          {/* Eyebrow Pill */}
          <div className="eyebrow-pill">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0306AC] dark:bg-[#E9BD36] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0306AC] dark:bg-[#E9BD36]" />
            </span>
            CLIENT ENDORSEMENTS & REVIEWS
          </div>

          {/* Main Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15] max-w-2xl">
            Loved by Founders.{" "}
            <span className="text-[#0306AC] dark:text-[#E9BD36] font-serif font-normal italic">
              Trusted by Growth Leaders.
            </span>
          </h2>

          {/* Descriptive Narrative Subtitle Paragraph */}
          <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 max-w-2xl font-normal leading-relaxed">
            Real, unedited feedback from tech founders, enterprise leaders, and VC partners who partnered with our design agency to build world-class digital products.
          </p>

          {/* Trust Rating Bar Badge */}
          <div className="pt-1 inline-flex items-center gap-3 sm:gap-4 rounded-full bg-zinc-100/80 dark:bg-white/5 border border-brand-zinc-200 dark:border-white/10 px-5 py-2 text-xs font-mono backdrop-blur-md shadow-xs">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-brand-dark dark:text-white">4.9 / 5.0 Rating</span>
            <span className="text-zinc-300 dark:text-white/20">|</span>
            <span className="text-brand-zinc-600 dark:text-zinc-300 font-medium">300+ Verified Case Studies</span>
          </div>
        </div>

        {/* Dual-Track Marquee Container (Wrapper with Hover Pause & Spacious Vertical Padding to Prevent Shadow Clipping) */}
        <div className="marquee-wrapper space-y-8 overflow-hidden py-8">

          {/* Track 1: Moving Left */}
          <div className="flex py-4 overflow-visible">
            <div className="marquee-track-left gap-6 items-stretch py-2">
              {marqueeTrack1.map((r, i) => (
                <div
                  key={`t1-${i}`}
                  className="w-[360px] sm:w-[420px] shrink-0 p-7 sm:p-8 rounded-[32px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/90 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col justify-between hover:border-[#0306AC] dark:hover:border-[#E9BD36] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] group select-none cursor-pointer my-1"
                >
                  {/* Top Ambient Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0306AC] via-[#808080] to-[#E9BD36] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Glowing Ambient Light Orb */}
                  <div
                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-500"
                    style={{ backgroundColor: r.accent }}
                  />

                  {/* Top Ambient Watermark Quote Mark */}
                  <span className="absolute top-4 right-6 text-7xl font-serif leading-none text-brand-zinc-200/40 dark:text-white/5 select-none pointer-events-none">
                    “
                  </span>

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

                    {/* Impact Metric Bar inside Card */}
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 text-[9.5px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{r.impact}</span>
                    </div>
                  </div>

                  {/* Profile Author Footer */}
                  <div className="pt-5 border-t border-brand-zinc-200/80 dark:border-white/10 mt-6 relative z-10">
                    <div className="flex items-center gap-3.5 text-left">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center font-heading font-black text-xs shadow-md shrink-0 border border-white/20"
                        style={{
                          backgroundColor: r.accent === "#E9BD36" ? "#E9BD36" : "#0306AC",
                          color: r.accent === "#E9BD36" ? "#080710" : "#ffffff",
                        }}
                      >
                        {r.initial}
                      </div>
                      <div>
                        <span className="block text-xs font-heading font-black text-brand-dark dark:text-white uppercase tracking-wider leading-none">
                          {r.name}
                        </span>
                        <span className="block text-[9.5px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] mt-1 leading-none">
                          {r.role}
                        </span>
                        <span className="block text-[8.5px] font-sans text-brand-zinc-400 dark:text-zinc-400 mt-0.5 leading-none">
                          {r.company}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Track 2: Moving Right */}
          <div className="flex py-4 overflow-visible">
            <div className="marquee-track-right gap-6 items-stretch py-2">
              {marqueeTrack2.map((r, i) => (
                <div
                  key={`t2-${i}`}
                  className="w-[360px] sm:w-[420px] shrink-0 p-7 sm:p-8 rounded-[32px] bg-white dark:bg-[#0c0b18] border border-brand-zinc-200/90 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col justify-between hover:border-[#0306AC] dark:hover:border-[#E9BD36] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] group select-none cursor-pointer my-1"
                >
                  {/* Top Ambient Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E9BD36] via-[#808080] to-[#0306AC] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Glowing Ambient Light Orb */}
                  <div
                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-500"
                    style={{ backgroundColor: r.accent }}
                  />

                  {/* Top Ambient Watermark Quote Mark */}
                  <span className="absolute top-4 right-6 text-7xl font-serif leading-none text-brand-zinc-200/40 dark:text-white/5 select-none pointer-events-none">
                    “
                  </span>

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

                    {/* Impact Metric Bar inside Card */}
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 text-[9.5px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{r.impact}</span>
                    </div>
                  </div>

                  {/* Profile Author Footer */}
                  <div className="pt-5 border-t border-brand-zinc-200/80 dark:border-white/10 mt-6 relative z-10">
                    <div className="flex items-center gap-3.5 text-left">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center font-heading font-black text-xs shadow-md shrink-0 border border-white/20"
                        style={{
                          backgroundColor: r.accent === "#E9BD36" ? "#E9BD36" : "#0306AC",
                          color: r.accent === "#E9BD36" ? "#080710" : "#ffffff",
                        }}
                      >
                        {r.initial}
                      </div>
                      <div>
                        <span className="block text-xs font-heading font-black text-brand-dark dark:text-white uppercase tracking-wider leading-none">
                          {r.name}
                        </span>
                        <span className="block text-[9.5px] font-mono font-bold text-[#0306AC] dark:text-[#E9BD36] mt-1 leading-none">
                          {r.role}
                        </span>
                        <span className="block text-[8.5px] font-sans text-brand-zinc-400 dark:text-zinc-400 mt-0.5 leading-none">
                          {r.company}
                        </span>
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

