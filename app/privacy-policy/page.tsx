import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#010413]">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link
          href="/"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-white/50 mb-8">
          Last updated: July 19, 2026
        </p>

        <p className="text-white/80 mb-8">
          This privacy policy applies to the Cards mobile application (the
          &ldquo;App&rdquo;).
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">
            Data Collection
          </h2>
          <p className="text-white/80">
            The App does not collect, store, share, or transmit any personal or
            usage data. No information is sent to any server, third party, or
            external service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">
            Data Storage
          </h2>
          <p className="text-white/80">
            All information you enter into the App &mdash; including card
            details, notes, optional CVV numbers, and preferences &mdash; is
            encrypted and stored exclusively on your device using platform
            secure storage. This data never leaves your device and is never
            accessible to the app developer or any third party.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">
            Third-Party Services
          </h2>
          <p className="text-white/80">
            The App operates entirely offline and requires no internet
            permission. No analytics, crash reporting, telemetry, or advertising
            SDKs are active in the App.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">
            Data Deletion
          </h2>
          <p className="text-white/80">
            Since all data is stored locally on your device, you can delete it
            at any time by clearing the App&rsquo;s data through your device
            settings or uninstalling the App.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">
            Children&rsquo;s Privacy
          </h2>
          <p className="text-white/80">
            The App does not knowingly collect any personal information from
            children.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">
            Changes to This Policy
          </h2>
          <p className="text-white/80">
            If this policy changes, the updated version will be posted here with
            a new effective date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p className="text-white/80">
            If you have questions about this policy, contact:{" "}
            <span className="text-white/50">hi@toxdes.com</span>
          </p>
        </section>
      </div>
    </div>
  );
}
