package com.travmate.repository;

import com.travmate.model.Trip;
import com.travmate.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface    TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByCreatedBy(User user);
    List<Trip> findAllByCreatedById(Long userId);
}

