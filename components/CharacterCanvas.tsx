"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_KEYS = [
  'Center',
  'Left', 'Left-Far',
  'Right', 'Right-Far',
  'Up', 'Up-Far',
  'Top-Left', 'Top-Left-Far',
  'Top-Right', 'Top-Right-Far',
  'Bottom-Left', 'Bottom-Left-Far',
  'Bottom-Right', 'Bottom-Right-Far',
  'bottom'
];

export default function CharacterCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageMap = useRef(new Map<string, HTMLImageElement>());
  const currentKey = useRef('Center');
  const [allLoaded, setAllLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let count = 0;
    FRAME_KEYS.forEach(key => {
      const img = new Image();
      img.src = `/me_frames/${key}.webp`;
      img.onload = () => {
        imageMap.current.set(key, img);
        count++;
        if (count === FRAME_KEYS.length) {
          const firstImg = imageMap.current.get('Center');
          if (canvasRef.current && firstImg) {
            canvasRef.current.width = firstImg.naturalWidth;
            canvasRef.current.height = firstImg.naturalHeight;
          }
          setAllLoaded(true);
          drawFrame('Center');
        }
      };
      img.onerror = () => {
        count++;
        console.warn(`Failed to load: ${key}.webp`);
        if (count === FRAME_KEYS.length) setAllLoaded(true);
      };
    });
  }, []);

  const drawFrame = (key: string) => {
    if (currentKey.current === key) return;
    currentKey.current = key;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imageMap.current.get(key);
    if (!img || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!allLoaded) return;

    if (isMobile) {
      // Mobile/Tablet: no hover available, cycle frames every 2 seconds to make the avatar look alive
      drawFrame('Center');
      const canvas = canvasRef.current;
      const img = imageMap.current.get('Center');
      if (canvas && img) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }

      const cycleKeys = [
        'Center', 'Left', 'Right', 'Up', 'bottom',
        'Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right'
      ];
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % cycleKeys.length;
        drawFrame(cycleKeys[index]);
      }, 2000);

      return () => clearInterval(interval);
    } else {
      // Desktop: mouse tracking hover interaction
      drawFrame('Center');
      const canvas = canvasRef.current;
      const img = imageMap.current.get('Center');
      if (canvas && img) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }

      let rafId: number;

      const handleMouseMove = (e: MouseEvent) => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const heroRect = containerRef.current.closest('section')?.getBoundingClientRect();
          if (!heroRect) return;

          const anchorX = heroRect.left + heroRect.width / 2;
          const anchorY = heroRect.bottom;

          const dx = e.clientX - anchorX;
          const dy = e.clientY - anchorY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diagonal = Math.sqrt(heroRect.width ** 2 + heroRect.height ** 2);

          const DEAD = 70;
          const NEAR = diagonal * 0.20;
          const FAR = diagonal * 0.40;

          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

          let baseDir = 'Center';
          if (angle >= -22.5 && angle < 22.5) baseDir = 'Right';
          else if (angle >= 22.5 && angle < 67.5) baseDir = 'Bottom-Right';
          else if (angle >= 67.5 && angle < 112.5) baseDir = 'bottom';
          else if (angle >= 112.5 && angle < 157.5) baseDir = 'Bottom-Left';
          else if (angle >= 157.5 || angle < -157.5) baseDir = 'Left';
          else if (angle >= -157.5 && angle < -112.5) baseDir = 'Top-Left';
          else if (angle >= -112.5 && angle < -67.5) baseDir = 'Up';
          else if (angle >= -67.5 && angle < -22.5) baseDir = 'Top-Right';

          let targetKey = 'Center';
          if (dist < DEAD) {
            targetKey = 'Center';
          } else if (dist < NEAR) {
            if (baseDir === 'bottom') targetKey = 'bottom';
            else if (baseDir === 'Bottom-Left') targetKey = 'Bottom-Left';
            else if (baseDir === 'Bottom-Right') targetKey = 'Bottom-Right';
            else targetKey = baseDir;
          } else if (dist >= FAR) {
            const farKey = baseDir + '-Far';
            targetKey = FRAME_KEYS.includes(farKey) ? farKey : baseDir;
          } else {
            targetKey = baseDir;
          }

          drawFrame(targetKey);
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(rafId);
      };
    }
  }, [allLoaded, isMobile]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%) translateZ(0)",
        zIndex: 10,
        pointerEvents: "none",
        width: "min(700px, 100vw)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
      className="canvas-container avatar"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%) translateZ(0)",
          height: "100%",
          width: "auto",
          willChange: "contents",
          display: allLoaded ? "block" : "none",
        }}
      />
      <style jsx global>{`
        .canvas-container {
          bottom: -15%;
          height: 60vh;
        }
        .canvas-container canvas {
          mix-blend-mode: multiply;
          filter: none;
          transition: filter 0.3s ease;
        }
        [data-theme="dark"] .canvas-container canvas {
          filter: url(#dark-mode-avatar);
          mix-blend-mode: screen;
        }
        @media (max-width: 640px) {
          .canvas-container {
            bottom: -8%;
            height: 45vh;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .canvas-container {
            bottom: -110px !important;    /* scaled down/moved lower intentionally */
            width: 65vw !important;
            max-width: 490px !important;
            height: 58vh !important;
            z-index: 1 !important;       /* behind nav links (z:2), above ellipse (z:0) */
            pointer-events: none;
          }
        }
        @media (min-width: 1400px) {
          .canvas-container {
            bottom: -12%;
            height: 66vh;
          }
        }
      `}</style>
    </div>
  );
}
