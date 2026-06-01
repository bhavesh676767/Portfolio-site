"use client";

import { motion } from "framer-motion";

const folders = [
  {
    label: "projects_2025/",
    color: "#FFD600",
    iconColor: "#0A0A0A",
    rotation: -2,
    top: "18%",
    left: "12%",
    delay: 0,
  },
  {
    label: "case_studies.zip",
    color: "#0057FF",
    iconColor: "#ffffff",
    rotation: 1.5,
    top: "14%",
    left: "38%",
    delay: 0.4,
  },
  {
    label: "random_shots.raw",
    color: "#E61F24",
    iconColor: "#ffffff",
    rotation: -1,
    top: "22%",
    left: "62%",
    delay: 0.8,
  },
  {
    label: "inspo_dump.folder",
    color: "#00C853",
    iconColor: "#0A0A0A",
    rotation: 2,
    top: "10%",
    left: "52%",
    delay: 0.2,
  },
  {
    label: "untitled_wip/",
    color: "#0A0A0A",
    iconColor: "#F5F0E8",
    rotation: -2.5,
    top: "28%",
    left: "25%",
    delay: 0.6,
  },
  {
    label: "archived_cringe/",
    color: "#888888",
    iconColor: "#F5F0E8",
    rotation: 1,
    top: "8%",
    left: "78%",
    delay: 1.0,
    italic: true,
  },
];

function FolderIcon({ color, iconColor }: { color: string; iconColor: string }) {
  return (
    <svg
      width="52"
      height="44"
      viewBox="0 0 52 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Folder tab */}
      <rect x="0" y="6" width="18" height="5" rx="1" fill={color} stroke="#0A0A0A" strokeWidth="1.5" />
      {/* Folder body */}
      <rect x="0" y="10" width="52" height="34" rx="1" fill={color} stroke="#0A0A0A" strokeWidth="1.5" />
      {/* Folder shine/detail line */}
      <line x1="8" y1="20" x2="44" y2="20" stroke={iconColor} strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="8" y1="26" x2="36" y2="26" stroke={iconColor} strokeWidth="1.5" strokeOpacity="0.4" />
    </svg>
  );
}

export default function FloatingFolders() {
  return (
    <>
      {folders.map((folder, i) => (
        <motion.div
          key={i}
          className="absolute z-10 cursor-pointer group"
          style={{
            top: folder.top,
            left: folder.left,
            rotate: `${folder.rotation}deg`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: folder.delay + 0.3, duration: 0.6 }}
        >
          {/* Idle floating animation wrapper */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3 + folder.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: folder.delay,
            }}
            whileHover={{
              y: -12,
              transition: { duration: 0.2 },
            }}
            className="flex flex-col items-center gap-1.5"
          >
            <motion.div
              whileHover={{ filter: "drop-shadow(4px 4px 0px #0A0A0A)" }}
              transition={{ duration: 0.15 }}
            >
              <FolderIcon color={folder.color} iconColor={folder.iconColor} />
            </motion.div>
            <span
              className={`font-mono text-[11px] text-neo-black whitespace-nowrap ${folder.italic ? "italic opacity-60" : ""}`}
            >
              {folder.label}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
