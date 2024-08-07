package org.teampraxis.BarkBook_API.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.auth.service.UserService;

import java.util.*;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);

        return ResponseEntity.ok(user);
    }

    // TODO: implement this into front end so that user object needn't be stored in client localStorage
    @GetMapping("/get/me")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        currentUser.setPassword(null);
        return ResponseEntity.ok(currentUser);
    }

    @PutMapping("/update")
    ResponseEntity<User> updateUser(@RequestParam int id,
                    @RequestParam String displayName,
                    @RequestParam String currentPassword,
                    @RequestParam String newPassword,
                    @RequestParam String verifyNewPassword) {
        User user = userService.updateUser(id, displayName, currentPassword, newPassword, verifyNewPassword);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteUserById(@PathVariable int id) {
        boolean userDeleted = userService.deleteUserById(id);
        String response;

        if (userDeleted) {
            response = "User id " + id + " has been deleted.";
        } else {
            response = "User id " + id + " could not be deleted.";
        }
        System.out.println(response);
        return ResponseEntity.ok(response);
    }
}
