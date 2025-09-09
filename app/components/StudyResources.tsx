"use client";
import { BookOpen, Star, ExternalLink, ShoppingCart } from "lucide-react";

interface StudyResource {
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  price: string;
  amazonUrl: string;
  description: string;
  highlights: string[];
}

interface StudyResourcesProps {
  certificationSlug: string;
  certificationTitle: string;
}

// Study resources data - would come from database in production
const studyResourcesData: Record<string, StudyResource[]> = {
  "aws-cloud-practitioner": [
    {
      title: "AWS Certified Cloud Practitioner Study Guide",
      author: "Ben Piper, David Clinton",
      rating: 4.5,
      reviewCount: 1247,
      price: "$29.99",
      amazonUrl: "https://amazon.com/dp/1119490707?tag=resumestuffer-20",
      description:
        "Official study guide covering all AWS Cloud Practitioner exam objectives with hands-on exercises and practice tests.",
      highlights: [
        "Official AWS training content",
        "Practice questions with explanations",
        "Hands-on exercises included",
        "Updated for latest exam version",
      ],
    },
    {
      title: "AWS Certified Cloud Practitioner Practice Tests",
      author: "Neal Davis",
      rating: 4.6,
      reviewCount: 892,
      price: "$19.99",
      amazonUrl: "https://amazon.com/dp/1119684927?tag=resumestuffer-20",
      description:
        "1000+ practice questions with detailed explanations to help you pass the AWS Cloud Practitioner exam on your first try.",
      highlights: [
        "1000+ practice questions",
        "Detailed answer explanations",
        "Exam simulation format",
        "Performance tracking",
      ],
    },
  ],
  "comptia-security-plus": [
    {
      title: "CompTIA Security+ Study Guide: Exam SY0-601",
      author: "Mike Chapple, David Seidl",
      rating: 4.4,
      reviewCount: 2156,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1119736250?tag=resumestuffer-20",
      description:
        "Comprehensive study guide for CompTIA Security+ certification with real-world examples and practice questions.",
      highlights: [
        "Complete exam objective coverage",
        "Real-world security scenarios",
        "Practice questions included",
        "Online test bank access",
      ],
    },
    {
      title: "CompTIA Security+ Practice Tests: Exam SY0-601",
      author: "Mike Chapple, David Seidl",
      rating: 4.5,
      reviewCount: 1342,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/1119736277?tag=resumestuffer-20",
      description:
        "1000+ practice questions to master CompTIA Security+ concepts and pass the certification exam.",
      highlights: [
        "1000+ practice questions",
        "Domain-specific testing",
        "Performance-based questions",
        "Detailed explanations",
      ],
    },
  ],
  "pmp-certification": [
    {
      title: "PMP Project Management Professional Exam Study Guide",
      author: "Kim Heldman",
      rating: 4.3,
      reviewCount: 1896,
      price: "$39.99",
      amazonUrl: "https://amazon.com/dp/1119420903?tag=resumestuffer-20",
      description:
        "Complete PMP exam preparation with PMBOK Guide alignment and hands-on exercises.",
      highlights: [
        "PMBOK Guide 7th Edition aligned",
        "Real-world project scenarios",
        "Practice exams included",
        "Agile and hybrid approaches",
      ],
    },
    {
      title: "PMP Exam Prep: Accelerated Learning to Pass PMI's PMP Exam",
      author: "Rita Mulcahy",
      rating: 4.7,
      reviewCount: 3421,
      price: "$49.99",
      amazonUrl: "https://amazon.com/dp/1932735658?tag=resumestuffer-20",
      description:
        "The industry-standard PMP exam preparation book with proven techniques and insider tips.",
      highlights: [
        "Industry-leading prep book",
        "Rita's proven method",
        "Insider exam tips",
        "Process-focused learning",
      ],
    },
  ],
};

export default function StudyResources({
  certificationSlug,
  certificationTitle,
}: StudyResourcesProps) {
  const resources = studyResourcesData[certificationSlug] || [];

  if (resources.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-slate-300"
            }`}
          />
        ))}
        <span className="text-sm text-slate-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <section className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h3
          className="text-2xl font-bold text-slate-900"
          style={{
            fontFamily: "Work Sans, system-ui, sans-serif",
            fontWeight: 700,
          }}
        >
          Recommended Study Resources
        </h3>
      </div>

      <p className="text-slate-600 mb-8">
        These highly-rated study guides and practice tests have helped thousands
        of professionals pass the {certificationTitle} exam. All resources are
        carefully selected based on user reviews, content quality, and exam
        alignment.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
          >
            {/* Resource Header */}
            <div className="mb-4">
              <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                {resource.title}
              </h4>
              <p className="text-slate-600 text-sm mb-2">
                by {resource.author}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-3">
                {renderStars(resource.rating)}
                <span className="text-sm text-slate-500">
                  {resource.reviewCount.toLocaleString()} reviews
                </span>
              </div>
            </div>

            {/* Resource Description */}
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {resource.description}
            </p>

            {/* Highlights */}
            <div className="mb-6">
              <h5 className="text-sm font-semibold text-slate-700 mb-2">
                Key Features:
              </h5>
              <ul className="space-y-1">
                {resource.highlights.slice(0, 3).map((highlight, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-600 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-slate-900">
                {resource.price}
              </div>
              <a
                href={resource.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
                onClick={() => {
                  // Track affiliate click
                  if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "affiliate_click", {
                      event_category: "Amazon Affiliate",
                      event_label: `${certificationSlug}-${resource.title}`,
                      value: parseFloat(resource.price.replace("$", "")),
                    });
                  }
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                View on Amazon
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-500">
          <strong>Affiliate Disclosure:</strong> Resume Stuffer may earn a
          commission from Amazon purchases made through these links at no
          additional cost to you. We only recommend resources we believe will
          help you succeed in your certification journey.
        </p>
      </div>

      {/* Additional Study Tips */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">
          Study Tips for Success
        </h4>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm">
              <strong>Create a schedule:</strong> Dedicate consistent study time
              each day rather than cramming
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm">
              <strong>Practice tests first:</strong> Take a diagnostic exam to
              identify knowledge gaps
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm">
              <strong>Hands-on experience:</strong> Apply concepts in real
              projects or lab environments
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm">
              <strong>Join study groups:</strong> Connect with other candidates
              for support and accountability
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
