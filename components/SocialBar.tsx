"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SOCIALS = [
  { label: "instagram", href: "https://instagram.com", hover: "#E61F24" },
  { label: "github",    href: "https://github.com",    hover: "#0A0A0A" },
  { label: "linkedin",  href: "https://linkedin.com",  hover: "#0057FF" },
  { label: "spotify",   href: "https://spotify.com",   hover: "#00C853" },
];

function SocialLink({ label, href, hoverColor, isMobile = false }: { label: string; href: string; hoverColor: string; isMobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? hoverColor : "inherit",
        opacity: hovered ? 1 : 0.32,
        transition: "color 100ms linear, opacity 100ms linear",
        cursor: "pointer",
        textDecoration: "none"
      }}
    >
      {!isMobile && "↗ "}{label}
    </a>
  );
}

export default function SocialBar() {
  return (
    <motion.div
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1], delay: 0.25 }} // t=0.25s
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "30px", // updated height
        borderTop: "1px solid rgba(10,10,10,0.07)", // updated border
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4%",
        zIndex: 20,
        background: "#FDFDFD"
      }}
      className="max-sm:justify-center"
    >
      <div 
        style={{
          fontFamily: "var(--font-dm)",
          fontSize: "9px",
          color: "#0A0A0A",
          opacity: 0.16 // updated opacity
        }}
        className="hidden sm:block"
      >
        last_modified: today
      </div>

      <div style={{
        fontFamily: "var(--font-dm)",
        fontSize: "10px",
        textTransform: "uppercase",
        color: "#0A0A0A",
        display: "flex",
        alignItems: "center"
      }}
      className="max-sm:text-[9px]" // mobile font 9px
      >
        {SOCIALS.map((s, i) => (
          <span key={s.label} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && (
              <span style={{ opacity: 0.13, margin: "0 6px" }}>/</span>
            )}
            <span className="hidden sm:inline">
               <SocialLink label={s.label} href={s.href} hoverColor={s.hover} isMobile={false} />
            </span>
            <span className="inline sm:hidden">
               <SocialLink label={s.label} href={s.href} hoverColor={s.hover} isMobile={true} />
            </span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
