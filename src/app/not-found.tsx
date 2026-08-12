"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 w-full text-brand-dark dark:text-white transition-colors duration-300 relative overflow-hidden flex items-center justify-center min-h-screen">

      {/* Full-bleed background that covers entire screen including under navbar */}
      <div className="fixed inset-0 bg-white dark:bg-[#080710] -z-20 pointer-events-none" />
      
      {/* ── AMBIENT GLOW BLOBS ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-brand-blue/[0.05] to-indigo-500/[0.02] dark:from-brand-blue/[0.10] dark:to-indigo-500/[0.04] blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-brand-yellow/[0.04] to-amber-500/[0.01] dark:from-brand-yellow/[0.08] dark:to-amber-500/[0.03] blur-[150px] pointer-events-none -z-10" />
      
      {/* Background dot grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0306ac05_1px,transparent_1px),linear-gradient(to_bottom,#0306ac05_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-2xl px-6 py-24 text-center relative z-10">
        
        {/* Animated compass icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#0306AC]/10 dark:bg-[#E9BD36]/10 blur-2xl scale-150" />
            <div className="relative h-24 w-24 rounded-full bg-[#0306AC]/[0.06] dark:bg-[#E9BD36]/[0.06] border border-[#0306AC]/20 dark:border-[#E9BD36]/20 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                <Compass className="h-10 w-10 text-[#0306AC] dark:text-[#E9BD36]" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full bg-[#0306AC]/[0.06] dark:bg-[#E9BD36]/[0.06] border border-[#0306AC]/15 dark:border-[#E9BD36]/15 px-5 py-1.5 text-[10px] font-mono font-black tracking-widest text-[#0306AC] dark:text-[#E9BD36] uppercase mb-6 select-none">
            <MapPin className="h-3 w-3" />
            <span>Page Not Found</span>
          </div>

          <h1 className="font-heading font-black leading-none tracking-tight mb-4">
            <span
              className="block text-[100px] sm:text-[140px] leading-none"
              style={{
                background: "linear-gradient(135deg, #0306AC 0%, #4a47c7 50%, #0306AC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </span>
          </h1>

          <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-dark dark:text-white mb-3">
            Looks like you&apos;re off the map
          </h2>

          <p className="text-sm sm:text-base font-sans text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto mb-10">
            The page you&apos;re looking for doesn&apos;t exist yet. It might be coming soon, or the link may have changed.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#0306AC] hover:bg-[#020389] text-white px-7 py-3 text-sm font-bold font-sans transition-all duration-300 hover:shadow-[0_8px_30px_rgba(3,6,172,0.35)] hover:-translate-y-0.5 no-underline"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/location/"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#0306AC]/20 dark:border-white/10 bg-transparent hover:bg-[#0306AC]/5 dark:hover:bg-white/5 text-brand-dark dark:text-white px-7 py-3 text-sm font-bold font-sans transition-all duration-300 hover:-translate-y-0.5 no-underline"
          >
            <MapPin className="h-4 w-4 text-[#0306AC] dark:text-[#E9BD36]" />
            <span>View Our Locations</span>
          </Link>
        </motion.div>

        {/* Bottom decorative dots */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-16 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#0306AC]/30 dark:bg-[#E9BD36]/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>

      </div>
    </main>
  );
}
