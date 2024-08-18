package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.exceptions.DogNotFoundException;
import org.teampraxis.BarkBook_API.models.Dog;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.DogRepository;
import org.teampraxis.BarkBook_API.repositories.ImageRepository;
import org.teampraxis.BarkBook_API.service.DogService;
import org.teampraxis.BarkBook_API.service.StorageService;

import java.util.List;

@RestController // combines ResponseBody and Controller annotation. Used in restful web services. Automatically  converts return value of the methods to JSON
@RequestMapping("/api/dog")
public class DogController {

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private StorageService service;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private DogService dogService;


    // because we need to return both Dog and the image, use ResponseEntity for flexibility
//    @PostMapping("/add-dog")
//    public ResponseEntity<Map<String, Object>> addDog (@RequestParam(value = "image") MultipartFile file, @RequestBody Dog reqDog) throws IOException {
//        // need to use a HashMap to store BOTH uploadImage string and Dog object
//        // this may complicate things on the front end
//        Map<String, Object> response = new HashMap<>();
//
//        String uploadImage = service.uploadImage(file);
//        response.put("uploadedImage", uploadImage);
//
//        // saves dog details, required by default & added to response
//        Dog savedDog = dogRepository.save(reqDog);
//        response.put("savedDog", savedDog);
//
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }


    // Used for adding a dog to database
//    @PostMapping("/add-dog")
//    public Dog addDog(@RequestBody Dog reqDog) {
//        return dogRepository.save(reqDog);
//    }

    @PostMapping("/add-dog")
    public ResponseEntity<?> addDog(@AuthenticationPrincipal User currentUser, @RequestBody Dog reqDog) {
        Dog newDog = dogService.addDog(currentUser.getId(), reqDog);
        return ResponseEntity.ok(newDog);
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
