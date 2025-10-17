//
////Gemini -Hi traveler
//package com.travmate.controller;
//
//import com.travmate.model.User;
//import com.travmate.repository.UserRepository;
//import com.travmate.security.JwtUtil;
//import com.travmate.dto.UserRequest;
//import com.travmate.dto.LoginRequest;
//import com.travmate.dto.LoginResponse;
//import com.travmate.dto.StatusResponse; // Import for consistent error messaging
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.userdetails.UsernameNotFoundException; // Needed for fetching user
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    // Register User (FIXED for JSON response)
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody UserRequest request) {
//        if (request.getPassword() == null || request.getPassword().isBlank()) {
//            return ResponseEntity.badRequest().body(new StatusResponse("Password cannot be empty!"));
//        }
//
//        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
//            return ResponseEntity.badRequest().body(new StatusResponse("Email already exists!"));
//        }
//
//        User user = new User();
//        user.setEmail(request.getEmail());
//        user.setName(request.getName());
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        user.setRole("ROLE_USER");
//
//        userRepository.save(user);
//
//        return ResponseEntity.ok(new StatusResponse("Account created successfully! Please log in."));
//    }
//
//    //Login(MODIFIED to return user name and email)
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//        try {
//            // Authenticate the user credentials
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
//            );
//
//            String token = jwtUtil.generateToken(request.getEmail());
//
//            // 1. Fetch the full User object from the database
//            User user = userRepository.findByEmail(request.getEmail())
//                    .orElseThrow(() -> new UsernameNotFoundException("User not found after successful auth."));
//
//            // 2. Create the LoginResponse DTO with the user details
//            LoginResponse response = new LoginResponse(
//                    token,
//                    user.getName(), // Pass the user's name
//                    user.getEmail() // Pass the user's email
//            );
//
//            return ResponseEntity.ok(response);
//
//        } catch (AuthenticationException e) {
//            // Return consistent JSON error message
//            return ResponseEntity.status(401).body(new StatusResponse("Invalid email or password"));
//        }
//
//
//
//    }
//}
//


package com.travmate.controller;

import com.travmate.model.User;
import com.travmate.repository.UserRepository;
import com.travmate.security.JwtUtil;
import com.travmate.dto.UserRequest;
import com.travmate.dto.LoginRequest;
import com.travmate.dto.LoginResponse;
import com.travmate.dto.StatusResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Allow all origins for now (important when frontend is on 3000)
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // ==============================
    // REGISTER USER
    // ==============================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequest request) {
        // Validate password
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(new StatusResponse("Password cannot be empty!"));
        }

        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new StatusResponse("Email already exists!"));
        }

        // Create and save new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName() != null && !request.getName().isBlank()
                ? request.getName()
                : request.getEmail().split("@")[0]); // fallback: email prefix as name
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return ResponseEntity.ok(new StatusResponse("Account created successfully! Please log in."));
    }

    // ==============================
    // LOGIN USER
    // ==============================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Authenticate credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Generate JWT token
            String token = jwtUtil.generateToken(request.getEmail());

            // Fetch full user object
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found after authentication."));

            // Fallback: ensure name is never null
            String displayName = (user.getName() != null && !user.getName().isBlank())
                    ? user.getName()
                    : user.getEmail().split("@")[0];

            // Build response with token + user details
            LoginResponse response = new LoginResponse(
                    token,
                    displayName,
                    user.getEmail()
            );

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(new StatusResponse("Invalid email or password"));
        }
    }
}



