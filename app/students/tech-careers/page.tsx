"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  Computer,
  Shield,
  Network,
  Award,
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";
import MobileHeader from "../../MobileHeader";
import Footer from "../../components/Footer";
import NewsletterSignup from "../../components/NewsletterSignup";

const techCareers = {
  title: "Technology Careers Pathway",
  description: "Launch your tech career with programming, cybersecurity, cloud computing, and IT certifications",
  icon: Computer,
  color: "from-green-500 to-teal-600",
  bgColor: "bg-green-50",
  borderColor: "border-green-200",
  textColor: "text-green-700",
  minAge: 14,
  benefits: [
    "Multiple career paths: programming, cybersecurity, cloud, IT",
    "Start with free courses from Google, Harvard, and more",
    "Build practical skills with hands-on projects",
    "Industry-recognized certifications from major companies",
    "Clear progression from beginner to professional level"
  ],
  pathwaySteps: [
    {
      step: 1,
      title: "Choose Your Starting Path",
      description: "Begin with programming fundamentals, IT basics, or computer science",
      certs: ["Harvard CS50", "CompTIA ITF+", "Python PCEP"],
      outcomes: ["Programming basics", "IT literacy", "Problem-solving skills"]
    },
    {
      step: 2,
      title: "Develop Core Skills", 
      description: "Build expertise in your chosen area with intermediate certifications",
      certs: ["CompTIA A+", "Google Cybersecurity", "Python PCAP"],
      outcomes: ["Hands-on experience", "Industry knowledge", "Technical proficiency"]
    },
    {
      step: 3,
      title: "Specialize & Advance",
      description: "Focus on specific tech domains like cloud, security, or development",
      certs: ["AWS Cloud Practitioner", "Meta Front-End Developer", "CompTIA Network+"],
      outcomes: ["Specialized skills", "Advanced certifications", "Career readiness"]
    },
    {
      step: 4,
      title: "Professional Level",
      description: "Achieve professional-grade certifications for career advancement",
      certs: ["CompTIA Security+", "Google IT Automation", "Azure Fundamentals"],
      outcomes: ["Professional roles", "Higher salaries", "Leadership opportunities"]
    }
  ]
};

export default function TechCareersPage() {
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
        console.error("Error fetching tech careers certifications:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50"
      style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
    >
      {/* Header */}
      <MobileHeader />

      {/* Breadcrumb */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
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
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Computer className="w-4 h-4" />
              Technology Careers Pathway
            </div>
            
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-4xl mx-auto"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              {techCareers.title}
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {techCareers.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/certifications?isHighSchoolReady=true"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
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
              Why Choose Technology Career Certifications?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Technology offers diverse, high-paying careers. From programming to cybersecurity to cloud computing, these certifications open doors to the digital economy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techCareers.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
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
              Your Technology Career Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose your path through programming, cybersecurity, cloud computing, or IT infrastructure - all leading to high-demand careers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {techCareers.pathwaySteps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                </div>
                <p className="text-slate-600 mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {step.certs.map((cert, certIndex) => (
                    <span
                      key={certIndex}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <div className="space-y-2">
                  {step.outcomes.map((outcome, outcomeIndex) => (
                    <div key={outcomeIndex} className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
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
              Diverse technology certifications spanning programming, cybersecurity, cloud computing, and IT infrastructure.
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
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
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
                    <p className="font-semibold text-slate-900 text-sm">{cert.minimumAge || 16}+</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={cert.enrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors text-center"
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
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