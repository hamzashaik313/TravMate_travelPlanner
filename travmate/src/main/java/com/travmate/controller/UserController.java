package com.travmate.controller;

import com.travmate.model.User;
import com.travmate.security.JwtUtil;
import com.travmate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;


    @Autowired
    private PasswordEncoder passwordEncoder;

    // CREATE User
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    // READ All Users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }


    // READ User by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // READ User by Email
    @GetMapping("/email")
    public ResponseEntity<User> getUserByEmail(@RequestParam String value) {
        return userService.getUserByEmail(value)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE User
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userService.getUserById(id)
                .map(existingUser -> {
                    if (userDetails.getName() != null) existingUser.setName(userDetails.getName());
                    if (userDetails.getEmail() != null) existingUser.setEmail(userDetails.getEmail());
                    if (userDetails.getPhone() != null) existingUser.setPhone(userDetails.getPhone());
                    if (userDetails.getBio() != null) existingUser.setBio(userDetails.getBio());
                    if (userDetails.getPreferredCurrency() != null)
                        existingUser.setPreferredCurrency(userDetails.getPreferredCurrency());
                    if (userDetails.getPreferredLanguage() != null)
                        existingUser.setPreferredLanguage(userDetails.getPreferredLanguage());

                    if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                        existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                    }

                    return ResponseEntity.ok(userService.saveUser(existingUser));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE User
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(existingUser -> {
                    userService.deleteUser(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Test endpoint
    @GetMapping("/hello")
    public String helloUser() {
        return "Hello USER ✅";
    }
    @Autowired
    private JwtUtil jwtUtil;

    // --- GET /api/user/me  (load current user)
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return ResponseEntity.status(401).build(); // avoid 400

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // --- PUT /api/user/me  (update current user)
    @PutMapping("/me")
    public ResponseEntity<User> updateCurrentUser(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody User userDetails) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return ResponseEntity.status(401).build();

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        return userService.getUserByEmail(email)
                .map(existingUser -> {
                    if (userDetails.getName() != null) existingUser.setName(userDetails.getName());
                    if (userDetails.getPhone() != null) existingUser.setPhone(userDetails.getPhone());
                    if (userDetails.getBio() != null) existingUser.setBio(userDetails.getBio());
                    if (userDetails.getPreferredCurrency() != null)
                        existingUser.setPreferredCurrency(userDetails.getPreferredCurrency());
                    if (userDetails.getPreferredLanguage() != null)
                        existingUser.setPreferredLanguage(userDetails.getPreferredLanguage());
                    if (userDetails.getPassword() != null && !userDetails.getPassword().isBlank())
                        existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));

                    return ResponseEntity.ok(userService.saveUser(existingUser));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/me/password")
    public ResponseEntity<?> updatePassword(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Map<String, String> body) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return ResponseEntity.status(401).body("Missing or invalid token");

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        String newPassword = body.get("newPassword");
        if (newPassword == null || newPassword.isBlank()) {
            return ResponseEntity.badRequest().body("Password cannot be empty");
        }

        return userService.getUserByEmail(email)
                .map(existingUser -> {
                    existingUser.setPassword(passwordEncoder.encode(newPassword));
                    userService.saveUser(existingUser);
                    return ResponseEntity.ok("Password updated successfully");
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/me")
    public ResponseEntity<?> deleteAccount(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return ResponseEntity.status(401).body("Missing or invalid token");

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        return userService.getUserByEmail(email)
                .map(user -> {
                    userService.deleteUser(user.getId());
                    return ResponseEntity.ok("Account deleted successfully");
                })
                .orElse(ResponseEntity.notFound().build());
    }




}
