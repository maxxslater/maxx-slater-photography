import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
  wrap,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "../utils/cn";

interface MarqueeProps {
  items: string[];
  /** Inverted = white band, black type */
  invert?: boolean;
  /** Base travel speed, % of track per second. Negative runs right. */
  speed?: number;
  slow?: boolean;
  className?: string;
}

/**
 * SCROLL-REACTIVE TICKER
 *
 * The band always drifts, but scroll velocity multiplies it and can throw it
 * into reverse — flick the page and the type whips past, skewing as it goes,
 * then settles back to its idle crawl. Four copies of the run are wrapped at
 * -25% so the loop is mathematically seamless at any speed.
 */
export default function Marquee({
  items,
  invert = false,
  speed,
  slow = false,
  className = "",
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const baseSpeed = speed ?? (slow ? 2.2 : 4.5);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 48,
    stiffness: 380,
  });
  const velocityFactor = useTransform(smoothVelocity, [-2200, 0, 2200], [-4, 1, 4], {
    clamp: false,
  });
  const skew = useTransform(smoothVelocity, [-2200, 0, 2200], [6, 0, -6], {
    clamp: false,
  });

  const direction = useRef(1);

  useAnimationFrame((_t, delta) => {
    if (reduce) return;
    let move = direction.current * baseSpeed * (delta / 1000);

    const v = velocityFactor.get();
    if (v < 0) direction.current = -1;
    else if (v > 0) direction.current = 1;

    move += direction.current * move * Math.abs(v);
    baseX.set(wrap(-25, 0, baseX.get() + move));
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const run = [...items, ...items, ...items, ...items];

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden border-y-2 border-white",
        invert ? "bg-white text-black" : "bg-black text-white",
        className
      )}
    >
      <motion.div
        className={cn(
          "flex w-max shrink-0",
          // CSS fallback keeps the band alive if motion values are disabled
          reduce && "animate-marquee"
        )}
        style={reduce ? undefined : { x, skewX: skew }}
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
      </motion.div>
    </div>
  );
}
