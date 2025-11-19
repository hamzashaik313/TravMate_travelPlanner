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

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    public Itinerary() {}

    // Constructor used when saving
    public Itinerary(int dayNumber, String activity, Trip trip) {
        this.dayNumber = dayNumber;
        this.activity = activity;
        this.trip = trip;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getDayNumber() { return dayNumber; }
    public void setDayNumber(int dayNumber) { this.dayNumber = dayNumber; }

    public String getActivity() { return activity; }
    public void setActivity(String activity) { this.activity = activity; }

    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }
}


