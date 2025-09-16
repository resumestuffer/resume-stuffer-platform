"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  Grid,
  List,
  Award,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import MobileHeader from "../MobileHeader";
import Footer from "../components/Footer";

// Search and filter props interface
interface SearchParams {
  search?: string;
  filter?: string;
  sort?: string;
  page?: string;
  popular?: string;
}

const ITEMS_PER_PAGE = 12;

// Main component
function CertificationsPageContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>({
    certifications: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Get current search params
  const currentSearch = searchParams.get("search") || "";
  const currentFilter = searchParams.get("filter") || "";
  const currentSort = searchParams.get("sort") || "salaryIncrease";
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (currentSearch) params.set("search", currentSearch);
        if (currentFilter) params.set("filter", currentFilter);
        if (currentSort) params.set("sort", currentSort);
        params.set("page", currentPage.toString());

        const [certificationsResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/certifications?${params.toString()}`),
          fetch("/api/categories"),
        ]);

        const certificationsData = await certificationsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setData(certificationsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentSearch, currentFilter, currentSort, currentPage]);

  const { certifications, totalCount, totalPages } = data;

  if (loading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center"
        style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading certifications...</p>
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

      {/* Page Header */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              {currentFilter
                ? `${
                    categories.find((c) => c.slug === currentFilter)?.name ||
                    "Filtered"
                  } `
                : "All "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Certifications
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              {currentSearch
                ? `Search results for "${currentSearch}"`
                : "Discover high-impact certifications that can boost your salary and advance your career."}
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200 mb-6">
            <form
              method="GET"
              className="space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4"
            >
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    name="search"
                    defaultValue={currentSearch}
                    placeholder="Search certifications, providers, or keywords..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all text-slate-900 placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <select
                  name="filter"
                  defaultValue={currentFilter}
                  className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.75rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="lg:w-48">
                <select
                  name="sort"
                  defaultValue={currentSort}
                  className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.75rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option value="salaryIncrease">Highest Salary Impact</option>
                  <option value="popular">Most Popular</option>
                  <option value="title">Name (A-Z)</option>
                  <option value="freeOnly">Free Only</option>
                  <option value="studyTime">Shortest Study Time</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full lg:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Filter size={20} />
                <span>Apply Filters</span>
              </button>
            </form>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
              <Link
                href={`/certifications?${new URLSearchParams({
                  ...(currentSearch && { search: currentSearch }),
                  ...(currentFilter && { filter: currentFilter }),
                  sort: "salaryIncrease",
                }).toString()}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  currentSort === "salaryIncrease"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                Highest Earning Potential
              </Link>
              <Link
                href={`/certifications?${new URLSearchParams({
                  ...(currentSearch && { search: currentSearch }),
                  ...(currentFilter && { filter: currentFilter }),
                  sort: "popular",
                }).toString()}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  currentSort === "popular"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                Most Popular
              </Link>
              <Link
                href="/certifications?sort=freeOnly"
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  currentSort === "freeOnly"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                Free Only
              </Link>
              <Link
                href="/certifications?sort=studyTime"
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  currentSort === "studyTime"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                Fastest to Complete
              </Link>
              <Link
                href="/certifications?sort=title"
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  currentSort === "title"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                A-Z
              </Link>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600">
              Showing {certifications.length} of {totalCount} certification
              {totalCount !== 1 ? "s" : ""}
              {totalPages > 1 && (
                <span className="ml-2 text-slate-500">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </p>

            {/* Clear Filters */}
            {(currentSearch || currentFilter) && (
              <Link
                href="/certifications"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Clear all filters
              </Link>
            )}
          </div>

          {/* Certifications Grid */}
          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-4">
              <span className="inline-flex items-center gap-1">
                <span className="text-slate-400">ℹ️</span>
                Salary increase estimates are based on industry data and may
                vary by location, experience, and employer.
              </span>
            </p>
          </div>

          <Suspense fallback={<div>Loading certifications...</div>}>
            {certifications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {certifications.map((cert: any) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:transform hover:-translate-y-1 flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{cert.category.icon}</div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {cert.category.name}
                      </span>
                    </div>

                    {/* Title and Provider */}
                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-slate-600 mb-2 font-medium">
                      {cert.provider.name}
                    </p>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {cert.description}
                    </p>

                    {/* Stats Grid - UPDATED: Values on top, no icons */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <p className="font-semibold text-slate-900 text-sm mb-1">
                          {cert.price && cert.price > 0
                            ? `$${(cert.price / 100).toLocaleString()}`
                            : "Free"}
                        </p>
                        <p className="text-xs text-slate-500">Cost</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-green-600 text-sm mb-1">
                          +${cert.salaryIncrease.toLocaleString()}/yr
                        </p>
                        <p className="text-xs text-slate-500">
                          Salary Increase (est.)
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-slate-900 text-sm mb-1">
                          {cert.studyTimeHours}h
                        </p>
                        <p className="text-xs text-slate-500">Study Time</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <a
                        href={cert.enrollUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
                      >
                        Enroll Now
                      </a>
                      <Link
                        href={`/certifications/${cert.slug}`}
                        className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No certifications found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <Link
                  href="/certifications"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Grid size={20} />
                  View All Certifications
                </Link>
              </div>
            )}
          </Suspense>

          {/* Pagination - NEW ADDITION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 mb-8">
              {/* Previous Button */}
              {currentPage > 1 && (
                <Link
                  href={`/certifications?${new URLSearchParams({
                    ...(currentSearch && { search: currentSearch }),
                    ...(currentFilter && { filter: currentFilter }),
                    ...(currentSort !== "salaryIncrease" && {
                      sort: currentSort,
                    }),
                    page: (currentPage - 1).toString(),
                  }).toString()}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Previous
                </Link>
              )}

              {/* Page Numbers */}
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum: number;

                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }

                return (
                  <Link
                    key={pageNum}
                    href={`/certifications?${new URLSearchParams({
                      ...(currentSearch && { search: currentSearch }),
                      ...(currentFilter && { filter: currentFilter }),
                      ...(currentSort !== "salaryIncrease" && {
                        sort: currentSort,
                      }),
                      page: pageNum.toString(),
                    }).toString()}`}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pageNum === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}

              {/* Show ellipsis and last page if needed */}
              {totalPages > 7 && currentPage < totalPages - 3 && (
                <>
                  <span className="px-2 text-slate-400">...</span>
                  <Link
                    href={`/certifications?${new URLSearchParams({
                      ...(currentSearch && { search: currentSearch }),
                      ...(currentFilter && { filter: currentFilter }),
                      ...(currentSort !== "salaryIncrease" && {
                        sort: currentSort,
                      }),
                      page: totalPages.toString(),
                    }).toString()}`}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    {totalPages}
                  </Link>
                </>
              )}

              {/* Next Button */}
              {currentPage < totalPages && (
                <Link
                  href={`/certifications?${new URLSearchParams({
                    ...(currentSearch && { search: currentSearch }),
                    ...(currentFilter && { filter: currentFilter }),
                    ...(currentSort !== "salaryIncrease" && {
                      sort: currentSort,
                    }),
                    page: (currentPage + 1).toString(),
                  }).toString()}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          )}

          {/* Email Signup CTA */}
          {certifications.length > 0 && (
            <div className="mt-16">
              <div className="bg-slate-900 rounded-xl p-8 lg:p-12 text-white text-center">
                <h2
                  className="text-2xl lg:text-3xl font-bold mb-4"
                  style={{
                    fontFamily: "Work Sans, system-ui, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Stay Ahead of the Curve
                </h2>
                <p className="text-lg lg:text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
                  Get the latest certification trends, salary insights, and
                  career advancement strategies delivered to your inbox.
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
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function CertificationsPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center"
          style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading certifications...</p>
          </div>
        </div>
      }
    >
      <CertificationsPageContent />
    </Suspense>
  );
}
