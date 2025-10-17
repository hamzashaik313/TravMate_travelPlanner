//package com.travmate.dto;
//
//public class LoginResponse {
//    private String token;
//
//    public LoginResponse(String token) {
//        this.token = token;
//    }
//
//    public String getToken() { return token; }
//    public void setToken(String token) { this.token = token; }
//}

//Gemini -Hi traveler

package com.travmate.dto;

public class LoginResponse {
    private String token;
    private String name;
    private String email;

    // NO ARG CONSTRUCTOR (Good practice)
    public LoginResponse() {}

    // FULL ARG CONSTRUCTOR (Used by AuthController)
    public LoginResponse(String token, String name, String email) {
        this.token = token;
        this.name = name;
        this.email = email;
    }

    // --- Getters ---

    public String getToken() {
        return token;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    // --- Setters (MUST return void) ---

    public void setToken(String token) {
        this.token = token;
    }

    public void setName(String name) { // <-- This method MUST be void
        this.name = name;
    }

    public void setEmail(String email) { // <-- This method MUST be void
        this.email = email;
    }
}