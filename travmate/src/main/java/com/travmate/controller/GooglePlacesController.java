package com.travmate.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/places")
@EnableScheduling
public class GooglePlacesController {

    //private final String API_KEY = "AIzaSyAG2BBGt7Ob9R4bwMDFReodXasT3SLXV78";
    @Value("${google.places.api.key}")
    private String apiKey;

    private final String TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    private final String DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
    private final String PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

    private final RestTemplate restTemplate = new RestTemplate();

    // In-memory cache (activity name → cached JSON)
    private final Map<String, Map<String, Object>> placeCache = new ConcurrentHashMap<>();

    @GetMapping("/{activity}")
    public ResponseEntity<Map<String, Object>> getPlaceDetails(@PathVariable String activity) {
        String key = activity.toLowerCase().trim();

        // 1️⃣ Return from cache if present
        if (placeCache.containsKey(key)) {
            System.out.println("⚡ Cache hit for: " + activity);
            return ResponseEntity.ok(placeCache.get(key));
        }

        System.out.println("🆕 Cache miss for: " + activity + " — fetching from Google");
        Map<String, Object> responseMap = new HashMap<>();

        try {
            // Step 1: Google Text Search API
            String query = activity.replace(" ", "+");
            String searchUrl = TEXT_SEARCH_URL + "?query=" + query + "&key=" + apiKey;
            Map<String, Object> searchResponse = restTemplate.getForObject(searchUrl, Map.class);
            List<Map<String, Object>> results = (List<Map<String, Object>>) searchResponse.get("results");

            if (results == null || results.isEmpty()) {
                responseMap.put("status", "NOT_FOUND");
                responseMap.put("message", "No results found.");
                return ResponseEntity.ok(responseMap);
            }

            // Step 2: Get place details
            String placeId = (String) results.get(0).get("place_id");
            String detailsUrl = DETAILS_URL + "?place_id=" + placeId + "&key=" + apiKey;
            Map<String, Object> detailsResponse = restTemplate.getForObject(detailsUrl, Map.class);
            Map<String, Object> details = (Map<String, Object>) detailsResponse.get("result");

            if (details == null) {
                responseMap.put("status", "NOT_FOUND");
                responseMap.put("message", "No details found.");
                return ResponseEntity.ok(responseMap);
            }

            // Step 3: Shape the JSON response
            Map<String, Object> result = new HashMap<>();
            result.put("name", details.getOrDefault("name", activity));
            result.put("formatted_address", details.getOrDefault("formatted_address", "N/A"));
            result.put("rating", details.getOrDefault("rating", 0.0));
            result.put("user_ratings_total", details.getOrDefault("user_ratings_total", 0));
            result.put("website", details.getOrDefault("website", null));
            result.put("url", details.getOrDefault("url", null));

            // 🖼️ Photos
            List<Map<String, Object>> photos = (List<Map<String, Object>>) details.get("photos");
            if (photos != null && !photos.isEmpty()) {
                List<String> photoUrls = new ArrayList<>();
                for (int i = 0; i < Math.min(3, photos.size()); i++) {
                    String ref = (String) photos.get(i).get("photo_reference");
                    String photoUrl = PHOTO_URL + "?maxwidth=800&photo_reference=" + ref + "&key=" + apiKey;
                    photoUrls.add(photoUrl);
                }
                result.put("photos", photoUrls);
            }

            // 💬 Reviews
            List<Map<String, Object>> reviews = (List<Map<String, Object>>) details.get("reviews");
            if (reviews != null && !reviews.isEmpty()) {
                List<Map<String, Object>> topReviews = new ArrayList<>();
                for (int i = 0; i < Math.min(3, reviews.size()); i++) {
                    Map<String, Object> r = reviews.get(i);
                    Map<String, Object> reviewData = new HashMap<>();
                    reviewData.put("author_name", r.get("author_name"));
                    reviewData.put("rating", r.get("rating"));
                    reviewData.put("text", r.get("text"));
                    reviewData.put("relative_time_description", r.get("relative_time_description"));
                    topReviews.add(reviewData);
                }
                result.put("reviews", topReviews);
            }

            responseMap.put("status", "OK");
            responseMap.put("result", result);

            //  Cache the result for reuse
            placeCache.put(key, responseMap);
            System.out.println("💾 Cached: " + activity);

            return ResponseEntity.ok(responseMap);

        } catch (Exception e) {
            e.printStackTrace();
            responseMap.put("status", "ERROR");
            responseMap.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(responseMap);
        }
    }

    //  Optional: clear the cache every 24 hours
    @Scheduled(fixedRate = 86400000)
    public void clearCache() {
        placeCache.clear();
        System.out.println("🧹 Cleared in-memory Google Places cache (24 h refresh).");
    }
}
