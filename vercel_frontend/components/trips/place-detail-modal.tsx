"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";

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
  const { toast } = useToast();

  useEffect(() => {
    if (!isOpen || !activityName) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const url = `/api/places/${encodeURIComponent(activityName)}`;
        const res = await apiFetch<any>(url);

        if (res && res.status === "OK" && res.result) {
          const r = res.result;
          setDetails({
            name: r.name,
            formatted_address: r.formatted_address,
            rating: r.rating,
            user_ratings_total: r.user_ratings_total,
            website: r.website,
            url: r.url,
            photos: Array.isArray(r.photos) ? r.photos : [],
            reviews: Array.isArray(r.reviews) ? r.reviews : [],
          });
        } else {
          setDetails(null);
        }
      } catch (e: any) {
        toast({
          title: "Search Error",
          description: "Failed to load Google Places details.",
          variant: "destructive",
        });
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [isOpen, activityName, toast]);

  const truncate = (text: string | undefined, n = 220) =>
    !text ? "" : text.length > n ? text.slice(0, n).trim() + "…" : text;

  const nextPhoto = () =>
    setPhotoIndex((i) =>
      i !== null && details?.photos ? (i + 1) % details.photos.length : i
    );
  const prevPhoto = () =>
    setPhotoIndex((i) =>
      i !== null && details?.photos
        ? (i - 1 + details.photos.length) % details.photos.length
        : i
    );

  return (
    <>
      {/* ---- MAIN MODAL ---- */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[720px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="text-lg font-semibold">{activityName}</span>
              {!loading && details?.rating && (
                <span className="text-sm bg-gray-100 dark:bg-neutral-800 rounded-md px-2 py-1">
                  ⭐ {details.rating} ({details.user_ratings_total ?? 0})
                </span>
              )}
            </DialogTitle>
            <DialogDescription>
              {loading
                ? "Searching for details..."
                : "Location details fetched from Google Places."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-3">
            {loading ? (
              <p className="text-center text-sm text-muted-foreground">
                Loading details...
              </p>
            ) : details ? (
              <>
                {/* ---- Address and Actions ---- */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 border-b pb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Address:</strong>{" "}
                      {details.formatted_address ?? "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {details.website && (
                      <a
                        href={details.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm border rounded-md px-3 py-1 hover:bg-gray-50"
                      >
                        Visit Website
                      </a>
                    )}
                    {details.url && (
                      <a
                        href={details.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm border rounded-md px-3 py-1 hover:bg-gray-50"
                      >
                        View on Google Maps
                      </a>
                    )}
                    <button
                      onClick={onClose}
                      className="text-sm border rounded-md px-3 py-1 hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* ---- Photos Grid ---- */}
                {details.photos && details.photos.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <strong>Photos</strong>
                      <span className="text-xs text-muted-foreground">
                        {details.photos.length} photo(s)
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {details.photos.map((photo, idx) => (
                        <img
                          key={idx}
                          src={photo}
                          alt={`photo-${idx}`}
                          onClick={() => setPhotoIndex(idx)}
                          className="cursor-pointer rounded-lg object-cover h-28 w-full hover:scale-105 transition-transform duration-150"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* ---- Reviews ---- */}
                {details.reviews && details.reviews.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <strong>Top Reviews</strong>
                      <span className="text-xs text-muted-foreground">
                        {details.reviews.length} review(s)
                      </span>
                    </div>

                    <div className="space-y-3">
                      {details.reviews.map((r, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-md border bg-gray-50 dark:bg-neutral-900"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">
                              {r.author_name ?? "Unknown"}
                            </span>
                            <span className="text-sm">
                              ⭐ {r.rating ?? "-"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">
                            {r.relative_time_description ?? ""}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {truncate(r.text, 250)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-muted-foreground text-sm">
                No results found for this activity.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ---- PHOTO CAROUSEL MODAL ---- */}
      {photoIndex !== null && details?.photos && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]"
          onClick={() => setPhotoIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-2xl"
            onClick={() => setPhotoIndex(null)}
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-8 text-white text-3xl font-bold"
          >
            ‹
          </button>

          <img
            src={details.photos[photoIndex]}
            alt="full-size"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-8 text-white text-3xl font-bold"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
