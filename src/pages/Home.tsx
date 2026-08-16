import { Link } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-6">
      {/* Subtle radial glow behind logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-amber-400/[0.03] blur-3xl" />
      </div>

      {/* ── Brand Logo ── */}
      <div className="relative z-10 flex flex-col items-center gap-16">
        <BrandLogo size="lg" />

        {/* ── Decorative divider ── */}
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-neutral-700" />
          <span className="h-1.5 w-1.5 rotate-45 border border-amber-400/60" />
          <span className="h-px w-12 bg-neutral-700" />
        </div>

        {/* ── Navigation Links ── */}
        <nav>
          <ul className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group relative text-lg sm:text-xl font-extralight tracking-[0.3em] uppercase text-neutral-400 transition-colors duration-500 hover:text-white"
                >
                  {label}
                  {/* Underline animation */}
                  <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-amber-400 transition-all duration-500 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── Bottom subtle copyright ── */}
      <p className="absolute bottom-6 text-[11px] tracking-widest text-neutral-700 uppercase">
        &copy; {new Date().getFullYear()} Maxx Slater Photography
      </p>
    </div>
  );
}
