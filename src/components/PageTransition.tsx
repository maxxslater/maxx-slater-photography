import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

/*
 * Two-phase animation:
 *
 * EXIT  → zoom out (scale 1 → 0.8, rounds corners), then swipe left
 * ENTER → swipe in from right, then zoom up to full (corners sharpen)
 *
 * Uses framer-motion keyframes for the multi-step feel.
 */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const variants: Variants = {
  initial: {
    scale: 0.82,
    x: "100%",
    opacity: 0,
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
  },
  animate: {
    scale: [0.82, 0.82, 1],
    x: ["100%", "0%", "0%"],
    opacity: [0, 1, 1],
    borderRadius: ["24px", "24px", "0px"],
    border: [
      "1px solid rgba(255, 255, 255, 0.15)",
      "1px solid rgba(255, 255, 255, 0.15)",
      "1px solid rgba(255, 255, 255, 0)",
    ],
    boxShadow: [
      "0 25px 60px rgba(0, 0, 0, 0.5)",
      "0 25px 60px rgba(0, 0, 0, 0.5)",
      "0 0px 0px rgba(0, 0, 0, 0)",
    ],
    transition: {
      duration: 0.75,
      ease,
      times: [0, 0.5, 1],
    },
  },
  exit: {
    scale: [1, 0.82, 0.82],
    x: ["0%", "0%", "-100%"],
    opacity: [1, 1, 0],
    borderRadius: ["0px", "24px", "24px"],
    border: [
      "1px solid rgba(255, 255, 255, 0)",
      "1px solid rgba(255, 255, 255, 0.15)",
      "1px solid rgba(255, 255, 255, 0.15)",
    ],
    boxShadow: [
      "0 0px 0px rgba(0, 0, 0, 0)",
      "0 25px 60px rgba(0, 0, 0, 0.5)",
      "0 25px 60px rgba(0, 0, 0, 0.5)",
    ],
    transition: {
      duration: 0.65,
      ease,
      times: [0, 0.45, 1],
    },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen origin-center overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
