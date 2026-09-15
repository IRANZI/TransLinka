import React from "react";

const steps = [
  {
    number: "01",
    title: "Search & book",
    description:
      "Enter your destination, compare coaches, and confirm a seat with secure payment in minutes.",
  },
  {
    number: "02",
    title: "Track & navigate",
    description:
      "Follow the bus in real time and use AR guidance at the station so you never miss boarding.",
  },
  {
    number: "03",
    title: "Travel & enjoy",
    description:
      "Board with your digital ticket, settle in, and rate the trip so the next journey is even better.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-navy-50 py-14 sm:py-16 lg:py-20">
      <div className="page-wrap text-center">
        <h2 className="text-section text-navy-900">How it works</h2>
        <p className="mx-auto mt-4 mb-10 max-w-2xl text-body-lg text-navy-600 lg:mb-14">
          Three clear steps from search to seat. No extra accounts, no role
          selection, just travel.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center rounded-2xl bg-white p-7 shadow-soft">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-navy-700 text-white shadow-lift sm:h-20 sm:w-20">
                <span className="text-xl font-bold sm:text-2xl">{step.number}</span>
              </div>
              <h3 className="text-subhead text-navy-900">{step.title}</h3>
              <p className="mt-3 text-body text-navy-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
