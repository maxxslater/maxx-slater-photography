import { useEffect, useRef, useState } from "react";

const CHARS = "▚▞█▓▒░#@$%&*+=<>/\\|01AXZ";

type Trigger = "mount" | "view" | "hover";

interface ScrambleTextProps {
  text: string;
  /** mount = on first paint, view = when scrolled into frame, hover = on pointer enter */
  trigger?: Trigger;
  /** ms for the full decode */
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Type that decodes itself out of noise. Characters resolve left to right
 * while the unresolved tail keeps churning through a glyph set — the text
 * never fades, it *develops*.
 */
export default function ScrambleText({
  text,
  trigger = "view",
  duration = 620,
  delay = 0,
  className = "",
}: ScrambleTextProps) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const done = useRef(false);

  const run = () => {
    cancelAnimationFrame(raf.current);
    const start = performance.now() + delay;
    const len = text.length;

    const tick = (now: number) => {
      const p = Math.min(Math.max((now - start) / duration, 0), 1);
      const resolved = Math.floor(p * len);

      let next = "";
      for (let i = 0; i < len; i++) {
        const ch = text[i];
        if (ch === " ") {
          next += " ";
        } else if (i < resolved) {
          next += ch;
        } else {
          next += CHARS[(Math.random() * CHARS.length) | 0];
        }
      }
      setOut(next);

      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setOut(text);
    };

    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || trigger === "hover") return;

    if (trigger === "mount") {
      run();
      return () => cancelAnimationFrame(raf.current);
    }

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          run();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  return (
    <span
      ref={ref}
      onPointerEnter={trigger === "hover" ? run : undefined}
      className={className}
      // Keeps layout stable while glyphs churn
      style={{ display: "inline-block" }}
    >
      {out}
    </span>
  );
}
