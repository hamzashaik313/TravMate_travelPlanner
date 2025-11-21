// //Components/trips/TripCards.tsx
// "use client";

// import useSWR from "swr";
// import { swrFetcher, API_BASE } from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { CalendarDays, MapPin } from "lucide-react";

// export type Trip = {
//   id: string;
//   title: string;
//   destination: string;
//   startDate: string;
//   endDate: string;
// };

// export function TripCards() {
//   const { data, error } = useSWR<Trip[]>(`${API_BASE}/api/trips`, swrFetcher);
//   const router = useRouter();

//   if (error)
//     return <p className="text-red-500 text-center">Failed to load trips.</p>;

//   if (!data) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="border rounded-xl shadow overflow-hidden animate-pulse"
//           >
//             <div className="h-40 bg-gray-300" />
//             <div className="p-4 space-y-2">
//               <div className="h-4 bg-gray-300 rounded w-2/3" />
//               <div className="h-3 bg-gray-200 rounded w-1/2" />
//               <div className="h-3 bg-gray-200 rounded w-1/3" />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
//       {data.map((trip) => (
//         <TripCard
//           key={trip.id}
//           trip={trip}
//           onClick={() => router.push(`/trips/${trip.id}`)}
//         />
//       ))}
//     </div>
//   );
// }

// function TripCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
//   const [photo, setPhoto] = useState<string | null>(null);

//   useEffect(() => {
//     fetch(
//       `${API_BASE}/api/places/photo?destination=${encodeURIComponent(
//         trip.destination
//       )}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("PHOTO FOR:", trip.destination, "=>", data.photo);
//         setPhoto(data?.photo ?? null);
//       })
//       .catch(console.error);
//   }, [trip.destination]);

//   return (
//     <div
//       onClick={onClick}
//       className="
//         group cursor-pointer rounded-2xl overflow-hidden bg-white shadow
//         hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300
//         border border-gray-200
//       "
//     >
//       {/* IMAGE */}
//       <div className="relative h-48 w-full bg-gray-200">
//         {photo ? (
//           <img
//             src={photo}
//             alt="trip"
//             loading="lazy"
//             className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         ) : (
//           <div className="h-full w-full flex items-center justify-center text-gray-400">
//             Loading…
//           </div>
//         )}

//         {/* GRADIENT OVERLAY */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70"></div>

//         {/* DESTINATION LABEL */}
//         <p className="absolute bottom-3 left-3 text-white font-semibold flex items-center gap-1 text-sm drop-shadow-lg">
//           <MapPin size={18} />
//           {trip.destination}
//         </p>
//       </div>

//       {/* CONTENT */}
//       <div className="p-4 space-y-2">
//         <h3 className="text-lg font-bold text-gray-900">{trip.title}</h3>

//         <p className="text-sm text-gray-500 flex items-center gap-2">
//           <CalendarDays size={16} />
//           {new Date(trip.startDate).toLocaleDateString()} →{" "}
//           {new Date(trip.endDate).toLocaleDateString()}
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import useSWR from "swr";
import { swrFetcher, API_BASE } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CalendarDays, MapPin } from "lucide-react";

export type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export function TripCards() {
  const { data, error } = useSWR<Trip[]>(`${API_BASE}/api/trips`, swrFetcher);
  const router = useRouter();

  if (error)
    return <p className="text-red-500 text-center">Failed to load trips.</p>;

  if (!data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="
              rounded-2xl bg-white/30 backdrop-blur-xl 
              border border-white/50 shadow-xl animate-pulse
              overflow-hidden
            "
          >
            <div className="h-40 bg-gray-300" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-2/3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {data.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          onClick={() => router.push(`/trips/${trip.id}`)}
        />
      ))}
    </div>
  );
}

function TripCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `${API_BASE}/api/places/photo?destination=${encodeURIComponent(
        trip.destination
      )}`
    )
      .then((res) => res.json())
      .then((data) => setPhoto(data?.photo ?? null))
      .catch(console.error);
  }, [trip.destination]);

  return (
    <div
      onClick={onClick}
      className="
        group cursor-pointer 
        rounded-2xl overflow-hidden
        bg-white/40 backdrop-blur-xl
        border border-white/50 shadow-xl
        hover:shadow-2xl hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative h-48 w-full bg-gray-200">
        {photo ? (
          <img
            src={photo}
            alt="trip"
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            Loading…
          </div>
        )}

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* DESTINATION */}
        <p className="absolute bottom-3 left-3 text-white font-semibold flex items-center gap-1 text-sm drop-shadow-lg">
          <MapPin size={18} />
          {trip.destination}
        </p>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-900">{trip.title}</h3>

        <p className="text-sm text-gray-600 flex items-center gap-2">
          <CalendarDays size={16} />
          {new Date(trip.startDate).toLocaleDateString()} →{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
