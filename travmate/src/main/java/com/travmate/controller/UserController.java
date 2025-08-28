
package com.travmate.controller;

import com.travmate.model.User;
import com.travmate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")  // 🔑 changed from /api/users to /api/user
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
//    @PutMapping("/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
//        return userService.getUserById(id)
//                .map(existingUser -> {
//                    existingUser.setName(userDetails.getName());
//                    existingUser.setEmail(userDetails.getEmail());
//                    existingUser.setPassword(userDetails.getPassword());
//                    return ResponseEntity.ok(userService.saveUser(existingUser));
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userService.getUserById(id)
                .map(existingUser -> {
                    existingUser.setName(userDetails.getName());
                    existingUser.setEmail(userDetails.getEmail());

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

}
