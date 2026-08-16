import { Link } from "react-router-dom";

/* Replace this empty string with your image path, e.g. "/images/portrait.jpg" */
const PORTRAIT_URL = "";

export default function About() {
  return (
    <section className="min-h-screen bg-neutral-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* ── Left: Portrait Image ── */}
        <div className="relative overflow-hidden lg:min-h-screen">
          {PORTRAIT_URL ? (
            <>
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-neutral-950/40" />
              <img
                src={PORTRAIT_URL}
                alt="Maxx Slater — photographer portrait"
                className="h-[55vh] w-full object-cover object-top lg:h-full lg:sticky lg:top-0"
              />
            </>
          ) : (
            /* Placeholder */
            <div className="flex h-[55vh] lg:h-full w-full flex-col items-center justify-center gap-4 bg-neutral-900 border-r border-neutral-800/50">
              <svg
                className="h-16 w-16 text-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={0.75}
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <p className="text-sm tracking-[0.2em] uppercase text-neutral-600 font-light">
                Your Photo Here
              </p>
            </div>
          )}

          {/* Mobile overlay name */}
          <div className="absolute bottom-8 left-6 z-20 lg:hidden">
            <p className="text-xs font-light tracking-[0.35em] uppercase text-neutral-400">
              The Photographer
            </p>
          </div>
        </div>

        {/* ── Right: Bio & Text ── */}
        <div className="flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 xl:px-24 lg:py-24">
          {/* Section label */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/60" />
            <p className="text-xs font-light tracking-[0.35em] uppercase text-amber-400">
              About Me
            </p>
          </div>

          {/* Heading */}
          <h1 className="mb-10 text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-wide text-white leading-tight">
            Hey, I'm{" "}
            <span className="font-black">Maxx</span>.
          </h1>

          {/* Bio copy */}
          <div className="space-y-6 text-base sm:text-lg font-light leading-relaxed text-neutral-400 mb-12">
            <p>
              Based in <span className="text-white font-normal">Columbus, Ohio</span> with
              a global vision — I'm driven to create work that goes beyond
              expectations, <span className="text-white font-normal">naturally</span>.
              No overproduced setups, no forced smiles — just honest, intentional
              images that actually feel like you.
            </p>

            <p>
              Whether you need brand content, portraits, or something you
              haven't quite figured out yet, I'd love to hear about it.{" "}
              <span className="text-amber-400/90 font-normal">Let's make something worth looking at.</span>
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 self-start border border-amber-400/30 px-8 py-4 text-sm font-light tracking-[0.25em] uppercase text-amber-400 transition-all duration-500 hover:bg-amber-400 hover:text-neutral-950 hover:tracking-[0.35em]"
          >
            Let's Work Together
            <svg
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
