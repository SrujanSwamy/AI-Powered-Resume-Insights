
const trustedBy = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Stripe",
  "Airbnb",
];

export default function BusinessCategories() {
  return (
    <section className="relative bg-[#050816] py-16 overflow-hidden">
      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Label */}
        <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-slate-500">
          Candidates from these companies trust our platform
        </p>

        {/* Scrolling ticker */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <div className="flex w-max animate-[ticker_30s_linear_infinite]" aria-hidden="true">
            {[...trustedBy, ...trustedBy, ...trustedBy].map((name, i) => (
              <div
                key={i}
                className="mx-8 flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-700/60 bg-slate-800/30 px-6 py-2.5 text-sm font-semibold text-slate-400 backdrop-blur-sm transition-colors hover:border-indigo-500/40 hover:text-indigo-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: "10,000+", label: "Resumes Analyzed" },
            { value: "30+", label: "Evaluation Metrics" },
            { value: "95%", label: "Interview Rate" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-900/70"
            >
              <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
