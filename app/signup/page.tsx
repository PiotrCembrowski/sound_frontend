
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSignUp(event) {
    event.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // DEMO ONLY: Replace with real backend registration.
    localStorage.setItem("soundmatch_logged_in", "true");
    localStorage.setItem("soundmatch_user", JSON.stringify({
      name: form.name,
      email: form.email,
    }));

    router.push("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b16] px-5 py-12 text-white">

      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-500/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path d="M2 10v4M6 5v14M10 2v20M14 7v10M18 4v16M22 9v6" />
            </svg>
          </div>

          <span className="text-xl font-bold">
            Sound<span className="text-violet-400">Match</span>
          </span>
        </Link>

        {/* Form card */}
        <div className="rounded-3xl border border-white/10 bg-[#111629]/95 p-7 shadow-2xl shadow-black/30 sm:p-9">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
              ✦
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Create account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Join SoundMatch and start exploring the world of audio recognition.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">

            {/* Full name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 pr-16 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-violet-400 hover:text-violet-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Confirm password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300">
                {error}
              </div>
            )}

            {/* Terms */}
            <div className="flex items-start gap-3 text-xs leading-5 text-slate-400">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 accent-violet-600"
              />

              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-violet-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-violet-400 hover:underline">
                  Privacy Policy
                </Link>.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-bold shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-500 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <span>→</span>}
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-7 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-violet-400 hover:text-violet-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-7 block text-center text-xs text-slate-500 transition hover:text-white"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}
