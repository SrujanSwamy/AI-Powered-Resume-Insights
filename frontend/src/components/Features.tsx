import Image from "next/image";
import langchainGit from "../../public/images/langchain_git.png";
import djangoGit from "../../public/images/django_git.png";
import typescriptGit from "../../public/images/typescript_git.png";
import nextjsGit from "../../public/images/nextjs_git.png";

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Resume Scoring",
    description: "Get a comprehensive score across 30+ metrics including brevity, style, impact, and sections. Each metric is scored out of 10 with clear benchmarks — so you know exactly where you stand vs. the competition.",
    stat: "30+ metrics",
    statLabel: "evaluated",
    color: "from-indigo-500 to-blue-500",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "AI Suggestions",
    description: "Powered by Gemini 3.1 Flash via LangGraph, our multi-agent system delivers targeted, context-aware suggestions. Unlike generic tools, it understands your resume's specific role, industry, and level.",
    stat: "12 API calls",
    statLabel: "per full analysis",
    color: "from-violet-500 to-purple-500",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Progress Tracking",
    description: "Store and compare every version of your resume over time. View score trend graphs and identify which edits actually improved your ATS ranking — turning resume writing from guesswork into a data-driven process.",
    stat: "Trend graphs",
    statLabel: "across all versions",
    color: "from-emerald-500 to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Cover Letters",
    description: "An AI agent reads your full resume and crafts a cover letter tailored to your skills, experience, and target role. Customize the tone from professional to conversational — no template-filling needed.",
    stat: "Personalized",
    statLabel: "per resume",
    color: "from-orange-500 to-amber-500",
    glow: "group-hover:shadow-orange-500/20",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Job Matching",
    description: "Our smart matching engine scans your resume's skills and experience to recommend the most relevant job roles and industries. Backed by real-time market signals, not just keyword overlap.",
    stat: "Real-time",
    statLabel: "market insights",
    color: "from-pink-500 to-rose-500",
    glow: "group-hover:shadow-pink-500/20",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Skill Quiz",
    description: "The AI detects every hard skill listed on your resume and generates a custom MCQ quiz to test your actual proficiency. Each skill is rated out of 10 — great for interview prep and self-awareness.",
    stat: "Auto-generated",
    statLabel: "MCQs per skill",
    color: "from-cyan-500 to-sky-500",
    glow: "group-hover:shadow-cyan-500/20",
  },
];

const stats = [
  { value: "75%", description: "of resumes are rejected by ATS before a human sees them", highlight: true },
  { value: "6s", description: "average time a recruiter spends on an initial resume scan" },
  { value: "40%", description: "more callbacks when resumes are optimized with strong action verbs" },
  { value: "3×", description: "more interview invites for candidates who tailor resumes to each role" },
];

const techStack = [
  { src: langchainGit, label: "LangChain", width: 140, height: 32 },
  { src: djangoGit, label: "Django", width: 140, height: 32 },
  { src: typescriptGit, label: "TypeScript", width: 140, height: 32 },
  { src: nextjsGit, label: "Next.js", width: 140, height: 32 },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-[#050816] py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="text-sm font-medium text-indigo-300 tracking-wide">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white md:text-5xl leading-tight">
            Cut Through the Noise —{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Real Feedback
            </span>
            , Real Results.
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            Every feature is engineered to give you a measurable, data-driven competitive edge in your job search.
          </p>
        </div>

        {/* Industry Stats Strip */}
        <div className="mb-20 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
            📊 The Hiring Reality — Why This Matters
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 text-center ${
                  stat.highlight
                    ? "border border-red-500/20 bg-red-500/5"
                    : "border border-slate-700/40 bg-slate-800/30"
                }`}
              >
                <p
                  className={`text-3xl font-extrabold mb-1 ${
                    stat.highlight
                      ? "text-red-400"
                      : "bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 leading-snug">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {features.map((feature, i) => (
            <article
              key={i}
              className={`group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl ${feature.glow} hover:-translate-y-1`}
            >
              {/* Icon */}
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}
              >
                {feature.icon}
              </div>
              {/* Gradient top accent */}
              <div
                className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400 mb-4">{feature.description}</p>
              {/* Inline stat */}
              <div className="flex items-center gap-2">
                <span className={`rounded-full bg-gradient-to-r ${feature.color} px-2.5 py-0.5 text-xs font-bold text-white`}>
                  {feature.stat}
                </span>
                <span className="text-xs text-slate-500">{feature.statLabel}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Tech stack strip */}
        <div className="border-t border-slate-800 pt-12">
          <p className="text-center text-sm font-medium text-slate-500 mb-8 uppercase tracking-wider">
            Built with cutting-edge technology
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 hover:opacity-70 transition-opacity duration-300">
            {techStack.map((tech, i) => (
              <div key={i} className="grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={tech.src}
                  width={tech.width}
                  height={tech.height}
                  alt={tech.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
