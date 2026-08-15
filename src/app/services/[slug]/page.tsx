"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from "framer-motion";
import {
  ArrowRight,
  Play,
  MapPin,
  Clock,
  Trophy,
  Users,
  Smile,
  ArrowUpRight,
  Sparkles,
  Star,
  Send,
  Mail,
  MessageSquare,
  Calendar,
  Check,
  ChevronDown,
  Plus,
  Search,
  Monitor,
  Megaphone,
  MousePointerClick,
  Palette,
  PenTool,
  ShoppingCart,
  BarChart2,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Target,
  Award,
  Globe,
  DollarSign,
  Briefcase,
  TrendingUp,
  Building2,
  Phone
} from "lucide-react";

import { getServiceData, slugify } from "@/lib/services";
import FAQ from "@/components/FAQ";

// ── Icon Map Resolver ──
const iconMap: Record<string, React.ElementType> = {
  Search,
  Monitor,
  Megaphone,
  MousePointerClick,
  Palette,
  PenTool,
  ShoppingCart,
  BarChart2,
  CheckCircle2,
  Globe,
  MapPin,
  Star,
  Trophy,
  Users,
  Smile,
  ShieldCheck,
  Award,
  DollarSign,
  Briefcase,
  Cpu,
  TrendingUp,
  Building2
};

// ── Custom Ad Platform Logos for Client Trust ──
const GoogleAdsLogo = () => (
  <svg viewBox="0 0 48 48" className="h-5.5 w-auto shrink-0 filter drop-shadow-md">
    <path d="M34.7 4.3c-2.1 0-3.9 1-5.1 2.6L12.5 35.8c-1 1.7-1 3.8 0 5.5.9 1.6 2.6 2.5 4.5 2.5h20.3c3.2 0 5.7-2.6 5.7-5.7V10c0-3.1-2.5-5.7-5.7-5.7h-2.6z" fill="#F9BC05" />
    <path d="M12.5 35.8L29.6 6.9c1.2-1.6 3-2.6 5.1-2.6H17c-1.9 0-3.6.9-4.5 2.5L2.6 24.3c-1.8 3.1-.7 7.1 2.4 8.9l7.5 2.6z" fill="#4285F4" />
  </svg>
);

const MetaLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5.5 w-auto fill-[#0668E1] shrink-0 filter drop-shadow-md">
    <path d="M16.48 7.38c-1.34 0-2.58.55-3.5 1.55-.92-1-2.16-1.55-3.5-1.55-2.73 0-4.96 2.23-4.96 4.96s2.23 4.96 4.96 4.96c1.34 0 2.58-.55 3.5-1.55.92 1 2.16 1.55 3.5 1.55 2.73 0 4.96-2.23 4.96-4.96s-2.23-4.96-4.96-4.96zm-7 8.08c-1.72 0-3.12-1.4-3.12-3.12s1.4-3.12 3.12-3.12 3.12 1.4 3.12 3.12-1.4 3.12-3.12 3.12zm7 0c-1.72 0-3.12-1.4-3.12-3.12s1.4-3.12 3.12-3.12 3.12 1.4 3.12 3.12-1.4 3.12-3.12 3.12z" />
  </svg>
);

const AmazonLogo = () => (
  <svg viewBox="0 0 48 48" className="h-4.5 w-auto fill-brand-dark dark:fill-white shrink-0">
    <path d="M26.4 12c-6.1 0-10.4 3.6-10.4 9.8 0 5.4 3.2 8.4 8.1 8.4 4 0 6.6-1.9 8.1-3.9v3.1h5.8V12.4h-5.8v3.1c-1.6-2.1-4.2-3.5-8.1-3.5zm.9 12.3c-3 0-4.6-1.6-4.6-4.2s1.6-4.2 4.6-4.2 4.6 1.6 4.6 4.2-1.6 4.2-4.6 4.2z" />
    <path d="M12 38c10.4 6 22.4 4 28-2" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M38 34l3.5 3.5-1.5 4" fill="#FF9900" />
  </svg>
);

const BingLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5.5 w-auto fill-[#008373] dark:fill-[#00b29a] shrink-0">
    <path d="M5 2L15 6v12l-6 4v-9l6-2V6L5 2z" />
  </svg>
);

const AppleLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5.5 w-auto fill-brand-dark dark:fill-white shrink-0">
    <path d="M18.7 18.5c-.8 1.2-1.7 2.4-3 2.4-1.3 0-1.7-.8-3.2-.8s-2 .8-3.2.8c-1.3 0-2.3-1.2-3.1-2.4C4.6 16 3.3 10.9 4.9 8.1c.8-1.4 2.2-2.3 3.8-2.3 1.2 0 2.4.8 3.2.8.7 0 2.1-.9 3.6-.9 1.5 0 2.9.5 3.8 1.8-3.1 1.8-2.6 6-0.1 7.2-.9 2.2-2.1 4.5-3.5 5.8zM15.9 4.2c.8-.9 1.3-2.2 1.1-3.5-1.1.1-2.5.8-3.3 1.8-.7.8-1.3 2.1-1.1 3.4 1.2.1 2.5-.7 3.3-1.7z" />
  </svg>
);

// ── SVG Underline Variant ──
const drawVariants = {
  hidden: { pathLength: 0 },
  visible: (custom: { delay: number; duration: number }) => ({
    pathLength: 1,
    transition: {
      duration: custom?.duration ?? 0.5,
      delay: custom?.delay ?? 0.1,
      ease: "easeOut" as any
    }
  })
};

// ── Digit Ticker Components from About Page ──
const TickerDigit = ({ digit }: { digit: number }) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <span
      className="relative inline-block overflow-hidden select-none"
      style={{
        width: "0.58em",
        height: "1.02em"
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

const DigitTicker = ({ value }: { value: string | number }) => {
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

// ── Dynamic Cursor Spotlight Card Wrapper ──
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group/spotlight rounded-[28px] ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), rgba(3, 6, 172, 0.05), transparent 80%)`
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 dark:group-hover/spotlight:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), rgba(233, 189, 54, 0.05), transparent 80%)`
        }}
      />

      <div
        ref={(el) => {
          if (el) {
            mouseX.on("change", (x) => el.style.setProperty("--x", `${x}px`));
            mouseY.on("change", (y) => el.style.setProperty("--y", `${y}px`));
          }
        }}
        className="w-full h-full relative z-20"
      >
        {children}
      </div>
    </motion.div>
  );
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const service = getServiceData(slug);

  if (!service) {
    notFound();
  }

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: service.title,
    message: "",
    agreePrivacy: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        service: service.title,
        message: "",
        agreePrivacy: false
      });
    }, 4500);
  };

  // Get recommended services
  const allServices = [
    { title: "Search Engine Optimization (SEO)", slug: "seo", desc: "Rank higher on search engines and get organic leads." },
    { title: "Website Design & Development", slug: "web-design", desc: "Blazing fast luxury websites built on Next.js." },
    { title: "Social Media Marketing", slug: "social-media", desc: "Build highly-engaged online communities." },
    { title: "Pay Per Click Advertising", slug: "paid-ads", desc: "Laser-focused Google & Meta ad campaigns." },
    { title: "Branding & Identity Design", slug: "branding", desc: "Stunning corporate identity guides and packaging." },
    { title: "Content Marketing & Copywriting", slug: "content-marketing", desc: "Persuasive editorial copywriting and blogs." },
    { title: "E-Commerce Solutions", slug: "e-commerce", desc: "Scalable online storefronts with seamless checkout." },
    { title: "Analytics & Conversion Optimization", slug: "analytics", desc: "GA4 integrations and conversion funnel testing." }
  ];
  const recommendedServices = allServices
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <main className="flex-1 w-full bg-white dark:bg-[#080710] text-brand-dark dark:text-white transition-colors duration-300 relative overflow-x-clip font-sans">
      
      {/* ── Background Grid Pattern ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

      {/* ── Ambient Blobs ── */}
      <div className="absolute top-[2%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/[0.03] dark:bg-brand-blue/[0.06] blur-[120px] pointer-events-none select-none -z-10 animate-float-blob" />
      <div className="absolute top-[28%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-brand-yellow/[0.02] dark:bg-brand-yellow/[0.05] blur-[150px] pointer-events-none select-none -z-10 animate-float-blob-delayed" />
      <div className="absolute bottom-[20%] left-[-12%] w-[48vw] h-[48vw] rounded-full bg-brand-blue/[0.02] dark:bg-brand-blue/[0.04] blur-[140px] pointer-events-none select-none -z-10 animate-float-blob" />

      {/* ── 01. SERVICE HERO ── */}
      <section className="-mt-[110px] sm:-mt-[125px] lg:-mt-[140px] pt-[135px] sm:pt-[150px] lg:pt-[165px] pb-16 sm:pb-24 relative overflow-hidden border-b border-brand-zinc-200 dark:border-white/10">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <img
            src="/portfolio_hero_bg.png"
            alt="Hero Background"
            className="w-full h-full object-cover object-right opacity-100 dark:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#080710] dark:via-[#080710]/85 dark:to-transparent pointer-events-none" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10 py-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* LEFT: Text & Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-[10px] font-mono font-black tracking-widest uppercase text-[#080710] shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-[#080710] text-[#080710] shrink-0" />
                  {service.tag}
                </span>
                <div className="h-[1px] w-12 bg-brand-zinc-300 dark:bg-zinc-700" />
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.12] text-brand-dark dark:text-white max-w-2xl">
                {service.hero.titleIntro}
                <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1 ml-1 font-black">
                  {service.hero.titleHighlight}
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3.5 pointer-events-none text-brand-yellow opacity-90" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <motion.path
                      d="M 2 5 Q 50 1.5, 98 3.5 C 99 3.5, 99 4.5, 98 5 Q 50 7, 2 5.5 Z"
                      fill="currentColor"
                      custom={{ delay: 0.5, duration: 0.65 }}
                      variants={drawVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-sm sm:text-base font-sans text-brand-zinc-650 dark:text-zinc-300 leading-relaxed max-w-xl font-normal">
                {service.hero.description}
              </p>

              {/* Benefits Checklist */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {service.hero.benefits.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-brand-zinc-700 dark:text-zinc-350 group/item">
                    <span className="h-4.5 w-4.5 rounded-full bg-brand-blue/10 dark:bg-brand-yellow/10 flex items-center justify-center shrink-0 mt-0.5 text-brand-blue dark:text-brand-yellow border border-brand-blue/15 dark:border-brand-yellow/15 shadow-sm group-hover/item:scale-105 transition-transform duration-300">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a href="#contact-form" className="btn-primary-cta">
                  <span>Start Your Project</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>
                <a href="#what-included" className="btn-secondary-cta">
                  <span>Explore Inclusions</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>
              </div>
            </motion.div>

            {/* RIGHT: Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex justify-center w-full"
            >
              <div id="contact-form" className="contact-card-glass p-6 sm:p-9 rounded-[32px] shadow-2xl relative border border-brand-zinc-200/95 dark:border-white/10 overflow-hidden w-full max-w-xl">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-dark dark:text-white mb-5">
                  Request a Free Audit
                </h2>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="absolute inset-0 bg-white/98 dark:bg-[#12121e]/98 backdrop-blur-md rounded-[32px] p-6 sm:p-10 flex flex-col items-center justify-center text-center z-30 space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-md animate-pulse">
                        <Check className="w-7 h-7" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-brand-dark dark:text-white">
                        Consultation Booked!
                      </h3>
                      <p className="text-xs font-sans text-brand-zinc-650 dark:text-zinc-355 max-w-xs mx-auto leading-relaxed">
                        Thanks for reaching out! We'll audit your brand's presence and email you a customized growth strategy within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="contact-input text-xs sm:text-sm"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="contact-input text-xs sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="contact-input text-xs sm:text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Company Name (Optional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="contact-input text-xs sm:text-sm"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="contact-input appearance-none cursor-pointer pr-10 text-xs sm:text-sm bg-transparent"
                    >
                      <option value={service.title}>{service.title}</option>
                      {allServices.filter(s => s.title !== service.title).map((srv, idx) => (
                        <option key={idx} value={srv.title} className="bg-white dark:bg-[#12121e]">
                          {srv.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-brand-zinc-400 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>

                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about your business goals *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="contact-input resize-none text-xs sm:text-sm"
                  />

                  <div className="flex items-center gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      checked={formData.agreePrivacy}
                      onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                      className="w-4 h-4 rounded border-brand-zinc-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
                    />
                    <label htmlFor="privacy" className="text-[11px] font-sans text-brand-zinc-650 dark:text-zinc-400 cursor-pointer select-none">
                      I agree to the <Link href="/privacy" className="text-brand-blue dark:text-brand-yellow font-bold underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-brand-yellow hover:bg-amber-400 text-[#080710] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/15 hover:shadow-brand-yellow/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Free Proposal</span>
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 02. CLIENT TRUST MARQUEE ── */}
      <section className="py-7 border-b border-brand-zinc-200 dark:border-white/10 bg-zinc-50/20 dark:bg-[#0c0b18]/40 select-none overflow-hidden logo-marquee-wrapper relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#080710] z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#080710] z-20 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center gap-6">
          <span className="text-[11px] font-mono font-black text-brand-blue dark:text-brand-yellow uppercase tracking-widest text-center md:text-left shrink-0">
            {service.clientTrust.heading}
          </span>

          <div className="flex-1 overflow-hidden relative">
            <div className="logo-marquee-track gap-12 md:gap-16 items-center">
              {[...Array(3)].map((_, outerIdx) => (
                <div key={outerIdx} className="flex gap-12 md:gap-16 items-center">
                  {service.clientTrust.logos.map((logoItem: any, lIdx: number) => {
                    const LogoComponent =
                      logoItem.name.includes("Google Ads") || logoItem.name.includes("Google Search") ? GoogleAdsLogo :
                        logoItem.name.includes("Meta") ? MetaLogo :
                          logoItem.name.includes("Amazon") ? AmazonLogo :
                            logoItem.name.includes("Bing") ? BingLogo : AppleLogo;

                    return (
                      <div key={lIdx} className="flex items-center gap-2.5 font-sans text-xs font-black uppercase text-brand-dark dark:text-white tracking-wider whitespace-nowrap">
                        <LogoComponent />
                        <span>{logoItem.name}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes marqueeLogos {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.33%, 0, 0); }
          }
          .logo-marquee-track {
            display: flex;
            width: max-content;
            animation: marqueeLogos 22s linear infinite;
            will-change: transform;
          }
          .logo-marquee-wrapper:hover .logo-marquee-track {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ── 03. WHAT'S INCLUDED (3 Core Pillars) ── */}
      <section id="what-included" className="relative overflow-hidden py-20 md:py-24 border-b border-brand-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 space-y-4"
          >
            <div className="flex justify-center">
              <span className="eyebrow-pill">{service.whatIncluded.eyebrow}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.12]">
              {service.whatIncluded.titleIntro}
              <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1 ml-1 font-black">
                {service.whatIncluded.titleHighlight}
                <svg className="absolute -bottom-1.5 left-0 w-full h-3.5 pointer-events-none text-brand-yellow opacity-90" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <motion.path
                    d="M 2 5 Q 50 1.5, 98 3.5 C 99 3.5, 99 4.5, 98 5 Q 50 7, 2 5.5 Z"
                    fill="currentColor"
                    custom={{ delay: 0.3, duration: 0.65 }}
                    variants={drawVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  />
                </svg>
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {service.whatIncluded.pillars.map((pillar: any, idx: number) => (
              <SpotlightCard key={idx} className="bg-zinc-50/80 dark:bg-[#0c0b18] border border-brand-zinc-200/80 dark:border-white/10 p-7 sm:p-8 flex flex-col justify-between h-full min-h-[340px] hover:shadow-2xl hover:border-brand-blue/60 dark:hover:border-brand-yellow/60 transition-all duration-300 relative overflow-hidden group">
                <div className="space-y-5">
                  {/* Digital Badge Indicator */}
                  <div className="w-11 h-11 rounded-2xl bg-brand-blue/[0.06] dark:bg-brand-yellow/[0.08] border border-brand-blue/10 dark:border-brand-yellow/10 flex items-center justify-center shrink-0 text-brand-blue dark:text-brand-yellow font-mono text-sm font-black group-hover:rotate-[15deg] transition-transform duration-350">
                    0{idx + 1}
                  </div>
                  <div className="space-y-2 text-left">
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-brand-dark dark:text-white leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-[13px] font-sans text-brand-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-6 mt-6 border-t border-brand-zinc-150 dark:border-white/5 text-left">
                  {pillar.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs text-brand-zinc-650 dark:text-zinc-350 font-bold group/item">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/10 dark:bg-brand-yellow/10 text-brand-blue dark:text-brand-yellow flex items-center justify-center shrink-0 border border-brand-blue/15 dark:border-brand-yellow/15 group-hover/item:scale-105 transition-transform duration-300">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </section>

      {/* ── 04. SERVICE STRATEGY (5-6 Components) ── */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-zinc-50/15 dark:bg-[#0c0b18]/10 border-b border-brand-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column Sticky info */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4 text-left">
              <span className="eyebrow-pill">{service.strategy.eyebrow}</span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.12] max-w-sm">
                {service.strategy.titleIntro}
                <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">
                  {service.strategy.titleHighlight}
                </span>
              </h2>
              <p className="text-sm sm:text-base font-sans text-brand-zinc-605 dark:text-zinc-300 font-normal leading-relaxed max-w-sm">
                A custom implementation plan targeting bottlenecks and compounding acquisition flows.
              </p>
            </div>

            {/* Right Column Grid List */}
            <div className="lg:col-span-7 space-y-4">
              {service.strategy.components.map((comp: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-white dark:bg-[#12121e] border border-brand-zinc-200/80 dark:border-white/5 p-6 rounded-[22px] shadow-sm hover:shadow-md hover:border-brand-blue/20 dark:hover:border-brand-yellow/20 flex gap-5 items-start transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Expanding line indicator */}
                  <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-blue dark:bg-brand-yellow group-hover:w-full transition-all duration-500 ease-out" />
                  
                  <div className="h-10 w-10 rounded-xl bg-brand-blue/5 dark:bg-brand-yellow/5 text-brand-blue dark:text-brand-yellow flex items-center justify-center shrink-0 font-mono text-[13px] font-black group-hover:scale-105 transition-transform duration-300 border border-brand-blue/10 dark:border-brand-yellow/10">
                    {comp.num}
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="font-heading text-base font-extrabold text-brand-dark dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors duration-300">
                      {comp.title}
                    </h3>
                    <p className="text-xs font-sans text-brand-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {comp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── 05. BUSINESS BENEFITS (4 Key Benefits) ── */}
      <section className="relative overflow-hidden py-20 md:py-24 border-b border-brand-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 space-y-4"
          >
            <div className="flex justify-center">
              <span className="eyebrow-pill">{service.benefits.eyebrow}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.12]">
              {service.benefits.titleIntro}
              <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1 ml-1 font-black">
                {service.benefits.titleHighlight}
                <svg className="absolute -bottom-1.5 left-0 w-full h-3.5 pointer-events-none text-brand-yellow opacity-90" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <motion.path
                    d="M 2 5 Q 50 1.5, 98 3.5 C 99 3.5, 99 4.5, 98 5 Q 50 7, 2 5.5 Z"
                    fill="currentColor"
                    custom={{ delay: 0.3, duration: 0.65 }}
                    variants={drawVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  />
                </svg>
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.list.map((b: any, idx: number) => {
              // Map index to a specific Lucide Icon
              const benefitIcons = [TrendingUp, Target, Award, DollarSign];
              const BenefitIcon = benefitIcons[idx % benefitIcons.length];

              return (
                <SpotlightCard key={idx} className="bg-white dark:bg-[#12121e] border border-brand-zinc-200/90 dark:border-white/10 p-6 sm:p-7 rounded-[26px] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[250px] relative overflow-hidden group">
                  {/* Expanding underline top borders */}
                  <div className="relative flex items-center justify-between w-full pb-2.5 mb-3">
                    <BenefitIcon className="h-4.5 w-4.5 text-[#0306AC] dark:text-[#E9BD36] transition-transform duration-300 group-hover:rotate-[15deg]" />
                    <span className="text-[8.5px] font-mono tracking-widest text-brand-zinc-400 dark:text-zinc-500 select-none">BENEFIT 0{idx + 1}</span>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-zinc-150 dark:bg-white/5" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0306AC] dark:text-[#E9BD36] group-hover:w-full transition-all duration-500 ease-out" />
                  </div>

                  <div className="space-y-2 text-left">
                    <div className="flex items-baseline gap-0.5 text-brand-dark dark:text-white">
                      <span className="font-heading font-black text-3xl sm:text-4xl tracking-tighter leading-none">
                        <DigitTicker value={b.metric} />
                      </span>
                    </div>
                    <h3 className="font-heading text-base font-extrabold text-brand-dark dark:text-white mt-2 transition-colors duration-300 group-hover:text-brand-blue dark:group-hover:text-brand-yellow">
                      {b.title}
                    </h3>
                    <p className="text-xs font-sans text-brand-zinc-550 dark:text-zinc-400 leading-relaxed font-normal">
                      {b.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-zinc-150 dark:border-white/5 flex items-center justify-between text-brand-blue dark:text-brand-yellow font-mono text-[9px] font-black uppercase tracking-wider mt-5">
                    <span>Guaranteed Outcome</span>
                    <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 06. OUR PROCESS (6 Steps) ── */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-zinc-50/15 dark:bg-[#0c0b18]/10 border-b border-brand-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <div className="flex justify-center">
              <span className="eyebrow-pill">{service.process.eyebrow}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.12]">
              {service.process.titleIntro}
              <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1 ml-1 font-black">
                {service.process.titleHighlight}
                <svg className="absolute -bottom-1.5 left-0 w-full h-3.5 pointer-events-none text-brand-yellow opacity-90" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <motion.path
                    d="M 2 5 Q 50 1.5, 98 3.5 C 99 3.5, 99 4.5, 98 5 Q 50 7, 2 5.5 Z"
                    fill="currentColor"
                    custom={{ delay: 0.3, duration: 0.65 }}
                    variants={drawVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  />
                </svg>
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {service.process.steps.map((step: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex flex-col gap-4 text-left relative z-15 group"
              >
                {/* Step Circle indicator */}
                <div className="h-10 w-10 rounded-full bg-brand-blue dark:bg-brand-yellow text-white dark:text-[#080710] flex items-center justify-center font-mono font-black text-xs shadow-md shrink-0 border border-white/20 group-hover:scale-105 transition-transform duration-300">
                  {step.num}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-heading text-[15px] font-extrabold text-brand-dark dark:text-white leading-tight group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-xs font-sans text-brand-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-5 left-8 right-8 h-[1px] bg-brand-zinc-200 dark:bg-zinc-800 -z-0" />
          </div>

        </div>
      </section>

      {/* ── 07. RESULTS (Metrics / Outcomes) ── */}
      <section className="relative overflow-hidden py-16 md:py-20 border-b border-brand-zinc-200 dark:border-white/10 bg-[#F9FAFB]/50 dark:bg-[#0c0b18]/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left side text info */}
            <div className="lg:col-span-5 text-left space-y-6 lg:sticky lg:top-28">
              <div className="space-y-4">
                <span className="eyebrow-pill">{service.results.eyebrow}</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-black text-brand-dark dark:text-white leading-[1.15]">
                  {service.results.titleIntro}
                  <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic block mt-1">
                    {service.results.titleHighlight}
                  </span>
                </h2>
                <p className="text-xs sm:text-sm font-sans text-brand-zinc-650 dark:text-zinc-350 leading-relaxed font-normal">
                  Verifiable metric indicators driven by precise performance scaling and custom coding.
                </p>
              </div>

              {/* Collapsed Case Studies */}
              <div className="space-y-4 pt-4 border-t border-brand-zinc-200 dark:border-white/15">
                <h4 className="font-mono text-[9px] font-black uppercase text-brand-zinc-400 tracking-widest">
                  Featured Case Studies
                </h4>
                {service.results.caseStudies.map((cs: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#12121e]/50 border border-brand-zinc-200/60 dark:border-white/5 text-xs text-left space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="font-heading font-extrabold text-brand-dark dark:text-white">{cs.title}</span>
                    </div>
                    <p className="text-brand-zinc-550 dark:text-zinc-400 font-normal leading-relaxed">
                      {cs.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side stats counters */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {service.results.metrics.map((metric: any, idx: number) => (
                <div key={idx} className="bg-white dark:bg-[#0c0b18] border border-brand-zinc-200 dark:border-white/5 p-6 rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:-translate-y-1 hover:border-brand-blue/30 dark:hover:border-brand-yellow/30 transition-all duration-300 group min-h-[170px] relative overflow-hidden">
                  
                  {/* Underline indicators that grow on hover */}
                  <div className="relative flex items-center justify-between w-full pb-2 mb-3">
                    <Trophy className="h-4.5 w-4.5 text-brand-blue dark:text-brand-yellow transition-transform duration-300 group-hover:rotate-[15deg]" />
                    <span className="text-[8px] font-mono tracking-widest text-brand-zinc-400 dark:text-zinc-500 select-none">M0{idx + 1}</span>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-zinc-150 dark:bg-white/5" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-blue dark:bg-brand-yellow group-hover:w-full transition-all duration-500 ease-out" />
                  </div>

                  <div className="text-left space-y-1">
                    <span className="block font-heading font-black text-3xl sm:text-4xl text-brand-dark dark:text-white leading-none">
                      <DigitTicker value={metric.value} />
                    </span>
                    <span className="block font-mono text-[9px] font-black uppercase text-brand-blue dark:text-brand-yellow tracking-widest pt-1">{metric.label}</span>
                    <span className="block text-[11px] font-sans text-brand-zinc-550 dark:text-zinc-400 pt-1 leading-snug font-normal">{metric.desc}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── 08. INDUSTRIES WE SERVE ── */}
      <section className="relative overflow-hidden py-20 md:py-24 border-b border-brand-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 space-y-4"
          >
            <div className="flex justify-center">
              <span className="eyebrow-pill">{service.industries.eyebrow}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.12]">
              {service.industries.titleIntro}
              <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1 ml-1 font-black">
                {service.industries.titleHighlight}
                <svg className="absolute -bottom-1.5 left-0 w-full h-3.5 pointer-events-none text-brand-yellow opacity-90" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <motion.path
                    d="M 2 5 Q 50 1.5, 98 3.5 C 99 3.5, 99 4.5, 98 5 Q 50 7, 2 5.5 Z"
                    fill="currentColor"
                    custom={{ delay: 0.3, duration: 0.65 }}
                    variants={drawVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  />
                </svg>
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.industries.list.map((ind: any, idx: number) => {
              // Custom icons for visual interest
              const indIcons = [Globe, Cpu, Building2, ShoppingCart, Star, Briefcase];
              const IndustryIcon = indIcons[idx % indIcons.length];

              return (
                <SpotlightCard key={idx} className="bg-zinc-50/80 dark:bg-[#0c0b18] border border-brand-zinc-200/90 dark:border-white/5 p-6 rounded-[24px] hover:shadow-xl hover:border-brand-blue/30 dark:hover:border-brand-yellow/30 transition-all duration-300 flex items-start gap-4 text-left group">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 dark:bg-brand-yellow/10 flex items-center justify-center shrink-0 text-brand-blue dark:text-brand-yellow border border-brand-blue/15 dark:border-brand-yellow/15 group-hover:scale-105 transition-transform duration-300">
                    <IndustryIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-base font-extrabold text-brand-dark dark:text-white">
                      {ind.title}
                    </h3>
                    <p className="text-xs font-sans text-brand-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {ind.desc}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 09. TOOLS & TECHNOLOGY ── */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-zinc-50/10 dark:bg-[#0c0b18]/10 border-b border-brand-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="text-left space-y-3">
              <span className="eyebrow-pill">{service.tools.eyebrow}</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-brand-dark dark:text-white tracking-tight leading-tight">
                {service.tools.titleIntro}
                <span className="text-brand-blue dark:text-brand-yellow ml-1 font-black">
                  {service.tools.titleHighlight}
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-sans text-brand-zinc-655 dark:text-zinc-300 max-w-xs leading-relaxed text-left font-normal">
              Advanced software platforms and modern frameworks powering our campaigns and designs.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-start">
            {service.tools.list.map((tool: any, idx: number) => {
              const ToolIcon = iconMap[tool.iconName] || Search;
              return (
                <div key={idx} className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white dark:bg-[#12121e] border border-brand-zinc-200 dark:border-white/10 shadow-sm hover:border-brand-blue/35 dark:hover:border-brand-yellow/35 hover:-translate-y-0.5 transition-all duration-300 font-mono text-xs font-black uppercase text-brand-dark dark:text-white group cursor-default">
                  <ToolIcon className="w-4.5 h-4.5 text-brand-blue dark:text-brand-yellow group-hover:scale-105 transition-transform duration-300" />
                  <span>{tool.name}</span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 10. WHY CHOOSE US (Differentiators) ── */}
      <section className="relative overflow-hidden py-20 md:py-24 border-b border-brand-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Col: Info */}
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="eyebrow-pill">{service.whyChooseUs.eyebrow}</span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.12]">
                {service.whyChooseUs.titleIntro}
                <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic block mt-1">
                  {service.whyChooseUs.titleHighlight}
                </span>
              </h2>
              <p className="text-sm font-sans text-brand-zinc-650 dark:text-zinc-350 leading-relaxed font-normal max-w-md">
                We design fully custom solutions engineered around revenue metrics, performance, and transparency.
              </p>
            </div>

            {/* Right Col: Grid of 4 */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 text-left">
              {service.whyChooseUs.list.map((item: any, idx: number) => (
                <div key={idx} className="bg-zinc-50/70 dark:bg-[#0c0b18] border border-brand-zinc-200/90 dark:border-white/5 p-6 rounded-[24px] shadow-sm hover:shadow-xl hover:border-brand-blue/30 dark:hover:border-brand-yellow/30 transition-all duration-300 group relative overflow-hidden">
                  
                  {/* Indicator bottom line */}
                  <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0306AC] dark:bg-[#E9BD36] group-hover:w-full transition-all duration-500 ease-out" />

                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-650 dark:text-emerald-400 mb-4 border border-emerald-500/15 group-hover:scale-105 transition-transform duration-300">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-heading text-base font-extrabold text-brand-dark dark:text-white transition-colors duration-300 group-hover:text-brand-blue dark:group-hover:text-brand-yellow">
                      {item.title}
                    </h3>
                    <p className="text-xs font-sans text-brand-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── 11. RECOMMENDED SERVICES ── */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-zinc-50/10 dark:bg-[#0c0b18]/15 border-b border-brand-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 space-y-4"
          >
            <div className="flex justify-center">
              <span className="eyebrow-pill">11 // RECOMMENDATION</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.12]">
              Services That Pair
              <span className="relative inline-block text-brand-blue dark:text-brand-yellow pb-1 ml-2 font-black font-serif italic font-normal">
                Perfect Together
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-zinc-550 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Scale faster by pairing multi-channel growth campaigns and high-performance visual coding solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {recommendedServices.map((recSrv, idx) => (
              <Link key={idx} href={`/services/${recSrv.slug}`} className="w-full flex flex-col group/rec cursor-pointer">
                <SpotlightCard className="bg-zinc-50/80 dark:bg-[#0c0b18] border border-brand-zinc-200/90 dark:border-white/10 p-7 rounded-[30px] hover:shadow-2xl group-hover/rec:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full min-h-[220px]">
                  <div className="space-y-4 text-left">
                    <span className="font-mono text-[10px] font-black text-brand-blue/60 dark:text-brand-yellow/60 uppercase tracking-widest block">
                      Recommended 0{idx + 1}
                    </span>
                    <h3 className="font-heading text-lg font-black text-brand-dark dark:text-white group-hover/rec:text-brand-blue dark:group-hover/rec:text-brand-yellow transition-colors duration-300 leading-snug">
                      {recSrv.title}
                    </h3>
                    <p className="text-xs font-sans text-brand-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {recSrv.desc}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-5 border-t border-brand-zinc-150 dark:border-white/5 transition-colors duration-300 mt-6">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 text-brand-zinc-600 dark:text-zinc-450 group-hover/rec:text-brand-blue dark:group-hover/rec:text-brand-yellow">
                      View Service
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/rec:translate-x-1" />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── 12. MAP SECTION ── */}
      <section className="relative overflow-hidden py-16 sm:py-20 border-b border-brand-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left map */}
            <div className="lg:col-span-8 bg-white dark:bg-[#12121e] border border-brand-zinc-200/90 dark:border-white/10 rounded-[28px] overflow-hidden shadow-lg min-h-[380px] relative group">
              <iframe
                title="Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.217709322237!2d-73.98785312342557!3d40.75797477138596!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-[1.05] grayscale-[0.2] dark:invert-[0.9] dark:hue-rotate-180"
              />
              <div className="absolute top-4 left-4 bg-brand-dark/95 dark:bg-black/95 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2 border border-white/20 shadow-xl">
                <MapPin className="w-4 h-4 text-brand-yellow" />
                <span>New York HQ</span>
              </div>
            </div>

            {/* Right details */}
            <div className="lg:col-span-4 bg-zinc-50/90 dark:bg-[#0c0b18]/95 border border-brand-zinc-200/90 dark:border-white/10 p-8 rounded-[28px] shadow-lg flex flex-col justify-between space-y-6">
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2 text-brand-blue dark:text-brand-yellow font-mono text-xs font-black uppercase tracking-widest">
                  <MapPin className="w-4 h-4" />
                  <span>12 // OFFICE NODE</span>
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-brand-dark dark:text-white leading-tight">
                  Times Square Node
                </h3>
                <p className="text-xs sm:text-sm font-sans text-brand-zinc-650 dark:text-zinc-350 leading-relaxed font-normal">
                  123 Business St, Suite 100 <br /> New York, NY 10001, USA
                </p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-brand-zinc-200/80 dark:border-white/10 text-xs font-sans text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 dark:bg-brand-yellow/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-brand-blue dark:text-brand-yellow" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark dark:text-white">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-[10px] text-brand-zinc-500">Sat - Sun: Closed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 dark:bg-brand-yellow/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-brand-blue dark:text-brand-yellow" />
                  </div>
                  <a href="tel:+11234567890" className="font-bold text-brand-dark dark:text-white hover:text-brand-blue dark:hover:text-brand-yellow transition-colors">
                    +1 (123) 456-7890
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 dark:bg-brand-yellow/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-brand-blue dark:text-brand-yellow" />
                  </div>
                  <a href="mailto:hello@mohsingdesigns.com" className="font-bold text-brand-dark dark:text-white hover:text-brand-blue dark:hover:text-brand-yellow transition-colors">
                    hello@mohsingdesigns.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 13. FAQ SECTION ── */}
      <FAQ
        data={{
          sectionTag: "13 // FREQUENTLY ASKED",
          titleIntro: "Service ",
          titleHighlight: "FAQ",
          list: service.faqs.map((f: any) => ({
            category: service.title,
            question: f.q,
            answer: f.a
          }))
        }}
      />

      {/* ── 14. FINAL CTA BANNER ── */}
      <section className="my-10 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cta-banner-card !shadow-[0_16px_40px_-12px_rgba(3,6,172,0.22)] dark:!shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
          >
            {/* Left text */}
            <div className="relative z-10 flex flex-col justify-center gap-5 p-7 sm:p-11 lg:p-14 lg:max-w-[62%] text-left">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-[10px] font-mono tracking-widest text-[#E9BD36] font-extrabold uppercase w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9BD36] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E9BD36]" />
                </span>
                {service.finalCta.eyebrow}
              </div>

              {/* Headline */}
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-black leading-[1.25] tracking-tight text-white">
                {service.finalCta.titleIntro}{" "}
                <span className="relative inline-block">
                  <span className="font-cursive text-[#E9BD36] text-3xl sm:text-4xl lg:text-[46px] font-normal pl-1">
                    {service.finalCta.titleHighlight}
                  </span>
                  <svg className="absolute left-0 bottom-[-2px] w-full h-3 text-[#E9BD36]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M 5 6 C 30 9, 70 9, 95 4" />
                  </svg>
                </span>{" "}
                <br />
                {service.finalCta.titleLine2}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm font-sans text-white/90 leading-relaxed max-w-lg font-normal">
                {service.finalCta.description}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4 flex-wrap pt-2">
                <a href="#contact-form" className="btn-primary-cta">
                  <span>Schedule Discovery Session</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>
                <a href="/contact" className="btn-secondary-cta">
                  <span>Contact Office</span>
                  <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
                </a>
              </div>
            </div>

            {/* Right Side Portrait & Arch Graphic */}
            <div className="hidden lg:flex flex-1 items-end justify-center relative pr-8">
              <div className="absolute bottom-0 w-[320px] h-[320px] bg-gradient-to-t from-[#020485] to-[#0408d9] rounded-full opacity-90 border border-white/20 shadow-2xl" />
              <div className="relative z-10 w-[280px] h-[370px] self-end drop-shadow-2xl overflow-hidden rounded-t-[32px] border-t border-l border-r border-white/25 shadow-2xl">
                <Image
                  src="/founder_portrait_nobg.png"
                  alt="Founder Strategy Session"
                  width={320}
                  height={420}
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010356]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute top-16 right-28 h-3.5 w-3.5 rounded-full bg-[#E9BD36] shadow-[0_0_15px_#E9BD36] z-20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cursive Font Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }
      `}} />
    </main>
  );
}
