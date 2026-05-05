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
          bordio<span className="text-[#1e8df5]">.</span>
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

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
        >
          <GoogleIcon />
          Log in with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="whitespace-nowrap">or Log in with Email</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.6 39.6 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.6 35.6 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
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
