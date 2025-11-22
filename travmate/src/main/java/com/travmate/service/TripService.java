package com.travmate.service;

import com.travmate.model.Trip;
import java.util.List;
import java.util.Optional;

public interface TripService {
    Trip createTrip(Trip trip, String userEmail);
    Optional<Trip> getTripById(Long id);
    List<Trip> getAllTripsByCreator(String userEmail);
    Trip updateTrip(Long id, Trip tripDetails, String userEmail);
    void deleteTrip(Long id, String userEmail);
}
