package com.travmate.service.impl;

import com.travmate.model.Trip;
import com.travmate.model.TripMember;
import com.travmate.model.User;
import com.travmate.repository.TripMemberRepository;
import com.travmate.repository.TripRepository;
import com.travmate.repository.UserRepository;
import com.travmate.service.TripMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripMemberServiceImpl implements TripMemberService {

    @Autowired private TripMemberRepository tripMemberRepository;
    @Autowired private TripRepository tripRepository;
    @Autowired private UserRepository userRepository;

    @Override
    public TripMember requestToJoin(Long tripId, String userEmail) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        if (trip.getCreatedBy().getEmail().equals(userEmail)) {
            throw new RuntimeException("Owner cannot request to join their own trip");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (tripMemberRepository.existsByTripAndUser(trip, user)) {
            throw new RuntimeException("Already requested or already a member");
        }

        TripMember member = new TripMember(trip, user);
        member.setStatus("pending");
        return tripMemberRepository.save(member);
    }

    @Override
    public List<TripMember> getPendingRequests(Long tripId, String ownerEmail) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        if (!trip.getCreatedBy().getEmail().equals(ownerEmail)) {
            throw new RuntimeException("Not allowed");
        }
        return tripMemberRepository.findByTripIdAndStatus(tripId, "pending");
    }

    @Override
    public void respondToRequest(Long requestId, boolean accept, String ownerEmail) {
        TripMember req = tripMemberRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        Trip trip = req.getTrip();
        if (!trip.getCreatedBy().getEmail().equals(ownerEmail)) {
            throw new RuntimeException("Not allowed");
        }
        req.setStatus(accept ? "accepted" : "rejected");
        tripMemberRepository.save(req);
    }

    @Override
    public List<TripMember> getAcceptedMembers(Long tripId) {
        return tripMemberRepository.findByTripIdAndStatus(tripId, "accepted");
    }
}


