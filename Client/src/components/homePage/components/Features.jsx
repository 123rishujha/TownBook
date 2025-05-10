import React from "react";
import { BookOpen, Calendar, Search, User } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-library-primary" />,
      title: "Book Reservations",
      description:
        "Browse available books in your community library and reserve them for pickup with just a few clicks.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-library-primary" />,
      title: "Room Scheduling",
      description:
        "Reserve reading rooms and study spaces for your next book club meeting or quiet study session.",
    },
    {
      icon: <Search className="w-10 h-10 text-library-primary" />,
      title: "Book Discovery",
      description:
        "Discover new books added to your community library with real-time updates and notifications.",
    },
    {
      icon: <User className="w-10 h-10 text-library-primary" />,
      title: "Community Profiles",
      description:
        "Create your reader profile, track your borrowing history, and connect with fellow bookworms.",
    },
  ];

  return (
    <section id="features" className="section bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything Your Community Library Needs
        </h2>
        <p className="text-lg text-library-dark/70 max-w-2xl mx-auto">
          TownBook replaces paper sign-up sheets with digital tools that make
          community libraries more accessible and easier to manage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="book-card p-6 flex flex-col items-center text-center"
          >
            <div className="mb-4 p-3 bg-library-accent/10 rounded-full">
              {feature.icon}
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">
              {feature.title}
            </h3>
            <p className="text-library-dark/70">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-library-light rounded-xl p-8 border border-library-accent/20">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Little Free Library Integration
            </h3>
            <p className="text-library-dark/70 mb-4">
              TownBook works with neighborhood Little Free Libraries too! Map
              local book exchanges, track inventory, and help neighbors discover
              books in their area.
            </p>
            <ul className="space-y-2">
              {[
                "Map all little libraries in your area",
                "Track book availability",
                "Contribute to the community collection",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-library-primary flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="w-full h-64 bg-library-accent/30 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-32 h-40 bg-library-primary rounded-md transform -rotate-6 shadow-lg"></div>
                <div className="w-32 h-40 bg-library-secondary rounded-md absolute transform rotate-6 shadow-lg"></div>
              </div>
              <div className="absolute -bottom-4 right-8 bg-white p-3 rounded-lg shadow-lg border border-library-accent/20">
                <span className="text-sm font-medium text-library-primary">
                  13 books available nearby
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
