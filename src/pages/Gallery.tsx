import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GalleryImage = {
  pathname: string;
  previewUrl: string;
  originalUrl: string;
};

export default function Gallery() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);

function closeLightbox() {
  setSelectedImage(null);
}

function nextImage() {
  setSelectedImage((current) => {
    if (current === null) return null;
    return (current + 1) % images.length;
  });
}

function previousImage() {
  setSelectedImage((current) => {
    if (current === null) return null;
    return (current - 1 + images.length) % images.length;
  });
}

useEffect(() => {
  if (selectedImage === null) return;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();
  }

  window.addEventListener("keydown", handleKeyDown);
  document.body.style.overflow = "hidden";

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";
  };
}, [selectedImage]);

  async function handleSubmit(e: FormEvent) {
  e.preventDefault();

  setError("");

  try {
    const response = await fetch("/api/gallery-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gallery: "pink-pony-2026",
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.message || "Incorrect password.");
      return;
    }

    const imagesResponse = await fetch(
  "/api/gallery-images?gallery=pink-pony-2026"
);

const imagesData = await imagesResponse.json();
console.log("GALLERY IMAGES:", imagesData.images);

if (!imagesResponse.ok || !imagesData.success) {
  setError(imagesData.message || "Unable to load gallery.");
  return;
}

setImages(imagesData.images);
setUnlocked(true);
setShowWelcome(true);
setPassword("");
  } catch (err) {
    console.error(err);
    setError("Unable to verify password. Please try again.");
  }
}
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="border-b-2 border-white px-4 py-12 sm:px-6 sm:py-16">
        <p className="mono mb-4 text-[10px] uppercase tracking-[0.2em] text-white/50">
          Private Gallery
        </p>

        <h1 className="display text-[16vw] leading-[0.8] sm:text-[10vw]">
          Pink Pony
        </h1>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <p className="mono text-[11px] uppercase text-white/50">
            Creator Event
          </p>

          <p className="mono text-[11px] uppercase text-white/50">
            August 2026
          </p>

          {unlocked && (
            <p className="mono text-[11px] uppercase text-white">
              Access Granted
            </p>
          )}
        </div>
      </div>

      {!unlocked ? (
        <div className="flex min-h-[55vh] items-center justify-center px-4 py-16 sm:px-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg border-2 border-white"
          >
            <div className="border-b-2 border-white px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Gallery Access
                </span>

                <span className="mono text-[10px] text-white/40">
                  🔒 Protected
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <p className="mb-6 text-lg leading-relaxed text-white/80">
                Enter the password provided with your gallery invitation.
              </p>

              <label
                htmlFor="gallery-password"
                className="mono mb-2 block text-[10px] uppercase tracking-wider text-white/50"
              >
                Password
              </label>

              <input
                id="gallery-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="ENTER PASSWORD"
                className="mono w-full border-2 border-white bg-black px-4 py-4 text-sm uppercase text-white outline-none placeholder:text-white/25 focus:bg-white focus:text-black"
              />

              {error && (
                <p className="mono mt-3 text-[10px] uppercase tracking-wider text-white">
                  ✕ {error}
                </p>
              )}

              <button
                type="submit"
                className="mono mt-4 w-full border-2 border-white bg-white px-4 py-4 text-xs font-medium uppercase tracking-wider text-black transition-colors duration-100 hover:bg-black hover:text-white"
              >
                Enter Gallery →
              </button>

              <p className="mono mt-4 text-[9px] uppercase tracking-wider text-white/30">
                Access is limited to invited participants and collaborators.
              </p>
            </div>
          </form>
                  </div>
      ) : (
        <AnimatePresence mode="wait">
            {showWelcome ? (
                <motion.div
                     key="welcome"
                     initial={{ opacity: 0, y: 18 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -24 }}
                     transition={{ duration: 0.45, ease: "easeOut" }}
                     className="flex min-h-[50vh] items-center justify-center px-4 py-8 sm:px-6 sm:py-10"
        >
          <div className="w-full max-w-3xl text-center">

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/70 text-2xl"            >
              🔓
            </motion.div>

            <p className="mono mb-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
              Authentication Complete
            </p>

            <h2 className="display text-5xl uppercase sm:text-7xl">
              Access Granted
            </h2>

            <div className="mx-auto my-5 h-px w-16 bg-white/60" />

            <p className="text-lg text-white/70 sm:text-xl">
              Welcome to the Pink Pony gallery.
            </p>

            <div className="mx-auto mt-6 flex max-w-xl items-center gap-5 border border-white/30 p-5 text-left sm:p-6">
              <div className="mono text-3xl">
                ↓
              </div>

              <div>
                <p className="mono mb-2 text-[10px] uppercase tracking-[0.2em] text-white">
                  Hi-Res Images Available
                </p>

                <p className="text-sm leading-relaxed text-white/55">
                  Open any image and select Download to save the full-resolution file.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowWelcome(false)}
              className="mono mt-7 border-2 border-white px-8 py-5 text-xs uppercase tracking-[0.2em] transition-colors duration-200 hover:bg-white hover:text-black"
            >
              Enter Gallery →
            </button>

            <div className="mt-9 border-t border-white/15 pt-7">
              <p className="mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Let's Make Something Again.
              </p>

              <p className="mt-3 text-sm text-white/50">
                Ready for another shoot?{" "}
                <a
                  href="/contact"
                  className="text-white underline underline-offset-4 transition-opacity hover:opacity-60"
                >
                  Get in touch →
                </a>
              </p>
            </div>

          </div>
        </motion.div>
      ) : (
        <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
      
          <div className="flex items-center justify-between border-b-2 border-white px-4 py-4 sm:px-6">
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              Gallery Index
            </span>

            <span className="mono text-[10px] text-white/40">
              {String(images.length).padStart(2, "0")} Images
            </span>
          </div>

          <div className="grid grid-cols-2 gap-0.5 bg-white sm:grid-cols-3">
            {images.map((image, index) => (
              <button
                key={image.pathname}
                type="button"
                onClick={() => setSelectedImage(index)}
                className="group relative aspect-[4/5] overflow-hidden bg-black"
              >
                <img
                  src={image.previewUrl}
                  alt={`Gallery image ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-[1.04]"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/80 px-3 py-2 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                  <span className="mono text-[9px] text-white/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="mono text-[9px] uppercase">
                    View +
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mono flex flex-col gap-2 border-t-2 border-white px-4 py-6 text-[10px] text-white/40 sm:flex-row sm:justify-between sm:px-6">
            <span>END OF GALLERY</span>
            <span>PHOTOGRAPHY © MAXX SLATER</span>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
      )}
      {selectedImage !== null && (
  <div
    className="fixed inset-0 z-[200] flex h-dvh flex-col overflow-hidden bg-black"
    onClick={closeLightbox}
  >
    {/* Top rail */}
    <div className="flex items-stretch justify-between border-b-2 border-white">
      <div className="mono flex items-center px-4 text-[10px] text-white/50">
        {String(selectedImage + 1).padStart(2, "0")} /{" "}
        {String(images.length).padStart(2, "0")}
      </div>

      <div className="mono hidden items-center text-[10px] uppercase tracking-wider text-white/30 sm:flex">
        Pink Pony — August 2026
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          closeLightbox();
        }}
        className="mono border-l-2 border-white px-5 py-4 text-xs hover:bg-white hover:text-black"
      >
        Close ✕
      </button>
    </div>

    {/* Image stage */}
    <div
      className="flex min-h-0 flex-1 items-center justify-center p-2 sm:p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={images[selectedImage].previewUrl}
        alt={`Gallery image ${selectedImage + 1}`}
        className="h-full w-full object-contain"
      />
    </div>

    {/* Controls */}
    <div className="flex items-stretch border-t-2 border-white">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          previousImage();
        }}
        className="mono border-r-2 border-white px-5 py-4 text-xs hover:bg-white hover:text-black sm:px-8"
      >
        ← Prev
      </button>

      <div className="mono flex flex-1 items-center justify-center text-[9px] text-white/30">
        <span className="hidden sm:inline">
          ← → NAVIGATE / ESC CLOSE
        </span>
      </div>

      <a
        href={images[selectedImage].originalUrl}
        download={images[selectedImage].pathname.split("/").pop()}
        onClick={(e) => e.stopPropagation()}
        className="mono flex items-center border-l-2 border-white px-5 py-4 text-xs hover:bg-white hover:text-black"
      >
        Download ↓
      </a>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        className="mono border-l-2 border-white px-5 py-4 text-xs hover:bg-white hover:text-black sm:px-8"
      >
        Next →
      </button>
    </div>
  </div>
)}
    </section>
  );
}