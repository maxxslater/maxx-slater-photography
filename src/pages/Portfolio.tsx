import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── 12 Placeholder Slots ── */
const placeholders = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: "",
  alt: `Photo ${i + 1}`,
}));

/*
 * Grid pattern: alternating rows of tall/wide for visual rhythm.
 * Row 1: tall, square, wide
 * Row 2: wide, tall, square
 * Row 3: square, wide, tall
 * Row 4: tall, square, wide
 */
const spanClasses: string[] = [
  "col-span-1 row-span-2", // 1  tall
  "col-span-1 row-span-1", // 2  square
  "col-span-2 row-span-1", // 3  wide
  "col-span-2 row-span-1", // 4  wide
  "col-span-1 row-span-2", // 5  tall
  "col-span-1 row-span-1", // 6  square
  "col-span-1 row-span-1", // 7  square
  "col-span-2 row-span-1", // 8  wide
  "col-span-1 row-span-2", // 9  tall
  "col-span-1 row-span-2", // 10 tall
  "col-span-1 row-span-1", // 11 square
  "col-span-2 row-span-1", // 12 wide
];

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-neutral-950 px-4 sm:px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/60" />
            <p className="text-xs font-light tracking-[0.35em] uppercase text-amber-400">
              Selected Work
            </p>
            <span className="h-px w-8 bg-amber-400/60" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-wide text-white">
            The <span className="font-black">Portfolio</span>
          </h1>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[240px] gap-2 sm:gap-3">
          {placeholders.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`group relative overflow-hidden rounded-sm bg-neutral-900 border border-neutral-800/50 cursor-pointer transition-colors hover:border-amber-400/30 ${spanClasses[i]}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                /* Placeholder state */
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <svg
                    className="h-8 w-8 text-neutral-700 transition-colors group-hover:text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="text-xs tracking-[0.2em] uppercase text-neutral-700 font-light">
                    {String(item.id).padStart(2, "0")}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-amber-400/0 transition-colors duration-500 group-hover:bg-amber-400/5" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelected(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-all duration-300 hover:border-amber-400 hover:text-amber-400 cursor-pointer"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-7 left-6 text-xs tracking-[0.2em] uppercase text-neutral-500 font-light">
              {String(selected).padStart(2, "0")} / {String(placeholders.length).padStart(2, "0")}
            </div>

            {/* Full-size image / placeholder */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] overflow-hidden rounded-sm border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              {placeholders[selected - 1]?.src ? (
                <img
                  src={placeholders[selected - 1].src}
                  alt={placeholders[selected - 1].alt}
                  className="max-h-[85vh] w-auto object-contain"
                />
              ) : (
                <div className="flex h-[50vh] w-[70vw] sm:w-[60vw] lg:w-[50vw] flex-col items-center justify-center gap-4 bg-neutral-900">
                  <svg
                    className="h-16 w-16 text-neutral-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={0.75}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <p className="text-sm tracking-[0.2em] uppercase text-neutral-600 font-light">
                    Image {String(selected).padStart(2, "0")}
                  </p>
                  <p className="text-xs text-neutral-700">
                    Placeholder — add your photo here
                  </p>
                </div>
              )}
            </motion.div>

            {/* Prev / Next arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(selected > 1 ? selected - 1 : placeholders.length);
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-all duration-300 hover:border-amber-400 hover:text-amber-400 cursor-pointer"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(selected < placeholders.length ? selected + 1 : 1);
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-all duration-300 hover:border-amber-400 hover:text-amber-400 cursor-pointer"
              aria-label="Next"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
