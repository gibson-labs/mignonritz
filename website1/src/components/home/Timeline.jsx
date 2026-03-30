import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/portfolioData";

export default function Timeline() {
  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Experience
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            My professional journey so far.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Dot */}
                <div className="absolute left-2.5 sm:left-4.5 top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-4 border-background" />

                <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-muted-foreground font-body">{exp.period}</span>
                  </div>
                  <p className="text-primary font-body font-medium text-sm mb-2">{exp.company}</p>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <Link
                    to={`/portfolio?company=${encodeURIComponent(exp.filterCompany)}`}
                    className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View {exp.company} Projects
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}