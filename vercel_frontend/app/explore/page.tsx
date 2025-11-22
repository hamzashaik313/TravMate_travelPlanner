"use client";

import { useState } from "react";
import { API_BASE, getJson } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<any[]>([]);

  const searchTrips = async () => {
    if (!destination || !start || !end) return;
    setLoading(true);

    try {
      const res = await getJson(
        `/api/trips/search?destination=${encodeURIComponent(
          destination
        )}&start=${start}&end=${end}`
      );

      setResults(res);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">Explore Trips</h1>

      {/* SEARCH BOX */}
      <div className="p-4 bg-white/40 rounded-xl backdrop-blur-lg flex flex-col gap-4 border border-white/60 shadow-lg">
        <input
          type="text"
          placeholder="Destination"
          className="p-3 rounded-lg border"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <div className="flex gap-4">
          <input
            type="date"
            className="p-3 rounded-lg border flex-1"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            type="date"
            className="p-3 rounded-lg border flex-1"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <button
          onClick={searchTrips}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* RESULTS */}
      <div className="space-y-4">
        {loading && <p className="text-center">Searching…</p>}

        {!loading && results.length === 0 && (
          <p className="text-gray-600 text-center">No trips found yet.</p>
        )}

        {results.map((trip) => (
          <div
            key={trip.id}
            className="
              p-4 bg-white/50 backdrop-blur-lg rounded-xl 
              border border-white/60 shadow-lg
              flex justify-between items-center
            "
          >
            <div>
              <p className="text-lg font-semibold">{trip.title}</p>
              <p className="text-sm text-gray-700">{trip.destination}</p>
              <p className="text-xs text-gray-500">
                {trip.startDate} → {trip.endDate}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/trips/${trip.id}`)}
                className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
