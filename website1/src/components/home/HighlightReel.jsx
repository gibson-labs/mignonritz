import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/portfolioData";

const featured = PROJECTS.slice(0, 4);

const HighlightReel = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest text-sm uppercase mb-3">Selected Work</p>
          <h2 className="section-heading">Highlight Reel</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((project, i) => (
            <Link
              key={project.id}
              to={`/portfolio?highlight=${project.id}`}
              className="project-card group animate-fade-in-up opacity-0"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary tracking-wide uppercase">
                  {project.category}
                </span>
                <h3 className="font-heading text-lg font-semibold mt-1 group-hover:text-primary transition-colors flex items-center gap-1">
                  {project.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightReel;