import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Briefcase, Tag, ZoomIn, FileText, Play } from "lucide-react";
import { format } from "date-fns";

export default function ProjectModal({ project, onClose }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setLightboxImg(null);
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
            <div className="aspect-video w-full overflow-hidden rounded-t-2xl bg-muted flex items-center justify-center">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-heading text-6xl font-bold text-primary/20 select-none">
                  {project.title.charAt(0)}
                </span>
              )}
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
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-muted-foreground font-body leading-relaxed">{project.description}</p>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.gallery.map((item, i) => {
                      const isPdf = item.toLowerCase().endsWith(".pdf");
                      const isVideo = item.toLowerCase().endsWith(".mp4") || item.toLowerCase().endsWith(".mov");
                      if (isPdf) {
                        const fileName = item.split("/").pop().replace(/-/g, " ").replace(".pdf", "");
                        return (
                          <a
                            key={i}
                            href={item}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-muted h-48 hover:bg-primary/10 hover:border-primary transition-colors duration-200"
                          >
                            <FileText className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors" />
                            <span className="text-xs font-body text-muted-foreground group-hover:text-foreground text-center px-3 capitalize">{fileName}</span>
                          </a>
                        );
                      }
                      if (isVideo) {
                        return (
                          <div key={i} className="rounded-xl overflow-hidden border border-border h-48">
                            <video
                              src={item}
                              className="w-full h-full object-cover"
                              controls
                              preload="metadata"
                            />
                          </div>
                        );
                      }
                      return (
                        <div
                          key={i}
                          className="group relative rounded-xl overflow-hidden border border-border cursor-zoom-in"
                          onClick={() => setLightboxImg(item)}
                        >
                          <img
                            src={item}
                            alt={`${project.title} - ${i + 1}`}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" />
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-background/20 text-white hover:bg-background/40 transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxImg}
              alt="Expanded view"
              className="relative max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}