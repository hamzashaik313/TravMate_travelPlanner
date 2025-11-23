//package com.travmate.controller;
//
//import com.travmate.model.User;
//import com.travmate.security.JwtUtil;
//import com.travmate.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.util.StringUtils;
//import java.nio.file.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/user")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    // CREATE User
//    @PostMapping
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        return ResponseEntity.ok(userService.saveUser(user));
//    }
//
//    // READ All Users
//    @GetMapping
//    public ResponseEntity<List<User>> getAllUsers() {
//        return ResponseEntity.ok(userService.getAllUsers());
//    }
//
//
//    // READ User by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable Long id) {
//        return userService.getUserById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // READ User by Email
//    @GetMapping("/email")
//    public ResponseEntity<User> getUserByEmail(@RequestParam String value) {
//        return userService.getUserByEmail(value)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // UPDATE User
//    @PutMapping("/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
//        return userService.getUserById(id)
//                .map(existingUser -> {
//                    if (userDetails.getName() != null) existingUser.setName(userDetails.getName());
//                    if (userDetails.getEmail() != null) existingUser.setEmail(userDetails.getEmail());
//                    if (userDetails.getPhone() != null) existingUser.setPhone(userDetails.getPhone());
//                    if (userDetails.getBio() != null) existingUser.setBio(userDetails.getBio());
//                    if (userDetails.getPreferredCurrency() != null)
//                        existingUser.setPreferredCurrency(userDetails.getPreferredCurrency());
//                    if (userDetails.getPreferredLanguage() != null)
//                        existingUser.setPreferredLanguage(userDetails.getPreferredLanguage());
//
//                    if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
//                        existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
//                    }
//
//                    return ResponseEntity.ok(userService.saveUser(existingUser));
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // DELETE User
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
//        return userService.getUserById(id)
//                .map(existingUser -> {
//                    userService.deleteUser(id);
//                    return ResponseEntity.noContent().<Void>build();
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // Test endpoint
//    @GetMapping("/hello")
//    public String helloUser() {
//        return "Hello USER ✅";
//    }
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    // --- GET /api/user/me  (load current user)
//    @GetMapping("/me")
//    public ResponseEntity<User> getCurrentUser(
//            @RequestHeader(value = "Authorization", required = false) String authHeader) {
//
//        if (authHeader == null || !authHeader.startsWith("Bearer "))
//            return ResponseEntity.status(401).build(); // avoid 400
//
//        String token = authHeader.substring(7);
//        String email = jwtUtil.extractUsername(token);
//
//        return userService.getUserByEmail(email)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//    // --- PUT /api/user/me  (update current user)
//    @PutMapping("/me")
//    public ResponseEntity<User> updateCurrentUser(
//            @RequestHeader(value = "Authorization", required = false) String authHeader,
//            @RequestBody User userDetails) {
//
//        if (authHeader == null || !authHeader.startsWith("Bearer "))
//            return ResponseEntity.status(401).build();
//
//        String token = authHeader.substring(7);
//        String email = jwtUtil.extractUsername(token);
//
//        return userService.getUserByEmail(email)
//                .map(existingUser -> {
//                    if (userDetails.getName() != null) existingUser.setName(userDetails.getName());
//                    if (userDetails.getPhone() != null) existingUser.setPhone(userDetails.getPhone());
//                    if (userDetails.getBio() != null) existingUser.setBio(userDetails.getBio());
//                    if (userDetails.getPreferredCurrency() != null)
//                        existingUser.setPreferredCurrency(userDetails.getPreferredCurrency());
//                    if (userDetails.getPreferredLanguage() != null)
//                        existingUser.setPreferredLanguage(userDetails.getPreferredLanguage());
//                    if (userDetails.getPassword() != null && !userDetails.getPassword().isBlank())
//                        existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
//
//                    return ResponseEntity.ok(userService.saveUser(existingUser));
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PutMapping("/me/password")
//    public ResponseEntity<?> updatePassword(
//            @RequestHeader(value = "Authorization", required = false) String authHeader,
//            @RequestBody Map<String, String> body) {
//
//        if (authHeader == null || !authHeader.startsWith("Bearer "))
//            return ResponseEntity.status(401).body("Missing or invalid token");
//
//        String token = authHeader.substring(7);
//        String email = jwtUtil.extractUsername(token);
//
//        String newPassword = body.get("newPassword");
//        if (newPassword == null || newPassword.isBlank()) {
//            return ResponseEntity.badRequest().body("Password cannot be empty");
//        }
//
//        return userService.getUserByEmail(email)
//                .map(existingUser -> {
//                    existingUser.setPassword(passwordEncoder.encode(newPassword));
//                    userService.saveUser(existingUser);
//                    return ResponseEntity.ok("Password updated successfully");
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//
//    @DeleteMapping("/me")
//    public ResponseEntity<?> deleteAccount(
//            @RequestHeader(value = "Authorization", required = false) String authHeader) {
//
//        if (authHeader == null || !authHeader.startsWith("Bearer "))
//            return ResponseEntity.status(401).body("Missing or invalid token");
//
//        String token = authHeader.substring(7);
//        String email = jwtUtil.extractUsername(token);
//
//        return userService.getUserByEmail(email)
//                .map(user -> {
//                    userService.deleteUser(user.getId());
//                    return ResponseEntity.ok("Account deleted successfully");
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//
//    @Value("${upload.path:uploads}")
//    private String uploadDir;
//
//    @PostMapping("/upload-photo")
//    public ResponseEntity<?> uploadPhoto(
//            @RequestHeader(value = "Authorization", required = false) String authHeader,
//            @RequestParam("file") MultipartFile file) {
//
//        if (authHeader == null || !authHeader.startsWith("Bearer "))
//            return ResponseEntity.status(401).body("Missing or invalid token");
//
//        String token = authHeader.substring(7);
//        String email = jwtUtil.extractUsername(token);
//
//        return userService.getUserByEmail(email)
//                .map(user -> {
//                    try {
//                        String filename = StringUtils.cleanPath(file.getOriginalFilename());
//                        Path uploadPath = Paths.get(uploadDir);
//                        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
//
//                        String fileName = user.getId() + "_" + filename;
//                        Path filePath = uploadPath.resolve(fileName);
//                        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//                        String fileUrl = "/uploads/" + fileName;
//                        user.setPhotoUrl(fileUrl);
//                        userService.saveUser(user);
//
//                        return ResponseEntity.ok(Map.of("photoUrl", fileUrl));
//                    } catch (Exception e) {
//                        return ResponseEntity.internalServerError().body("Failed to upload photo");
//                    }
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//
//
//
//
//}


package com.travmate.controller;

import com.travmate.model.User;
import com.travmate.service.UserService;
import com.travmate.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
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

    @Autowired
    private JwtUtil jwtUtil;

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

    // UPDATE User by ID
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

    // Simple test endpoint
    @GetMapping("/hello")
    public String helloUser() {
        return "Hello USER ✅";
    }

    // --- GET /api/user/me  (Get logged-in user)
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return ResponseEntity.status(401).build();

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- PUT /api/user/me  (Update current user details)
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

    // --- PUT /api/user/me/password  (Change password)
    @PutMapping("/me/password")
    public ResponseEntity<?> updatePassword(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Map<String, String> body) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return ResponseEntity.status(401).body(Map.of("message", "Missing or invalid token"));

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        String newPassword = body.get("newPassword");
        if (newPassword == null || newPassword.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password cannot be empty"));
        }

        return userService.getUserByEmail(email)
                .map(existingUser -> {
                    existingUser.setPassword(passwordEncoder.encode(newPassword));
                    userService.saveUser(existingUser);
                    return ResponseEntity.ok(Map.of("message", "Password updated successfully!"));
                })
                .orElse(ResponseEntity.status(404).body(Map.of("message", "User not found")));
    }

    // --- DELETE /api/user/me  (Delete current account)
    @DeleteMapping("/me")
    public ResponseEntity<?> deleteAccount(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return ResponseEntity.status(401).body(Map.of("message", "Missing or invalid token"));

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        return userService.getUserByEmail(email)
                .map(user -> {
                    userService.deleteUser(user.getId());
                    return ResponseEntity.ok(Map.of("message", "Account deleted successfully"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // --- POST /api/user/upload-photo  (Upload user profile photo)
    @Value("${upload.path:uploads}")
    private String uploadDir;

    @PostMapping("/upload-photo")
    public ResponseEntity<?> uploadPhoto(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam("file") MultipartFile file) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return ResponseEntity.status(401).body("Missing or invalid token");

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        return userService.getUserByEmail(email)
                .map(user -> {
                    try {
                        String filename = StringUtils.cleanPath(file.getOriginalFilename());
                        Path uploadPath = Paths.get("uploads");
                        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

                        String fileName = user.getId() + "_" + filename;
                        Path filePath = uploadPath.resolve(fileName);
                        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                        String fileUrl = "/uploads/" + fileName;
                        user.setPhotoUrl(fileUrl);
                        userService.saveUser(user); // ✅ This saves the photoUrl in DB

                        return ResponseEntity.ok(Map.of("photoUrl", fileUrl));
                    } catch (Exception e) {
                        return ResponseEntity.internalServerError().body("Failed to upload photo");
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }


}
