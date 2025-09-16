"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Award,
  ArrowLeft,
  CheckCircle,
  Clock,
  Star,
  Globe,
  Users,
  Target,
} from "lucide-react";
import MobileHeader from "../../MobileHeader";
import Footer from "../../components/Footer";
import NewsletterSignup from "../../components/NewsletterSignup";

const collegePrep = {
  title: "College Preparation Pathway",
  description: "Strengthen your college applications with AP courses and international language certifications",
  icon: GraduationCap,
  color: "from-blue-500 to-purple-600",
  bgColor: "bg-blue-50",
  borderColor: "border-blue-200",
  textColor: "text-blue-700",
  minAge: 14,
  benefits: [
    "Earn college credit before graduation",
    "Stand out in competitive admissions",
    "Demonstrate academic readiness",
    "Access international programs",
    "Build advanced academic skills"
  ],
  pathwaySteps: [
    {
      step: 1,
      title: "Start with Core Subjects",
      description: "Begin with AP Computer Science A or AP Seminar",
      certs: ["AP Computer Science A", "AP Seminar"]
    },
    {
      step: 2,
      title: "Add Language Proficiency", 
      description: "Choose a language certification that interests you",
      certs: ["DELF French B1", "DELE Spanish B1", "HSK Level 3"]
    },
    {
      step: 3,
      title: "Complete Advanced Work",
      description: "Finish with AP Research or higher language levels",
      certs: ["AP Research", "DELF French B2", "HSK Level 4"]
    }
  ]
};

export default function CollegePrepPage() {
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
        console.error("Error fetching college prep certifications:", error);
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

      {/* Breadcrumb */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
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
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <GraduationCap className="w-4 h-4" />
              College Preparation Pathway
            </div>
            
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-4xl mx-auto"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              {collegePrep.title}
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {collegePrep.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/certifications?pathway=college-prep&isHighSchoolReady=true"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                <Award className="w-5 h-5" />
                View All Certifications
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
              Why Choose College Prep Certifications?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These certifications demonstrate academic excellence and readiness for higher education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collegePrep.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
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
              Your College Prep Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Follow this suggested pathway to build a strong academic portfolio for college admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {collegePrep.pathwaySteps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                </div>
                <p className="text-slate-600 mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.certs.map((cert, certIndex) => (
                    <span
                      key={certIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {cert}
                    </span>
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
              Start with any certification that interests you - they all contribute to your college readiness.
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
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
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
          </div>

          <div className="text-center mt-12">
            <Link
              href="/certifications?isHighSchoolReady=true"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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