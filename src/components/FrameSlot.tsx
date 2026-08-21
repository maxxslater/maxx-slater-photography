import { motion } from "framer-motion";
import type { Frame } from "../data/portfolio";

interface FrameSlotProps {
  frame: Frame;
  index: number;
  className?: string;
  onClick?: () => void;
  /** Shared-element id — lets the cell morph into the lightbox */
  layoutId?: string;
}

/**
 * A single photo cell. Renders the image when `src` is set, otherwise a
 * hatched placeholder block stamped with its index so the layout still
 * reads while the real frames are being edited.
 *
 * Hover fires a hard exposure flicker (invert → blowout → settle) and the
 * caption bar slams up from the bottom edge.
 */
export default function FrameSlot({
  frame,
  index,
  className = "",
  onClick,
  layoutId,
}: FrameSlotProps) {
  const n = String(index + 1).padStart(2, "0");
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={onClick}
      data-cursor={onClick ? `VIEW ${n}` : undefined}
      className={`group relative block w-full overflow-hidden bg-black text-left ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <motion.div layoutId={layoutId} className="h-full w-full">
        {frame.src ? (
          <img
            src={frame.src}
            alt={frame.alt ?? frame.title}
            loading="lazy"
            className="expose-on-hover h-full w-full object-cover grayscale transition-all duration-200 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <div className="hatch expose-on-hover flex h-full w-full flex-col items-center justify-center gap-3 transition-transform duration-200 group-hover:scale-[1.03]">
            <span className="display glitch-on-hover text-5xl text-white/15 sm:text-6xl">
              {n}
            </span>
            <span className="mono text-[9px] text-white/30">EMPTY SLOT</span>
          </div>
        )}
      </motion.div>

      {/* Index stamp */}
      <span className="mono pointer-events-none absolute left-0 top-0 border-b-2 border-r-2 border-white bg-black px-2 py-1 text-[9px] text-white">
        {n}
      </span>

      {/* Scanning bracket that only appears on hover */}
      <span className="pointer-events-none absolute inset-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-white" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-white" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-white" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-white" />
      </span>

      {/* Caption bar — slams up on hover */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full border-t-2 border-white bg-white px-2 py-1.5 text-black transition-transform duration-150 group-hover:translate-y-0">
        <span className="mono flex items-center justify-between gap-2 text-[9px]">
          <span className="truncate font-medium">{frame.title}</span>
          <span className="shrink-0 opacity-60">
            {frame.category} / {frame.year}
          </span>
        </span>
      </span>
    </Tag>
  );
}
