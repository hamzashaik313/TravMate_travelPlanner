"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Trip {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  createdBy: { name: string };
}

export default function MatchingTrips({ tripId }: { tripId: number }) {
  const [matchingTrips, setMatchingTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/trips/${tripId}/matching`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setMatchingTrips(data);
      } catch (err) {
        console.error("Failed to load matching trips", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, [tripId]);

  async function handleJoinRequest(targetTripId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/trips/${targetTripId}/request-join`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const text = await res.text();
    alert(text);
  }

  if (loading) return <p>Loading matching trips...</p>;
  if (!matchingTrips.length) return <p>No matching trips found.</p>;

  return (
    <div className="space-y-4 mt-4">
      <h2 className="font-semibold text-lg">Matching Trips</h2>
      {matchingTrips.map((trip) => (
        <div
          key={trip.id}
          className="border rounded-xl p-4 shadow-sm flex justify-between items-center"
        >
          <div>
            <h3 className="font-medium">{trip.title}</h3>
            <p className="text-sm text-gray-600">
              {trip.destination} ({trip.startDate} → {trip.endDate})
            </p>
            <p className="text-xs text-gray-500">By {trip.createdBy?.name}</p>
          </div>
          <Button onClick={() => handleJoinRequest(trip.id)}>
            Request to Join
          </Button>
        </div>
      ))}
    </div>
  );
}
