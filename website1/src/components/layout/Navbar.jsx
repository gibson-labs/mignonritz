import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/portfolioData";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Portfolio", path: "/portfolio", hasDropdown: true },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-heading text-xl font-semibold text-foreground tracking-tight">
            Mignon Ritz
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.path} className="relative" ref={link.hasDropdown ? dropdownRef : undefined}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors flex items-center gap-1 ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {link.hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 bg-card rounded-xl shadow-xl border border-border p-1.5"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat}
                            to={`/portfolio?category=${encodeURIComponent(cat)}`}
                            className="block px-3 py-2 text-sm font-body text-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                          >
                            {cat}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <React.Fragment key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.hasDropdown && (
                    <div className="pl-4 space-y-1">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat}
                          to={`/portfolio?category=${encodeURIComponent(cat)}`}
                          className="block px-3 py-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}