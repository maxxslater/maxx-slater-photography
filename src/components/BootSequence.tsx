import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BOOT SEQUENCE
 *
 * A one-per-session cold start: exposure counter races 000 → 100 while the
 * loading bar develops, then the plate splits and rakes off the screen.
 * Click, tap or any keypress skips it.
 */
export default function BootSequence() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("msp-booted");
    if (reduce || seen) return;

    sessionStorage.setItem("msp-booted", "1");
    setShow(true);
    document.body.style.overflow = "hidden";

    const started = performance.now();
    const DURATION = 1500;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - started) / DURATION, 1);
      // Uneven, mechanical ramp — not a smooth linear fill
      const eased = p < 0.7 ? p * 1.25 : 0.875 + (p - 0.7) * 0.417;
      setCount(Math.min(100, Math.round(eased * 100)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 220);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => setShow(false);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-black px-4 py-4"
          /* Backdrop drops instantly at exit so the plates are what you see rake away */
          exit={{
            backgroundColor: "rgba(0,0,0,0)",
            transition: { duration: 0.001 },
          }}
        >
          {/* Rake-off plates */}
          <div className="pointer-events-none absolute inset-0 flex">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-black"
                initial={{ scaleY: 1 }}
                exit={{
                  scaleY: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.85, 0, 0.15, 1],
                    delay: i * 0.035,
                  },
                }}
                style={{ originY: i % 2 === 0 ? 0 : 1 }}
              />
            ))}
          </div>

          <motion.div
            className="relative flex items-start justify-between"
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <span className="mono text-[10px] text-white/50">
              MAXX SLATER PHOTOGRAPHY
            </span>
            <span className="mono text-[10px] text-white/50">EXPOSING…</span>
          </motion.div>

          <motion.div
            className="relative flex flex-col gap-4"
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <div className="flex items-end justify-between gap-4">
              <span className="display text-[22vw] leading-[0.8] text-white sm:text-[16vw]">
                {String(count).padStart(3, "0")}
              </span>
              <span className="mono hidden pb-4 text-[10px] text-white/40 sm:block">
                ISO 400 / f2.0 / 1&frasl;125
              </span>
            </div>

            {/* Development bar */}
            <div className="h-3 w-full border-2 border-white">
              <div
                className="hatch h-full bg-white/90 transition-none"
                style={{ width: `${count}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            className="relative flex items-end justify-between"
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <span className="mono text-[10px] text-white/50">
              39.9612° N / 82.9988° W
            </span>
            <span className="mono text-[10px] text-white/30">
              CLICK TO SKIP
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
