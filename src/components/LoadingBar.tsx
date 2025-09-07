"use client";
import React, { useState, useEffect } from "react";

interface LoadingBarProps {
  isLoading: boolean;
}

export default function LoadingBar({ isLoading }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(timer);
            return 90;
          }
          return prevProgress + 10;
        });
      }, 100);

      return () => clearInterval(timer);
    } else {
      setProgress(100);
      const timer = setTimeout(() => {
        setProgress(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[10000]">
      <div 
        className="h-1 bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
