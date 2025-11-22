package com.travmate.service;

import com.travmate.model.TripMember;
import java.util.List;

public interface TripMemberService {
    TripMember requestToJoin(Long tripId, String userEmail);
    List<TripMember> getPendingRequests(Long tripId, String ownerEmail);
    void respondToRequest(Long requestId, boolean accept, String ownerEmail);
    List<TripMember> getAcceptedMembers(Long tripId);
}
