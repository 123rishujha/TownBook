import React from "react";
import { Book } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Book className="h-8 w-auto text-library-primary" />
      <div className="ml-2">
        <span className="text-xl font-serif font-bold text-library-dark">
          Town<span className="text-library-primary">Book</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;
