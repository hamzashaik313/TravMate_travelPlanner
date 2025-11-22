package com.travmate.controller;

import com.travmate.model.Trip;
import com.travmate.model.User;
import com.travmate.repository.TripRepository;
import com.travmate.repository.UserRepository;
import com.travmate.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired private TripService tripService;
    @Autowired private TripRepository tripRepository;
    @Autowired private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip, Authentication auth) {
        return ResponseEntity.ok(tripService.createTrip(trip, auth.getName()));
    }

    // Return DTO so frontend gets createdByEmail without recursion
    @GetMapping("/{id}")
    public ResponseEntity<?> getTripById(@PathVariable Long id) {
        return tripService.getTripById(id)
                .map(t -> {
                    Map<String,Object> dto = new LinkedHashMap<>();
                    dto.put("id", t.getId());
                    dto.put("title", t.getTitle());
                    dto.put("destination", t.getDestination());
                    dto.put("startDate", t.getStartDate());
                    dto.put("endDate", t.getEndDate());
                    dto.put("heroImageUrl", t.getHeroImageUrl());
                    dto.put("createdByEmail", t.getCreatedBy() != null ? t.getCreatedBy().getEmail() : null);
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips(Authentication auth) {
        return ResponseEntity.ok(tripService.getAllTripsByCreator(auth.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Long id, @RequestBody Trip trip, Authentication auth) {
        return ResponseEntity.ok(tripService.updateTrip(id, trip, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id, Authentication auth) {
        tripService.deleteTrip(id, auth.getName());
        return ResponseEntity.noContent().build();
    }

    // Travelers (owners) going to same destination with overlapping dates
    @GetMapping("/{id}/travelers")
    public ResponseEntity<?> getTravelersForTrip(@PathVariable Long id) {
        return tripService.getTripById(id)
                .map(trip -> {
                    List<User> travelers = tripRepository.findUsersByDestinationAndDateOverlap(
                            trip.getDestination(), trip.getStartDate(), trip.getEndDate(), trip.getId());
                    List<Map<String,Object>> out = new ArrayList<>();
                    for (User u : travelers) {
                        Map<String,Object> m = new LinkedHashMap<>();
                        m.put("id", u.getId());
                        m.put("name", (u.getName()!=null && !u.getName().isBlank()) ? u.getName() : u.getEmail().split("@")[0]);
                        m.put("email", u.getEmail());
                        out.add(m);
                    }
                    return ResponseEntity.ok(out);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Matching trips list
    @GetMapping("/{id}/matching")
    public ResponseEntity<?> getMatchingTrips(@PathVariable Long id, Authentication auth) {
        Trip base = tripService.getTripById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        return ResponseEntity.ok(
                tripRepository.findMatchingTrips(
                        base.getDestination(), base.getStartDate(), base.getEndDate(), base.getId(), auth.getName()
                )
        );
    }

    // Explore/search endpoint (optional)
    @GetMapping("/search")
    public ResponseEntity<?> searchTrips(
            @RequestParam String destination,
            @RequestParam String start,
            @RequestParam String end,
            Authentication auth) {
        LocalDate s = LocalDate.parse(start);
        LocalDate e = LocalDate.parse(end);
        return ResponseEntity.ok(
                tripRepository.findByDestinationAndDateOverlapExcludingUser(destination, s, e, auth.getName())
        );
    }
}
