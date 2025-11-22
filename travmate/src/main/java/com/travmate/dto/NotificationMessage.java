// com/travmate/dto/NotificationMessage.java
package com.travmate.dto;

public class NotificationMessage {
    private String type;       // JOIN_REQUEST, REQUEST_ACCEPTED, REQUEST_REJECTED
    private Long tripId;
    private Long requestId;    // TripMember id
    private Long fromUserId;   // who triggered the event
    private String fromName;   // optional, for UI
    private String tripTitle;

    public NotificationMessage() {}

    public NotificationMessage(String type, Long tripId, Long requestId,
                               Long fromUserId, String fromName, String tripTitle) {
        this.type = type;
        this.tripId = tripId;
        this.requestId = requestId;
        this.fromUserId = fromUserId;
        this.fromName = fromName;
        this.tripTitle = tripTitle;
    }

    // getters/setters...

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
