"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X, Star, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

import content from "@/data/content.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { navbar } = content;

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 sm:px-6 sm:py-4 md:px-12 pointer-events-none">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-7xl rounded-full border border-brand-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#12121e]/80 px-3 sm:px-6 py-2.5 sm:py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md flex items-center justify-between pointer-events-auto"
      >
        {/* Brand Logo - Aligned with Hero badge and theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue shadow-md border border-brand-blue/10">
            <span className="font-sans font-black text-white text-sm sm:text-base leading-none">{navbar.logoLetter}</span>
            <div className="absolute -top-0.5 -right-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-brand-yellow flex items-center justify-center border border-white">
              <Star className="h-1.5 w-1.5 sm:h-2 sm:w-2 fill-brand-dark text-brand-dark" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black text-xs sm:text-base tracking-tight text-brand-dark dark:text-white leading-none">
              {navbar.logoText}
            </span>
            <span className="font-sans font-bold text-[7.5px] sm:text-[8.5px] tracking-[0.2em] text-brand-blue dark:text-brand-yellow uppercase leading-none mt-1">
              {navbar.logoSub}
            </span>
          </div>
        </div>

        {/* Desktop Nav - Centered */}
        <nav className="hidden md:flex items-center gap-8 font-sans font-bold text-xs uppercase tracking-wider text-brand-dark dark:text-white">
          {navbar.links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative py-1 hover:text-brand-blue dark:hover:text-brand-yellow transition-colors group flex items-center gap-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-blue dark:bg-brand-yellow transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Theme Toggle + CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-zinc-200 dark:border-white/15 bg-brand-light dark:bg-white/10 hover:bg-brand-yellow/20 transition-all duration-300 text-brand-dark dark:text-white"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={navbar.ctaHref}
            className="btn-primary-cta"
          >
            <span>{navbar.ctaText}</span>
            <span className="btn-icon">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        {/* Mobile: Theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-zinc-200 dark:border-white/15 bg-brand-light dark:bg-white/10 hover:bg-brand-yellow/20 transition-all duration-300 text-brand-dark dark:text-white"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2 text-brand-dark dark:text-white hover:bg-brand-zinc-100 dark:hover:bg-white/10 transition-colors"
            aria-label={navbar.ariaToggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-4 right-4 mt-2 rounded-2xl border border-brand-zinc-200 dark:border-white/10 bg-white dark:bg-[#12121e] p-5 sm:p-6 shadow-xl md:hidden pointer-events-auto"
        >
          <nav className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider">
            {navbar.links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-brand-dark dark:text-white hover:text-brand-blue dark:hover:text-brand-yellow transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-brand-zinc-100 dark:border-white/10" />
            <a
              href={navbar.ctaHref}
              onClick={() => setIsOpen(false)}
              className="btn-primary-cta w-full"
            >
              <span>{navbar.ctaText}</span>
              <span className="btn-icon">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
