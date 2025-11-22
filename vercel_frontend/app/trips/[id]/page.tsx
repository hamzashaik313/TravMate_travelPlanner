// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getJson } from "@/lib/api";
// import { TripHero } from "@/components/trips/trip-hero";
// import { ItineraryPanel } from "@/components/trips/itinerary-panel";
// import { TripSummary } from "@/components/trips/trip-summary";

// import type { TripDetail } from "@/types/TripDetail";

// export default function TripDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [trip, setTrip] = useState<TripDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   const loadTrip = async () => {
//     try {
//       const data = await getJson<TripDetail>(`/api/trips/${id}`);
//       setTrip(data);
//     } catch (e) {
//       console.error(e);
//       router.push("/dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadTrip();
//   }, [id]);

//   if (loading) return <div className="p-10 text-center">Loading…</div>;
//   if (!trip) return <div className="p-10 text-center">Trip not found</div>;

//   return (
//     <div className="max-w-5xl mx-auto p-4 space-y-6">
//       {/* HERO COMPONENT */}
//       <TripHero
//         destination={trip.destination}
//         title={trip.title}
//         startDate={trip.startDate}
//         endDate={trip.endDate}
//       />

//       {/* SUMMARY BAR */}
//       <TripSummary trip={trip} onChanged={loadTrip} />

//       {/* ITINERARY */}
//       <ItineraryPanel tripId={trip.id} />
//     </div>
//   );
// }
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import MatchingTrips from "@/components/MatchingTrips";
import JoinRequestsTab from "@/components/JoinRequestsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import EditTripDialog from "@/components/EditTripDialog";
import DeleteTripConfirm from "@/components/DeleteTripConfirm";

export default function TripDetailsPage() {
  const router = useRouter();
  const params = useParams(); // could be string | string[] | undefined
  const rawId = params?.id as string | string[] | undefined;

  // normalize id (handle `/trips/[id]` and defensive cases)
  const id = useMemo(() => {
    if (!rawId) return null;
    return Array.isArray(rawId) ? rawId[0] : rawId;
  }, [rawId]);

  const [trip, setTrip] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const API = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    let cancelled = false;

    async function fetchTrip() {
      // 🔴 BUG (was): early return kept loading=true forever
      if (!id) {
        console.error("❌ Trip ID missing in route.");
        setLoading(false); // ✅ make sure we stop the spinner
        return;
      }

      try {
        console.log("📡 GET", `${API}/api/trips/${id}`);
        const res = await fetch(`${API}/api/trips/${id}`, {
          credentials: "include", // send cookies if you use cookie auth
          headers: {
            // If you use Bearer tokens instead of cookies, uncomment:
            // Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        });

        if (!res.ok) {
          const t = await res.text().catch(() => "");
          console.error("❌ Trip fetch failed:", res.status, t);
          if (!cancelled) {
            setTrip(null);
            setLoading(false);
          }
          return;
        }

        const data = await res.json();
        if (cancelled) return;

        setTrip(data);

        // ownership check
        // Backend sample you showed returns: { createdByEmail: "anas@gmail.com", ... }
        const myEmail =
          (typeof window !== "undefined" &&
            (localStorage.getItem("auth_email") ||
              localStorage.getItem("email"))) ||
          "";
        // ensure a boolean is passed to setIsOwner (avoid boolean | "" union)
        const ownerFlag =
          !!data?.createdByEmail &&
          Boolean(myEmail) &&
          data.createdByEmail.toLowerCase() === myEmail.toLowerCase();
        setIsOwner(ownerFlag);
      } catch (err) {
        console.error("⚠️ Trip load error:", err);
        if (!cancelled) setTrip(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTrip();
    return () => {
      cancelled = true;
    };
  }, [id, API]);

  if (loading)
    return <p className="p-6 text-gray-500">Loading trip details...</p>;

  if (!trip)
    return (
      <div className="p-6 text-center text-gray-600">
        <p>❌ Trip not found or you don’t have access.</p>
        <Button className="mt-4" onClick={() => router.back()}>
          ⬅ Back
        </Button>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <Button variant="outline" onClick={() => router.back()}>
        ⬅ Back
      </Button>

      {/* Hero */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-200 shadow-md">
        <img
          src={
            trip.heroImageUrl || "https://source.unsplash.com/1600x900/?travel"
          }
          alt="Trip"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
          <h1 className="text-2xl font-bold capitalize">{trip.title}</h1>
          <p className="text-sm">{trip.destination}</p>
          <p className="text-xs">
            {trip.startDate} → {trip.endDate}
          </p>
        </div>
      </div>

      {/* Summary + owner actions */}
      <div className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg capitalize">{trip.title}</h2>
          <p className="text-sm text-gray-600">
            {trip.destination} — {trip.startDate} → {trip.endDate}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Click Edit to modify trip details, or Delete to remove.
          </p>
        </div>

        {isOwner && (
          <div className="flex gap-2">
            <EditTripDialog
              trip={trip}
              onUpdated={() => window.location.reload()}
            />
            <DeleteTripConfirm
              tripId={trip.id}
              onDeleted={() => (window.location.href = "/dashboard")}
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue={isOwner ? "requests" : "matching"}
        className="w-full mt-4"
      >
        <TabsList>
          {isOwner && <TabsTrigger value="requests">Requests</TabsTrigger>}
          <TabsTrigger value="matching">Matching Trips</TabsTrigger>
        </TabsList>

        {isOwner && (
          <TabsContent value="requests">
            <JoinRequestsTab tripId={Number(id)} />
          </TabsContent>
        )}
        <TabsContent value="matching">
          <MatchingTrips tripId={Number(id)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
