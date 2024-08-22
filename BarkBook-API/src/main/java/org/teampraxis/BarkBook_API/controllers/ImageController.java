package org.teampraxis.BarkBook_API.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.teampraxis.BarkBook_API.service.StorageService;

import java.io.IOException;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private StorageService service;

    // used to upload image
    @PostMapping
    public ResponseEntity<?> uploadImage (@RequestParam("image") MultipartFile file) throws IOException {
        String uploadImage = service.uploadImage(file); // calls the service method & sets it equal to a local variable
        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);  // returns a 200 OK http response & body response value of uploadImage
    }

    // used to display the image
    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImage (@PathVariable String fileName) {
        byte[] image = service.downloadImage(fileName);// calls service method & sets it equal to the byte array
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);    // MediaType is dynamic, can add more later
    }
}
