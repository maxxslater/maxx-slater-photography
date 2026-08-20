import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

/*
 * Brutalist transition: no easing mush, no fades into nothing.
 * ENTER → hard vertical wipe up from the bottom edge.
 * EXIT  → the panel snaps away upward and clips shut.
 */

const ease: [number, number, number, number] = [0.85, 0, 0.15, 1];

const variants: Variants = {
  initial: {
    clipPath: "inset(100% 0% 0% 0%)",
    y: 24,
  },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    transition: { duration: 0.45, ease },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    y: -24,
    transition: { duration: 0.3, ease },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-black"
      style={{ willChange: "clip-path, transform" }}
    >
      {children}
    </motion.div>
  );
}
