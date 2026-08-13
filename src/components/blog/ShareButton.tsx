"use client";

import { useState } from "react";
import { Copy, Check, Share2, Linkedin, Twitter, Facebook } from "lucide-react";

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-brand-zinc-100 dark:bg-zinc-800 text-brand-dark dark:text-white hover:bg-brand-blue hover:text-white dark:hover:bg-brand-yellow dark:hover:text-brand-dark transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-500" /> Copied!
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" /> Share Article
          </>
        )}
      </button>
    </div>
  );
}
