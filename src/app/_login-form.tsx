"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      const dest = next && next.startsWith("/") ? next : "/dashboard";
      router.push(dest);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10"
      style={{
        backgroundColor: "#0c1a45",
        backgroundImage:
          "linear-gradient(115deg, transparent 0 38%, rgba(255,255,255,0.04) 38% 39%, transparent 39% 60%, rgba(255,255,255,0.04) 60% 61%, transparent 61%)",
      }}
    >
      <div className="mb-8 flex items-center gap-2">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
          <path d="M8 6 L24 18 L8 30 Z" fill="#1e8df5" />
          <path d="M8 6 L24 18 L8 30 Z" fill="url(#bg)" opacity="0.35" />
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-3xl font-semibold tracking-tight text-white">
          MIDA<span className="text-[#1e8df5]">-</span>PMS
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10"
      >
        <h1 className="mb-8 text-center text-2xl font-semibold text-gray-900">
          Log In
        </h1>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#1e8df5]/40"
          />
          <input
            type="password"
            required
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#1e8df5]/40"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-full bg-[#7cc4ff] py-3 text-base font-medium text-white shadow-sm transition hover:bg-[#5fb4f7] disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log In"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Forgot password?{" "}
          <a href="#" className="font-medium text-[#1e8df5] hover:underline">
            Reset
          </a>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-medium text-[#1e8df5] hover:underline">
            Sign up
          </a>
        </p>
      </form>

      <button
        type="button"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm text-white/90 backdrop-blur transition hover:bg-white/15"
      >
        <GlobeIcon />
        English
        <ChevronDownIcon />
      </button>
    </main>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0 -18" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
