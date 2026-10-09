"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserId, resetAuthCookies } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function Header() {
  const [userId, setUserId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    async function fetchUserId() {
      try {
        const id = await getUserId();
        setUserId(id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setUserId(null);
      }
    }
    fetchUserId();

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const submitLogout = async () => {
    try {
      await resetAuthCookies();
      setUserId(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Use mounted to ensure server + first client paint are identical (prevents hydration mismatch)
  const isScrolled = mounted && scrolled;

  return (
    <header className="fixed top-0 z-30 w-full transition-all duration-300">
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
            isScrolled
              ? "border border-slate-700/60 bg-slate-900/80 shadow-xl shadow-black/20 backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" id="header-logo" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-110">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              AI Resume{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Insights
              </span>
            </span>
          </Link>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-1">
            <li>
              <a
                href="#features"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                Features
              </a>
            </li>
            <li>
              <Link
                href="/resources"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                Tools
              </Link>
            </li>
          </ul>

          {/* Auth buttons — deferred to after mount to avoid SSR/client mismatch */}
          <ul className="flex items-center gap-2">
            {!mounted ? (
              // Identical placeholder on server and first client render
              <li>
                <div className="h-8 w-24 rounded-xl bg-slate-800/50 animate-pulse" />
              </li>
            ) : userId ? (
              <>
                <li>
                  <Link
                    href="/resume-analysis"
                    id="header-dashboard-btn"
                    className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-700 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    id="header-logout-btn"
                    onClick={submitLogout}
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    id="header-login-btn"
                    className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-700 hover:text-white"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    id="header-signup-btn"
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40"
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
