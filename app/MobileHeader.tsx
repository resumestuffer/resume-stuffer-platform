"use client";
import Link from "next/link";

export default function MobileHeader() {
  const toggleMobileMenu = () => {
    const menu = document.getElementById("mobile-menu");
    menu?.classList.toggle("hidden");
  };

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
          id="mobile-menu"
          className="hidden md:hidden py-4 border-t border-slate-200"
        >
          <div className="flex flex-col space-y-3">
            <Link
              href="/certifications"
              className="text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
            >
              Certifications
            </Link>
            <Link
              href="/blog"
              className="text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
