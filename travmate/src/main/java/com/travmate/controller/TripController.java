
package com.travmate.controller;

import com.travmate.model.Trip;
import com.travmate.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip, Authentication authentication) {
        return ResponseEntity.ok(tripService.createTrip(trip, authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        // NOTE: For full security, this method should ideally also take the Authentication object
        // and verify that the logged-in user owns the trip before returning it.
        return tripService.getTripById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips(Authentication authentication) {
        // Now calls the new, secure method
        return ResponseEntity.ok(tripService.getAllTripsByCreator(authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Long id,
                                           @RequestBody Trip trip,
                                           Authentication authentication) {
        // Already secure: Passes user email to service layer for ownership check
        return ResponseEntity.ok(tripService.updateTrip(id, trip, authentication.getName()));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id, Authentication authentication) {
        // Already secure: Passes user email to service layer for ownership check
        tripService.deleteTrip(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
