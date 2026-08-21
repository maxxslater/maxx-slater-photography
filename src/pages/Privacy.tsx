import LegalDoc from "../components/LegalDoc";

export default function Privacy() {
  return (
    <LegalDoc
      index="06"
      title="Privacy Policy"
      subtitle="WHAT IS COLLECTED, AND WHAT IS NOT."
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <p>
              When you contact us through the website, we may collect personal
              information including your name, email address, phone number, and
              any details you provide in your message. We do not collect
              information automatically through cookies or tracking technologies
              on this website.
            </p>
          ),
        },
        {
          heading: "How We Use It",
          body: (
            <p>
              The information you provide is used solely to respond to your
              inquiries, schedule services, and communicate regarding your
              photography sessions. We do not sell, trade, or rent your personal
              information to third parties.
            </p>
          ),
        },
        {
          heading: "Data Protection",
          body: (
            <p>
              We implement reasonable security measures to protect your personal
              information from unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the internet
              is 100% secure.
            </p>
          ),
        },
        {
          heading: "Third-Party Services",
          body: (
            <p>
              Our website may contain links to external sites or services. We are
              not responsible for the privacy practices or content of third-party
              websites. We encourage you to review the privacy policies of any
              external sites you visit.
            </p>
          ),
        },
        {
          heading: "Client Images",
          body: (
            <p>
              Images from client sessions may be used in our portfolio, website,
              or social media unless a written request for exclusion is made. We
              respect your privacy and will honor any such requests promptly.
            </p>
          ),
        },
        {
          heading: "Your Rights",
          body: (
            <p>
              You have the right to request access to, correction of, or deletion
              of any personal information we hold about you. To exercise these
              rights, contact{" "}
              <a
                href="mailto:maxx@maxxslater.com"
                className="bg-white px-1 font-medium text-black transition-opacity duration-100 hover:opacity-80"
              >
                maxx@maxxslater.com
              </a>
              .
            </p>
          ),
        },
        {
          heading: "Changes to This Policy",
          body: (
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with a revised date. Continued use
              of the website constitutes acceptance of the updated policy.
            </p>
          ),
        },
      ]}
    />
  );
}
