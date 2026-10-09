import UpperLeftLogo from "@/components/Logo/UpperLeftLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UpperLeftLogo />
      <main className="relative flex min-h-screen overflow-hidden bg-[#050816]">

        {/* Left decorative panel */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-[#050816] to-violet-900/30" />
          <div className="pointer-events-none absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[120px]" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-md text-center">
            {/* Icon */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl shadow-indigo-500/40">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <h2 className="mb-3 text-3xl font-extrabold text-white leading-tight">
              Land Your{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Dream Job
              </span>{" "}
              Faster
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10">
              AI-powered resume analysis that gives you a competitive edge. Get scored, get insights, get hired.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: "30+", label: "Metrics Analyzed" },
                { value: "12s", label: "Analysis Time" },
                { value: "95%", label: "User Satisfaction" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-4"
                >
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 backdrop-blur-sm p-5 text-left">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-300 italic leading-relaxed mb-3">
                "My resume score went from 5.2 to 8.9 in one session. Got 3 interview calls the following week."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white">A</div>
                <div>
                  <p className="text-xs font-semibold text-slate-300">Alex R.</p>
                  <p className="text-[11px] text-slate-500">Software Engineer at Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form panel */}
        <div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-16 sm:px-8 relative">
          {/* Subtle glow */}
          <div className="pointer-events-none absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[140px]" />
          <div className="pointer-events-none absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[120px]" />

          <div className="relative w-full max-w-[400px]">
            {/* Card */}
            <div className="rounded-3xl border border-slate-700/50 bg-slate-900/80 p-8 backdrop-blur-md shadow-2xl shadow-black/50">
              {children}
            </div>

            {/* Bottom link area rendered by children */}
          </div>
        </div>
      </main>
    </>
  );
}
