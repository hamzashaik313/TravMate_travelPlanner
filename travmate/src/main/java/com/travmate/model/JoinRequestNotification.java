package com.travmate.model;

public class JoinRequestNotification {
    private Long requestId;
    private String tripTitle;
    private String senderEmail;

    public JoinRequestNotification() {}
    public JoinRequestNotification(Long requestId, String tripTitle, String senderEmail) {
        this.requestId = requestId; this.tripTitle = tripTitle; this.senderEmail = senderEmail;
    }

    public Long getRequestId() { return requestId; } public void setRequestId(Long id) { this.requestId = id; }
    public String getTripTitle() { return tripTitle; } public void setTripTitle(String t) { this.tripTitle = t; }
    public String getSenderEmail() { return senderEmail; } public void setSenderEmail(String e) { this.senderEmail = e; }
}
