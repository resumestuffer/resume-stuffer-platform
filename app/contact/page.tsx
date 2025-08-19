import Link from 'next/link'
import { Mail, MessageCircle, Clock, HelpCircle } from 'lucide-react'
import MobileHeader from '../MobileHeader'
import ContactForm from '../ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" style={{ fontFamily: 'Work Sans, system-ui, sans-serif' }}>
      {/* Header */}
      <MobileHeader />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-500 mx-2">/</span>
            <span className="text-slate-700">Contact</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6" style={{ fontFamily: 'Work Sans, system-ui, sans-serif', fontWeight: 700 }}>
            Get in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We're here to help you navigate your professional development journey.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Work Sans, system-ui, sans-serif', fontWeight: 700 }}>
                  Other Ways to Reach Us
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Prefer a different way to get in touch? Here are some alternatives.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Email Support</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Send us an email directly for detailed questions or partnership inquiries.
                      </p>
                      <Link href="mailto:hello@resumestuffer.com" className="text-blue-600 hover:text-blue-700 font-medium">
                        hello@resumestuffer.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Response Time</h4>
                      <p className="text-slate-600 leading-relaxed">
                        We typically respond to all inquiries within 24-48 hours during business days (Monday-Friday).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Quick Questions</h4>
                      <p className="text-slate-600 leading-relaxed">
                        For quick questions about specific certifications, try browsing our{' '}
                        <Link href="/certifications" className="text-blue-600 hover:text-blue-700 underline">
                          certification database
                        </Link>{' '}
                        first - you might find your answer immediately!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'Work Sans, system-ui, sans-serif', fontWeight: 700 }}>
                  <HelpCircle className="w-7 h-7 text-blue-600" />
                  Frequently Asked Questions
                </h3>

                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      How do you choose which certifications to recommend?
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      We analyze market demand, salary impact, job opportunities, and career progression potential. Our recommendations are based on industry data and employment trends, not commission rates.
                    </p>
                  </div>

                  <div className="border-b border-slate-200 pb-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      Do you offer personalized career guidance?
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      While we don't offer one-on-one consulting, our{' '}
                      <Link href="/#earning-calculator" className="text-blue-600 hover:text-blue-700 underline">
                        earning calculator
                      </Link>{' '}
                      and certification guides provide personalized insights based on your current role and goals.
                    </p>
                  </div>

                  <div className="border-b border-slate-200 pb-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      How are your salary estimates calculated?
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Our salary estimates are based on industry salary surveys, job posting analysis, and professional survey data. We provide ranges to account for geographic and experience variations.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      Can you help me choose between similar certifications?
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Absolutely! Use our contact form above and specify which certifications you're considering. We'll provide guidance based on your career goals and current experience level.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Work Sans, system-ui, sans-serif', fontWeight: 700 }}>
            Ready to Start Your Certification Journey?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our comprehensive certification database to find the perfect match for your career goals.
          </p>
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Explore Certifications
            <span className="text-lg">→</span>
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
                Empowering professionals to advance their careers through strategic certifications.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Categories</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="/certifications?filter=technology" className="hover:text-blue-400 transition-colors">Technology</Link></li>
                <li><Link href="/certifications?filter=digital-marketing" className="hover:text-blue-400 transition-colors">Digital Marketing</Link></li>
                <li><Link href="/certifications?filter=data-analytics" className="hover:text-blue-400 transition-colors">Data & Analytics</Link></li>
                <li><Link href="/certifications?filter=business-productivity" className="hover:text-blue-400 transition-colors">Business</Link></li>
                <li><Link href="/certifications?filter=design-creative" className="hover:text-blue-400 transition-colors">Design & Creative</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Resources</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="/certifications" className="hover:text-blue-400 transition-colors">All Certifications</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Get Support</Link></li>
                <li><Link href="/#earning-calculator" className="hover:text-blue-400 transition-colors">Earning Calculator</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Company</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              &copy; 2025 Resume Stuffer. All rights reserved. 
              <span className="text-sm ml-2">Affiliate links may earn us a commission.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}