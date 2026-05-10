import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import ThreeAnimation from '../component/ThreeAnimation.jsx'
import Verify from './Verify.jsx'
import HoverPlayCard from '../component/Howercardplay.tsx'
import { Hero } from '../component/Textswap.tsx'
import { InteractiveHoverButton } from '../component/Button.tsx'
import { BackgroundLines } from '../component/background-lines.jsx'
import { Footer } from '../component/Footer.js'
import Whatwedo from './Whatwedo.jsx'
import { HoverImageGallery } from "../component/hoverimage";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Section refs
  const overviewRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const developerRef = useRef(null);

  // Navigation handler
  const handleNavClick = (section) => {
    setIsMenuOpen(false);
    const map = {
      "overview": overviewRef,
      "who-we-are": whoWeAreRef,
      "what-we-do": whatWeDoRef,
      "developer": developerRef,
    };
    const ref = map[section];
    if (ref?.current) ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="w-full bg-white/80 border-b border-gray-200 fixed top-0 left-0 z-50 backdrop-blur-md">
        <div className="flex h-[60px] items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">

          {/* Logo */}
          <div className="font-black text-black text-xl sm:text-2xl tracking-tighter shrink-0">
            DeepFake
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {["overview", "who-we-are", "what-we-do", "developer"].map((s) => (
              <button
                key={s}
                onClick={() => handleNavClick(s)}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors capitalize"
              >
                {s.replace(/-/g, " ")}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-700 hover:text-black p-2 rounded-md focus:outline-none"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-3">
                {["overview", "who-we-are", "what-we-do", "developer"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleNavClick(s)}
                    className="text-left text-base font-medium text-gray-700 py-2 border-b border-gray-100 last:border-0 capitalize hover:text-black transition-colors"
                  >
                    {s.replace(/-/g, " ")}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Overview / Hero ─────────────────────────────────── */}
      <div
        ref={overviewRef}
        id="overview"
        className="relative flex flex-col md:flex-row w-full min-h-screen items-center justify-center gap-8 md:gap-12 scroll-mt-[60px] pt-[80px] pb-12 px-4 sm:px-6 max-w-7xl mx-auto"
      >
        {/* background decoration */}
        <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none">
          <BackgroundLines />
        </div>

        {/* Text side — stacks below video on mobile */}
        <div className="flex flex-col flex-1 items-center md:items-start text-center md:text-left justify-center w-full order-2 md:order-1">
          <Hero />
          <div className="mt-6 sm:mt-8 flex justify-center md:justify-start w-full">
            <InteractiveHoverButton text="Upload Now" href="https://hackthon-upload.onrender.com" />
          </div>
        </div>

        {/* Video side */}
        <div className="flex flex-col flex-1 items-center justify-center w-full max-w-full sm:max-w-[480px] order-1 md:order-2">
          <HoverPlayCard loop={true} src="/videos/Trump_and_Navalny_1080p.mp4" />
        </div>
      </div>

      {/* ── Who We Are ──────────────────────────────────────── */}
      <div
        ref={whoWeAreRef}
        id="who-we-are"
        className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 scroll-mt-[60px] max-w-7xl mx-auto"
      >
        <div className="border-b border-gray-300 pb-4 mb-10 sm:mb-12 text-xs tracking-[0.25em] font-bold text-black uppercase">
          who we are
        </div>
        <div className="w-full overflow-x-hidden">
          <Whatwedo />
        </div>
      </div>

      {/* ── What We Do ──────────────────────────────────────── */}
      <div
        ref={whatWeDoRef}
        id="what-we-do"
        className="relative w-full py-16 sm:py-20 scroll-mt-[60px] max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="border-b border-gray-300 pb-4 mb-10 sm:mb-12 text-xs tracking-[0.25em] font-bold text-black uppercase">
          What we do
        </div>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          {/* On mobile: wrap in a styled background card */}
          <div className="w-full lg:w-1/2">
            <div className="
              lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0
              bg-gradient-to-br from-gray-50 to-white
              border border-gray-200
              shadow-xl
              rounded-2xl
              p-6 sm:p-8
            ">
              <Verify />
            </div>
          </div>
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center">
            <ThreeAnimation />
          </div>
        </div>
      </div>

      {/* ── SIH PPT Gallery ─────────────────────────────────── */}
      <div className="relative w-full py-16 sm:py-20 scroll-mt-[60px] max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-b border-gray-300 pb-4 mb-10 sm:mb-12 text-xs tracking-[0.25em] font-bold text-black uppercase">
          SIH PPT
        </div>
        <div className="overflow-hidden flex flex-col items-center justify-center">
          {/* On mobile: swipeable dots navigation instead of hover */}
          <div className="w-full">
            <HoverImageGallery />
          </div>
          <p className="mt-6 sm:mt-10 text-gray-500 font-medium italic text-sm sm:text-base text-center">
            <span className="hidden sm:inline">Hover over the images</span>
            <span className="sm:hidden">Tap to explore slides</span>
          </p>
        </div>
      </div>

      {/* ── Footer / Developer ──────────────────────────────── */}
      <div ref={developerRef} id="developer" className="shadow-lg shadow-black/30 scroll-mt-[60px]">
        <Footer />
      </div>
    </>
  );
}
