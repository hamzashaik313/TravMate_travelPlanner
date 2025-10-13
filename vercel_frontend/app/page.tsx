"use client"

import { AuthCard } from "@/components/auth/auth-card"

export default function Page() {
  return (
    <main className="min-h-dvh bg-[color:var(--color-secondary)]">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-16">
        <div className="w-full">
          <div className="mx-auto mb-8 max-w-xl text-center">
            <h1 className="text-3xl font-semibold text-balance">Your next adventure starts here</h1>
            <p className="mt-2 text-muted-foreground">
              Sign up or log in to plan trips, generate itineraries, and discover places.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <AuthCard />
          </div>
        </div>
      </div>
    </main>
  )
}
