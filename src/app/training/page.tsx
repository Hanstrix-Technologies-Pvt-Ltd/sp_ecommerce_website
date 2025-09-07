"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function TrainingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const trainingPrograms = [
    {
      name: "Basic Operations Training",
      duration: "3 Days",
      level: "Beginner",
      description:
        "Learn fundamental operations and safety protocols for parking systems",
      topics: [
        "System overview and components",
        "Basic operation procedures",
        "Safety protocols and emergency procedures",
        "Daily maintenance checks",
      ],
    },
    {
      name: "Advanced Maintenance Training",
      duration: "5 Days",
      level: "Intermediate",
      description:
        "Comprehensive training for maintenance technicians and engineers",
      topics: [
        "Advanced troubleshooting techniques",
        "Preventive maintenance procedures",
        "Component replacement and repair",
        "System diagnostics and testing",
      ],
    },
    {
      name: "System Administration Training",
      duration: "7 Days",
      level: "Advanced",
      description: "Complete training for system administrators and managers",
      topics: [
        "System configuration and optimization",
        "Performance monitoring and analytics",
        "User management and access control",
        "Integration with building management systems",
      ],
    },
  ];

  const upcomingSessions = [
    {
      date: "15-17 Dec 2024",
      program: "Basic Operations Training",
      location: "Mumbai",
      seats: "8/12",
    },
    {
      date: "20-24 Dec 2024",
      program: "Advanced Maintenance Training",
      location: "Delhi",
      seats: "5/10",
    },
    {
      date: "27-31 Dec 2024",
      program: "System Administration Training",
      location: "Bangalore",
      seats: "3/8",
    },
  ];

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="Training" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">TRAINING</h1>
            </div>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Professional Training Programs
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Equip your team with the knowledge and skills needed to operate
                and maintain parking systems effectively. Our comprehensive
                training programs are designed by industry experts with hands-on
                experience in automated parking solutions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From basic operations to advanced system administration, our
                training courses ensure your staff can maximize system
                performance, minimize downtime, and provide excellent service to
                your customers.
              </p>
            </div>
          </div>

          {/* Training Programs */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Training Programs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {trainingPrograms.map((program, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="bg-blue-600 text-white p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{program.name}</h3>
                      <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                        {program.level}
                      </span>
                    </div>
                    <div className="text-blue-100 mb-4">{program.duration}</div>
                    <p className="text-blue-100 text-sm">
                      {program.description}
                    </p>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Topics Covered:
                    </h4>
                    <ul className="space-y-2">
                      {program.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start">
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
                          <span className="text-gray-700 text-sm">{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-blue-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Upcoming Training Sessions
              </h2>
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {session.program}
                        </h3>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {session.date}
                          </span>
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
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
                            {session.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          Seats: {session.seats}
                        </span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-300">
                          Book Seat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training Benefits */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Training Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Certified Training
                    </h3>
                    <p className="text-gray-600">
                      Receive industry-recognized certificates upon completion
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Expert Instructors
                    </h3>
                    <p className="text-gray-600">
                      Learn from experienced professionals with hands-on
                      expertise
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Hands-on Practice
                    </h3>
                    <p className="text-gray-600">
                      Practical training on real parking systems
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Comprehensive Materials
                    </h3>
                    <p className="text-gray-600">
                      Detailed manuals and reference materials provided
                    </p>
                  </div>
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
