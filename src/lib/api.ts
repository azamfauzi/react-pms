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

export const api = {
  listProjects: () => request<Project[]>("/api/projects"),
  getProject: (id: number | string) => request<Project>(`/api/projects/${id}`),
  createProject: (body: {
    name: string;
    status?: Project["status"];
    progress?: number;
    due_date?: string | null;
  }) =>
    request<Project>("/api/projects", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  reorderTasks: (
    projectId: number | string,
    tasks: { id: number; status: TaskStatus; position: number }[],
  ) =>
    request<{ tasks: Task[] }>(`/api/projects/${projectId}/tasks/reorder`, {
      method: "PATCH",
      body: JSON.stringify({ tasks }),
    }),
};
