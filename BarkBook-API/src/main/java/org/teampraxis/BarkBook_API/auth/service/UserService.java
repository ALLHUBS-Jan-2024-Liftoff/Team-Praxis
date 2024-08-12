package org.teampraxis.BarkBook_API.auth.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + id));
    }

    public User updateUser(int id,
                           String displayName,
                           String currentPassword,
                           String newPassword,
                           String verifyNewPassword) {

        User user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Could not find user with id: " + id));

        if (currentPassword == null || currentPassword.isBlank()) {
            throw new IllegalArgumentException("Current Password cannot be blank");
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("'Current Password' incorrect");
        }

        // if no new password, update only display name
        if (newPassword == null || newPassword.isBlank()) {
            user.setDisplayName(displayName);
            return userRepository.save(user);
        } else {
            if (newPassword.equals(verifyNewPassword)) {
                String hashedPassword = passwordEncoder.encode(newPassword);
                user.setDisplayName(displayName);
                user.setPassword(hashedPassword);

                return userRepository.save(user);
            } else {
                throw new IllegalArgumentException("New Password and Verify do not match");
            }
        }
    }

    public boolean deleteUserById(int id) {

        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return !userRepository.existsById(id);
        } else {
            throw new NoSuchElementException("Could not find user with id: " + id);
        }
    }
}
