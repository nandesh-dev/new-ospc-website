"use client";

export default function RecruitmentPage() {
  return (
    <div className="pt-[30vh] min-h-screen pb-24 flex items-center justify-center">
      <div className="w-full max-w-2xl backdrop-blur-sm p-12 bg-white/5 border border-white/10 text-center relative overflow-hidden">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase px-3 py-1 tracking-widest border border-secondary text-secondary bg-primary/5 animate-pulse">
            System Status: Initializing
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">
          <span className="text-light">// Core Recruitment </span>
          <span className="text-secondary">2026</span>
        </h1>

        <div className="h-[1px] w-24 bg-white/20 mx-auto mb-8" />

        <p className="text-xl font-semibold uppercase text-primary tracking-wider mb-4 font-mono">
          &gt;_ STARTING SOON
        </p>

        <p className="text-light/70 text-base leading-relaxed max-w-md mx-auto mb-10 font-sans">
          We are preparing our pipelines to onboard the next cohort of
          developers, designers, and open-source enthusiasts. Sharpen your tools
          and keep your repositories ready.
        </p>

        {/* Terminal log mimic */}
        <div className="bg-black/40 p-4 rounded border border-white/5 text-left font-mono text-xs text-gray/80 space-y-1">
          <p>
            <span className="text-secondary">✦ ospc-core-cli:</span> fetch
            --active-cycles
          </p>
          <p>
            <span className="text-gray">[info]</span> recruitment_pipeline_v3
            initialized...
          </p>
          <p>
            <span className="text-gray">[info]</span> waiting for connection
            handshakes from administration...
          </p>
        </div>
      </div>
    </div>
  );
}
