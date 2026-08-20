interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { name: "text-xl sm:text-2xl", tag: "text-[8px]" },
  md: { name: "text-3xl sm:text-4xl", tag: "text-[10px]" },
  lg: { name: "text-6xl sm:text-8xl", tag: "text-xs sm:text-sm" },
};

/**
 * MAXX / SLATER set as a hard condensed block with a machine-set
 * PHOTOGRAPHY rule underneath. Colours inherit from the parent so the
 * mark flips correctly inside invert-on-hover cells.
 */
export default function BrandLogo({ size = "md", className = "" }: BrandLogoProps) {
  const s = sizes[size];

  return (
    <span className={`inline-flex flex-col leading-none text-current ${className}`}>
      <span className={`display ${s.name}`}>
        MAXX<span className="display-thin">SLATER</span>
      </span>
      <span className={`mono ${s.tag} mt-1 flex items-center gap-2 font-medium opacity-70`}>
        <span className="h-px w-3 bg-current opacity-70" />
        PHOTOGRAPHY
      </span>
    </span>
  );
}
