"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "20px",
        paddingRight: "20px",
        background: "#FDFDFD",
        borderBottom: "2px solid #0A0A0A",
      }}
    >
      {/* BHAVESH * */}
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: "18px",
          color: "#0A0A0A",
          letterSpacing: "-0.01em",
          display: "flex",
          alignItems: "baseline",
          gap: "1px",
          userSelect: "none",
        }}
      >
        BHAVESH&nbsp;<span style={{ color: "#E61F24" }}>*</span>
      </div>

      {/* Gurgaon, India | */}
      <div
        style={{
          fontFamily: "var(--font-dm)",
          fontSize: "13px",
          color: "rgba(10,10,10,0.5)",
          display: "flex",
          alignItems: "center",
        }}
      >
        Gurgaon, India
        <span
          className="cursor-blink"
          style={{
            display: "inline-block",
            width: "1px",
            height: "13px",
            background: "rgba(10,10,10,0.5)",
            marginLeft: "4px",
            verticalAlign: "middle",
          }}
        />
      </div>
    </motion.nav>
  );
}
