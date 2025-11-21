// //components/trips/itinerary-panel
// "use client";

// import { useState } from "react";
// import { postJson } from "@/lib/api";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MapPin, CalendarDays } from "lucide-react";
// import { PlaceDetailModal } from "./place-detail-modal";

// type ItineraryItem = {
//   dayNumber: number;
//   activity: string;
// };

// export function ItineraryPanel({ tripId }: { tripId: string }) {
//   const { toast } = useToast();
//   const [items, setItems] = useState<ItineraryItem[] | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedActivity, setSelectedActivity] = useState("");

//   const generate = async () => {
//     setLoading(true);
//     try {
//       const res = await postJson<ItineraryItem[]>(
//         `/api/itinerary/generate/${tripId}`,
//         {}
//       );
//       setItems(res || []);
//       toast({ title: "Itinerary generated" });
//     } catch (e: any) {
//       toast({
//         title: "Failed to generate",
//         description: e.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openDetails = (name: string) => {
//     setSelectedActivity(name);
//     setIsModalOpen(true);
//   };

//   return (
//     <Card className="rounded-2xl shadow-sm">
//       <CardHeader className="flex items-center justify-between">
//         <CardTitle className="text-xl font-semibold flex items-center gap-2">
//           <CalendarDays size={20} className="text-blue-600" /> Itinerary
//         </CardTitle>

//         <Button
//           onClick={generate}
//           disabled={loading}
//           className="px-6 rounded-full"
//         >
//           {loading ? "Generating..." : "Generate Itinerary"}
//         </Button>
//       </CardHeader>

//       <CardContent>
//         {/* LIST */}
//         <div className="space-y-3 mt-3">
//           {(items ?? []).map((it, idx) => (
//             <div
//               key={idx}
//               className="border rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer shadow-sm"
//             >
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">
//                   Day {it.dayNumber}
//                 </p>
//                 <p className="text-lg font-semibold">{it.activity}</p>
//               </div>

//               <Button
//                 variant="link"
//                 onClick={() => openDetails(it.activity)}
//                 className="flex items-center gap-1 text-blue-600"
//               >
//                 <MapPin size={18} />
//                 View Map
//               </Button>
//             </div>
//           ))}

//           {(!items || items.length === 0) && (
//             <p className="text-center text-gray-500 py-8">
//               No itinerary created yet. Click <b>“Generate Itinerary”</b>.
//             </p>
//           )}
//         </div>

//         <PlaceDetailModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           activityName={selectedActivity}
//         />
//       </CardContent>
//     </Card>
//   );
// }

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
        <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3">
          <CalendarDays size={20} className="text-blue-600" /> Itinerary
        </CardTitle>

        <div className="flex items-center gap-3">
          <Button
            onClick={generate}
            disabled={loading}
            className="px-4 py-2 rounded-full"
          >
            {loading ? "Generating..." : "Generate Itinerary"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* LIST */}
        <div className="space-y-4 mt-4">
          {(items ?? []).map((it, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border flex items-center justify-center text-blue-600 font-semibold">
                  <span className="text-sm">Day</span>
                  <div className="text-sm font-bold">{it.dayNumber}</div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Day {it.dayNumber}</p>
                  <p className="text-md md:text-lg font-semibold text-gray-900">
                    {it.activity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => openDetails(it.activity)}
                  className="flex items-center gap-2"
                >
                  <MapPin size={16} />
                  <span className="hidden md:inline">View Map</span>
                </Button>
              </div>
            </div>
          ))}

          {(!items || items.length === 0) && (
            <div className="py-12 rounded-xl border-dashed border border-gray-200 bg-gray-50 text-center">
              <p className="text-gray-600">
                No itinerary created yet. Click{" "}
                <strong>Generate Itinerary</strong> to auto-fill suggestions.
              </p>
            </div>
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
