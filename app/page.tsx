"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Award,
  Calculator,
} from "lucide-react";
import EarningCalculator from "./EarningCalculator";
import MobileHeader from "./MobileHeader";
import Footer from "./components/Footer";

// Homepage component
export default function HomePage() {
  const [featuredCertifications, setFeaturedCertifications] = useState<any[]>(
    []
  );
  const [stats, setStats] = useState({
    totalCertifications: 0,
    averageSalaryIncrease: 0,
    totalProviders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/featured-certifications").then((res) => res.json()),
      fetch("/api/stats").then((res) => res.json()),
    ])
      .then(([certsData, statsData]) => {
        setFeaturedCertifications(certsData);
        setStats(statsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
    >
      {/* Header */}
      <MobileHeader />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                style={{
                  fontFamily: "Work Sans, system-ui, sans-serif",
                  fontWeight: 700,
                }}
              >
                Advance Your Career with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Strategic Certifications
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover high-impact certifications that can increase your
                salary by $8,000-$32,000 annually. Get expert guides, ROI
                calculations, and career advancement strategies.
              </p>

              {/* Search Bar */}
              <div className="mt-8 max-w-lg mx-auto lg:mx-0">
                <form
                  action="/certifications"
                  method="GET"
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search certifications..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Search size={20} />
                    <span>Search</span>
                  </button>
                </form>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/certifications"
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Browse Certifications
                </Link>
                <Link
                  href="#earning-calculator"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center"
                >
                  See Your Earning Potential
                </Link>
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 lg:mt-0">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 flex items-center justify-center min-h-[100px] sm:min-h-[120px]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Award className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg sm:text-2xl font-bold text-slate-900">
                      {stats.totalCertifications > 5
                        ? `${Math.max(
                            stats.totalCertifications - 3,
                            stats.totalCertifications - 1
                          )}+`
                        : `${stats.totalCertifications}+`}
                    </p>
                    <p className="text-sm sm:text-base text-slate-600">
                      Certifications
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 flex items-center justify-center min-h-[100px] sm:min-h-[120px]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg sm:text-2xl font-bold text-slate-900">
                      ${stats.averageSalaryIncrease.toLocaleString()}
                    </p>
                    <p className="text-sm sm:text-base text-slate-600">
                      Avg. Salary Boost
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 flex items-center justify-center min-h-[100px] sm:min-h-[120px]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <Users className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg sm:text-2xl font-bold text-slate-900">
                      Multiple
                    </p>
                    <p className="text-sm sm:text-base text-slate-600">
                      Industries
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 flex items-center justify-center min-h-[100px] sm:min-h-[120px]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-cyan-100 rounded-lg flex-shrink-0">
                    <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg sm:text-2xl font-bold text-slate-900">
                      Entry to Expert
                    </p>
                    <p className="text-sm sm:text-base text-slate-600">
                      Levels
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Explore by Category
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find certifications in your field or discover new career paths
              with high earning potential.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { name: "Technology", icon: "💻", filter: "technology" },
              {
                name: "Digital Marketing",
                icon: "📱",
                filter: "digital-marketing",
              },
              {
                name: "Data & Analytics",
                icon: "📊",
                filter: "data-analytics",
              },
              { name: "Business", icon: "💼", filter: "business-productivity" },
              {
                name: "Design & Creative",
                icon: "🎨",
                filter: "design-creative",
              },
            ].map((category) => (
              <Link
                key={category.filter}
                href={`/certifications?filter=${category.filter}`}
                className="group p-4 sm:p-6 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-center sm:block"
              >
                <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
                  <div className="text-2xl sm:text-4xl sm:mb-3 flex-shrink-0">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors text-sm sm:text-base">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Certifications */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Featured Certifications
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              High-impact certifications with proven ROI and career advancement
              potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Suspense fallback={<div>Loading certifications...</div>}>
              {featuredCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{cert.category.icon}</div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {cert.category.name}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-slate-600 mb-2 font-medium">
                    {cert.provider.name}
                  </p>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {cert.description}
                  </p>

                  {/* Stats Grid - UPDATED TO MATCH CERTIFICATION PAGE */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <DollarSign className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-xs text-slate-500 mb-1">Cost</p>
                      <p className="font-semibold text-slate-900 text-sm">
                        {cert.price && cert.price > 0
                          ? `$${(cert.price / 100).toLocaleString()}`
                          : "Free"}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-xs text-slate-500 mb-1">
                        Salary Increase (est.)
                      </p>
                      <p className="font-semibold text-green-600 text-sm">
                        +${cert.salaryIncrease.toLocaleString()}/yr
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-xs text-slate-500 mb-1">Study Time</p>
                      <p className="font-semibold text-slate-900 text-sm">
                        {cert.studyTimeHours}h
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <a
                      href={cert.enrollUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                      Enroll Now
                    </a>
                    {cert.hasGuide && (
                      <Link
                        href={`/certifications/${cert.slug}`}
                        className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Learn More
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </Suspense>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Certifications
              <TrendingUp size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Earning Potential Calculator Section */}
      <EarningCalculator />

      {/* Email Signup */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
            style={{
              fontFamily: "Work Sans, system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            Stay Ahead of the Curve
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Get the latest certification trends, salary insights, and career
            advancement strategies delivered to your inbox.
          </p>

          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>

          <p className="text-sm text-slate-400 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
