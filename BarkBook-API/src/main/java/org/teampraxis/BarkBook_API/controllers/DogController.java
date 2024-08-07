package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.exceptions.DogNotFoundException;
import org.teampraxis.BarkBook_API.models.Dog;
import org.teampraxis.BarkBook_API.repositories.DogRepository;

import java.util.List;

@RestController // combines ResponseBody and Controller annotation. Used in restful web services. Automatically  converts return value of the methods to JSON
@RequestMapping("/api/dog")
public class DogController {

    @Autowired
    private DogRepository dogRepository;


    // Used for adding a dog to database
    @PostMapping("/add-dog")
    public Dog addDog(@RequestBody Dog reqDog) {
        return dogRepository.save(reqDog);
    }

    // both methods below used for displaying dog data
    @GetMapping
    List<Dog> getAllDogs() {
        return dogRepository.findAll();
    }

    @GetMapping("/{id}")
    public Dog getDogById(@PathVariable Integer id) {
        return dogRepository.findById(id)
                .orElseThrow(() -> new DogNotFoundException(id));
    }

//    @GetMapping("/user/edit-dog/{id}")
//    public Dog getEditDogById(@PathVariable Integer id) {
//        return dogRepository.findById(id)
//                .orElseThrow(() -> new DogNotFoundException(id));
//    }

    // used for editing specific data dog by id
    @PutMapping("/{id}")
    public Dog updateDogById(@RequestBody Dog reqDog, @PathVariable Integer id) {
        return dogRepository.findById(id)
                .map(dog -> {
                    dog.setDogName(reqDog.getDogName());
                    dog.setDogAge(reqDog.getDogAge());
                    dog.setBreed(reqDog.getBreed());
                    dog.setWeight(reqDog.getWeight());
                    return dogRepository.save(dog);
                }).orElseThrow(() -> new DogNotFoundException(id));
    }

    // used to delete dog by id
    @DeleteMapping("/{id}")
    String deleteDogById(@PathVariable Integer id){
        if(!dogRepository.existsById(id)){
            throw new DogNotFoundException(id);
        }
        dogRepository.deleteById(id);
        return  "Dog with id "+id+" has been deleted successfully.";
    }
}
