package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.models.dto.EventRepository;

import java.util.List;


@RestController
//@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/create-event")
    Event newEvent(@RequestBody Event newEvent) {
        return eventRepository.save(newEvent);
    }

    @GetMapping("/events")
    List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}

//@CrossOrigin("http://localhost:8080")