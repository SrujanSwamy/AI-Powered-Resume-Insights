'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { getUserId, handleLogin } from "@/app/lib/actions";
import Link from "next/link";
import "../../styles/style.css";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      await signIn('google', { callbackUrl: '/resume-analysis' });
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
      setGoogleLoading(false);
    }
  };

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = { email, password };

    try {
      const response = await apiService.postWithoutToken('/api/auth/login/', JSON.stringify(formData));

      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh);
        const userId = await getUserId();
        const res = await apiService.get(`/api/ats/${userId}/is-exist`);
        if (res.success) {
          router.push(`/resume-analysis`);
        } else {
          router.push('/resume-upload');
        }
      } else {
        handleErrors(response);
      }
    } catch (error) {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleErrors = (response: any) => {
    if (!response || typeof response !== "object") {
      setError("An unknown error occurred.");
      return;
    }
    if (response.non_field_errors?.length > 0) {
      setError(response.non_field_errors[0]);
    } else if (response.detail) {
      setError(response.detail);
    } else if (response.email && Array.isArray(response.email)) {
      setError(response.email[0]);
    } else if (response.password && Array.isArray(response.password)) {
      setError(response.password[0]);
    } else {
      setError("An unknown error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1">
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs font-medium text-indigo-300">Secure Login</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white leading-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Sign in to continue improving your resume.{" "}
          <Link href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            New here? Sign up →
          </Link>
        </p>
      </div>

      <form onSubmit={submitLogin} className="space-y-5">
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
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700/60 bg-slate-800/60 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500/60 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Lock className="h-4 w-4 text-slate-500" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-700/60 bg-slate-800/60 py-3 pl-10 pr-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500/60 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end -mt-2">
          <Link
            href="/reset-password"
            className="text-xs text-slate-500 hover:text-indigo-400 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 flex items-start gap-2">
            <span className="mt-0.5 text-red-500">⚠</span>
            <span>{error}</span>
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
              <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>
            ) : (
              <>Log In <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
            )}
          </span>
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-800" />
        <span className="text-xs text-slate-600">or continue with</span>
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
    </>
  );
}
