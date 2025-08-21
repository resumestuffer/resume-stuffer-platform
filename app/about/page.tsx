import Link from "next/link";
import {
  TrendingUp,
  Users,
  Award,
  Target,
  BarChart3,
  Rocket,
  Lightbulb,
  Search,
  Shield,
  Zap,
  GraduationCap,
  Star,
} from "lucide-react";
import MobileHeader from "../MobileHeader";

export default function AboutPage() {
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
            <span className="text-slate-700">About</span>
          </nav>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
            style={{
              fontFamily: "Work Sans, system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Resume Stuffer
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We help ambitious professionals advance their careers through
            strategic certification guidance and skill development.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Our Mission
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We believe every professional deserves access to clear, actionable
              guidance for advancing their career through strategic skill
              development.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                40+
              </div>
              <div className="text-sm sm:text-base text-slate-600">
                High-ROI certifications
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                $25K+
              </div>
              <div className="text-sm sm:text-base text-slate-600">
                Average salary increase potential
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">
                5
              </div>
              <div className="text-sm sm:text-base text-slate-600">
                Industry categories
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-2">
                100%
              </div>
              <div className="text-sm sm:text-base text-slate-600">
                Research-backed recommendations
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-600 text-center max-w-4xl mx-auto leading-relaxed">
            The job market has become increasingly competitive, with employers
            seeking candidates who demonstrate continuous learning and
            specialized expertise. We research and analyze certifications to
            identify those that deliver measurable career impact and earning
            potential based on industry data.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              What We Do
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We provide comprehensive certification guidance to help
              professionals make informed decisions about their career
              development investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Strategic Guidance
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We analyze market demand, salary impact, and career progression
                potential to recommend certifications that align with your
                professional goals and maximize return on investment.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Data-Driven Insights
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Our recommendations are backed by salary data, industry trends,
                and job market analysis to ensure you're investing in skills
                that employers value most.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Career Acceleration
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We help professionals identify the fastest path to career
                advancement through strategic certification choices that open
                doors to new opportunities and higher compensation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Expert Curation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Our team researches and evaluates hundreds of certifications to
                surface only those with proven track records of career impact
                and industry recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These principles guide everything we do and every recommendation
              we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Transparency
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We provide honest, unbiased reviews and clearly disclose our
                affiliate relationships. Our recommendations are based on merit,
                not commission rates.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Actionability
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Every piece of content we create is designed to help you take
                concrete steps toward your career goals with clear, practical
                guidance.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Continuous Learning
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We stay current with industry trends, emerging technologies, and
                evolving certification landscape to provide the most relevant
                guidance.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Quality Focus
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We prioritize depth over breadth, focusing on certifications and
                training programs that deliver measurable professional value and
                industry recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h3
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
            style={{
              fontFamily: "Work Sans, system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            Ready to Advance Your Career?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our certification database and find the right path for your
            professional goals.
          </p>
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Browse Certifications
            <TrendingUp size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">📄</div>
                <span className="text-xl font-bold">Resume Stuffer</span>
              </div>
              <p className="text-slate-300">
                Empowering professionals to advance their careers through
                strategic certifications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Categories</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link
                    href="/certifications?filter=technology"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    href="/certifications?filter=digital-marketing"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/certifications?filter=data-analytics"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Data & Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/certifications?filter=business-productivity"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Business
                  </Link>
                </li>
                <li>
                  <Link
                    href="/certifications?filter=design-creative"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Design & Creative
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Resources</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link
                    href="/certifications"
                    className="hover:text-blue-400 transition-colors"
                  >
                    All Certifications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Get Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#earning-calculator"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Earning Calculator
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Company</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              &copy; 2025 Resume Stuffer. All rights reserved.
              <span className="text-sm ml-2">
                Affiliate links may earn us a commission.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
