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
    src: "/images/polo1.JPG",
    title: "POLO1",
    category: "Portrait",
    year: "2026",
    size: "square",
    featured: true,
  },
  {
    src: "/images/polo2.JPG",
    title: "POLO2",
    category: "Portrait",
    year: "2026",
    size: "square",
    featured: true,
  },
  {
    src: "/images/polo3.JPG",
    title: "POLO3",
    category: "Live",
    year: "2025",
    size: "square",
  },
  {
    src: "/images/porsche1.JPG",
    title: "PORSCHE1",
    category: "automotive",
    year: "2026",
    size: "wide",
    
  },
  {
    src: "/images/smoke.JPG",
    title: "SMOKE",
    category: "Live",
    year: "2024",
    size: "square",
  },
  {
    src: "/images/self.JPG",
    title: "SELF1",
    category: "Portrait",
    year: "2025",
    size: "square",
    featured: true,
  },
  {
    src: "/images/tracks.JPG",
    title: "TRACKS1",
    category: "Portrait",
    year: "2026",
    size: "wide",
  },
  {
    src: "/images/polo4.JPG",
    title: "POLO4",
    category: "Portrait",
    year: "2024",
    size: "wide",
    featured: true,
  },
  {
    src: "images/b1.jpg",
    title: "B1",
    category: "Portrait",
    year: "2026",
    size: "square",
  },
  {
    src: "/images/OT.JPG",
    title: "Untitled",
    category: "Live",
    year: "2023",
    size: "tall",
  },
  {
    src: "/images/booth.JPG",
    title: "Untitled",
    category: "Documentary",
    year: "2025",
    size: "tall",
  },
  {
    src: "/images/church.JPG",
    title: "Untitled XI",
    category: "Live",
    year: "2023",
    size: "square",
  },
  {
    src: "/images/portrait.jpg",
    title: "SELF2",
    category: "Portrait",
    year: "2026",
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
