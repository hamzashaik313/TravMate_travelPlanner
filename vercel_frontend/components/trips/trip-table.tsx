"use client"

import useSWR from "swr"
import { swrFetcher } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export type Trip = {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  budget: number
}

export function TripTable() {
  const { data, error, isLoading } = useSWR<Trip[]>("/api/trips", swrFetcher)
  const router = useRouter()

  if (isLoading) return <div className="text-muted-foreground">Loading trips...</div>
  if (error) return <div className="text-destructive">Failed to load trips.</div>

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data ?? []).map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>{trip.title}</TableCell>
              <TableCell>{trip.destination}</TableCell>
              <TableCell>{new Date(trip.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(trip.endDate).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline" onClick={() => router.push(`/trips/${trip.id}`)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {(!data || data.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No trips yet. Click “+ Plan New Trip” to create one.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
