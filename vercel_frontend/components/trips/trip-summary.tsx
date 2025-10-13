"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { putJson, del } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { TripDetail } from "@/app/trips/[id]/page"

export function TripSummary({ trip, onChanged }: { trip: TripDetail; onChanged: () => void }) {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: trip.title,
    destination: trip.destination,
    startDate: trip.startDate.substring(0, 10),
    endDate: trip.endDate.substring(0, 10),
    budget: String(trip.budget),
  })

  const save = async () => {
    setLoading(true)
    try {
      await putJson(`/api/trips/${trip.id}`, {
        title: form.title,
        destination: form.destination,
        startDate: form.startDate,
        endDate: form.endDate,
        budget: Number(form.budget),
      })
      toast({ title: "Trip updated" })
      setOpen(false)
      onChanged()
    } catch (e: any) {
      toast({ title: "Failed to update", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const remove = async () => {
    if (!confirm("Delete this trip?")) return
    try {
      await del(`/api/trips/${trip.id}`)
      toast({ title: "Trip deleted" })
      router.push("/dashboard")
    } catch (e: any) {
      toast({ title: "Failed to delete", description: e.message, variant: "destructive" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">{trip.title}</CardTitle>
        <CardDescription>
          {trip.destination} • {new Date(trip.startDate).toLocaleDateString()} →{" "}
          {new Date(trip.endDate).toLocaleDateString()} • Budget: ${trip.budget.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Trip</DialogTitle>
              <DialogDescription>Update trip details and save.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={save} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={remove}>
          Delete
        </Button>
      </CardContent>
    </Card>
  )
}
