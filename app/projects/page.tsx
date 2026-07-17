"use client";

import { useState } from "react";
import Link from "next/link";

interface Developer {
  name: string;
  profileUrl: string;
}

interface ProjectType {
  title: string;
  description: string;
  type: "solo" | "group";
  developers: Developer[];
}

const SAMPLE_PROJECTS: ProjectType[] = [
  {
    title: "GitVisualizer",
    description:
      "An interactive, 3D node-based graph rendering engine built to visualize complete repository architectures, complex merge actions, and sprawling branch lineages in real-time.",
    type: "solo",
    developers: [{ name: "Aditya Kumar", profileUrl: "/members/aditya-kumar" }],
  },
  {
    title: "OSPC Core Analytics Platform",
    description:
      "A secure, distributed data metrics engine designed specifically for analyzing student open-source contribution patterns across GitHub organizations, compiling global club metrics dynamically.",
    type: "group",
    developers: [
      { name: "Rahul S", profileUrl: "/members/rahul-s" },
      { name: "Siddharth M", profileUrl: "/members/siddharth-m" },
      { name: "Sneha Rao", profileUrl: "/members/sneha-rao" },
    ],
  },
  {
    title: "Markdown Ecosystem IDE",
    description:
      "A lightweight, browser-based runtime editor supporting live collaborative execution loops, modular compilation pipelines, and real-time AST structure analysis windows.",
    type: "group",
    developers: [
      { name: "Vikram Shah", profileUrl: "/members/vikram-shah" },
      { name: "Nisha J", profileUrl: "/members/nisha-j" },
    ],
  },
  {
    title: "KernelForge OS",
    description:
      "An experimental, bare-metal monolithic x86-64 operating system micro-kernel architectural setup built from scratch to explore low-level driver loading constraints.",
    type: "solo",
    developers: [{ name: "Priya Nair", profileUrl: "/members/priya-nair" }],
  },
];

function ProjectCard({ title, description, type, developers }: ProjectType) {
  return (
    <div className="backdrop-blur-sm p-8 bg-white/5 border border-white/10 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-baseline mb-6 border-b border-white/10 pb-2">
          <h3 className="text-2xl font-semibold text-secondary uppercase">
            {title}
          </h3>
          <span
            className={`text-xs font-mono uppercase px-2 py-1 tracking-widest border ${
              type === "solo"
                ? "border-primary text-primary"
                : "border-light text-light"
            }`}
          >
            {type}
          </span>
        </div>

        <p className="text-light/80 text-justify text-base leading-relaxed mb-8">
          {description}
        </p>
      </div>

      {/* Developers Links Section */}
      <div className="mt-auto pt-4 border-t border-white/5 font-mono text-sm">
        <span className="text-gray block mb-2">// Built by:</span>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {developers.map((dev, i) => (
            <div key={dev.profileUrl} className="flex items-center">
              <Link
                href={dev.profileUrl}
                className="text-primary hover:text-white underline decoration-dashed transition-colors"
              >
                @{dev.name.toLowerCase().replace(/\s+/g, "")}
              </Link>
              {i < developers.length - 1 && (
                <span className="text-gray ml-4">/</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "solo" | "group">("all");

  const filteredProjects = SAMPLE_PROJECTS.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.developers.some((dev) =>
        dev.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesType = typeFilter === "all" || project.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="pt-[25vh] min-h-screen pb-24">
      {/* Title & Filter Control Bar */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16 border-b-2 border-light pb-6">
        <div>
          <h1 className="text-5xl font-bold uppercase text-primary mb-8">
            // Projects
          </h1>
          <p className="text-gray font-mono">
            Production builds and utilities open-sourced by our club engineers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          {/* Text input search field */}
          <input
            type="text"
            placeholder="SEARCH REPOS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 bg-white/5 border border-white/20 text-light px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary backdrop-blur-sm placeholder-gray/50 tracking-wider uppercase"
          />

          {/* Tab Filter Button Array */}
          <div className="flex bg-white/5 border border-white/20 p-1 font-mono text-sm backdrop-blur-sm">
            {(["all", "solo", "group"] as const).map((filterOpt) => (
              <button
                key={filterOpt}
                onClick={() => setTypeFilter(filterOpt)}
                className={`px-4 py-2 uppercase tracking-wider transition-all duration-200 ${
                  typeFilter === filterOpt
                    ? "bg-light text-background font-bold"
                    : "text-gray hover:text-light"
                }`}
              >
                {filterOpt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Grid Output Rendering */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-white/10 backdrop-blur-sm bg-white/5">
          <p className="text-gray font-mono text-xl uppercase">
            No active project nodes match your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
