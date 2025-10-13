"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-context"
import { AppHeader } from "@/components/header"
import { TripTable } from "@/components/trips/trip-table"
import { CreateTripDialog } from "@/components/trips/create-trip-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DashboardPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.replace("/")
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-dvh flex flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Trip Dashboard</h2>
          <CreateTripDialog>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {"+ Plan New Trip"}
            </Button>
          </CreateTripDialog>
        </div>
        <TripTable />
      </main>
    </div>
  )
}
