import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fieldBase =
  "mono w-full border-2 border-white bg-black px-4 py-4 text-[12px] text-white placeholder-white/30 outline-none transition-colors duration-100 focus:bg-white focus:text-black focus:placeholder-black/40";

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
    <section className="bg-black">
      {/* ══ MASTHEAD ════════════════════════════════════════════ */}
      <div className="border-b-2 border-white px-4 py-10 sm:py-14">
        <p className="mono mb-5 text-[10px] text-white/50">[ 04 ] CONTACT</p>
        <h1 className="display text-[15vw] leading-[0.78] sm:text-[12vw] lg:text-[9vw]">
          Contact
          <br />
          <span className="stroke">+ Booking</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 border-b-2 border-white lg:grid-cols-[1fr_minmax(0,380px)]">
        {/* ══ FORM ══════════════════════════════════════════════ */}
        <div className="border-b-2 border-white px-4 py-10 sm:px-8 sm:py-14 lg:border-b-0 lg:border-r-2">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: [0.85, 0, 0.15, 1] }}
                onSubmit={handleSubmit}
                className="max-w-2xl space-y-6"
              >
                <Field id="name" label="Name" required n="01">
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="YOUR FULL NAME"
                    className={fieldBase}
                  />
                </Field>

                <Field id="email" label="Email" required n="02">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOU@EMAIL.COM"
                    className={fieldBase}
                  />
                </Field>

                <Field id="phone" label="Phone — optional" n="03">
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className={fieldBase}
                  />
                </Field>

                <Field id="message" label="Message" required n="04">
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="TELL ME ABOUT THE PROJECT, THE DATE, THE VIBE..."
                    className={`${fieldBase} resize-none leading-relaxed`}
                  />
                </Field>

                <button
                  type="submit"
                  className="mono w-full cursor-pointer border-2 border-white bg-white px-8 py-5 text-xs font-medium text-black transition-colors duration-100 hover:bg-black hover:text-white sm:w-auto"
                >
                  Send it →
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="sent"
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 0.3, ease: [0.85, 0, 0.15, 1] }}
                className="border-2 border-white p-8"
              >
                <p className="display text-5xl leading-none sm:text-7xl">
                  Message
                  <br />
                  sent.
                </p>
                <p className="mono mt-6 text-[11px] leading-relaxed text-white/60">
                  YOUR MAIL CLIENT SHOULD HAVE OPENED. IF NOT, WRITE DIRECTLY TO
                  MAXX@MAXXSLATER.COM — I&rsquo;LL GET BACK TO YOU SHORTLY.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mono mt-8 cursor-pointer border-2 border-white px-6 py-3 text-[11px] transition-colors duration-100 hover:bg-white hover:text-black"
                >
                  ← Send another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ══ SIDEBAR ═══════════════════════════════════════════ */}
        <aside className="flex flex-col">
          <div className="border-b-2 border-white px-4 py-8">
            <p className="mono mb-4 text-[9px] text-white/40">THE ASK</p>
            <p className="text-lg leading-snug text-white sm:text-xl">
              If you&rsquo;d like to work together, or just want some info, fill
              out the form and I&rsquo;ll talk to you soon&nbsp;:)
            </p>
          </div>

          <SideRow label="Email" value="maxx@maxxslater.com" href="mailto:maxx@maxxslater.com" />
          <SideRow label="Location" value="Columbus, Ohio — USA" />
          <SideRow label="Response time" value="Within 48 hours" />
          <SideRow label="Booking" value="Retainer secures the date" />

          <div className="mono flex flex-1 items-end px-4 py-6 text-[10px] text-white/30">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-blink bg-white" />
              CURRENTLY ACCEPTING WORK
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ── Bits ─────────────────────────────────────────────────── */

function Field({
  id,
  label,
  n,
  required,
  children,
}: {
  id: string;
  label: string;
  n: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mono mb-2 flex items-center gap-2 text-[10px] text-white/60"
      >
        <span className="opacity-40">{n}</span>
        {label}
        {required && <span className="text-white">*</span>}
      </label>
      {children}
    </div>
  );
}

function SideRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="border-b-2 border-white px-4 py-5">
      <p className="mono mb-2 text-[9px] text-white/40">{label}</p>
      {href ? (
        <a
          href={href}
          className="mono text-[11px] text-white transition-colors duration-100 hover:underline"
        >
          {value.toUpperCase()}
        </a>
      ) : (
        <p className="mono text-[11px] text-white">{value.toUpperCase()}</p>
      )}
    </div>
  );
}
