"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AgeDisplay from "./AgeDisplay";

interface NavLinkProps {
  index: string;
  label: string;
  href: string;
  color: string;
}

const LEFT_LINKS: NavLinkProps[] = [
  { index: "[ 001 ]", label: "code_projects/", href: "/projects/code",   color: "#E61F24" },
  { index: "[ 002 ]", label: "design_work/",   href: "/projects/design", color: "#FFD600" },
];

const RIGHT_LINKS: NavLinkProps[] = [
  { index: "[ 003 ]", label: "social_stuff/", href: "/social", color: "#00C853" },
  { index: "[ 004 ]", label: "about_me/",     href: "/about",  color: "#0057FF" },
  { index: "[ 005 ]", label: "contact/",      href: "/contact", color: "#9B59B6" },
];

function LinkItem({ link, rightAligned = false }: { link: NavLinkProps, rightAligned?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        textAlign: rightAligned ? "right" : "left"
      }}
      className="max-sm:text-left"
    >
      <div
        style={{
          fontFamily: "var(--font-dm)",
          fontSize: "9px",
          color: "#0A0A0A",
          opacity: 0.18,
          marginBottom: "1px",
        }}
      >
        {link.index}
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm)",
          fontSize: "13px",
          fontWeight: 500,
          color: hovered ? link.color : "#0A0A0A",
          transition: "color 120ms linear",
          display: "block",
          marginTop: "1px"
        }}
        className="max-sm:text-[11px]" // mobile font DM Mono 11px
      >
        {link.label}
      </div>
      <motion.div
        animate={{ scaleX: hovered ? 1.1 : 1, y: hovered ? -1 : 0 }}
        transition={{ duration: 0.12, ease: "linear" }}
        style={{
          height: "1.5px",
          width: "100%", // Desktop 100%
          background: link.color,
          marginTop: "3px",
          display: "block",
          transformOrigin: rightAligned ? "right" : "left",
        }}
        className={`max-sm:w-[65px] ${rightAligned ? "max-sm:ml-0" : ""}`} // Mobile bar width 65px
      />
    </a>
  );
}

export function NavLinksLeft() {
  return (
    <motion.div
      initial={{ x: -18, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 }} // t=0.05s
      style={{ display: "flex", flexDirection: "column", gap: "22px" }}
      className="max-sm:gap-[13px]"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} className="max-sm:gap-[13px]">
        {LEFT_LINKS.map(link => (
          <LinkItem key={link.index} link={link} />
        ))}
        {/* Render right links here ONLY on mobile */}
        <div className="hidden max-sm:flex flex-col gap-[13px]">
          {RIGHT_LINKS.map(link => (
            <LinkItem key={link.index} link={link} />
          ))}
        </div>
      </div>
      
      {/* Bio Block */}
      <motion.div 
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.20 }} // t=0.20s
        className="hidden sm:flex flex-col"
      >
        <div style={{
          fontFamily: "var(--font-dm)",
          fontWeight: 400,
          fontSize: "10.5px",
          color: "#0A0A0A",
          lineHeight: 1.95,
          opacity: 0.48,
          maxWidth: "150px"
        }} className="lg:max-w-[130px]">
          a <AgeDisplay /> yr old<br/>
          who breaks things on purpose<br/>
          and calls it development.
        </div>
        
        <div style={{
          fontFamily: "var(--font-dm)",
          fontSize: "9px",
          opacity: 0.18,
          marginTop: "10px"
        }}>
          * born 31 march 2009
        </div>

        <div style={{
          fontFamily: "var(--font-dm)",
          fontSize: "9px",
          textTransform: "uppercase",
          letterSpacing: "3px",
          opacity: 0.22,
          marginTop: "14px",
          marginBottom: "3px"
        }}>
          currently:
        </div>
        <div style={{
          fontFamily: "var(--font-dm)",
          fontSize: "10.5px",
          opacity: 0.45
        }}>
          building in gurgaon
        </div>
      </motion.div>
    </motion.div>
  );
}

export function NavLinksRight() {
  return (
    <motion.div
      initial={{ x: 18, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 }} // t=0.05s
      style={{ display: "flex", flexDirection: "column", gap: "22px" }}
      className="max-sm:gap-[13px] text-right"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} className="max-sm:gap-[13px] items-end sm:items-end max-sm:items-start max-sm:text-left">
        {RIGHT_LINKS.map(link => (
          <div key={link.index} className="flex justify-end max-sm:justify-start w-full">
            <LinkItem link={link} rightAligned={true} />
          </div>
        ))}
      </div>

      {/* Decorative Block */}
      <div className="hidden sm:flex flex-col items-end text-right" style={{ fontFamily: "var(--font-dm)" }}>
        <div style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          fontSize: "9px",
          color: "#0A0A0A",
          opacity: 0.10,
          letterSpacing: "5px",
          marginLeft: "auto"
        }}>
          BHAVESH × 2026
        </div>
      </div>
    </motion.div>
  );
}
