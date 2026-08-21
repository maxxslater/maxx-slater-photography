import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Dir = "up" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  /** Wipe direction the content is uncovered from */
  from?: Dir;
  delay?: number;
  /** Fire a single-frame white flash as the content lands */
  flash?: boolean;
  className?: string;
}

const clipFrom: Record<Dir, string> = {
  up: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

const ease: [number, number, number, number] = [0.85, 0, 0.15, 1];

/**
 * Scroll-triggered exposure. Content is clipped to nothing, then the frame
 * opens in a single hard wipe — optionally with a blown-out flash on arrival,
 * like a print coming up in the tray.
 */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  flash = false,
  className = "",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ clipPath: clipFrom[from], y: from === "up" ? 24 : 0 }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        transition: { duration: 0.7, ease, delay },
      }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      style={{ willChange: "clip-path, transform" }}
    >
      {children}

      {flash && (
        <motion.span
          className="pointer-events-none absolute inset-0 z-10 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: [0, 0.85, 0],
            transition: { duration: 0.4, times: [0, 0.15, 1], delay, ease: "linear" },
          }}
          viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
        />
      )}
    </motion.div>
  );
}
