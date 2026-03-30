import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Briefcase, Tag } from "lucide-react";
import { format } from "date-fns";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-card rounded-2xl shadow-2xl border border-border w-full max-w-3xl my-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero image */}
            <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {project.title}
              </h2>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">
                  <Tag className="w-3 h-3" />
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-body font-medium">
                  <Briefcase className="w-3 h-3" />
                  {project.context} — {project.company}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-body font-medium">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(project.date), "MMM yyyy")}
                </span>
              </div>

              {/* Goal */}
              <div className="mb-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">The Goal</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{project.goal}</p>
              </div>

              {/* Results */}
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Results</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{project.results}</p>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-border">
                        <img
                          src={img}
                          alt={`${project.title} - ${i + 1}`}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}