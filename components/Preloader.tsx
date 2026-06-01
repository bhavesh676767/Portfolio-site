"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FRAME_KEYS = [
  'Center',
  'Left', 'Left-Far',
  'Right', 'Right-Far',
  'Up', 'Up-Far',
  'Top-Left', 'Top-Left-Far',
  'Top-Right', 'Top-Right-Far',
  'Bottom-Left', 'Bottom-Left-Far',
  'Bottom-Right', 'Bottom-Right-Far',
  'bottom'
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const total = FRAME_KEYS.length;

  useEffect(() => {
    let currentLoaded = 0;

    FRAME_KEYS.forEach(key => {
      const img = new Image();
      img.src = `/me_frames/${key}.webp`;
      img.onload = () => {
        currentLoaded++;
        setLoadedCount(currentLoaded);
        if (currentLoaded === total) {
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              onComplete();
            }, 500);
          }, 300);
        }
      };
      img.onerror = () => {
        currentLoaded++;
        console.warn(`Preloader: failed to load ${key}.webp`);
        setLoadedCount(currentLoaded);
        if (currentLoaded === total) {
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              onComplete();
            }, 500);
          }, 300);
        }
      };
    });
  }, [onComplete, total]);

  const progressPercent = (loadedCount / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#ffffff",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Name as loading indicator */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(42px, 8vw, 72px)",
          color: "#1A1A1A",
          opacity: isExiting ? 0.1 : 0.12,
          letterSpacing: "-1px",
          transition: "opacity 0.5s ease",
          lineHeight: 1,
        }}
      >
        bhavesh<span style={{ color: "#E8321A" }}>.</span>
      </div>

      {/* Thin progress line */}
      <div
        style={{
          width: "clamp(120px, 30vw, 200px)",
          height: "1px",
          background: "rgba(26,26,26,0.08)",
          marginTop: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "#E8321A",
            transition: "width 0.15s linear",
          }}
        />
      </div>

      {/* Loading count */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          color: "#1A1A1A",
          opacity: 0.2,
          marginTop: "14px",
          letterSpacing: "1px",
        }}
      >
        {loadedCount}/{total}
      </div>
    </motion.div>
  );
}
