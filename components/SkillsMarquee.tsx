"use client";

const SKILLS = [
  { name: "TRPC", bg: "#FF6B35" },
  { name: "REDIS", bg: "#D32F2F" },
  { name: "KAFKA", bg: "#212121" },
  { name: "KUBERNETES", bg: "#326CE5" },
  { name: "EDGE COMPUTING", bg: "#0D47A1" },
  { name: "REACT SERVER COMPONENTS", bg: "#00796B" },
  { name: "WEBSOCKETS", bg: "#0097A7" },
  { name: "RAG PIPELINES", bg: "#FF7043" },
  { name: "VECTOR DATABASES", bg: "#E65100" },
  { name: "FINE-TUNING LLMS", bg: "#7B1FA2" },
  { name: "LANGGRAPH", bg: "#3F51B5" },
  { name: "TRANSFORMER ARCHITECTURE", bg: "#FBC02D" },
  { name: "CI/CD", bg: "#2E7D32" },
  { name: "MONOREPO", bg: "#C2185B" }
];

// Double it for seamless loop
const MARQUEE_ITEMS = [...SKILLS, ...SKILLS, ...SKILLS];

export default function SkillsMarquee() {
  return (
    <div className="marquee-container ticker-wrap">
      <div className="marquee-inner">
        {MARQUEE_ITEMS.map((skill, index) => (
          <span
            key={index}
            className="marquee-pill"
            style={{
              backgroundColor: skill.bg,
              color: skill.name === "TRANSFORMER ARCHITECTURE" ? "#111111" : "#ffffff"
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
