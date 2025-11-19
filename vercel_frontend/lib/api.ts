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

  return (await res.json()) as T;
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

// SWR fetcher
export const swrFetcher = (path: string) => apiFetch(path);

// //modern
// // lib/api.ts
// "use client";

// import { getStoredAuth } from "@/lib/auth-storage";

// export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || ""; // e.g. "http://localhost:8080"

// type Json = Record<string, unknown> | unknown[];

// async function toTextSafe(res: Response) {
//   try {
//     return await res.text();
//   } catch {
//     return "";
//   }
// }

// export async function apiFetch<T = any>(
//   path: string,
//   options: RequestInit = {},
//   { withAuth = true }: { withAuth?: boolean } = { withAuth: true }
// ): Promise<T> {
//   const url = `${API_BASE}${path}`;
//   const headers = new Headers(options.headers || {});
//   if (!headers.get("Content-Type") && !(options.body instanceof FormData)) {
//     headers.set("Content-Type", "application/json");
//   }
//   if (withAuth) {
//     try {
//       const { token } = getStoredAuth();
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//     } catch {
//       // ignore if no storage (server) or storage error
//     }
//   }

//   const res = await fetch(url, { ...options, headers });

//   // handle non-ok
//   if (!res.ok) {
//     const text = await toTextSafe(res);
//     throw new Error(text || `Request failed: ${res.status}`);
//   }

//   // No content
//   if (res.status === 204) {
//     return undefined as unknown as T;
//   }

//   // Try parse JSON
//   try {
//     return (await res.json()) as T;
//   } catch (e) {
//     throw new Error("Invalid JSON response");
//   }
// }

// export async function postJson<T = any>(
//   path: string,
//   body: Json,
//   opts?: { withAuth?: boolean }
// ) {
//   return apiFetch<T>(
//     path,
//     { method: "POST", body: JSON.stringify(body) },
//     opts
//   );
// }

// export async function putJson<T = any>(
//   path: string,
//   body: Json,
//   opts?: { withAuth?: boolean }
// ) {
//   return apiFetch<T>(path, { method: "PUT", body: JSON.stringify(body) }, opts);
// }

// export async function del<T = any>(
//   path: string,
//   opts?: { withAuth?: boolean }
// ) {
//   return apiFetch<T>(path, { method: "DELETE" }, opts);
// }

// // SWR fetcher uses relative path (apiFetch will prefix API_BASE)
// export const swrFetcher = (path: string) => apiFetch(path);
