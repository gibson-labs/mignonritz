import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-heading text-lg font-semibold text-foreground">Portfolio</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Home</Link>
            <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Portfolio</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground font-body">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}