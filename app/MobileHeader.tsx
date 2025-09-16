"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function MobileHeader() {
  const [isStudentMenuOpen, setIsStudentMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleStudentMenu = () => {
    setIsStudentMenuOpen(!isStudentMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStudentMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">📄</div>
            <span className="text-xl font-bold text-slate-900">
              Resume Stuffer
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/certifications"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Certifications
            </Link>

            {/* Students dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleStudentMenu}
                className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                Students
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isStudentMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isStudentMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/students"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setIsStudentMenuOpen(false)}
                    >
                      <span className="font-medium">Student Overview</span>
                      <span className="block text-xs text-slate-500">All pathways and opportunities</span>
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <Link
                      href="/students/college-prep"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setIsStudentMenuOpen(false)}
                    >
                      <span className="font-medium">🎓 College Preparation</span>
                      <span className="block text-xs text-slate-500">AP courses & language certs</span>
                    </Link>
                    <Link
                      href="/students/tech-careers"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setIsStudentMenuOpen(false)}
                    >
                      <span className="font-medium">💻 Technology Careers</span>
                      <span className="block text-xs text-slate-500">CompTIA & IT fundamentals</span>
                    </Link>
                    <Link
                      href="/students/skilled-trades"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setIsStudentMenuOpen(false)}
                    >
                      <span className="font-medium">🔧 Skilled Trades</span>
                      <span className="block text-xs text-slate-500">Welding & safety certifications</span>
                    </Link>
                    <Link
                      href="/students/business-skills"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setIsStudentMenuOpen(false)}
                    >
                      <span className="font-medium">💼 Business Skills</span>
                      <span className="block text-xs text-slate-500">Microsoft Office & productivity</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile navigation menu */}
        <div
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden py-4 border-t border-slate-200`}
        >
          <div className="flex flex-col space-y-3">
            <Link
              href="/certifications"
              className="text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Certifications
            </Link>

            {/* Mobile Students Section */}
            <div className="px-4">
              <div className="text-slate-900 font-medium py-2">Students</div>
              <div className="ml-4 space-y-2">
                <Link
                  href="/students"
                  className="block text-slate-600 hover:text-slate-900 transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Overview
                </Link>
                <Link
                  href="/students/college-prep"
                  className="block text-slate-600 hover:text-slate-900 transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🎓 College Prep
                </Link>
                <Link
                  href="/students/tech-careers"
                  className="block text-slate-600 hover:text-slate-900 transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  💻 Tech Careers
                </Link>
                <Link
                  href="/students/skilled-trades"
                  className="block text-slate-600 hover:text-slate-900 transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🔧 Skilled Trades
                </Link>
                <Link
                  href="/students/business-skills"
                  className="block text-slate-600 hover:text-slate-900 transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  💼 Business Skills
                </Link>
              </div>
            </div>

            <Link
              href="/blog"
              className="text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
