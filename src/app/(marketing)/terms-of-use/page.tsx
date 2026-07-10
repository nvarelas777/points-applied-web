import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Points Applied",
  description: "The terms and conditions for using Points Applied.",
};

export default function TermsOfUsePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:px-8 md:py-16">
      <header className="mb-10 max-w-3xl">
        <p className="pa-label mb-3">Points Applied</p>
        <h1 className="text-4xl font-black text-slate-900 mb-2">
          Terms of Use
        </h1>
        <p className="text-sm text-slate-400">Last updated: March 11, 2026</p>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 lg:p-10 space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Acceptance of Terms
          </h2>
          <p className="mb-3">
            By accessing and using this credit card management application
            (&quot;Service&quot;), operated by Points Applied
            (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you accept
            and agree to be bound by the terms and conditions of this
            agreement.
          </p>
          <p>If you do not agree to these terms, please do not use the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Description of Service
          </h2>
          <p className="mb-3">
            Our Service provides a personal credit card tracking and
            management tool that allows you to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Track credit cards you own or have owned</li>
            <li>Monitor annual fees, benefits, and rewards</li>
            <li>View card application and closure dates</li>
            <li>Analyze your credit card portfolio</li>
            <li>Organize card information and personal notes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            User Responsibilities
          </h2>
          <p className="mb-3">As a user of this Service, you agree to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Provide accurate and current information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use the Service only for lawful purposes</li>
            <li>Not share your account with others</li>
            <li>Not attempt to gain unauthorized access to the Service</li>
            <li>Not use automated systems or software to extract data from the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Account Security
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to notify us immediately of any
            unauthorized use of your account or any other breach of security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Data Accuracy and Financial Disclaimer
          </h2>
          <p className="mb-3">
            <strong className="text-slate-800">Important Disclaimers:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>This Service is for informational and organizational purposes only.</li>
            <li>We are not financial advisors, and we do not provide financial, credit, legal, or tax advice.</li>
            <li>Card benefit and reward information may be outdated, incomplete, or inaccurate.</li>
            <li>Annual fees, credit card offers, and terms are subject to change without notice by card issuers.</li>
            <li>We are not affiliated with any credit card issuer or financial institution unless otherwise expressly stated.</li>
            <li>You must verify all information directly with your card issuers and read their terms before applying.</li>
            <li>We are not responsible for decisions made based on information in the Service, including decisions to apply for credit.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Affiliate Links and Monetization
          </h2>
          <p className="mb-3">
            We may include affiliate links, referral links, or display
            credit card offers within the Service. If you click on an
            affiliate link and apply for a product or service, Points
            Applied may receive compensation from the financial institution
            or partner at no additional cost to you.
          </p>
          <p>
            This compensation may impact how and where products appear on
            the Service. However, our content, recommendations, and reviews
            are not influenced by such compensation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            User-Generated Content
          </h2>
          <p className="mb-3">
            The Service allows you to add personal notes and custom credit
            card entries to your private account. You retain ownership of
            this data.
          </p>
          <p>
            However, you are solely responsible for ensuring that any
            uploaded content is accurate, lawful, and does not violate the
            rights of any third party. Points Applied assumes no liability
            for the content you store within your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Prohibited Uses
          </h2>
          <p className="mb-3">You may not use the Service to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Transmit harmful or malicious code</li>
            <li>Attempt to reverse engineer or decompile the Service</li>
            <li>Use the Service for commercial purposes without authorization</li>
            <li>Harass, abuse, or harm other users</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Intellectual Property
          </h2>
          <p className="mb-3">
            The Service and its original content, features, and
            functionality are owned by Points Applied and are protected by
            international copyright, trademark, and other intellectual
            property laws.
          </p>
          <p>You retain ownership of the data you privately input into the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Limitation of Liability
          </h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of
            any kind. We shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your
            use of or inability to use the Service, including but not
            limited to financial losses, data loss, impacts on your credit
            score, or service interruptions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Service Modifications and Termination
          </h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the
            Service at any time without notice. We may also terminate or
            suspend your account for violations of these Terms or for any
            other reason at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Indemnification
          </h2>
          <p>
            You agree to indemnify and hold harmless Points Applied, its
            operators, and affiliates from any claims, damages, losses, or
            expenses arising from your use of the Service or violation of
            these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance
            with the laws of the State of California, United States of
            America, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Changes to Terms
          </h2>
          <p>
            We reserve the right to update these Terms at any time. We will
            notify users of any material changes by updating the Last
            Updated date. Continued use of the Service after changes
            constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Contact Information
          </h2>
          <p className="mb-2">
            If you have questions about these Terms, please contact us at:
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
        </section>
      </div>
    </main>
  );
}
