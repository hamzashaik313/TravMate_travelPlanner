package com.travmate.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trip_members",
        uniqueConstraints = @UniqueConstraint(columnNames = {"trip_id", "user_id"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TripMember {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    @JsonIgnoreProperties({"itineraries", "tripMembers"}) // reduce payload
    private Trip trip;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"password"}) // hide sensitive
    private User user;

    private String status = "pending"; // pending/accepted/rejected
    private LocalDateTime requestedAt = LocalDateTime.now();

    public TripMember() {}
    public TripMember(Trip trip, User user) {
        this.trip = trip; this.user = user; this.status = "pending";
    }

    // getters/setters
    public Long getId() { return id; }
    public Trip getTrip() { return trip; } public void setTrip(Trip t) { this.trip = t; }
    public User getUser() { return user; } public void setUser(User u) { this.user = u; }
    public String getStatus() { return status; } public void setStatus(String s) { this.status = s; }
    public LocalDateTime getRequestedAt() { return requestedAt; } public void setRequestedAt(LocalDateTime t) { this.requestedAt = t; }
}
