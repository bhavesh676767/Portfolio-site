"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const IMG_ME = "https://i.ibb.co/Y7fy4W2S/image.jpg";
const IMG_2 = "https://i.postimg.cc/FzdLwLhK/Whats-App-Image-2026-06-02-at-1-14-30-PM.jpg";
const IMG_3 = "https://i.postimg.cc/xCFmsRVq/Whats-App-Image-2026-06-02-at-1-14-37-PM.jpg";
const IMG_4 = "https://i.postimg.cc/NF9HZHQ5/Whats-App-Image-2026-06-02-at-1-14-38-PM.jpg";
const IMG_5 = "https://i.postimg.cc/fyt919Mk/Whats-App-Image-2026-06-02-at-1-14-41-PM.jpg";

const SKILLS = [
  {
    cat: "Languages",
    items: [
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Bash",
      "SQL",
    ],
  },
  {
    cat: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    cat: "Design",
    items: [
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe XD",
      "Canva",
      "Framer",
    ],
  },
  {
    cat: "No-Code / CMS",
    items: ["Webflow", "WordPress", "Notion", "Framer Sites"],
  },
  {
    cat: "Databases",
    items: ["MongoDB", "PostgreSQL", "Firebase", "Supabase", "MySQL"],
  },
  {
    cat: "Tools & Infra",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Netlify",
      "VS Code",
      "Docker basics",
      "REST APIs",
      "Discord.py",
    ],
  },
  {
    cat: "AI & Automation",
    items: [
      "Prompt engineering",
      "LLM integration",
      "n8n",
      "Zapier",
      "Claude API",
      "OpenAI API",
    ],
  },
];

export default function StoryPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="sp">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #F4F2ED;
          --ink:   #0E0E0D;
          --red:   #C8281F;
          --muted: #8A8880;
          --rule:  #DDDBD5;
          --serif: 'DM Serif Display', Georgia, serif;
          --sans:  'DM Sans', system-ui, sans-serif;
        }

        html, body {
          background: var(--cream) !important;
          color: var(--ink) !important;
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        /* Important: allow scrolling on this page (home page uses overflow hidden) */
        body {
          overflow-y: auto !important;
          height: auto !important;
          min-height: 100vh;
        }

        .sp {
          background: var(--cream);
          color: var(--ink);
          font-family: var(--sans);
          overflow-x: hidden;
        }

        /* ── EXIT BUTTON ── */
        .sp-exit {
          position: fixed;
          top: 28px;
          right: clamp(20px, 5vw, 52px);
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 9px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          mix-blend-mode: multiply;
          transition: opacity 0.2s;
        }

        .sp-exit:hover { opacity: 0.5; }

        .sp-exit-icon {
          width: 36px;
          height: 36px;
          border: 1px solid var(--ink);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.18s, color 0.18s;
        }

        .sp-exit:hover .sp-exit-icon {
          background: var(--ink);
        }

        .sp-exit:hover .sp-exit-icon svg { stroke: var(--cream); }

        .sp-exit-label {
          font-family: var(--sans);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink);
        }

        @media (max-width: 480px) {
          .sp-exit-label { display: none; }
        }

        /* ── HERO ── */
        .sp-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100svh;
          border-bottom: 1px solid var(--rule);
        }

        .sp-hero-left {
          display: flex;
          flex-direction: column;
          padding: clamp(72px, 10vw, 120px) clamp(28px, 6vw, 72px) clamp(40px, 6vw, 72px);
          border-right: 1px solid var(--rule);
          justify-content: flex-end;
        }

        .sp-hero-eyebrow {
          font-family: var(--sans);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: clamp(20px, 3vw, 36px);
        }

        .sp-hero-h1 {
          font-family: var(--serif);
          font-size: clamp(56px, 9vw, 112px);
          line-height: 0.95;
          letter-spacing: -0.02em;
          font-weight: 400;
          margin-bottom: clamp(32px, 5vw, 56px);
        }

        .sp-hero-h1 em {
          font-style: italic;
          color: var(--red);
        }

        .sp-hero-bio {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 46ch;
        }

        .sp-hero-bio p {
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.7;
          font-weight: 300;
          color: var(--ink);
        }

        .sp-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--rule);
          border: 1px solid var(--rule);
          margin-top: clamp(32px, 5vw, 52px);
        }

        .sp-stat {
          background: var(--cream);
          padding: 18px 16px;
        }

        .sp-stat-val {
          font-family: var(--serif);
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1;
          color: var(--ink);
          display: block;
          margin-bottom: 4px;
        }

        .sp-stat-lbl {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .sp-hero-right {
          position: relative;
          overflow: hidden;
        }

        .sp-hero-right img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: saturate(0.9);
        }

        .sp-hero-right-caption {
          position: absolute;
          bottom: 28px;
          left: 24px;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }

        /* ── SECTION RULE ── */
        .sp-section-rule {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px clamp(28px, 6vw, 72px);
          border-bottom: 1px solid var(--rule);
        }

        .sp-section-rule span {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── ORIGIN ── */
        .sp-origin {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--rule);
        }

        .sp-origin-images {
          display: grid;
          grid-template-rows: 1fr 1fr;
          border-right: 1px solid var(--rule);
        }

        .sp-origin-images img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.85);
        }

        .sp-origin-images img:first-child {
          border-bottom: 1px solid var(--rule);
        }

        /* Make "Chapter 01 — B" (second image) smaller */
        .sp-origin-images img:nth-child(2) {
          height: 80%;
          align-self: center;
        }

        .sp-origin-text {
          padding: clamp(40px, 7vw, 88px) clamp(28px, 5vw, 64px);
          display: flex;
          flex-direction: column;
          gap: clamp(28px, 4vw, 44px);
        }

        .sp-origin-heading {
          font-family: var(--serif);
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.0;
          letter-spacing: -0.02em;
          font-weight: 400;
        }

        .sp-origin-heading em {
          font-style: italic;
          color: var(--red);
        }

        .sp-origin-body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sp-origin-body p {
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.75;
          font-weight: 300;
          color: var(--ink);
        }

        /* ── SKILLS ── */
        .sp-skills {
          border-bottom: 1px solid var(--rule);
        }

        .sp-skills-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--rule);
        }

        .sp-skills-heading-col {
          padding: clamp(40px, 6vw, 80px) clamp(28px, 5vw, 64px);
          border-right: 1px solid var(--rule);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 16px;
        }

        .sp-skills-heading {
          font-family: var(--serif);
          font-size: clamp(44px, 7vw, 88px);
          line-height: 0.95;
          letter-spacing: -0.02em;
          font-weight: 400;
        }

        .sp-skills-heading em {
          font-style: italic;
          color: var(--red);
        }

        .sp-skills-intro-col {
          padding: clamp(40px, 6vw, 80px) clamp(28px, 5vw, 64px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 14px;
        }

        .sp-skills-intro-col p {
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.75;
          font-weight: 300;
          max-width: 44ch;
        }

        .sp-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(260px, 28vw, 340px), 1fr));
          gap: 1px;
          background: var(--rule);
          border-bottom: 1px solid var(--rule);
        }

        .sp-skill-block {
          background: var(--cream);
          padding: clamp(24px, 3.5vw, 40px) clamp(24px, 3.5vw, 40px);
        }

        .sp-skill-cat {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--rule);
        }

        .sp-skill-items {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .sp-skill-tag {
          display: inline-block;
          font-size: clamp(12px, 1.3vw, 13px);
          font-weight: 400;
          color: var(--ink);
          background: transparent;
          border: 1px solid var(--rule);
          padding: 5px 12px;
          letter-spacing: 0.02em;
          transition: border-color 0.18s, background 0.18s;
        }

        .sp-skill-tag:hover {
          border-color: var(--ink);
          background: var(--ink);
          color: var(--cream);
        }

        /* ── PHOTO BREAK ── */
        .sp-photobreak {
          display: grid;
          grid-template-columns: 5fr 3fr;
          border-bottom: 1px solid var(--rule);
          min-height: clamp(320px, 50vw, 600px);
        }

        .sp-photobreak img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.85);
        }

        .sp-photobreak img:first-child {
          border-right: 1px solid var(--rule);
        }

        /* ── PHILOSOPHY ── */
        .sp-phil {
          border-bottom: 1px solid var(--rule);
        }

        .sp-phil-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--rule);
        }

        .sp-phil-quote-col {
          padding: clamp(40px, 7vw, 88px) clamp(28px, 5vw, 64px);
          border-right: 1px solid var(--rule);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sp-phil-quote {
          font-family: var(--serif);
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          font-weight: 400;
          font-style: italic;
        }

        .sp-phil-text-col {
          padding: clamp(40px, 7vw, 88px) clamp(28px, 5vw, 64px);
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
        }

        .sp-phil-text-col p {
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.75;
          font-weight: 300;
        }

        .sp-phil-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--rule);
        }

        .sp-phil-card {
          background: var(--cream);
          padding: clamp(28px, 4vw, 48px) clamp(24px, 3.5vw, 40px);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sp-phil-card-idx {
          font-family: var(--serif);
          font-size: clamp(32px, 4.5vw, 52px);
          font-style: italic;
          color: var(--red);
          line-height: 1;
        }

        .sp-phil-card-title {
          font-family: var(--sans);
          font-size: clamp(13px, 1.5vw, 15px);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink);
        }

        .sp-phil-card-body {
          font-size: clamp(13px, 1.4vw, 14px);
          line-height: 1.65;
          font-weight: 300;
          color: var(--muted);
        }

        /* ── FOOTER ── */
        .sp-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--rule);
          min-height: clamp(420px, 60vw, 680px);
        }

        .sp-footer-img {
          overflow: hidden;
          border-right: 1px solid var(--rule);
        }

        .sp-footer-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.85);
        }

        .sp-footer-msg {
          padding: clamp(40px, 7vw, 88px) clamp(28px, 5vw, 64px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 32px;
        }

        .sp-footer-big {
          font-family: var(--serif);
          font-size: clamp(52px, 8.5vw, 104px);
          line-height: 0.95;
          letter-spacing: -0.02em;
          font-weight: 400;
        }

        .sp-footer-big em {
          font-style: italic;
          color: var(--red);
        }

        .sp-footer-sub {
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.7;
          font-weight: 300;
          color: var(--muted);
          max-width: 40ch;
          margin-bottom: 28px;
        }

        .sp-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .sp-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          font-family: var(--sans);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid var(--ink);
          color: var(--ink);
          background: transparent;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }

        .sp-btn:hover {
          background: var(--ink);
          color: var(--cream);
        }

        .sp-btn.fill {
          background: var(--ink);
          color: var(--cream);
        }

        .sp-btn.fill:hover {
          background: var(--red);
          border-color: var(--red);
        }

        .sp-footer-bottom {
          border-top: 1px solid var(--rule);
          padding: 18px clamp(28px, 6vw, 72px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .sp-footer-copy {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .sp-socials {
          display: flex;
          gap: 24px;
          list-style: none;
        }

        .sp-socials a {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--muted);
          transition: color 0.18s;
        }

        .sp-socials a:hover {
          color: var(--ink);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .sp-hero { grid-template-columns: 1fr; min-height: auto; }
          .sp-hero-left { border-right: none; border-bottom: 1px solid var(--rule); padding-top: 80px; }
          .sp-hero-right { min-height: 55svh; }

          .sp-origin { grid-template-columns: 1fr; }
          .sp-origin-images { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; aspect-ratio: 2/1; border-right: none; border-bottom: 1px solid var(--rule); }
          .sp-origin-images img:first-child { border-bottom: none; border-right: 1px solid var(--rule); }

          .sp-skills-header { grid-template-columns: 1fr; }
          .sp-skills-heading-col { border-right: none; border-bottom: 1px solid var(--rule); }

          .sp-photobreak { grid-template-columns: 1fr; }
          .sp-photobreak img:first-child { border-right: none; border-bottom: 1px solid var(--rule); min-height: 40svh; }
          .sp-photobreak img:last-child { min-height: 36svh; }

          .sp-phil-top { grid-template-columns: 1fr; }
          .sp-phil-quote-col { border-right: none; border-bottom: 1px solid var(--rule); }
          .sp-phil-cards { grid-template-columns: 1fr; }

          .sp-footer { grid-template-columns: 1fr; }
          .sp-footer-img { border-right: none; border-bottom: 1px solid var(--rule); min-height: 48svh; }
        }

        @media (max-width: 520px) {
          .sp-hero-stats { grid-template-columns: 1fr 1fr; }
          .sp-origin-images { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; aspect-ratio: 1/1.2; }
          .sp-origin-images img:first-child { border-right: none; border-bottom: 1px solid var(--rule); }
          .sp-skills-grid { grid-template-columns: 1fr; }
          .sp-footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* EXIT (back to home) */}
      <button
        className="sp-exit"
        onClick={() => router.push("/")}
        aria-label="Exit story"
      >
        <span className="sp-exit-icon">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="#0E0E0D"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="2" y1="2" x2="12" y2="12" />
            <line x1="12" y1="2" x2="2" y2="12" />
          </svg>
        </span>
        <span className="sp-exit-label">Exit</span>
      </button>

      {/* ── 1. HERO ── */}
      <section className="sp-hero">
        <div className="sp-hero-left">
          <p className="sp-hero-eyebrow">My Story — Gurgaon, India</p>
          <h1 className="sp-hero-h1">
            Built by<br />curiosity,<br />
            <em>coded</em><br />by hand.
          </h1>
          <div className="sp-hero-bio">
            <p>
              I'm seventeen and I've been shipping things on the internet since I was in fifth grade. It started with a Discord bot. It grew into design, development, and a relentless need to build.
            </p>
            <p>
              I come from a middle-class family in Gurgaon. Everything I know, I taught myself — one project at a time, one late night at a time.
            </p>
          </div>
          <div className="sp-hero-stats">
            <div className="sp-stat">
              <span className="sp-stat-val">17</span>
              <span className="sp-stat-lbl">Years old</span>
            </div>
            <div className="sp-stat">
              <span className="sp-stat-val">6+</span>
              <span className="sp-stat-lbl">Years building</span>
            </div>
            <div className="sp-stat">
              <span className="sp-stat-val">30+</span>
              <span className="sp-stat-lbl">Skills mastered</span>
            </div>
          </div>
        </div>

        <div className="sp-hero-right">
          <img src={IMG_ME} alt="Portrait" />
          <span className="sp-hero-right-caption">Gurgaon, India — 2024</span>
        </div>
      </section>

      {/* ── 2. ORIGIN ── */}
      <div className="sp-section-rule">
        <span>Chapter 01</span>
        <span>The Origin — 2019–2021</span>
      </div>
      <section className="sp-origin">
        <div className="sp-origin-images">
          <img src={IMG_2} alt="Chapter 01 — A" />
          <img src={IMG_3} alt="Chapter 01 — B" />
        </div>

        <div className="sp-origin-text">
          <h2 className="sp-origin-heading">
            It started<br />with a <em>bot.</em>
          </h2>
          <div className="sp-origin-body">
            <p>
              Fifth grade. I found Discord. I wanted a bot for my server so badly that I decided to build one. That one decision pulled me into Python, then Discord.py, then the whole world of how software actually works.
            </p>
            <p>
              JavaScript came next, then the realisation that I could use it to build websites. HTML and CSS followed — and suddenly I had a way to put things on the internet that anyone could see. That feeling never got old.
            </p>
            <p>
              Design was always parallel. I'd been drawing, using Paint, experimenting with Canva since before I knew those were "design tools." Figma made it official. Photoshop and Illustrator made it serious.
            </p>
            <p>
              When no-code platforms started rising, I learned Webflow. Not as a shortcut — but as another tool in the belt. I wanted to ship things, not just write things.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. SKILLS ── */}
      <div className="sp-section-rule">
        <span>Chapter 02</span>
        <span>The Arsenal — Tools &amp; Skills</span>
      </div>
      <section className="sp-skills">
        <div className="sp-skills-header">
          <div className="sp-skills-heading-col">
            <h2 className="sp-skills-heading">
              I know<br />
              <em>a lot</em>
              <br />of things.
            </h2>
          </div>
          <div className="sp-skills-intro-col">
            <p>
              Six years of self-taught work across design, development, databases, automation, and AI tooling. Not surface-level — I've shipped real projects with most of these.
            </p>
            <p>
              I keep adding. Every week something new lands in the stack.
            </p>
          </div>
        </div>

        <div className="sp-skills-grid">
          {SKILLS.map((s) => (
            <div key={s.cat} className="sp-skill-block">
              <div className="sp-skill-cat">{s.cat}</div>
              <div className="sp-skill-items">
                {s.items.map((item) => (
                  <span key={item} className="sp-skill-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO BREAK ── */}
      <div className="sp-photobreak">
        <img src={IMG_4} alt="Visual break A" />
        <img src={IMG_5} alt="Visual break B" />
      </div>

      {/* ── 4. PHILOSOPHY ── */}
      <div className="sp-section-rule">
        <span>Chapter 03</span>
        <span>How I Work</span>
      </div>
      <section className="sp-phil">
        <div className="sp-phil-top">
          <div className="sp-phil-quote-col">
            <p className="sp-phil-quote">
              "Pace matters.<br />Energy is mutual.<br />Growth is daily."
            </p>
          </div>
          <div className="sp-phil-text-col">
            <p>
              I learn at my own pace — even the most exciting thing becomes a drag when the rhythm is wrong. That's not a weakness, it's how I protect the quality of everything I put out.
            </p>
            <p>
              When I take on a project, I need the client in the game with me. If someone checks out for days on a project they claim to care about, my interest follows. I build with people who are as invested as I am — paid or not.
            </p>
            <p>
              I'm integrating AI into every corner of my workflow — not to think less, but to do more. I develop myself every single day. The goal isn't arrival, it's direction.
            </p>
          </div>
        </div>

        <div className="sp-phil-cards">
          <div className="sp-phil-card">
            <div className="sp-phil-card-idx">i.</div>
            <div className="sp-phil-card-title">Own Pace</div>
            <p className="sp-phil-card-body">
              I absorb things deeply when I'm not rushed. Slow down to go further.
            </p>
          </div>
          <div className="sp-phil-card">
            <div className="sp-phil-card-idx">ii.</div>
            <div className="sp-phil-card-title">Mutual Energy</div>
            <p className="sp-phil-card-body">
              Great work needs both sides invested. I give everything — I expect the same care in return.
            </p>
          </div>
          <div className="sp-phil-card">
            <div className="sp-phil-card-idx">iii.</div>
            <div className="sp-phil-card-title">Daily Growth</div>
            <p className="sp-phil-card-body">
              Every day is a chance to ship something, learn something, improve something.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section className="sp-footer">
        <div className="sp-footer-img">
          <img src={IMG_5} alt="Let's work" />
        </div>
        <div className="sp-footer-msg">
          <div className="sp-footer-big">
            Let's make<br />
            <em>something</em>
            <br />real.
          </div>
          <div>
            <p className="sp-footer-sub">
              If you've read this far, we probably vibe. Drop me a line — I'm open to freelance projects, collabs, and conversations that go somewhere.
            </p>
            <div className="sp-cta-row">
              <a href="/#contact" className="sp-btn fill">
                Get in touch ↗
              </a>
              <a href="/" className="sp-btn">
                ← Back home
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="sp-footer-bottom">
        <span className="sp-footer-copy">© 2024 — All rights reserved</span>
        <ul className="sp-socials">
          <li>
            <a href="#">LinkedIn</a>
          </li>
          <li>
            <a href="#">GitHub</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
        </ul>
      </div>
    </main>
  );
}

