"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

type Priority = "low" | "med" | "high";

type Task = {
  id: string;
  title: string;
  assignee: string;
  priority: Priority;
  due?: string;
};

type Column = {
  id: "todo" | "in_progress" | "review" | "done";
  title: string;
  tasks: Task[];
};

const COLUMNS: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "T-101", title: "Draft homepage hero copy", assignee: "AS", priority: "med", due: "May 5" },
      { id: "T-102", title: "Audit old blog posts for SEO", assignee: "MK", priority: "low" },
      { id: "T-103", title: "Set up Cypress for E2E", assignee: "DN", priority: "high", due: "May 8" },
    ],
  },
  {
    id: "in_progress",
    title: "In Progress",
    tasks: [
      { id: "T-104", title: "Migrate users table to UUID", assignee: "DN", priority: "high", due: "May 3" },
      { id: "T-105", title: "Refactor auth middleware", assignee: "AS", priority: "med" },
    ],
  },
  {
    id: "review",
    title: "In Review",
    tasks: [
      { id: "T-106", title: "Add pagination to projects list", assignee: "MK", priority: "med", due: "May 4" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "T-107", title: "Set up CI pipeline", assignee: "DN", priority: "high" },
      { id: "T-108", title: "Brand colors finalised", assignee: "AS", priority: "low" },
    ],
  },
];

const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  med: "Medium",
  high: "High",
};

function PriorityBadge({ priority }: { priority: Priority }) {
  const variant =
    priority === "high"
      ? "destructive"
      : priority === "med"
        ? "default"
        : "secondary";
  return (
    <Badge variant={variant} className="text-[10px]">
      {PRIORITY_LABEL[priority]}
    </Badge>
  );
}

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="cursor-pointer space-y-2 rounded-md border bg-card p-3 shadow-sm transition hover:border-primary/40">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={task.priority} />
          {task.due && (
            <span className="text-[11px] text-muted-foreground">{task.due}</span>
          )}
        </div>
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-[10px]">{task.assignee}</AvatarFallback>
        </Avatar>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">{task.id}</p>
    </div>
  );
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Projects
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Project {id}
          </h1>
          <p className="text-sm text-muted-foreground">
            Drag-and-drop kanban for your team&apos;s work in progress.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add task
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-3"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold">{col.title}</h2>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                  {col.tasks.length}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {col.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
