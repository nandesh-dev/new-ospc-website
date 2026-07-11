"use client";

import { useEffect, useRef } from "react";
import { Graphics } from "./graphics";

export default function Home() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) return;
    new Graphics(canvas.current);
  }, [canvas.current]);

  return (
    <div className="h-dvh p-24 overflow-y-auto" id="container">
      <canvas
        className="-z-10 absolute top-0 left-0 right-0 bottom-0"
        ref={canvas}
      />
      <section className="absolute left-0 top-0 w-full px-24 py-12">
        <div className="flex justify-between border-b-2 border-light py-2">
          <span className="text-xl font-bold">OSPC</span>
          <nav>
            <ul className="text-lg flex flex-row gap-4">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Events</a>
              </li>
              <li>
                <a>Leaderboards</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section className="pt-[40vh] h-screen" id="hero">
        <p className="text-3xl mb-8">VIT Chennai</p>
        <h1 className="flex flex-col gap-2 mb-16">
          <span className="text-primary uppercase font-bold text-7xl">
            Open Source
          </span>
          <span className="text-secondary uppercase font-bold text-7xl">
            Programming Club
          </span>
        </h1>
        <p className="text-gray uppercase text-3xl text-right">
          Code Together. Build Forever.
        </p>
      </section>
      <section className="h-screen" id="info">
        <h2 className="text-right">#TODO Club Info</h2>
      </section>
      <section className="h-screen">
        <h2 className="">#TODO Events</h2>
      </section>
      <section className="h-screen">
        <h2 className="text-center">#TODO Leads</h2>
      </section>
    </div>
  );
}
