package com.travmate.repository;

import com.travmate.model.Trip;
import com.travmate.model.TripMember;
import com.travmate.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripMemberRepository extends JpaRepository<TripMember, Long> {
    boolean existsByTripAndUser(Trip trip, User user);
    boolean existsByTripIdAndUserId(Long tripId, Long userId);

    List<TripMember> findByTripIdAndStatus(Long tripId, String status);
    List<TripMember> findByTripAndStatus(Trip trip, String status);
}
