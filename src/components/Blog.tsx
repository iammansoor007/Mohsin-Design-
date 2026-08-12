"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import content from "@/data/content.json";

export default function Blog({ data }: { data?: any }) {
  const blog: typeof content.blog = data ? { ...content.blog, ...data } : content.blog;
  const posts = blog.posts;

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-white dark:bg-[#080710] py-24 md:py-32 border-b border-brand-zinc-200 dark:border-white/10"
    >
      {/* Decorative Background Glows */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/3 -left-32 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none z-0" />

      {/* Crossing structural grid lines */}
      <div className="absolute inset-x-0 top-12 h-[1px] bg-brand-blue/[0.03] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-12 h-[1px] bg-brand-blue/[0.03] pointer-events-none" />
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-brand-blue/[0.03] pointer-events-none" />
      <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-brand-blue/[0.03] pointer-events-none" />

      {/* Local keyframe animations for premium floating, pulsing, and glass sweep reflections */}
      <style>{`
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-16"
        >
          <div className="eyebrow-pill self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue dark:bg-brand-yellow opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue dark:bg-brand-yellow" />
            </span>
            {blog.sectionTag}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
            {blog.titleIntro}{" "}
            <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">
              {blog.titleHighlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-brand-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-xl">
            {blog.description}
          </p>
        </motion.div>

        {/* Asymmetrical Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left Column: Featured Post (lg:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {posts[0] && (
              <a
                href={posts[0].link}
                className="group flex flex-col rounded-[2.5rem] border border-brand-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#12121e] p-6 md:p-8 shadow-[0_2px_12px_rgba(3, 6, 172,0.015)] hover:shadow-[0_20px_40px_rgba(3, 6, 172,0.08)] hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 overflow-hidden card-sweep-glare select-none block"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-light border border-brand-zinc-200/40 rounded-3xl mb-6">
                  <Image
                    src={posts[0].image}
                    alt={posts[0].title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 680px"
                    priority
                  />
                </div>

                {/* Card Body */}
                <div className="space-y-4">
                  {/* Category Pill and Read Time */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue dark:text-brand-yellow">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="font-mono text-[8px] font-black uppercase tracking-widest">{posts[0].category}</span>
                    </div>
                    <span className="block text-[10px] font-bold text-brand-zinc-400 dark:text-zinc-400 uppercase tracking-wider">
                      {posts[0].date}{blog.dateSeparator}{posts[0].readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-black text-brand-dark dark:text-white leading-snug group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors duration-300">
                    {posts[0].title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-[13px] text-brand-zinc-500 dark:text-zinc-300 font-medium leading-relaxed">
                    {posts[0].excerpt}
                  </p>

                  {/* Read More button */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue dark:text-brand-yellow">{blog.featuredLabel}</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue dark:text-brand-yellow group-hover:bg-brand-blue group-hover:text-white dark:group-hover:bg-brand-yellow dark:group-hover:text-[#080710] transition-all duration-300">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </a>
            )}
          </motion.div>

          {/* Right Column: Recent Posts List (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {posts.slice(1).map((post: any, idx: number) => (
              <a
                key={idx}
                href={post.link}
                className="group block rounded-[2rem] border border-brand-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#12121e] p-4 sm:p-5 shadow-[0_2px_12px_rgba(3, 6, 172,0.01)] hover:shadow-[0_16px_36px_rgba(3, 6, 172,0.06)] hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 overflow-hidden card-sweep-glare select-none"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
                  {/* Small Thumbnail */}
                  <div className="relative w-full sm:w-24 aspect-[16/10] sm:aspect-square overflow-hidden bg-brand-light border border-brand-zinc-200/40 rounded-2xl shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 100px"
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0 space-y-1.5 w-full">
                    {/* Meta category row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[7px] font-black text-brand-blue dark:text-brand-yellow uppercase tracking-widest bg-brand-blue/5 px-2 py-0.5 rounded-md">
                        {post.category}
                      </span>
                      <span className="block text-[9px] font-bold text-brand-zinc-400 dark:text-zinc-400 uppercase tracking-wider">
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xs sm:text-[13px] md:text-sm font-black text-brand-dark dark:text-white leading-snug group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Read info */}
                    <div className="flex items-center gap-1 text-[9px] font-bold text-brand-zinc-400 group-hover:text-brand-blue transition-colors duration-300 pt-0.5">
                      <span>{post.readTime}</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
