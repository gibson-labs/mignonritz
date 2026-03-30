import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { PROJECTS } from "@/lib/portfolioData";
import FilterBar from "@/components/portfolio/FilterBar";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectModal from "@/components/portfolio/ProjectModal";

export default function Portfolio() {
  const [filters, setFilters] = useState({ categories: [], contexts: [] });
  const [selectedProject, setSelectedProject] = useState(null);

  // Parse URL params for dynamic linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const company = params.get("company");
    const highlight = params.get("highlight");

    if (category) {
      setFilters((prev) => ({ ...prev, categories: [category] }));
    }
    if (company) {
      // Find projects by company and set the appropriate context
      const companyProjects = PROJECTS.filter((p) => p.company === company);
      if (companyProjects.length > 0) {
        const contexts = [...new Set(companyProjects.map((p) => p.context))];
        const categories = [...new Set(companyProjects.map((p) => p.category))];
        setFilters({ categories, contexts });
      }
    }
    if (highlight) {
      const project = PROJECTS.find((p) => p.id === parseInt(highlight));
      if (project) setSelectedProject(project);
    }
  }, []);

  const filtered = useMemo(() => {
    let result = [...PROJECTS];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.contexts.length > 0) {
      result = result.filter((p) => filters.contexts.includes(p.context));
    }

    // Sort newest to oldest
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
    return result;
  }, [filters]);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Portfolio
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Explore my work across marketing, data, and design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10"
        >
          <FilterBar filters={filters} setFilters={setFilters} />
        </motion.div>

        <LayoutGroup>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground font-body text-lg">
              No projects match the selected filters.
            </p>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}