import LegalDoc from "../components/LegalDoc";

export default function Terms() {
  return (
    <LegalDoc
      index="05"
      title="Terms of Service"
      subtitle="THE GROUND RULES — PLAIN AND UNDECORATED."
      sections={[
        {
          heading: "Agreement",
          body: (
            <p>
              By accessing or using the website of Maxx Slater Photography
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you
              agree to be bound by these Terms of Service. If you do not agree to
              all of the terms and conditions, you may not access or use our
              services.
            </p>
          ),
        },
        {
          heading: "Services",
          body: (
            <p>
              Maxx Slater Photography provides professional photography services
              including but not limited to portrait, commercial, event, and
              editorial photography. All services are subject to availability and
              confirmed only upon written agreement or signed contract.
            </p>
          ),
        },
        {
          heading: "Intellectual Property",
          body: (
            <p>
              All photographs, images, and content on this website are the
              intellectual property of Maxx Slater Photography unless otherwise
              stated. Unauthorized use, reproduction, or distribution of any
              content without prior written consent is strictly prohibited.
            </p>
          ),
        },
        {
          heading: "Booking + Payment",
          body: (
            <p>
              A non-refundable retainer is required to secure your session date.
              Remaining balances are due on or before the date of service unless
              otherwise agreed upon in writing. Cancellations made less than 48
              hours before a scheduled session may forfeit the retainer.
            </p>
          ),
        },
        {
          heading: "Usage Rights",
          body: (
            <p>
              Clients receive a personal, non-exclusive license to use delivered
              images for personal purposes. Commercial usage rights must be
              negotiated separately. Maxx Slater Photography retains the right to
              use images for portfolio, marketing, and promotional purposes
              unless otherwise agreed upon in writing.
            </p>
          ),
        },
        {
          heading: "Limitation of Liability",
          body: (
            <p>
              Maxx Slater Photography shall not be liable for any indirect,
              incidental, or consequential damages arising from the use of our
              services or website. Our total liability shall not exceed the
              amount paid for the specific service in question.
            </p>
          ),
        },
        {
          heading: "Changes to Terms",
          body: (
            <p>
              We reserve the right to update or modify these terms at any time
              without prior notice. Continued use of the website following any
              changes constitutes acceptance of the revised terms.
            </p>
          ),
        },
      ]}
    />
  );
}
