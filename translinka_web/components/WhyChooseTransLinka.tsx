import React from "react";

const features = [
  {
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    ),
    title: "Real-Time Tracking",
    description: "Know exactly where your bus is with GPS precision. No more guessing or waiting in uncertainty",
    bgColor: "bg-green-50",
    iconBgColor: "bg-green-100"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
      </svg>
    ),
    title: "AR Navigation",
    description: "Use augmented reality to find your bus n crowded stations. Point and see exactly where to go.",
    bgColor: "bg-green-50",
    iconBgColor: "bg-green-100"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
    title: "Smart Scheduling",
    description: "Ai-powered arrival predictions and route ans route optimization for the most effective travel experience.",
    bgColor: "bg-green-50",
    iconBgColor: "bg-green-100"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    title: "Secure Payments",
    description: "Book and pay securely with multiple payment options. Your financial data is always protected",
    bgColor: "bg-blue-50",
    iconBgColor: "bg-blue-100"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
      </svg>
    ),
    title: "Social Features",
    description: "Share routes with friens, rate your experience, and build a community of smart travelers.",
    bgColor: "bg-blue-50",
    iconBgColor: "bg-blue-100"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
      </svg>
    ),
    title: "Multi-Modal",
    description: "Seamlessly connect buses and other other transit options for complete journey planning",
    bgColor: "bg-blue-50",
    iconBgColor: "bg-blue-100"
  },
];

export default function WhyChooseTransLinka() {
  return (
    <section className="bg-white py-16 px-6 font-sans">
      <div className="max-w-full mx-auto text-center px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
          Why Choose TransLinka
        </h2>
        <p className="text-gray-600 mb-16 text-xl max-w-3xl mx-auto leading-relaxed font-sans">
          We're revolutionalizing publci transportation with cutting-edge technology and user-centric design
        </p>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-10 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 ${feature.bgColor} min-h-[280px] flex flex-col`}
            >
              
              <div className={`w-14 h-14 ${feature.iconBgColor} rounded-lg flex items-center justify-center mb-8 mx-auto`}>
                {feature.icon}
              </div>
              
          
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed font-sans">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
