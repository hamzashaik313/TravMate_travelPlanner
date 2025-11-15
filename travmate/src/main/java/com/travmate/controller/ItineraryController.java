package com.travmate.controller;

import com.travmate.model.Itinerary;
import com.travmate.model.Trip;
import com.travmate.repository.ItineraryRepository;
import com.travmate.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/itinerary")
public class ItineraryController {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private ItineraryRepository itineraryRepository;

    private final String GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    @Value("${google.places.api.key}")
    private String apiKey;


    @PostMapping("/generate/{tripId}")
    public List<Itinerary> generateItinerary(@PathVariable Long tripId) {
        // 1️ Find the trip
        Optional<Trip> tripOpt = tripRepository.findById(tripId);
        if (tripOpt.isEmpty()) {
            return List.of();
        }

        Trip trip = tripOpt.get();
        String destination = trip.getDestination();

        // 2 Delete old itineraries for this trip before regenerating
        itineraryRepository.deleteAllByTripId(tripId);

        // 3️ Call Google Places API for attractions
        String url = GOOGLE_PLACES_URL + "?query=tourist+attractions+in+"
                + destination.replace(" ", "+")
                + "&key=" + apiKey;

        RestTemplate rest = new RestTemplate();
        Map<String, Object> response = rest.getForObject(url, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

        if (results == null || results.isEmpty()) {
            return List.of(new Itinerary(1, "No attractions found for " + destination, 0.0, trip));
        }

        // 4️ Build the itinerary
        List<Itinerary> itineraryList = new ArrayList<>();
        double perDayCost = trip.getBudget() / Math.min(results.size(), 5); // distribute budget
        int day = 1;

        for (Map<String, Object> result : results) {
            if (day > 5) break; // limiting to top 5 attractions
            String name = (String) result.get("name");

            if (name != null && !name.isBlank()) {
                Itinerary itinerary = new Itinerary(day++, name, perDayCost, trip);
                itineraryList.add(itineraryRepository.save(itinerary));
            }
        }

        return itineraryList;
    }
}
