import React, { useState, useCallback } from "react";
import {
  Book,
  Search,
  X,
  Calendar,
  Tag,
  Loader,
  AlertCircle,
} from "lucide-react";

const EnhancedSearchBookForm = ({
  onBookSelect,
  searchQuery,
  setSearchQuery,
  searchGoogleBooks,
  isSearching,
  searchResults,
  clearSearch,
}) => {
  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        searchGoogleBooks(query);
      }
    }, 500),
    [searchGoogleBooks]
  );

  // Handle input changes with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      clearSearch();
      return;
    }

    debouncedSearch(value);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-library-primary h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for books by title, author or ISBN"
          className="block w-full pl-12 pr-12 py-3 border border-library-accent/50 rounded-lg text-library-dark bg-library-light/30 focus:outline-none focus:ring-2 focus:ring-library-primary focus:border-library-primary transition-all"
          aria-label="Search for books"
          autoComplete="off"
        />
        {searchQuery && (
          <button
            aria-label="Clear search"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center px-3"
          >
            <X className="h-5 w-5 text-library-dark/60 hover:text-library-dark" />
          </button>
        )}
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Loader className="animate-spin h-10 w-10 text-library-primary mb-3" />
          <p className="text-library-dark">
            Searching the literary universe...
          </p>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 border border-library-accent/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-library-dark">
              Found {searchResults.length} book
              {searchResults.length !== 1 ? "s" : ""}
            </h3>
            <button
              onClick={clearSearch}
              className="text-sm text-library-primary hover:text-library-primary/80 font-medium"
            >
              Clear results
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-library-accent scrollbar-track-library-light">
            {searchResults.map((book) => (
              <div
                key={book.id}
                className="p-4 border border-library-accent/30 rounded-lg hover:border-library-primary/50 hover:bg-library-light cursor-pointer transition-all"
                onClick={() => onBookSelect(book)}
                tabIndex="0"
                role="button"
                aria-label={`Select ${book.volumeInfo.title} by ${
                  book.volumeInfo.authors?.join(", ") || "Unknown author"
                }`}
                onKeyDown={(e) => e.key === "Enter" && onBookSelect(book)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-24 bg-library-light flex items-center justify-center rounded overflow-hidden mr-4 border border-library-accent/30">
                    {book.volumeInfo.imageLinks?.thumbnail ? (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail.replace(
                          "http:",
                          "https:"
                        )}
                        alt={`Cover of ${book.volumeInfo.title}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Book className="text-library-primary h-8 w-8" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-library-dark mb-1">
                      {book.volumeInfo.title}
                    </h4>
                    {book.volumeInfo.authors?.length > 0 && (
                      <div className="flex items-center text-sm text-library-dark/80 mb-2">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>{book.volumeInfo.authors.join(", ")}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 text-xs mt-2">
                      {book.volumeInfo.publishedDate && (
                        <div className="flex items-center text-library-dark/70">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {new Date(
                              book.volumeInfo.publishedDate
                            ).getFullYear()}
                          </span>
                        </div>
                      )}

                      {book.volumeInfo.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-1 ml-2">
                          {book.volumeInfo.categories
                            .slice(0, 2)
                            .map((category, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 bg-library-accent/30 text-library-primary rounded-full"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {category}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results State */}
      {!isSearching && searchQuery && searchResults.length === 0 && (
        <div className="text-center py-8 bg-library-light rounded-lg border border-library-accent/30">
          <AlertCircle className="mx-auto h-12 w-12 text-library-primary/70 mb-3" />
          <h3 className="text-lg font-medium text-library-dark mb-1">
            No books found
          </h3>
          <p className="text-library-dark/70">
            Try different keywords or check the spelling
          </p>
        </div>
      )}

      {/* Initial State */}
      {!searchQuery && !isSearching && searchResults.length === 0 && (
        <div className="text-center py-12 bg-library-light rounded-lg border border-library-accent/30">
          <Book className="mx-auto h-16 w-16 text-library-primary mb-4" />
          <h3 className="text-xl font-medium text-library-dark mb-2">
            Find your next great read
          </h3>
          <p className="text-library-dark/70 max-w-md mx-auto">
            Search for books by title, author, or ISBN to add them to your
            collection.
          </p>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBookForm;
