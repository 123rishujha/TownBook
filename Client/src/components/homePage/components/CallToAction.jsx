import React from "react";
import { Book } from "lucide-react";

const CallToAction = () => {
  return (
    <section id="contact" className="section bg-library-light">
      <div className="max-w-4xl mx-auto text-center">
        <Book className="w-16 h-16 mx-auto text-library-primary mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Community Library?
        </h2>
        <p className="text-lg text-library-dark/70 mb-8 max-w-2xl mx-auto">
          Join hundreds of communities that have made their libraries and
          reading rooms more accessible with TownBook.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="btn-primary">
            Get Started for Free
          </a>
          <a href="#" className="btn-secondary">
            Request a Demo
          </a>
        </div>
        <div className="mt-12 px-4 py-6 bg-white rounded-xl border border-library-accent/20 max-w-lg mx-auto">
          <h3 className="text-xl font-serif font-bold mb-4">
            Need Help Getting Started?
          </h3>
          <p className="text-library-dark/70 mb-4">
            Our team is ready to help you set up your community library or
            reading room.
          </p>
          <a
            href="mailto:support@townbook.com"
            className="text-library-primary hover:underline"
          >
            support@townbook.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
