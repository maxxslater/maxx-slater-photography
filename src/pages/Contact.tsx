import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(`New inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:maxx@maxxslater.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section className="min-h-screen bg-neutral-950 px-4 sm:px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        {/* ── Header ── */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/60" />
            <p className="text-xs font-light tracking-[0.35em] uppercase text-amber-400">
              Get In Touch
            </p>
            <span className="h-px w-8 bg-amber-400/60" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-wide text-white">
            Let's <span className="font-black">Connect</span>
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-xs font-light tracking-[0.25em] uppercase text-neutral-500"
                >
                  Name <span className="text-amber-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full border-b border-neutral-800 bg-transparent px-0 py-3 text-base font-light text-white placeholder-neutral-700 outline-none transition-colors duration-300 focus:border-amber-400/60"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-light tracking-[0.25em] uppercase text-neutral-500"
                >
                  Email <span className="text-amber-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border-b border-neutral-800 bg-transparent px-0 py-3 text-base font-light text-white placeholder-neutral-700 outline-none transition-colors duration-300 focus:border-amber-400/60"
                />
              </div>

              {/* Phone (optional) */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-xs font-light tracking-[0.25em] uppercase text-neutral-500"
                >
                  Phone <span className="text-neutral-700 text-[10px] tracking-widest">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full border-b border-neutral-800 bg-transparent px-0 py-3 text-base font-light text-white placeholder-neutral-700 outline-none transition-colors duration-300 focus:border-amber-400/60"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-xs font-light tracking-[0.25em] uppercase text-neutral-500"
                >
                  Message <span className="text-amber-400">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, vision, or just say hey..."
                  className="w-full resize-none border-b border-neutral-800 bg-transparent px-0 py-3 text-base font-light text-white placeholder-neutral-700 outline-none transition-colors duration-300 focus:border-amber-400/60"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 border border-amber-400/30 px-10 py-4 text-sm font-light tracking-[0.25em] uppercase text-amber-400 transition-all duration-500 hover:bg-amber-400 hover:text-neutral-950 hover:tracking-[0.35em] cursor-pointer"
                >
                  Send Message
                  <svg
                    className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center py-16 sm:py-24"
            >
              {/* Checkmark */}
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/30">
                <svg
                  className="h-7 w-7 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <h2 className="mb-4 text-2xl sm:text-3xl font-extralight tracking-wide text-white">
                Thank you, <span className="font-black">{name}</span>.
              </h2>

              <p className="max-w-md text-base font-light leading-relaxed text-neutral-400">
                Your message is on its way. I'll get back to you as soon as
                possible — usually within 24 hours.
              </p>

              <p className="mt-6 text-sm font-light text-neutral-600">
                Talk soon.
              </p>

              {/* Decorative divider */}
              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-12 bg-neutral-800" />
                <span className="h-1.5 w-1.5 rotate-45 border border-amber-400/40" />
                <span className="h-px w-12 bg-neutral-800" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
