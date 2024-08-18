package org.teampraxis.BarkBook_API.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.teampraxis.BarkBook_API.models.Dog;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.DogRepository;
import org.teampraxis.BarkBook_API.repositories.UserRepository;

@Service
public class DogService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DogRepository dogRepository;

    // sets current user adding the dog as the owner (userId)
    public Dog addDog(Integer userId, Dog dog) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));
        dog.setOwner(user);
        return dogRepository.save(dog);
    }

}
