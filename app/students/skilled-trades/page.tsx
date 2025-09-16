"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  Hammer,
  Shield,
  Zap,
  Award,
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  HardHat,
} from "lucide-react";
import MobileHeader from "../../MobileHeader";
import Footer from "../../components/Footer";
import NewsletterSignup from "../../components/NewsletterSignup";

const skilledTrades = {
  title: "Skilled Trades Pathway",
  description: "Enter high-demand trades with safety and welding certifications",
  icon: Hammer,
  color: "from-orange-500 to-red-600",
  bgColor: "bg-orange-50",
  borderColor: "border-orange-200",
  textColor: "text-orange-700",
  minAge: 16,
  benefits: [
    "Start working immediately after certification",
    "High demand for skilled trade workers",
    "Hands-on, practical skills development",
    "Clear path to apprenticeships",
    "Essential safety training for any job site"
  ],
  pathwaySteps: [
    {
      step: 1,
      title: "Safety Foundation",
      description: "Start with OSHA 10-Hour to learn workplace safety basics",
      certs: ["OSHA 10-Hour General Industry"],
      outcomes: ["Basic safety knowledge", "Entry-level construction jobs", "Safety awareness"]
    },
    {
      step: 2,
      title: "Advanced Safety", 
      description: "Build on safety knowledge with OSHA 30-Hour certification",
      certs: ["OSHA 30-Hour General Industry"],
      outcomes: ["Safety coordinator roles", "Supervision opportunities", "Advanced safety training"]
    },
    {
      step: 3,
      title: "Welding Fundamentals",
      description: "Learn basic welding with AWS Entry Level Welder certification",
      certs: ["AWS Entry Level Welder"],
      outcomes: ["Basic welding jobs", "Fabrication work", "Welding fundamentals"]
    },
    {
      step: 4,
      title: "Professional Welder",
      description: "Advance to AWS Certified Welder for professional opportunities",
      certs: ["AWS Certified Welder"],
      outcomes: ["Professional welding roles", "Higher pay grades", "Specialized welding work"]
    }
  ]
};

export default function SkilledTradesPage() {
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
        console.error("Error fetching skilled trades certifications:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50"
      style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
    >
      {/* Header */}
      <MobileHeader />

      {/* Breadcrumb */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors"
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
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Hammer className="w-4 h-4" />
              Skilled Trades Pathway
            </div>
            
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-4xl mx-auto"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              {skilledTrades.title}
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {skilledTrades.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/certifications?isHighSchoolReady=true"
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors"
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
              Why Choose Skilled Trades Certifications?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Skilled trades offer stable employment, good pay, and the satisfaction of hands-on work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skilledTrades.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
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
              Your Skilled Trades Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Build from safety fundamentals to specialized trade skills that employers value.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skilledTrades.pathwaySteps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                </div>
                <p className="text-slate-600 mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {step.certs.map((cert, certIndex) => (
                    <span
                      key={certIndex}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <div className="space-y-2">
                  {step.outcomes.map((outcome, outcomeIndex) => (
                    <div key={outcomeIndex} className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-600 flex-shrink-0" />
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
              Safety certifications are required for most job sites, while welding certs open specialized opportunities.
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
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
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
                    className="flex-1 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors text-center"
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
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