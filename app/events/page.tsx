"use client";

import { useState } from "react";

interface EventType {
  name: string;
  banner: string;
  date: string;
  description: string;
  metadata: Record<string, string>; // Flexible object for changing keys
}

const SAMPLE_EVENTS: EventType[] = [
  {
    name: "Spectrum",
    banner:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.qURrkCsa1S0S4jeC28DQBAHaEw%3Fpid%3DApi&f=1&ipt=6cceb97ec3970e977152ec0cb48f5424bcbf0f5f63c9316ecbf984aee36c0d5d",
    date: "2026-08-15",
    description:
      "Anim in duis exercitation. Mollit Lorem et excepteur veniam cillum dolore labore dolore Lorem consectetur pariatur mollit laborum. Mollit ea aute sint nostrud irure tempor qui cillum.",
    metadata: {
      "Member Count": "2",
      Venue: "Amphi Theatre",
      Format: "Hackathon",
    },
  },
  {
    name: "VOID",
    banner:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.qURrkCsa1S0S4jeC28DQBAHaEw%3Fpid%3DApi&f=1&ipt=6cceb97ec3970e977152ec0cb48f5424bcbf0f5f63c9316ecbf984aee36c0d5d",
    date: "2026-09-02",
    description:
      "Est consequat ex in Lorem reprehenderit elit deserunt in aliqua amet veniam nulla fugiat et. Non minim non Lorem. Cillum mollit deserunt adipisicing nisi non aute cillum excepteur.",
    metadata: {
      "Prize Pool": "₹25,000",
      Track: "Web3 & AI",
    },
  },
  {
    name: "XXXX",
    banner:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.qURrkCsa1S0S4jeC28DQBAHaEw%3Fpid%3DApi&f=1&ipt=6cceb97ec3970e977152ec0cb48f5424bcbf0f5f63c9316ecbf984aee36c0d5d",
    date: "2026-10-10",
    description:
      "Veniam fugiat irure nostrud enim. Mollit ea aute sint nostrud irure tempor qui cillum. Est consequat ex in Lorem reprehenderit elit deserunt in aliqua amet veniam nulla fugiat et.",
    metadata: {
      Difficulty: "Advanced",
      Prerequisites: "Docker, Git",
    },
  },
];

function EventCard({ name, banner, date, description, metadata }: EventType) {
  return (
    <div className="backdrop-blur-sm p-8 bg-white/5 border border-white/10 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-baseline mb-6 border-b border-white/10 pb-2">
          <h3 className="text-2xl font-semibold text-secondary uppercase">
            {name}
          </h3>
          <span className="text-gray text-sm font-mono">{date}</span>
        </div>

        <img
          src={banner}
          className="mb-6 w-full object-cover h-48 filter grayscale hover:grayscale-0 transition-all duration-300"
          alt={name}
        />

        <p className="text-light/80 text-justify text-base leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Dynamic Key-Value Metadata Renderer */}
      <div className="mt-auto pt-4 border-t border-white/5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-mono">
        {Object.entries(metadata).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between border-b border-white/5 pb-1 col-span-2 sm:col-span-1"
          >
            <span className="text-gray">// {key}:</span>
            <span className="text-secondary font-bold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = SAMPLE_EVENTS.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="pt-[25vh] min-h-screen pb-24">
      {/* Title & Search Panel Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-light pb-6">
        <div>
          <h1 className="text-5xl font-bold uppercase text-primary mb-8">
            // Club Events
          </h1>
          <p className="text-gray font-mono">
            Explore workshops, hackathons, and open-source sprints.
          </p>
        </div>

        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="SEARCH EVENTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/20 text-light px-4 py-3 font-mono text-sm focus:outline-none focus:border-secondary backdrop-blur-sm placeholder-gray/50 tracking-wider uppercase"
          />
        </div>
      </div>

      {/* Event Grid Layout */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredEvents.map((event) => (
            <EventCard key={event.name} {...event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-white/10 backdrop-blur-sm bg-white/5">
          <p className="text-gray font-mono text-xl uppercase">
            No events found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}
