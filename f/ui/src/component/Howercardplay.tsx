"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "./Button.jsx";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils.js";

type HoverPlayCardProps = {
  src: string;
  poster?: string;
  className?: string;
  loop?: boolean;
};

export default function HoverPlayCard({
  src,
  poster,
  className,
  loop = false,
}: HoverPlayCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // autoplay on mount (muted for browser policy)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  // hover handlers: pause/resume
  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => setIsPlaying(true));
  };

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden shadow-sm group",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        playsInline
        className="w-full h-full max-w-xl object-cover"
      />

      {/* Overlay: only show when paused */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
            <Button
              size="icon"
              variant="ghost"
              className="bg-black/30 hover:bg-black/50 text-white rounded-full w-16 h-16"
            >
              <Pause className="w-8 h-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* subtle badge */}
      <div className="absolute left-3 bottom-3 text-xs text-muted-foreground bg-black/20 px-2 py-1 rounded-full">
        {isPlaying ? "Playing" : "Paused"}
      </div>
    </div>
  );
}
