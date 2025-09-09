import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Tag, BookOpen } from "lucide-react";
import MobileHeader from "../../MobileHeader";
import Footer from "../../components/Footer";
import NewsletterSignup from "../../components/NewsletterSignup";

// TypeScript interface for blog post
interface BlogPost {
  slug: string;
  content: string;
  title: string;
  excerpt?: string;
  category?: string;
  publishDate: string;
  readTime?: string;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  featured?: boolean;
}

// TypeScript interface for mentioned certifications
interface MentionedCertification {
  title: string;
  slug: string;
}

// POST-PROCESS MARKDOWN LINKS IN HTML
function processMarkdownLinksInHTML(content: string): string {
  // Convert [text](url) to proper HTML links when inside HTML blocks
  return content.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:text-blue-800 underline transition-colors">$1</a>'
  );
}

// Custom Link Component for react-markdown
const CustomLink = ({ href, children, ...props }: any) => {
  // Check if it's an internal certification link
  if (href && href.includes("/certifications/")) {
    return (
      <Link
        href={href}
        className="text-blue-600 hover:text-blue-800 underline transition-colors"
      >
        {children}
      </Link>
    );
  }

  // External links
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline transition-colors"
      {...props}
    >
      {children}
    </a>
  );
};

// Get blog post content
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(process.cwd(), "content", "blog", `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // PROCESS MARKDOWN LINKS IN HTML BEFORE RENDERING
    const processedContent = processMarkdownLinksInHTML(content);

    return {
      slug,
      content: processedContent, // Use processed content with converted links
      title: data.title || "Untitled",
      excerpt: data.excerpt,
      category: data.category,
      publishDate: data.publishDate || new Date().toISOString(),
      readTime: data.readTime,
      author: data.author,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      tags: data.tags,
      featured: data.featured,
    };
  } catch (error) {
    console.error("Error reading blog post:", error);
    return null;
  }
}

// Get mentioned certifications from content - PRODUCTION VERSION (UNCHANGED)
function getMentionedCertifications(content: string): MentionedCertification[] {
  // Look for certification links - handles both relative and full URLs
  const certificationLinks =
    content.match(
      /(?:https:\/\/resumestuffer\.com)?\/certifications\/([a-z0-9-]+)/g
    ) || [];

  if (certificationLinks.length === 0) {
    return [];
  }

  const certifications: MentionedCertification[] = certificationLinks
    .map((link) => {
      // Extract slug from link
      const slug = link.replace(/^.*\/certifications\//, "");

      if (!slug) {
        return null;
      }

      // Convert slug to readable title
      let title = slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Handle AWS specifically
      title = title.replace(/Aws/g, "AWS");

      return { title, slug };
    })
    .filter((cert): cert is MentionedCertification => cert !== null);

  // Remove duplicates based on slug
  const unique = certifications.filter(
    (cert, index, self) => index === self.findIndex((c) => c.slug === cert.slug)
  );

  return unique;
}

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const mentionedCertifications = getMentionedCertifications(post.content);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
    >
      <MobileHeader />

      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Category Badge */}
              {post.category && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1
                className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight"
                style={{
                  fontFamily: "Work Sans, system-ui, sans-serif",
                  fontWeight: 700,
                }}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg lg:text-xl text-slate-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishDate}>
                    {new Date(post.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Article Information Sidebar (Non-sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Article information
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600">
                      Published
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {new Date(post.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {post.readTime && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-600">
                        Read time
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {post.readTime}
                      </span>
                    </div>
                  )}

                  {post.category && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium text-slate-600">
                        Category
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Article Content */}
            <div className="lg:col-span-2">
              {/* React Markdown with custom components */}
              <article className="prose prose-slate prose-lg max-w-none blog-content">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    a: CustomLink,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </article>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">
                      Tagged in:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Browse Certifications Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Browse certifications
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Explore our database of 63+ enhanced certification profiles
                    with salary data and career outcomes.
                  </p>
                  <Link
                    href="/certifications"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    View all certifications
                  </Link>
                </div>

                {/* Mentioned in This Article - PRESERVED EXACTLY */}
                {mentionedCertifications.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      Mentioned in this article
                    </h3>
                    <div className="space-y-2">
                      {mentionedCertifications.map((cert, index) => (
                        <Link
                          key={index}
                          href={`/certifications/${cert.slug}`}
                          className="block p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-slate-700">
                            {cert.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Categories */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Popular categories
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/certifications?filter=technology"
                      className="block p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        Technology
                      </span>
                    </Link>
                    <Link
                      href="/certifications?filter=cloud-computing"
                      className="block p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        Cloud Computing
                      </span>
                    </Link>
                    <Link
                      href="/certifications?filter=data-analytics"
                      className="block p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        Data & Analytics
                      </span>
                    </Link>
                    <Link
                      href="/certifications?filter=digital-marketing"
                      className="block p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        Digital Marketing
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/blog"
              className="flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
            <Link
              href="/certifications"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Browse certifications
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup
        title="Stay informed about certification trends"
        description="Get insights on new certifications, salary trends, and career advancement strategies."
      />

      <Footer />
    </div>
  );
}
