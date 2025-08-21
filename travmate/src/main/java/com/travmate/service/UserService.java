

package com.travmate.service;

import com.travmate.model.User;
import com.travmate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // CREATE or UPDATE
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // READ all
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // READ by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // READ by Email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // DELETE
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}