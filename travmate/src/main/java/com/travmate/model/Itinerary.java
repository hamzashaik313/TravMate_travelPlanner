
package com.travmate.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "itinerary")
public class Itinerary implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int dayNumber;
    private String activity;
    private double estimatedCost;

    // ✅ Each itinerary belongs to one Trip
    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    // ✅ Default constructor (required by JPA)
    public Itinerary() {}

    // ✅ Constructor with all fields (for DB save)
    public Itinerary(int dayNumber, String activity, double estimatedCost, Trip trip) {
        this.dayNumber = dayNumber;
        this.activity = activity;
        this.estimatedCost = estimatedCost;
        this.trip = trip;
    }

    // ✅ Optional 3-arg constructor (for flexibility)
    public Itinerary(int dayNumber, String activity, double estimatedCost) {
        this.dayNumber = dayNumber;
        this.activity = activity;
        this.estimatedCost = estimatedCost;
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getDayNumber() { return dayNumber; }
    public void setDayNumber(int dayNumber) { this.dayNumber = dayNumber; }

    public String getActivity() { return activity; }
    public void setActivity(String activity) { this.activity = activity; }

    public double getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(double estimatedCost) { this.estimatedCost = estimatedCost; }

    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }
}
