"use client";

import "../../styles/style.css";
import apiService from "@/app/services/apiService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/lib/actions";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrors([]);
    try {
      await signIn('google', { callbackUrl: '/resume-upload' });
    } catch (err) {
      setErrors(['Google sign-in failed. Please try again.']);
      setGoogleLoading(false);
    }
  };

  const submitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const formData = { email, password1, password2 };

    try {
      const response = await apiService.postWithoutToken(
        "/api/auth/register/",
        JSON.stringify(formData)
      );

      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh);
        router.push("/resume-upload");
      } else {
        handleErrors(response);
      }
    } catch (error) {
      setErrors(["A network error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const handleErrors = (response: any) => {
    const tmpErrors: string[] = [];
    if (response && typeof response === "object") {
      for (const [field, messages] of Object.entries(response)) {
        if (Array.isArray(messages)) {
          tmpErrors.push(...messages);
        } else if (typeof messages === "string") {
          tmpErrors.push(messages);
        }
      }
    } else if (typeof response === "string") {
      tmpErrors.push(response);
    } else {
      tmpErrors.push("An unknown error occurred.");
    }
    setErrors(tmpErrors);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-7">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-300">Free Account</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white leading-tight">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Start getting AI-powered feedback on your resume today.{" "}
          <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Already have one? Log in →
          </Link>
        </p>
      </div>

      <form onSubmit={submitSignup} className="space-y-4">
        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="email">
            Email address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Mail className="h-4 w-4 text-slate-500" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700/60 bg-slate-800/60 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500/60 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="password1">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Lock className="h-4 w-4 text-slate-500" />
            </div>
            <input
              id="password1"
              name="password1"
              type={showPassword1 ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
              onChange={(e) => setPassword1(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700/60 bg-slate-800/60 py-3 pl-10 pr-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500/60 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword1 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="password2">
            Confirm password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Lock className="h-4 w-4 text-slate-500" />
            </div>
            <input
              id="password2"
              name="password2"
              type={showPassword2 ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repeat your password"
              onChange={(e) => setPassword2(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700/60 bg-slate-800/60 py-3 pl-10 pr-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500/60 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 flex items-start gap-2">
            <span className="mt-0.5 text-red-500">⚠</span>
            <span>{errors[0]}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</>
            ) : (
              <>Create Account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
            )}
          </span>
        </button>
      </form>

      {/* Divider */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-800" />
        <span className="text-xs text-slate-600">or sign up with</span>
        <div className="flex-1 h-px bg-slate-800" />
      </div>

      {/* Google OAuth placeholder */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="mt-4 w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/40 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {googleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )}
        {googleLoading ? 'Redirecting...' : 'Continue with Google'}
      </button>

      {/* Terms */}
      <p className="mt-5 text-center text-xs text-slate-600">
        By creating an account, you agree to our{" "}
        <a href="#0" className="text-slate-500 underline hover:text-indigo-400 transition-colors">Terms of Service</a>{" "}
        and{" "}
        <a href="#0" className="text-slate-500 underline hover:text-indigo-400 transition-colors">Privacy Policy</a>.
      </p>
    </>
  );
}
