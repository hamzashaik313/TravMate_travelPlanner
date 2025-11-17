package com.travmate.service;

import com.travmate.model.Itinerary;
import com.travmate.model.Trip;
import com.travmate.repository.ItineraryRepository;
import com.travmate.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ItineraryService {

    @Value("${google.places.api.key}")
    private String googleApiKey;

    private static final String GOOGLE_PLACES_URL =
            "https://maps.googleapis.com/maps/api/place/textsearch/json";

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private ItineraryRepository itineraryRepository;

    private final RestTemplate restTemplate = new RestTemplate();


    public List<Itinerary> generateItinerary(Long tripId) {

        // 1. Fetch the trip
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        // 2. Remove previous itinerary
        itineraryRepository.deleteAllByTripId(tripId);

        long days = Math.max(1,
                ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1);

        // 3. Google Places Request
        String url = GOOGLE_PLACES_URL +
                "?query=tourist+attractions+in+" +
                trip.getDestination().replace(" ", "+") +
                "&key=" + googleApiKey;

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> results =
                (List<Map<String, Object>>) response.get("results");

        if (results == null || results.isEmpty()) {
            // Create at least ONE entry
            Itinerary item = new Itinerary(1,
                    "No attractions found for " + trip.getDestination(),
                    trip);

            itineraryRepository.save(item);

            return List.of(item);
        }

        // 4. Create itinerary items (NO COST)
        List<Itinerary> itineraryList = new ArrayList<>();

        int day = 1;

        for (Map<String, Object> result : results) {
            if (day > days) break;

            String name = (String) result.get("name");
            if (name == null || name.isBlank()) continue;

            Itinerary item = new Itinerary(day, name, trip);
            itineraryRepository.save(item);

            itineraryList.add(item);
            day++;
        }

        return itineraryList;
    }
}

