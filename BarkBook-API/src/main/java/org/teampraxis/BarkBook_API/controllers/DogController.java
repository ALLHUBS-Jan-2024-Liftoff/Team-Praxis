package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.models.Dog;
import org.teampraxis.BarkBook_API.models.dto.DogRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController // combines ResponseBody and Controller annotation. Used in RESTful web services. Automatically  converts return value of the methods to JSON
@RequestMapping("/add-dog")
public class DogController {

    @Autowired
    private DogRepository dogRepository;

    @PostMapping
    public Dog addDog(@RequestBody Dog reqDog) {
        return dogRepository.save(reqDog);
    }
}
