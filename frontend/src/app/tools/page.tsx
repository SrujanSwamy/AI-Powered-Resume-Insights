import { usePageData } from "@/hooks/usePageData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { Cpu, Target, FileSpreadsheet, Eye, ArrowRight } from "lucide-react";

const ToolsPage = async () => {
  // Enforces authentication and checks for resume presence
  await usePageData();

  const tools = [
    {
      title: "Job Matches",
      description: "AI-powered job matching that scans your resume to recommend relevant roles aligned with your background.",
      href: "/tools/ats-keywords",
      icon: Target,
      color: "from-indigo-500 to-violet-500",
      glow: "hover:shadow-indigo-500/10",
      tag: "Career Fit",
    },
    {
      title: "Cover Letter Generator",
      description: "Instantly draft highly personalized, context-aware cover letters targeted to your target industry.",
      href: "/tools/cover-letter-generation",
      icon: FileSpreadsheet,
      color: "from-orange-500 to-amber-500",
      glow: "hover:shadow-orange-500/10",
      tag: "AI Writer",
    },
    {
      title: "Line Analysis",
      description: "Get granular details and diagnostic evaluations of each line of your resume for visual and grammatical clarity.",
      href: "/tools/line-analysis",
      icon: Eye,
      color: "from-pink-500 to-rose-500",
      glow: "hover:shadow-pink-500/10",
      tag: "ATS Review",
    },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-5xl py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 mb-4 backdrop-blur-sm">
            <Cpu className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-semibold text-violet-300">Advanced AI Tools</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl leading-tight">
            Supercharge Your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Application
            </span>
          </h1>
          <p className="mt-3 text-slate-400 text-lg max-w-2xl">
            Leverage agentic AI nodes to align your profile to active market needs and build supporting materials in seconds.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link
                key={index}
                href={tool.href}
                className={`group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-2xl ${tool.glow} hover:-translate-y-1`}
              >
                <div>
                  {/* Top Row with Icon and Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-400 border border-slate-700/50">
                      {tool.tag}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors duration-200">
                    {tool.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    {tool.description}
                  </p>
                </div>

                {/* Footer Link Button */}
                <div className="flex items-center text-sm font-semibold text-violet-400 group-hover:text-violet-300 transition-colors">
                  Launch Tool
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Hover Top Border Accent */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </Link>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ToolsPage;
