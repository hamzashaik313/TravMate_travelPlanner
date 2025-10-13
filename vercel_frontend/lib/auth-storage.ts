"use client"

type StoredUser = { name?: string; email?: string } | null

const TOKEN_KEY = "travmate_token"
const USER_KEY = "travmate_user"

export function getStoredAuth(): { token: string | null; user: StoredUser } {
  if (typeof window === "undefined") return { token: null, user: null }
  const token = window.localStorage.getItem(TOKEN_KEY)
  const userRaw = window.localStorage.getItem(USER_KEY)
  const user = userRaw ? (JSON.parse(userRaw) as StoredUser) : null
  return { token, user }
}

export function setStoredAuth(token: string, user: StoredUser) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(TOKEN_KEY, token)
  window.localStorage.setItem(USER_KEY, JSON.stringify(user ?? null))
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
}
