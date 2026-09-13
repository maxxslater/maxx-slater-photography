import { Link } from "react-router-dom";

export default function Galleries() {
  return (
    <div className="bg-black text-white">
      {/* Page header */}
      <section className="border-b-2 border-white px-4 pb-10 pt-16 sm:px-6 sm:pb-14 sm:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <p className="mono mb-4 text-[10px] uppercase tracking-[0.25em] text-white/50">
            Client + Collaborator Access
          </p>

          <h1 className="display text-[18vw] leading-[0.75] sm:text-[12vw]">
            Galleries
          </h1>

          <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:ml-auto">
            <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
              Private image collections for models, collaborators, clients, and
              event participants.
            </p>

            <p className="mono text-[10px] uppercase tracking-wider text-white/40">
              Select a gallery below to continue.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery directory */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-6 flex items-center justify-between border-b border-white/30 pb-3">
            <span className="mono text-[10px] uppercase tracking-wider text-white/50">
              Available Galleries
            </span>

            <span className="mono text-[10px] text-white/30">
              02 COLLECTIONS
            </span>
          </div>

          <div className="grid gap-0.5 bg-white md:grid-cols-2">
            {/* Pink Pony */}
            <Link
              to="/galleries/pink-pony-2026"
              data-cursor="OPEN"
              className="group relative min-h-[480px] overflow-hidden bg-black"
            >
             <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
  <span className="select-none text-[220px] leading-none text-white/[0.06] grayscale opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-80 sm:text-[300px]">
    🔒
  </span>
</div>

              <div className="absolute right-4 top-4 border border-white/40 bg-black px-3 py-2">
                <span className="mono text-[9px] uppercase tracking-wider">
                  🔒 Private
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 border-t-2 border-white bg-black/90 p-5 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                    Event Gallery / 01
                  </span>

                  <span className="mono text-[9px] text-white/40">2026</span>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="display text-5xl leading-none sm:text-6xl">
                      Pink Pony
                    </h2>

                    <p className="mono mt-3 text-[10px] uppercase tracking-wider text-white/50">
                      Creator Event
                    </p>
                  </div>

                  <span className="mono shrink-0 text-xs transition-transform duration-200 group-hover:translate-x-2">
                    Enter →
                  </span>
                </div>
              </div>
            </Link>

            {/* Polo */}
            <Link
              to="/galleries/polo-2026"
              data-cursor="OPEN"
              className="group relative min-h-[480px] overflow-hidden bg-black"
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
  <span className="select-none text-[220px] leading-none text-white/[0.06] grayscale opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-80 sm:text-[300px]">
    🔒
  </span>
</div>

              <div className="absolute right-4 top-4 border border-white/40 bg-black px-3 py-2">
                <span className="mono text-[9px] uppercase tracking-wider">
                  🔒 Private
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 border-t-2 border-white bg-black/90 p-5 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                    Event Gallery / 02
                  </span>

                  <span className="mono text-[9px] text-white/40">2026</span>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="display text-5xl leading-none sm:text-6xl">
                      Polo, Porsches &amp; Pilates
                    </h2>

                    <p className="mono mt-3 text-[10px] uppercase tracking-wider text-white/50">
                      Baker Creek Equestrian
                    </p>
                  </div>

                  <span className="mono shrink-0 text-xs transition-transform duration-200 group-hover:translate-x-2">
                    Enter →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
