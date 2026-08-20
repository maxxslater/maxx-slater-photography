import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

/*
 * SHUTTER TRANSITION
 *
 * Navigation is treated as an exposure. Ten slats slam shut across the
 * viewport (alternating origins, so it rakes rather than wipes), the frame
 * is swapped behind them, a single-frame flash fires, then the slats retract
 * and the destination's name burns off the screen.
 *
 * Because AnimatePresence runs in "wait" mode, the closing slats belong to
 * the outgoing page and the opening slats to the incoming one — the two
 * halves of the shutter cycle are synchronised by construction.
 */

const SLATS = 10;
const ease: [number, number, number, number] = [0.85, 0, 0.15, 1];

const labels: Record<string, string> = {
  "/": "Index",
  "/portfolio": "Portfolio",
  "/about": "About",
  "/contact": "Booking",
  "/terms": "Terms",
  "/privacy": "Privacy",
};

const slatVariants: Variants = {
  initial: { scaleY: 1 },
  animate: (i: number) => ({
    scaleY: 0,
    transition: { duration: 0.42, ease, delay: i * 0.028 },
  }),
  exit: (i: number) => ({
    scaleY: 1,
    transition: { duration: 0.34, ease, delay: i * 0.02 },
  }),
};

const pageVariants: Variants = {
  initial: { opacity: 0, y: 18, scale: 0.995 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease, delay: 0.12 },
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease } },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  if (reduce) return <div className="min-h-screen bg-black">{children}</div>;

  return (
    <>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-black"
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>

      {/* ── Shutter slats ── */}
      <div className="pointer-events-none fixed inset-0 z-[150] flex">
        {Array.from({ length: SLATS }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={slatVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full flex-1 border-r border-white/10 bg-black"
            style={{
              originY: i % 2 === 0 ? 0 : 1,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* ── Exposure flash ── */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[151] bg-white"
        initial={{ opacity: 0.22 }}
        animate={{ opacity: 0, transition: { duration: 0.18, ease: "linear" } }}
        exit={{ opacity: 0.14, transition: { duration: 0.3, ease: "linear" } }}
      />

      {/* ── Destination stamp ── */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[152] flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, transition: { duration: 0.45, ease, delay: 0.1 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <motion.span
          className="display text-[14vw] leading-none text-white mix-blend-difference"
          initial={{ letterSpacing: "0.3em", opacity: 0.9 }}
          animate={{
            letterSpacing: "-0.02em",
            opacity: 0,
            transition: { duration: 0.6, ease },
          }}
        >
          {labels[pathname] ?? "Maxx Slater"}
        </motion.span>
      </motion.div>
    </>
  );
}
