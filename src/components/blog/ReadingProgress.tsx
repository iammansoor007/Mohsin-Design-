"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollCompletion);
    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []);

  return (
    <div
      style={{ transform: `translateX(${completion - 100}%)` }}
      className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-yellow z-50 transition-transform duration-150 ease-out pointer-events-none"
    />
  );
}
