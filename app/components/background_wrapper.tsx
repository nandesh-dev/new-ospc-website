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
    <div className="h-dvh p-24 px-42 overflow-y-auto" id="container">
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

      {/* Moved Global Navigation Header */}
      <section className="z-50 absolute left-0 top-0 w-full px-24 py-12">
        <div className="flex justify-between border-b-2 border-light py-2">
          <span className="text-xl font-bold">OSPC</span>
          <nav>
            <ul className="text-lg flex flex-row gap-8">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/recruitments"
                  className="hover:text-primary transition-colors"
                >
                  Apply
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      {children}
    </div>
  );
}
