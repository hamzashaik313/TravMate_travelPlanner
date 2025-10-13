"use client"

import { useState } from "react"
import { postJson } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type ItineraryItem = {
  dayNumber: number
  activity: string
  estimatedCost: number
}

export function ItineraryPanel({ tripId }: { tripId: string }) {
  const { toast } = useToast()
  const [items, setItems] = useState<ItineraryItem[] | null>(null)
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await postJson<ItineraryItem[]>(`/api/itinerary/generate/${tripId}`, {})
      setItems(res || [])
      toast({ title: "Itinerary generated" })
    } catch (e: any) {
      toast({ title: "Failed to generate", description: e.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle>Itinerary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generate} disabled={loading}>
          {loading ? "Generating..." : "Generate Itinerary"}
        </Button>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Estimated Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(items ?? []).map((it, idx) => (
                <TableRow key={`${it.dayNumber}-${idx}`}>
                  <TableCell>{it.dayNumber}</TableCell>
                  <TableCell>{it.activity}</TableCell>
                  <TableCell>${Number(it.estimatedCost).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {(!items || items.length === 0) && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No itinerary yet. Click “Generate Itinerary”.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
