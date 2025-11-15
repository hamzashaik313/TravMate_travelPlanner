
package com.travmate.service;

import com.travmate.model.Trip;
import java.util.List;
import java.util.Optional;

public interface TripService {
    Trip createTrip(Trip trip, String userEmail);
    Optional<Trip> getTripById(Long id);

    // CRITICAL FIX: Changed signature to require userEmail
    List<Trip> getAllTripsByCreator(String userEmail);

    // DELETE THE OLD, INSECURE: List<Trip> getAllTrips();

    Trip updateTrip(Long id, Trip tripDetails, String userEmail);
    void deleteTrip(Long id, String userEmail);
}

