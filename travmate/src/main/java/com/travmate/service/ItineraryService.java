package com.travmate.service;

import com.travmate.model.Itinerary;
import com.travmate.model.Trip;
import com.travmate.repository.ItineraryRepository;
import com.travmate.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class ItineraryService {

    private final Map<String, List<String>> destinationAttractions = new HashMap<>();

    public ItineraryService() {
        // Predefined attractions for testing
        destinationAttractions.put("Goa Beaches", Arrays.asList(
                "Visit Baga Beach",
                "Explore Fort Aguada",
                "Dolphin sighting tour",
                "Shopping at local markets",
                "Island hopping",
                "Sunset at Chapora Fort"
        ));
        destinationAttractions.put("Jaipur", Arrays.asList(
                "Amber Fort visit",
                "City Palace tour",
                "Hawa Mahal sightseeing",
                "Local bazaar shopping",
                "Elephant sanctuary",
                "Evening cultural show"
        ));
    }

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private ItineraryRepository itineraryRepository;

//    public List<Itinerary> generateItinerary(Long tripId) {
//        Trip trip = tripRepository.findById(tripId)
//                .orElseThrow(() -> new RuntimeException("Trip not found"));
//
//        int days = (int) (trip.getEndDate().toEpochDay() - trip.getStartDate().toEpochDay()) + 1;
//        double dailyBudget = trip.getBudget() / days;
//        int tripDays = (int) ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
//
//
//       List<Itinerary> itineraries = new ArrayList<>();
//
////        for (int i = 1; i <= days; i++) {
////            Itinerary item = new Itinerary();
////            item.setDayNumber(i);
////            item.setActivity("Explore local attractions on Day " + i);
////            item.setEstimatedCost(dailyBudget);
////            item.setTrip(trip);
////            itineraries.add(item);
////        }
//
//        List<String> activities = destinationAttractions.get(trip.getDestination());
//
//        for (int i = 0; i < tripDays; i++) {
//            Itinerary itinerary = new Itinerary();
//            itinerary.setDayNumber(i + 1);
//            itinerary.setActivity(activities.get(i)); // use real activity
//            itinerary.setEstimatedCost(trip.getBudget() / tripDays);
//            itinerary.setTrip(trip);
//            itineraryRepository.save(itinerary);
//        }
//
//
//        // clear old ones & save new
//        itineraryRepository.deleteAll(itineraryRepository.findByTripId(tripId));
//        return itineraryRepository.saveAll(itineraries);
//    }
public List<Itinerary> generateItinerary(Long tripId) {
    Trip trip = tripRepository.findById(tripId)
            .orElseThrow(() -> new RuntimeException("Trip not found"));

    int tripDays = (int) ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
    double dailyBudget = trip.getBudget() / tripDays;

    // Clear old itineraries first
    itineraryRepository.deleteAll(itineraryRepository.findByTripId(tripId));

    List<String> activities = destinationAttractions.getOrDefault(
            trip.getDestination(),
            Collections.nCopies(tripDays, "Explore local attractions")
    );

    List<Itinerary> itineraries = new ArrayList<>();

    for (int i = 0; i < tripDays; i++) {
        Itinerary itinerary = new Itinerary();
        itinerary.setDayNumber(i + 1);
        String activity = (i < activities.size()) ? activities.get(i) : activities.get(activities.size() - 1);
        itinerary.setActivity(activity);
        itinerary.setEstimatedCost(dailyBudget);
        itinerary.setTrip(trip);

        itineraries.add(itinerary);
    }

    return itineraryRepository.saveAll(itineraries);
}



    public List<Itinerary> getItinerary(Long tripId) {
        return itineraryRepository.findByTripId(tripId);
    }
}

