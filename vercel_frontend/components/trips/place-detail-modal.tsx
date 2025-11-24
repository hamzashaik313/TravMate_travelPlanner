"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { MapPin, ExternalLink, Star } from "lucide-react";

type Review = {
  author_name?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
};

type PlaceDetails = {
  name: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  website?: string;
  url?: string;
  photos?: string[];
  reviews?: Review[];
};

export function PlaceDetailModal({
  isOpen,
  onClose,
  activityName,
}: {
  isOpen: boolean;
  onClose: () => void;
  activityName: string;
}) {
  const [details, setDetails] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen || !activityName) return;

    setLoading(true);

    fetch(
      `${API_BASE}/api/places/details?query=${encodeURIComponent(activityName)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "OK") {
          setDetails(data.result);
        } else {
          setDetails(null);
        }
      })
      .finally(() => setLoading(false));
  }, [isOpen, activityName]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-0">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle className="text-xl font-semibold">
            {activityName}
          </DialogTitle>
          <DialogDescription>Google Places information</DialogDescription>
        </DialogHeader>

        {loading && <p className="p-6">Loading…</p>}

        {!loading && details && (
          <div className="p-6 space-y-6">
            {/* ===== PHOTOS GRID ===== */}
            {details.photos?.length ? (
              <div className="grid grid-cols-3 gap-2">
                {details.photos.map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    className="rounded-xl h-28 w-full object-cover cursor-pointer hover:scale-[1.03] transition"
                    onClick={() => setPhotoIndex(i)}
                  />
                ))}
              </div>
            ) : null}

            {/* ===== ADDRESS ===== */}
            <div>
              <p className="flex items-center gap-2 text-gray-700 font-medium">
                <MapPin size={18} />
                {details.formatted_address}
              </p>
            </div>

            {/* ===== RATING ===== */}
            {details.rating && (
              <p className="flex items-center gap-1 text-gray-800">
                <Star size={18} className="text-yellow-500" />
                {details.rating} ({details.user_ratings_total} reviews)
              </p>
            )}

            {/* ===== LINKS ===== */}
            <div className="space-y-2 mt-2">
              {details.website && (
                <a
                  href={details.website}
                  target="_blank"
                  className="text-blue-600 flex items-center gap-1 hover:underline"
                >
                  Visit Website <ExternalLink size={16} />
                </a>
              )}

              {details.url && (
                <a
                  href={details.url}
                  target="_blank"
                  className="text-blue-600 flex items-center gap-1 hover:underline"
                >
                  View on Google Maps <ExternalLink size={16} />
                </a>
              )}
            </div>

            {/* ===== REVIEWS ===== */}
            {details.reviews?.length ? (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Reviews</h2>
                {details.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="border rounded-xl p-4 bg-gray-50 text-gray-800"
                  >
                    <p className="font-semibold">{r.author_name}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {r.relative_time_description}
                    </p>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </DialogContent>

      {/* ===== FULLSCREEN PHOTO VIEWER ===== */}
      {/* ===== FULLSCREEN PHOTO VIEWER ===== */}
      {/* ===== FULLSCREEN PHOTO VIEWER (TRULY FULLSCREEN) ===== */}
      {/* ===== FIXED FULLSCREEN PHOTO VIEWER ===== */}
      {/* ===== TRUE FULLSCREEN PHOTO VIEWER ===== */}
      {/* ===== ABSOLUTE FULLSCREEN PHOTO VIEWER ===== */}
      {/* ===== FULLSCREEN PHOTO VIEWER WITH SOFT CURVES ===== */}
      {photoIndex !== null && details?.photos && (
        <div className="fixed inset-0 z-[999999] bg-black/95 flex items-center justify-center overflow-hidden backdrop-blur-sm transition-opacity duration-500">
          {/* Close button */}
          <button
            onClick={() => setPhotoIndex(null)}
            className="absolute top-6 right-8 text-white text-4xl font-bold hover:scale-110 transition"
          >
            ✕
          </button>

          {/* Left arrow */}
          {photoIndex > 0 && (
            <button
              onClick={() => setPhotoIndex(photoIndex - 1)}
              className="absolute left-8 text-white text-6xl font-bold hover:scale-125 transition"
            >
              ‹
            </button>
          )}

          {/* The Image – fullscreen but with rounded corners */}
          <img
            src={details.photos[photoIndex]}
            alt="place"
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-transform duration-500"
          />

          {/* Right arrow */}
          {photoIndex < details.photos.length - 1 && (
            <button
              onClick={() => setPhotoIndex(photoIndex + 1)}
              className="absolute right-8 text-white text-6xl font-bold hover:scale-125 transition"
            >
              ›
            </button>
          )}
        </div>
      )}
    </Dialog>
  );
}
