import { cn } from "../utils/cn";

interface MarqueeProps {
  items: string[];
  /** Inverted = white band, black type */
  invert?: boolean;
  slow?: boolean;
  className?: string;
}

/**
 * Endless scrolling band. The content is duplicated once and the track is
 * translated -50%, so the loop is seamless.
 */
export default function Marquee({
  items,
  invert = false,
  slow = false,
  className = "",
}: MarqueeProps) {
  const run = [...items, ...items];

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden border-y-2 border-white",
        invert ? "bg-white text-black" : "bg-black text-white",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0",
          slow ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {run.map((item, i) => (
          <span
            key={i}
            className="mono flex shrink-0 items-center gap-6 whitespace-nowrap px-6 py-2.5 text-[11px] font-medium sm:text-xs"
          >
            {item}
            <span
              className={cn(
                "inline-block h-1.5 w-1.5",
                invert ? "bg-black" : "bg-white"
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
