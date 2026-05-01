"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUser, getToken, logout, type User } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    fetchUser()
      .then(setUser)
      .catch((err: Error) => {
        setError(err.message);
        if (err.message.toLowerCase().includes("unauthenticated")) {
          router.replace("/login");
        }
      });
  }, [router]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 dark:bg-gray-950">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Log out
          </button>
        </div>

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        {user ? (
          <pre className="overflow-auto rounded border border-gray-200 bg-white p-4 text-sm text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
            {JSON.stringify(user, null, 2)}
          </pre>
        ) : (
          !error && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
          )
        )}
      </div>
    </main>
  );
}
