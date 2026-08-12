"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Sparkles, Terminal, TrendingUp, Zap, HeartHandshake } from "lucide-react";
import content from "@/data/content.json";

// ── Animated Circular Stat ────────────────────────────────────
const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function AnimatedStat({
  value,
  label,
  sublabel,
  percentage, // 0–1, how much of the ring to fill
}: {
  value: string;
  label: string;
  sublabel: string;
  percentage: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [displayed, setDisplayed] = useState(value.replace(/[0-9.]/g, "0"));
  const [dotProgress, setDotProgress] = useState(0);

  useEffect(() => {
    if (isInView) {
      const isFloat = value.includes(".");
      const isPercent = value.includes("%");
      const suffix = isPercent ? "%" : value.replace(/[0-9.]/g, "");
      const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
      const DURATION = 1400;
      const DELAY = 150;
      const startTime = performance.now() + DELAY;
      let rafId: number;
      
      const tick = (now: number) => {
        const elapsed = Math.max(0, now - startTime);
        const raw = Math.min(elapsed / DURATION, 1);
        const eased = 1 - Math.pow(1 - raw, 4); // easeOutQuart for premium smoothness
        
        setDisplayed((isFloat ? (eased * numeric).toFixed(1) : Math.round(eased * numeric).toString()) + suffix);
        setDotProgress(eased * percentage);
        
        if (raw < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDotProgress(percentage);
        }
      };
      
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    } else {
      setDisplayed(value.replace(/[0-9.]/g, "0"));
      setDotProgress(0);
    }
  }, [isInView, percentage, value]);

  // Dot travels along arc tip — uses live dotProgress (0 → percentage)
  // SVG is CSS-rotated -90°: angle 0 in SVG = 3 o'clock = visual 12 o'clock
  const dotAngle = 2 * Math.PI * dotProgress;
  const dotX = 41 + RADIUS * Math.cos(dotAngle);
  const dotY = 41 + RADIUS * Math.sin(dotAngle);
  
  // Create a unique gradient ID per stat to avoid collisions
  const gradientId = `ringGradient-${label.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      {/* Ring */}
      <div className="relative w-[80px] h-[80px] sm:w-[96px] sm:h-[96px]">
        {/* Glow behind ring */}
        <div className="absolute inset-0 rounded-full bg-brand-blue/8 dark:bg-brand-yellow/5 blur-md" />
        <svg viewBox="0 0 82 82" className="relative w-full h-full -rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--svg-gradient-stop-1)" />
              <stop offset="100%" stopColor="var(--svg-gradient-stop-2)" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx="41" cy="41" r={RADIUS}
            fill="none"
            stroke="var(--svg-track-stroke)"
            strokeWidth="5"
          />
          {/* Animated fill */}
          <circle
            cx="41" cy="41" r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - dotProgress)}
          />
          {/* Yellow dot — always visible, moves with arc every frame */}
          <circle
            cx={dotX} cy={dotY} r="4.5"
            fill="#E9BD36"
            stroke="white"
            strokeWidth="1.5"
            style={{ filter: "var(--svg-dot-shadow)" }}
          />
        </svg>
        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading font-black text-[15px] sm:text-[18px] text-brand-dark dark:text-white leading-none">
            {displayed}
          </span>
        </div>
      </div>
      {/* Labels */}
      <div className="text-center">
        <p className="text-[9px] font-black uppercase tracking-widest text-brand-dark dark:text-white">{label}</p>
        <p className="text-[8.5px] text-brand-zinc-400 dark:text-zinc-400 mt-0.5 leading-snug whitespace-pre-line">{sublabel}</p>
      </div>
    </div>
  );
}

// ── Illustrations ─────────────────────────────────────────────
const getIllustrations = (ill: any) => [
  // 01 — Design grid
  <svg key="1" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="8" y="10" width="62" height="80" rx="8" fill="var(--color-blue)" fillOpacity="0.07" stroke="var(--color-blue)" strokeWidth="1" strokeOpacity="0.2" />
    <rect x="16" y="20" width="46" height="7" rx="3.5" fill="var(--color-blue)" fillOpacity="0.18" />
    <rect x="16" y="33" width="30" height="5" rx="2.5" fill="var(--color-blue)" fillOpacity="0.1" />
    <rect x="16" y="43" width="40" height="5" rx="2.5" fill="var(--color-blue)" fillOpacity="0.1" />
    <rect x="16" y="53" width="26" height="5" rx="2.5" fill="var(--color-blue)" fillOpacity="0.08" />
    <circle cx="16" cy="73" r="6" fill="var(--color-blue)" />
    <circle cx="28" cy="73" r="6" fill="var(--color-yellow)" />
    <circle cx="40" cy="73" r="6" fill="var(--color-dark)" />
    <circle cx="52" cy="73" r="6" fill="var(--color-border)" />
    <rect x="84" y="8" width="68" height="42" rx="8" fill="var(--color-blue)" fillOpacity="0.07" stroke="var(--color-blue)" strokeWidth="1" strokeOpacity="0.18" />
    <circle cx="102" cy="28" r="10" fill="var(--color-blue)" fillOpacity="0.15" />
    <circle cx="102" cy="28" r="6" fill="var(--color-blue)" fillOpacity="0.35" />
    <rect x="118" y="21" width="26" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.2" />
    <rect x="118" y="30" width="18" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.1" />
    <rect x="84" y="58" width="68" height="36" rx="8" fill="var(--color-yellow)" fillOpacity="0.18" stroke="var(--color-yellow)" strokeWidth="1" strokeOpacity="0.45" />
    <rect x="94" y="68" width="48" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.2" />
    <rect x="94" y="77" width="34" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.12" />
    <circle cx="148" cy="10" r="7" fill="var(--color-yellow)" />
    <path d="M148 6 L149 8.5 L152 8.5 L149.8 10.1 L150.7 12.8 L148 11.2 L145.3 12.8 L146.2 10.1 L144 8.5 L147 8.5 Z" fill="var(--color-dark)" />
  </svg>,

  // 02 — Terminal / code
  <svg key="2" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="8" y="8" width="144" height="84" rx="9" fill="var(--color-blue)" fillOpacity="0.06" stroke="var(--color-blue)" strokeWidth="1" strokeOpacity="0.18" />
    <rect x="8" y="8" width="144" height="18" rx="9" fill="var(--color-blue)" fillOpacity="0.08" />
    <circle cx="22" cy="17" r="3.5" fill="var(--color-blue)" fillOpacity="0.35" />
    <circle cx="33" cy="17" r="3.5" fill="var(--color-blue)" fillOpacity="0.2" />
    <circle cx="44" cy="17" r="3.5" fill="var(--color-blue)" fillOpacity="0.1" />
    <rect x="18" y="34" width="20" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.5" />
    <rect x="44" y="34" width="48" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.2" />
    <rect x="98" y="34" width="24" height="4" rx="2" fill="var(--color-yellow)" fillOpacity="0.7" />
    <rect x="26" y="44" width="64" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.14" />
    <rect x="96" y="44" width="40" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.09" />
    <rect x="18" y="54" width="32" height="4" rx="2" fill="var(--color-yellow)" fillOpacity="0.5" />
    <rect x="56" y="54" width="72" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.1" />
    <rect x="26" y="64" width="48" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.18" />
    <rect x="80" y="64" width="32" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.1" />
    <rect x="18" y="74" width="4" height="7" rx="1" fill="var(--color-blue)" fillOpacity="0.55" />
    <circle cx="138" cy="72" r="14" fill="var(--color-blue)" fillOpacity="0.07" stroke="var(--color-blue)" strokeWidth="1" strokeOpacity="0.18" />
    <text x="138" y="77" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--color-blue)" fillOpacity="0.55" fontFamily="sans-serif">{ill.scoreLabel}</text>
  </svg>,

  // 03 — Chart / conversion
  <svg key="3" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="8" y1="92" x2="152" y2="92" stroke="var(--color-blue)" strokeWidth="1" strokeOpacity="0.12" />
    <rect x="16" y="68" width="16" height="24" rx="3" fill="var(--color-blue)" fillOpacity="0.12" />
    <rect x="38" y="52" width="16" height="40" rx="3" fill="var(--color-blue)" fillOpacity="0.2" />
    <rect x="60" y="38" width="16" height="54" rx="3" fill="var(--color-blue)" fillOpacity="0.32" />
    <rect x="82" y="24" width="16" height="68" rx="3" fill="var(--color-blue)" fillOpacity="0.45" />
    <rect x="104" y="12" width="16" height="80" rx="3" fill="var(--color-blue)" fillOpacity="0.62" />
    <polyline points="24,66 46,50 68,36 90,22 112,10" stroke="var(--color-yellow)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="24" cy="66" r="3.5" fill="var(--color-yellow)" />
    <circle cx="46" cy="50" r="3.5" fill="var(--color-yellow)" />
    <circle cx="68" cy="36" r="3.5" fill="var(--color-yellow)" />
    <circle cx="90" cy="22" r="3.5" fill="var(--color-yellow)" />
    <circle cx="112" cy="10" r="5" fill="var(--color-blue)" stroke="var(--color-yellow)" strokeWidth="2" />
    <rect x="130" y="30" width="26" height="12" rx="6" fill="var(--color-blue)" fillOpacity="0.8" />
    <rect x="130" y="50" width="26" height="12" rx="6" fill="var(--color-yellow)" fillOpacity="0.65" />
  </svg>,

  // 04 — Chat bubbles
  <svg key="4" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="8" y="8" width="88" height="34" rx="10" fill="var(--color-blue)" fillOpacity="0.09" stroke="var(--color-blue)" strokeWidth="1" strokeOpacity="0.18" />
    <path d="M18 42 L14 50 L24 42" fill="var(--color-blue)" fillOpacity="0.09" />
    <rect x="16" y="18" width="64" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.3" />
    <rect x="16" y="27" width="44" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.14" />
    <rect x="64" y="52" width="88" height="34" rx="10" fill="var(--color-yellow)" fillOpacity="0.22" stroke="var(--color-yellow)" strokeOpacity="0.55" strokeWidth="1" />
    <path d="M134 52 L138 44 L126 52" fill="var(--color-yellow)" fillOpacity="0.22" />
    <rect x="72" y="62" width="64" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.22" />
    <rect x="72" y="71" width="48" height="4" rx="2" fill="var(--color-blue)" fillOpacity="0.14" />
    <circle cx="146" cy="28" r="13" fill="var(--color-blue)" fillOpacity="0.07" stroke="var(--color-blue)" strokeWidth="1" strokeOpacity="0.18" />
    <path d="M139 32 L145 22 L146 28 L153 24" stroke="var(--color-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.45" fill="none" />
    <circle cx="146" cy="28" r="2.5" fill="var(--color-yellow)" />
  </svg>,

  // 05 — People / support
  <svg key="5" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="42" cy="30" r="18" fill="var(--color-blue)" fillOpacity="0.07" stroke="var(--color-blue)" strokeWidth="1" strokeOpacity="0.18" />
    <circle cx="42" cy="24" r="8" fill="var(--color-blue)" fillOpacity="0.28" />
    <path d="M25 46 Q42 40 59 46" stroke="var(--color-blue)" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.3" fill="none" />
    <circle cx="118" cy="30" r="18" fill="var(--color-yellow)" fillOpacity="0.18" stroke="var(--color-yellow)" strokeOpacity="0.45" strokeWidth="1" />
    <circle cx="118" cy="24" r="8" fill="var(--color-blue)" fillOpacity="0.18" />
    <path d="M101 46 Q118 40 135 46" stroke="var(--color-blue)" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.22" fill="none" />
    <line x1="61" y1="30" x2="99" y2="30" stroke="var(--color-blue)" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.25" />
    <circle cx="80" cy="30" r="10" fill="var(--color-blue)" fillOpacity="0.1" stroke="var(--color-blue)" strokeWidth="1" strokeOpacity="0.18" />
    <path d="M75 30 Q78 26 80 28 Q82 26 85 30 Q82 34 80 32 Q78 34 75 30 Z" fill="var(--color-blue)" fillOpacity="0.45" />
    <circle cx="42" cy="74" r="4" fill="var(--color-yellow)" />
    <circle cx="55" cy="74" r="4" fill="var(--color-yellow)" />
    <circle cx="68" cy="74" r="4" fill="var(--color-yellow)" />
    <circle cx="81" cy="74" r="4" fill="var(--color-yellow)" />
    <circle cx="94" cy="74" r="4" fill="var(--color-yellow)" fillOpacity="0.35" />
    <text x="80" y="92" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="var(--color-blue)" fillOpacity="0.4" fontFamily="sans-serif" letterSpacing="1">{ill.ratingLabel}</text>
  </svg>,
];

const iconMap: Record<string, any> = {
  Sparkles,
  Terminal,
  TrendingUp,
  Zap,
  HeartHandshake
};

const drawVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.7, delay: 0.3, ease: "easeOut" as const },
  },
};

export default function WhyChooseMe({ data }: { data?: any }) {
  const whyChooseMe: typeof content.whyChooseMe = data ? { ...content.whyChooseMe, ...data } : content.whyChooseMe;

  const reasons = whyChooseMe.reasons.map((r: any) => ({
    ...r,
    icon: iconMap[r.iconName] || Sparkles
  }));

  const illustrations = getIllustrations(whyChooseMe.illustrations);

  return (
    <section
      id="why-us"
      className="relative bg-[#F8FAFC] dark:bg-[#0a0a14] border-t border-brand-zinc-200 dark:border-white/10 py-24 md:py-32"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0306AC 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-0">

          {/* ── LEFT STICKY ─────────────────────────────────── */}
          <div className="lg:w-[42%] lg:shrink-0 lg:sticky lg:top-28 flex flex-col justify-start lg:pr-16 lg:border-r border-brand-zinc-200 dark:border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-7"
            >
              {/* Pill */}
              <div className="eyebrow-pill">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue dark:bg-brand-yellow opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue dark:bg-brand-yellow" />
                </span>
                {whyChooseMe.sectionTag}
              </div>

              {/* Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white leading-[1.15] tracking-tight">
                {whyChooseMe.titleIntro}{" "}
                <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">
                  {whyChooseMe.titleHighlight}
                </span>
              </h2>

              {/* Subtext */}
              <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-sm">
                {whyChooseMe.subtext}
              </p>

              {/* Circular stats */}
              <div className="flex items-center justify-between gap-4 pt-6 w-full">
                <AnimatedStat
                  value={whyChooseMe.stats[0].value}
                  label={whyChooseMe.stats[0].label}
                  sublabel={whyChooseMe.stats[0].sublabel}
                  percentage={whyChooseMe.stats[0].percentage}
                />
                <div className="w-px h-16 bg-brand-zinc-200 dark:bg-white/10 self-center hidden sm:block" />
                <AnimatedStat
                  value={whyChooseMe.stats[1].value}
                  label={whyChooseMe.stats[1].label}
                  sublabel={whyChooseMe.stats[1].sublabel}
                  percentage={whyChooseMe.stats[1].percentage}
                />
                <div className="w-px h-16 bg-brand-zinc-200 dark:bg-white/10 self-center hidden sm:block" />
                <AnimatedStat
                  value={whyChooseMe.stats[2].value}
                  label={whyChooseMe.stats[2].label}
                  sublabel={whyChooseMe.stats[2].sublabel}
                  percentage={whyChooseMe.stats[2].percentage}
                />
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT SCROLLING ──────────────────────────────── */}
          <div className="lg:flex-1 lg:pl-14 flex flex-col">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    delay: index * 0.04,
                  }}
                  className="group border-b border-brand-zinc-200 dark:border-white/10 last:border-b-0 py-8"
                >
                  {/* Row: icon+text LEFT, illustration RIGHT */}
                  <div className="flex items-center gap-6">

                    {/* LEFT: Icon + text */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Icon */}
                      <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl
                        bg-brand-blue/8 border border-brand-blue/15 text-brand-blue dark:text-brand-yellow dark:bg-brand-yellow/10 dark:border-brand-yellow/20
                        group-hover:bg-brand-blue group-hover:text-white dark:group-hover:bg-brand-yellow dark:group-hover:text-[#080710] group-hover:border-brand-blue dark:group-hover:border-brand-yellow
                        group-hover:shadow-[0_6px_20px_rgba(3,6,172,0.22)] dark:group-hover:shadow-[0_6px_20px_rgba(233,189,54,0.18)]
                        transition-all duration-300 mt-0.5">
                        <Icon className="h-[18px] w-[18px]" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <span className="font-mono text-[10px] font-black text-brand-blue dark:text-brand-yellow tracking-widest">
                          {reason.num}
                        </span>
                        <h3 className="font-heading font-extrabold text-[1.1rem] text-brand-dark dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors duration-300 leading-snug">
                          {reason.title}
                        </h3>
                        <p className="text-[13px] text-brand-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {reason.desc}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT: Illustration — fixed size, won't overlap */}
                    <div className="hidden md:block shrink-0 w-[140px] h-[88px] rounded-2xl border border-brand-blue/10 bg-gradient-to-br from-brand-blue/4 to-transparent overflow-hidden
                      group-hover:border-brand-blue/20 group-hover:from-brand-blue/7
                      transition-all duration-400">
                      <div className="w-full h-full p-2 group-hover:scale-[1.03] transition-transform duration-400 origin-center">
                        {illustrations[index]}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
