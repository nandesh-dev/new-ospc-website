"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Graphics } from "../graphics";

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoVisible, setVideoVisible] = useState(true);
  const [videoMounted, setVideoMounted] = useState(true);
  const [graphics, setGraphics] = useState<Graphics | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    setGraphics(new Graphics(canvasRef.current));
  }, []);

  const handleVideoEnded = () => {
    setVideoVisible(false);
    graphics?.render();
    setTimeout(() => {
      setVideoMounted(false);
    }, 1000);
  };

  return (
    <div className="h-dvh p-4 md:p-24 md:px-42 overflow-y-auto" id="container">
      {videoMounted && (
        <video
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className={`fixed inset-0 w-full h-full object-cover z-[100] transition-opacity duration-1200 pointer-events-none ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
          src="/assets/intro.mp4"
        />
      )}
      <canvas
        className="-z-10 absolute top-0 left-0 right-0 bottom-0"
        ref={canvasRef}
      />

      {children}
    </div>
  );
}
