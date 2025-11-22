package com.travmate.repository;

import com.travmate.model.Trip;
import com.travmate.model.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByCreatedBy(User user);

    // Users (owners) who go to same destination & overlap, excluding the given tripId
    @Query("""
        select t.createdBy from Trip t
        where lower(t.destination) = lower(:dest)
          and t.startDate <= :end
          and t.endDate >= :start
          and t.id <> :excludeId
    """)
    List<User> findUsersByDestinationAndDateOverlap(
            @Param("dest") String destination,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            @Param("excludeId") Long excludeTripId
    );

    // Other trips you can match with (exclude my own and the same trip)
    @Query("""
        select t from Trip t
        where lower(t.destination) = lower(:dest)
          and t.startDate <= :end
          and t.endDate >= :start
          and t.id <> :excludeId
          and lower(t.createdBy.email) <> lower(:myEmail)
        order by t.startDate asc
    """)
    List<Trip> findMatchingTrips(
            @Param("dest") String destination,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            @Param("excludeId") Long excludeTripId,
            @Param("myEmail") String myEmail
    );

    // Generic search excluding the logged-in user
    @Query("""
        select t from Trip t
        where lower(t.destination) = lower(:dest)
          and t.startDate <= :end
          and t.endDate >= :start
          and lower(t.createdBy.email) <> lower(:myEmail)
        order by t.startDate asc
    """)
    List<Trip> findByDestinationAndDateOverlapExcludingUser(
            @Param("dest") String destination,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            @Param("myEmail") String myEmail
    );
}

