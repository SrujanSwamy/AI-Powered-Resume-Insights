import { usePageData } from "@/hooks/usePageData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { BookOpen, Layers, Zap, ClipboardList, ArrowRight } from "lucide-react";

const ResourcesPage = async () => {
  // Enforces authentication and checks for resume presence
  await usePageData();

  const resources = [
    {
      title: "Resume Templates",
      description: "Access battle-tested, ATS-friendly LaTeX resume templates designed to pass automated screenings.",
      href: "/resources/resume-templates",
      icon: Layers,
      color: "from-violet-500 to-purple-500",
      glow: "hover:shadow-violet-500/10",
      tag: "ATS-Approved",
    },
    {
      title: "Action Verbs",
      description: "Enhance your bullet points with high-impact, results-oriented verbs handpicked by recruitment managers.",
      href: "/resources/action-verbs",
      icon: Zap,
      color: "from-indigo-500 to-blue-500",
      glow: "hover:shadow-indigo-500/10",
      tag: "Action-Driven",
    },
    {
      title: "Sample Bullets",
      description: "Browse curated resume bullet points for key achievements, metrics, and technical contributions.",
      href: "/resources/sample-bullets",
      icon: ClipboardList,
      color: "from-emerald-500 to-teal-500",
      glow: "hover:shadow-emerald-500/10",
      tag: "Writing Guide",
    },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-5xl py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 mb-4 backdrop-blur-sm">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">Resume Resources</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl leading-tight">
            Craft a{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Standout
            </span>{" "}
            Resume
          </h1>
          <p className="mt-3 text-slate-400 text-lg max-w-2xl">
            Leverage professional tools, high-impact vocabulary, and proven layouts to maximize your response rates.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Link
                key={index}
                href={resource.href}
                className={`group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-2xl ${resource.glow} hover:-translate-y-1`}
              >
                <div>
                  {/* Top Row with Icon and Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${resource.color} text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-400 border border-slate-700/50">
                      {resource.tag}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-200">
                    {resource.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    {resource.description}
                  </p>
                </div>

                {/* Footer Link Button */}
                <div className="flex items-center text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  Explore Resource
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Hover Top Border Accent */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${resource.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </Link>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ResourcesPage;
