import React, { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../../common/Logo";
import { Book, Users, Home, Calendar, Menu, X, LogOut, Settings, User, ChevronDown } from "lucide-react";
import { userLogout } from "@/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { ToastHandler } from "@/components/myToast/ToastHandler";
import { Button } from "@/components/ui/button";

const LibrarianNavbar = ({ libraryName = "Town Library" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Skip this handler if we're clicking on a logout button
      if (event.target.closest('[data-action="logout"]')) {
        return;
      }
      
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Get first letter for avatar
  const firstLetter = libraryName.charAt(0).toUpperCase();

  // Navigation links for librarian
  const navLinks = [
    {
      name: "Dashboard",
      path: "/librarian/",
      icon: <Home className="w-5 h-5 mr-2" />,
    },
    {
      name: "Books",
      path: "/librarian/books",
      icon: <Book className="w-5 h-5 mr-2" />,
    },
    {
      name: "Rooms",
      path: "/librarian/rooms",
      icon: <Users className="w-5 h-5 mr-2" />,
    },
    {
      name: "Reservations",
      path: "/librarian/reservations",
      icon: <Calendar className="w-5 h-5 mr-2" />,
    },
  ];

  // Function to handle logout
  const handleLogout = () => {
    // First dispatch the logout action
    dispatch(userLogout());
    
    // Show success message
    ToastHandler("suc", "Logout successful!");
    
    // Clear any local storage items if needed
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigate to login page
    navigate("/auth/login");
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-accent/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-medium flex items-center px-3 py-2 rounded-md bg-primary/10"
                    : "text-dark hover:text-primary hover:bg-accent/20 transition-colors flex items-center px-3 py-2 rounded-md"
                }
              >
                {link.icon}
                <span className="ml-1.5">{link.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Avatar and Profile */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Button 
                ref={buttonRef}
                variant="ghost" 
                className="flex items-center space-x-2 hover:bg-accent/20 rounded-full pr-3 pl-1 py-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium text-sm shadow-sm">
                  {firstLetter}
                </div>
                <span className="text-dark font-medium text-sm">
                  {libraryName}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>

              {/* Dropdown menu */}
              {isMenuOpen && (
                <div ref={menuRef} className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10 border border-accent/20 animate-in fade-in-50 slide-in-from-top-5">
                  <div className="px-4 py-2 border-b border-accent/20">
                    <p className="text-sm font-medium text-dark">{libraryName}</p>
                    <p className="text-xs text-gray-500">Librarian</p>
                  </div>
                    <button
                    data-action="logout"
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              ref={buttonRef}
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark hover:text-primary hover:bg-accent/20"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden py-2 px-4 border-t border-accent/20 bg-white shadow-lg animate-in slide-in-from-top-5">
            <div className="py-3 px-3 mb-2 flex items-center border-b border-accent/20">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium text-sm mr-3">
                {firstLetter}
              </div>
              <div>
                <p className="font-medium text-dark text-sm">{libraryName}</p>
                <p className="text-xs text-gray-500">Librarian</p>
              </div>
            </div>
            
            <nav className="flex flex-col space-y-1 py-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-medium flex items-center p-2.5 rounded-md bg-primary/10"
                      : "text-dark hover:text-primary transition-colors flex items-center p-2.5 rounded-md hover:bg-accent/20"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </NavLink>
              ))}

              <div className="pt-2 mt-2 border-t border-accent/20 space-y-1">
                <NavLink
                  to="/librarian/profile"
                  className="text-dark hover:text-primary transition-colors flex items-center p-2.5 rounded-md hover:bg-accent/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2 text-primary" />
                  Profile
                </NavLink>
                <NavLink
                  to="/librarian/settings"
                  className="text-dark hover:text-primary transition-colors flex items-center p-2.5 rounded-md hover:bg-accent/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2 text-primary" />
                  Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:bg-red-50 transition-colors flex items-center p-2.5 rounded-md mt-1"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LibrarianNavbar;
