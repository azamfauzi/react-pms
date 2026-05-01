"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUser, getToken, type User } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STAT_CARDS = [
  { label: "Active Projects", value: "12" },
  { label: "Open Tasks", value: "47" },
  { label: "Overdue", value: "3" },
  { label: "Team Members", value: "8" },
];

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {user ? `Welcome back, ${user.name}` : "Dashboard"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening across your projects.
        </p>
      </div>

      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6 text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <Card key={card.label}>
            <CardHeader className="pb-2">
              <CardDescription>{card.label}</CardDescription>
              <CardTitle className="text-3xl">{card.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Signed in as {user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded bg-muted p-4 text-xs">
              {JSON.stringify(user, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
