import React from "react";
import { Book, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="section bg-library-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-library-accent/20 rounded-full -translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-library-primary/10 rounded-full translate-y-1/3"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        <div>
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-white shadow-sm border border-library-accent/20 mb-6">
            <span className="bg-library-primary/10 text-library-primary rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
              <Book className="w-3 h-3" />
            </span>
            <span>Community Libraries Reimagined</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Making Books{" "}
            <span className="text-library-primary">Accessible</span> to Your
            Community
          </h1>

          <p className="text-xl text-library-dark/70 mb-8 max-w-2xl">
            TownBook helps community libraries and reading rooms organize their
            collections and schedule availability without paper sign-up sheets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#features" className="btn-primary">
              Explore Features
            </a>
            <a href="#how-it-works" className="btn-secondary">
              How It Works <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-library-accent/30 border-2 border-white"
                ></div>
              ))}
            </div>
            <div className="ml-4">
              <div className="text-sm text-library-dark/70">
                Trusted by{" "}
                <span className="font-bold text-library-dark">200+</span>{" "}
                communities
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute top-0 left-0 w-full h-full bg-library-primary/5 rounded-2xl transform -rotate-6"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-library-secondary/5 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-library-accent/20">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Book className="h-6 w-auto text-library-primary" />
                  <span className="ml-2 text-lg font-serif font-bold text-library-dark">
                    Your Community Library
                  </span>
                </div>
                <div className="text-sm text-library-primary font-medium">
                  Open Today
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-library-light p-4 rounded-lg border border-library-accent/20 flex justify-between">
                  <div>
                    <h3 className="font-medium">Reading Room</h3>
                    <p className="text-sm text-library-dark/60">
                      4 spots available
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-library-primary text-white rounded-md text-sm">
                    Reserve
                  </button>
                </div>

                <div className="bg-library-light p-4 rounded-lg border border-library-accent/20 flex justify-between">
                  <div>
                    <h3 className="font-medium">"The Great Gatsby"</h3>
                    <p className="text-sm text-library-dark/60">
                      2 copies available
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-library-primary text-white rounded-md text-sm">
                    Borrow
                  </button>
                </div>

                <div className="bg-library-light p-4 rounded-lg border border-library-accent/20 flex justify-between">
                  <div>
                    <h3 className="font-medium">Book Club Meeting</h3>
                    <p className="text-sm text-library-dark/60">
                      Thursday at 7 PM
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-library-primary text-white rounded-md text-sm">
                    Join
                  </button>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="#"
                  className="text-library-primary hover:underline text-sm font-medium flex items-center justify-center"
                >
                  View all library resources{" "}
                  <ArrowRight className="ml-1 w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
