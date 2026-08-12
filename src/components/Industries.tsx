"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Heart, 
  ShoppingCart, 
  Hammer, 
  GraduationCap, 
  Landmark, 
  Network, 
  Store 
} from "lucide-react";

// Variants for repeating hand-drawn paths animations on scroll
const drawVariants = {
  hidden: { pathLength: 0 },
  visible: (custom: { delay: number; duration: number }) => ({
    pathLength: 1,
    transition: { 
      duration: custom?.duration ?? 0.6, 
      delay: custom?.delay ?? 0.2, 
      ease: "easeOut" as any 
    }
  })
};

import content from "@/data/content.json";

const iconMap: Record<string, any> = {
  Building2,
  Heart,
  ShoppingCart,
  Hammer,
  GraduationCap,
  Landmark,
  Network,
  Store
};

export default function Industries() {
  const { industries } = content;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as any }
    }
  };

  return (
    <section id="industries" className="relative bg-brand-light dark:bg-[#0a0a14] py-24 border-t border-b border-brand-zinc-200 dark:border-white/10">
      <div className="absolute inset-0 -z-10 bg-linear-grid-blue-4 [background-size:32px_32px] opacity-75" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="eyebrow-pill mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue dark:bg-brand-yellow opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue dark:bg-brand-yellow" />
            </span>
            {industries.sectionTag}
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
            {industries.titleIntro}{" "}
            <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">
              {industries.titleHighlight}
            </span>
          </h2>
        </div>

        {/* 8-Column Horizontal Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-6"
        >
          {industries.list.map((industry, index) => {
            const IconComponent = iconMap[industry.iconName] || Store;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-[#12121e] border border-brand-zinc-200/80 dark:border-white/10 hover:border-brand-blue dark:hover:border-brand-yellow shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Icon Container with double ring on hover */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light dark:bg-[#1e1e2e] border border-brand-zinc-100 dark:border-white/10 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-all duration-500 ease-out shadow-sm group-hover:shadow-md">
                  <div className="absolute inset-0 rounded-2xl border border-dashed border-brand-blue/0 group-hover:border-brand-blue/30 group-hover:scale-110 transition-all duration-500" />
                  <IconComponent className="h-7 w-7 text-brand-blue group-hover:text-brand-dark transition-all duration-300 group-hover:scale-110" />
                </div>

                {/* Name */}
                <h3 className="font-sans font-black text-[11px] uppercase tracking-widest text-brand-zinc-500 dark:text-brand-zinc-400 mt-5 text-center group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors duration-300">
                  {industry.name}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
