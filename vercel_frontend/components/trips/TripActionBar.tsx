"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { API_BASE } from "@/lib/api";

type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export function TripActionBar({ trip }: { trip: Trip }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(trip.title);
  const [destination, setDestination] = useState(trip.destination);
  const [startDate, setStartDate] = useState(trip.startDate);
  const [endDate, setEndDate] = useState(trip.endDate);

  // ===========================
  // DELETE TRIP
  // ===========================
  const deleteTrip = async () => {
    if (!confirm("Delete this trip permanently?")) return;

    try {
      setLoading(true);

      await fetch(`${API_BASE}/api/trips/${trip.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      router.push("/dashboard");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // UPDATE TRIP
  // ===========================
  const saveChanges = async () => {
    try {
      setLoading(true);

      await fetch(`${API_BASE}/api/trips/${trip.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          destination,
          startDate,
          endDate,
        }),
      });

      setEditOpen(false);
      router.refresh();
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Button className="bg-black text-white" onClick={() => setEditOpen(true)}>
        Edit
      </Button>

      <Button className="bg-red-600 hover:bg-red-700" onClick={deleteTrip}>
        Delete
      </Button>

      {/* EDIT MODAL */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Trip</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
            />

            <div className="flex gap-3">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>

            <Button onClick={saveChanges} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
