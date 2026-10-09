import Link from "next/link";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer className="relative bg-[#050816]">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-12">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-12 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-110">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                AI Resume{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Insights
                </span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Elevate your resume with AI-powered analysis and land your dream job.
            </p>
            <div className="text-xs text-slate-600" suppressHydrationWarning>
              © {new Date().getFullYear()} AI Resume Insights. All rights reserved.
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              {["Features", "Integrations", "Pricing", "Changelog"].map((item) => (
                <li key={item}>
                  <Link className="text-slate-500 transition-colors hover:text-indigo-400" href="#0">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="space-y-3 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              {["About us", "FAQs", "Blog", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link className="text-slate-500 transition-colors hover:text-indigo-400" href="#0">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div className="space-y-3 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              {["Community", "Terms of Service", "Privacy Policy", "Report a Bug"].map((item) => (
                <li key={item}>
                  <Link className="text-slate-500 transition-colors hover:text-indigo-400" href="#0">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">Social</h3>
            <ul className="flex gap-2">
              {/* Twitter/X */}
              <li>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
                  href="#0"
                  aria-label="Twitter"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 32 32">
                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                  </svg>
                </Link>
              </li>
              {/* GitHub */}
              <li>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
                  href="https://github.com/JaivantKosaraju/AI-Resume-Insights"
                  aria-label="Github"
                  target="_blank"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 32 32">
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            Built with ❤️ using LangChain, Django & Next.js
          </div>
          <div className="flex gap-4 text-xs text-slate-600">
            <Link href="#0" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="#0" className="hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="#0" className="hover:text-slate-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}