package com.travmate.service.impl;

import com.travmate.model.Trip;
import com.travmate.model.User;
import com.travmate.repository.TripRepository;
import com.travmate.repository.UserRepository;
import com.travmate.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TripServiceImpl implements TripService {

    @Autowired private TripRepository tripRepository;
    @Autowired private UserRepository userRepository;

    @Override
    public Trip createTrip(Trip trip, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        trip.setCreatedBy(user);
        return tripRepository.save(trip);
    }

    @Override
    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }

    @Override
    public List<Trip> getAllTripsByCreator(String userEmail) {
        User creator = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
        return tripRepository.findByCreatedBy(creator);
    }

    @Override
    public Trip updateTrip(Long id, Trip details, String userEmail) {
        Trip t = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        if (!t.getCreatedBy().getEmail().equals(userEmail)) {
            throw new RuntimeException("You are not allowed to update this trip!");
        }
        t.setTitle(details.getTitle());
        t.setDestination(details.getDestination());
        t.setStartDate(details.getStartDate());
        t.setEndDate(details.getEndDate());
        t.setHeroImageUrl(details.getHeroImageUrl());
        return tripRepository.save(t);
    }

    @Override
    public void deleteTrip(Long id, String userEmail) {
        Trip t = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        if (!t.getCreatedBy().getEmail().equals(userEmail)) {
            throw new RuntimeException("You are not allowed to delete this trip!");
        }
        tripRepository.delete(t);
    }
}
