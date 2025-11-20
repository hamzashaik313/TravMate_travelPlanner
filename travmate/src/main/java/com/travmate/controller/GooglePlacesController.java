package com.travmate.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
        import org.springframework.web.client.RestTemplate;

import java.util.*;
        import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/places")
public class GooglePlacesController {

    @Value("${google.places.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String TEXT_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    private final String DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
    private final String PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

    // cache (destination → JSON)
    private final Map<String, Map<String, Object>> placeCache = new ConcurrentHashMap<>();


    @GetMapping("/details")
    public ResponseEntity<Map<String, Object>> getPlaceDetailsQuery(
            @RequestParam("query") String query) {
        return fetchDetails(query);
    }

    @GetMapping("/details/{query}")
    public ResponseEntity<Map<String, Object>> getPlaceDetailsPath(
            @PathVariable("query") String query) {
        return fetchDetails(query);
    }


    private ResponseEntity<Map<String, Object>> fetchDetails(String query) {

        String key = query.toLowerCase().trim();

        // Return cached
        if (placeCache.containsKey(key)) {
            return ResponseEntity.ok(placeCache.get(key));
        }

        try {
            // STEP 1: Text Search
            String searchUrl = TEXT_URL +
                    "?query=" + query.replace(" ", "+") +
                    "&key=" + apiKey;

            Map<String, Object> search = restTemplate.getForObject(searchUrl, Map.class);
            List<Map<String, Object>> results = (List<Map<String, Object>>) search.get("results");

            if (results == null || results.isEmpty()) {
                return ResponseEntity.ok(Map.of("status", "NOT_FOUND"));
            }

            String placeId = (String) results.get(0).get("place_id");

            // STEP 2: Fetch Details
            String detailsUrl = DETAILS_URL +
                    "?place_id=" + placeId +
                    "&fields=name,formatted_address,website,url,rating,user_ratings_total,geometry,photos,reviews" +
                    "&key=" + apiKey;

            Map<String, Object> detailsResponse =
                    restTemplate.getForObject(detailsUrl, Map.class);

            Map<String, Object> result =
                    (Map<String, Object>) detailsResponse.get("result");

            if (result == null) {
                return ResponseEntity.ok(Map.of("status", "NOT_FOUND"));
            }

            // STEP 3: Convert photos → direct URLs
            List<Map<String, Object>> photos =
                    (List<Map<String, Object>>) result.get("photos");

            List<String> urls = new ArrayList<>();

            if (photos != null) {
                for (Map<String, Object> p : photos) {
                    String ref = (String) p.get("photo_reference");
                    urls.add(
                            PHOTO_URL + "?maxwidth=1200&photo_reference=" + ref + "&key=" + apiKey
                    );
                }
            }

            result.put("photos", urls);

            Map<String, Object> response = Map.of(
                    "status", "OK",
                    "result", result
            );

            placeCache.put(key, response);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("status", "ERROR", "message", e.getMessage())
            );
        }
    }

    //
//    @GetMapping("/photo")
//    public ResponseEntity<Map<String, Object>> getPhoto(
//            @RequestParam("destination") String destination) {
//
//        try {
//            String searchUrl = TEXT_URL +
//                    "?query=" + destination +
//                    "&key=" + apiKey;
//
//            Map<String, Object> search = restTemplate.getForObject(searchUrl, Map.class);
//            List<Map<String, Object>> results = (List<Map<String, Object>>) search.get("results");
//
//            if (results == null || results.isEmpty()) {
//                return ResponseEntity.ok(Map.of("photo", ""));
//            }
//
//            Map<String, Object> first = results.get(0);
//            List<Map<String, Object>> photos = (List<Map<String, Object>>) first.get("photos");
//
//            if (photos == null || photos.isEmpty()) {
//                return ResponseEntity.ok(Map.of("photo", ""));
//            }
//
//            String ref = (String) photos.get(0).get("photo_reference");
//
//            String photoUrl = PHOTO_URL +
//                    "?maxwidth=1200&photo_reference=" + ref +
//                    "&key=" + apiKey;
//
//            return ResponseEntity.ok(Map.of("photo", photoUrl));
//
//        } catch (Exception e) {
//            return ResponseEntity.ok(Map.of("photo", ""));
//        }
//    }
    @GetMapping("/photo")
    public ResponseEntity<Map<String, Object>> getPhoto(
            @RequestParam("destination") String destination) {

        try {
            String searchUrl = TEXT_URL +
                    "?query=" + destination +
                    "&key=" + apiKey;

            Map<String, Object> search = restTemplate.getForObject(searchUrl, Map.class);
            List<Map<String, Object>> results = (List<Map<String, Object>>) search.get("results");

            // If no place found
            if (results == null || results.isEmpty()) {
                return ResponseEntity.ok(Map.of("photo", null));
            }

            Map<String, Object> first = results.get(0);

            List<Map<String, Object>> photos =
                    (List<Map<String, Object>>) first.get("photos");

            // If place has no photos → return null (NOT empty string)
            if (photos == null || photos.isEmpty()) {
                return ResponseEntity.ok(Map.of("photo", null));
            }

            // Build Google photo URL
            String ref = (String) photos.get(0).get("photo_reference");

            String photoUrl = PHOTO_URL +
                    "?maxwidth=1200&photo_reference=" + ref +
                    "&key=" + apiKey;

            return ResponseEntity.ok(Map.of("photo", photoUrl));

        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("photo", null));
        }
    }


    @Scheduled(fixedRate = 86400000)
    public void clearCache() {
        placeCache.clear();
    }
}

