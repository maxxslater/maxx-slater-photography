import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import BrandLogo from "./BrandLogo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 overflow-x-hidden">
      {/* ── Navigation (hidden on Home — Home has its own) ── */}
      {!isHome && (
        <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            {/* Logo / Brand */}
            <Link to="/" className="group transition-opacity hover:opacity-80">
              <BrandLogo size="sm" />
            </Link>

            {/* Page Links */}
            <ul className="hidden sm:flex items-center gap-8 text-sm font-light tracking-wider uppercase">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`relative transition-colors duration-300 hover:text-amber-400 ${
                      pathname === to ? "text-amber-400" : "text-neutral-300"
                    }`}
                  >
                    {label}
                    {pathname === to && (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-amber-400" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <MobileMenu pathname={pathname} />
          </nav>
        </header>
      )}

      {/* ── Page Content ── */}
      <main className="flex-1 overflow-hidden relative">
        <Outlet />
      </main>

      {/* ── Footer (hidden on Home) ── */}
      {!isHome && (
        <footer className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto max-w-7xl px-6 py-14">
            {/* Top row: brand + sitemap + legal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
              {/* Brand */}
              <div className="flex flex-col items-center sm:items-start gap-4">
                <BrandLogo size="sm" />
                <p className="text-xs font-light leading-relaxed text-neutral-600 text-center sm:text-left max-w-[220px]">
                  Columbus, Ohio — capturing moments that matter.
                </p>
              </div>

              {/* Sitemap */}
              <div className="flex flex-col items-center sm:items-start gap-4">
                <p className="text-[10px] font-normal tracking-[0.3em] uppercase text-neutral-500">
                  Sitemap
                </p>
                <ul className="flex flex-col items-center sm:items-start gap-2">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/about", label: "About" },
                    { to: "/portfolio", label: "Portfolio" },
                    { to: "/contact", label: "Contact" },
                  ].map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="text-xs font-light tracking-widest uppercase text-neutral-600 transition-colors duration-300 hover:text-amber-400"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="flex flex-col items-center sm:items-start gap-4">
                <p className="text-[10px] font-normal tracking-[0.3em] uppercase text-neutral-500">
                  Legal
                </p>
                <ul className="flex flex-col items-center sm:items-start gap-2">
                  <li>
                    <Link
                      to="/terms"
                      className="text-xs font-light tracking-widest uppercase text-neutral-600 transition-colors duration-300 hover:text-amber-400"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-xs font-light tracking-widest uppercase text-neutral-600 transition-colors duration-300 hover:text-amber-400"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 flex items-center gap-4">
              <span className="h-px flex-1 bg-neutral-800/60" />
              <span className="h-1 w-1 rotate-45 border border-amber-400/30" />
              <span className="h-px flex-1 bg-neutral-800/60" />
            </div>

            {/* Bottom copyright */}
            <p className="text-center text-[11px] tracking-widest uppercase text-neutral-700">
              &copy; {new Date().getFullYear()} Maxx Slater Photography. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

/* ── Mobile hamburger menu ── */
function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-neutral-300 hover:text-amber-400 transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <ul className="absolute left-0 right-0 top-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center gap-4 py-6 text-sm font-light tracking-wider uppercase">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setOpen(false)}
                className={`transition-colors duration-300 hover:text-amber-400 ${
                  pathname === to ? "text-amber-400" : "text-neutral-300"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
