"use client";

import { useEffect, useState } from "react";

export default function TimeShower() {
  const [timeStr, setTimeStr] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const strTime = `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
      setTimeStr(strTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  return (
    <div className="time-shower">
      <div className="time-header">TIME</div>
      <div className="time-body">
        {timeStr}
      </div>
    </div>
  );
}
