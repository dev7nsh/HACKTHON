"use client";
import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";

interface HoverImageGalleryProps {
  images?: string[];
}

export function HoverImageGallery({
  images = [
    "/Frame consistency checkData Defenders.pptx/1.png",
    "/Frame consistency checkData Defenders.pptx/2.png",
    "/Frame consistency checkData Defenders.pptx/3.png",
    "/Frame consistency checkData Defenders.pptx/4.png",
    "/Frame consistency checkData Defenders.pptx/5.png",
    "/Frame consistency checkData Defenders.pptx/6.png",
    "/Frame consistency checkData Defenders.pptx/7.png"
  ],
}: HoverImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const throttleRef = useRef<number>(0);
  const touchStartX = useRef<number>(0);

  const totalImages = useMemo(() => images.length, [images.length]);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - throttleRef.current < 16) return;
    throttleRef.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;

    setMousePosition({ x, y });

    const imageIndex = Math.floor((x / width) * totalImages);
    const clampedIndex = Math.max(0, Math.min(totalImages - 1, imageIndex));
    setCurrentImageIndex(clampedIndex);
  }, [totalImages]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  // Touch swipe handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 30) return; // ignore small taps
    if (dx < 0) {
      setCurrentImageIndex((prev) => Math.min(totalImages - 1, prev + 1));
    } else {
      setCurrentImageIndex((prev) => Math.max(0, prev - 1));
    }
  }, [totalImages]);

  return (
    <div className="relative group w-full">
      {/* Gallery image area */}
      <div
        className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentImageIndex]}
          alt={`Gallery image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-150 ease-out"
          loading="eager"
          decoding="async"
        />

        {/* Preload adjacent images */}
        {currentImageIndex > 0 && (
          <link rel="preload" as="image" href={images[currentImageIndex - 1]} />
        )}
        {currentImageIndex < totalImages - 1 && (
          <link rel="preload" as="image" href={images[currentImageIndex + 1]} />
        )}

        {/* Counter */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium">
          {currentImageIndex + 1} / {totalImages}
        </div>

        {/* Mobile prev/next tap zones */}
        <button
          className="absolute left-0 inset-y-0 w-1/4 sm:hidden flex items-center justify-start pl-3 text-white/70"
          onClick={() => setCurrentImageIndex((p) => Math.max(0, p - 1))}
          aria-label="Previous slide"
        >
          <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-0 inset-y-0 w-1/4 sm:hidden flex items-center justify-end pr-3 text-white/70"
          onClick={() => setCurrentImageIndex((p) => Math.min(totalImages - 1, p + 1))}
          aria-label="Next slide"
        >
          <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Desktop hover cursor */}
        {isHovering && (
          <div
            className="absolute pointer-events-none z-20 hidden sm:flex items-center justify-center will-change-transform"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: `translate(-50%, -50%) translate3d(0, 0, 0)`,
            }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 w-12 h-12 flex items-center justify-center">
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentImageIndex
                ? "w-6 bg-gray-800"
                : "w-2 bg-gray-300 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}