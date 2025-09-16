"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  BarChart3,
  Monitor,
  Award,
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  FileText,
} from "lucide-react";
import MobileHeader from "../../MobileHeader";
import Footer from "../../components/Footer";
import NewsletterSignup from "../../components/NewsletterSignup";

const businessSkills = {
  title: "Business & Digital Skills Pathway",
  description: "Develop essential workplace skills for any career path",
  icon: Briefcase,
  color: "from-purple-500 to-pink-600",
  bgColor: "bg-purple-50",
  borderColor: "border-purple-200",
  textColor: "text-purple-700",
  minAge: 14,
  benefits: [
    "Essential skills for any office environment",
    "Build digital literacy and productivity",
    "Prepare for business and marketing roles",
    "Learn data analysis fundamentals",
    "Develop professional communication skills"
  ],
  pathwaySteps: [
    {
      step: 1,
      title: "Office Productivity",
      description: "Master Microsoft Office Suite for professional work",
      certs: ["Microsoft Office Specialist"],
      outcomes: ["Office assistant roles", "Administrative positions", "Document creation skills"]
    },
    {
      step: 2,
      title: "Digital Analytics", 
      description: "Learn web analytics with Google Analytics",
      certs: ["Google Analytics Individual Qualification"],
      outcomes: ["Marketing insights", "Data analysis skills", "Digital marketing foundation"]
    },
    {
      step: 3,
      title: "Marketing Skills",
      description: "Expand into digital marketing specializations",
      certs: ["Google Ads", "HubSpot Content Marketing"],
      outcomes: ["Marketing internships", "Social media roles", "Content creation"]
    }
  ]
};

export default function BusinessSkillsPage() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/certifications-enhanced?isHighSchoolReady=true")
      .then((res) => res.json())
      .then((data) => {
        setCertifications(data.certifications || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching business skills certifications:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50"
      style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
    >
      {/* Header */}
      <MobileHeader />

      {/* Breadcrumb */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Student Pathways
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Briefcase className="w-4 h-4" />
              Business & Digital Skills Pathway
            </div>
            
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-4xl mx-auto"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              {businessSkills.title}
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {businessSkills.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/certifications?isHighSchoolReady=true"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
              >
                <Award className="w-5 h-5" />
                View All Student Certifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway Benefits */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Business & Digital Skills?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These foundational skills are valuable in virtually every industry and career path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessSkills.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathway Steps */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Business Skills Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Build from office fundamentals to digital marketing and analytics expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {businessSkills.pathwaySteps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                </div>
                <p className="text-slate-600 mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {step.certs.map((cert, certIndex) => (
                    <span
                      key={certIndex}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <div className="space-y-2">
                  {step.outcomes.map((outcome, outcomeIndex) => (
                    <div key={outcomeIndex} className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Certifications */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Available Certifications
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These certifications complement any career path and are especially valuable for business roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.slice(0, 6).map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{cert.category.icon}</div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {cert.category.name}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{cert.title}</h3>
                <p className="text-slate-600 mb-2 font-medium">{cert.provider.name}</p>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{cert.shortDescription}</p>

                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="w-4 h-4 text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500 mb-1">Study Time</p>
                    <p className="font-semibold text-slate-900 text-sm">{cert.studyTimeHours}h</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500 mb-1">Min. Age</p>
                    <p className="font-semibold text-slate-900 text-sm">{cert.minimumAge || 14}+</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={cert.enrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors text-center"
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
          </div>

          <div className="text-center mt-12">
            <Link
              href="/certifications?isHighSchoolReady=true"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              View All Student Certifications
              <Award className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Suspense fallback={<div>Loading...</div>}>
        <NewsletterSignup />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}