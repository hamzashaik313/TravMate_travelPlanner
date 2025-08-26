
package com.travmate.service;

import com.travmate.model.User;
import com.travmate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

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

    //  required for Spring Security
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        //  wrap your User in a Spring Security UserDetails object
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER") //  you can customize roles here
                .build();
    }
}


