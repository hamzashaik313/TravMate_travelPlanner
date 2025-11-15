// "use client";
// import {
//   GoogleMap,
//   Marker,
//   Polyline,
//   useJsApiLoader,
// } from "@react-google-maps/api";

// export function ItineraryMap({ places }: { places: any[] }) {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//   });

//   if (!isLoaded) return <p>Loading map...</p>;

//   // Center on the first place (fallback: Dubai)
//   const center = places.length
//     ? { lat: places[0].lat, lng: places[0].lng }
//     : { lat: 25.276987, lng: 55.296249 };

//   return (
//     <div className="w-full h-[400px] rounded-lg overflow-hidden border">
//       <GoogleMap
//         mapContainerStyle={{ width: "100%", height: "100%" }}
//         center={center}
//         zoom={10}
//       >
//         {places.map((p, i) => (
//           <Marker
//             key={i}
//             position={{ lat: p.lat, lng: p.lng }}
//             title={p.activity}
//           />
//         ))}

//         {/* Optional route line */}
//         {places.length > 1 && (
//           <Polyline
//             path={places.map((p) => ({ lat: p.lat, lng: p.lng }))}
//             options={{ strokeColor: "#4285F4", strokeWeight: 3 }}
//           />
//         )}
//       </GoogleMap>
//     </div>
//   );
// }
