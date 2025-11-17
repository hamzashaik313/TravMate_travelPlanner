
package com.travmate.controller;

import com.travmate.model.Itinerary;
import com.travmate.service.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itinerary")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @PostMapping("/generate/{tripId}")
    public List<Itinerary> generateItinerary(@PathVariable Long tripId) {
        return itineraryService.generateItinerary(tripId);
    }
}
