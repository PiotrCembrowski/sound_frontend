"use client";


import { useEffect, useRef, useState, useCallback } from "react";


const NOTE_FILES = [
  "c4", "d4", "e4",
  "f4", "g4","a4", "b4",
];

function PlayNoteButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = useCallback(() => {
    // Stop any currently playing note
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Pick a random note
    const randomNote = NOTE_FILES[Math.floor(Math.random() * NOTE_FILES.length)];
    const src = `/assets/notes/4_octave/${randomNote}.mp3`;

    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play().catch((err) => {
      console.error(`Failed to play ${src}`, err);
    });
  }, []);

  return (
    <button
      onClick={handlePlay}
      style={{
        padding: "10px 24px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        color: "#fff",
        cursor: "pointer",
        fontWeight: 600,
        transition: "transform 0.1s ease, box-shadow 0.2s ease",
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.96)"}
      onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      ▶ Play the note
    </button>
  );
}

function Icon({ name, size = 20 }) {
  const paths = {
    wave: <><path d="M2 10v4M6 5v14M10 2v20M14 7v10M18 4v16M22 9v6" /></>,
    mic: <><rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" /></>,
    upload: <><path d="M12 16V4m-5 5 5-5 5 5" /><path d="M4 16v4h16v-4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
    music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
    play: <path d="m8 5 12 7-12 7z" />,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    trash: <><path d="M3 6h18M8 6V4h8v2m-11 0 1 14h10l1-14M10 10v6m4-6v6" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    folder: <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}


export default function Home() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioName, setAudioName] = useState("");
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState("");
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);



  return (
    <main className="min-h-screen bg-[#f7f7fb] text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white px-5 py-7 lg:flex">
          <a href="#" className="mb-12 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
              <Icon name="wave" size={23} />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">SoundMatch</div>
              <div className="text-xs text-slate-400">Audio intelligence</div>
            </div>
          </a>

          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Workspace
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 rounded-xl bg-violet-50 px-3 py-3 text-sm font-semibold text-violet-700">
              <Icon name="wave" size={18} />
              Sound comparison
            </a>
            <a href="#library" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
              <Icon name="folder" size={18} />
              Sound library
            </a>
            <a href="#results" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
              <Icon name="clock" size={18} />
              Latest results
            </a>
          </nav>

          <div className="mt-auto rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
              <Icon name="spark" size={19} />
            </div>
            <div className="text-sm font-semibold">Find the sound</div>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Compare recordings against your collection of reference sounds.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
              SM
            </div>
            <div>
              <div className="text-sm font-semibold">My workspace</div>
              <div className="text-xs text-slate-400">Personal project</div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-5 py-4 backdrop-blur md:px-9">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white">
                <Icon name="wave" size={20} />
              </div>
              <span className="font-bold">SoundMatch</span>
            </div>
            <div className="hidden text-sm text-slate-500 lg:block">
              Workspace <span className="mx-2 text-slate-300">/</span>
              <span className="font-medium text-slate-800">Sound comparison</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Audio workspace
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                S
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-5 py-8 md:px-9 md:py-10">
            {/* Page title */}
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                  <Icon name="spark" size={15} />
                  Audio analysis studio
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Find your sound.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
                  Record a sound, choose a reference, and discover how closely they match.
                </p>
              </div>
              <a href="#library" className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:border-violet-200 hover:text-violet-700">
                <Icon name="folder" size={17} />
                Browse library
                <Icon name="arrow" size={15} />
              </a>
            </div>

            {/* Top stats */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Reference sounds</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Icon name="music" />
                  </span>
                </div>
                <div className="mt-3 text-3xl font-bold">04</div>
                <div className="mt-1 text-xs text-slate-400">Sample library</div>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Current recording</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon name="mic" />
                  </span>
                </div>
                <div className="mt-3 text-3xl font-bold">{recordedBlob ? "Ready" : "--"}</div>
                <div className="mt-1 truncate text-xs text-slate-400">
                  {recordedBlob ? audioName : "Awaiting audio input"}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Latest similarity</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon name="check" />
                  </span>
                </div>
                <div className="mt-3 text-3xl font-bold">
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {result ? "Returned by your backend" : "No comparison yet"}
                </div>
              </div>
            </div>

            <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
              {/* Recording panel */}
              <div className="min-w-0 space-y-6">
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                      <h2 className="font-bold">Your audio input</h2>
                      <p className="mt-1 text-xs text-slate-400">Step 1 · Record or upload a sound</p>
                    </div>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                      INPUT
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-[#faf8ff] via-[#f6f4ff] to-[#f0f3ff] p-6 md:p-8">
                      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet-200/20 blur-2xl" />
                      <div className="relative flex flex-col items-center text-center">
                        <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition ${
                          recording
                            ? "animate-pulse bg-rose-500 text-white shadow-rose-200"
                            : "bg-white text-violet-600 shadow-violet-100"
                        }`}>
                          <Icon name="mic" size={28} />
                        </div>
                        <h3 className="text-lg font-bold">
                          {recording ? "Listening to your sound..." : audioName || "Capture a sound"}
                        </h3>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                          {recording
                            ? "Make your sound now. Stop recording when you're finished."
                            : recordedBlob
                              ? "Your audio is ready. You can listen to it or compare it with a reference."
                              : "Use your microphone or choose an existing audio file to get started."}
                        </p>



                        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                          <PlayNoteButton/>
                          <button
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:text-violet-700 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </div>

                        <p className="mt-4 text-[11px] text-slate-400">
                          Microphone access requires your permission. Upload supported audio files.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Reference selection */}
                <div id="library" className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="font-bold">Choose a reference sound</h2>
                      <p className="mt-1 text-xs text-slate-400">Step 2 · Select the sound to compare against</p>
                    </div>
                    <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">

                    </span>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="relative mb-4">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icon name="search" size={17} />
                      </span>
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search reference sounds..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
                      />
                    </div>


                    <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                      <div className="mt-0.5 text-violet-600">
                        <Icon name="spark" size={18} />
                      </div>
                    </div>


                  </div>
                </div>
              </div>

              {/* Results panel */}
              <div id="results" className="space-y-6">
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold">Match analysis</h2>
                      <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Results
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Step 3 · Your comparison results</p>
                  </div>

                  <div className="p-6">
                    {result ? (
                      <div>
                        <div className="flex flex-col items-center py-5 text-center">
                          <div className="relative flex h-40 w-40 items-center justify-center rounded-full" style={{ background: `conic-gradient(#7c3aed ${percent ?? 0}%, #f1f0f7 0)` }}>
                            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                              <div className="text-4xl font-bold tracking-tight">
                                {percent === null ? "—" : `${percent}%`}
                              </div>
                              <div className="mt-1 text-xs text-slate-400">Similarity</div>
                            </div>
                          </div>
                          <h3 className="mt-5 text-lg font-bold">
                            {result.match_name || result.reference_name || selectedReference?.name}
                          </h3>
                          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                            {result.message || "Comparison completed by your audio analysis backend."}
                          </p>
                        </div>

                        <div className="mt-4 rounded-xl bg-slate-50 p-4">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-slate-500">Similarity score</span>
                            <span className="font-bold">{percent === null ? "Not provided" : `${percent}%`}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                            <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${Math.max(0, Math.min(100, percent ?? 0))}%` }} />
                          </div>
                        </div>

                        {result.details && (
                          <pre className="mt-4 overflow-auto rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                            {JSON.stringify(result.details, null, 2)}
                          </pre>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-8 text-center">
                        <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full border border-dashed border-violet-200 bg-violet-50/50">
                          <div className="absolute inset-3 rounded-full border border-violet-100" />
                          <div className="absolute inset-7 rounded-full border border-violet-100" />
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-lg shadow-violet-100">
                            <Icon name="wave" size={29} />
                          </div>
                        </div>
                        <h3 className="text-base font-bold">Ready to analyze</h3>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                          Your match score and analysis will appear here once you compare a recording.
                        </p>
                        <div className="mt-6 flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs text-slate-500">
                          <span className="h-2 w-2 rounded-full bg-violet-400" />
                          Waiting for audio input
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected reference */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-bold">Reference preview</h2>
                    <Icon name="music" size={19} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700">
                      <Icon name="wave" size={22} />
                    </div>
                    <div className="min-w-0">
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2">
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    Demo reference metadata. Connect your server-side reference audio files to enable playback and real analysis.
                  </p>
                </div>

                {/* How it works */}
                <div className="rounded-2xl bg-slate-900 p-6 text-white">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-violet-300">
                    <Icon name="spark" size={21} />
                  </div>
                  <h2 className="font-bold">How it works</h2>
                  <div className="mt-5 space-y-4">
                    {[
                      ["01", "Capture", "Record or upload your sound."],
                      ["02", "Compare", "Choose a reference from your library."],
                      ["03", "Analyze", "Your backend calculates similarity."],
                    ].map(([number, title, description]) => (
                      <div key={number} className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-violet-300">
                          {number}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{title}</div>
                          <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
              <span>© 2026 SoundMatch · Audio analysis workspace</span>
              <span>Built with Next.js and Tailwind CSS</span>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
