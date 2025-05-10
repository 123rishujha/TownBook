import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../../common/Logo";
import { Home, Calendar, Menu, X } from "lucide-react";
import { userLogout } from "@/redux/user/userSlice";
import { ToastHandler } from "@/components/myToast/ToastHandler";
import { useDispatch, useSelector } from "react-redux";

const MemberNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userState } = useSelector((store) => store.user);

  // Get first letter for avatar
  const firstLetter = userState?.name?.charAt(0)?.toUpperCase() || "";
  const memberName = userState?.name || "";

  // Navigation links for librarian
  const navLinks = [
    // {
    //   name: "Dashbaord",
    //   path: "/member/dashboard",
    //   icon: <Home className="w-5 h-5 mr-2" />,
    // },
    {
      name: "All-libraries",
      path: "/member",
      icon: <Home className="w-5 h-5 mr-2" />,
    },
    {
      name: "Reservations",
      path: "/member/reservations",
      icon: <Calendar className="w-5 h-5 mr-2" />,
    },
  ];

  // Function to handle logout
  const handleLogout = () => {
    dispatch(userLogout());
    ToastHandler("suc", "Logout successfully!");
    navigate("auth/login");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-library-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-library-primary font-medium flex items-center"
                    : "text-library-dark hover:text-library-primary transition-colors flex items-center"
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Avatar and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <div className="flex items-center cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-library-primary text-white flex items-center justify-center font-medium text-lg">
                  {firstLetter}
                </div>
                <span className="ml-2 text-library-dark font-medium">
                  {memberName}
                </span>
              </div>

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block border border-library-accent/20">
                <NavLink
                  to="/librarian/profile"
                  className="block px-4 py-2 text-sm text-library-dark hover:bg-library-light"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/librarian/settings"
                  className="block px-4 py-2 text-sm text-library-dark hover:bg-library-light"
                >
                  Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-library-light"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-library-dark" />
            ) : (
              <Menu className="w-6 h-6 text-library-dark" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-library-accent/20">
            {/* Mobile avatar and name */}
            <div className="flex items-center mb-4 p-2 bg-library-light/50 rounded-md">
              <div className="w-10 h-10 rounded-full bg-library-primary text-white flex items-center justify-center font-medium text-lg">
                {firstLetter}
              </div>
              <span className="ml-2 text-library-dark font-medium">
                {memberName}
              </span>
            </div>

            {/* Mobile navigation links */}
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-library-primary font-medium flex items-center"
                      : "text-library-dark hover:text-library-primary transition-colors flex items-center"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}

              {/* Profile link in mobile menu */}
              <NavLink
                to="/librarian/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-library-primary font-medium pt-4 border-t border-library-accent/20"
                    : "text-library-dark hover:text-library-primary transition-colors pt-4 border-t border-library-accent/20"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>

              {/* Settings link in mobile menu */}
              <NavLink
                to="/librarian/settings"
                className={({ isActive }) =>
                  isActive
                    ? "text-library-primary font-medium"
                    : "text-library-dark hover:text-library-primary transition-colors"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </NavLink>

              {/* Logout button in mobile menu */}
              <button
                onClick={handleLogout}
                className="text-left text-red-600 hover:text-red-700 transition-colors py-2"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default MemberNavbar;
