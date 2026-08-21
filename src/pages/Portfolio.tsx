import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FrameSlot from "../components/FrameSlot";
import ScrambleText from "../components/ScrambleText";
import Reveal from "../components/Reveal";
import { frames, categories, spanFor } from "../data/portfolio";

export default function Portfolio() {
  const [filter, setFilter] = useState<string>("ALL");
  const [selected, setSelected] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "ALL" ? frames : frames.filter((f) => f.category === filter)),
    [filter]
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      setSelected((cur) => {
        if (cur === null) return cur;
        const i = visible.findIndex((f) => f === frames[cur]);
        const next = (i + dir + visible.length) % visible.length;
        return frames.indexOf(visible[next]);
      });
    },
    [visible]
  );

  // Keyboard control for the lightbox
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

  const current = selected !== null ? frames[selected] : null;

  return (
    <section className="bg-black">
      {/* ══ MASTHEAD ════════════════════════════════════════════ */}
      <div className="border-b-2 border-white px-4 py-10 sm:py-14">
        <p className="mono mb-5 text-[10px] text-white/50">[ 02 ] PORTFOLIO</p>
        <h1 className="display text-[18vw] leading-[0.78] sm:text-[14vw] lg:text-[11vw]">
          <ScrambleText text="PORTFOLIO" trigger="mount" duration={700} />
        </h1>
        <p className="mono mt-6 max-w-md text-[11px] leading-relaxed text-white/60">
          SELECTED WORK SHOT + CURATED BY MAXX SLATER.
        </p>
      </div>

      {/* ══ FILTER BAR ══════════════════════════════════════════ */}
      <div className="flex flex-wrap items-stretch border-b-2 border-white">
        {["ALL", ...categories.map((c) => c.toUpperCase())].map((cat) => {
          const active = filter === (cat === "ALL" ? "ALL" : cat);
          const value =
            cat === "ALL"
              ? "ALL"
              : categories.find((c) => c.toUpperCase() === cat) ?? "ALL";
          return (
            <button
              key={cat}
              onClick={() => setFilter(value)}
              className={`mono border-r-2 border-white px-4 py-3 text-[10px] font-medium transition-colors duration-100 ${
                active
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }`}
            >
              {cat}
            </button>
          );
        })}
        <span className="mono ml-auto hidden items-center px-4 text-[10px] text-white/40 sm:flex">
          {String(visible.length).padStart(2, "0")} FRAMES
        </span>
      </div>

      {/* ══ GRID ════════════════════════════════════════════════
          White container + 2px gaps = hard rules between every cell */}
      <div className="grid auto-rows-[42vw] grid-cols-2 gap-0.5 border-b-2 border-white bg-white sm:auto-rows-[28vw] sm:grid-cols-3 lg:auto-rows-[19vw] lg:grid-cols-4">
        {visible.map((frame, i) => {
          const idx = frames.indexOf(frame);
          return (
            <Reveal
              key={frame.title}
              from={i % 2 === 0 ? "up" : "left"}
              delay={(i % 4) * 0.06}
              flash
              className={`h-full ${spanFor[frame.size]}`}
            >
              <FrameSlot
                frame={frame}
                index={idx}
                layoutId={`frame-${idx}`}
                className="h-full"
                onClick={() => setSelected(idx)}
              />
            </Reveal>
          );
        })}
      </div>

      {/* ══ END NOTE ════════════════════════════════════════════ */}
      <div className="mono flex flex-col gap-2 px-4 py-6 text-[10px] text-white/40 sm:flex-row sm:justify-between">
        <span>END OF INDEX</span>
        <span>ALL IMAGES © MAXX SLATER — DO NOT REPRODUCE</span>
      </div>

      {/* ══ LIGHTBOX ════════════════════════════════════════════ */}
      <AnimatePresence>
        {current && selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-[160] flex flex-col bg-black"
            onClick={() => setSelected(null)}
          >
            {/* Top rail */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: [0.85, 0, 0.15, 1] }}
              className="flex items-stretch justify-between border-b-2 border-white bg-black"
            >
              <span className="mono flex items-center px-4 py-3 text-[10px] text-white/60">
                {String(selected + 1).padStart(2, "0")} /{" "}
                {String(frames.length).padStart(2, "0")}
              </span>
              <span className="mono hidden items-center px-4 text-[10px] text-white/60 sm:flex">
                {current.title.toUpperCase()} — {current.category.toUpperCase()} /{" "}
                {current.year}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(null);
                }}
                className="mono border-l-2 border-white px-5 text-xs transition-colors duration-100 hover:bg-white hover:text-black"
                aria-label="Close"
              >
                Close ✕
              </button>
            </motion.div>

            {/* Stage */}
            <div
              className="flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Shared element: the clicked cell physically flies into place */}
              <motion.div
                layoutId={`frame-${selected}`}
                transition={{ duration: 0.42, ease: [0.85, 0, 0.15, 1] }}
                className="flex max-h-full w-full max-w-3xl items-center justify-center"
              >
                {current.src ? (
                  <img
                    src={current.src}
                    alt={current.alt ?? current.title}
                    className="max-h-[72vh] max-w-full border-2 border-white object-contain"
                  />
                ) : (
                  <div className="hatch flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 border-2 border-white">
                    <span className="display text-7xl text-white/20 sm:text-9xl">
                      {String(selected + 1).padStart(2, "0")}
                    </span>
                    <span className="mono text-[10px] text-white/50">
                      EMPTY SLOT — ADD A PATH IN src/data/portfolio.ts
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Bottom rail */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.85, 0, 0.15, 1] }}
              className="flex items-stretch justify-between border-t-2 border-white bg-black"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="mono border-r-2 border-white px-6 py-3 text-xs transition-colors duration-100 hover:bg-white hover:text-black"
                aria-label="Previous"
              >
                ← Prev
              </button>
              <span className="mono flex items-center px-4 text-[10px] text-white/40 sm:hidden">
                {current.title.toUpperCase()}
              </span>
              <span className="mono hidden flex-1 items-center justify-center text-[10px] text-white/30 sm:flex">
                USE ← → KEYS / ESC TO CLOSE
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="mono border-l-2 border-white px-6 py-3 text-xs transition-colors duration-100 hover:bg-white hover:text-black"
                aria-label="Next"
              >
                Next →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
