import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";

/**
 * FILM RAIL
 *
 * A 3px exposure bar welded to the left edge of the viewport plus a HUD
 * readout of scroll depth. The readout uses difference blending so it stays
 * legible whether it is sitting over black type or an inverted white slab.
 */
export default function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 320,
    damping: 40,
    restDelta: 0.001,
  });
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setPct(Math.round(v * 100))
  );

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <>
      {/* Exposure bar */}
      <div className="pointer-events-none fixed left-0 top-0 z-[140] hidden h-screen w-[3px] bg-white/15 md:block">
        <motion.div
          className="h-full w-full origin-top bg-white"
          style={{ scaleY }}
        />
      </div>

      {/* Depth readout */}
      <div className="pointer-events-none fixed bottom-3 left-[10px] z-[140] hidden mix-blend-difference md:block">
        <span className="mono vertical-type text-[9px] tabular-nums text-white">
          {String(pct).padStart(3, "0")} / 100
        </span>
      </div>
    </>
  );
}
