interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: {
    maxx: "text-lg",
    slater: "text-lg",
    photography: "text-xs",
  },
  md: {
    maxx: "text-2xl",
    slater: "text-2xl",
    photography: "text-sm",
  },
  lg: {
    maxx: "text-4xl sm:text-5xl",
    slater: "text-4xl sm:text-5xl",
    photography: "text-lg sm:text-xl",
  },
};

export default function BrandLogo({ size = "md", className = "" }: BrandLogoProps) {
  const s = sizes[size];

  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="flex items-baseline gap-[0.35em] tracking-[0.2em] uppercase">
        <span className={`${s.maxx} font-black text-white`}>MAXX</span>
        <span className={`${s.slater} font-extralight text-white`}>SLATER</span>
      </span>
      <span
        className={`${s.photography} font-script text-amber-400 -mt-[0.15em] tracking-wide`}
        style={{ fontStyle: "normal" }}
      >
        photography
      </span>
    </span>
  );
}
