import React from "react";

const Community = () => {
  const testimonials = [
    {
      quote:
        "TownBook transformed our neighborhood's Little Free Library system. Now residents can see what books are available before walking over.",
      author: "Sarah Johnson",
      role: "Community Organizer",
      image: "/placeholder.svg",
    },
    {
      quote:
        "Our community reading room was always underutilized until we started using TownBook for scheduling. Now it's booked solid most days!",
      author: "Michael Chen",
      role: "Library Volunteer",
      image: "/placeholder.svg",
    },
    {
      quote:
        "As a librarian, I appreciate how TownBook has made our community outreach programs more accessible and easier to manage.",
      author: "Amara Washington",
      role: "Head Librarian",
      image: "/placeholder.svg",
    },
  ];

  const stats = [
    { number: "200+", label: "Communities" },
    { number: "15,000+", label: "Active Readers" },
    { number: "50,000+", label: "Books Shared" },
    { number: "8,500+", label: "Room Bookings" },
  ];

  return (
    <section id="community" className="section bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Loved by Communities
        </h2>
        <p className="text-lg text-library-dark/70 max-w-2xl mx-auto">
          Hear from libraries and community spaces that have transformed their
          operations with TownBook.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="book-card p-6">
            <div className="mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <p className="italic text-library-dark/80 mb-6">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-library-accent/30 overflow-hidden mr-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{testimonial.author}</h4>
                <p className="text-sm text-library-dark/60">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-library-secondary rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Growing Together
            </h3>
            <p className="text-white/80 mb-8">
              TownBook is building a global network of community libraries and
              reading spaces. Join our mission to make books more accessible to
              everyone.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-serif font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-library-accent/20 p-8 lg:p-12 flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-library-primary rounded-lg transform rotate-12"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-library-primary rounded-lg transform -rotate-12"></div>

              <div className="book-card relative z-10 p-6 bg-white">
                <h3 className="text-xl font-serif font-bold mb-4">
                  Join Our Community
                </h3>
                <p className="text-library-dark/70 mb-6">
                  Subscribe to our newsletter for community stories, updates,
                  and tips for running your library.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-grow px-4 py-2 border border-library-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-library-primary/50"
                  />
                  <button className="btn-primary whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
