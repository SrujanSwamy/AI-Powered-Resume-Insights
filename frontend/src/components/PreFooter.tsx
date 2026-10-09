import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative bg-[#050816] py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* CTA Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 p-12 md:p-20 text-center shadow-2xl">
          {/* Glowing orbs inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/20 rounded-full blur-[80px]" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-60 h-60 bg-violet-600/15 rounded-full blur-[60px]" aria-hidden="true" />

          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.04] rounded-3xl"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-indigo-300 tracking-wide">
                Ready to elevate your career?
              </span>
            </div>

            <h2 className="mb-4 text-3xl font-extrabold text-white md:text-5xl leading-tight">
              Real Results,{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Real Growth
              </span>
              , Real Success.
            </h2>

            <p className="mx-auto mb-10 max-w-xl text-lg text-slate-400">
              Join thousands of job seekers who upgraded their resumes and landed their dream jobs with AI-powered insights.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/resume-upload"
                id="cta-upload-btn"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:scale-105 hover:from-indigo-500 hover:to-violet-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Analyze My Resume
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/login"
                id="cta-login-btn"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-8 py-4 text-base font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:bg-slate-700/50 hover:text-white hover:scale-105"
              >
                Sign In Free
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Instant AI feedback
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Privacy guaranteed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
