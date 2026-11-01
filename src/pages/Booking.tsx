
import { Link } from "react-router-dom";

const BOOKING_URL =
  "https://app.squareup.com/appointments/book/osn6i5hvunlrn4/LYFMYVS0ER6CD/start";

export default function Booking() {
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="border-b-2 border-white px-4 py-12 sm:px-8 sm:py-20">
        <p className="mono mb-6 text-xs text-white/50">
          MAXX SLATER PHOTOGRAPHY / COLUMBUS, OH
        </p>

        <h1 className="display text-[14vw] leading-none sm:text-[10vw]">
          BOOK A SESSION.
        </h1>

        <p className="mt-8 max-w-2xl text-white/70 sm:text-lg">
          Select your photography session and find
          a time that works for you.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="mono mb-6 text-xs text-white/50">
          01 / SCHEDULE YOUR SESSION
        </p>

        <div className="bg-white p-4 sm:p-8">
          <iframe
            title="Square Appointments Widget"
            src="/square-booking.html"
            className="h-[350px] w-full border-0"
          />
        </div>

        <p className="mono mt-8 text-xs text-white/50">
          HAVING TROUBLE BOOKING?
        </p>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mono mt-4 inline-block border-2 border-white px-8 py-4 text-xs transition-colors hover:bg-white hover:text-black"
        >
          OPEN SQUARE BOOKING DIRECTLY →
        </a>
      </div>

      <div className="border-t-2 border-white px-4 py-12 text-center">
        <p className="mb-6 text-white/70">
          Have something custom in mind?
        </p>

        <Link
          to="/contact"
          className="mono inline-block border-2 border-white px-8 py-4 text-xs transition-colors hover:bg-white hover:text-black"
        >
          START A CONVERSATION →
        </Link>
      </div>
    </section>
  );
}
