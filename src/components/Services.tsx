"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import content from "@/data/content.json";

// Helper function to return the SVG illustration with dynamically injected text from content.json
const getServiceIllustration = (num: string, s: any) => {
  switch (num) {
    case "01":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20h160M20 50h160M20 80h160" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <path d="M40 10v100M80 10v100M120 10v100M160 10v100" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <g transform="translate(25, 20)">
            <rect width="150" height="85" rx="6" stroke="currentColor" strokeWidth="2" fill="none" />
            <rect width="150" height="15" fill="currentColor" opacity="0.08" rx="6" />
            <circle cx="8" cy="7.5" r="2.5" fill="currentColor" opacity="0.4" />
            <circle cx="16" cy="7.5" r="2.5" fill="currentColor" opacity="0.4" />
            <circle cx="24" cy="7.5" r="2.5" fill="currentColor" opacity="0.4" />
            <rect x="40" y="4" width="70" height="7" rx="3" fill="currentColor" opacity="0.15" />
            <path d="M15 65 L45 55 L75 62 L105 38 L135 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 65 L45 55 L75 62 L105 38 L135 45 V75 H15 Z" fill="currentColor" opacity="0.05" />
            <circle cx="105" cy="38" r="4.5" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="75" cy="62" r="3" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
            <rect x="15" y="24" width="55" height="4" rx="2" fill="currentColor" opacity="0.3" />
            <rect x="15" y="32" width="35" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
          </g>
          <g className="animate-float" transform="translate(130, 60)">
            <circle cx="15" cy="15" r="12" stroke="currentColor" strokeWidth="2.5" fill="white" className="group-hover:fill-brand-blue transition-colors duration-500" />
            <circle cx="15" cy="15" r="8" fill="#E9BD36" opacity="0.3" />
            <line x1="24" y1="24" x2="33" y2="33" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="animate-float-delayed" transform="translate(135, 12)">
            <rect width="45" height="15" rx="7.5" fill="currentColor" />
            <text x="22.5" y="10" textAnchor="middle" fill="#E9BD36" className="group-hover:fill-brand-blue font-mono font-black" fontSize="7">{s.svgRank}</text>
          </g>
        </svg>
      );
    case "02":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(25, 15)">
            <rect width="150" height="90" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M 0 35 L 150 35 M 0 65 L 150 65 M 45 0 L 45 90 M 105 0 L 105 90" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
            <path d="M 20 0 Q 30 45, 10 90 M 120 0 Q 135 45, 125 90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
            <g transform="translate(75, 35)">
              <circle cx="0" cy="10" r="16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" className="animate-pulse" />
              <circle cx="0" cy="10" r="8" fill="#E9BD36" opacity="0.2" className="animate-ping" />
              <path d="M 0 -12 C -6 -12, -10 -8, -10 -2 C -10 6, 0 16, 0 16 C 0 16, 10 6, 10 -2 C 10 -8, 6 -12, 0 -12 Z" fill="currentColor" stroke="none" />
              <circle cx="0" cy="-2" r="3" fill="#E9BD36" className="group-hover:fill-brand-blue" />
            </g>
            <g transform="translate(30, 55)">
              <circle cx="0" cy="0" r="3" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
            </g>
            <g transform="translate(125, 20)">
              <circle cx="0" cy="0" r="3" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
            </g>
            <g className="animate-float" transform="translate(90, 48)">
              <rect width="55" height="35" rx="4" fill="white" stroke="currentColor" strokeWidth="1.5" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-md" />
              <rect x="6" y="6" width="30" height="4" rx="2" fill="currentColor" opacity="0.7" />
              <g transform="translate(6, 14)" fill="#E9BD36">
                <path d="M0 2.5 L1.5 3.5 L1 1.8 L2.3 0.7 L0.6 0.7 L0 -1 L-0.6 0.7 L-2.3 0.7 L-1 1.8 L-1.5 3.5 Z" />
                <path d="M0 2.5 L1.5 3.5 L1 1.8 L2.3 0.7 L0.6 0.7 L0 -1 L-0.6 0.7 L-2.3 0.7 L-1 1.8 L-1.5 3.5 Z" transform="translate(4.5, 0)" />
                <path d="M0 2.5 L1.5 3.5 L1 1.8 L2.3 0.7 L0.6 0.7 L0 -1 L-0.6 0.7 L-2.3 0.7 L-1 1.8 L-1.5 3.5 Z" transform="translate(9, 0)" />
                <path d="M0 2.5 L1.5 3.5 L1 1.8 L2.3 0.7 L0.6 0.7 L0 -1 L-0.6 0.7 L-2.3 0.7 L-1 1.8 L-1.5 3.5 Z" transform="translate(13.5, 0)" />
                <path d="M0 2.5 L1.5 3.5 L1 1.8 L2.3 0.7 L0.6 0.7 L0 -1 L-0.6 0.7 L-2.3 0.7 L-1 1.8 L-1.5 3.5 Z" transform="translate(18, 0)" />
              </g>
              <rect x="6" y="22" width="18" height="6" rx="2" fill="#22c55e" />
              <rect x="28" y="22" width="20" height="6" rx="2" fill="currentColor" opacity="0.15" />
            </g>
          </g>
        </svg>
      );
    case "03":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 15h140M30 45h140M30 75h140" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <g transform="translate(25, 20)" opacity="0.5" className="animate-float-delayed">
            <rect width="60" height="70" rx="6" fill="white" stroke="currentColor" strokeWidth="1.5" className="group-hover:fill-brand-blue/10 transition-colors duration-500" />
            <rect width="60" height="15" fill="currentColor" opacity="0.15" rx="6" />
            <circle cx="10" cy="7.5" r="2.5" fill="currentColor" />
            <circle cx="20" cy="7.5" r="2.5" fill="currentColor" />
            <rect x="10" y="23" width="12" height="10" rx="2" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
            <rect x="26" y="23" width="10" height="10" rx="2" fill="currentColor" opacity="0.2" />
            <rect x="40" y="23" width="10" height="10" rx="2" fill="currentColor" opacity="0.2" />
            <rect x="10" y="38" width="40" height="4" rx="2" fill="currentColor" opacity="0.3" />
            <rect x="10" y="47" width="25" height="4" rx="2" fill="currentColor" opacity="0.3" />
          </g>
          <g transform="translate(75, 10)" className="animate-float">
            <rect width="100" height="95" rx="8" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-lg" />
            <rect x="12" y="12" width="45" height="8" rx="4" fill="currentColor" opacity="0.3" />
            <circle cx="88" cy="16" r="4" fill="#22c55e" />
            <rect x="12" y="32" width="76" height="5" rx="2.5" fill="currentColor" opacity="0.2" />
            <rect x="12" y="44" width="76" height="5" rx="2.5" fill="currentColor" opacity="0.2" />
            <rect x="12" y="56" width="60" height="5" rx="2.5" fill="currentColor" opacity="0.2" />
            <rect x="12" y="68" width="45" height="5" rx="2.5" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
            <rect x="12" y="80" width="30" height="6" rx="2" fill="currentColor" opacity="0.1" />
            <rect x="46" y="80" width="42" height="6" rx="2" fill="currentColor" opacity="0.1" />
          </g>
          <g className="animate-float-reverse" transform="translate(155, 35)">
            <path d="M 0 35 L 20 15 L 25 20 L 5 40 Z" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 0 35 L -3 38 L -3 42 L 1 42 L 5 40 Z" fill="currentColor" />
            <circle cx="22.5" cy="17.5" r="2.5" fill="currentColor" />
            <path d="M -10 42 Q -25 45, -40 38" stroke="#E9BD36" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          </g>
        </svg>
      );
    case "04":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="60" r="55" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="3 3" />
          <circle cx="100" cy="60" r="40" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <g transform="translate(25, 20)">
            <rect width="150" height="85" rx="6" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-md" />
            <rect width="150" height="15" fill="currentColor" opacity="0.08" rx="6" />
            <circle cx="8" cy="7.5" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="15" cy="7.5" r="2" fill="currentColor" opacity="0.4" />
            <rect x="35" y="4" width="80" height="7" rx="3.5" fill="currentColor" opacity="0.12" />
            <g transform="translate(15, 24)">
              <rect width="15" height="9" rx="2.5" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
              <text x="7.5" y="7" textAnchor="middle" fill="currentColor" fontSize="5" fontWeight="bold">{s.svgAd}</text>
              <rect x="20" y="1" width="60" height="6" rx="3" fill="currentColor" opacity="0.4" />
              <rect x="0" y="12" width="120" height="4" rx="2" fill="currentColor" opacity="0.15" />
              <rect x="0" y="20" width="90" height="4" rx="2" fill="currentColor" opacity="0.15" />
            </g>
            <g transform="translate(15, 54)">
              <rect width="15" height="9" rx="2.5" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
              <text x="7.5" y="7" textAnchor="middle" fill="currentColor" fontSize="5" fontWeight="bold">{s.svgAd}</text>
              <rect x="20" y="1" width="50" height="6" rx="3" fill="currentColor" opacity="0.4" />
              <rect x="0" y="12" width="100" height="4" rx="2" fill="currentColor" opacity="0.15" />
            </g>
          </g>
          <g className="animate-float" transform="translate(115, 60)">
            <rect width="65" height="35" rx="6" fill="white" stroke="currentColor" strokeWidth="1.5" className="group-hover:fill-brand-blue/90 group-hover:text-white transition-colors duration-500 shadow-lg" />
            <text x="32.5" y="15" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="bold" opacity="0.7">{s.svgConversions}</text>
            <text x="32.5" y="28" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="black">{s.svgPercent}</text>
          </g>
          <g className="animate-float-delayed" transform="translate(42, 68)">
            <circle cx="0" cy="0" r="18" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue transition-colors duration-500" />
            <circle cx="0" cy="0" r="11" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="currentColor" />
          </g>
        </svg>
      );
    case "05":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 15h150M25 105h150" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <g className="animate-float" transform="translate(35, 10)">
            <rect width="65" height="100" rx="10" fill="white" stroke="currentColor" strokeWidth="3" className="group-hover:fill-brand-blue/5 transition-colors duration-500" />
            <rect x="20" y="0" width="25" height="4" rx="2" fill="currentColor" />
            <circle cx="12" cy="16" r="5" fill="currentColor" opacity="0.2" />
            <rect x="22" y="12" width="25" height="4" rx="2" fill="currentColor" opacity="0.3" />
            <rect x="22" y="19" width="15" height="2" rx="1" fill="currentColor" opacity="0.15" />
            <rect x="6" y="27" width="53" height="40" rx="4" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1" />
            <path d="M12 60 L24 48 L35 56 L50 40 L58 48" stroke="#E9BD36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="74" r="3" fill="#E9BD36" />
            <rect x="18" y="72.5" width="12" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
            <rect x="6" y="81" width="53" height="11" rx="4.5" fill="currentColor" />
            <text x="32.5" y="88.5" textAnchor="middle" fill="#E9BD36" className="group-hover:fill-brand-blue" fontSize="5.5" fontWeight="bold">{s.svgShopNow}</text>
          </g>
          <g className="animate-float-delayed" transform="translate(110, 20)">
            <rect width="65" height="35" rx="6" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-lg" />
            <text x="32.5" y="14" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="bold" opacity="0.6">{s.svgRoasGoal}</text>
            <text x="32.5" y="28" textAnchor="middle" fill="#E9BD36" fontSize="11" fontWeight="black">{s.svgRoas}</text>
          </g>
          <g className="animate-float-reverse" transform="translate(125, 68)">
            <circle cx="-12" cy="12" r="11" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            <text x="-12" y="17" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="black">{s.svgFbLetter}</text>
            <rect x="8" y="1" width="22" height="22" rx="6" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            <rect x="12" y="5" width="14" height="14" rx="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="19" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
            <circle cx="22.5" cy="8.5" r="0.75" fill="currentColor" />
          </g>
        </svg>
      );
    case "06":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="30" r="1.5" fill="#E9BD36" />
          <circle cx="160" cy="90" r="1.5" fill="#E9BD36" />
          <g transform="translate(25, 15)">
            <rect width="90" height="90" rx="8" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue/10 transition-colors duration-500 shadow-md" />
            <rect width="90" height="16" fill="currentColor" opacity="0.08" rx="8" />
            <circle cx="10" cy="8" r="3.5" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
            <rect x="18" y="6" width="30" height="4" rx="2" fill="currentColor" opacity="0.4" />
            <rect x="8" y="24" width="34" height="26" rx="3" fill="currentColor" opacity="0.08" />
            <rect x="48" y="24" width="34" height="26" rx="3" fill="currentColor" opacity="0.08" />
            <rect x="8" y="56" width="34" height="26" rx="3" fill="currentColor" opacity="0.08" />
            <rect x="48" y="56" width="34" height="26" rx="3" fill="currentColor" opacity="0.08" />
            <path d="M 21 34 C 20.5 32.5, 18.5 32.5, 18 34 C 17.5 32.5, 15.5 32.5, 15 34 C 14.5 35.5, 18 39, 18 39 C 18 39, 21.5 35.5, 21 34 Z" fill="#E9BD36" transform="scale(0.8) translate(8, 12)" />
          </g>
          <g className="animate-float" transform="translate(100, 35)">
            <rect width="75" height="55" rx="6" fill="white" stroke="currentColor" strokeWidth="2" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-lg" />
            <text x="10" y="14" fill="currentColor" fontSize="6.5" fontWeight="bold">{s.svgFollowers}</text>
            <rect x="10" y="24" width="6" height="20" rx="2" fill="currentColor" opacity="0.15" />
            <rect x="22" y="20" width="6" height="24" rx="2" fill="currentColor" opacity="0.15" />
            <rect x="34" y="16" width="6" height="28" rx="2" fill="currentColor" opacity="0.15" />
            <rect x="46" y="10" width="6" height="34" rx="2" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
            <rect x="58" y="8" width="6" height="36" rx="2" fill="#22c55e" />
          </g>
          <g className="animate-float-delayed" transform="translate(155, 10)">
            <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 6 10 C 6 10, 10 6, 14 10 L 12 14 L 8 14 Z" fill="currentColor" />
          </g>
        </svg>
      );
    case "07":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="60" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.1" />
          <g transform="translate(25, 20)">
            <rect width="150" height="80" rx="8" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-md" />
            <rect width="150" height="22" fill="currentColor" opacity="0.08" rx="8" />
            <rect x="10" y="6" width="80" height="10" rx="5" fill="currentColor" opacity="0.2" />
            <circle cx="138" cy="11" r="5" fill="#E9BD36" stroke="currentColor" strokeWidth="1.25" />
            <g transform="translate(10, 30)">
              <rect width="70" height="6" rx="3" fill="currentColor" opacity="0.4" />
              <g transform="translate(0, 10)" fill="#E9BD36">
                <path d="M0 2 L1.2 2.8 L0.8 1.4 L1.8 0.5 L0.5 0.5 L0 -1 L-0.5 0.5 L-1.8 0.5 L-0.8 1.4 L-1.2 2.8 Z" />
                <path d="M0 2 L1.2 2.8 L0.8 1.4 L1.8 0.5 L0.5 0.5 L0 -1 L-0.5 0.5 L-1.8 0.5 L-0.8 1.4 L-1.2 2.8 Z" transform="translate(4.5, 0)" />
                <path d="M0 2 L1.2 2.8 L0.8 1.4 L1.8 0.5 L0.5 0.5 L0 -1 L-0.5 0.5 L-1.8 0.5 L-0.8 1.4 L-1.2 2.8 Z" transform="translate(9, 0)" />
                <path d="M0 2 L1.2 2.8 L0.8 1.4 L1.8 0.5 L0.5 0.5 L0 -1 L-0.5 0.5 L-1.8 0.5 L-0.8 1.4 L-1.2 2.8 Z" transform="translate(13.5, 0)" />
                <path d="M0 2 L1.2 2.8 L0.8 1.4 L1.8 0.5 L0.5 0.5 L0 -1 L-0.5 0.5 L-1.8 0.5 L-0.8 1.4 L-1.2 2.8 Z" transform="translate(18, 0)" opacity="0.5" />
                <text x="25" y="3" fill="currentColor" fontSize="6.5" fontWeight="bold">{s.svgReviews}</text>
              </g>
              <g transform="translate(0, 24)">
                <rect width="26" height="15" rx="4" fill="#22c55e" />
                <text x="13" y="10" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">{s.svgCall}</text>
                <rect x="31" width="38" height="15" rx="4" fill="currentColor" opacity="0.1" />
                <text x="50" y="10" fill="currentColor" fontSize="6" fontWeight="bold" textAnchor="middle">{s.svgMaps}</text>
              </g>
            </g>
            <g transform="translate(112, 38)">
              <rect width="26" height="30" rx="4" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1" />
              <circle cx="13" cy="12" r="7.5" fill="#22c55e" />
              <path d="M 10 12 L 12 14 L 16 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="4" y="22" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
            </g>
          </g>
          <g className="animate-float" transform="translate(145, 10)">
            <path d="M 0 -12 C -6 -12, -10 -8, -10 -2 C -10 6, 0 16, 0 16 C 0 16, 10 6, 10 -2 C 10 -8, 6 -12, 0 -12 Z" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="0" cy="-2" r="3.5" fill="currentColor" className="group-hover:fill-brand-blue" />
          </g>
        </svg>
      );
    case "08":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 15h140M30 105h140" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <g transform="translate(15, 15)">
            <rect width="105" height="90" rx="8" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue/15 transition-colors duration-500 shadow-md" />
            <rect width="105" height="15" fill="currentColor" opacity="0.08" rx="8" />
            <circle cx="8" cy="7.5" r="2.5" fill="currentColor" opacity="0.4" />
            <circle cx="16" cy="7.5" r="2.5" fill="currentColor" opacity="0.4" />
            <circle cx="24" cy="7.5" r="2.5" fill="currentColor" opacity="0.4" />
            <g transform="translate(8, 22)">
              <path d="M4 8 L0 11 L4 14 M14 8 L18 11 L14 14" stroke="#E9BD36" strokeWidth="1.5" />
              <rect x="22" y="9" width="30" height="4" rx="2" fill="currentColor" opacity="0.4" />
              <rect x="12" y="20" width="45" height="3.5" rx="1.75" fill="currentColor" opacity="0.2" />
              <rect x="12" y="28" width="60" height="3.5" rx="1.75" fill="#E9BD36" />
              <rect x="12" y="36" width="35" height="3.5" rx="1.75" fill="currentColor" opacity="0.2" />
              <path d="M4 48 L0 51 L4 54 M14 48 L18 51 L14 54" stroke="#E9BD36" strokeWidth="1.5" />
              <rect x="22" y="49" width="20" height="4" rx="2" fill="currentColor" opacity="0.4" />
            </g>
          </g>
          <g className="animate-float" transform="translate(100, 30)">
            <rect width="85" height="75" rx="6" fill="white" stroke="currentColor" strokeWidth="2" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-lg" />
            <rect width="85" height="12" fill="currentColor" opacity="0.05" rx="6" />
            <circle cx="76" cy="6" r="2" fill="#22c55e" />
            <rect x="8" y="20" width="35" height="5" rx="2.5" fill="currentColor" opacity="0.3" />
            <rect x="8" y="29" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
            <g transform="translate(56, 42)">
              <circle cx="0" cy="0" r="18" stroke="currentColor" strokeWidth="3" opacity="0.1" fill="none" />
              <circle cx="0" cy="0" r="18" stroke="#22c55e" strokeWidth="3.5" strokeDasharray="90 100" strokeLinecap="round" fill="none" transform="rotate(-90)" />
              <text x="0" y="3" textAnchor="middle" fill="currentColor" fontSize="8.5" fontWeight="black" fontFamily="sans-serif">{s.svg100}</text>
            </g>
            <text x="8" y="65" fill="#22c55e" fontSize="6.5" fontWeight="bold">{s.svgPerformance}</text>
          </g>
        </svg>
      );
    case "09":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20 20 L 180 20 M 20 100 L 180 100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.1" />
          <g transform="translate(25, 15)">
            <rect width="150" height="90" rx="8" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue/15 transition-colors duration-500 shadow-md" />
            <rect width="32" height="90" fill="currentColor" opacity="0.04" rx="8" />
            <line x1="32" y1="0" x2="32" y2="90" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
            <rect x="6" y="10" width="20" height="4" rx="2" fill="currentColor" opacity="0.3" />
            <rect x="6" y="20" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
            <rect x="6" y="28" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
            <rect x="6" y="36" width="12" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
            <g transform="translate(44, 15)">
              <rect width="94" height="12" rx="4" fill="currentColor" opacity="0.06" />
              <circle cx="10" cy="6" r="3" fill="#E9BD36" />
              <rect x="22" y="4.5" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
              <g transform="translate(0, 22)">
                <rect width="52" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1 1" />
                <rect width="52" height="40" rx="4" fill="currentColor" opacity="0.02" />
                <rect x="-2" y="-2" width="4" height="4" fill="white" stroke="currentColor" strokeWidth="1" />
                <rect x="50" y="-2" width="4" height="4" fill="white" stroke="currentColor" strokeWidth="1" />
                <rect x="-2" y="38" width="4" height="4" fill="white" stroke="currentColor" strokeWidth="1" />
                <rect x="50" y="38" width="4" height="4" fill="white" stroke="currentColor" strokeWidth="1" />
                <circle cx="26" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="26" y1="5" x2="26" y2="35" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.5" />
                <line x1="11" y1="20" x2="41" y2="20" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.5" />
              </g>
              <g className="animate-float" transform="translate(45, 10)">
                <rect width="45" height="15" rx="7.5" fill="white" stroke="currentColor" strokeWidth="1.5" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-md" />
                <text x="22.5" y="9.5" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="bold">{s.svgButton}</text>
              </g>
            </g>
          </g>
          <g className="animate-float-delayed" transform="translate(130, 70)">
            <path d="M 0 0 L 15 15 L 8 16 L 4 22 Z" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          </g>
        </svg>
      );
    case "10":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 20h140M30 100h140" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <g transform="translate(25, 15)">
            <rect width="150" height="90" rx="8" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue/15 transition-colors duration-500 shadow-md" />
            <g transform="translate(25, 20)">
              <path d="M 10 50 C 30 10, 70 10, 90 50" stroke="currentColor" strokeWidth="3" fill="none" />
              <circle cx="36" cy="23" r="3" fill="white" stroke="currentColor" strokeWidth="1.5" />
              <line x1="36" y1="23" x2="30" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="64" cy="23" r="3" fill="white" stroke="currentColor" strokeWidth="1.5" />
              <line x1="64" y1="23" x2="70" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <rect x="8" y="48" width="4" height="4" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
              <rect x="88" y="48" width="4" height="4" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            </g>
            <g className="animate-float" transform="translate(102, 35)">
              <rect width="40" height="48" rx="4" fill="white" stroke="currentColor" strokeWidth="1.5" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-lg" />
              <rect x="5" y="5" width="12" height="12" rx="2" fill="currentColor" />
              <rect x="23" y="5" width="12" height="12" rx="2" fill="#E9BD36" />
              <rect x="5" y="23" width="12" height="12" rx="2" fill="#22c55e" />
              <rect x="23" y="23" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="5" y="40" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
            </g>
            <g transform="translate(6, 12)">
              <rect width="14" height="66" rx="3" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" />
              <circle cx="7" cy="10" r="3" fill="#E9BD36" />
              <circle cx="7" cy="22" r="3" fill="currentColor" opacity="0.3" />
              <circle cx="7" cy="34" r="3" fill="currentColor" opacity="0.3" />
              <path d="M5 52 L9 48 L7 46 Z" fill="currentColor" />
              <rect x="5" y="54" width="4" height="8" rx="1.5" fill="currentColor" opacity="0.4" />
            </g>
          </g>
        </svg>
      );
    case "11":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="100" y1="10" x2="100" y2="110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.15" />
          <line x1="30" y1="60" x2="170" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.15" />
          <g transform="translate(25, 15)">
            <rect width="150" height="90" rx="8" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue/15 transition-colors duration-500 shadow-md" />
            <g className="animate-float" transform="translate(42, 45)">
              <circle cx="-12" cy="0" r="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" fill="none" opacity="0.4" />
              <circle cx="12" cy="0" r="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" fill="none" opacity="0.4" />
              <path d="M 0 -18 A 22 22 0 0 1 12 0 A 22 22 0 0 1 0 18 A 22 22 0 0 1 -12 0 A 22 22 0 0 1 0 -18 Z" fill="#E9BD36" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
              <circle cx="0" cy="0" r="4.5" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            </g>
            <g transform="translate(90, 15)">
              <text x="0" y="15" fill="currentColor" fontSize="12" fontWeight="black" fontFamily="serif">{s.svgAa}</text>
              <rect x="0" y="24" width="50" height="4" rx="2" fill="currentColor" opacity="0.4" />
              <rect x="0" y="32" width="35" height="3.5" rx="1.75" fill="currentColor" opacity="0.2" />
              <circle cx="6" cy="52" r="5" fill="currentColor" />
              <circle cx="20" cy="52" r="5" fill="#E9BD36" stroke="currentColor" strokeWidth="1" />
              <circle cx="34" cy="52" r="5" fill="#22c55e" />
            </g>
          </g>
          <g className="animate-float-delayed" transform="translate(105, 62)">
            <rect width="68" height="38" rx="4" fill="white" stroke="currentColor" strokeWidth="2" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-lg" />
            <circle cx="15" cy="19" r="6" fill="#E9BD36" stroke="currentColor" strokeWidth="1.25" />
            <rect x="26" y="14" width="28" height="4" rx="2" fill="currentColor" opacity="0.6" />
            <rect x="26" y="21" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
          </g>
        </svg>
      );
    case "12":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="60" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 4" opacity="0.1" />
          <g transform="translate(25, 20)">
            <rect width="150" height="80" rx="8" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue/15 transition-colors duration-500 shadow-md" />
            <rect width="150" height="15" fill="currentColor" opacity="0.08" rx="8" />
            <circle cx="8" cy="7.5" r="2.5" fill="currentColor" opacity="0.4" />
            <g className="animate-float" transform="translate(20, 24)">
              <rect width="55" height="38" rx="4" fill="white" stroke="currentColor" strokeWidth="2" className="group-hover:fill-brand-blue transition-colors duration-500" />
              <path d="M 0 4 L 27.5 22 L 55 4" stroke="currentColor" strokeWidth="2" fill="none" />
              <rect x="10" y="24" width="35" height="4" rx="2" fill="#E9BD36" stroke="currentColor" strokeWidth="0.5" />
            </g>
            <g className="animate-float-delayed" transform="translate(85, 30)">
              <rect width="52" height="40" rx="5" fill="white" stroke="currentColor" strokeWidth="1.5" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-lg" />
              <text x="6" y="12" fill="currentColor" fontSize="5.5" fontWeight="bold">{s.svgOpenRate}</text>
              <text x="6" y="24" fill="#22c55e" fontSize="9" fontWeight="black">{s.svgRateValue}</text>
              <path d="M6 32 L16 28 L26 34 L36 26 L46 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
          <g className="animate-float-reverse" transform="translate(145, 12)">
            <circle cx="10" cy="10" r="12" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 5 10 L 15 6 L 12 14 L 10 11 Z" fill="currentColor" />
          </g>
        </svg>
      );
    case "13":
      return (
        <svg className="w-full h-full text-brand-blue group-hover:text-white transition-colors duration-500" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 60h150" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 4" />
          <g transform="translate(32, 15)" opacity="0.65" className="animate-float-delayed">
            <rect width="58" height="90" rx="8" fill="white" stroke="currentColor" strokeWidth="2" className="group-hover:fill-brand-blue/10 transition-colors duration-500" />
            <circle cx="29" cy="5" r="1.5" fill="currentColor" />
            <rect x="6" y="14" width="46" height="66" rx="4" fill="currentColor" opacity="0.05" />
            <circle cx="29" cy="47" r="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
          </g>
          <g transform="translate(85, 10)" className="animate-float">
            <rect width="64" height="98" rx="12" fill="white" stroke="currentColor" strokeWidth="2.5" className="group-hover:fill-brand-blue transition-colors duration-500 shadow-xl" />
            <rect x="20" y="4" width="24" height="5" rx="2.5" fill="currentColor" />
            <rect x="6" y="16" width="52" height="74" rx="8" fill="currentColor" opacity="0.03" />
            <g transform="translate(11, 22)">
              <rect width="42" height="24" rx="4" fill="white" stroke="currentColor" strokeWidth="1.5" className="group-hover:fill-brand-blue transition-colors duration-500" />
              <rect x="6" y="6" width="30" height="4" rx="2" fill="#E9BD36" />
              <rect x="6" y="14" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
            </g>
            <g transform="translate(11, 52)">
              <rect width="42" height="15" rx="4" fill="currentColor" opacity="0.1" />
              <circle cx="8" cy="7.5" r="4" fill="#22c55e" />
            </g>
            <g transform="translate(11, 72)">
              <rect width="42" height="12" rx="6" fill="currentColor" />
              <text x="21" y="8" fill="#E9BD36" fontSize="5" fontWeight="bold" textAnchor="middle">{s.svgDownload}</text>
            </g>
          </g>
          <g className="animate-float-reverse" transform="translate(145, 42)">
            <circle cx="10" cy="10" r="12" fill="#E9BD36" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 6 6 L 14 14 M 14 6 L 6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export default function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, scrollLeft: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { services } = content;

  // Handle Mouse Move for Interactive Background Grid/Dots
  const handleMouseMoveSection = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Handle Drag-to-Scroll on Desktop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e.pageX - carouselRef.current.offsetLeft,
      scrollLeft: carouselRef.current.scrollLeft
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - dragStartPos.current.x) * 1.5; // Drag speed multiplier
    carouselRef.current.scrollLeft = dragStartPos.current.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        const gap = 24; // matches gap-6 (24px)
        carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        const gap = 24;
        carouselRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handleMouseMoveSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0a0a14] py-24 md:py-32 border-t border-brand-zinc-200 dark:border-white/10"
    >

      {/* Local keyframe animations for premium floating, pulsing, and glass sweep reflections */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @keyframes blob-float {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.08); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        .animate-float {
          animation: float 4.5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 5.5s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-float-reverse {
          animation: float-reverse 5s ease-in-out infinite;
        }
        .animate-blob-float {
          animation: blob-float 16s infinite ease-in-out;
        }
        .animate-blob-float-delayed {
          animation: blob-float 20s infinite ease-in-out;
          animation-delay: 4s;
        }
        .carousel-grab-container {
          cursor: grab;
        }
        .carousel-grab-container:active {
          cursor: grabbing;
        }
        /* Awwwards-level diagonal glass sweep glare effect on hover */
        .card-sweep {
          position: relative;
        }
        .card-sweep::before {
          content: '';
          position: absolute;
          top: 0;
          left: -110%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.28) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-28deg);
          transition: left 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 20;
        }
        .group:hover.card-sweep::before {
          left: 160%;
        }
      `}</style>

      {/* crossing structural grid lines */}
      <div className="absolute inset-x-0 top-12 h-[1px] bg-brand-blue/[0.04] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-12 h-[1px] bg-brand-blue/[0.04] pointer-events-none" />
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-brand-blue/[0.04] pointer-events-none" />
      <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-brand-blue/[0.04] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

        {/* Header Section: Title and Navigation aligned beautifully */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-8 md:mb-12"
        >
          <div className="eyebrow-pill self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue dark:bg-brand-yellow opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue dark:bg-brand-yellow" />
            </span>
            {services.sectionTag}
          </div>
          <div className="flex items-center justify-between gap-4 w-full">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.15]">
              {services.titleIntro}{" "}
              <span className="text-brand-blue dark:text-brand-yellow font-serif font-normal italic">
                {services.titleHighlight}
              </span>
            </h2>

            {/* Navigation Controls */}
            <div className="flex gap-2 sm:gap-3 select-none shrink-0">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-brand-zinc-300 dark:border-white/20 text-brand-dark dark:text-white hover:border-brand-blue hover:bg-brand-blue hover:text-white dark:hover:border-brand-yellow dark:hover:bg-brand-yellow dark:hover:text-brand-dark transition-all duration-300 active:scale-95 shadow-sm cursor-pointer"
                aria-label={services.ariaPrev}
              >
                <ArrowLeft className="h-4.5 w-4.5 md:h-5 md:w-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-brand-zinc-300 dark:border-white/20 text-brand-dark dark:text-white hover:border-brand-blue hover:bg-brand-blue hover:text-white dark:hover:border-brand-yellow dark:hover:bg-brand-yellow dark:hover:text-brand-dark transition-all duration-300 active:scale-95 shadow-sm cursor-pointer"
                aria-label={services.ariaNext}
              >
                <ArrowRight className="h-4.5 w-4.5 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
          <p className="text-brand-zinc-500 dark:text-zinc-300 font-medium leading-relaxed text-xs md:text-sm max-w-xl">
            {services.description}
          </p>
        </motion.div>

        {/* Swipeable & Drag-to-Scroll Snap Carousel */}
        <motion.div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none w-full -mx-2 px-2 md:mx-0 md:px-0 py-8 carousel-grab-container select-none"
        >
          {services.list.map((service, index) => {
            return (
              <div
                key={index}
                className="w-[86%] sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shrink-0 snap-start"
              >
                <div
                  className="group relative flex flex-col justify-between rounded-[2rem] border border-brand-blue/20 dark:border-white/10 hover:border-transparent dark:hover:border-brand-blue service-card-bg p-6 xs:p-7 md:p-8 transition-all duration-500 hover:-translate-y-3 h-full min-h-[490px] sm:min-h-[520px] md:min-h-[540px] overflow-hidden shadow-[0_2px_20px_rgba(3, 6, 172,0.04)] hover:shadow-[0_32px_64px_rgba(3, 6, 172,0.28)] dark:hover:shadow-[0_32px_64px_rgba(233, 189, 54,0.08)] cursor-pointer card-sweep"
                >
                  {/* Hover overlay — brand blue full fill (light theme only, remains hidden/inactive in dark theme) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0306AC] via-[#0306AC] to-[#020485] opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity duration-500 z-0 rounded-[2rem]" />

                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[2rem] bg-gradient-to-r from-brand-blue/40 via-brand-blue to-brand-blue/40 transition-all duration-500 group-hover:from-brand-yellow/60 group-hover:via-brand-yellow group-hover:to-brand-yellow/60" />

                  {/* Subtle inner grid dots — normal state only */}
                  <div className="absolute inset-0 opacity-[0.035] group-hover:opacity-0 transition-opacity duration-500 pointer-events-none z-0"
                    style={{ backgroundImage: 'radial-gradient(var(--color-blue) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                  {/* Glowing orb on hover */}
                  <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/10 dark:bg-brand-blue/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-brand-yellow/5 dark:bg-brand-yellow/3 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none z-0" />

                  {/* Giant background number */}
                  <span className="font-heading font-black text-[6rem] md:text-[7rem] absolute -right-2 -top-2 select-none pointer-events-none z-0
                    text-transparent bg-clip-text bg-gradient-to-b from-brand-blue/20 to-transparent
                    group-hover:from-white/15 dark:group-hover:from-brand-blue/20 group-hover:to-transparent transition-all duration-500 leading-none">
                    {service.num}
                  </span>

                  {/* Content — sits above overlays */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex flex-col">

                      {/* Category pill */}
                      <div className="inline-flex items-center self-start gap-1.5 mb-5 px-3 py-1 rounded-full
                        bg-brand-blue/8 border border-brand-blue/15 text-brand-blue dark:text-brand-yellow
                        group-hover:bg-white/15 group-hover:border-white/20 group-hover:text-brand-yellow
                        dark:group-hover:bg-brand-yellow/15 dark:group-hover:border-brand-yellow/30 dark:group-hover:text-brand-yellow
                        transition-all duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span className="font-mono text-[8px] font-black uppercase tracking-widest">{service.category}</span>
                      </div>

                      {/* Illustration Box */}
                      <div className="relative w-full aspect-[16/9] flex items-center justify-center mb-5
                        rounded-2xl border border-brand-blue/10 bg-gradient-to-br from-brand-blue/3 to-transparent
                        group-hover:border-white/15 dark:group-hover:border-brand-yellow/20 group-hover:from-white/8 dark:group-hover:from-brand-yellow/5 group-hover:to-white/3
                        transition-all duration-500 overflow-hidden">
                        {/* Glow blob inside illustration box */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-24 h-24 rounded-full bg-brand-blue/10 blur-2xl group-hover:bg-white/15 dark:group-hover:bg-brand-yellow/10 group-hover:scale-150 transition-all duration-500" />
                        </div>
                        <div className="relative z-10 w-full h-full max-h-[130px] flex items-center justify-center group-hover:scale-[1.05] transition-transform duration-500">
                          {getServiceIllustration(service.num, service)}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-lg md:text-xl font-black mb-2 leading-tight
                        text-brand-dark dark:text-white group-hover:text-white dark:group-hover:text-brand-yellow transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs md:text-[13px] font-medium leading-relaxed
                        text-brand-zinc-500 dark:text-zinc-300 group-hover:text-blue-100 dark:group-hover:text-zinc-200 transition-colors duration-300">
                        {service.desc}
                      </p>
                    </div>

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-6 pt-5
                      border-t border-brand-blue/10 dark:border-white/10 group-hover:border-white/15 dark:group-hover:border-white/20 transition-colors duration-300">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-black text-brand-blue/60 dark:text-zinc-400 group-hover:text-white/60 dark:group-hover:text-zinc-300 transition-colors duration-300 uppercase tracking-widest">{services.serviceLabel}</span>
                        <span className="text-[11px] font-mono font-black text-brand-blue dark:text-brand-yellow group-hover:text-brand-yellow dark:group-hover:text-brand-yellow transition-colors duration-300">{service.num}</span>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full
                        bg-brand-blue/8 border border-brand-blue/20 text-brand-blue dark:text-brand-yellow dark:border-brand-yellow/30
                        group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-brand-dark
                        dark:group-hover:bg-brand-yellow dark:group-hover:border-brand-yellow dark:group-hover:text-[#080710]
                        group-hover:rotate-45 transition-all duration-500 shadow-sm">
                        <ArrowUpRight className="h-4.5 w-4.5" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
