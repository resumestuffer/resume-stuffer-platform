import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  Calendar,
  Clock,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MobileHeader from "../MobileHeader";
import NewsletterSignup from "../components/NewsletterSignup";
import Footer from "../components/Footer";

// TypeScript interface for blog post metadata
interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  author: string;
  tags: string[];
  featured?: boolean;
}

// Pagination configuration
const POSTS_PER_PAGE = 12;
const FEATURED_POSTS_ON_PAGE_1 = 1;

// Function to get all blog posts from markdown files
function getAllBlogPosts(): BlogPostMeta[] {
  try {
    const postsDirectory = path.join(process.cwd(), "content", "blog");

    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames
      .filter((name) => name.endsWith(".md"))
      .map((name) => {
        const fullPath = path.join(postsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug: name.replace(".md", ""),
          title: data.title || "",
          excerpt: data.excerpt || "",
          category: data.category || "",
          publishDate: data.publishDate || "",
          readTime: data.readTime || "",
          author: data.author || "",
          tags: data.tags || [],
          featured: data.featured || false,
        };
      })
      // Sort by publish date (newest first)
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );

    return posts;
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

// Function to get paginated posts
function getPaginatedPosts(allPosts: BlogPostMeta[], page: number) {
  if (page === 1) {
    // Page 1: Featured post + additional posts
    const featuredPosts = allPosts.filter((post) => post.featured).slice(0, 1);
    let recentPosts = allPosts.filter((post) => !post.featured);

    // If no featured posts, use the most recent post as featured
    if (featuredPosts.length === 0 && allPosts.length > 0) {
      featuredPosts.push({ ...allPosts[0], featured: true });
      recentPosts = recentPosts.slice(1); // Remove it from recent posts
    }

    // Get remaining posts for page 1 (total POSTS_PER_PAGE - featured posts)
    const postsForPage1 = POSTS_PER_PAGE - featuredPosts.length;
    const displayedRecentPosts = recentPosts.slice(0, postsForPage1);

    return {
      featuredPosts,
      recentPosts: displayedRecentPosts,
      totalPosts: allPosts.length,
    };
  } else {
    // Page 2+: Only recent posts
    const startIndex = POSTS_PER_PAGE + (page - 2) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const recentPosts = allPosts.slice(startIndex, endIndex);

    return {
      featuredPosts: [],
      recentPosts,
      totalPosts: allPosts.length,
    };
  }
}

// Pagination component
function PaginationControls({
  currentPage,
  totalPosts,
}: {
  currentPage: number;
  totalPosts: number;
}) {
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? "/blog" : `/blog?page=${currentPage - 1}`}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      )}

      {/* Page numbers */}
      {pageNumbers.map((pageNum, index) => (
        <React.Fragment key={index}>
          {pageNum === "..." ? (
            <span className="px-3 py-2 text-slate-400">...</span>
          ) : (
            <Link
              href={pageNum === 1 ? "/blog" : `/blog?page=${pageNum}`}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {pageNum}
            </Link>
          )}
        </React.Fragment>
      ))}

      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

interface BlogPageProps {
  searchParams: { page?: string };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const allPosts = getAllBlogPosts();
  const { featuredPosts, recentPosts, totalPosts } = getPaginatedPosts(
    allPosts,
    currentPage
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
    >
      {/* Header - Using same pattern as other pages */}
      <MobileHeader />

      {/* Hero Section - Matching homepage pattern without blue background */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Professional Certification<br></br>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Insights & Analysis
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Expert analysis, career guidance, and industry insights to help
              you choose the right professional certifications for maximum
              career impact.
            </p>

            {/* Keep users on blog, don't send them away */}
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Latest articles below</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Blog Content */}
            <div className="lg:col-span-2">
              {/* Latest Posts Section */}
              <section>
                <div className="flex items-center gap-2 mb-8">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    {currentPage === 1
                      ? "Latest Posts"
                      : `Posts - Page ${currentPage}`}
                  </h2>
                </div>
                <div className="space-y-12">
                  {/* Featured/Latest Post - Only on page 1 */}
                  {currentPage === 1 && featuredPosts.length > 0 && (
                    <div className="grid gap-8 mb-12">
                      {featuredPosts.map((post) => (
                        <article
                          key={post.slug}
                          className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
                        >
                          <div className="p-8">
                            <div className="flex items-center gap-4 mb-4">
                              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                {post.category}
                              </span>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    post.publishDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="hover:text-blue-600 transition-colors"
                                style={{
                                  fontFamily:
                                    "Work Sans, system-ui, sans-serif",
                                  fontWeight: 700,
                                }}
                              >
                                {post.title}
                              </Link>
                            </h3>

                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-500">
                                  {post.readTime}
                                </span>
                              </div>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                              >
                                Read Article <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  {/* More Posts Section */}
                  {recentPosts.length > 0 && (
                    <div>
                      {currentPage === 1 && (
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                          More Articles
                        </h2>
                      )}
                      <div className="grid md:grid-cols-2 gap-6">
                        {recentPosts.map((post) => (
                          <article
                            key={post.slug}
                            className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                                {post.category}
                              </span>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    post.publishDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-3">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="hover:text-blue-600 transition-colors"
                              >
                                {post.title}
                              </Link>
                            </h3>

                            <p className="text-slate-600 mb-4 leading-relaxed">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-500">
                                {post.readTime}
                              </span>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                              >
                                Read More <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No posts fallback */}
                  {allPosts.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        No posts yet
                      </h3>
                      <p className="text-slate-600">
                        Blog posts will appear here once they're added to the
                        content/blog folder.
                      </p>
                    </div>
                  )}

                  {/* Pagination Controls */}
                  <PaginationControls
                    currentPage={currentPage}
                    totalPosts={totalPosts}
                  />
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Sidebar Header - matches main content header spacing */}
              <div className="flex items-center gap-2 mb-8">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Resources</h2>
              </div>

              <div className="space-y-8">
                {/* About Section */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    About Our Analysis
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    We provide data-driven insights on professional
                    certifications, career outcomes, and industry trends to help
                    you make informed decisions about your professional
                    development.
                  </p>
                </div>

                {/* Browse Certifications CTA - Instead of newsletter in sidebar */}
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">
                    Browse Certifications
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Explore our comprehensive database of 63 verified
                    certifications across all industries.
                  </p>
                  <Link
                    href="/certifications"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View All Certifications
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Popular Topics
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Career Analysis",
                      "Cloud Computing",
                      "Cybersecurity",
                      "Data & Analytics",
                      "Project Management",
                    ].map((category) => (
                      <Link
                        key={category}
                        href="#"
                        className="block text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <NewsletterSignup
        title="Stay Updated on Certification Trends"
        description="Get the latest certification insights and career guidance delivered monthly."
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
