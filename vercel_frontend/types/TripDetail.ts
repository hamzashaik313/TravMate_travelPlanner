export type TripDetail = {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  heroImageUrl?: string | null;

  // IMPORTANT — add this:
  createdByEmail: string;

  // if you want the name also:
  createdByName?: string;

  // if your trip includes itinerary etc:
  itineraries?: any[];
};
