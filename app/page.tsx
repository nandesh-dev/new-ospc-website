"use client";

const events = [
  { name: "spectrum" },
  { name: "void" },
  { name: "xxxx" },
  { name: "xxx" },
  { name: "xx" },
];

interface Member {
  name: string;
  role: string;
  githuburl?: string;
}

const executive_team: Member[] = [
  { name: "aarav sharma", role: "president", githuburl: "https://github.com" },
  {
    name: "ananya iyer",
    role: "vice president",
    githuburl: "https://github.com",
  },
];

const single_lead_depts: Member[] = [
  { name: "rohan das", role: "design lead", githuburl: "https://github.com" },
  {
    name: "meera nair",
    role: "operations lead",
    githuburl: "https://github.com",
  },
  {
    name: "kabir mehta",
    role: "pr & marketing lead",
    githuburl: "https://github.com",
  },
  { name: "diya kaplan", role: "events lead", githuburl: "https://github.com" },
];

const dev_leads: Member[] = [
  {
    name: "siddharth verma",
    role: "technical lead (core)",
    githuburl: "https://github.com",
  },
  {
    name: "kriti joshi",
    role: "technical lead (web)",
    githuburl: "https://github.com",
  },
];

// Reusable Member Card Component
function MemberCard({
  member,
  roleColorClass = "text-gray",
}: {
  member: Member;
  roleColorClass?: string;
}) {
  return (
    <div className="backdrop-blur-sm p-6 bg-white/5 border border-white/10 flex flex-row items-center gap-6 hover:border-secondary transition-all duration-300 group">
      <div className="w-20 h-20 bg-white/10 border border-white/10 flex-shrink-0 overflow-hidden rounded-sm">
        <img
          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${member.name}`}
          alt={member.name}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
      <div className="flex flex-col justify-between h-full py-1">
        <div className="font-mono">
          <span
            className={`${roleColorClass} text-xs uppercase tracking-widest`}
          >
            // {member.role}
          </span>
          <h4 className="text-xl font-bold text-light mt-1 group-hover:text-secondary transition-colors uppercase">
            {member.name}
          </h4>
        </div>
        {member.githuburl && (
          <a
            href={member.githuburl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs font-mono text-primary hover:text-white transition-colors flex items-center gap-1"
          >
            [view_profile]
          </a>
        )}
      </div>
    </div>
  );
}

// Event Component (Capitalized to ensure proper React rendering)
function Event({ name }: { name: string }) {
  return (
    <div className="backdrop-blur-sm p-8 bg-white/5 border border-white/10 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-baseline mb-6 border-b border-white/10 pb-2">
          <h3 className="text-2xl font-semibold text-secondary uppercase">
            {name}
          </h3>
        </div>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3a%2f%2ftse1.mm.bing.net%2fth%2fid%2foip.qurrkcsa1s0s4jec28dqbahaew%3fpid%3dapi&f=1&ipt=6cceb97ec3970e977152ec0cb48f5424bcbf0f5f63c9316ecbf984aee36c0d5d"
          className="mb-6 w-full object-cover h-48 filter grayscale hover:grayscale-0 transition-all duration-300"
          alt={name}
        />
        <p className="text-light/80 text-justify text-base leading-relaxed">
          anim in duis exercitation. mollit lorem et excepteur veniam cillum
          dolore labore dolore lorem consectetur pariatur mollit laborum. mollit
          ea aute sint nostrud irure tempor qui cillum. est consequat ex in
          lorem reprehenderit elit deserunt in aliqua amet veniam nulla fugiat
          et. non minim non lorem. cillum mollit deserunt adipisicing nisi non
          aute cillum excepteur. veniam fugiat irure nostrud enim.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="pt-[40vh] h-[50vh] mb-24" id="hero"></section>

      <section
        className="flex flex-row justify-end min-h-screen mb-36"
        id="info"
      >
        <div className="md:pl-[40dvw]">
          <h2 className="md:text-right text-5xl font-semibold uppercase mb-16">
            // about us
          </h2>
          <p className="text-xl text-left backdrop-blur-sm p-8 bg-white/5 border border-white/10 text-light/80 leading-relaxed">
            the open source programming club (ospc) at vit is a student-driven
            initiative aimed at fostering a culture of open-source development.
            our mission is to empower members with practical skills,
            community-driven projects, and insights into collaborative software
            development. <br />
            we believe in the power of open-source to bring about positive
            change and innovation. whether you're an experienced developer or
            just getting started, join us in building a world where knowledge is
            frely shared, and everyone has the opportunity to contribute!
          </p>
        </div>
      </section>

      <section className="mb-94">
        <h2 className="text-5xl font-semibold uppercase mb-16">// events</h2>
        <div className="md:pl-[30dvw] grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-16">
            {events
              .filter((_, i) => !(i % 2))
              .map(({ name }) => (
                <Event key={name} name={name} />
              ))}
          </div>
          <div className="flex flex-col gap-16 pt-64">
            {events
              .filter((_, i) => i % 2)
              .map(({ name }) => (
                <Event key={name} name={name} />
              ))}
          </div>
        </div>
      </section>

      {/* core members boardroom */}
      <section className="min-h-screen mb-36">
        <h2 className="text-center text-4xl md:text-5xl font-semibold uppercase mb-20">
          // core members
        </h2>

        <div className="max-w-6xl mx-auto px-8 space-y-16">
          {/* executive branch (president & vp) */}
          <div>
            <div className="font-mono text-xs text-gray uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
              // executive council
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {executive_team.map((member) => (
                <MemberCard
                  key={member.name}
                  member={member}
                  roleColorClass="text-gray"
                />
              ))}
            </div>
          </div>

          {/* development unit */}
          <div>
            <div className="font-mono text-xs text-secondary uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
              // development division
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dev_leads.map((member) => (
                <MemberCard
                  key={member.name}
                  member={member}
                  roleColorClass="text-secondary"
                />
              ))}
            </div>
          </div>

          {/* departmental units */}
          <div>
            <div className="font-mono text-xs text-gray uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
              // operational departments
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {single_lead_depts.map((member) => (
                <MemberCard
                  key={member.name}
                  member={member}
                  roleColorClass="text-gray"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
