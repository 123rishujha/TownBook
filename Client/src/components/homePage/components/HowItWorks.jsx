import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Sign Up for Free",
      description:
        "Create your community account in less than a minute. No credit card required.",
    },
    {
      number: "02",
      title: "Add Your Collection",
      description:
        "Catalog your community library books or set up your reading room availability.",
    },
    {
      number: "03",
      title: "Share With Members",
      description:
        "Invite community members to browse, reserve books, and schedule room time.",
    },
    {
      number: "04",
      title: "Manage Seamlessly",
      description:
        "Get notifications about reservations, returns, and room bookings automatically.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="section bg-library-light relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-library-accent/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-library-primary/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How TownBook Works
          </h2>
          <p className="text-lg text-library-dark/70 max-w-2xl mx-auto">
            Setting up and using TownBook is simple. Here's how to get your
            community library online in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-library-accent/30 z-0"></div>
              )}

              <div className="book-card p-6 bg-white relative z-10">
                <div className="text-3xl font-serif font-bold text-library-primary mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-library-dark/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#" className="btn-primary inline-block">
            Get Started Today
          </a>
          <p className="mt-4 text-sm text-library-dark/60">
            No technical skills required. We'll help you every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
