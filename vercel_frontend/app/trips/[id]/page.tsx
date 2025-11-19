//trips/id/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { swrFetcher } from "@/lib/api";
import { useAuth } from "@/components/auth/auth-context";
import { AppHeader } from "@/components/header";
import { TripSummary } from "@/components/trips/trip-summary";
import { ItineraryPanel } from "@/components/trips/itinerary-panel";
import { TripHero } from "@/components/trips/trip-hero";

export type TripDetail = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export default function TripDetailPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const tripId = params?.id as string;

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  const {
    data: trip,
    error,
    isLoading,
    mutate,
  } = useSWR<TripDetail>(tripId ? `/api/trips/${tripId}` : null, swrFetcher);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-dvh flex flex-col">
      <AppHeader />

      {/* ⭐ Add trip hero */}
      {trip && (
        <div className="px-4 pb-4">
          <TripHero
            destination={trip.destination}
            title={trip.title}
            startDate={trip.startDate}
            endDate={trip.endDate}
          />
        </div>
      )}

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {isLoading && (
          <div className="text-muted-foreground">Loading trip...</div>
        )}
        {error && <div className="text-destructive">Failed to load trip.</div>}

        {trip && (
          <div className="grid gap-6">
            <TripSummary trip={trip} onChanged={() => mutate()} />
            <ItineraryPanel tripId={trip.id} />
          </div>
        )}
      </main>
    </div>
  );
}
