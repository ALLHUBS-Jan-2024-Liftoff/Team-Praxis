package org.teampraxis.BarkBook_API.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.dto.PlaceDTO;
import org.teampraxis.BarkBook_API.models.Place;
import org.teampraxis.BarkBook_API.service.PlaceService;

import java.util.List;

@RestController
@RequestMapping("api/place")
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @PostMapping("/create")
    public ResponseEntity<PlaceDTO> createPlace(@RequestBody PlaceDTO placeDTO) {
        PlaceDTO response = placeService.createPlace(placeDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Place>> getAllPlaces() {
        List<Place> places = placeService.getAllPlaces();
        return ResponseEntity.ok(places);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PlaceDTO> getPlaceById(@PathVariable Long id) {
        PlaceDTO response = placeService.getPlaceDtoById(id);
        return ResponseEntity.ok(response);
    }
}
