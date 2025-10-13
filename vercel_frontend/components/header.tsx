"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-context"
import { Button } from "@/components/ui/button"

export function AppHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="w-full border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="font-medium">
          {user?.name ? `Hi, ${user.name}` : user?.email ? `Hi, ${user.email}` : "Travmate"}
        </div>
        <Button variant="outline" onClick={handleLogout} aria-label="Log out">
          Log Out
        </Button>
      </div>
    </header>
  )
}
