import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Points Applied",
  description: "How Points Applied collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:px-8 md:py-16">
      <header className="mb-10 max-w-3xl">
        <p className="pa-label mb-3">Points Applied</p>
        <h1 className="text-4xl font-black text-slate-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400">Last updated: March 11, 2026</p>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 lg:p-10 space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Introduction
          </h2>
          <p className="mb-3">
            Welcome to Points Applied (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;). We are committed to protecting your privacy and
            ensuring the security of your personal information.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Information We Collect
          </h2>
          <h3 className="text-base font-bold text-slate-800 mt-5 mb-2">
            Account Information
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
            <li>Email address for authentication</li>
            <li>Username and profile information</li>
            <li>
              Authentication credentials handled securely by our third-party
              provider, Clerk
            </li>
          </ul>
          <h3 className="text-base font-bold text-slate-800 mt-5 mb-2">
            Credit Card Tracking Data
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
            <li>Credit card names and issuers, such as Chase Sapphire Preferred</li>
            <li>Card types and categories</li>
            <li>Annual fees and benefit information</li>
            <li>Application and closure dates you provide</li>
            <li>Rewards and sign-up bonus tracking data</li>
            <li>Personal notes and custom card status configurations</li>
          </ul>
          <h3 className="text-base font-bold text-slate-800 mt-5 mb-2">
            Usage and Analytics Data
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
            <li>
              IP addresses, device information, and browser properties via
              Google Analytics and Cloudflare
            </li>
            <li>Application usage events, clicks, and page views</li>
          </ul>
          <p className="mb-2">
            <strong className="text-slate-800">Important:</strong> We do not
            collect or store:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Credit card numbers</li>
            <li>CVV or security codes</li>
            <li>Bank account numbers</li>
            <li>Social Security numbers</li>
            <li>Transaction history or real-time spending data from banks</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            How We Use Your Information
          </h2>
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Provide and maintain the credit card tracking service</li>
            <li>Authenticate your account and ensure security</li>
            <li>Calculate and display card analytics and metrics</li>
            <li>Offer relevant credit card recommendations and affiliate links</li>
            <li>Send service-related notifications if enabled</li>
            <li>Improve and optimize our application via usage analytics</li>
            <li>Respond to your support requests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Data Storage and Security
          </h2>
          <p className="mb-3">
            Your data is stored securely using industry-standard encryption
            and security practices. Our backend infrastructure is hosted on
            Amazon Web Services (AWS), and we use Cloudflare for network
            security.
          </p>
          <p>
            Your authentication is securely managed by Clerk. Access to your
            data is restricted and protected by robust authentication
            mechanisms. We utilize HTTPS for secure data transmission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Information Sharing
          </h2>
          <p className="mb-3">
            We do not sell, trade, or rent your personal information to
            marketing lists or data brokers. We may share information only in
            the following limited circumstances:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              With service providers necessary to operate our application,
              including AWS, Clerk, Cloudflare, and Google Analytics
            </li>
            <li>
              To track affiliate link conversions by identifying source
              clicks, without including personally identifiable financial
              information
            </li>
            <li>When required by law or to protect our legal rights</li>
            <li>With your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Your Rights
          </h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data and your account</li>
            <li>Export your data</li>
            <li>
              Withdraw consent at any time for particular types of processing
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Cookies and Tracking
          </h2>
          <p className="mb-3">
            We use cookies and similar technologies, managed directly or via
            third parties like Google Analytics and Cloudflare, to maintain
            your session, authenticate your requests through Clerk, remember
            your preferences, and analyze application usage.
          </p>
          <p>You can control cookie settings through your browser preferences.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Children&apos;s Privacy
          </h2>
          <p className="mb-3">
            Our service is strictly not intended for individuals under the
            age of 18. We do not knowingly collect personal information from
            children.
          </p>
          <p>
            If we discover that a user is under 18, we will promptly delete
            their account and data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            California Privacy Rights
          </h2>
          <p className="mb-3">
            If you are a resident of California, you may have additional
            rights regarding your personal information under the California
            Consumer Privacy Act (CCPA), including the right to request
            access to and deletion of your data.
          </p>
          <p>To exercise these rights, please contact us at the email address provided below.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will
            notify you of any material changes by posting the new Privacy
            Policy on this page and updating the Last Updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Contact Us
          </h2>
          <p className="mb-2">
            If you have questions about this Privacy Policy or wish to
            exercise your data rights, please contact us at:
          </p>
          <p>
            <strong className="text-slate-800">Email:</strong>{" "}
            <a
              href="mailto:support@pointsapplied.com"
              className="text-primary font-medium hover:underline"
            >
              support@pointsapplied.com
            </a>
          </p>
          <p className="mt-2">Points Applied, California, USA</p>
        </section>
      </div>
    </main>
  );
}
