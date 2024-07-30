package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.repositories.EventRepository;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:5173")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/create-event")
    Event newEvent(@RequestBody Event newEvent) {
        return eventRepository.save(newEvent);
    }

    @GetMapping("/user")
    List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}