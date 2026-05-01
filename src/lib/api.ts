import { getToken } from "./auth";

export type Project = {
  id: number;
  name: string;
  owner_id: number | null;
  owner?: { id: number; name: string } | null;
  status: "active" | "on_hold" | "completed";
  progress: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  tasks?: Task[];
};

export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "med" | "high";

export type Task = {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id: number | null;
  assignee?: { id: number; name: string } | null;
  due_date: string | null;
  position: number;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(path, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
      if (data?.errors) {
        const first = Object.values(data.errors)[0];
        if (Array.isArray(first) && first.length) message = String(first[0]);
      }
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

type ProjectMutation = {
  name?: string;
  status?: Project["status"];
  progress?: number;
  due_date?: string | null;
};

type TaskMutation = {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee_id?: number | null;
  due_date?: string | null;
};

export const api = {
  listProjects: () => request<Project[]>("/api/projects"),
  getProject: (id: number | string) => request<Project>(`/api/projects/${id}`),
  createProject: (body: ProjectMutation & { name: string }) =>
    request<Project>("/api/projects", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateProject: (id: number | string, body: ProjectMutation) =>
    request<Project>(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deleteProject: (id: number | string) =>
    request<{ deleted: boolean }>(`/api/projects/${id}`, { method: "DELETE" }),

  createTask: (
    projectId: number | string,
    body: TaskMutation & { title: string },
  ) =>
    request<Task>(`/api/projects/${projectId}/tasks`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateTask: (
    projectId: number | string,
    taskId: number,
    body: TaskMutation,
  ) =>
    request<Task>(`/api/projects/${projectId}/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  deleteTask: (projectId: number | string, taskId: number) =>
    request<{ deleted: boolean }>(
      `/api/projects/${projectId}/tasks/${taskId}`,
      { method: "DELETE" },
    ),
  reorderTasks: (
    projectId: number | string,
    tasks: { id: number; status: TaskStatus; position: number }[],
  ) =>
    request<{ tasks: Task[] }>(`/api/projects/${projectId}/tasks/reorder`, {
      method: "PATCH",
      body: JSON.stringify({ tasks }),
    }),
};
