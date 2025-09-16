import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">📄</div>
              <span className="text-xl font-bold">Resume Stuffer</span>
            </div>
            <p className="text-slate-300 mb-4">
              Empowering professionals to advance their careers through
              strategic certifications.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="https://x.com/Resume_Stuffer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11.9 8.6L19.2 0h-1.7l-6.3 7.3L7.3 0H0l7.6 11.1L0 20h1.7l6.7-7.8L12.7 20H20l-8.1-11.4zm-2.4 2.8l-.8-1.1L2.4 1.6h2.7l5.1 7.3.8 1.1 6.4 9.2h-2.7l-5.4-7.7z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/resumestuffer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://instagram.com/resumestuffer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C7.284 0 6.944.012 5.877.06 4.813.108 4.086.278 3.45.525a5.011 5.011 0 00-1.814 1.181A5.011 5.011 0 00.454 4.52C.208 5.156.038 5.883-.01 6.947-.058 8.012-.07 8.352-.07 11.068s.012 3.056.06 4.123c.048 1.064.218 1.791.465 2.427a5.011 5.011 0 001.181 1.814 5.011 5.011 0 001.814 1.181c.636.247 1.363.417 2.427.465C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c1.064-.048 1.791-.218 2.427-.465a5.011 5.011 0 001.814-1.181 5.011 5.011 0 001.181-1.814c.247-.636.417-1.363.465-2.427C19.988 13.056 20 12.716 20 10s-.012-3.056-.06-4.123c-.048-1.064-.218-1.791-.465-2.427A5.011 5.011 0 0018.294.639 5.011 5.011 0 0016.48.454C15.844.208 15.117.038 14.053-.01 12.988-.058 12.648-.07 10-.07zm0 1.802c2.67 0 2.987.01 4.042.059.976.045 1.505.207 1.858.344.467.182.8.398 1.15.748.35.35.566.683.748 1.15.137.353.3.882.344 1.858.049 1.055.059 1.372.059 4.042s-.01 2.987-.059 4.042c-.045.976-.207 1.505-.344 1.858-.182.467-.398.8-.748 1.15-.35.35-.683.566-1.15.748-.353.137-.882.3-1.858.344-1.055.049-1.372.059-4.042.059s-2.987-.01-4.042-.059c-.976-.045-1.505-.207-1.858-.344a3.103 3.103 0 01-1.15-.748 3.103 3.103 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.858C1.812 12.987 1.802 12.67 1.802 10s.01-2.987.059-4.042c.045-.976.207-1.505.344-1.858.182-.467.398-.8.748-1.15a3.103 3.103 0 011.15-.748c.353-.137.882-.3 1.858-.344C7.013 1.812 7.33 1.802 10 1.802zM10 13.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm0-8.132A4.932 4.932 0 105.068 10 4.932 4.932 0 0010 5.068zm6.276-.194a1.152 1.152 0 11-2.304 0 1.152 1.152 0 012.304 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
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
                  Business & Productivity
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
              <li>
                <Link
                  href="/certifications?filter=cybersecurity"
                  className="hover:text-blue-400 transition-colors"
                >
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-green-400">For Students</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link
                  href="/students"
                  className="hover:text-green-400 transition-colors"
                >
                  Student Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/students/college-prep"
                  className="hover:text-green-400 transition-colors"
                >
                  🎓 College Prep
                </Link>
              </li>
              <li>
                <Link
                  href="/students/tech-careers"
                  className="hover:text-green-400 transition-colors"
                >
                  💻 Tech Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/students/skilled-trades"
                  className="hover:text-green-400 transition-colors"
                >
                  🔧 Skilled Trades
                </Link>
              </li>
              <li>
                <Link
                  href="/students/business-skills"
                  className="hover:text-green-400 transition-colors"
                >
                  💼 Business Skills
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
                  href="/blog"
                  className="hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-blue-400 transition-colors"
                >
                  Get Support
                </Link>
              </li>
              <li>
                <Link
                  href="/earning-calculator"
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

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2025 Resume Stuffer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
