package com.travmate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trip")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Trip {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private String heroImageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // prevent recursion in /api/trips response
    private List<Itinerary> itineraries = new ArrayList<>();

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // prevent recursion in /api/trips response
    private List<TripMember> tripMembers = new ArrayList<>();

    // getters/setters
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; } public void setTitle(String title) { this.title = title; }
    public String getDestination() { return destination; } public void setDestination(String destination) { this.destination = destination; }
    public LocalDate getStartDate() { return startDate; } public void setStartDate(LocalDate s) { this.startDate = s; }
    public LocalDate getEndDate() { return endDate; } public void setEndDate(LocalDate e) { this.endDate = e; }
    public String getHeroImageUrl() { return heroImageUrl; } public void setHeroImageUrl(String u) { this.heroImageUrl = u; }
    public User getCreatedBy() { return createdBy; } public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }
}

