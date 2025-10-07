"use client";
import React, { useState, useCallback, useMemo, useRef } from "react";

interface HoverImageGalleryProps {
  images: string[];
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
}: HoverImageGalleryProps){
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const throttleRef = useRef<number>(0);

  // Memoize total images count
  const totalImages = useMemo(() => images.length, [images.length]);

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - throttleRef.current < 16) return; // ~60fps throttling
    throttleRef.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;

    // Update mouse position for tooltip
    setMousePosition({ x, y });

    // Calculate which image to show based on horizontal position
    const imageIndex = Math.floor((x / width) * totalImages);
    const clampedIndex = Math.max(0, Math.min(totalImages - 1, imageIndex));

    setCurrentImageIndex(clampedIndex);
  }, [totalImages]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Function to get total number of images
  const getTotalImages = useCallback(() => {
    return totalImages;
  }, [totalImages]);

  return (
    <div className="relative group">
      <div
        className="relative w-full h-[550px] overflow-hidden rounded-lg shadow-lg cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main displayed image with optimizations */}
        <img
          src={images[currentImageIndex]}
          alt={`Gallery image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-150 ease-out"
          loading="eager"
          decoding="async"
        />

        {/* Preload next/previous images for smoother transitions */}
        {currentImageIndex > 0 && (
          <link rel="preload" as="image" href={images[currentImageIndex - 1]} />
        )}
        {currentImageIndex < totalImages - 1 && (
          <link rel="preload" as="image" href={images[currentImageIndex + 1]} />
        )}

        {/* Image counter overlay */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentImageIndex + 1} / {getTotalImages()}
        </div>

        {/* Optimized Glassmorphic Tooltip with Both Chevrons */}
        {isHovering && (
          <div
            className="absolute pointer-events-none z-20 transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: `translate(-50%, -50%) translate3d(0, 0, 0)`,
            }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 w-12 h-12 flex items-center justify-center">
              <div className="flex items-center space-x-1">
                {/* Left Chevron */}
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>

                {/* Right Chevron */}
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};