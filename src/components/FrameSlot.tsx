import type { Frame } from "../data/portfolio";

interface FrameSlotProps {
  frame: Frame;
  index: number;
  className?: string;
  onClick?: () => void;
}

/**
 * A single photo cell. Renders the image when `src` is set, otherwise a
 * hatched placeholder block stamped with its index so the layout still
 * reads while the real frames are being edited.
 */
export default function FrameSlot({
  frame,
  index,
  className = "",
  onClick,
}: FrameSlotProps) {
  const n = String(index + 1).padStart(2, "0");
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={onClick}
      className={`group relative block w-full overflow-hidden bg-black text-left ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {frame.src ? (
        <img
          src={frame.src}
          alt={frame.alt ?? frame.title}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-200 group-hover:grayscale-0"
        />
      ) : (
        <div className="hatch flex h-full w-full flex-col items-center justify-center gap-3">
          <span className="display text-5xl text-white/15 sm:text-6xl">{n}</span>
          <span className="mono text-[9px] text-white/30">EMPTY SLOT</span>
        </div>
      )}

      {/* Index stamp */}
      <span className="mono pointer-events-none absolute left-0 top-0 border-b-2 border-r-2 border-white bg-black px-2 py-1 text-[9px] text-white">
        {n}
      </span>

      {/* Caption bar — slides up on hover */}
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
