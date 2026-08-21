/* ──────────────────────────────────────────────────────────────
   IMAGE MANIFEST
   ──────────────────────────────────────────────────────────────

   This is the only file you need to touch to update the portfolio.

   1. Drop your photo into  public/images/
   2. Point `src` at it, e.g.  src: "/images/rooftop-01.jpg"
   3. Leave `src` as an empty string ("") to keep a numbered
      placeholder slot in the grid.

   `size` controls how the frame sits in the grid:
     "tall"   → 1 column wide,  2 rows high
     "wide"   → 2 columns wide, 1 row high
     "square" → 1 column wide,  1 row high
     "hero"   → 2 columns wide, 2 rows high

   Order in this array === order on the page.
   ────────────────────────────────────────────────────────────── */

export type Frame = {
  /** Path under /public, or "" for an empty placeholder slot */
  src: string;
  /** Shown in the caption bar and the lightbox */
  title: string;
  /** Small mono tag — series, client, or genre */
  category: string;
  /** Year the frame was shot */
  year: string;
  /** Grid footprint */
  size: "tall" | "wide" | "square" | "hero";
  /** Alt text for accessibility. Falls back to title. */
  alt?: string;
  /** Set true to also surface this frame on the home page strip */
  featured?: boolean;
};

export const frames: Frame[] = [
  {
    src: "",
    title: "Untitled I",
    category: "Portrait",
    year: "2025",
    size: "tall",
    featured: true,
  },
  {
    src: "",
    title: "Untitled II",
    category: "Street",
    year: "2025",
    size: "square",
  },
  {
    src: "",
    title: "Untitled III",
    category: "Editorial",
    year: "2025",
    size: "wide",
    featured: true,
  },
  {
    src: "",
    title: "Untitled IV",
    category: "Live",
    year: "2024",
    size: "wide",
  },
  {
    src: "",
    title: "Untitled V",
    category: "Portrait",
    year: "2024",
    size: "tall",
    featured: true,
  },
  {
    src: "",
    title: "Untitled VI",
    category: "Studio",
    year: "2024",
    size: "square",
  },
  {
    src: "",
    title: "Untitled VII",
    category: "Street",
    year: "2024",
    size: "square",
  },
  {
    src: "",
    title: "Untitled VIII",
    category: "Brand",
    year: "2024",
    size: "wide",
  },
  {
    src: "",
    title: "Untitled IX",
    category: "Portrait",
    year: "2023",
    size: "tall",
  },
  {
    src: "",
    title: "Untitled X",
    category: "Documentary",
    year: "2023",
    size: "tall",
  },
  {
    src: "",
    title: "Untitled XI",
    category: "Live",
    year: "2023",
    size: "square",
  },
  {
    src: "",
    title: "Untitled XII",
    category: "Editorial",
    year: "2023",
    size: "wide",
  },
];

/** Frames flagged for the home page strip (falls back to the first three). */
export const featuredFrames: Frame[] = frames.filter((f) => f.featured).length
  ? frames.filter((f) => f.featured)
  : frames.slice(0, 3);

/** Unique category list, useful for the portfolio filter bar. */
export const categories: string[] = Array.from(
  new Set(frames.map((f) => f.category))
).sort();

export const spanFor: Record<Frame["size"], string> = {
  tall: "col-span-1 row-span-2",
  wide: "col-span-2 row-span-1",
  square: "col-span-1 row-span-1",
  hero: "col-span-2 row-span-2",
};
