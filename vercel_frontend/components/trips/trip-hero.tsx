// //components/trips/trip-hero
// "use client";

// import { useEffect, useState } from "react";
// import { API_BASE } from "@/lib/api";
// import { MapPin, Calendar } from "lucide-react";

// export function TripHero({
//   destination,
//   title,
//   startDate,
//   endDate,
// }: {
//   destination: string;
//   title: string;
//   startDate: string;
//   endDate: string;
// }) {
//   const [photo, setPhoto] = useState<string | null>(null);

//   useEffect(() => {
//     fetch(
//       `${API_BASE}/api/places/photo?destination=${encodeURIComponent(
//         destination
//       )}`
//     )
//       .then((res) => res.json())
//       .then((data) => setPhoto(data?.photo ?? null))
//       .catch(() => {});
//   }, [destination]);

//   return (
//     <div className="relative w-full h-60 md:h-72 lg:h-80 rounded-3xl overflow-hidden shadow-xl bg-gray-300">
//       {/* IMAGE */}
//       {photo ? (
//         <img
//           src={photo}
//           alt=""
//           className="absolute inset-0 w-full h-full object-cover animate-fade-in"
//         />
//       ) : (
//         <div className="absolute inset-0 w-full h-full bg-gray-300 animate-pulse" />
//       )}

//       {/* GRADIENT */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//       {/* CONTENT */}
//       <div className="absolute bottom-5 left-6 space-y-2 text-white drop-shadow-lg">
//         <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>

//         <p className="flex items-center gap-2 text-sm md:text-base opacity-90">
//           <MapPin size={18} />
//           {destination}
//         </p>

//         <p className="flex items-center gap-2 text-sm md:text-base opacity-90">
//           <Calendar size={18} />
//           {new Date(startDate).toLocaleDateString()} →{" "}
//           {new Date(endDate).toLocaleDateString()}
//         </p>
//       </div>
//     </div>
//   );
// }

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
    <div className="relative w-full rounded-3xl overflow-hidden shadow-lg bg-gray-100">
      {/* Background image (cover) */}
      <div className="relative h-56 md:h-72 lg:h-96">
        {photo ? (
          <img
            src={photo}
            alt={`${destination} hero`}
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* subtle dark overlay + glass card */}

        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent backdrop-blur-sm" />

        <div className="absolute left-6 right-6 bottom-6 md:bottom-10 flex flex-col md:flex-row md:items-end gap-4">
          {/* Glass info card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-white max-w-3xl shadow-md">
            <h1 className="text-xl md:text-3xl font-extrabold leading-tight drop-shadow">
              {title}
            </h1>

            <div className="mt-2 flex flex-col md:flex-row md:items-center gap-3 text-sm md:text-base text-white/90">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{destination}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {new Date(startDate).toLocaleDateString()} →{" "}
                  {new Date(endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* small round action avatar / placeholder */}
          <div className="ml-auto md:ml-0">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 opacity-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4s-3 1.567-3 3.5S10.343 11 12 11zM4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
