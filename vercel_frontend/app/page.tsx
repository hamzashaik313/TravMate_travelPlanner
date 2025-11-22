"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getJson } from "@/lib/api";
import { AppHeader } from "@/components/header";
import { TripSummary } from "@/components/trips/trip-summary";
import { TripHero } from "@/components/trips/trip-hero";
import { ItineraryPanel } from "@/components/trips/itinerary-panel";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useToast } from "@/hooks/use-toast";
import type { TripDetail } from "@/types/TripDetail";

export default function TripDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch trip data
  const fetchTrip = async () => {
    try {
      setLoading(true);
      const data = await getJson(`/api/trips/${id}`);
      setTrip(data);
    } catch (e: any) {
      console.error("Failed to fetch trip:", e);
      toast({
        title: "Trip not found",
        description: "This trip doesn't exist or may have been deleted.",
        variant: "destructive",
      });
      setTrip(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTrip();
  }, [id]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-lg text-gray-600">
        Loading trip details...
      </div>
    );

  if (!trip)
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Trip not found
      </div>
    );

  return (
    <div className="min-h-dvh flex flex-col">
      <AppHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 space-y-6">
        <TripHero
          destination={trip.destination}
          title={trip.title}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />
        <TripSummary trip={trip} onChanged={fetchTrip} />

        <GlassPanel>
          <ItineraryPanel tripId={String(trip.id)} />
        </GlassPanel>
      </main>
    </div>
  );
}
