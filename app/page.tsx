"use client";

import { useCallback, useState } from "react";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import SkillsMarquee from "@/components/SkillsMarquee";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Home() {
  const [ready, setReady] = useState(false);
  const handlePreloaderComplete = useCallback(() => setReady(true), []);

  return (
    <div className="paper-grain" style={{ background: "var(--bg)", minHeight: "100vh", transition: "background-color 0.3s ease" }}>
      {/* Main content — fades in as preloader exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Skills ticker — untouched */}
        <SkillsMarquee />

        {/* Hero inside page-border wrapper */}
        <div className="page-border">
          <Hero />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!ready && <Preloader key="preloader" onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
    </div>
  );
}
