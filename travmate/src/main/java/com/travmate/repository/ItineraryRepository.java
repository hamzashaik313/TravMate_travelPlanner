package com.travmate.repository;

import com.travmate.model.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

    // Custom method to delete all itinerary items by trip ID
    @Transactional
    @Modifying
    @Query("DELETE FROM Itinerary i WHERE i.trip.id = :tripId")
    void deleteAllByTripId(Long tripId);

    // Fetch all itineraries for a trip if needed later
    List<Itinerary> findByTripId(Long tripId);
}
