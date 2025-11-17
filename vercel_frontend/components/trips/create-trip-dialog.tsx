"use client";

import type React from "react";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { postJson } from "@/lib/api";
import { mutate } from "swr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CreateTripDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await postJson("/api/trips", {
        title: form.title,
        destination: form.destination,
        startDate: form.startDate,
        endDate: form.endDate,
      });

      toast({ title: "Trip created" });
      setOpen(false);

      setForm({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
      });

      mutate("/api/trips");
    } catch (e: any) {
      toast({
        title: "Failed to create trip",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plan New Trip</DialogTitle>
          <DialogDescription>
            Enter trip details and create your new adventure.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              value={form.destination}
              onChange={(e) =>
                setForm({ ...form, destination: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
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
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading ? "Creating..." : "Create Trip"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
