import Reveal from "./Reveal";

interface Section {
  heading: string;
  body: React.ReactNode;
}

interface LegalDocProps {
  index: string;
  title: string;
  subtitle: string;
  sections: Section[];
}

/**
 * Shared brutalist document shell: numbered masthead, hard-ruled
 * clause rows, machine-set metadata.
 */
export default function LegalDoc({
  index,
  title,
  subtitle,
  sections,
}: LegalDocProps) {
  return (
    <section className="bg-black">
      <div className="border-b-2 border-white px-4 py-10 sm:py-14">
        <p className="mono mb-5 text-[10px] text-white/50">[ {index} ] LEGAL</p>
        <h1 className="display text-[13vw] leading-[0.78] sm:text-[10vw] lg:text-[8vw]">
          {title}
        </h1>
        <p className="mono mt-6 text-[10px] text-white/50">{subtitle}</p>
      </div>

      <div className="border-b-2 border-white">
        {sections.map((section, i) => (
          <Reveal
            key={section.heading}
            from="left"
            className="grid grid-cols-1 border-b-2 border-white last:border-b-0 md:grid-cols-[220px_1fr]"
          >
            <div className="mono border-b-2 border-white px-4 py-4 text-[10px] text-white/60 md:border-b-0 md:border-r-2">
              <span className="mr-2 opacity-40">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </div>
            <div className="px-4 py-6 text-sm leading-relaxed text-white/75 sm:text-base">
              {section.body}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mono flex flex-col gap-2 px-4 py-6 text-[10px] text-white/40 sm:flex-row sm:justify-between">
        <span>
          LAST UPDATED:{" "}
          {new Date()
            .toLocaleDateString("en-US", { month: "long", year: "numeric" })
            .toUpperCase()}
        </span>
        <span>MAXX SLATER PHOTOGRAPHY — COLUMBUS, OHIO</span>
      </div>
    </section>
  );
}
