"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Status = "active" | "on_hold" | "completed";

type Project = {
  id: string;
  name: string;
  owner: string;
  status: Status;
  progress: number;
  due: string;
};

const PROJECTS: Project[] = [
  { id: "PRJ-001", name: "Website Revamp", owner: "Aiman", status: "active", progress: 62, due: "2026-06-15" },
  { id: "PRJ-002", name: "Mobile App v2", owner: "Sarah", status: "active", progress: 28, due: "2026-08-30" },
  { id: "PRJ-003", name: "API Migration", owner: "Daniel", status: "on_hold", progress: 45, due: "2026-07-10" },
  { id: "PRJ-004", name: "Investor Portal", owner: "Aiman", status: "completed", progress: 100, due: "2026-04-01" },
  { id: "PRJ-005", name: "Analytics Dashboard", owner: "Mei", status: "active", progress: 80, due: "2026-05-20" },
];

const STATUS_LABEL: Record<Status, string> = {
  active: "Active",
  on_hold: "On Hold",
  completed: "Completed",
};

function StatusBadge({ status }: { status: Status }) {
  const variant =
    status === "completed"
      ? "secondary"
      : status === "on_hold"
        ? "outline"
        : "default";
  return <Badge variant={variant}>{STATUS_LABEL[status]}</Badge>;
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            All projects across your team.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-40">Progress</TableHead>
                <TableHead className="text-right">Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROJECTS.map((p) => (
                <TableRow
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => {
                    window.location.href = `/projects/${p.id}`;
                  }}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {p.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/projects/${p.id}`}
                      className="hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {p.name}
                    </Link>
                  </TableCell>
                  <TableCell>{p.owner}</TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="w-9 text-right text-xs text-muted-foreground">
                        {p.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {p.due}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
