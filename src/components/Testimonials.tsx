"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useRef } from "react";
import content from "@/data/content.json";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { testimonials: testimonialsData } = content;
  const testimonials = testimonialsData.list;

  // Scroll tracking for parallax offset
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Soft physics-based spring smoothing to ease scroll translation jumps
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  });

  // Calculate horizontal parallax offsets (Row 1 & 3 shift right, Row 2 shifts left)
  const xRow1 = useTransform(smoothScrollProgress, [0, 1], [-80, 80]);
  const xRow2 = useTransform(smoothScrollProgress, [0, 1], [80, -80]);
  const xRow3 = useTransform(smoothScrollProgress, [0, 1], [-60, 60]);

  // Background floating parallax decorations
  const yBgLeft = useTransform(smoothScrollProgress, [0, 1], [-40, 40]);
  const yBgRight = useTransform(smoothScrollProgress, [0, 1], [40, -40]);

  // Separate testimonials by rows
  const row1 = testimonials.filter((t) => t.column === 1);
  const row2 = testimonials.filter((t) => t.column === 2);
  const row3 = testimonials.filter((t) => t.column === 3);

  // Helper to repeat array for seamless looping marquee
  const tripleArray = <T,>(arr: T[]): T[] => [...arr, ...arr, ...arr];

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0a0a14] py-24 md:py-32 border-t border-b border-brand-zinc-200 dark:border-white/10"
    >
      {/* Styles for horizontal marquee animations & hover pause */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-row-left {
          animation: marquee-left 42s linear infinite;
          will-change: transform;
        }
        .marquee-row-right {
          animation: marquee-right 42s linear infinite;
          will-change: transform;
        }
        .marquee-container:hover .marquee-row-left,
        .marquee-container:hover .marquee-row-right {
          animation-play-state: paused;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Premium hover card glass swipe effect */
        .card-sweep-glare {
          position: relative;
        }
        .card-sweep-glare::before {
          content: '';
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.28) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          transition: left 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 20;
        }
        .group:hover.card-sweep-glare::before {
          left: 160%;
        }
        .dark .card-sweep-glare::before {
          display: none;
        }
      `}</style>

      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none z-0" />

      {/* Crossing structural grid lines */}
      <div className="absolute inset-x-0 top-12 h-[1px] bg-brand-blue/[0.03] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-12 h-[1px] bg-brand-blue/[0.03] pointer-events-none" />
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-brand-blue/[0.03] pointer-events-none" />
      <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-brand-blue/[0.03] pointer-events-none" />

      <div className="w-full relative z-10">

        {/* Header Section & Scorecard (Side by Side) */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="eyebrow-pill self-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue dark:bg-brand-yellow opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue dark:bg-brand-yellow" />
              </span>
              {testimonialsData.sectionTag}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
              {testimonialsData.titleIntro}{" "}
              <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">
                {testimonialsData.titleHighlight}
              </span>
            </h2>
            <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-2xl">
              {testimonialsData.description}
            </p>
          </div>

          {/* Premium Scorecard Widget */}
          <div className="bg-white dark:bg-[#12121e] border border-brand-zinc-200/80 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_8px_24px_rgba(3, 6, 172,0.02)] relative overflow-hidden group/scorecard shrink-0 min-w-[260px] md:max-w-sm">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-blue to-brand-blue/40" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex flex-col items-center justify-center h-14 w-14 rounded-xl bg-brand-blue text-white shadow-sm border border-brand-blue/10">
                <span className="font-heading font-black text-lg leading-none">{testimonialsData.scorecardRating}</span>
                <span className="font-mono text-[6px] font-bold uppercase tracking-widest text-white/80 mt-1">{testimonialsData.scorecardRatingLabel}</span>
              </div>
              <div className="space-y-1">
                <div className="flex gap-0.5 text-[#E9BD36]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#E9BD36] text-[#E9BD36]" />
                  ))}
                </div>
                <span className="block text-[10px] font-black text-brand-dark dark:text-white uppercase tracking-wider leading-none">
                  {testimonialsData.scorecardTitle}
                </span>
                <span className="block text-[8px] font-bold text-brand-zinc-400 dark:text-zinc-300 uppercase tracking-widest">
                  {testimonialsData.scorecardSub}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-brand-blue/5 blur-xl group-hover/scorecard:scale-150 transition-transform duration-500" />
          </div>
        </div>

        {/* 3-Row Horizontal Scrolling Marquee Area */}
        <div className="relative w-full space-y-6 overflow-hidden py-4">
          {/* Left/Right edge gradients to fade text at viewport boundaries */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FAFC] dark:from-[#0a0a14] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8FAFC] dark:from-[#0a0a14] to-transparent z-20 pointer-events-none" />

          {/* Row 1: Leftward moving cards */}
          <div className="marquee-container flex overflow-x-auto scrollbar-none py-1">
            <motion.div
              style={{ x: xRow1 }}
              className="marquee-row-left flex gap-6 shrink-0"
            >
              {tripleArray(row1).map((item, idx) => (
                <div
                  key={idx}
                  className="group w-[320px] sm:w-[350px] shrink-0 bg-white dark:bg-[#12121e] border border-brand-zinc-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-brand-blue/20 dark:hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between h-[180px] sm:h-[190px] card-sweep-glare"
                >
                  <div className="space-y-3">
                    <div className="flex gap-0.5 text-[#E9BD36]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#E9BD36] text-[#E9BD36]" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-brand-dark leading-relaxed line-clamp-3">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-brand-zinc-100 pt-4 mt-3">
                    <div className={`relative h-9 w-9 rounded-full ${item.avatarBg} flex items-center justify-center text-white font-heading font-black text-xs border border-white/20 shadow-sm`}>
                      {item.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-black text-brand-dark dark:text-white leading-none">{item.name}</span>
                      <span className="block text-[9px] font-bold text-brand-zinc-400 uppercase tracking-widest mt-1">
                        {item.role} <span className="opacity-40 mx-0.5">·</span> <span className="text-brand-blue dark:text-brand-yellow font-black">{item.company}</span>
                      </span>
                    </div>
                    <Quote className="h-5 w-5 ml-auto text-brand-blue/10" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Rightward moving cards */}
          <div className="marquee-container flex overflow-x-auto scrollbar-none py-1">
            <motion.div
              style={{ x: xRow2 }}
              className="marquee-row-right flex gap-6 shrink-0"
            >
              {tripleArray(row2).map((item, idx) => (
                <div
                  key={idx}
                  className="group w-[320px] sm:w-[350px] shrink-0 bg-white dark:bg-[#12121e] border border-brand-zinc-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-brand-blue/20 dark:hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between h-[180px] sm:h-[190px] card-sweep-glare"
                >
                  <div className="space-y-3">
                    <div className="flex gap-0.5 text-[#E9BD36]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#E9BD36] text-[#E9BD36]" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-brand-dark dark:text-zinc-300 leading-relaxed line-clamp-3">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-brand-zinc-100 pt-4 mt-3">
                    <div className={`relative h-9 w-9 rounded-full ${item.avatarBg} flex items-center justify-center text-white font-heading font-black text-xs border border-white/20 shadow-sm`}>
                      {item.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-black text-brand-dark dark:text-white leading-none">{item.name}</span>
                      <span className="block text-[9px] font-bold text-brand-zinc-400 uppercase tracking-widest mt-1">
                        {item.role} <span className="opacity-40 mx-0.5">·</span> <span className="text-brand-blue dark:text-brand-yellow font-black">{item.company}</span>
                      </span>
                    </div>
                    <Quote className="h-5 w-5 ml-auto text-brand-blue/10" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 3: Leftward moving cards */}
          <div className="marquee-container flex overflow-x-auto scrollbar-none py-1">
            <motion.div
              style={{ x: xRow3 }}
              className="marquee-row-left flex gap-6 shrink-0"
            >
              {tripleArray(row3).map((item, idx) => (
                <div
                  key={idx}
                  className="group w-[320px] sm:w-[350px] shrink-0 bg-white dark:bg-[#12121e] border border-brand-zinc-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-brand-blue/20 dark:hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between h-[180px] sm:h-[190px] card-sweep-glare"
                >
                  <div className="space-y-3">
                    <div className="flex gap-0.5 text-[#E9BD36]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#E9BD36] text-[#E9BD36]" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-brand-dark dark:text-zinc-300 leading-relaxed line-clamp-3">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-brand-zinc-100 pt-4 mt-3">
                    <div className={`relative h-9 w-9 rounded-full ${item.avatarBg} flex items-center justify-center text-white font-heading font-black text-xs border border-white/20 shadow-sm`}>
                      {item.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-black text-brand-dark dark:text-white leading-none">{item.name}</span>
                      <span className="block text-[9px] font-bold text-brand-zinc-400 uppercase tracking-widest mt-1">
                        {item.role} <span className="opacity-40 mx-0.5">·</span> <span className="text-brand-blue dark:text-brand-yellow font-black">{item.company}</span>
                      </span>
                    </div>
                    <Quote className="h-5 w-5 ml-auto text-brand-blue/10" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
