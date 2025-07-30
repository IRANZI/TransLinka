import React from "react";

const steps = [
  {
    number: "1",
    circleColor: "bg-blue-500",
    title: "Social Features",
    description: "Enter your destination and find the best routes. Book your ticket instantly with secure payment"
  },
  {
    number: "2", 
    circleColor: "bg-green-500",
    title: "Track & Navigate",
    description: "Use real-time and AR navigation to find your bus. Never miss your ride again"
  },
  {
    number: "3",
    circleColor: "bg-blue-600", 
    title: "Travel & Enjoy",
    description: "Relax and enjoy your journey. Rate your experience and help improve the service for everyone"
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 px-6 font-sans">
      <div className="max-w-full mx-auto text-center px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
          How It Works
        </h2>
        <p className="text-gray-600 mb-16 text-xl max-w-3xl mx-auto leading-relaxed font-sans">
          Getting Started with TransLinka is simple and intuitive
        </p>

        {/* Three Steps */}
        <div className="grid gap-12 grid-cols-1 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Numbered Circle */}
              <div className={`w-32 h-32 ${step.circleColor} rounded-full flex items-center justify-center mb-8 shadow-lg`}>
  <span className="text-white font-bold text-4xl">{step.number}</span>
</div>

              {/* Title */}
              <h3 className="font-heading font-bold text-gray-900 mb-4 text-xl md:text-2xl">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm font-sans">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
