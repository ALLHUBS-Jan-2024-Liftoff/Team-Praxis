package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.teampraxis.BarkBook_API.exceptions.DogNotFoundException;
import org.teampraxis.BarkBook_API.models.Dog;
import org.teampraxis.BarkBook_API.repositories.DogRepository;
import org.teampraxis.BarkBook_API.service.StorageService;

import java.io.IOException;
import java.util.List;

@RestController // combines ResponseBody and Controller annotation. Used in restful web services. Automatically  converts return value of the methods to JSON
@RequestMapping("/api/dog")
public class DogController {

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private StorageService service;


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


    // used to upload image
//    @PostMapping
//    public ResponseEntity<?> uploadImage (@RequestParam("image")MultipartFile file) throws IOException {
//        String uploadImage = service.uploadImage(file); // calls the service method & sets it equal to a local variable
//        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);  // returns a 200 OK http response & sets the response body to the value of uploadImage
//    }
//
//    // used to display the image
//    @GetMapping
//    public ResponseEntity<?> downloadImage (@PathVariable String fileName) {
//        byte[] image = service.downloadImage(fileName); // calls service method & sets it equal to the byte array
//        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);    // MediaType is dynamic, can add more later
//    }
}
