"use client";

import { useEffect, useState } from "react";

/**
 * Analog clock that syncs CSS keyframe animations to the actual current time
 * using negative animation-delay. Once mounted the CSS engine drives it —
 * zero JS timers needed after hydration.
 */
export default function AnalogClock() {
  // null = not yet hydrated (avoids SSR mismatch)
  const [delays, setDelays] = useState<{
    hour: string;
    minute: string;
    second: string;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    // Total elapsed seconds since the start of each animation cycle
    const hourElapsed   = h * 3600 + m * 60 + s;   // 0 – 43199
    const minuteElapsed = m * 60 + s;               // 0 – 3599
    const secondElapsed = s;                        // 0 – 59

    setDelays({
      hour:   `-${hourElapsed}s`,
      minute: `-${minuteElapsed}s`,
      second: `-${secondElapsed}s`,
    });
  }, []);

  // Don't render until client-side so the delay is always accurate
  if (!delays) return null;

  return (
    <div className="clock-face">
      <div className="clk-hands">
        <div
          className="clk-hour"
          style={{ animationDelay: delays.hour }}
        />
        <div
          className="clk-minute"
          style={{ animationDelay: delays.minute }}
        />
        <div
          className="clk-second"
          style={{ animationDelay: delays.second }}
        />
      </div>
    </div>
  );
}
