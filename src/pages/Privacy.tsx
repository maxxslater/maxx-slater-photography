export default function Privacy() {
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
            Privacy <span className="font-black">Policy</span>
          </h1>
        </div>

        <div className="space-y-10 text-sm sm:text-base font-light leading-relaxed text-neutral-400">
          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">1. Information We Collect</h2>
            <p>
              When you contact us through the website, we may collect personal information
              including your name, email address, phone number, and any details you provide in
              your message. We do not collect information automatically through cookies or
              tracking technologies on this website.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">2. How We Use Your Information</h2>
            <p>
              The information you provide is used solely to respond to your inquiries, schedule
              services, and communicate regarding your photography sessions. We do not sell, trade,
              or rent your personal information to third parties.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">3. Data Protection</h2>
            <p>
              We implement reasonable security measures to protect your personal information from
              unauthorized access, alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">4. Third-Party Services</h2>
            <p>
              Our website may contain links to external sites or services. We are not responsible
              for the privacy practices or content of third-party websites. We encourage you to
              review the privacy policies of any external sites you visit.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">5. Client Images</h2>
            <p>
              Images from client sessions may be used in our portfolio, website, or social media
              unless a written request for exclusion is made. We respect your privacy and will
              honor any such requests promptly.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">6. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal
              information we hold about you. To exercise these rights, please contact us at{" "}
              <a
                href="mailto:maxx@maxxslater.com"
                className="text-amber-400/80 hover:text-amber-400 transition-colors"
              >
                maxx@maxxslater.com
              </a>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-normal tracking-[0.25em] uppercase text-white">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected on
              this page with a revised date. Continued use of the website constitutes acceptance of
              the updated policy.
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
