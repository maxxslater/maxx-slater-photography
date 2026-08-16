export default function Terms() {
  return (
    <section className="min-h-screen bg-neutral-950 px-4 sm:px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/60" />
            <p className="text-xs font-light tracking-[0.35em] uppercase text-amber-400">
              Legal
            </p>
            <span className="h-px w-8 bg-amber-400/60" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extralight tracking-wide text-white">
            Terms of <span className="font-black">Service</span>
          </h1>
        </div>

        <div className="space-y-10 text-sm sm:text-base font-light leading-relaxed text-neutral-400">
          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">1. Agreement</h2>
            <p>
              By accessing or using the website of Maxx Slater Photography ("we," "us," or "our"),
              you agree to be bound by these Terms of Service. If you do not agree to all of the
              terms and conditions, you may not access or use our services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">2. Services</h2>
            <p>
              Maxx Slater Photography provides professional photography services including but
              not limited to portrait, commercial, event, and editorial photography. All services
              are subject to availability and confirmed only upon written agreement or signed contract.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">3. Intellectual Property</h2>
            <p>
              All photographs, images, and content on this website are the intellectual property
              of Maxx Slater Photography unless otherwise stated. Unauthorized use, reproduction,
              or distribution of any content without prior written consent is strictly prohibited.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">4. Booking &amp; Payment</h2>
            <p>
              A non-refundable retainer is required to secure your session date. Remaining balances
              are due on or before the date of service unless otherwise agreed upon in writing.
              Cancellations made less than 48 hours before a scheduled session may forfeit the retainer.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">5. Usage Rights</h2>
            <p>
              Clients receive a personal, non-exclusive license to use delivered images for personal
              purposes. Commercial usage rights must be negotiated separately. Maxx Slater Photography
              retains the right to use images for portfolio, marketing, and promotional purposes unless
              otherwise agreed upon in writing.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">6. Limitation of Liability</h2>
            <p>
              Maxx Slater Photography shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our services or website. Our total
              liability shall not exceed the amount paid for the specific service in question.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">7. Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these terms at any time without prior notice.
              Continued use of the website following any changes constitutes acceptance of the revised terms.
            </p>
          </div>

          <p className="pt-4 text-xs text-neutral-600">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </section>
  );
}
