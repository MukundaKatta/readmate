"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";

const SENTENCE = "I sat there with Sally and we sat there, we two, and I said how I wish we had something to do.";
const WORDS = SENTENCE.split(" ");
const WORD_INTERVAL_MS = 400;

type Phase = "idle" | "reading" | "listening" | "done";

export default function TryPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleCount, setVisibleCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  function handleReadAloud() {
    setPhase("reading");
    setVisibleCount(0);
    let count = 0;
    clearTimer();
    intervalRef.current = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= WORDS.length) {
        clearTimer();
        setPhase("listening");
      }
    }, WORD_INTERVAL_MS);
  }

  function handleContinue() {
    setPhase("done");
  }

  function handleRestart() {
    setPhase("idle");
    setVisibleCount(0);
    clearTimer();
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
          ReadMate
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-600">
            Reading session
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Read aloud. We follow along.
          </h1>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="border-b border-neutral-200 pb-3 mb-5 text-xs font-semibold uppercase tracking-wider text-rose-600">
            The Cat in the Hat · page 4
          </div>

          {phase === "idle" && (
            <div className="text-center py-8">
              <p className="text-lg leading-relaxed text-neutral-600 mb-8">
                Press the button below, then read the sentence aloud as the words appear.
              </p>
              <button
                onClick={handleReadAloud}
                className="rounded-full bg-rose-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-rose-700"
              >
                Read Aloud
              </button>
            </div>
          )}

          {(phase === "reading" || phase === "listening") && (
            <div>
              <p className="text-xl leading-relaxed min-h-[4rem]">
                {WORDS.map((word, i) => (
                  <span
                    key={i}
                    className={`inline-block mr-1.5 transition-opacity duration-300 ${
                      i < visibleCount ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </p>

              {phase === "listening" && (
                <div className="mt-6">
                  <div className="rounded-xl bg-rose-50 p-4 text-sm text-rose-900 mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1">
                      Coach
                    </div>
                    Nice reading! You kept a steady pace. In the full version, ReadMate will listen
                    to you and give real-time feedback.
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}

          {phase === "done" && (
            <div className="text-center py-8">
              <p className="text-4xl font-bold text-neutral-900 mb-3">Well done!</p>
              <p className="text-neutral-600 mb-8">
                That was a preview of the ReadMate reading flow. Speech recognition and real-time
                coaching are coming soon.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={handleRestart}
                  className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
                >
                  Try again
                </button>
                <Link
                  href="/#waitlist"
                  className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-900 transition hover:border-neutral-900"
                >
                  Get early access
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview — speech recognition is not yet active.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the full experience.
        </p>
      </div>
    </div>
  );
}
