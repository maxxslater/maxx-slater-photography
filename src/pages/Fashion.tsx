import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrambleText from "../components/ScrambleText";
import Reveal from "../components/Reveal";

type FashionFrame = {
  src: string;
  original: number;
  size: "standard" | "wide" | "tall" | "hero";
};

// Final fashion edit. The original numbers preserve the review sequence:
// 1, 4, 7, 8, 12, 13, 14, 15, 16, 20, 22, 23.
const fashionFrames: FashionFrame[] = [
  { src: "/images/fashion/fashion-01.jpg", original: 1, size: "tall" },
  { src: "/images/fashion/fashion-02.jpg", original: 4, size: "standard" },
  { src: "/images/fashion/fashion-03.jpg", original: 7, size: "standard" },
  { src: "/images/fashion/fashion-04.jpg", original: 8, size: "wide" },
  { src: "/images/fashion/fashion-05.jpg", original: 12, size: "standard" },
  { src: "/images/fashion/fashion-06.jpg", original: 13, size: "tall" },
  { src: "/images/fashion/fashion-07.jpg", original: 14, size: "standard" },
  { src: "/images/fashion/fashion-08.jpg", original: 15, size: "wide" },
  { src: "/images/fashion/fashion-09.jpg", original: 16, size: "standard" },
  { src: "/images/fashion/fashion-10.jpg", original: 20, size: "hero" },
  { src: "/images/fashion/fashion-11.jpg", original: 22, size: "standard" },
  { src: "/images/fashion/fashion-12.jpg", original: 23, size: "hero" },
];

const spans: Record<FashionFrame["size"], string> = {
  standard: "col-span-1 row-span-1",
  tall: "col-span-1 row-span-2",
  wide: "col-span-2 row-span-1",
  hero: "col-span-2 row-span-2",
};

export default function Fashion() {
  const [selected, setSelected] = useState<number | null>(null);

  const step = useCallback((dir: 1 | -1) => {
    setSelected((cur) => {
      if (cur === null) return null;
      return (cur + dir + fashionFrames.length) % fashionFrames.length;
    });
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, step]);

  const current = selected === null ? null : fashionFrames[selected];

  return (
    <section className="bg-black text-white">
      <header className="border-b-2 border-white px-4 pb-10 pt-12 sm:pb-14 sm:pt-16">
        <div className="mb-6 flex items-center justify-between gap-6">
          <p className="mono text-[10px] text-white/50">[ 03 ] FASHION INDEX</p>
          <p className="mono hidden text-[10px] text-white/40 sm:block">
            EDITORIAL / FASHION / EVENTS — 2026
          </p>
        </div>
        <h1 className="display text-[19vw] leading-[0.72] sm:text-[15vw] lg:text-[12vw]">
          <ScrambleText text="FASHION" trigger="mount" duration={700} />
        </h1>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="mono max-w-xl text-[11px] leading-relaxed text-white/60">
            SELECTED FASHION, EDITORIAL + EVENT WORK. PHOTOGRAPHED AND CURATED BY MAXX SLATER.
          </p>
          <span className="mono text-[10px] text-white/40">12 SELECTED FRAMES</span>
        </div>
      </header>

      <div className="grid auto-rows-[48vw] grid-cols-2 gap-0.5 border-b-2 border-white bg-white sm:auto-rows-[30vw] sm:grid-cols-3 lg:auto-rows-[19vw] lg:grid-cols-4">
        {fashionFrames.map((frame, index) => (
          <Reveal
            key={frame.src}
            from={index % 2 ? "left" : "up"}
            delay={(index % 4) * 0.05}
            flash
            className={`h-full ${spans[frame.size]}`}
          >
            <motion.button
              layoutId={`fashion-${index}`}
              onClick={() => setSelected(index)}
              data-cursor="VIEW"
              className="group relative h-full w-full overflow-hidden bg-black text-left"
              aria-label={`Open fashion photograph ${index + 1}`}
            >
              <img
                src={frame.src}
                alt={`Fashion photograph ${index + 1} by Maxx Slater`}
                className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-[1.025]"
              />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between border-t border-white/70 bg-black/90 px-3 py-2 transition-transform duration-200 group-hover:translate-y-0">
                <span className="mono text-[9px]">FRAME {String(index + 1).padStart(2, "0")}</span>
                <span className="mono text-[9px] text-white/50">MSP / 2026</span>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>

      <div className="mono flex flex-col gap-2 px-4 py-6 text-[10px] text-white/40 sm:flex-row sm:justify-between">
        <span>END OF FASHION INDEX</span>
        <span>ALL IMAGES © MAXX SLATER — DO NOT REPRODUCE</span>
      </div>

      <AnimatePresence>
        {current && selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] flex flex-col bg-black"
            onClick={() => setSelected(null)}
          >
            <div className="flex items-stretch justify-between border-b-2 border-white">
              <span className="mono flex items-center px-4 py-3 text-[10px] text-white/60">
                {String(selected + 1).padStart(2, "0")} / {String(fashionFrames.length).padStart(2, "0")}
              </span>
              <span className="mono hidden items-center text-[10px] text-white/40 sm:flex">
                FASHION / EDITORIAL — MAXX SLATER
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(null);
                }}
                className="mono border-l-2 border-white px-5 text-xs hover:bg-white hover:text-black"
              >
                Close ✕
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8" onClick={(e) => e.stopPropagation()}>
              <motion.div
                layoutId={`fashion-${selected}`}
                transition={{ duration: 0.4, ease: [0.85, 0, 0.15, 1] }}
                className="flex h-full w-full items-center justify-center"
              >
                <img src={current.src} alt={`Fashion photograph ${selected + 1}`} className="max-h-[78vh] max-w-full object-contain" />
              </motion.div>
            </div>

            <div className="flex items-stretch justify-between border-t-2 border-white">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="mono border-r-2 border-white px-6 py-3 text-xs hover:bg-white hover:text-black"
              >
                ← Prev
              </button>
              <span className="mono hidden items-center text-[10px] text-white/30 sm:flex">USE ← → KEYS / ESC TO CLOSE</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="mono border-l-2 border-white px-6 py-3 text-xs hover:bg-white hover:text-black"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
