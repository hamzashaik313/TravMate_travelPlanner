//
//package com.travmate.controller;
//
//import com.travmate.model.User;
//import com.travmate.repository.UserRepository;
//import com.travmate.security.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.AuthenticationException;
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
//    // ✅ Register User (default role = ROLE_USER)
////    @PostMapping("/register")
////    public ResponseEntity<?> register(@RequestBody User user) {
////        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
////            return ResponseEntity.badRequest().body("Email already exists!");
////        }
////
////        user.setPassword(passwordEncoder.encode(user.getPassword()));
////        user.setRole("ROLE_USER"); // Default role for regular users
////        userRepository.save(user);
////
////        return ResponseEntity.ok("User registered successfully!");
////    }
////    @PostMapping("/register")
////    public ResponseEntity<?> register(@RequestBody User user) {
////        if (user.getPassword() == null || user.getPassword().isBlank()) {
////            return ResponseEntity.badRequest().body("Password cannot be empty!");
////        }
////        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
////            return ResponseEntity.badRequest().body("Email already exists!");
////        }
////
////        user.setPassword(passwordEncoder.encode(user.getPassword()));
////        user.setRole("ROLE_USER"); // Default role
////        userRepository.save(user);
////
////        return ResponseEntity.ok("User registered successfully!");
////    }
////    @PostMapping("/register")
////    public ResponseEntity<?> register(@RequestBody User user) {
////        if (user.getPassword() == null || user.getPassword().isBlank()) {
////            return ResponseEntity.badRequest().body("Password cannot be empty!");
////        }
////        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
////            return ResponseEntity.badRequest().body("Email already exists!");
////        }
////
////        user.setPassword(passwordEncoder.encode(user.getPassword()));
////        user.setRole("ROLE_USER"); // Default role
////        userRepository.save(user);
////
////        return ResponseEntity.ok("User registered successfully!");
////    }
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        // Debugging: print the incoming request
//        System.out.println("Register request received:");
//        System.out.println("Email: " + user.getEmail());
//        System.out.println("Name: " + user.getName());
//        System.out.println("Password: '" + user.getPassword() + "'"); // Note the quotes to detect empty strings
//
//        // Validate email
//        if (user.getEmail() == null || user.getEmail().isBlank()) {
//            return ResponseEntity.badRequest().body("Email cannot be empty!");
//        }
//
//        // Validate password
//        if (user.getPassword() == null || user.getPassword().isBlank()) {
//            return ResponseEntity.badRequest().body("Password cannot be empty!");
//        }
//
//        // Check if email already exists
//        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
//            return ResponseEntity.badRequest().body("Email already exists!");
//        }
//
//        // Encode password and set default role
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        user.setRole("ROLE_USER");
//
//        // Save user
//        User savedUser = userRepository.save(user);
//
//        System.out.println("User registered successfully with ID: " + savedUser.getId());
//
//        // Return success
//        return ResponseEntity.ok("User registered successfully!");
//    }
//
//
//
//
//    // ✅ Register Admin (optional, only for admin setup)
//    @PostMapping("/register-admin")
//    public ResponseEntity<?> registerAdmin(@RequestBody User user) {
//        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
//            return ResponseEntity.badRequest().body("Email already exists!");
//        }
//
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        user.setRole("ROLE_ADMIN"); // Admin role
//        userRepository.save(user);
//
//        return ResponseEntity.ok("Admin registered successfully!");
//    }
//
//    // ✅ Login
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
//        try {
//            String email = loginData.get("email");
//            String password = loginData.get("password");
//
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(email, password)
//            );
//
//            String token = jwtUtil.generateToken(email); // JWT token with subject = email
//            Map<String, String> response = new HashMap<>();
//            response.put("token", token);
//
//            return ResponseEntity.ok(response);
//
//        } catch (AuthenticationException e) {
//            return ResponseEntity.status(401).body("Invalid email or password");
//        }
//    }
//}

package com.travmate.controller;

import com.travmate.model.User;
import com.travmate.repository.UserRepository;
import com.travmate.security.JwtUtil;
import com.travmate.dto.UserRequest;
import com.travmate.dto.LoginRequest;
import com.travmate.dto.LoginResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // Register User
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequest request) {
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Password cannot be empty!");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            String token = jwtUtil.generateToken(request.getEmail());
            return ResponseEntity.ok(new LoginResponse(token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}





