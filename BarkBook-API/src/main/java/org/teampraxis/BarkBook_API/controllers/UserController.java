package org.teampraxis.BarkBook_API.controllers;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.exceptions.UserNotFoundException;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.UserRepository;
import org.teampraxis.BarkBook_API.security.JwtService;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/newUser")
    public User newUser(@RequestParam String email,
                        @RequestParam String username,
                        @RequestParam String password,
                        @RequestParam String verifyPassword) {

        Optional<User> existingUserOpt = userRepository.findByEmail(email);

        if (existingUserOpt.isPresent()) {
            throw new IllegalArgumentException("User with that email already exists");
        }

        if (password.equals(verifyPassword)) {
            User newUser = new User();
            String hashedPassword = passwordEncoder.encode(password);
            newUser.setEmail(email);
            newUser.setUsername(username);
            newUser.setPassword(hashedPassword);

            return userRepository.save(newUser);
        } else {
            throw new IllegalArgumentException("Passwords do not match");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> userLogin(@RequestParam String email, @RequestParam String password) {

        User user;

        if (!userRepository.existsByEmail(email)) {
            throw new NoSuchElementException("User with that email not found");
        } else {
            user = userRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("User with that email not found"));
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Wrong password");
        }

        User secureUser = user;
        secureUser.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        String token = jwtService.generateToken(user);
        response.put("token", token);
        response.put("user", secureUser);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/getUser/all")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/getUser/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Could not find user with id: " + id));
    }

    @PutMapping("/updateUser")
    User updateUser(@RequestParam int id,
                    @RequestParam String username,
                    @RequestParam String password,
                    @RequestParam String verifyPassword) {

        User user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Could not find user with id: " + id));

        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("Password cannot be blank");
        }

        if (password.equals(verifyPassword)) {
            String hashedPassword = passwordEncoder.encode(password);
            user.setUsername(username);
            user.setPassword(hashedPassword);

            return userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Passwords do not match");
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    String deleteUser(@PathVariable int id) {
        if (!userRepository.existsById(id)) {
            throw new NoSuchElementException("Could not find user with id: " + id);
        }
        userRepository.deleteById(id);
        return "User id " + id + " has been deleted.";
    }
}
