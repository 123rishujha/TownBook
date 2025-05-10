import React from "react";
import { Book } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Pricing", href: "#" },
      { name: "Case Studies", href: "#" },
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#community" },
      { name: "Webinars", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Contact", href: "#contact" },
      { name: "Careers", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-white border-t border-library-accent/20">
      <div className="section pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Book className="h-6 w-auto text-library-primary" />
              <span className="ml-2 text-xl font-serif font-bold text-library-dark">
                Town<span className="text-library-primary">Book</span>
              </span>
            </div>
            <p className="text-library-dark/70 mb-4">
              Making community libraries and reading rooms more accessible, one
              book at a time.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {["facebook", "twitter", "instagram", "linkedin"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-library-dark/60 hover:text-library-primary transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 border border-library-accent/30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z" />
                      </svg>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(links).map(([category, categoryLinks]) => (
            <div key={category}>
              <h3 className="font-serif font-bold text-lg mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {categoryLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-library-dark/70 hover:text-library-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-library-accent/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-library-dark/60">
            &copy; {currentYear} TownBook. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-library-dark/60 hover:text-library-primary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-library-dark/60 hover:text-library-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-library-dark/60 hover:text-library-primary transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
