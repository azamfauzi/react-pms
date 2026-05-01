export const TOKEN_COOKIE = "auth_token";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type User = {
  id: number;
  name: string;
  email: string;
  [key: string]: unknown;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${TOKEN_COOKIE}=`));
  return match ? decodeURIComponent(match.slice(TOKEN_COOKIE.length + 1)) : null;
}

export function setToken(token: string): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function clearToken(): void {
  document.cookie = `${TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (data?.errors) {
      const first = Object.values(data.errors)[0];
      if (Array.isArray(first) && first.length > 0) return String(first[0]);
    }
    if (data?.message) return String(data.message);
  } catch {
    // ignore
  }
  return `Request failed (${res.status})`;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password, device_name: "web" }),
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  const data = (await res.json()) as LoginResponse;
  setToken(data.token);
  return data;
}

export async function fetchUser(): Promise<User> {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return (await res.json()) as User;
}

export async function logout(): Promise<void> {
  const token = getToken();
  if (!token) return;

  await fetch("/api/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  clearToken();
}
