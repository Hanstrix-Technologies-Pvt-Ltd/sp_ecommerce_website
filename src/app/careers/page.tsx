"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function CareersPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const jobOpenings = [
    {
      title: "Senior Mechanical Engineer",
      department: "Engineering",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      experience: "5-8 years",
      description:
        "Design and develop mechanical components for parking systems",
      requirements: [
        "B.Tech/B.E. in Mechanical Engineering",
        "Experience in CAD software (SolidWorks/AutoCAD)",
        "Knowledge of hydraulic systems",
        "Project management skills",
      ],
    },
    {
      title: "Software Developer",
      department: "IT",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      experience: "3-5 years",
      description: "Develop parking management software and control systems",
      requirements: [
        "B.Tech/B.E. in Computer Science",
        "Experience in C++, Python, or Java",
        "Knowledge of embedded systems",
        "Database management skills",
      ],
    },
    {
      title: "Sales Executive",
      department: "Sales & Marketing",
      location: "Delhi, NCR",
      type: "Full-time",
      experience: "2-4 years",
      description: "Generate leads and manage client relationships",
      requirements: [
        "MBA in Marketing or related field",
        "Experience in B2B sales",
        "Excellent communication skills",
        "Technical aptitude",
      ],
    },
    {
      title: "Service Engineer",
      department: "Service & Support",
      location: "Pune, Maharashtra",
      type: "Full-time",
      experience: "3-6 years",
      description: "Install, maintain, and repair parking systems",
      requirements: [
        "Diploma/B.Tech in Mechanical/Electrical",
        "Experience in field service",
        "Troubleshooting skills",
        "Willingness to travel",
      ],
    },
  ];

  const benefits = [
    {
      title: "Competitive Salary",
      description: "Attractive compensation packages with performance bonuses",
      icon: "💰",
    },
    {
      title: "Health Insurance",
      description: "Comprehensive health coverage for employees and family",
      icon: "🏥",
    },
    {
      title: "Professional Growth",
      description: "Continuous learning and career development opportunities",
      icon: "📈",
    },
    {
      title: "Work-Life Balance",
      description: "Flexible working hours and paid time off",
      icon: "⚖️",
    },
  ];

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="Careers" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">CAREERS</h1>
            </div>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Join Our Team
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Stelz, we believe in fostering a culture of innovation,
                excellence, and continuous learning. We are always looking for
                talented individuals who are passionate about technology and
                committed to making a difference in the parking industry.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Join our dynamic team and be part of India's leading parking
                system manufacturer. We offer exciting career opportunities,
                competitive benefits, and a supportive work environment where
                you can grow and thrive.
              </p>
            </div>
          </div>

          {/* Current Openings */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Current Job Openings
            </h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                >
                  <div className="bg-blue-600 text-white p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <p className="text-blue-100">{job.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <span className="text-gray-600 text-sm">
                          Department:
                        </span>
                        <div className="font-semibold text-gray-800">
                          {job.department}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Location:</span>
                        <div className="font-semibold text-gray-800">
                          {job.location}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Type:</span>
                        <div className="font-semibold text-gray-800">
                          {job.type}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">
                          Experience:
                        </span>
                        <div className="font-semibold text-gray-800">
                          {job.experience}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Requirements:
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((requirement, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <svg
                              className="w-4 h-4 text-blue-600 mr-3 mt-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-gray-700 text-sm">
                              {requirement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employee Benefits */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-blue-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Employee Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-3xl mr-4">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Application Process
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Apply Online
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Submit your resume and cover letter through our portal
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Screening
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Our HR team reviews your application
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Interview
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Technical and HR interview rounds
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    4
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Onboarding
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Welcome to the Stelz family!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Get in Touch
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Human Resources Team
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-700">careers@Stelz.com</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-gray-700">+91 22 1234 5678</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Mumbai, Maharashtra, India
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Application Requirements
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Updated resume/CV</li>
                    <li>• Cover letter</li>
                    <li>• Educational certificates</li>
                    <li>• Experience certificates</li>
                    <li>• Portfolio (if applicable)</li>
                    <li>• References</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">
                  <span className="text-blue-600">Stelz</span>{" "}
                  <span className="text-black">CAR PARKING SYSTEMS</span>
                </h3>
              </div>
              <div className="text-sm text-gray-500 text-center">
                Copyrights 2020 | Privacy Policy | All Rights Reserved.
                <br />
                ISO-9001:2008 Certified. Site Credits
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
