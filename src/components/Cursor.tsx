import { useEffect, useRef, useState } from "react";

/**
 * VIEWFINDER CURSOR
 *
 * Replaces the pointer with a camera focus system: full-bleed crosshair
 * hairlines, a live coordinate readout, and focus brackets that physically
 * snap onto any element marked with `data-cursor="LABEL"`.
 *
 * One rAF loop, all writes are direct transform mutations — no React
 * re-renders while moving.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);

  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Live pointer target + eased current position
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  // Focus box: x, y, w, h — eased toward either the reticle or a locked element
  const box = useRef({ x: 0, y: 0, w: 26, h: 26 });
  const boxTarget = useRef({ x: 0, y: 0, w: 26, h: 26 });
  const locked = useRef(false);
  const label = useRef("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = fine.matches && !reduce.matches;
    setEnabled(on);
    if (!on) return;

    document.documentElement.classList.add("has-cursor");
    return () => document.documentElement.classList.remove("has-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor], a, button"
      ) as HTMLElement | null;

      if (el) {
        const r = el.getBoundingClientRect();
        const tag =
          el.dataset.cursor ??
          (el.tagName === "A" ? "OPEN" : el.tagName === "BUTTON" ? "PRESS" : "");

        // Only snap the brackets onto sanely sized targets — full-bleed slabs
        // keep the reticle loose but still announce themselves in the readout
        if (r.width < window.innerWidth * 0.92 && r.height < 400) {
          const pad = 6;
          boxTarget.current = {
            x: r.left - pad,
            y: r.top - pad,
            w: r.width + pad * 2,
            h: r.height + pad * 2,
          };
          locked.current = true;
          label.current = tag;
          return;
        }

        locked.current = false;
        label.current = tag;
        return;
      }

      locked.current = false;
      label.current = "";
    };

    const onDown = () => {
      if (boxRef.current) boxRef.current.style.borderColor = "rgba(255,255,255,0.4)";
    };
    const onUp = () => {
      if (boxRef.current) boxRef.current.style.borderColor = "#fff";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    let raf = 0;
    const loop = () => {
      const t = target.current;
      const p = pos.current;

      // Hairlines track the pointer almost 1:1 — the brackets lag behind
      p.x += (t.x - p.x) * 0.55;
      p.y += (t.y - p.y) * 0.55;

      if (!locked.current) {
        boxTarget.current = { x: t.x - 13, y: t.y - 13, w: 26, h: 26 };
      }

      const b = box.current;
      const bt = boxTarget.current;
      const k = locked.current ? 0.28 : 0.4;
      b.x += (bt.x - b.x) * k;
      b.y += (bt.y - b.y) * k;
      b.w += (bt.w - b.w) * k;
      b.h += (bt.h - b.h) * k;

      if (hRef.current) hRef.current.style.transform = `translate3d(0, ${p.y}px, 0)`;
      if (vRef.current) vRef.current.style.transform = `translate3d(${p.x}px, 0, 0)`;
      if (readRef.current)
        readRef.current.style.transform = `translate3d(${t.x + 18}px, ${t.y + 18}px, 0)`;
      if (boxRef.current) {
        const el = boxRef.current;
        el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
        el.style.width = `${b.w}px`;
        el.style.height = `${b.h}px`;
      }
      if (readRef.current) {
        readRef.current.textContent = `X${String(Math.round(t.x)).padStart(4, "0")} Y${String(
          Math.round(t.y)
        ).padStart(4, "0")}${label.current ? `  ▸ ${label.current}` : ""}`;
      }
      if (labelRef.current) {
        labelRef.current.style.opacity = locked.current ? "1" : "0";
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      {/* Hairlines */}
      <div
        ref={hRef}
        className="absolute left-0 top-0 h-px w-full bg-white/20 will-change-transform"
      />
      <div
        ref={vRef}
        className="absolute left-0 top-0 h-full w-px bg-white/20 will-change-transform"
      />

      {/* Focus brackets — four corner marks, never a full box */}
      <div
        ref={boxRef}
        className="absolute left-0 top-0 border-white will-change-transform"
        style={{ borderColor: "#fff" }}
      >
        <span className="absolute -left-px -top-px h-2 w-2 border-l-2 border-t-2 border-white" />
        <span className="absolute -right-px -top-px h-2 w-2 border-r-2 border-t-2 border-white" />
        <span className="absolute -bottom-px -left-px h-2 w-2 border-b-2 border-l-2 border-white" />
        <span className="absolute -bottom-px -right-px h-2 w-2 border-b-2 border-r-2 border-white" />
        <span
          ref={labelRef}
          className="mono absolute -top-5 left-0 text-[8px] text-white transition-opacity duration-150"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Coordinate readout */}
      <div
        ref={readRef}
        className="mono absolute left-0 top-0 text-[9px] text-white/50 will-change-transform"
      />
    </div>
  );
}
