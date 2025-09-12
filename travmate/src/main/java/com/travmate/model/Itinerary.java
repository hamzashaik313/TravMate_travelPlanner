package com.travmate.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
public class Itinerary implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int dayNumber;
    private String activity;
    private double estimatedCost;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    // Constructors
    public Itinerary() {}

    public Itinerary(int dayNumber, String activity, double estimatedCost, Trip trip) {
        this.dayNumber = dayNumber;
        this.activity = activity;
        this.estimatedCost = estimatedCost;
        this.trip = trip;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public int getDayNumber() { return dayNumber; }
    public void setDayNumber(int dayNumber) { this.dayNumber = dayNumber; }
    public String getActivity() { return activity; }
    public void setActivity(String activity) { this.activity = activity; }
    public double getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(double estimatedCost) { this.estimatedCost = estimatedCost; }
    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }
}

