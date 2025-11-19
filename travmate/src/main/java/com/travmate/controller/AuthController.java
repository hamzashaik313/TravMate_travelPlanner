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
@CrossOrigin(origins = "*") // Allows local frontend access
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequest request) {
        // Validation check uses StatusResponse DTO
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(new StatusResponse("Password cannot be empty!"));
        }

        // Email check uses StatusResponse DTO
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new StatusResponse("Email already exists!"));
        }

        // Create and save new user
        User user = new User();
        user.setEmail(request.getEmail());
        // Fallback name logic: uses email prefix if name is null/blank
        user.setName(request.getName() != null && !request.getName().isBlank()
                ? request.getName()
                : request.getEmail().split("@")[0]);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return ResponseEntity.ok(new StatusResponse("Account created successfully! Please log in."));
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            String token = jwtUtil.generateToken(request.getEmail());

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found after authentication."));

            // Ensure name is never null for frontend display
            String displayName = (user.getName() != null && !user.getName().isBlank())
                    ? user.getName()
                    : user.getEmail().split("@")[0];

            // Build final response
            LoginResponse response = new LoginResponse(
                    token,
                    displayName,
                    user.getEmail()
            );

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            // Returns StatusResponse DTO for 401 error message
            return ResponseEntity.status(401).body(new StatusResponse("Invalid email or password"));
        }
    }
}