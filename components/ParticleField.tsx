"use client";

import { useEffect, useRef } from "react";

type Particle = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  drift: number;
  phase: number;
  speed: number;
  orbit: number;
};

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let animationId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;
      const count = Math.min(150, Math.max(78, Math.floor((width * height) / 7800)));
      const exclusion = {
        x: width / 2,
        y: height * 0.6,
        rx: width * 0.2,
        ry: height * 0.42,
      };

      const isNearAvatar = (x: number, y: number) => {
        const normalizedX = (x - exclusion.x) / exclusion.rx;
        const normalizedY = (y - exclusion.y) / exclusion.ry;
        return normalizedX * normalizedX + normalizedY * normalizedY < 1;
      };

      for (let i = 0; i < count; i += 1) {
        let baseX = Math.random() * width;
        let baseY = Math.random() * height;
        let attempts = 0;

        while (isNearAvatar(baseX, baseY) && attempts < 24) {
          baseX = Math.random() * width;
          baseY = Math.random() * height;
          attempts += 1;
        }

        particles.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          size: Math.random() * 1.7 + 1.05,
          drift: Math.random() * 0.7 + 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.0012 + 0.00055,
          orbit: Math.random() * 10 + 6,
        });
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const getStarFill = () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      return isDark
        ? "rgba(255, 255, 255, 0.28)"
        : "rgba(17, 17, 17, 0.28)";
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getStarFill();

      particles.forEach((particle) => {
        const dx = particle.baseX - pointer.x;
        const dy = particle.baseY - pointer.y;
        const distance = Math.hypot(dx, dy);
        const radius = 210;
        const force = Math.max(0, 1 - distance / radius);
        const angle = Math.atan2(dy, dx);
        const idleX = Math.cos(time * particle.speed + particle.phase) * particle.orbit;
        const idleY = Math.sin(time * (particle.speed * 0.8) + particle.phase) * particle.orbit;
        const shimmerX = Math.cos(time * 0.0016 + particle.phase) * particle.drift;
        const shimmerY = Math.sin(time * 0.0019 + particle.phase) * particle.drift;
        const targetX = particle.baseX + idleX + shimmerX + Math.cos(angle) * force * 52;
        const targetY = particle.baseY + idleY + shimmerY + Math.sin(angle) * force * 52;

        particle.x += (targetX - particle.x) * 0.14;
        particle.y += (targetY - particle.y) * 0.14;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
