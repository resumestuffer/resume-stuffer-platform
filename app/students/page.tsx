"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Target,
  Briefcase,
  Building,
  Hammer,
  Globe,
  Computer,
  Shield,
} from "lucide-react";
import MobileHeader from "../MobileHeader";
import Footer from "../components/Footer";
import NewsletterSignup from "../components/NewsletterSignup";

// Student pathway data
const studentPathways = [
  {
    id: "college-prep",
    title: "College Preparation",
    description: "Boost college applications with AP courses and language certifications",
    icon: GraduationCap,
    color: "from-blue-500 to-purple-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    certifications: ["AP Computer Science A", "AP Seminar & Research", "DELF French", "DELE Spanish", "HSK Chinese"],
    outcomes: ["College credit", "Advanced placement", "International programs", "Academic recognition"],
    timeCommitment: "Varies by certification",
    minAge: 14,
    link: "/students/college-prep"
  },
  {
    id: "tech-careers",
    title: "Technology Careers",
    description: "Start your IT journey with industry-recognized CompTIA certifications",
    icon: Computer,
    color: "from-green-500 to-teal-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    certifications: ["CompTIA ITF+", "CompTIA A+", "CompTIA Network+", "CompTIA Security+"],
    outcomes: ["IT Support roles", "Help Desk positions", "Network technician", "Entry cybersecurity"],
    timeCommitment: "Varies by certification",
    minAge: 16,
    link: "/students/tech-careers"
  },
  {
    id: "skilled-trades",
    title: "Skilled Trades",
    description: "Enter high-demand trades with safety and welding certifications",
    icon: Hammer,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    certifications: ["OSHA 10-Hour", "OSHA 30-Hour", "AWS Entry Level Welder", "AWS Certified Welder"],
    outcomes: ["Construction jobs", "Welding positions", "Safety coordinator", "Trade apprenticeships"],
    timeCommitment: "Varies by certification",
    minAge: 16,
    link: "/students/skilled-trades"
  },
  {
    id: "business-skills",
    title: "Business & Digital Skills",
    description: "Develop essential workplace skills for any career path",
    icon: Briefcase,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    certifications: ["Microsoft Office Specialist", "Google Analytics", "Digital Marketing"],
    outcomes: ["Office assistant", "Administrative roles", "Marketing intern", "Business support"],
    timeCommitment: "Varies by certification",
    minAge: 14,
    link: "/students/business-skills"
  }
];

const benefits = [
  {
    icon: Target,
    title: "Age-Appropriate Certifications",
    description: "Carefully selected certifications that high school students can realistically achieve"
  },
  {
    icon: DollarSign,
    title: "Career Advancement",
    description: "Industry-recognized credentials that enhance your resume and job prospects"
  },
  {
    icon: Clock,
    title: "Flexible Study Time",
    description: "Study programs designed to fit around school schedules and commitments"
  },
  {
    icon: BookOpen,
    title: "Complete Study Resources",
    description: "Curated study materials, practice tests, and prep guides for every certification"
  },
  {
    icon: CheckCircle,
    title: "Clear Progression Paths",
    description: "Step-by-step pathways from beginner to professional-level certifications"
  },
  {
    icon: Users,
    title: "Student Success Support",
    description: "Resources specifically designed for high school and college-bound students"
  }
];

const successStats = [
  { label: "Student Certifications", value: "20+", description: "Carefully curated for high school students" },
  { label: "Average Salary Boost", value: "$35K", description: "For entry-level positions" },
  { label: "Completion Time", value: "2-18mo", description: "Depending on pathway" },
  { label: "Success Rate", value: "78%", description: "Average pass rate for student certs" }
];

export default function StudentsPage() {
  const [studentStats, setStudentStats] = useState({
    totalCertifications: 20,
    averageSalaryIncrease: 35000,
    pathways: 4,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading student stats
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <GraduationCap className="w-4 h-4" />
              High School & College Students
            </div>
            
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-4xl mx-auto"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Launch Your Career with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Student Certifications
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Whether you're college-bound, trade school focused, or ready to start working, our student certification pathways 
              give you a competitive edge and real opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pathways"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Explore Pathways
              </Link>
              <Link
                href="/certifications?isHighSchoolReady=true"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Award className="w-5 h-5" />
                View All Student Certs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-slate-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-slate-500">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways Section */}
      <section id="pathways" className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Choose Your Pathway
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Each pathway is designed for different post-graduation goals. Pick the one that matches your interests and career plans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {studentPathways.map((pathway) => {
              const IconComponent = pathway.icon;
              return (
                <Link
                  key={pathway.id}
                  href={pathway.link}
                  className={`${pathway.bgColor} ${pathway.borderColor} border-2 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${pathway.color} text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {pathway.title}
                      </h3>
                      <p className="text-slate-600">
                        {pathway.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">
                        Key Certifications:
                      </div>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {pathway.certifications.slice(0, 3).map((cert, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            {cert}
                          </li>
                        ))}
                        {pathway.certifications.length > 3 && (
                          <li className="text-xs text-slate-500">
                            +{pathway.certifications.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">
                        Career Outcomes:
                      </div>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {pathway.outcomes.slice(0, 3).map((outcome, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <TrendingUp className="w-3 h-3 text-blue-500 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-slate-500">Time Commitment</div>
                      <div className="font-semibold text-slate-700">
                        {pathway.timeCommitment}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Min. Age</div>
                      <div className="font-semibold text-slate-700">
                        {pathway.minAge}+
                      </div>
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-2 ${pathway.textColor} font-semibold group-hover:gap-3 transition-all`}>
                    Explore {pathway.title}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Why Start Early?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Getting certified while in high school gives you a significant advantage in college applications, 
              job searches, and career advancement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{
              fontFamily: "Work Sans, system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse all student-friendly certifications and find the perfect pathway for your career goals.
          </p>
          <div className="flex justify-center">
            <Link
              href="/certifications?isHighSchoolReady=true"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              <Award className="w-5 h-5" />
              Browse Student Certifications
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Suspense
        fallback={
          <div className="py-16 bg-slate-100">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-pulse bg-slate-200 h-8 w-64 mx-auto mb-4 rounded"></div>
              <div className="animate-pulse bg-slate-200 h-4 w-96 mx-auto mb-8 rounded"></div>
            </div>
          </div>
        }
      >
        <NewsletterSignup />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}