"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { clearStoredAuth, getStoredAuth, setStoredAuth } from "@/lib/auth-storage"

type User = { name?: string; email?: string } | null

type AuthContextValue = {
  token: string | null
  user: User
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const { token, user } = getStoredAuth()
    if (token) setToken(token)
    if (user) setUser(user)
  }, [])

  const login = (newToken: string, newUser: User) => {
    setToken(newToken)
    setUser(newUser ?? null)
    setStoredAuth(newToken, newUser ?? null)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    clearStoredAuth()
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      login,
      logout,
      setUser,
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
