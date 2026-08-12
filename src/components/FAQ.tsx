"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { useState } from "react";
import content from "@/data/content.json";

export default function FAQ({ data }: { data?: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faq: typeof content.faq = data ? { ...content.faq, ...data } : content.faq;
  const faqs = faq.list as any[];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white dark:bg-[#080710] py-24 md:py-32 border-b border-brand-zinc-200 dark:border-white/10"
    >
      {/* Decorative Soft Blur Orb */}
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-blue/5 dark:bg-brand-yellow/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Column: Sticky Title & Info ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8 flex flex-col justify-start">
            
            <div className="flex flex-col gap-4">
              {/* Category Pill Tag */}
              <div className="eyebrow-pill self-start">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue dark:bg-brand-yellow opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue dark:bg-brand-yellow" />
                </span>
                {faq.sectionTag}
              </div>
              
              {/* Main Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
                {faq.titleIntro}{" "}
                <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">
                  {faq.titleHighlight}
                </span>
              </h2>
              
              {/* Subdescription */}
              <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-sm">
                {faq.description}
              </p>
            </div>

            {/* Premium Clean Sticky Strategy Session Box */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue via-[#020485] to-[#010356] dark:from-[#12121e] dark:via-[#0f0f1a] dark:to-brand-dark border border-brand-blue/20 dark:border-white/10 p-7 text-white shadow-xl group transition-all duration-300">
              <div className="relative z-20 space-y-5">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[9px] font-mono font-black tracking-wider uppercase text-brand-yellow">
                  {faq.strategyAudit.badge}
                </span>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-bold leading-tight text-white">
                    {faq.strategyAudit.title}
                  </h3>
                  <p className="text-white/80 dark:text-zinc-300 text-xs leading-relaxed font-sans">
                    {faq.strategyAudit.desc}
                  </p>
                </div>
                <a
                  href={faq.strategyAudit.href}
                  className="btn-primary-cta w-full"
                >
                  <span>{faq.strategyAudit.button}</span>
                  <span className="btn-icon">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </div>

          </div>

          {/* ── Right Column: Accordion Cards ── */}
          <div className="lg:col-span-7 space-y-3.5 w-full">
            
            {faqs.map((f, index) => {
              const doubleDigit = String(index + 1).padStart(2, "0");
              const isOpen = openIndex === index;

              return (
                <div
                  key={f.question}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer select-none p-5 sm:p-6 ${
                    isOpen
                      ? "bg-white dark:bg-[#12121e] border-brand-blue/30 dark:border-brand-yellow/30 shadow-md"
                      : "bg-white/60 dark:bg-[#12121e]/60 border-brand-zinc-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-[#12121e] hover:border-brand-blue/20 dark:hover:border-brand-yellow/20"
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  {/* Header Area */}
                  <div className="flex items-start justify-between gap-4 relative z-10">
                    <div className="flex items-start gap-3.5">
                      {/* Double Digit Number */}
                      <span className="font-mono text-xs font-black text-brand-blue dark:text-brand-yellow mt-0.5 select-none">
                        {doubleDigit}
                      </span>
                      
                      <div className="space-y-1">
                        {/* Category Label */}
                        <span className="font-mono text-[9px] font-black text-brand-blue/60 dark:text-brand-yellow/60 tracking-widest uppercase select-none block">
                          {f.category}
                        </span>
                        
                        {/* Question */}
                        <h3 className={`font-heading font-extrabold text-base sm:text-lg leading-snug transition-colors duration-300 pr-2 ${
                          isOpen ? "text-brand-blue dark:text-brand-yellow" : "text-brand-dark dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-yellow"
                        }`}>
                          {f.question}
                        </h3>
                      </div>
                    </div>

                    {/* Plus/Minus Indicator */}
                    <div className="shrink-0 mt-0.5">
                      <motion.div
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "bg-brand-blue border-brand-blue text-white dark:bg-brand-yellow dark:border-brand-yellow dark:text-[#080710] shadow-sm"
                            : "bg-brand-light dark:bg-white/5 border-brand-zinc-200 dark:border-white/10 text-brand-dark dark:text-white group-hover:border-brand-blue dark:group-hover:border-brand-yellow"
                        }`}
                      >
                        <Plus className="h-4 w-4 stroke-[2]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Answer Area */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden relative z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="pl-7 pt-4 mt-4 border-t border-brand-zinc-100 dark:border-white/10">
                          {/* Clean Answer Text Only */}
                          <p className="text-xs sm:text-sm text-brand-zinc-600 dark:text-zinc-300 font-medium leading-relaxed font-sans">
                            {f.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}
