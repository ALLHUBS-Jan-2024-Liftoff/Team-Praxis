package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.exceptions.DogNotFoundException;
import org.teampraxis.BarkBook_API.models.Dog;
import org.teampraxis.BarkBook_API.repositories.DogRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController // combines ResponseBody and Controller annotation. Used in RESTful web services. Automatically  converts return value of the methods to JSON
public class DogController {

    @Autowired
    private DogRepository dogRepository;

    @PostMapping("/add-dog")
    public Dog addDog(@RequestBody Dog reqDog) {
        return dogRepository.save(reqDog);
    }

    @GetMapping("/users")
    List<Dog> getAllDogs() {
        return dogRepository.findAll();
    }

    @GetMapping("/users/dog/{id}")
    public Dog getUserById(@PathVariable Integer id) {
        return dogRepository.findById(id)
                .orElseThrow(() -> new DogNotFoundException(id));
    }
}
