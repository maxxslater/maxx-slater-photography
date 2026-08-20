import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";

const facts = [
  { k: "Name", v: "Maxx Slater" },
  { k: "Role", v: "Independent Photographer" },
  { k: "Base", v: "Columbus, Ohio" },
  { k: "Shoots", v: "Portrait / Editorial / Live / Brand" },
  { k: "Direction", v: "Minimal — you, as you are" },
  { k: "Status", v: "Open for bookings" },
];

export default function About() {
  return (
    <section className="bg-black">
      {/* ══ MASTHEAD ════════════════════════════════════════════ */}
      <div className="border-b-2 border-white px-4 py-10 sm:py-14">
        <p className="mono mb-5 text-[10px] text-white/50">[ 03 ] ABOUT</p>
        <h1 className="display text-[20vw] leading-[0.78] sm:text-[15vw] lg:text-[12vw]">
          About
        </h1>
      </div>

      {/* ══ PORTRAIT + BIO ══════════════════════════════════════ */}
      <div className="grid grid-cols-1 border-b-2 border-white lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* Portrait */}
        <div className="relative border-b-2 border-white lg:border-b-0 lg:border-r-2">
          <img
            src="/images/portrait.jpg"
            alt="Maxx Slater — photographer portrait"
            className="h-full max-h-[70vh] w-full object-cover object-top grayscale contrast-125 lg:max-h-none"
          />
          <span className="mono absolute left-0 top-0 border-b-2 border-r-2 border-white bg-black px-2 py-1 text-[9px]">
            FIG. 01
          </span>
          <span className="mono absolute bottom-0 right-0 border-l-2 border-t-2 border-white bg-black px-2 py-1 text-[9px] text-white/60">
            THE PHOTOGRAPHER
          </span>
        </div>

        {/* Bio */}
        <div className="flex flex-col justify-center px-4 py-10 sm:px-8 sm:py-16">
          <p className="display text-4xl leading-[0.9] sm:text-6xl lg:text-7xl">
            Hey,
            <br />
            I&rsquo;m Maxx.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-white/80 sm:text-lg">
            <p>
              An independent photographer based out of{" "}
              <span className="bg-white px-1 font-semibold text-black">
                Columbus, Ohio
              </span>
              .
            </p>
            <p>
              My work seeks out the hidden moments — the moments that are
              in-between other moments, where true emotion lives.
            </p>
            <p>
              I won&rsquo;t ask you to smile more, or coach you to pose in an
              awkward position. I&rsquo;ll only ask you to be yourself.
            </p>
            <p>
              Please don&rsquo;t hesitate to reach out. I would love the
              opportunity to work together.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="mono border-2 border-white bg-white px-8 py-4 text-center text-xs font-medium text-black transition-colors duration-100 hover:bg-black hover:text-white"
            >
              Book a session →
            </Link>
            <Link
              to="/portfolio"
              className="mono border-2 border-white px-8 py-4 text-center text-xs font-medium transition-colors duration-100 hover:bg-white hover:text-black"
            >
              See the work
            </Link>
          </div>
        </div>
      </div>

      {/* ══ SPEC SHEET ══════════════════════════════════════════ */}
      <div className="border-b-2 border-white">
        <p className="mono border-b-2 border-white px-4 py-3 text-xs font-medium">
          [ 04 ] SPEC SHEET
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(({ k, v }) => (
            <div
              key={k}
              className="border-b-2 border-white px-4 py-5 last:border-b-0 sm:border-r-2 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-2 lg:[&:nth-child(3n)]:border-r-0"
            >
              <dt className="mono mb-2 text-[9px] text-white/40">{k}</dt>
              <dd className="mono text-[12px] text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Marquee
        items={[
          "BE YOURSELF",
          "NO FORCED SMILES",
          "THE MOMENTS IN BETWEEN",
          "COLUMBUS, OHIO",
        ]}
        className="border-t-0"
      />
    </section>
  );
}
