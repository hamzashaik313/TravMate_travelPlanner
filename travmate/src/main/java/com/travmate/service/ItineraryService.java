
package com.travmate.service;

import com.travmate.model.Itinerary;
import com.travmate.model.Trip;
import com.travmate.repository.ItineraryRepository;
import com.travmate.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class ItineraryService {

    private static final String GOOGLE_PLACES_API_KEY = "AIzaSyDjxl-m7a7oMWugbz5yVZAKVn8vkIB0HOo";
    private static final String GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private ItineraryRepository itineraryRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Itinerary> generateItinerary(Long tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        // Remove old itinerary entries for this trip before generating new ones
        itineraryRepository.deleteAllByTripId(tripId);

        long days = Math.max(1, ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1);
        double dailyBudget = trip.getBudget() / days;

        // --- Step 1: Fetch tourist attractions from Google Places ---
        String url = GOOGLE_PLACES_URL + "?query=tourist+attractions+in+" + trip.getDestination()
                + "&key=" + GOOGLE_PLACES_API_KEY;

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

        if (results == null || results.isEmpty()) {
            throw new RuntimeException("No places found for destination: " + trip.getDestination());
        }

        // --- Step 2: Distribute attractions across days and save ---
        List<Itinerary> itineraryList = new ArrayList<>();
        int day = 1;

        for (Map<String, Object> result : results) {
            String name = (String) result.get("name");
            if (name == null || name.isBlank()) continue;

            Itinerary itinerary = new Itinerary(day, name, dailyBudget, trip);
            itineraryRepository.save(itinerary);
            itineraryList.add(itinerary);

            day++;
            if (day > days) break; // stop once we cover all trip days
        }

        return itineraryList;
    }
}



////12:15 pm
//
//
//package com.travmate.service;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import com.travmate.model.Itinerary;
//import com.travmate.model.Trip;
//import com.travmate.repository.ItineraryRepository;
//import com.travmate.repository.TripRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.time.temporal.ChronoUnit;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class ItineraryService {
//
//    @Value("${geoapify.api.key}")
//    private String geoapifyApiKey;
//
//    @Autowired
//    private TripRepository tripRepository;
//
//    @Autowired
//    private ItineraryRepository itineraryRepository;
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    /**
//     * Generate itinerary for a trip only if it belongs to the logged-in user.
//     */
//    public List<Itinerary> generateItinerary(Long tripId, String userEmail) {
//        Trip trip = tripRepository.findById(tripId)
//                .orElseThrow(() -> new RuntimeException("Trip not found"));
//
//        // ✅ Verify trip belongs to the logged-in user
//        if (trip.getUser() == null || !trip.getUser().getEmail().equals(userEmail)) {
//            throw new AccessDeniedException("You are not authorized to generate itinerary for this trip");
//        }
//
//        long days = ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
//        double dailyBudget = trip.getBudget() / days;
//
//        List<String> places = new ArrayList<>();
//
//        try {
//            // STEP 1: Get coordinates of destination
//            String geocodeUrl = "https://api.geoapify.com/v1/geocode/search?text="
//                    + trip.getDestination() + "&apiKey=" + geoapifyApiKey;
//
//            ResponseEntity<JsonNode> geoResponse = restTemplate.getForEntity(geocodeUrl, JsonNode.class);
//            JsonNode geoResults = geoResponse.getBody().get("features");
//
//            if (geoResults == null || geoResults.isEmpty()) {
//                places.add("Could not find location: " + trip.getDestination());
//            } else {
//                JsonNode geometry = geoResults.get(0).get("geometry").get("coordinates");
//                double lon = geometry.get(0).asDouble();
//                double lat = geometry.get(1).asDouble();
//
//                // STEP 2: Fetch tourist attractions near that location
//                String placesUrl = "https://api.geoapify.com/v2/places?" +
//                        "categories=tourism.attraction,tourism.sights,natural,national_park,entertainment.cinema" +
//                        "&filter=circle:" + lon + "," + lat + ",5000" + // 5km radius
//                        "&limit=30&apiKey=" + geoapifyApiKey;
//
//                ResponseEntity<JsonNode> placesResponse = restTemplate.getForEntity(placesUrl, JsonNode.class);
//                JsonNode features = placesResponse.getBody().get("features");
//
//                if (features != null && features.isArray()) {
//                    for (JsonNode feature : features) {
//                        String name = feature.get("properties").get("name") != null
//                                ? feature.get("properties").get("name").asText()
//                                : null;
//                        if (name != null && !name.isEmpty()) {
//                            places.add(name);
//                        }
//                    }
//                }
//            }
//        } catch (Exception e) {
//            places.add("Error fetching places: " + e.getMessage());
//        }
//
//        if (places.isEmpty()) {
//            places.add("No popular tourist places found in " + trip.getDestination());
//        }
//
//        // STEP 3: Distribute activities across trip days
//        List<Itinerary> itineraryList = new ArrayList<>();
//        for (int i = 0; i < days; i++) {
//            String activity = places.get(i % places.size());
//
//            Itinerary itinerary = new Itinerary();
//            itinerary.setDayNumber(i + 1);
//            itinerary.setActivity(activity);
//            itinerary.setEstimatedCost(dailyBudget);
//            itinerary.setTrip(trip);
//
//            itineraryRepository.save(itinerary);
//            itineraryList.add(itinerary);
//        }
//
//        return itineraryList;
//    }
//
//    /**
//     * Optional - fetch existing itineraries for a trip, verifying ownership
//     */
//    public List<Itinerary> getItinerariesForTrip(Long tripId, String userEmail) {
//        Trip trip = tripRepository.findById(tripId)
//                .orElseThrow(() -> new RuntimeException("Trip not found"));
//
//        if (trip.getUser() == null || !trip.getUser().getEmail().equals(userEmail)) {
//            throw new AccessDeniedException("You are not authorized to view this trip's itineraries");
//        }
//
//        return itineraryRepository.findByTripId(tripId);
//    }
//}









