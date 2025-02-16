"use client";

import React, { useEffect, useState } from "react";

export default function LoadingBar({ isLoading }: { isLoading: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(10); // Start with a small progress
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Increment progress
      }, 300);

      return () => clearInterval(interval);
    } else {
      setProgress(100); // Complete progress when loading is done
      setTimeout(() => setProgress(0), 500); // Hide after short delay
    }
  }, [isLoading]);

  return (
    <div
      className="fixed top-0 left-0 h-2 bg-gradient-to-r from-pivotaTeal via-pivotaAqua to-pivotaCoral transition-all duration-300 z-50"
      style={{ width: `${progress}%`, opacity: progress > 0 ? 1 : 0 }}
    />
  );
}
