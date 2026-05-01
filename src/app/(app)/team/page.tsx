"use client";

import { Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

type Member = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  status: "online" | "away" | "offline";
  projects: number;
};

const MEMBERS: Member[] = [
  { id: "u1", name: "Aiman Salleh", initials: "AS", role: "Product Designer", email: "aiman@example.com", status: "online", projects: 4 },
  { id: "u2", name: "Sarah Lim", initials: "SL", role: "Engineering Lead", email: "sarah@example.com", status: "online", projects: 6 },
  { id: "u3", name: "Daniel Ng", initials: "DN", role: "Backend Engineer", email: "daniel@example.com", status: "away", projects: 3 },
  { id: "u4", name: "Mei Tan", initials: "MK", role: "Marketing", email: "mei@example.com", status: "offline", projects: 2 },
  { id: "u5", name: "Faiz Rahman", initials: "FR", role: "QA Engineer", email: "faiz@example.com", status: "online", projects: 3 },
  { id: "u6", name: "Priya Devi", initials: "PD", role: "Project Manager", email: "priya@example.com", status: "away", projects: 5 },
];

const STATUS_COLOR: Record<Member["status"], string> = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-muted-foreground",
};

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground">
            People working with you across projects.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite member
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEMBERS.map((m) => (
          <Card key={m.id}>
            <CardHeader className="flex-row items-center gap-3 pb-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{m.initials}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-background ${STATUS_COLOR[m.status]}`}
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium">{m.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {m.role}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <a
                href={`mailto:${m.email}`}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-3 w-3" />
                <span className="truncate">{m.email}</span>
              </a>
              <div className="flex items-center justify-between pt-1">
                <Badge variant="secondary">{m.projects} projects</Badge>
                <span className="text-xs capitalize text-muted-foreground">
                  {m.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
