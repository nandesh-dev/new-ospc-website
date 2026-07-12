"use client";

import { useEffect, useRef } from "react";
import { Graphics } from "./graphics";

const Events = [
  { name: "Spectrum" },
  { name: "VOID" },
  { name: "XXXX" },
  { name: "XXXX" },
  { name: "XXXX" },
];

function Event({ name }: { name: string }) {
  return (
    <div className="backdrop-blur-sm p-8">
      <h3 className="text-2xl font-semibold mb-8">{name}</h3>
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.qURrkCsa1S0S4jeC28DQBAHaEw%3Fpid%3DApi&f=1&ipt=6cceb97ec3970e977152ec0cb48f5424bcbf0f5f63c9316ecbf984aee36c0d5d"
        className="mb-4"
      />
      <p>
        Anim in duis exercitation. Mollit Lorem et excepteur veniam cillum
        dolore labore dolore Lorem consectetur pariatur mollit laborum. Mollit
        ea aute sint nostrud irure tempor qui cillum. Est consequat ex in Lorem
        reprehenderit elit deserunt in aliqua amet veniam nulla fugiat et. Non
        minim non Lorem. Cillum mollit deserunt adipisicing nisi non aute cillum
        excepteur. Veniam fugiat irure nostrud enim.
      </p>
    </div>
  );
}

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
      <section className="z-50 absolute left-0 top-0 w-full px-24 py-12">
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
      <section className="pt-[40vh] h-screen mb-24" id="hero">
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
      <section className="flex flex-row justify-end h-screen mb-36" id="info">
        <div className="w-[40dvw]">
          <h2 className="text-right text-5xl font-semibold uppercase mb-16">
            // About Us
          </h2>
          <p className="text-xl text-justify backdrop-blur-sm p-16">
            The Open Source Programming Club (OSPC) at VIT is a student-driven
            initiative aimed at fostering a culture of open-source development.
            Our mission is to empower members with practical skills,
            community-driven projects, and insights into collaborative software
            development. <br />
            We believe in the power of open-source to bring about positive
            change and innovation. Whether you're an experienced developer or
            just getting started, join us in building a world where knowledge is
            freely shared, and everyone has the opportunity to contribute!
          </p>
        </div>
      </section>
      <section className="mb-94">
        <h2 className="text-5xl font-semibold uppercase mb-16">// Events</h2>
        <div className="pl-[30dvw] grid grid-cols-2">
          <div className="flex flex-col gap-16">
            {Events.filter((_, i) => !(i % 2)).map(({ name }) => {
              return <Event key={name} name={name} />;
            })}
          </div>
          <div className="flex flex-col gap-16 pt-64">
            {Events.filter((_, i) => i % 2).map(({ name }) => {
              return <Event key={name} name={name} />;
            })}
          </div>
        </div>
      </section>
      <section className="h-screen">
        <h2 className="text-center text-5xl font-semibold uppercase mb-16">
          // Core Members
        </h2>
        <div className="px-[10dvw]">
          <div className="h-[180dvh] outline outline-white flex justify-center align-middle backdrop-blur-sm p-16">
            #TODO Add core members list
          </div>
        </div>
      </section>
    </div>
  );
}
