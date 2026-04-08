import React from "react";
import { CATEGORIES, CONTEXTS } from "@/lib/portfolioData";
import { X } from "lucide-react";

export default function FilterBar({ filters, setFilters }) {
  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const current = prev[type] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const clearAll = () => setFilters({ categories: [], contexts: [] });

  const hasFilters = (filters.categories?.length || 0) + (filters.contexts?.length || 0) > 0;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-body font-medium mb-3">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = filters.categories?.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleFilter("categories", cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-body font-medium mb-3">
          Context
        </p>
        <div className="flex flex-wrap gap-2">
          {CONTEXTS.map((ctx) => {
            const active = filters.contexts?.includes(ctx);
            return (
              <button
                key={ctx}
                onClick={() => toggleFilter("contexts", ctx)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {ctx}
              </button>
            );
          })}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <X className="w-3 h-3" />
          Clear all filters
        </button>
      )}
    </div>
  );
}