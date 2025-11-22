"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DeleteTripConfirmProps {
  tripId: number;
  onDeleted: () => void;
}

export default function DeleteTripConfirm({
  tripId,
  onDeleted,
}: DeleteTripConfirmProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/trips/${tripId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        alert("🗑️ Trip deleted successfully!");
        setOpen(false);
        onDeleted();
      } else {
        alert("❌ Failed to delete trip.");
      }
    } catch (err) {
      console.error("Error deleting trip:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[380px] shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to permanently delete this trip?
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
