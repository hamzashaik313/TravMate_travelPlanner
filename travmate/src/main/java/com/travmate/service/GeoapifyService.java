//package com.travmate.service;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.*;
//
//@Service
//public class TomTomService {
//
//    @Value("${tomtom.api.key}")
//    private String apiKey;
//
//    @Value("${tomtom.base.url}")
//    private String baseUrl;
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    // ✅ Step 1: Convert city name to coordinates
//    public double[] geocodeCity(String city) {
//        String url = "https://api.tomtom.com/search/2/geocode/" + city + ".json?key=" + apiKey;
//
//        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
//
//        if (response.getBody() != null && response.getBody().containsKey("results")) {
//            List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("results");
//
//            if (!results.isEmpty()) {
//                Map<String, Object> position = (Map<String, Object>) results.get(0).get("position");
//                double lat = (double) position.get("lat");
//                double lon = (double) position.get("lon");
//                return new double[]{lat, lon};
//            }
//        }
//
//        throw new RuntimeException("Could not geocode city: " + city);
//    }
//
//    // ✅ Step 2: Get attractions using coordinates
//    public List<String> getAttractions(String city) {
//        double[] coords = geocodeCity(city);
//        double lat = coords[0];
//        double lon = coords[1];
//
//        String url = baseUrl + "/attractions.json?key=" + apiKey +
//                "&lat=" + lat + "&lon=" + lon +
//                "&radius=5000&limit=10";
//
//        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
//
//        List<String> attractions = new ArrayList<>();
//
//        if (response.getBody() != null && response.getBody().containsKey("results")) {
//            List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("results");
//
//            for (Map<String, Object> place : results) {
//                Map<String, Object> poi = (Map<String, Object>) place.get("poi");
//                if (poi != null && poi.containsKey("name")) {
//                    attractions.add((String) poi.get("name"));
//                }
//            }
//        }
//
//        return attractions;
//    }
//
//    public List<String> getAttractions(double lat, double lon) {
//        return List.of();
//    }
//}


//20-09- 4:30 pm


package com.travmate.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeoapifyService {

    private static final String API_KEY = "Ya293aaa7b79d4315972747a229265f9f";
    private static final String BASE_URL = "https://api.geoapify.com/v2/places";

    public List<String> getTouristPlaces(String city) {
        List<String> places = new ArrayList<>();
        try {
            String url = BASE_URL
                    + "?categories=tourism.sights&text=" + city
                    + "&limit=10&apiKey=" + API_KEY;

            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            if (root.has("features")) {
                for (JsonNode feature : root.get("features")) {
                    JsonNode properties = feature.get("properties");
                    if (properties != null) {
                        // ✅ use path() instead of get() to avoid null pointer
                        String name = properties.path("name").asText("");
                        if (!name.isEmpty()) {
                            places.add(name);
                        }
                    }
                }
            }

        } catch (Exception e) {
            places.add("Error fetching places: " + e.getMessage());
        }
        return places;
    }
}





