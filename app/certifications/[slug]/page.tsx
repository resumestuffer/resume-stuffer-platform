import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  BookOpen,
  FileText,
  CheckCircle,
  Target,
  BarChart3,
} from "lucide-react";
import MobileHeader from "../../MobileHeader";
import Footer from "../../components/Footer";
import StudyResources from "../../components/StudyResources";

// Fixed getCertification function with all enhanced fields
async function getCertification(slug: string) {
  try {
    const certification = await prisma.certification.findUnique({
      where: { slug },
      select: {
        // Basic fields
        id: true,
        title: true,
        slug: true,
        description: true,
        shortDescription: true,
        price: true,
        studyTimeHours: true,
        studyTimeWeeks: true,
        salaryIncrease: true,
        demandLevel: true,
        experienceLevel: true,
        enrollUrl: true,
        hasGuide: true,
        isFeatured: true,
        difficultyLevel: true,
        learningPath: true,
        prerequisites: true,

        // ENHANCED FIELDS - These were missing!
        examCode: true,
        validityYears: true,
        examFormat: true,
        examDuration: true,
        passingScore: true,
        retakePolicy: true,
        passRate: true,
        averageScore: true,
        retakeRate: true,
        keySkills: true,
        careerOutcomes: true,
        targetAudience: true,
        industryFocus: true,
        prerequisiteCerts: true,
        complementaryCerts: true,
        nextCerts: true,

        // Relations
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
            color: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            slug: true,
            website: true,
          },
        },
      },
    });

    return certification;
  } catch (error) {
    console.error("Error fetching certification:", error);
    return null;
  }
}

// Helper function to build learning path context
async function buildLearningPathContext(certification: any) {
  if (!certification.prerequisiteCerts && !certification.nextCerts) {
    return null;
  }

  try {
    // Get all prerequisite certifications
    const prerequisites =
      certification.prerequisiteCerts &&
      certification.prerequisiteCerts.length > 0
        ? await prisma.certification.findMany({
            where: { slug: { in: certification.prerequisiteCerts } },
            select: { slug: true, title: true },
          })
        : [];

    // Get all next certifications
    const nextCerts =
      certification.nextCerts && certification.nextCerts.length > 0
        ? await prisma.certification.findMany({
            where: { slug: { in: certification.nextCerts } },
            select: { slug: true, title: true },
          })
        : [];

    // Build complete learning path
    const completePath = [
      ...prerequisites.map((cert) => ({ ...cert, status: "prerequisite" })),
      {
        slug: certification.slug,
        title: certification.title,
        status: "current",
      },
      ...nextCerts.map((cert) => ({ ...cert, status: "next" })),
    ];

    const currentIndex = prerequisites.length;
    const totalCertifications = completePath.length;

    // Determine context window (±2 around current, minimum 5 total)
    const contextStart = Math.max(0, currentIndex - 2);
    const contextEnd = Math.min(totalCertifications, currentIndex + 3);
    const contextPath = completePath.slice(contextStart, contextEnd);

    return {
      completePath,
      contextPath,
      currentIndex,
      totalCertifications,
      showExpansion: totalCertifications > 5,
    };
  } catch (error) {
    console.error("Error building learning path:", error);
    return null;
  }
}

interface CertificationPageProps {
  params: { slug: string };
}

export default async function CertificationPage({
  params,
}: CertificationPageProps) {
  const { slug } = await params;
  const certification = await getCertification(slug);

  if (!certification) {
    notFound();
  }

  // Build learning path context
  const learningPath = await buildLearningPathContext(certification);

  const hasFullGuide = certification.hasGuide;
  const isOfficialCertification = [
    "aws",
    "google",
    "microsoft",
    "cisco",
    "adobe",
  ].includes(certification.provider.slug);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
    >
      {/* Header */}
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
              href="/certifications"
              className="hover:text-blue-600 transition-colors"
            >
              Certifications
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">
              {certification.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Certification Type Badge */}
              <div className="mb-4">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    isOfficialCertification
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {isOfficialCertification
                    ? "🏆 Official Certification"
                    : "🎓 Professional Certificate"}
                  <span className="text-2xl">
                    {certification.category.icon}
                  </span>
                </span>
              </div>

              <h1
                className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4"
                style={{
                  fontFamily: "Work Sans, system-ui, sans-serif",
                  fontWeight: 700,
                }}
              >
                {certification.title}
              </h1>

              <p className="text-lg lg:text-xl text-slate-600 mb-6 leading-relaxed">
                {certification.description}
              </p>

              {/* Difficulty Level */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-slate-700">
                  Difficulty Level:
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {certification.experienceLevel}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          level <= (certification.difficultyLevel || 1)
                            ? "bg-blue-600"
                            : "bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-sm text-slate-500 mb-1">Cost</p>
                  <p className="text-lg font-bold text-slate-900">
                    {certification.price === 0
                      ? "Free"
                      : `$${certification.price.toLocaleString()}`}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-slate-500 mb-1">
                    Salary Increase (est.)
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    +${certification.salaryIncrease.toLocaleString()}/yr
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-sm text-slate-500 mb-1">Study Time</p>
                  <p className="text-lg font-bold text-slate-900">
                    {certification.studyTimeHours}h
                  </p>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href={certification.enrollUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
                >
                  Start Learning Today
                  <ExternalLink size={20} />
                </a>

                {/* Secondary CTA - Always goes to study guide */}
                <a
                  href="#overview"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <BookOpen size={20} />
                  View Study Guide
                </a>
              </div>
            </div>

            {/* Sidebar - Enhanced Quick Facts */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Quick Facts
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600">
                      Provider
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {certification.provider.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600">
                      Category
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {certification.category.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600">
                      Experience Level
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {certification.experienceLevel}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-600">
                      Demand Level
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {certification.demandLevel}
                    </span>
                  </div>

                  {/* Enhanced fields - show if available */}
                  {certification.examCode && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-600">
                        Exam Code
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {certification.examCode}
                      </span>
                    </div>
                  )}

                  {certification.validityYears && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-600">
                        Validity
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {certification.validityYears} years
                      </span>
                    </div>
                  )}

                  {certification.examFormat && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-600">
                        Format
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {certification.examFormat}
                      </span>
                    </div>
                  )}

                  {certification.examDuration && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-600">
                        Duration
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {certification.examDuration} min
                      </span>
                    </div>
                  )}

                  {certification.passingScore && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-600">
                        Passing Score
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {certification.passingScore}
                      </span>
                    </div>
                  )}

                  {/* ENHANCED FIELDS - ADD THESE MISSING ONES */}

                  {certification.passRate && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-600">
                        Pass Rate
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {certification.passRate}%
                      </span>
                    </div>
                  )}

                  {certification.averageScore && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-600">
                        Average Score
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {certification.averageScore}
                      </span>
                    </div>
                  )}

                  {certification.retakeRate && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-600">
                        Retake Rate
                      </span>
                      <span className="text-sm font-bold text-amber-600">
                        {certification.retakeRate}%
                      </span>
                    </div>
                  )}

                  {/* Show placeholder only if no enhanced fields are available */}

                  {!certification.examCode &&
                    !certification.validityYears &&
                    !certification.examFormat && (
                      <div className="bg-slate-50 p-3 rounded-lg text-center">
                        <p className="text-xs text-slate-500">
                          Additional details being added
                        </p>
                        <p className="text-xs text-slate-400">
                          (Exam code, validity, format, etc.)
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Use CSS Grid with custom order for mobile */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12 order-1 lg:order-1">
              {/* Overview Section */}
              <section
                id="overview"
                className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
              >
                <h2
                  className="text-2xl font-bold text-slate-900 mb-6"
                  style={{
                    fontFamily: "Work Sans, system-ui, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Why Get {certification.title} Certified?
                </h2>

                {hasFullGuide ? (
                  <div className="space-y-4">
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {certification.description}
                    </p>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-3">
                        This certification includes a detailed guide:
                      </h4>
                      <p className="text-slate-700">
                        We have comprehensive study materials, career insights,
                        and expert guidance available for this certification.
                        Detailed content integration coming soon.
                      </p>
                    </div>

                    {certification.keySkills &&
                      certification.keySkills.length > 0 && (
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-slate-900 mb-3">
                            Key Skills You'll Learn:
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {certification.keySkills.map((skill, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-slate-700"
                              >
                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    {certification.careerOutcomes &&
                      certification.careerOutcomes.length > 0 && (
                        <div className="bg-green-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-green-600" />
                            Career Opportunities:
                          </h4>
                          <ul className="space-y-2">
                            {certification.careerOutcomes.map(
                              (outcome, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2 text-slate-700"
                                >
                                  <Award className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  {outcome}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {certification.description}
                    </p>

                    {certification.keySkills &&
                      certification.keySkills.length > 0 && (
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-slate-900 mb-3">
                            Key Skills You'll Learn:
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {certification.keySkills.map((skill, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-slate-700"
                              >
                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {certification.careerOutcomes &&
                      certification.careerOutcomes.length > 0 && (
                        <div className="bg-green-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-green-600" />
                            Career Opportunities:
                          </h4>
                          <ul className="space-y-2">
                            {certification.careerOutcomes.map(
                              (outcome, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2 text-slate-700"
                                >
                                  <Award className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  {outcome}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                )}
              </section>

              {/* Study Resources Section - Amazon Affiliate Integration */}
              <StudyResources
                certificationSlug={certification.slug}
                certificationTitle={certification.title}
              />

              {/* Target Audience Section */}
              {certification.targetAudience &&
                certification.targetAudience.length > 0 && (
                  <section className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                    <h3
                      className="text-xl font-bold text-slate-900 mb-6"
                      style={{
                        fontFamily: "Work Sans, system-ui, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      🎯 Who Should Take This Certification
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {certification.targetAudience.map(
                        (audience: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                          >
                            {audience}
                          </span>
                        )
                      )}
                    </div>
                  </section>
                )}

              {/* Industry Focus Section */}
              {certification.industryFocus &&
                certification.industryFocus.length > 0 && (
                  <section className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                    <h3
                      className="text-xl font-bold text-slate-900 mb-6"
                      style={{
                        fontFamily: "Work Sans, system-ui, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      🏢 Industries That Value This Certification
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {certification.industryFocus.map(
                        (industry: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 text-sm font-medium rounded-full"
                          >
                            {industry}
                          </span>
                        )
                      )}
                    </div>
                  </section>
                )}

              {/* Learning Path Section */}
              {certification.learningPath && (
                <section className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                  <h3
                    className="text-xl font-bold text-slate-900 mb-6"
                    style={{
                      fontFamily: "Work Sans, system-ui, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    📚 Recommended Learning Path
                  </h3>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100">
                    <p className="text-sm text-slate-600 mb-3">
                      Continue your certification journey with these related
                      certifications:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {certification.learningPath
                        .split(",")
                        .map((cert: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-md"
                          >
                            {cert.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Certification vs Course Clarity */}
              <section className="bg-amber-50 border border-amber-200 rounded-xl p-8 order-3 lg:order-2">
                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Important: What You're Getting
                </h3>
                {isOfficialCertification ? (
                  <div className="space-y-3">
                    <p className="text-amber-800">
                      <strong>This is an official certification</strong> from{" "}
                      {certification.provider.name}. Upon completion, you'll
                      receive an industry-recognized credential that validates
                      your expertise.
                    </p>
                    <p className="text-amber-700">
                      The cost shown (
                      {certification.price === 0
                        ? "Free"
                        : `$${certification.price}`}
                      ) is for the official certification exam/program.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-amber-800">
                      <strong>
                        This is a professional certificate program
                      </strong>
                      , not a vendor certification. You'll receive a completion
                      certificate that demonstrates your skills in this area.
                    </p>
                    <p className="text-amber-700">
                      If you're looking for official vendor certifications (like
                      AWS, Microsoft, etc.), check our{" "}
                      <Link
                        href="/certifications"
                        className="underline font-medium"
                      >
                        official certifications section
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </section>

              {/* Next Steps */}
              <section className="bg-slate-900 rounded-xl p-8 text-white order-4 lg:order-3">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{
                    fontFamily: "Work Sans, system-ui, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Ready to Advance Your Career?
                </h2>
                <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                  Take the next step toward {certification.title} certification
                  and unlock new career opportunities with an estimated $
                  {certification.salaryIncrease.toLocaleString()} annual salary
                  increase.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={certification.enrollUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    Get Started Today
                    <ExternalLink size={20} />
                  </a>
                  <Link
                    href="/certifications"
                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-colors text-center"
                  >
                    Explore More Certifications
                  </Link>
                </div>
              </section>
            </div>

            {/* Right Sidebar - Appears between Overview and Clarity sections on mobile */}
            <div className="lg:col-span-1 space-y-6 order-2 lg:order-2">
              {/* Study Statistics */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Study Statistics
                </h3>

                {certification.passRate ||
                certification.averageScore ||
                certification.retakeRate ? (
                  <div className="space-y-4">
                    {certification.passRate && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          Pass Rate
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          {certification.passRate}%
                        </span>
                      </div>
                    )}
                    {certification.averageScore && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          Average Score
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {certification.averageScore}
                        </span>
                      </div>
                    )}
                    {certification.retakeRate && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          Retake Rate
                        </span>
                        <span className="text-sm font-bold text-amber-600">
                          {certification.retakeRate}%
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-slate-500">
                      Study statistics coming soon
                    </p>
                    <p className="text-xs text-slate-400">
                      (Pass rate, average scores, etc.)
                    </p>
                  </div>
                )}
              </div>

              {/* Learning Path */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  Learning Path
                </h3>

                {learningPath ? (
                  <div className="space-y-4">
                    {/* Progress Indicator */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[
                            ...Array(
                              Math.min(7, learningPath.totalCertifications)
                            ),
                          ].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm mr-1 ${
                                i === learningPath.currentIndex
                                  ? "bg-blue-600"
                                  : i < learningPath.currentIndex
                                  ? "bg-blue-300"
                                  : "bg-slate-300"
                              }`}
                            />
                          ))}
                          {learningPath.totalCertifications > 7 && (
                            <span className="text-xs text-slate-500 ml-1">
                              ...
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-600">
                          Position {learningPath.currentIndex + 1} of{" "}
                          {learningPath.totalCertifications}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {certification.provider.name} Learning Path -{" "}
                        {certification.experienceLevel} Level
                      </p>
                    </div>

                    {/* Learning Path Context */}
                    <div className="space-y-2">
                      {learningPath.contextPath.map((cert, index) => (
                        <div
                          key={cert.slug}
                          className="flex items-center justify-between py-2 border-b border-slate-100"
                        >
                          {cert.status === "prerequisite" ? (
                            <>
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                <Link
                                  href={`/certifications/${cert.slug}`}
                                  className="text-sm text-amber-700 hover:text-amber-800 hover:underline"
                                >
                                  {cert.title}
                                </Link>
                              </div>
                              <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded font-medium">
                                Prerequisite
                              </span>
                            </>
                          ) : cert.status === "current" ? (
                            <>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
                                  <span className="text-white text-xs">📍</span>
                                </div>
                                <span className="text-sm font-semibold text-blue-700">
                                  {cert.title}
                                </span>
                              </div>
                              <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded font-medium">
                                Current
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <Link
                                  href={`/certifications/${cert.slug}`}
                                  className="text-sm text-green-700 hover:text-green-800 hover:underline"
                                >
                                  {cert.title}
                                </Link>
                              </div>
                              <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded font-medium">
                                Next
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Expansion Link for Long Paths */}
                    {learningPath.showExpansion &&
                      learningPath.contextPath.length <
                        learningPath.totalCertifications && (
                        <div className="pt-3 border-t border-slate-200">
                          <button
                            className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                            onClick={() => {
                              alert(
                                "Full path expansion - implement with React state management"
                              );
                            }}
                          >
                            {learningPath.contextPath.length} of{" "}
                            {learningPath.totalCertifications} shown • View
                            complete learning path
                          </button>
                        </div>
                      )}
                  </div>
                ) : certification.prerequisiteCerts &&
                  certification.prerequisiteCerts.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                      📋 Required Certifications:
                    </h4>
                    {certification.prerequisiteCerts.map((certSlug, index) => (
                      <Link
                        key={index}
                        href={`/certifications/${certSlug}`}
                        className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-700 capitalize">
                            {certSlug.replace(/-/g, " ")} Certification
                          </span>
                          <ExternalLink className="w-4 h-4 text-blue-500" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        No Prerequisites Required
                      </span>
                    </div>
                    <p className="text-xs text-green-600">
                      This is an entry-level certification - perfect for
                      beginners!
                    </p>
                  </div>
                )}
              </div>

              {/* Complementary Certifications - Only show if data exists */}
              {certification.complementaryCerts &&
                certification.complementaryCerts.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Complementary Certifications
                  </h3>

                  <div className="space-y-2">
                    {certification.complementaryCerts.map((certSlug, index) => (
                      <Link
                        key={index}
                        href={`/certifications/${certSlug}`}
                        className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <span className="text-sm font-medium text-green-700">
                          Explore Related →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}


              {/* Sticky Ad Container - Hidden for now */}
              <div
                className="ad-container sidebar-bottom sticky top-8"
                style={{ display: "none" }}
              >
                <div className="text-xs text-slate-400 text-center mb-2">
                  Advertisement
                </div>
                <div className="bg-slate-100 h-96 rounded-lg flex items-center justify-center">
                  <span className="text-slate-400">Google Ads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Ad - Hidden for now */}
      <div
        className="ad-container footer-ad px-4 sm:px-6 lg:px-8 py-8"
        style={{ display: "none" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-slate-400 text-center mb-2">
            Advertisement
          </div>
          <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center">
            <span className="text-slate-400">Google Ads</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
