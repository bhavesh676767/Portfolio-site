"use client";

import { motion } from "framer-motion";

interface RetroWindowProps {
  skillName: string;
  backstory: string;
  tagColor: string;
  tagTextColor: string;
  rotation: number;
}

export default function RetroWindow({
  skillName,
  backstory,
  tagColor,
  tagTextColor,
  rotation,
}: RetroWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ duration: 0.15 }}
      style={{ rotate: `${rotation}deg` }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 neo-border neo-shadow bg-neo-cream z-50 pointer-events-none"
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5 border-b-2 border-neo-black"
        style={{ backgroundColor: tagColor, color: tagTextColor }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full border border-neo-black bg-white"></div>
          <div className="w-2.5 h-2.5 rounded-full border border-neo-black bg-white"></div>
          <div className="w-2.5 h-2.5 rounded-full border border-neo-black bg-white"></div>
        </div>
        <span className="font-mono text-xs font-bold tracking-tight uppercase">
          {skillName}
        </span>
      </div>

      {/* Body */}
      <div className="p-3 font-mono text-[13px] leading-snug text-neo-black whitespace-pre-wrap">
        {backstory}
      </div>
    </motion.div>
  );
}
