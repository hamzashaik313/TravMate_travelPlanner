package com.travmate.dto;

public class StatusResponse {
    private String message;

    public StatusResponse(String message) {
        this.message = message;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}