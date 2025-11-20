
package com.travmate.service.impl;

import com.travmate.model.Trip;
import com.travmate.model.User;
import com.travmate.repository.TripRepository;
import com.travmate.repository.UserRepository;
import com.travmate.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripServiceImpl implements TripService {

    @Autowired
    private TripRepository tripRepository; // Assumed to have findByCreatedBy(User user)

    @Autowired
    private UserRepository userRepository;

    @Override
    public Trip createTrip(Trip trip, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        trip.setCreatedBy(user);
        return tripRepository.save(trip);
    }

    @Override
    public Optional<Trip> getTripById(Long id) {
        // NOTE: For full security, this should also check ownership.
        return tripRepository.findById(id);
    }

    // CRITICAL SECURITY FIX: Fetches trips ONLY created by the authenticated user
    @Override
    public List<Trip> getAllTripsByCreator(String userEmail) {
        User creator = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found."));

        // This relies on the TripRepository having: List<Trip> findByCreatedBy(User user);
        return tripRepository.findByCreatedBy(creator);
    }
@Override
public Trip updateTrip(Long id, Trip tripDetails, String userEmail) {
    Trip trip = tripRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Trip not found"));

    if (!trip.getCreatedBy().getEmail().equals(userEmail)) {
        throw new RuntimeException("You are not allowed to update this trip!");
    }
    trip.setTitle(tripDetails.getTitle());
    trip.setDestination(tripDetails.getDestination());
    trip.setStartDate(tripDetails.getStartDate());
    trip.setEndDate(tripDetails.getEndDate());

    // Save updated trip
    return tripRepository.save(trip);
}


    @Override
    public void deleteTrip(Long id, String userEmail) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (!trip.getCreatedBy().getEmail().equals(userEmail)) {
            throw new RuntimeException("You are not allowed to delete this trip!");
        }

        tripRepository.delete(trip);
    }
}






