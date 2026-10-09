"use client";

import Image from "next/image";
import { ExternalLink, Star, Layers, Info } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Jake's Resume",
    image: "/resumes/Jake.jpeg",
    url: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs",
    badge: "Most Popular",
    badgeColor: "from-indigo-500 to-violet-500",
    stars: 5,
    description: "Clean single-column layout loved by FAANG recruiters. Perfect for software engineers.",
    tags: ["Tech", "SWE", "ATS-Friendly"],
  },
  {
    id: 2,
    name: "FAANGPath Simple Template",
    image: "/resumes/FAANGPath.jpeg",
    url: "https://www.overleaf.com/latex/templates/faangpath-simple-template/npsfpdqnxmbc",
    badge: "ATS Optimized",
    badgeColor: "from-emerald-500 to-teal-500",
    stars: 5,
    description: "Specifically designed to pass ATS filters at top-tier companies. Minimal, powerful.",
    tags: ["FAANG", "ATS", "Minimalist"],
  },
  {
    id: 3,
    name: "Omar's Resume",
    image: "/resumes/Omar.jpeg",
    url: "https://www.overleaf.com/latex/templates/omars-resume/yvmjzbpysxwg",
    badge: "Elegant",
    badgeColor: "from-orange-500 to-amber-500",
    stars: 4,
    description: "Two-column elegance with a modern touch. Great for product and business roles.",
    tags: ["Product", "Business", "Modern"],
  },
  {
    id: 4,
    name: "Deedy CV",
    image: "/resumes/Deedy.jpeg",
    url: "https://www.overleaf.com/latex/templates/deedy-cv/bjryvfsjdyxz",
    badge: "Classic",
    badgeColor: "from-pink-500 to-rose-500",
    stars: 4,
    description: "A timeless layout trusted by thousands of engineers at top universities worldwide.",
    tags: ["Academic", "Classic", "Versatile"],
  },
];

const ResumeTemplates = () => {
  return (
    <div className="h-full overflow-y-auto p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
          <Layers className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Resume Templates</h2>
          <p className="text-sm text-slate-400">Battle-tested LaTeX templates used at top companies</p>
        </div>
      </div>

      {/* Insight Banner */}
      <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-violet-500/20 mt-0.5">
            <Info className="h-4 w-4 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-violet-300 mb-1">
              📄 Why Template Choice Matters
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Over <span className="text-white font-medium">75% of resumes</span> are rejected
              by ATS before a human sees them — often due to poor formatting. These LaTeX templates
              are specifically tested to ensure clean parsing, proper heading structure, and
              consistent formatting across all major ATS platforms. Click any template to open
              it directly in Overleaf.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: "4", label: "Expert Picks", color: "text-indigo-400" },
          { value: "100%", label: "ATS-Compatible", color: "text-emerald-400" },
          { value: "LaTeX", label: "Format", color: "text-violet-400" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-3 text-center"
          >
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

interface Template {
  id: number;
  name: string;
  image: string;
  url: string;
  badge: string;
  badgeColor: string;
  stars: number;
  description: string;
  tags: string[];
}

const TemplateCard = ({ template }: { template: Template }) => {
  return (
    <div
      className="group cursor-pointer rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1"
      onClick={() => window.open(template.url, "_blank")}
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={template.image}
          alt={template.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${template.badgeColor} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
          >
            <Star className="h-3 w-3" />
            {template.badge}
          </span>
        </div>

        {/* Open button */}
        <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <ExternalLink className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-white">{template.name}</h3>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: template.stars }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
            {Array.from({ length: 5 - template.stars }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 text-slate-600" />
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">{template.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {template.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-md border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-[11px] font-medium text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;