import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import Marquee from "./Marquee";
import ScrambleText from "./ScrambleText";

const navLinks = [
  { to: "/", label: "Index", n: "01" },
  { to: "/portfolio", label: "Portfolio", n: "02" },
  { to: "/about", label: "About", n: "03" },
  { to: "/contact", label: "Booking", n: "04" },
];

export default function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Close the mobile drawer on navigation and lock scroll while it is open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-black text-white">
      {/* ══ STATUS BAR ══════════════════════════════════════════ */}
      <div className="hidden border-b border-white/25 bg-black md:block">
        <div className="mono flex items-center justify-between px-4 py-1.5 text-[10px] text-white/60">
          <span>39.9612° N / 82.9988° W — COLUMBUS, OHIO</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-blink bg-white" />
            OPEN FOR BOOKINGS — {new Date().getFullYear()}
          </span>
          <span>NO FILTERS / NO POSING / NO BULLSHIT</span>
        </div>
      </div>

      {/* ══ HEADER ══════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b-2 border-white bg-black">
        <nav className="flex items-stretch justify-between">
          {/* Brand */}
          <Link
            to="/"
            data-cursor="HOME"
            className="flex items-center border-r-2 border-white px-4 py-3 transition-colors duration-100 hover:bg-white hover:text-black sm:px-6"
          >
            <BrandLogo size="sm" />
          </Link>

          {/* Desktop nav — each link is its own hard cell */}
          <ul className="hidden items-stretch md:flex">
            {navLinks.map(({ to, label, n }) => {
              const active = pathname === to;
              return (
                <li key={to} className="flex">
                  <Link
                    to={to}
                    data-cursor={label.toUpperCase()}
                    className={`mono group relative flex items-center gap-2 overflow-hidden border-l-2 border-white px-5 text-xs font-medium transition-colors duration-150 lg:px-7 ${
                      active
                        ? "bg-white text-black"
                        : "bg-black text-white hover:text-black"
                    }`}
                  >
                    {!active && (
                      <span className="absolute inset-0 -translate-y-full bg-white transition-transform duration-200 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:translate-y-0" />
                    )}
                    <span className="relative text-[9px] opacity-50">{n}</span>
                    <span className="relative">
                      <ScrambleText text={label} trigger="hover" duration={380} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile trigger */}
          <button
            onClick={() => setOpen(true)}
            className="mono border-l-2 border-white px-5 text-xs font-medium transition-colors duration-100 hover:bg-white hover:text-black md:hidden"
            aria-label="Open menu"
            data-cursor="MENU"
          >
            Menu
          </button>
        </nav>
      </header>

      {/* ══ MOBILE DRAWER ═══════════════════════════════════════ */}
      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black md:hidden">
          <div className="flex items-center justify-between border-b-2 border-white px-4 py-3">
            <BrandLogo size="sm" />
            <button
              onClick={() => setOpen(false)}
              className="mono border-2 border-white px-4 py-2 text-xs transition-colors duration-100 hover:bg-white hover:text-black"
              aria-label="Close menu"
            >
              Close ✕
            </button>
          </div>

          <ul className="flex flex-1 flex-col">
            {navLinks.map(({ to, label, n }) => (
              <li key={to} className="flex-1 border-b-2 border-white">
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  className="group flex h-full items-center justify-between px-4 transition-colors duration-100 hover:bg-white hover:text-black"
                >
                  <span className="display text-5xl">{label}</span>
                  <span className="mono text-[10px] opacity-50">{n}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mono px-4 py-4 text-[10px] text-white/50">
            MAXX SLATER PHOTOGRAPHY — COLUMBUS, OH
          </div>
        </div>
      )}

      {/* ══ PAGE ════════════════════════════════════════════════ */}
      <main className="relative flex-1">
        <Outlet />
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <footer className="border-t-2 border-white bg-black">
        <Marquee
          items={[
            "MAXX SLATER PHOTOGRAPHY",
            "COLUMBUS, OHIO",
            "AVAILABLE FOR WORK",
            "PORTRAIT / EDITORIAL / LIVE",
          ]}
          invert
          slow
          className="border-t-0"
        />

        {/* Wordmark slab */}
        <Link
          to="/contact"
          data-cursor="BOOK"
          className="group relative block overflow-hidden border-b-2 border-white px-4 py-10 text-white transition-colors duration-150 hover:text-black sm:py-16"
        >
          <span className="absolute inset-0 -translate-y-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:translate-y-0" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <span className="display text-[15vw] leading-[0.8] transition-transform duration-300 group-hover:translate-x-4 sm:text-[11vw]">
              Let&rsquo;s work
            </span>
            <span className="mono shrink-0 text-xs sm:pb-3">
              → START A PROJECT
            </span>
          </div>
        </Link>

        {/* Info grid */}
        <div className="grid grid-cols-2 border-b-2 border-white md:grid-cols-4">
          <FooterCol title="Sitemap">
            {navLinks.map(({ to, label }) => (
              <FooterLink key={to} to={to}>
                {label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Legal">
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
          </FooterCol>

          <FooterCol title="Contact">
            <a
              href="mailto:maxx@maxxslater.com"
              className="mono block text-[11px] text-white/70 transition-colors duration-100 hover:text-white hover:underline"
            >
              MAXX@MAXXSLATER.COM
            </a>
            <span className="mono block text-[11px] text-white/70">
              COLUMBUS, OHIO — USA
            </span>
          </FooterCol>

          <FooterCol title="Elsewhere">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mono block text-[11px] text-white/70 transition-colors duration-100 hover:text-white hover:underline"
            >
              INSTAGRAM ↗
            </a>
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noreferrer"
              className="mono block text-[11px] text-white/70 transition-colors duration-100 hover:text-white hover:underline"
            >
              VIMEO ↗
            </a>
          </FooterCol>
        </div>

        {/* Colophon */}
        <div className="mono flex flex-col gap-2 px-4 py-4 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} MAXX SLATER PHOTOGRAPHY</span>
          <span>ALL FRAMES SHOT + CURATED BY MAXX SLATER</span>
          <span>BUILT RAW — NO TEMPLATES</span>
        </div>
      </footer>
    </div>
  );
}

/* ── Footer building blocks ───────────────────────────────── */

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t-2 border-white px-4 py-6 md:border-t-0 md:border-l-2 md:first:border-l-0">
      <p className="mono mb-4 text-[10px] text-white/40">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="mono block text-[11px] text-white/70 transition-colors duration-100 hover:text-white hover:underline"
    >
      {children}
    </Link>
  );
}
