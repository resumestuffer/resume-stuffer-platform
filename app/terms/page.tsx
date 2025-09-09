import Link from "next/link";
import { Shield, Info, Scale, FileText } from "lucide-react";
import MobileHeader from "../MobileHeader";
import Footer from "../components/Footer";

export default function TermsPage() {
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
            <span className="text-slate-700">Terms of Service</span>
          </nav>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
            style={{
              fontFamily: "Work Sans, system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            Terms of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            These terms govern your use of Resume Stuffer and outline the rights
            and responsibilities of both parties.
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
              Welcome to Resume Stuffer. These Terms of Service ("Terms") govern
              your use of our website located at resumestuffer.com (the
              "Service") operated by Resume Stuffer ("us", "we", or "our").
            </p>

            {/* Important Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" />
                Important Notice
              </h3>
              <p className="text-slate-700 leading-relaxed">
                By accessing or using our Service, you agree to be bound by
                these Terms. If you disagree with any part of these terms, then
                you may not access the Service.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Acceptance of Terms
            </h2>
            <p className="text-slate-600 mb-6">
              By accessing and using Resume Stuffer, you accept and agree to be
              bound by the terms and provision of this agreement. Additionally,
              when using this website's particular services, you shall be
              subject to any posted guidelines or rules applicable to such
              services.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Description of Service
            </h2>
            <p className="text-slate-600 mb-4">Resume Stuffer provides:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                Educational content about professional certifications and career
                development
              </li>
              <li>
                Information about certification programs, costs, and potential
                career benefits
              </li>
              <li>
                Guidance on career advancement strategies and ROI calculations
              </li>
              <li>
                Links to third-party educational resources and certification
                providers
              </li>
              <li>
                Newsletter and communication services for career-related content
              </li>
              <li>
                Interactive tools such as earning calculators and certification
                filters
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              User Responsibilities
            </h2>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Appropriate Use
            </h3>
            <p className="text-slate-600 mb-4">
              You agree to use our Service only for lawful purposes and in
              accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                Use the Service in any way that violates any applicable federal,
                state, local, or international law or regulation
              </li>
              <li>
                Transmit, or procure the sending of, any advertising or
                promotional material not solicited or authorized
              </li>
              <li>
                Impersonate or attempt to impersonate the Company, a Company
                employee, another user, or any other person or entity
              </li>
              <li>
                Engage in any other conduct that restricts or inhibits anyone's
                use or enjoyment of the Service
              </li>
              <li>
                Use automated systems to access, scrape, or download content
                from our website
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Account Information
            </h3>
            <p className="text-slate-600 mb-4">
              If you create an account or provide personal information:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                You are responsible for maintaining the confidentiality of your
                account information
              </li>
              <li>
                You must provide accurate, current, and complete information
              </li>
              <li>You must promptly update any changes to your information</li>
              <li>
                You are responsible for all activities that occur under your
                account
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Content and Intellectual Property
            </h2>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Our Content
            </h3>
            <p className="text-slate-600 mb-6">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of Resume Stuffer and
              its licensors. The Service is protected by copyright, trademark,
              and other laws. Our trademarks and trade dress may not be used in
              connection with any product or service without our prior written
              consent.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              User-Generated Content
            </h3>
            <p className="text-slate-600 mb-4">
              If you submit content to us (such as feedback, testimonials, or
              communications):
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>You retain ownership of your content</li>
              <li>
                You grant us a non-exclusive, royalty-free license to use,
                modify, and display your content in connection with our Service
              </li>
              <li>
                You represent that you have the right to grant such license
              </li>
              <li>
                You are responsible for the accuracy and legality of your
                content
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Affiliate Relationships and Third-Party Links
            </h2>

            {/* Affiliate Disclosure Box */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Affiliate Disclosure & FTC Compliance
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Material Connection:</strong> Resume Stuffer
                participates in affiliate marketing programs and may earn
                commissions from purchases made through our links. This does not
                affect the price you pay for products or services.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Independence of Recommendations:</strong> Our
                recommendations are based on our genuine assessment of
                certification value and career impact. We prioritize
                certifications that offer the best return on investment for
                professionals.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Affiliate Links
            </h3>
            <p className="text-slate-600 mb-4">
              Our website contains affiliate links to third-party websites and
              services. When you click these links and make purchases, we may
              receive a commission. Important points about our affiliate
              relationships:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                <strong>No Additional Cost:</strong> Affiliate commissions do
                not increase the price you pay for products or services
              </li>
              <li>
                <strong>Editorial Independence:</strong> Our content and
                recommendations are not influenced by commission rates
              </li>
              <li>
                <strong>Honest Reviews:</strong> We provide honest assessments
                based on merit, market demand, and career impact
              </li>
              <li>
                <strong>Clear Disclosure:</strong> We clearly identify affiliate
                links and relationships throughout our website
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Third-Party Services
            </h3>
            <p className="text-slate-600 mb-4">
              We link to external websites and services including:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>Certification providers (AWS, Google, Microsoft, etc.)</li>
              <li>Online learning platforms and course providers</li>
              <li>Professional testing and certification bodies</li>
              <li>Career development tools and services</li>
            </ul>
            <p className="text-slate-600 mb-6">
              These third-party services have their own terms of service and
              privacy policies. We are not responsible for their content,
              policies, or practices. We encourage you to review their terms
              before using their services.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Disclaimers and Limitations
            </h2>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Educational Content
            </h3>
            <p className="text-slate-600 mb-6">
              Our content is provided for educational and informational purposes
              only. While we strive for accuracy, certification requirements,
              costs, and career benefits may change. Always verify current
              information directly with certification providers before making
              decisions.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              No Career Guarantees
            </h3>
            <p className="text-slate-600 mb-6">
              We do not guarantee specific career outcomes, salary increases, or
              job opportunities from pursuing any certification. Career success
              depends on many factors including individual effort, market
              conditions, experience, and other qualifications.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Limitation of Liability
            </h3>
            <p className="text-slate-600 mb-6">
              To the maximum extent permitted by law, Resume Stuffer shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages, including without limitation, loss of profits,
              data, use, or other intangible losses, resulting from your use of
              the Service.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Privacy and Data Collection
            </h2>
            <p className="text-slate-600 mb-6">
              Our collection and use of personal information is governed by our{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. By using
              our Service, you consent to the collection and use of information
              as outlined in our Privacy Policy.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Prohibited Uses
            </h2>
            <p className="text-slate-600 mb-4">You may not use our Service:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>
                For any unlawful purpose or to solicit others to perform
                unlawful acts
              </li>
              <li>
                To violate any international, federal, provincial, or state
                regulations, rules, laws, or local ordinances
              </li>
              <li>
                To infringe upon or violate our intellectual property rights or
                the intellectual property rights of others
              </li>
              <li>
                To harass, abuse, insult, harm, defame, slander, disparage,
                intimidate, or discriminate
              </li>
              <li>To submit false or misleading information</li>
              <li>
                To upload or transmit viruses or any other type of malicious
                code
              </li>
              <li>To collect or track the personal information of others</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>For any obscene or immoral purpose</li>
              <li>
                To interfere with or circumvent the security features of the
                Service
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Termination
            </h2>
            <p className="text-slate-600 mb-4">
              We may terminate or suspend your access immediately, without prior
              notice or liability, for any reason whatsoever, including without
              limitation if you breach the Terms.
            </p>
            <p className="text-slate-600 mb-6">
              Upon termination, your right to use the Service will cease
              immediately. If you wish to terminate your account, you may simply
              discontinue using the Service.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Changes to Terms
            </h2>
            <p className="text-slate-600 mb-4">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will try to
              provide at least 30 days notice prior to any new terms taking
              effect.
            </p>
            <p className="text-slate-600 mb-6">
              What constitutes a material change will be determined at our sole
              discretion. By continuing to access or use our Service after those
              revisions become effective, you agree to be bound by the revised
              terms.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Governing Law
            </h2>
            <p className="text-slate-600 mb-6">
              These Terms shall be interpreted and governed by the laws of the
              United States, without regard to its conflict of law provisions.
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Severability
            </h2>
            <p className="text-slate-600 mb-6">
              If any provision of these Terms is held to be invalid or
              unenforceable by a court, the remaining provisions of these Terms
              will remain in effect. These Terms constitute the entire agreement
              between us regarding our Service and supersede and replace any
              prior agreements we might have between us regarding the Service.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Contact Information
            </h2>
            <p className="text-slate-600 mb-6">
              If you have any questions about these Terms of Service, please{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                contact us through our contact page
              </Link>
              .
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Acknowledgment
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-8">
              <p className="text-slate-600 mb-4">
                By using Resume Stuffer, you acknowledge that you have read
                these Terms of Service and agree to be bound by them. These
                Terms apply to all visitors, users, and others who access or use
                the Service.
              </p>
              <p className="text-slate-600 font-medium">
                If you do not agree to these Terms, please do not use our
                Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
