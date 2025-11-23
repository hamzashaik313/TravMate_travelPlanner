"use client";

import { getStoredAuth } from "@/lib/auth-storage";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

type Json = Record<string, unknown> | unknown[];

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
  { withAuth = true }: { withAuth?: boolean } = { withAuth: true }
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (withAuth) {
    const { token } = getStoredAuth();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as unknown as T;

  // ✅ safer fallback if backend sends plain text
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

export async function postJson<T = any>(
  path: string,
  body: Json,
  opts?: { withAuth?: boolean }
) {
  return apiFetch<T>(
    path,
    { method: "POST", body: JSON.stringify(body) },
    opts
  );
}

export async function putJson<T = any>(
  path: string,
  body: Json,
  opts?: { withAuth?: boolean }
) {
  return apiFetch<T>(path, { method: "PUT", body: JSON.stringify(body) }, opts);
}

export async function del<T = any>(
  path: string,
  opts?: { withAuth?: boolean }
) {
  return apiFetch<T>(path, { method: "DELETE" }, opts);
}

// GET JSON
export async function getJson<T = any>(
  path: string,
  opts?: { withAuth?: boolean }
) {
  return apiFetch<T>(path, { method: "GET" }, opts);
}

// SWR fetcher
export const swrFetcher = (path: string) => apiFetch(path);
