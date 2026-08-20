import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Marquee from "../components/Marquee";
import FrameSlot from "../components/FrameSlot";
import KineticWord from "../components/KineticWord";
import ScrambleText from "../components/ScrambleText";
import Reveal from "../components/Reveal";
import { featuredFrames, frames } from "../data/portfolio";

const indexLinks = [
  { to: "/portfolio", label: "Portfolio", n: "01", note: "Selected frames" },
  { to: "/about", label: "About", n: "02", note: "Who is behind the camera" },
  { to: "/contact", label: "Booking", n: "03", note: "Start a project" },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // The wordmark sinks and dims as the page scrolls past it
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const gridShift = useTransform(scrollYProgress, [0, 1], ["0px", "-90px"]);

  return (
    <div className="bg-black">
      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden border-b-2 border-white">
        <motion.div
          className="grid-lines absolute inset-0"
          style={{ y: gridShift }}
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_320px]">
          {/* Wordmark */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 lg:py-28"
          >
            <p className="mono mb-6 text-[10px] text-white/50 sm:text-xs">
              <ScrambleText
                text="[ PHOTOGRAPHER — COLUMBUS, OHIO ]"
                trigger="mount"
                duration={900}
              />
            </p>

            {/* Letters inflate along the variable width axis as the pointer passes */}
            <h1 className="display text-[19vw] leading-[0.78] sm:text-[16vw] lg:text-[13vw]">
              <KineticWord text="MAXX" className="block" />
              <KineticWord text="SLATER" className="block stroke" />
            </h1>

            <p className="display-wide mt-6 max-w-2xl text-lg leading-tight sm:text-2xl lg:text-3xl">
              The moments in between other moments — where true emotion lives.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/portfolio"
                className="mono border-2 border-white px-8 py-4 text-center text-xs font-medium transition-colors duration-100 hover:bg-white hover:text-black"
              >
                View the work →
              </Link>
              <Link
                to="/contact"
                className="mono border-2 border-white bg-white px-8 py-4 text-center text-xs font-medium text-black transition-colors duration-100 hover:bg-black hover:text-white"
              >
                Book a session
              </Link>
            </div>
          </motion.div>

          {/* Spec column */}
          <aside className="flex flex-col border-t-2 border-white lg:border-l-2 lg:border-t-0">
            <Spec label="Based" value="Columbus, OH" />
            <Spec label="Shooting" value="Portrait / Editorial / Live" />
            <Spec label="Approach" value="No posing. No forced smiles." />
            <Spec label="Frames" value={`${frames.length} in the index`} />
            <div className="mono flex flex-1 items-end justify-between px-4 py-4 text-[10px] text-white/40">
              <span>SCROLL</span>
              <span aria-hidden="true">↓</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ══ TICKER ══════════════════════════════════════════════ */}
      <Marquee
        items={[
          "SHOT + CURATED BY MAXX SLATER",
          "AVAILABLE FOR COMMISSIONS",
          "COLUMBUS / OHIO / EVERYWHERE",
          "BE YOURSELF",
        ]}
        invert
        className="border-t-0"
      />

      {/* ══ FEATURED STRIP ══════════════════════════════════════ */}
      <section className="border-b-2 border-white">
        <div className="flex items-center justify-between border-b-2 border-white px-4 py-3">
          <h2 className="mono text-xs font-medium">
            <ScrambleText text="[ 01 ] SELECTED WORK" />
          </h2>
          <Link
            to="/portfolio"
            className="mono text-[10px] text-white/60 transition-colors duration-100 hover:text-white hover:underline"
          >
            SEE ALL {String(frames.length).padStart(2, "0")} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-0.5 bg-white sm:grid-cols-3">
          {featuredFrames.slice(0, 3).map((frame, i) => (
            <Reveal key={frame.title} delay={i * 0.09} flash>
              <FrameSlot
                frame={frame}
                index={frames.indexOf(frame)}
                className="aspect-[4/5]"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ STATEMENT ═══════════════════════════════════════════ */}
      <section className="border-b-2 border-white">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <div className="mono border-b-2 border-white px-4 py-4 text-[10px] text-white/50 md:border-b-0 md:border-r-2">
            <ScrambleText text="[ 02 ] STATEMENT" />
          </div>
          <Reveal className="px-4 py-10 sm:py-16" from="left">
            <p className="display-thin text-3xl leading-[1.05] sm:text-5xl lg:text-6xl">
              I won&rsquo;t ask you to smile more,
              <br />
              <span className="display">or pose awkwardly.</span>
              <br />
              I&rsquo;ll only ask you to
              <br />
              <span className="display">be yourself.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ INDEX SLABS ═════════════════════════════════════════ */}
      <section>
        <div className="mono border-b-2 border-white px-4 py-3 text-xs font-medium">
          <ScrambleText text="[ 03 ] INDEX" />
        </div>

        {indexLinks.map(({ to, label, n, note }) => (
          <Link
            key={to}
            to={to}
            data-cursor={`GO ${n}`}
            className="group relative flex items-center justify-between overflow-hidden border-b-2 border-white px-4 py-6 text-white transition-colors duration-150 hover:text-black sm:py-8"
          >
            {/* Hard fill sweeps in from the left on hover */}
            <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-200 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:translate-x-0" />

            <span className="relative flex items-baseline gap-4 sm:gap-8">
              <span className="mono text-[10px] opacity-50">{n}</span>
              <span className="display text-5xl transition-transform duration-200 group-hover:translate-x-3 sm:text-7xl lg:text-8xl">
                {label}
              </span>
            </span>
            <span className="mono relative hidden text-[10px] opacity-60 sm:block">
              {note} →
            </span>
            <span className="mono relative text-lg sm:hidden" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}

/* ── Spec row ─────────────────────────────────────────────── */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b-2 border-white px-4 py-4">
      <p className="mono mb-1 text-[9px] text-white/40">{label}</p>
      <p className="mono text-[11px] leading-relaxed text-white">{value}</p>
    </div>
  );
}
