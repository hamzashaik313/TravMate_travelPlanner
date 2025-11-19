package com.travmate.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.beans.factory.annotation.Value;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GooglePlacesService {


    @Value("${google.places.api.key}")
    private String apiKey;



    private static final String GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

    public List<String> getTouristPlaces(String city) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            String url = UriComponentsBuilder.fromHttpUrl(GOOGLE_PLACES_URL)
                    .queryParam("query", "top tourist attractions and landmarks in " + city)
                    .queryParam("key", apiKey)
                    .toUriString();

            System.out.println("🔗 Request URL: " + url);

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response == null || !"OK".equals(response.get("status"))) {
                System.out.println("❌ Google API Error: " + response);
                return List.of("Error: " + (response != null ? response.get("error_message") : "Unknown error"));
            }

            List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
            List<String> places = new ArrayList<>();

            if (results != null) {
                for (Map<String, Object> place : results) {
                    places.add((String) place.get("name"));
                }
            }

            return places;

        } catch (Exception e) {
            e.printStackTrace();
            return List.of("Error fetching places for " + city);
        }
    }
}


