
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleLogin(event) {
    event.preventDefault();

    // Demo login only. Replace with real authentication.
    localStorage.setItem("soundmatch_logged_in", "true");
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080b16] px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111629] p-8 shadow-2xl">
        <Link href="/" className="text-sm text-violet-400">← Back to home</Link>
        <h1 className="mt-8 text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to your SoundMatch account.</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input required type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-violet-500"
              placeholder="you@example.com" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input required type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:border-violet-500"
              placeholder="Your password" />
          </div>

          <button type="submit"
            className="w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-500">
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account? <Link href="/signup" className="text-violet-400">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
