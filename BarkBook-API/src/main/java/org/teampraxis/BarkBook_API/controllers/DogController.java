package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.models.Dog;
import org.teampraxis.BarkBook_API.models.dto.DogRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:8080")
@RestController // combines ResponseBody and Controller annotation. Used in RESTful web services. Automatically  converts return value of the methods to JSON
@RequestMapping("/add-dog")
public class DogController {

    @Autowired
    private DogRepository dogRepository;

    @PostMapping
    public Dog addDog(@RequestBody Dog reqDog) {
        return dogRepository.save(reqDog);
    }


    // method for displaying specific dog information
//    @GetMapping("/{dogId}")
//    public String displayDogById(Model model, @PathVariable int dogId) {
//
//        Optional optDog = dogRepository.findById(dogId);
//        if (optDog.isPresent()) {
//            Dog dog = (Dog) optDog.get();
//            model.addAttribute("dog", dog);
//        } else {
//            return "redirect:../";
//        }
//
//        return "dog";
//    }

    // methods for adding a dog
//    @GetMapping
//    public String displayAddDogForm(Model model) {
//        model.addAttribute("title", "Add Dog");
//        model.addAttribute(new Dog());
//        return "add";
//    }

}
