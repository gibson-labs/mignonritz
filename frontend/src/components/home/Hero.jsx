import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PROFILE_IMAGE } from "@/lib/portfolioData";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium font-body mb-6 tracking-wide uppercase">
              Marketing Professional
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Crafting stories that{" "}
              <span className="text-primary italic">connect</span>{" "}
              & convert.
            </h1>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8 max-w-lg">
              A versatile marketing professional with experience across social media, data analytics,
              product launches, and creative design. I turn insights into impact.
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-body font-medium text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              View Full Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl rotate-3" />
              <img
                src={PROFILE_IMAGE}
                alt="Marketing Professional"
                className="relative w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}