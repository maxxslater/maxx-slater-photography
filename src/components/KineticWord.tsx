import { useEffect, useRef } from "react";

interface KineticWordProps {
  text: string;
  className?: string;
  /** Radius of pointer influence, in px */
  radius?: number;
}

/**
 * KINETIC VARIABLE WORDMARK
 *
 * Every letter is an independent instance of Archivo's variable axes. As the
 * pointer travels across the word, nearby letters inflate along the `wdth`
 * axis (62 → 125) and gain weight, while distant ones stay condensed — the
 * headline physically breathes around the cursor instead of just glowing.
 *
 * Writes go straight to `style.fontVariationSettings` inside a single rAF,
 * so React never re-renders during the interaction.
 */
export default function KineticWord({
  text,
  className = "",
  radius = 260,
}: KineticWordProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const targets = useRef<number[]>([]);
  const current = useRef<number[]>([]);
  const pointer = useRef({ x: -9999, y: -9999 });
  const active = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    const n = text.length;
    targets.current = new Array(n).fill(0);
    current.current = new Array(n).fill(0);

    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      active.current = true;
    };
    const onLeave = () => {
      active.current = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let frame = 0;

    const loop = () => {
      frame++;
      // Recompute letter geometry occasionally rather than every frame
      const measure = frame % 20 === 1;

      for (let i = 0; i < n; i++) {
        const el = letterRefs.current[i];
        if (!el) continue;

        if (measure || !el.dataset.cx) {
          const r = el.getBoundingClientRect();
          el.dataset.cx = String(r.left + r.width / 2);
          el.dataset.cy = String(r.top + r.height / 2);
        }

        const cx = Number(el.dataset.cx);
        const cy = Number(el.dataset.cy);
        const dx = pointer.current.x - cx;
        const dy = (pointer.current.y - cy) * 0.7;
        const dist = Math.sqrt(dx * dx + dy * dy);

        targets.current[i] = active.current
          ? Math.max(0, 1 - dist / radius) ** 1.6
          : 0;

        current.current[i] += (targets.current[i] - current.current[i]) * 0.16;

        const t = current.current[i];
        if (t > 0.002 || Math.abs(targets.current[i] - t) > 0.002) {
          const wdth = 62 + t * 63; // 62 → 125
          const wght = 400 + t * 500; // 400 → 900
          el.style.fontVariationSettings = `'wdth' ${wdth.toFixed(1)}, 'wght' ${wght.toFixed(0)}`;
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [text, radius]);

  return (
    <span ref={wrapRef} className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="inline-block will-change-[font-variation-settings]"
          style={{ fontVariationSettings: "'wdth' 62, 'wght' 900" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
