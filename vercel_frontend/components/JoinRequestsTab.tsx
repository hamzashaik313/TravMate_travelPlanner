"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Request {
  id: number;
  user: { name: string };
  status: string;
}

export default function JoinRequestsTab({ tripId }: { tripId: number }) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/trips/${tripId}/requests`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    setRequests(data);
    setLoading(false);
  }

  async function handleResponse(requestId: number, accept: boolean) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/trips/requests/${requestId}/respond?accept=${accept}`,
      { method: "POST", credentials: "include" }
    );
    const text = await res.text();
    alert(text);
    fetchRequests();
  }

  useEffect(() => {
    fetchRequests();
  }, [tripId]);

  if (loading) return <p>Loading requests...</p>;
  if (!requests.length) return <p>No pending requests.</p>;

  return (
    <div className="space-y-4 mt-4">
      {requests.map((req) => (
        <div
          key={req.id}
          className="flex justify-between items-center border p-3 rounded-xl"
        >
          <div>
            <p className="font-medium">{req.user.name}</p>
            <p className="text-sm text-gray-500">requested to join your trip</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={() => handleResponse(req.id, true)}
            >
              Accept
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleResponse(req.id, false)}
            >
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
