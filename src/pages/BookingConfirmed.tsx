import { Link } from "react-router-dom";

export default function BookingConfirmed() {
  return (
    <section className="flex min-h-[70vh] flex-col justify-center bg-black px-4 py-16 text-white sm:px-8">
      <p className="mono mb-8 text-xs text-white/50">
        MAXX SLATER PHOTOGRAPHY / COLUMBUS, OH
      </p>

      <h1 className="display max-w-6xl text-[16vw] leading-[0.82] sm:text-[11vw]">
        YOU&rsquo;RE BOOKED.
      </h1>

      <div className="mt-10 max-w-2xl border-t-2 border-white pt-6">
        <p className="text-lg text-white/80 sm:text-xl">
          Thanks for booking a session. Your appointment details and any next
          steps will be sent to you by Square.
        </p>
        <p className="mono mt-6 text-[10px] leading-relaxed text-white/50">
          QUESTIONS ABOUT YOUR APPOINTMENT? REPLY TO YOUR CONFIRMATION EMAIL OR
          CONTACT MAXX SLATER.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:maxxslaterphoto@proton.me"
            className="mono border-2 border-white px-6 py-4 text-[10px] transition-colors hover:bg-white hover:text-black"
          >
            EMAIL ABOUT YOUR BOOKING →
          </a>
          <Link
            to="/"
            className="mono border-2 border-white/40 px-6 py-4 text-[10px] text-white/70 transition-colors hover:border-white hover:text-white"
          >
            BACK TO THE SITE
          </Link>
        </div>
      </div>
    </section>
  );
}
