"use client"

import { getStoredAuth } from "@/lib/auth-storage"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || ""

type Json = Record<string, unknown> | unknown[]

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
  { withAuth = true }: { withAuth?: boolean } = { withAuth: true },
): Promise<T> {
  const url = `${API_BASE}${path}`
  const headers = new Headers(options.headers || {})
  headers.set("Content-Type", "application/json")
  if (withAuth) {
    const { token } = getStoredAuth()
    if (token) headers.set("Authorization", `Bearer ${token}`)
  }
  const res = await fetch(url, { ...options, headers })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || `Request failed: ${res.status}`)
  }
  // no content
  if (res.status === 204) return undefined as unknown as T
  return (await res.json()) as T
}

export async function postJson<T = any>(path: string, body: Json, opts?: { withAuth?: boolean }) {
  return apiFetch<T>(path, { method: "POST", body: JSON.stringify(body) }, opts)
}

export async function putJson<T = any>(path: string, body: Json, opts?: { withAuth?: boolean }) {
  return apiFetch<T>(path, { method: "PUT", body: JSON.stringify(body) }, opts)
}

export async function del<T = any>(path: string, opts?: { withAuth?: boolean }) {
  return apiFetch<T>(path, { method: "DELETE" }, opts)
}

// SWR fetcher that takes a relative API path
export const swrFetcher = (path: string) => apiFetch(path)
