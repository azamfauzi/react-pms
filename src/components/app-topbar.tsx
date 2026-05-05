"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { logout } from "@/lib/auth";

export function AppTopbar() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/");
  }

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="text-sm text-muted-foreground">Project Management</div>
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </header>
  );
}
