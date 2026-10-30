
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(localStorage.getItem("soundmatch_logged_in") === "true");
  }, []);

  function handleSignOut() {
    localStorage.removeItem("soundmatch_logged_in");
    setLoggedIn(false);
    router.push("/");
  }

function handleSignUp() {
  router.push("/signup");
}

  return (
    <main className="min-h-screen overflow-hidden bg-[#080b16] text-white">
      {/* NAVBAR */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-500/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" className="h-6 w-6">
              <path d="M2 10v4M6 5v14M10 2v20M14 7v10M18 4v16M22 9v6" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Sound<span className="text-violet-400">Match</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 text-sm text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#how-it-works" className="transition hover:text-white">How it works</a>
          <a href="#about" className="transition hover:text-white">About</a>
        </div>

        <div className="flex items-center gap-3">
          {loggedIn ? (
            <>
              <Link href="/dashboard"
                className="hidden rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-violet-500 sm:block">
                Dashboard
              </Link>
              <button onClick={handleSignOut}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">
                Sign in
              </Link>
              <button onClick={handleSignUp}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-500">
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-28 pt-20 lg:grid-cols-2 lg:px-10 lg:pt-28">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-medium text-violet-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
            Intelligent audio recognition
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Every sound has a
            <span className="block bg-gradient-to-r from-violet-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
              match.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-slate-400 sm:text-lg">
            Discover the identity of any sound. Record audio, compare it with
            your reference library, and find the closest match with SoundMatch.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => router.push(loggedIn ? "/dashboard" : "/signin")}
              className="group flex items-center gap-3 rounded-xl bg-violet-600 px-7 py-4 text-sm font-semibold shadow-xl shadow-violet-600/20 transition hover:-translate-y-1 hover:bg-violet-500">
              Get started
              <span className="transition group-hover:translate-x-1">→</span>
            </button>

            <a href="#how-it-works"
              className="rounded-xl border border-white/15 px-7 py-4 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5">
              Learn more
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 border-t border-white/10 pt-7">
            <div>
              <div className="text-2xl font-bold">Audio</div>
              <div className="mt-1 text-xs text-slate-500">Recognition</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="text-2xl font-bold">Smart</div>
              <div className="mt-1 text-xs text-slate-500">Comparison</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="text-2xl font-bold">Fast</div>
              <div className="mt-1 text-xs text-slate-500">Analysis</div>
            </div>
          </div>
        </div>

        {/* AUDIO VISUALIZATION */}
        <div className="relative z-10">
          <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-violet-600/20 to-blue-600/10 blur-2xl" />

          <div className="relative rounded-3xl border border-white/10 bg-[#111629] p-6 shadow-2xl shadow-black/40 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Sound analysis</div>
                <div className="mt-1 text-xs text-slate-500">Audio recognition studio</div>
              </div>
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-400">
                System ready
              </div>
            </div>

            <div className="my-12 flex h-40 items-center justify-center gap-1.5">
              {Array.from({ length: 42 }, (_, i) => (
                <div key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-violet-600 to-blue-400"
                  style={{
                    height: `${15 + Math.abs(Math.sin(i * 0.55) * 110 + Math.cos(i * 0.3) * 35)}px`,
                    opacity: 0.5 + Math.abs(Math.sin(i)) * 0.5
                  }}
                />
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Reference comparison</span>
                <span className="text-xs text-slate-500">Preview</span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-400">Input audio</span>
                    <span className="text-violet-300">Recording</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-full rounded-full bg-violet-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-400">Reference sound</span>
                    <span className="text-blue-300">Library</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-4/5 rounded-full bg-blue-500" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-violet-400/20 bg-violet-500/10 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                  ✦
                </div>
                <div>
                  <div className="text-sm font-semibold">Ready to discover</div>
                  <div className="mt-1 text-xs text-slate-400">Your next sound match starts here.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-t border-white/10 bg-[#0c1020] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              What you can do
            </div>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Sound recognition made simple.
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              Everything you need to capture, organize, and compare sounds in one place.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "🎙️",
                title: "Record sounds",
                description: "Capture audio directly through your microphone or upload an existing recording."
              },
              {
                icon: "🎵",
                title: "Build your library",
                description: "Keep reference sounds organized and ready for future comparisons."
              },
              {
                icon: "✦",
                title: "Compare audio",
                description: "Analyze your input against reference files and identify the closest sound match."
              }
            ].map((feature) => (
              <div key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.05]">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Simple process
            </div>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">How SoundMatch works</h2>
            <p className="mt-4 text-slate-400">
              Three simple steps to find the sound you're looking for.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              ["01", "Record or upload", "Provide the audio you want to identify."],
              ["02", "Select a reference", "Choose a sound from your reference database."],
              ["03", "Discover the match", "Receive comparison results from the analysis system."]
            ].map(([number, title, description]) => (
              <div key={number} className="relative border-t border-violet-400/30 pt-7">
                <div className="text-4xl font-bold text-violet-400/50">{number}</div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / CTA */}
      <section id="about" className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-900/50 to-[#111629] px-7 py-16 text-center sm:px-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500 text-2xl">
            ✦
          </div>
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Ready to find your sound?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
            Start exploring audio recognition and make your sound library work for you.
          </p>
          <button onClick={() => router.push(loggedIn ? "/dashboard" : "/signin")}
            className="mt-8 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet-800 transition hover:-translate-y-1 hover:bg-violet-50">
            Get started →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-slate-500 sm:flex-row">
          <div>© 2026 SoundMatch. All rights reserved.</div>
          <div>Discover the identity of every sound.</div>
        </div>
      </footer>
    </main>
  );
}
