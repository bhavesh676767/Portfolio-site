"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeDisplay() {
  const [hovered, setHovered] = useState(false);
  const [ageParts, setAgeParts] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    ms: 0,
  });

  const DOB = new Date('2009-03-31T00:00:00').getTime();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (hovered) {
      interval = setInterval(() => {
        const diff = Date.now() - DOB;
        setAgeParts({
          years: Math.floor(diff / 31557600000),
          months: Math.floor((diff % 31557600000) / 2629800000),
          days: Math.floor((diff % 2629800000) / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          mins: Math.floor((diff % 3600000) / 60000),
          secs: Math.floor((diff % 60000) / 1000),
          ms: diff % 1000,
        });
      }, 16);
    }
    
    return () => clearInterval(interval);
  }, [hovered, DOB]);

  const toggleHover = () => setHovered(!hovered);

  // Initial calculation for static age integer
  const currentYears = Math.floor((Date.now() - DOB) / 31557600000);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggleHover}
    >
      <span
        style={{
          color: "#E61F24",
          borderBottom: "1px dotted #E61F24",
          cursor: "crosshair",
        }}
      >
        {currentYears}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ scale: 0.93, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ duration: 0.10 }} // 100ms
            style={{
              position: "absolute",
              bottom: "calc(100% + 6px)", // updated positioning
              left: "50%",
              transform: "translateX(-50%)",
              background: "#0A0A0A",
              border: "2px solid #0A0A0A",
              boxShadow: "4px 4px 0px #E61F24",
              padding: 0,
              width: "192px", // updated width
              fontFamily: "var(--font-dm)",
              zIndex: 100,
              cursor: "default"
            }}
          >
            {/* Title bar */}
            <div
              style={{
                background: "#E61F24",
                height: "20px", // updated height
                padding: "0 8px", // updated padding
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "8px", // updated font size
                  color: "#FDFDFD",
                  letterSpacing: "2px",
                  textTransform: "uppercase" // age.exe
                }}
              >
                age.exe
              </span>
              <div style={{ display: "flex", gap: "3px" }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "5px",
                      height: "5px",
                      background: "#FDFDFD",
                      opacity: 0.35, // updated opacity
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ background: "#0A0A0A", padding: "9px 11px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {[
                  { label: "YRS", value: ageParts.years, color: "#FDFDFD" },
                  { label: "MO", value: ageParts.months.toString().padStart(2, '0'), color: "#FDFDFD" },
                  { label: "DAYS", value: ageParts.days.toString().padStart(2, '0'), color: "#FDFDFD" },
                  { label: "HRS", value: ageParts.hours.toString().padStart(2, '0'), color: "#FDFDFD" },
                  { label: "MIN", value: ageParts.mins.toString().padStart(2, '0'), color: "#FDFDFD" },
                  { label: "SEC", value: ageParts.secs.toString().padStart(2, '0'), color: "#FDFDFD" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-dm)",
                        fontSize: "8px", // updated font size
                        color: "#FDFDFD",
                        opacity: 0.30, // updated opacity
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm)",
                        fontSize: "10px", // updated font size
                        color: item.color,
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}

                {/* Separator */}
                <div style={{ borderTop: "1px solid rgba(253,253,253,0.08)", margin: "4px 0" }} />

                {/* MS Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm)",
                      fontSize: "8px",
                      color: "#FDFDFD",
                      opacity: 0.30,
                      textTransform: "uppercase",
                    }}
                  >
                    MS
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm)",
                      fontSize: "10px",
                      color: "#E61F24",
                    }}
                  >
                    {ageParts.ms.toString().padStart(3, '0')}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: "7px", // updated margin
                  fontFamily: "var(--font-dm)",
                  fontSize: "7.5px", // updated font size
                  color: "#FDFDFD",
                  opacity: 0.18, // updated opacity
                }}
              >
                alive since 31.03.2009
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
