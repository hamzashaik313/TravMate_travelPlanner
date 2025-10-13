//package com.travmate.service;
//
//import com.travmate.model.Itinerary;
//import com.travmate.model.Trip;
//import com.travmate.repository.ItineraryRepository;
//import com.travmate.repository.TripRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.temporal.ChronoUnit;
//import java.util.*;
//
//@Service
//public class ItineraryService {
//
//    private final Map<String, List<String>> destinationAttractions = new HashMap<>();
//
//    public ItineraryService() {
//        // Predefined attractions for testing
//        destinationAttractions.put("Goa Beaches", Arrays.asList(
//                "Visit Baga Beach",
//                "Explore Fort Aguada",
//                "Dolphin sighting tour",
//                "Shopping at local markets",
//                "Island hopping",
//                "Sunset at Chapora Fort"
//        ));
//        destinationAttractions.put("Jaipur", Arrays.asList(
//                "Amber Fort visit",
//                "City Palace tour",
//                "Hawa Mahal sightseeing",
//                "Local bazaar shopping",
//                "Elephant sanctuary",
//                "Evening cultural show"
//        ));
//    }
//
//    @Autowired
//    private TripRepository tripRepository;
//
//    @Autowired
//    private ItineraryRepository itineraryRepository;
//
//
//    //    @Autowired
////    private ItineraryRepository itineraryRepository;
////
////public List<Itinerary> generateItinerary(Long tripId) {
////    Trip trip = tripRepository.findById(tripId)
////            .orElseThrow(() -> new RuntimeException("Trip not found"));
////
////    int tripDays = (int) ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
////    double dailyBudget = trip.getBudget() / tripDays;
////
////    // Clear old itineraries first
////    itineraryRepository.deleteAll(itineraryRepository.findByTripId(tripId));
////
////    List<String> activities = destinationAttractions.getOrDefault(
////            trip.getDestination(),
////            Collections.nCopies(tripDays, "Explore local attractions")
////    );
////
////    List<Itinerary> itineraries = new ArrayList<>();
////
////    for (int i = 0; i < tripDays; i++) {
////        Itinerary itinerary = new Itinerary();
////        itinerary.setDayNumber(i + 1);
////        String activity = (i < activities.size()) ? activities.get(i) : activities.get(activities.size() - 1);
////        itinerary.setActivity(activity);
////        itinerary.setEstimatedCost(dailyBudget);
////        itinerary.setTrip(trip);
////
////        itineraries.add(itinerary);
////    }
////
////    return itineraryRepository.saveAll(itineraries);
////}
//    @Autowired
//    private TomTomService tomTomService;
//
//    public List<Itinerary> generateItinerary(Long tripId) {
//        Trip trip = tripRepository.findById(tripId)
//                .orElseThrow(() -> new RuntimeException("Trip not found"));
//
//        int tripDays = (int) ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
//        double dailyBudget = trip.getBudget() / tripDays;
//
//        // Clear old itineraries
//        itineraryRepository.deleteAll(itineraryRepository.findByTripId(tripId));
//
//        // ✅ Fetch attractions dynamically from TomTom
//        List<String> activities = tomTomService.getAttractions(trip.getDestination());
//
//        if (activities.isEmpty()) {
//            activities = Collections.nCopies(tripDays, "Explore local attractions");
//        }
//
//        List<Itinerary> itineraries = new ArrayList<>();
//        for (int i = 0; i < tripDays; i++) {
//            Itinerary itinerary = new Itinerary();
//            itinerary.setDayNumber(i + 1);
//            String activity = (i < activities.size()) ? activities.get(i) : activities.get(activities.size() - 1);
//            itinerary.setActivity(activity);
//            itinerary.setEstimatedCost(dailyBudget);
//            itinerary.setTrip(trip);
//
//            itineraries.add(itinerary);
//        }
//
//        return itineraryRepository.saveAll(itineraries);
//    }
//
//
//
//
//
//    public List<Itinerary> getItinerary(Long tripId) {
//        return itineraryRepository.findByTripId(tripId);
//    }
//}

//20-09- 4:30 pm

//working 12:30 am 22-09-25


//package com.travmate.service;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.travmate.model.Itinerary;
//import com.travmate.model.Trip;
//import com.travmate.repository.ItineraryRepository;
//import com.travmate.repository.TripRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//import java.time.temporal.ChronoUnit;
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.List;

//@Service
//public class ItineraryService {
//
//    @Autowired
//    private TripRepository tripRepository;
//
//    @Autowired
//    private ItineraryRepository itineraryRepository;
//
//    private final RestTemplate restTemplate = new RestTemplate();
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    // Replace this with your actual API key
//    private final String GEOAPIFY_API_KEY = "a293aaa7b79d4315972747a229265f9f";
//
//    public List<Itinerary> generateItinerary(Long tripId) {
//        Trip trip = tripRepository.findById(tripId)
//                .orElseThrow(() -> new RuntimeException("Trip not found"));
//
//        long days = ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
//        double dailyBudget = trip.getBudget() / days;
//
//        List<String> places = fetchTouristPlaces(trip.getDestination(), (int) days);
//        List<Itinerary> itineraries = new ArrayList<>();
//
//        for (int i = 0; i < days; i++) {
//            Itinerary itinerary = new Itinerary();
//            itinerary.setTrip(trip);
//            itinerary.setDayNumber(i + 1);
//
//            String activity = (i < places.size())
//                    ? places.get(i)
//                    : "Explore local culture, markets & food";
//
//            itinerary.setActivity(activity);
//            itinerary.setEstimatedCost(dailyBudget);
//
//            itineraries.add(itineraryRepository.save(itinerary));
//        }
//
//        return itineraries;
//    }
//
//    private List<String> fetchTouristPlaces(String city, int limit) {
//        List<String> places = new ArrayList<>();
//
//        try {
//            // Geocoding: Convert city name -> coordinates
//            String geoUrl = "https://api.geoapify.com/v1/geocode/search?text=" + city + "&apiKey=" + GEOAPIFY_API_KEY;
//            ResponseEntity<String> geoResponse = restTemplate.getForEntity(geoUrl, String.class);
//
//            JsonNode geoJson = objectMapper.readTree(geoResponse.getBody());
//            JsonNode firstResult = geoJson.path("features").get(0);
//
//            if (firstResult == null) {
//                places.add("Could not find coordinates for " + city);
//                return places;
//            }
//
//            double lon = firstResult.path("geometry").path("coordinates").get(0).asDouble();
//            double lat = firstResult.path("geometry").path("coordinates").get(1).asDouble();
//
//            // Fetch tourist places near coordinates
//            String placesUrl = "https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:"
//                    + lon + "," + lat + ",5000&limit=" + limit + "&apiKey=" + GEOAPIFY_API_KEY;
//
//            ResponseEntity<String> placesResponse = restTemplate.getForEntity(placesUrl, String.class);
//
//            JsonNode placesJson = objectMapper.readTree(placesResponse.getBody());
//            JsonNode features = placesJson.path("features");
//
//            for (JsonNode feature : features) {
//                String name = feature.path("properties").path("name").asText(null);
//
//                if (name != null && !name.isEmpty()) {
//                    places.add(name);
//                }
//            }
//
//            if (places.isEmpty()) {
//                places.add("No popular tourist places found in " + city);
//            }
//
//        } catch (Exception e) {
//            places.add("Error fetching places: " + e.getMessage());
//        }
//
//        return places;
//    }
//}
package com.travmate.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.travmate.model.Itinerary;
import com.travmate.model.Trip;
import com.travmate.repository.ItineraryRepository;
import com.travmate.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Service
public class ItineraryService {

    @Value("${geoapify.api.key}")
    private String geoapifyApiKey;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private ItineraryRepository itineraryRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Itinerary> generateItinerary(Long tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        long days = ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
        double dailyBudget = trip.getBudget() / days;

        List<String> places = new ArrayList<>();

        try {
            // STEP 1: Get coordinates of destination
            String geocodeUrl = "https://api.geoapify.com/v1/geocode/search?text="
                    + trip.getDestination() + "&apiKey=" + geoapifyApiKey;

            ResponseEntity<JsonNode> geoResponse = restTemplate.getForEntity(geocodeUrl, JsonNode.class);
            JsonNode geoResults = geoResponse.getBody().get("features");

            if (geoResults == null || geoResults.isEmpty()) {
                places.add("Could not find location: " + trip.getDestination());
            } else {
                JsonNode geometry = geoResults.get(0).get("geometry").get("coordinates");
                double lon = geometry.get(0).asDouble();
                double lat = geometry.get(1).asDouble();

                // STEP 2: Fetch tourist attractions near that location
                String placesUrl = "https://api.geoapify.com/v2/places?" +
                        "categories=tourism.attraction,tourism.sights,natural,national_park,entertainment.cinema\n" +
                        "&filter=circle:" + lon + "," + lat + ",5000" +   // 5km radius
                        "&limit=30&apiKey=" + geoapifyApiKey;

                ResponseEntity<JsonNode> placesResponse = restTemplate.getForEntity(placesUrl, JsonNode.class);
                JsonNode features = placesResponse.getBody().get("features");

                if (features != null && features.isArray()) {
                    for (JsonNode feature : features) {
                        String name = feature.get("properties").get("name") != null ?
                                feature.get("properties").get("name").asText() : null;
                        if (name != null && !name.isEmpty()) {
                            places.add(name);
                        }
                    }
                }
            }
        } catch (Exception e) {
            places.add("Error fetching places: " + e.getMessage());
        }

        if (places.isEmpty()) {
            places.add("No popular tourist places found in " + trip.getDestination());
        }

        // Distribute across days
        List<Itinerary> itineraryList = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            String activity = places.get(i % places.size());

            Itinerary itinerary = new Itinerary();
            itinerary.setDayNumber(i + 1);
            itinerary.setActivity(activity);
            itinerary.setEstimatedCost(dailyBudget);
            itinerary.setTrip(trip);

            itineraryList.add(itineraryRepository.save(itinerary));
        }

        return itineraryList;
    }
}









