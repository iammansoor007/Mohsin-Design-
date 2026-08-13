import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  Calendar,
  User,
  Tag as TagIcon,
  Clock,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  ChevronLeft,
  Star
} from "lucide-react";

import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareButton from "@/components/blog/ShareButton";
import blogData from "@/data/blogData.json";
import "../blog.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.blogPosts.find(
    (p) => p.slug === slug || String(p.id) === slug
  );

  if (!post) return { title: "Post Not Found | 360 Designs Agency" };

  return {
    title: {
      absolute: `${post.title} | 360 Designs Agency`
    },
    description: post.desc,
    openGraph: {
      title: post.title,
      description: post.desc,
      type: "article",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.desc,
      images: [post.image]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = blogData.blogPosts.find(
    (p) => p.slug === slug || String(p.id) === slug
  );

  if (!post) notFound();

  // Combine post content sections into formatted html for TOC calculation
  const rawHtmlContent = post.content
    ? post.content
        .map((sec) => `<h2>${sec.heading}</h2><p>${sec.text}</p>`)
        .join("")
    : `<p>${post.desc}</p>`;

  const wordCount = rawHtmlContent.replace(/<[^>]*>/g, "").split(/\s+/).length;

  // Schema.org Graph JSON-LD
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": post.title,
        "description": post.desc,
        "datePublished": post.date,
        "author": {
          "@type": "Person",
          "name": post.author?.name || "Mohsin",
          "jobTitle": post.author?.role || "Founder & Creative Director"
        },
        "publisher": {
          "@type": "Organization",
          "name": "360 Designs Agency"
        },
        "image": post.image,
        "wordCount": wordCount,
        "inLanguage": "en-US"
      }
    ]
  };

  // Automated Table of Contents Logic
  let tableOfContents: { id: string; text: string; level: number }[] = [];
  let processedContent = rawHtmlContent;

  const headingRegex = /<(h[123])>(.*?)<\/h[123]>/gi;
  let match;
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  while ((match = headingRegex.exec(rawHtmlContent)) !== null) {
    const tag = match[1].toLowerCase();
    const text = match[2].replace(/<[^>]*>/g, "");
    const id = slugify(text);

    const finalTag = tag === "h1" ? "h2" : tag;
    const level = parseInt(finalTag[1]);

    tableOfContents.push({ id, text, level });

    const originalTag = match[0];
    const newTag = `<${finalTag} id="${id}" class="scroll-mt-32 font-heading text-2xl sm:text-3xl font-black text-brand-dark dark:text-white mt-12 mb-4 leading-snug">${match[2]}</${finalTag}>`;
    processedContent = processedContent.replace(originalTag, newTag);
  }

  // Related posts (excluding current)
  const relatedPosts = blogData.blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-white dark:bg-[#080710] text-brand-dark dark:text-white transition-colors duration-300 pb-24 relative overflow-x-clip font-sans">
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <ReadingProgress />

      {/* ── 1. HERO SECTION WITH FULL BLEED BACKGROUND ────────────────── */}
      <section className="-mt-[110px] sm:-mt-[125px] lg:-mt-[140px] pt-[140px] sm:pt-[160px] lg:pt-[175px] pb-10 sm:pb-14 relative overflow-hidden border-b border-brand-zinc-200 dark:border-white/10">
        {/* Background Graphic Bleed */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <img
            src="/portfolio_hero_bg.png"
            alt="Header Background"
            className="w-full h-full object-cover object-right opacity-100 dark:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-[#080710] dark:via-[#080710]/90 dark:to-transparent pointer-events-none" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 w-full">
          {/* Breadcrumb Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-zinc-500 dark:text-zinc-400 mb-5">
            <Link href="/" className="hover:text-brand-blue dark:hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <span className="text-brand-zinc-300 dark:text-zinc-600">/</span>
            <Link href="/blog" className="hover:text-brand-blue dark:hover:text-brand-yellow transition-colors">
              Blog
            </Link>
            <span className="text-brand-zinc-300 dark:text-zinc-600">/</span>
            <span className="text-brand-blue dark:text-brand-yellow font-black">{post.badge}</span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white leading-[1.18] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-brand-blue text-white shadow-md">
              <Star className="w-3 h-3 fill-current" />
              {post.badge}
            </span>

            <span className="inline-flex items-center gap-1.5 text-brand-zinc-500 dark:text-zinc-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-brand-blue dark:text-brand-yellow" />
              {post.date}
            </span>

            <span className="inline-flex items-center gap-1.5 font-mono font-bold text-brand-blue dark:text-brand-yellow">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime || `${Math.ceil(wordCount / 200)} min read`}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Cover Image Container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8 sm:mt-10 relative z-20">
        <div className="bg-white dark:bg-[#12121e] rounded-[28px] overflow-hidden shadow-xl border border-brand-zinc-200/90 dark:border-white/10 aspect-[21/9] relative group">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Left: Blog Content */}
            <div className="lg:w-[65%] min-w-0">

              {/* Author Attribution Card */}
              {post.author && (
                <div className="flex flex-col min-[400px]:flex-row items-center gap-5 mb-12 p-6 min-[400px]:p-8 bg-brand-zinc-50 dark:bg-zinc-900/60 border border-brand-zinc-200 dark:border-white/10 rounded-2xl min-[400px]:rounded-3xl">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl border-2 border-brand-blue dark:border-brand-yellow">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-brand-blue dark:text-brand-yellow mb-1 block">
                      Article Strategist
                    </span>
                    <h4 className="text-xl font-bold text-brand-dark dark:text-white leading-tight">
                      {post.author.name}
                    </h4>
                    <p className="text-brand-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-0.5 font-medium">
                      {post.author.role}
                    </p>
                  </div>
                </div>
              )}

              {/* Main Content Body */}
              <div
                className="prose prose-slate dark:prose-invert max-w-none 
                prose-headings:font-heading prose-headings:font-black prose-headings:text-brand-dark dark:prose-headings:text-white
                prose-p:text-brand-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg
                prose-a:text-brand-blue dark:prose-a:text-brand-yellow prose-a:font-bold prose-a:no-underline"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* End of Main Content Body */}
            </div>

            {/* Right: Sticky Table of Contents (Sidebar) */}
            <aside className="lg:w-[35%] shrink-0 lg:sticky lg:top-28">
              <div className="space-y-6 md:space-y-8">

                <div className="bg-white dark:bg-[#12121e] border border-brand-zinc-200 dark:border-white/10 rounded-2xl md:rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-zinc-200 dark:border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-brand-blue/10 dark:bg-brand-yellow/10 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-brand-blue dark:text-brand-yellow" />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono font-black uppercase tracking-widest text-brand-dark dark:text-white">
                        Navigation
                      </h3>
                      <p className="text-[9px] text-brand-zinc-400 font-bold uppercase tracking-widest mt-0.5">
                        Quick Select
                      </p>
                    </div>
                  </div>

                  {tableOfContents.length > 0 ? (
                    <nav className="space-y-1">
                      {tableOfContents.map((item, idx) => (
                        <a
                          key={idx}
                          href={`#${item.id}`}
                          className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl transition-all duration-300 group ${
                            item.level === 1
                              ? "text-brand-dark dark:text-white font-bold hover:bg-brand-blue/10 dark:hover:bg-brand-yellow/10 hover:text-brand-blue dark:hover:text-brand-yellow"
                              : "pl-8 text-brand-zinc-500 dark:text-zinc-400 hover:text-brand-blue dark:hover:text-brand-yellow"
                          }`}
                        >
                          <div
                            className={`shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              item.level === 1
                                ? "bg-brand-blue dark:bg-brand-yellow scale-100"
                                : "bg-brand-zinc-300 dark:bg-zinc-700 scale-75 group-hover:bg-brand-blue group-hover:scale-100"
                            }`}
                          />
                          <span className="text-xs sm:text-sm line-clamp-1">
                            {item.text}
                          </span>
                        </a>
                      ))}
                    </nav>
                  ) : (
                    <p className="text-xs text-brand-zinc-400 italic py-4">
                      Detailed structure available above.
                    </p>
                  )}

                  <div className="mt-6 pt-6 border-t border-brand-zinc-200 dark:border-white/10">
                    <p className="text-[10px] font-mono font-black uppercase tracking-widest text-brand-zinc-400 mb-3">
                      Engage
                    </p>
                    <ShareButton title={post.title} url={slug} />
                  </div>
                </div>

                {/* Sidebar Agency CTA Box */}
                <div className="bg-gradient-to-br from-[#0306AC] via-[#020485] to-[#010356] dark:from-[#12121e] dark:via-[#161628] dark:to-[#0d0c18] border border-white/10 dark:border-white/10 rounded-[2rem] p-7 text-white relative overflow-hidden group shadow-2xl dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] space-y-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/15 dark:bg-brand-yellow/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-yellow/25 transition-colors duration-700 pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9.5px] font-mono font-black uppercase bg-white/10 dark:bg-brand-yellow/15 text-brand-yellow border border-white/20 dark:border-brand-yellow/30">
                    <Star className="w-3 h-3 fill-current" /> EXPERT CONSULTATION
                  </span>
                  <h4 className="font-heading text-2xl font-black text-white leading-tight">
                    Scale Your Organic Revenue Today
                  </h4>
                  <p className="text-white/80 dark:text-zinc-300 text-xs leading-relaxed font-sans font-normal">
                    Get a custom local SEO and web architecture strategy tailored for your business.
                  </p>
                  <Link
                    href="/#contact"
                    className="btn-primary-cta w-full justify-center text-xs py-3.5 mt-2"
                  >
                    <span>GET FREE ESTIMATE</span>
                    <span className="btn-icon">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </div>

      {/* ── 4. RELATED ARTICLES SECTION ───────────────────────────── */}
      <section className="container mx-auto px-4 my-20 pt-12 border-t border-brand-zinc-200 dark:border-white/10 max-w-6xl">
        <div className="text-left mb-8 space-y-2">
          <span className="text-xs font-mono font-black uppercase text-brand-blue dark:text-brand-yellow tracking-widest">
            EXPLORE MORE INSIGHTS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-brand-dark dark:text-white">
            Related Articles & Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((rPost) => (
            <Link
              key={rPost.id}
              href={`/blog/${rPost.slug || rPost.id}`}
              className="bg-white dark:bg-[#12121e] border border-brand-zinc-200/90 dark:border-white/10 hover:border-brand-blue/60 dark:hover:border-brand-yellow/60 rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between group select-none relative block cursor-pointer"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-brand-light dark:bg-zinc-950 border-b border-brand-zinc-200/80 dark:border-white/10">
                  <img
                    src={rPost.image}
                    alt={rPost.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-brand-blue text-white shadow-md">
                    <Star className="w-3 h-3 fill-current" />
                    {rPost.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-black text-brand-dark dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-yellow transition-colors leading-snug">
                    {rPost.title}
                  </h3>
                </div>
              </div>

              <div className="px-6 pb-6 flex items-center justify-between text-xs font-sans">
                <span className="text-brand-zinc-400 dark:text-zinc-400 font-medium">
                  {rPost.date}
                </span>
                <span className="font-mono font-bold text-brand-blue dark:text-brand-yellow flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {rPost.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. SIGNATURE AGENCY CTA BANNER ─────────────────────────── */}
      <section id="contact" className="container mx-auto px-4 my-8 relative overflow-hidden max-w-6xl">
        <div className="cta-banner-card !shadow-[0_16px_40px_-12px_rgba(3,6,172,0.22)] dark:!shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]">
          <div className="relative z-10 flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14 lg:max-w-[62%]">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-[10px] font-mono tracking-widest text-[#E9BD36] font-extrabold uppercase w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9BD36] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E9BD36]" />
              </span>
              {blogData.detailCtaBanner.eyebrow}
            </div>

            {/* Headline */}
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.18] tracking-tight text-white">
              {blogData.detailCtaBanner.titleIntro} <br className="hidden sm:block" />
              <span className="whitespace-nowrap inline-block">
                {blogData.detailCtaBanner.titleLine2}{" "}
                <span className="relative inline-block">
                  <span className="font-cursive text-[#E9BD36] text-3xl sm:text-4xl lg:text-5xl font-normal pl-1">
                    {blogData.detailCtaBanner.titleHighlight}
                  </span>
                  <svg className="absolute left-0 bottom-[-2px] w-full h-3 text-[#E9BD36]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M 5 6 C 30 9, 70 9, 95 4" />
                  </svg>
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base font-sans text-white/90 font-normal leading-relaxed max-w-lg">
              {blogData.detailCtaBanner.description}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <a href={blogData.detailCtaBanner.ctaPrimary.href} className="btn-primary-cta">
                <span>{blogData.detailCtaBanner.ctaPrimary.label}</span>
                <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
              </a>

              <a href={blogData.detailCtaBanner.ctaSecondary.href} className="btn-secondary-cta">
                <span>{blogData.detailCtaBanner.ctaSecondary.label}</span>
                <span className="btn-icon"><ArrowRight className="h-3.5 w-3.5" /></span>
              </a>
            </div>
          </div>

          {/* Right Side Portrait & Arch Graphic */}
          <div className="hidden lg:flex flex-1 items-end justify-center relative pr-8">
            <div className="absolute bottom-0 w-[320px] h-[320px] bg-gradient-to-t from-[#020485] to-[#0408d9] rounded-full opacity-90 border border-white/20 shadow-2xl" />
            <div className="relative z-10 w-[280px] h-[370px] self-end drop-shadow-2xl overflow-hidden rounded-t-[32px] border-t border-l border-r border-white/25 shadow-2xl">
              <Image
                src={blogData.detailCtaBanner.portraitSrc}
                alt={blogData.detailCtaBanner.portraitAlt}
                width={320}
                height={420}
                className="w-full h-full object-cover object-top filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010356]/80 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute top-16 right-28 h-3.5 w-3.5 rounded-full bg-[#E9BD36] shadow-[0_0_15px_#E9BD36] z-20" />
          </div>
        </div>
      </section>
    </article>
  );
}
