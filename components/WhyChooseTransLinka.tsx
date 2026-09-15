import React from "react";

const features = [
  {
    title: "Real-time tracking",
    description:
      "Know exactly where your bus is with GPS precision. No more guessing or waiting in uncertainty.",
  },
  {
    title: "AR navigation",
    description:
      "Use augmented reality to find your coach in crowded stations. Point and see exactly where to go.",
  },
  {
    title: "Smart scheduling",
    description:
      "AI-powered arrival predictions and route optimization for a smoother travel day.",
  },
  {
    title: "Secure payments",
    description:
      "Book and pay securely with multiple payment options. Your financial data stays protected.",
  },
  {
    title: "Community travel",
    description:
      "Share routes with friends, rate your trip, and help other travelers move with confidence.",
  },
  {
    title: "City to city",
    description:
      "Connect buses and popular routes across Rwanda for complete journey planning.",
  },
];

export default function WhyChooseTransLinka() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="page-wrap text-center">
        <h2 className="text-section text-navy-900">Why choose TransLinka</h2>
        <p className="mx-auto mt-4 mb-10 max-w-2xl text-body-lg text-navy-600 lg:mb-14">
          A calmer booking experience, built around live information and the way
          people actually travel.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-2xl border border-navy-100 bg-navy-50/70 p-6 text-left shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-7"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-700 text-sm font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-semibold text-navy-900 sm:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-body text-navy-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
