package com.travmate.controller;

import com.travmate.model.JoinRequestNotification;
import com.travmate.model.TripMember;
import com.travmate.service.TripMemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-members")
public class TripMemberController {

    private final TripMemberService tripMemberService;
    private final SimpMessagingTemplate messagingTemplate;

    public TripMemberController(TripMemberService tripMemberService,
                                SimpMessagingTemplate messagingTemplate) {
        this.tripMemberService = tripMemberService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/{tripId}/request")
    public ResponseEntity<?> requestToJoinTrip(@PathVariable Long tripId, Authentication auth) {
        TripMember req = tripMemberService.requestToJoin(tripId, auth.getName());

        // notify owner via WS
        var notif = new JoinRequestNotification(
                req.getId(),
                req.getTrip().getTitle(),
                req.getUser().getEmail()
        );
        String ownerTopic = "/topic/trip/" + req.getTrip().getCreatedBy().getEmail().toLowerCase();
        messagingTemplate.convertAndSend(ownerTopic, notif);

        return ResponseEntity.ok("Join request sent");
    }

    @GetMapping("/{tripId}/requests")
    public ResponseEntity<?> getJoinRequests(@PathVariable Long tripId, Authentication auth) {
        List<TripMember> pending = tripMemberService.getPendingRequests(tripId, auth.getName());
        return ResponseEntity.ok(pending);
    }

    @PostMapping("/requests/{requestId}/respond")
    public ResponseEntity<?> respondToJoinRequest(@PathVariable Long requestId,
                                                  @RequestParam boolean accept,
                                                  Authentication auth) {
        tripMemberService.respondToRequest(requestId, accept, auth.getName());
        return ResponseEntity.ok(accept ? "Request accepted" : "Request rejected");
    }

    @GetMapping("/{tripId}/members")
    public ResponseEntity<?> getTripMembers(@PathVariable Long tripId) {
        return ResponseEntity.ok(tripMemberService.getAcceptedMembers(tripId));
    }
}
