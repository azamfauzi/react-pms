"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowLeft,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProjectDialog } from "@/components/project-dialog";
import { TaskDialog } from "@/components/task-dialog";
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

function TaskCardBody({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="space-y-2 rounded-md border bg-card p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        {(onEdit || onDelete) && (
          <div onPointerDown={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={onEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={onDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={task.priority} />
          {task.due_date && (
            <span className="text-[11px] text-muted-foreground">
              {task.due_date.slice(0, 10)}
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

function SortableTaskCard({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id.toString() });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCardBody task={task} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function Column({
  status,
  tasks,
  onAdd,
  onEditTask,
  onDeleteTask,
}: {
  status: TaskStatus;
  tasks: Task[];
  onAdd: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}) {
  const ids = tasks.map((t) => t.id.toString());
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{COLUMN_TITLE[status]}</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <button
          className="text-muted-foreground hover:text-foreground"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="flex min-h-[60px] flex-col gap-2">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function KanbanSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {COLUMN_ORDER.map((s) => (
        <div
          key={s}
          className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-3"
        >
          <div className="flex items-center gap-2 px-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-6 rounded-full" />
          </div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2 rounded-md border bg-card p-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [confirmDeleteProject, setConfirmDeleteProject] = useState(false);

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [taskDialogStatus, setTaskDialogStatus] = useState<TaskStatus>("todo");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  async function load() {
    try {
      const p = await api.getProject(id);
      setProject(p);
      setTasks(p.tasks ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load project");
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id.toString());
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id.toString() === active.id);
    if (!activeTask) return;

    const overTask = tasks.find((t) => t.id.toString() === over.id);
    const targetStatus: TaskStatus = overTask
      ? overTask.status
      : activeTask.status;

    const sourceList = tasks
      .filter((t) => t.status === activeTask.status)
      .sort((a, b) => a.position - b.position);
    const targetList = tasks
      .filter((t) => t.status === targetStatus)
      .sort((a, b) => a.position - b.position);

    let next: Task[];
    if (activeTask.status === targetStatus) {
      const oldIndex = sourceList.findIndex((t) => t.id === activeTask.id);
      const newIndex = overTask
        ? sourceList.findIndex((t) => t.id === overTask.id)
        : oldIndex;
      if (oldIndex === newIndex) return;
      const reordered = arrayMove(sourceList, oldIndex, newIndex).map(
        (t, idx) => ({ ...t, position: idx }),
      );
      next = tasks
        .filter((t) => t.status !== targetStatus)
        .concat(reordered);
    } else {
      const moved: Task = { ...activeTask, status: targetStatus };
      const insertIndex = overTask
        ? targetList.findIndex((t) => t.id === overTask.id)
        : targetList.length;
      const newTarget = [
        ...targetList.slice(0, insertIndex),
        moved,
        ...targetList.slice(insertIndex),
      ].map((t, idx) => ({ ...t, position: idx }));
      const newSource = sourceList
        .filter((t) => t.id !== activeTask.id)
        .map((t, idx) => ({ ...t, position: idx }));
      next = tasks
        .filter(
          (t) =>
            t.status !== activeTask.status && t.status !== targetStatus,
        )
        .concat(newSource, newTarget);
    }

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

  async function handleDeleteProject() {
    try {
      await api.deleteProject(id);
      router.push("/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
      setConfirmDeleteProject(false);
    }
  }

  async function handleConfirmDeleteTask() {
    if (!deletingTask) return;
    try {
      await api.deleteTask(id, deletingTask.id);
      setDeletingTask(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
    }
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
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <KanbanSkeleton />
      </div>
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

  const activeTask = activeId
    ? tasks.find((t) => t.id.toString() === activeId) ?? null
    : null;

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
            Drag cards within or between columns. Changes save automatically.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setTaskDialogStatus("todo");
              setEditingTask(null);
              setTaskDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add task
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-sm hover:bg-muted hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setProjectDialogOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit project
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setConfirmDeleteProject(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ProjectDialog
        open={projectDialogOpen}
        onOpenChange={setProjectDialogOpen}
        project={project}
        onSaved={load}
      />

      <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        projectId={id}
        task={editingTask}
        defaultStatus={taskDialogStatus}
        onSaved={load}
      />

      <AlertDialog
        open={confirmDeleteProject}
        onOpenChange={setConfirmDeleteProject}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{project.name}&rdquo; and all of its tasks will be
              permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!deletingTask}
        onOpenChange={(open) => !open && setDeletingTask(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              {deletingTask?.title &&
                `"${deletingTask.title}" will be permanently deleted.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteTask}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COLUMN_ORDER.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={grouped[status]}
              onAdd={() => {
                setTaskDialogStatus(status);
                setEditingTask(null);
                setTaskDialogOpen(true);
              }}
              onEditTask={(task) => {
                setEditingTask(task);
                setTaskDialogOpen(true);
              }}
              onDeleteTask={(task) => setDeletingTask(task)}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? <TaskCardBody task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
