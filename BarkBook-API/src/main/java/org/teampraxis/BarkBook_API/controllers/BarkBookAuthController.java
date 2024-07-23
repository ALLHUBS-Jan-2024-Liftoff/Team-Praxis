package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.exceptions.UserNotFoundException;
import org.teampraxis.BarkBook_API.models.BarkBookAuth;
import org.teampraxis.BarkBook_API.repositories.BarkBookRepository;

import java.util.List;

@RestController("/")
@CrossOrigin("http://localhost:5173")
public class BarkBookAuthController {

    @Autowired
    private BarkBookRepository barkBookRepository;

    @PostMapping("/api/register")
    BarkBookAuth newUser(@RequestBody BarkBookAuth newUser) {
        return barkBookRepository.save(newUser);
    }

    @GetMapping("/api/users")
    List<BarkBookAuth> getAllUsers() {
       return barkBookRepository.findAll();
    }

    @GetMapping("/api/user/{id}")
    BarkBookAuth getUserById(@PathVariable Long id) {
        return barkBookRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/api/user/{id}")
    BarkBookAuth updateUser(@RequestBody BarkBookAuth newUser, @PathVariable Long id) {
        return barkBookRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setPassword(newUser.getPassword());
                    return barkBookRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/api/users/{id}")
    String deleteUser(@PathVariable Long id){
        if(!barkBookRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        barkBookRepository.deleteById(id);
        return  "User with id "+id+" has been deleted.";
    }
}
