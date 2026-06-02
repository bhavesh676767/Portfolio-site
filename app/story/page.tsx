"use client";

import { useCallback, useState } from "react";
import Preloader from "@/components/Preloader";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function StoryPage() {
  const [ready, setReady] = useState(false);
  const handlePreloaderComplete = useCallback(() => setReady(true), []);

  return (
    <div style={{ background: "#ededed", minHeight: "100vh", width: "100%", overflow: "hidden", position: "relative" }}>
      {/* Floating Exit Button at Top Middle */}
      {ready && (
        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.button
            initial={{ y: -50, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "fixed",
              top: "24px",
              left: "50%",
              zIndex: 1000,
              background: "#FDFDFD",
              border: "2px solid #0A0A0A",
              borderRadius: "30px",
              padding: "10px 24px",
              fontFamily: "var(--font-dm)",
              fontWeight: 700,
              fontSize: "14px",
              color: "#0A0A0A",
              cursor: "pointer",
              boxShadow: "4px 4px 0px #0A0A0A",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Exit Story <span style={{ color: "#E61F24" }}>*</span>
          </motion.button>
        </Link>
      )}

      {/* Main content — fades in as preloader exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ width: "100%", height: "100vh" }}
      >
        <iframe
          src="/story.html"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            margin: 0,
            padding: 0,
            overflow: "hidden",
            display: "block",
          }}
          title="My Story"
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {!ready && <Preloader key="preloader" onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
    </div>
  );
}

