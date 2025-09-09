import Link from "next/link";
import MobileHeader from "../MobileHeader";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
    >
      {/* Header */}
      <MobileHeader />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-500 mx-2">/</span>
            <span className="text-slate-700">Privacy Policy</span>
          </nav>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
            style={{
              fontFamily: "Work Sans, system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            Privacy{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We are committed to protecting your privacy and being transparent
            about how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 font-semibold">
              <strong>Last updated:</strong> January 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8">
              Resume Stuffer ("we," "our," or "us") operates the website
              resumestuffer.com (the "Service"). This Privacy Policy explains
              how we collect, use, disclose, and protect your information when
              you use our Service.
            </p>

            {/* Quick Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Quick Summary
              </h3>
              <p className="text-slate-700 leading-relaxed">
                We collect minimal personal information, primarily through our
                contact forms and newsletter signup. We use this information to
                provide our services and communicate with you. We do not sell
                your personal information to third parties. We participate in
                affiliate marketing programs and use analytics tools to improve
                our services.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Information We Collect
            </h2>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Information You Provide
            </h3>
            <p className="text-slate-600 mb-4">
              We collect information you voluntarily provide to us, including:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                <strong>Contact Information:</strong> Name and email address
                when you contact us or subscribe to our newsletter
              </li>
              <li>
                <strong>Communication Data:</strong> Messages you send us
                through our contact forms or email
              </li>
              <li>
                <strong>Feedback:</strong> Survey responses, testimonials, or
                other feedback you choose to provide
              </li>
              <li>
                <strong>Career Information:</strong> Job titles, industries, or
                certification interests you share with us
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Information Collected Automatically
            </h3>
            <p className="text-slate-600 mb-4">
              When you visit our website, we automatically collect certain
              information:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent on pages,
                clicks, and navigation patterns
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, operating
                system, device type, and screen resolution
              </li>
              <li>
                <strong>Location Data:</strong> General geographic location
                based on IP address (country/region level)
              </li>
              <li>
                <strong>Referral Data:</strong> Websites or sources that
                referred you to our site
              </li>
              <li>
                <strong>Search Queries:</strong> Certification searches and
                filter selections on our website
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Cookies and Tracking Technologies
            </h3>
            <p className="text-slate-600 mb-4">
              We use cookies and similar tracking technologies to improve your
              experience:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                <strong>Essential Cookies:</strong> Required for basic website
                functionality
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Google Analytics to
                understand how visitors use our website
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Google Ads for displaying
                relevant advertisements
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and
                preferences
              </li>
              <li>
                <strong>Affiliate Tracking:</strong> Track referrals to our
                affiliate partners
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              How We Use Your Information
            </h2>
            <p className="text-slate-600 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                <strong>Service Provision:</strong> To provide and maintain our
                website and certification guidance services
              </li>
              <li>
                <strong>Communication:</strong> To respond to your inquiries and
                send you requested information
              </li>
              <li>
                <strong>Newsletter:</strong> To send you our newsletter with
                certification insights (you can unsubscribe at any time)
              </li>
              <li>
                <strong>Website Improvement:</strong> To analyze usage patterns
                and improve our content and user experience
              </li>
              <li>
                <strong>Personalization:</strong> To provide relevant
                certification recommendations and content
              </li>
              <li>
                <strong>Affiliate Marketing:</strong> To track affiliate
                referrals and calculate commissions
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with legal
                obligations and protect our rights
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Information Sharing and Disclosure
            </h2>
            <p className="text-slate-600 mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information in the following limited
              circumstances:
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Service Providers
            </h3>
            <p className="text-slate-600 mb-4">
              We may share information with third-party service providers who
              help us operate our website:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                <strong>Email Services:</strong> For sending newsletters and
                responding to inquiries
              </li>
              <li>
                <strong>Analytics Providers:</strong> Google Analytics for
                website analytics and performance monitoring
              </li>
              <li>
                <strong>Advertising Networks:</strong> Google Ads for displaying
                relevant advertisements
              </li>
              <li>
                <strong>Hosting Providers:</strong> For website hosting and
                maintenance
              </li>
              <li>
                <strong>Payment Processors:</strong> For processing affiliate
                commissions (if applicable)
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Legal Requirements
            </h3>
            <p className="text-slate-600 mb-4">
              We may disclose your information if required by law or in response
              to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>Legal process, court orders, or government requests</li>
              <li>Protecting our rights, property, or safety</li>
              <li>
                Investigating potential violations of our terms of service
              </li>
              <li>Preventing fraud or security threats</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Affiliate Disclosure and Third-Party Links
            </h2>

            {/* Affiliate Disclosure Box */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Affiliate Relationships & FTC Compliance
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Material Connection Disclosure:</strong> Resume Stuffer
                participates in affiliate marketing programs with various
                certification providers and educational platforms. When you
                click on certain links and make purchases, we may earn a
                commission at no additional cost to you.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Independence of Recommendations:</strong> Our
                recommendations are based on our genuine assessment of
                certification value and career impact. We prioritize
                certifications that offer the best return on investment for
                professionals, regardless of commission rates. This helps
                support our website and allows us to continue providing free,
                research-backed content.
              </p>
            </div>

            <p className="text-slate-600 mb-4">
              Our website contains links to external websites and affiliate
              partners, including:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                Online course providers and certification platforms (AWS,
                Google, Microsoft, etc.)
              </li>
              <li>Educational resources and training materials</li>
              <li>Career development tools and services</li>
              <li>Professional certification bodies and testing centers</li>
            </ul>

            <p className="text-slate-600 mb-6">
              These third-party websites have their own privacy policies. We are
              not responsible for their privacy practices or content. We
              encourage you to review their privacy policies before providing
              any personal information.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Data Security
            </h2>
            <p className="text-slate-600 mb-4">
              We implement appropriate security measures to protect your
              personal information:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                <strong>Encryption:</strong> Data transmission is protected
                using SSL/TLS encryption
              </li>
              <li>
                <strong>Access Controls:</strong> Limited access to personal
                information on a need-to-know basis
              </li>
              <li>
                <strong>Regular Updates:</strong> Security measures are
                regularly reviewed and updated
              </li>
              <li>
                <strong>Secure Hosting:</strong> Data stored with reputable
                hosting providers with security certifications
              </li>
              <li>
                <strong>Data Minimization:</strong> We only collect and retain
                data necessary for our services
              </li>
            </ul>

            <p className="text-slate-600 mb-6">
              However, no method of transmission over the internet is 100%
              secure. While we strive to protect your information, we cannot
              guarantee absolute security.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Data Retention
            </h2>
            <p className="text-slate-600 mb-4">
              We retain your personal information only as long as necessary for
              the purposes outlined in this policy:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                <strong>Contact Information:</strong> Until you request removal
                or unsubscribe from communications
              </li>
              <li>
                <strong>Analytics Data:</strong> Typically retained for 26
                months as per Google Analytics standard retention
              </li>
              <li>
                <strong>Communication Records:</strong> Retained for 3 years for
                customer service and legal purposes
              </li>
              <li>
                <strong>Affiliate Tracking Data:</strong> Retained as required
                by affiliate program terms (typically 1-2 years)
              </li>
              <li>
                <strong>Website Usage Data:</strong> Aggregated and anonymized
                data may be retained indefinitely for trend analysis
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Your Rights and Choices
            </h2>
            <p className="text-slate-600 mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Access and Correction
            </h3>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                Request access to the personal information we have about you
              </li>
              <li>
                Request correction of inaccurate or incomplete information
              </li>
              <li>
                Request a detailed report of how your information is being used
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Deletion and Portability
            </h3>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                Request deletion of your personal information (subject to legal
                obligations)
              </li>
              <li>Request a copy of your information in a portable format</li>
              <li>Request that we stop processing your personal information</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              California Consumer Privacy Act (CCPA) Rights
            </h3>
            <p className="text-slate-600 mb-4">
              If you are a California resident, you have additional rights under
              the CCPA:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                <strong>Right to Know:</strong> Request information about the
                categories and sources of personal information we collect
              </li>
              <li>
                <strong>Right to Delete:</strong> Request deletion of your
                personal information
              </li>
              <li>
                <strong>Right to Opt-Out:</strong> Opt-out of the sale of
                personal information (we do not sell personal information)
              </li>
              <li>
                <strong>Right to Non-Discrimination:</strong> We will not
                discriminate against you for exercising your privacy rights
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Communication Preferences
            </h3>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                Unsubscribe from our newsletter at any time using the
                unsubscribe link
              </li>
              <li>
                Opt out of certain communications while maintaining your account
              </li>
              <li>
                Request to be removed from affiliate tracking (may affect
                personalized recommendations)
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Cookie Management
            </h3>
            <p className="text-slate-600 mb-4">
              You can control cookies through your browser settings:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>Block all cookies (may affect website functionality)</li>
              <li>Delete existing cookies</li>
              <li>Set preferences for future cookies</li>
              <li>
                Opt out of Google Analytics using the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  className="text-blue-600 hover:text-blue-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              International Data Transfers
            </h2>
            <p className="text-slate-600 mb-6">
              Our website is operated from the United States. If you are
              accessing our website from outside the United States, please be
              aware that your information may be transferred to, stored, and
              processed in the United States where our servers are located. We
              ensure appropriate safeguards are in place for international data
              transfers in compliance with applicable privacy laws.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Automated Decision-Making
            </h2>
            <p className="text-slate-600 mb-6">
              We may use automated systems to analyze your usage patterns and
              provide personalized certification recommendations. These systems
              help us suggest relevant content based on your interests and
              browsing behavior. You have the right to opt out of automated
              decision-making by contacting us.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Children's Privacy
            </h2>
            <p className="text-slate-600 mb-6">
              Our website is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected personal information
              from a child under 13, we will take steps to remove that
              information promptly.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Changes to This Privacy Policy
            </h2>
            <p className="text-slate-600 mb-4">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We will notify you
              of any material changes by:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                Posting the updated policy on our website with a new "Last
                Updated" date
              </li>
              <li>
                Sending email notifications for significant changes (if you've
                subscribed to our newsletter)
              </li>
              <li>
                Displaying a prominent notice on our website for major changes
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Contact Information
            </h2>
            <p className="text-slate-600 mb-4">
              If you have questions about this Privacy Policy, want to exercise
              your privacy rights, or have concerns about our privacy practices,
              please{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                contact us through our contact page
              </Link>
              .
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-8">
              <p className="text-slate-600 mb-2">
                <strong>Response Time:</strong> We will respond to your
                privacy-related inquiries within 30 days of receipt.
              </p>
              <p className="text-slate-600">
                <strong>Verification:</strong> We may need to verify your
                identity before processing certain requests to protect your
                privacy and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
