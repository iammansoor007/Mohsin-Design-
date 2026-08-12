"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

import content from "@/data/content.json";

export default function ServiceArea({ data }: { data?: any }) {
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const serviceArea: typeof content.serviceArea = data ? { ...content.serviceArea, ...data } : content.serviceArea;
  const hubs = serviceArea.hubs;

  // Let's add coords mappings locally since they represent UI pixel coordinates
  const coordsMap: Record<string, { x: string; y: string }> = {
    us: { x: "27.27%", y: "29.72%" },
    ca: { x: "24.63%", y: "33.63%" },
    br: { x: "26.67%", y: "77.03%" },
    uk: { x: "45.97%", y: "45.21%" },
    es: { x: "46.49%", y: "46.30%" },
    be: { x: "48.27%", y: "44.90%" },
    fr: { x: "49.00%", y: "47.84%" },
    de: { x: "49.66%", y: "43.78%" },
    at: { x: "51.07%", y: "44.34%" },
    it: { x: "50.53%", y: "50.18%" },
    bh: { x: "61.08%", y: "58.22%" },
    au: { x: "82.34%", y: "82.47%" }
  };

  const getHubCoords = (id: string) => {
    return coordsMap[id] || { x: "0%", y: "0%" };
  };

  return (
    <section
      id="service-area"
      className="relative overflow-hidden bg-transparent py-24 md:py-32 border-t border-b border-brand-zinc-200 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center">

          {/* ── Left Column ── */}
          <div className="w-full lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">

            <div className="eyebrow-pill self-center lg:self-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue dark:bg-brand-yellow opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue dark:bg-brand-yellow" />
              </span>
              {serviceArea.sectionTag}
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
              {serviceArea.titleIntro}
              <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">
                {serviceArea.titleHighlight}
              </span>
            </h2>

            <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-md">
              {serviceArea.description}
            </p>

            {/* ── Country chip grid ── */}
            <div className="w-full flex flex-wrap justify-center lg:justify-start gap-2">
              {hubs.map((hub) => {
                const isActive = activeHub === hub.id;

                return (
                  <motion.button
                    key={hub.id}
                    onMouseEnter={() => setActiveHub(hub.id)}
                    onMouseLeave={() => setActiveHub(null)}
                    onFocus={() => setActiveHub(hub.id)}
                    onBlur={() => setActiveHub(null)}
                    whileTap={{ scale: 0.96 }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold tracking-wide transition-all duration-200 cursor-pointer select-none focus:outline-none ${
                      isActive
                        ? "border-[#0306AC] dark:border-[#E9BD36] bg-[#EFF6FF] dark:bg-[#E9BD36]/10 text-[#0306AC] dark:text-[#E9BD36]"
                        : "border-zinc-200 dark:border-white/10 text-zinc-650 dark:text-zinc-400 hover:border-[#0306AC] dark:hover:border-[#E9BD36] hover:text-[#0306AC] dark:hover:text-[#E9BD36]"
                    }`}
                    aria-pressed={isActive}
                  >
                    <MapPin
                      className={`shrink-0 transition-colors duration-250 h-2.5 w-2.5 ${
                        isActive
                          ? "text-[#0306AC] dark:text-[#E9BD36]"
                          : "text-zinc-400 dark:text-zinc-550"
                      }`}
                      strokeWidth={3}
                    />
                    {hub.name}
                  </motion.button>
                );
              })}
            </div>

            {/* Fixed-height info panel — reserves space so nothing shifts */}
            <div className="relative w-full h-16 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeHub && (() => {
                  const hub = hubs.find((h) => h.id === activeHub);
                  if (!hub) return null;
                  return (
                    <motion.div
                      key={hub.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center gap-3 rounded-xl border border-brand-zinc-200 dark:border-brand-blue/30 bg-[#080710]/95 dark:bg-[#161622]/95 px-4 shadow-md"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E9BD36] dark:bg-[#0306AC] transition-colors duration-300">
                        <MapPin className="h-3.5 w-3.5 text-[#080710] dark:text-white transition-colors duration-300" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black text-white leading-tight">{hub.name}</p>
                        <p className="truncate text-[10px] font-semibold text-brand-zinc-400 leading-normal">{hub.focus}</p>
                      </div>
                      <span className="ml-auto shrink-0 text-[9px] font-mono font-bold tracking-widest text-[#0306AC] dark:text-[#E9BD36] uppercase whitespace-nowrap">
                        {hub.timezone}
                      </span>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

            <a
              href={serviceArea.ctaHref}
              className="btn-primary-cta self-center lg:self-start"
            >
              <span>{serviceArea.ctaText}</span>
              <span className="btn-icon">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          {/* ── Right Column: Map ── */}
          <div className="w-full lg:col-span-7 bg-white dark:bg-[#12121e] border border-brand-zinc-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 h-32 w-32 bg-brand-yellow/10 rounded-full blur-2xl -z-10" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-brand-blue/5 rounded-full blur-2xl -z-10" />

            <div className="relative aspect-[1010/666] w-full select-none">
              <img
                src={serviceArea.mapSrc}
                alt={serviceArea.mapAlt}
                className="w-full h-full object-contain pointer-events-none select-none transition-all duration-300 dark:invert dark:brightness-135 dark:saturate-150"
              />

              {/* Pins — no labels on map */}
              {hubs.map((hub) => {
                const isActive = activeHub === hub.id;

                return (
                  <div
                    key={hub.id}
                    className="absolute z-10 cursor-pointer"
                    style={{ left: getHubCoords(hub.id).x, top: getHubCoords(hub.id).y }}
                    onMouseEnter={() => setActiveHub(hub.id)}
                    onMouseLeave={() => setActiveHub(null)}
                    onFocus={() => setActiveHub(hub.id)}
                    onBlur={() => setActiveHub(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={hub.name}
                  >
                    {/* Outer glow ring — only when active */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1.6 : 0.4,
                      }}
                      transition={{ duration: 0.25 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-brand-yellow/30 pointer-events-none"
                    />

                     {/* Idle subtle pulse */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full pointer-events-none bg-[#0306AC]/15 dark:bg-[#E9BD36]/15 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"
                    />

                    {/* Pin dot */}
                    <div
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center rounded-full border-2 shadow-md transition-all duration-200 ${
                        isActive
                          ? "scale-150 bg-[#E9BD36] dark:bg-[#0306AC] border-[#0306AC] dark:border-[#E9BD36]"
                          : "scale-100 bg-[#0306AC] dark:bg-[#E9BD36] border-white dark:border-[#080710]"
                      }`}
                    >
                      <div
                        className={`h-1 w-1 rounded-full transition-colors duration-200 ${
                          isActive
                            ? "bg-[#0306AC] dark:bg-[#E9BD36]"
                            : "bg-white dark:bg-[#080710]"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
