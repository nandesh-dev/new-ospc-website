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
            Non dolor fugiat in proident cupidatat ea pariatur nulla duis sunt
            sunt dolore eiusmod aute. Tempor et voluptate incididunt ut. Magna
            sint do amet mollit excepteur nisi ipsum anim enim consequat
            pariatur id. Non minim excepteur incididunt. Laborum est do anim
            pariatur sint commodo consequat consectetur culpa. Est anim nostrud
            duis ea fugiat consequat ut esse. Qui exercitation nulla amet culpa
            amet occaecat quis Lorem consectetur pariatur. Est consequat et ea
            sit voluptate. Id esse fugiat cillum deserunt in elit adipisicing
            cillum sit culpa ipsum ex. Et culpa et anim veniam sunt et ut
            occaecat nulla aliquip ex do amet ipsum. Laborum in aliquip
            reprehenderit eu velit ullamco officia fugiat fugiat exercitation
            sunt anim.
          </p>
        </div>
      </section>
      <section className="h-screen mb-94">
        <h2 className="text-5xl font-semibold uppercase mb-16">// Events</h2>
        <div className="pl-[30dvw]">
          <div className="h-[80dvh] outline outline-white flex justify-center align-middle backdrop-blur-sm p-16">
            #TODO Fetch events from backend
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
