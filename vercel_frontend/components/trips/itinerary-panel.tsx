"use client";

import { useState } from "react";
import { postJson } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays } from "lucide-react";
import { PlaceDetailModal } from "./place-detail-modal";

type ItineraryItem = {
  dayNumber: number;
  activity: string;
};

export function ItineraryPanel({ tripId }: { tripId: string }) {
  const { toast } = useToast();
  const [items, setItems] = useState<ItineraryItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");

  const generate = async () => {
    setLoading(true);
    try {
      const res = await postJson<ItineraryItem[]>(
        `/api/itinerary/generate/${tripId}`,
        {}
      );
      setItems(res || []);
      toast({ title: "Itinerary generated" });
    } catch (e: any) {
      toast({
        title: "Failed to generate",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (name: string) => {
    setSelectedActivity(name);
    setIsModalOpen(true);
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <CalendarDays size={20} className="text-blue-600" /> Itinerary
        </CardTitle>

        <Button
          onClick={generate}
          disabled={loading}
          className="px-6 rounded-full"
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </Button>
      </CardHeader>

      <CardContent>
        {/* LIST */}
        <div className="space-y-3 mt-3">
          {(items ?? []).map((it, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer shadow-sm"
            >
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Day {it.dayNumber}
                </p>
                <p className="text-lg font-semibold">{it.activity}</p>
              </div>

              <Button
                variant="link"
                onClick={() => openDetails(it.activity)}
                className="flex items-center gap-1 text-blue-600"
              >
                <MapPin size={18} />
                View Map
              </Button>
            </div>
          ))}

          {(!items || items.length === 0) && (
            <p className="text-center text-gray-500 py-8">
              No itinerary created yet. Click <b>“Generate Itinerary”</b>.
            </p>
          )}
        </div>

        <PlaceDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          activityName={selectedActivity}
        />
      </CardContent>
    </Card>
  );
}
