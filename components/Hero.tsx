"use client";

import { useEffect, useState } from "react";
import CharacterCanvas from "./CharacterCanvas";
import AnalogClock from "./AnalogClock";
import ParticleField from "./ParticleField";

/* ── Selection-Style Navigation Link ── */
interface SelectionLinkProps {
  label: string;
  href: string;
  hasCursorStart?: boolean;
  hasCursorEnd?: boolean;
}

function SelectionLink({
  label,
  href,
  hasCursorStart = false,
  hasCursorEnd = false,
}: SelectionLinkProps) {
  return (
    <a href={href} className="nav-link">
      {hasCursorStart && <span className="cursor" />}
      {label}
      {hasCursorEnd && <span className="cursor" />}
    </a>
  );
}

export default function Hero() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const dateStr = "10/02/2023";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = (selectedTheme: "light" | "dark") => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >

      {/* ── ORBIT ELLIPSE RING SVG (Desktop) ── */}
      <ParticleField />

      <svg className="orbit-svg desktop-only-ellipse" viewBox="0 0 1366 750" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50%" cy="56%" rx="27%" ry="38%" fill="none" stroke="#aaa" strokeWidth="1.2" strokeDasharray="5 9" />
      </svg>

      {/* ── ORBIT ELLIPSE RING SVG (Tablet) ── */}
      <svg className="orbit-svg tablet-only-ellipse" viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="350" cy="160" rx="328" ry="138" fill="none" stroke="#bbb" strokeWidth="1.2" strokeDasharray="5 9" />
      </svg>

      {/* ── ORBIT ELLIPSE RING SVG (Mobile) ── */}
      <svg className="orbit-svg mobile-only-ellipse" viewBox="0 0 370 280" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="185" cy="140" rx="172" ry="118" fill="none" stroke="#bbb" strokeWidth="1" strokeDasharray="4 7" />
      </svg>

      {/* ── CHARACTER CANVAS (Mouse-tracking avatar) ── */}
      <div
        className="avatar-wrap"
        style={{
          position: "absolute",
          top: "14%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "86%",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <CharacterCanvas />
      </div>

      {/* ── CALENDAR (top-left) ── */}
      <div className="calendar-wrap">
        <div className="calendar">
          <div className="cal-header">{dateStr}</div>
          <div className="cal-body">
            <div className="cal-grid">
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i + 1} className={`dot${i + 1 === 2 ? " today" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BRAND HEADING (center-top) ── */}
      <div className="brand-heading-wrap name-block">
        <span className="brand-subheading im">I'm</span>
        <h1 className="brand-heading bhavesh">BHAVESH</h1>
      </div>

      {/* ── DARK/LIGHT TOGGLE (top-right, shown on tablet/mobile) ── */}
      <div className="toggle">
        <button
          className={`tog-btn tog-dark${theme === "dark" ? " active" : ""}`}
          onClick={() => toggleTheme("dark")}
        >
          <span className="tog-dot" /> DARK
        </button>
        <button
          className={`tog-btn tog-light${theme === "light" ? " active" : ""}`}
          onClick={() => toggleTheme("light")}
        >
          <span className="tog-dot" /> LIGHT
        </button>
      </div>

      {/* ── ANALOG CLOCK (top-right) ── */}
      <div className="clock-wrap">
        <AnalogClock />
      </div>

      {/* ── SOCIAL ICONS ── */}
      <div className="social-icons">
        <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">
          <img src="/spotify_icon.png" alt="Spotify" className="social-icon-link" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/instagram_icon.png" alt="Instagram" className="social-icon-link" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="/linkedin_icon.png" alt="LinkedIn" className="social-icon-link" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <img src="/github_icon.png" alt="GitHub" className="social-icon-link" />
        </a>
      </div>

      {/* ── 3D PHYSICAL MY STORY BUTTON ── */}
      <div className="d3warpper my-story-btn">
        <div className="cover">
          <button
            className="my-story-3d-btn"
            onClick={() => {
              window.location.href = "/story";
            }}
          >
            my story
          </button>
        </div>
      </div>

      {/* ── NAVIGATION LINKS (ON the Ellipse Circumference) ── */}
      <div className="nav-link-wrap link-projects">
        <SelectionLink label="projects" href="#projects" hasCursorStart={true} />
      </div>
      <div className="nav-link-wrap link-design">
        <SelectionLink label="Design" href="#design" hasCursorStart={true} />
      </div>
      <div className="nav-link-wrap link-social">
        <SelectionLink label="Social work" href="#social" hasCursorStart={true} />
      </div>
      <div className="nav-link-wrap link-aspirations">
        <SelectionLink label="My aspirations" href="#aspirations" hasCursorStart={true} hasCursorEnd={true} />
      </div>

      {/* ── FOOTER ROW ── */}
      <div
        className="footer-row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "32px 48px",
          position: "relative",
          zIndex: 20,
        }}
      >
        <span className="location footer-left">Gurgaon, India</span>
        <div className="footer-right" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="#contact" className="contact">Contact ↗</a>
        </div>
      </div>

      {/* ── Hidden SVG Filter for dark-mode avatar ── */}
      <svg style={{ position: "absolute", width: 0, height: 0, opacity: 0, pointerEvents: "none" }}>
        <filter id="dark-mode-avatar">
          <feColorMatrix type="matrix" values="0 -1 0 0 1 0 -1 0 0 1 0 -1 0 0 1 0 0 0 1 0" />
        </filter>
      </svg>

    </section>
  );
}
