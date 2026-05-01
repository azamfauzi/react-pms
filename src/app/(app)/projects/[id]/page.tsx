"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { ArrowLeft, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { api, type Project, type Task, type TaskStatus } from "@/lib/api";

const COLUMN_ORDER: TaskStatus[] = ["todo", "in_progress", "review", "done"];
const COLUMN_TITLE: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  review: "In Review",
  done: "Done",
};
const PRIORITY_LABEL: Record<Task["priority"], string> = {
  low: "Low",
  med: "Medium",
  high: "High",
};

function PriorityBadge({ priority }: { priority: Task["priority"] }) {
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

function initials(name?: string | null): string {
  if (!name) return "?";
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function DraggableTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id.toString(),
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`space-y-2 rounded-md border bg-card p-3 shadow-sm transition hover:border-primary/40 ${isDragging ? "opacity-40" : ""}`}
      style={{ touchAction: "none" }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        <button
          className="text-muted-foreground hover:text-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={task.priority} />
          {task.due_date && (
            <span className="text-[11px] text-muted-foreground">
              {task.due_date}
            </span>
          )}
        </div>
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-[10px]">
            {initials(task.assignee?.name)}
          </AvatarFallback>
        </Avatar>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">T-{task.id}</p>
    </div>
  );
}

function Column({
  status,
  tasks,
}: {
  status: TaskStatus;
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-3 rounded-lg border bg-muted/40 p-3 transition ${isOver ? "border-primary/60 bg-primary/5" : ""}`}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{COLUMN_TITLE[status]}</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex min-h-[60px] flex-col gap-2">
        {tasks.map((task) => (
          <DraggableTaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  useEffect(() => {
    api
      .getProject(id)
      .then((p) => {
        setProject(p);
        setTasks(p.tasks ?? []);
      })
      .catch((err: Error) => setError(err.message));
  }, [id]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newStatus = over.id as TaskStatus;
    const moving = tasks.find((t) => t.id === taskId);
    if (!moving || moving.status === newStatus) return;

    const others = tasks.filter((t) => t.id !== taskId);
    const inTarget = others.filter((t) => t.status === newStatus);
    const updated: Task = {
      ...moving,
      status: newStatus,
      position: inTarget.length,
    };
    const next = [...others, updated];
    setTasks(next);

    const payload = COLUMN_ORDER.flatMap((col) =>
      next
        .filter((t) => t.status === col)
        .sort((a, b) => a.position - b.position)
        .map((t, idx) => ({ id: t.id, status: col, position: idx })),
    );

    api.reorderTasks(id, payload).catch((err: Error) => {
      setError(err.message);
    });
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="pt-6 text-sm text-destructive">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (!project) {
    return (
      <p className="text-sm text-muted-foreground">Loading project…</p>
    );
  }

  const grouped: Record<TaskStatus, Task[]> = {
    todo: [],
    in_progress: [],
    review: [],
    done: [],
  };
  for (const t of tasks) grouped[t.status].push(t);
  for (const col of COLUMN_ORDER) {
    grouped[col].sort((a, b) => a.position - b.position);
  }

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
            {project.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Drag cards between columns to update status.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add task
        </Button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COLUMN_ORDER.map((status) => (
            <Column key={status} status={status} tasks={grouped[status]} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
