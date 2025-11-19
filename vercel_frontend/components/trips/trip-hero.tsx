"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { MapPin, Calendar } from "lucide-react";

export function TripHero({
  destination,
  title,
  startDate,
  endDate,
}: {
  destination: string;
  title: string;
  startDate: string;
  endDate: string;
}) {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `${API_BASE}/api/places/photo?destination=${encodeURIComponent(
        destination
      )}`
    )
      .then((res) => res.json())
      .then((data) => setPhoto(data?.photo ?? null))
      .catch(() => {});
  }, [destination]);

  return (
    <div className="relative w-full h-60 md:h-72 lg:h-80 rounded-3xl overflow-hidden shadow-xl bg-gray-300">
      {/* IMAGE */}
      {photo ? (
        <img
          src={photo}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gray-300 animate-pulse" />
      )}

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-5 left-6 space-y-2 text-white drop-shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>

        <p className="flex items-center gap-2 text-sm md:text-base opacity-90">
          <MapPin size={18} />
          {destination}
        </p>

        <p className="flex items-center gap-2 text-sm md:text-base opacity-90">
          <Calendar size={18} />
          {new Date(startDate).toLocaleDateString()} →{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
