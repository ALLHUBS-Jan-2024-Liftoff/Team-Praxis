package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.exceptions.EventNotFoundException;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.EventRepository;
import org.teampraxis.BarkBook_API.service.EventService;

import java.util.List;


@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;


    // @AuthenticationPrincipal ensures it gets the authenticated current user
    @PostMapping("/create-event")
    public ResponseEntity<?> createEvent(@AuthenticationPrincipal User currentUser, @RequestBody Event newEvent) {
        Event createdEvent = eventService.createEvent(currentUser.getId(), newEvent);
        return ResponseEntity.ok(createdEvent);
    }

     @GetMapping
     List<Event> getAllEvents() {
         return eventRepository.findAll();
     }

     @GetMapping("/{id}")
     public Event getEventById(@PathVariable Integer id) {
        return eventRepository.findById(id)
                .orElseThrow(()-> new EventNotFoundException(id));
     }

     @PutMapping("/{id}")
     public Event updateEvent(@RequestBody Event newEvent, @PathVariable Integer id) {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setName(newEvent.getName());
                    event.setLocation(newEvent.getLocation());
                    event.setDate(newEvent.getDate());
                    event.setDescription(newEvent.getDescription());
                    return eventRepository.save(event);
                }).orElseThrow(() -> new EventNotFoundException(id));
     }

     @DeleteMapping("/{id}")
     String deleteEvent(@PathVariable Integer id) {
        if(!eventRepository.existsById(id)) {
            throw new EventNotFoundException(id);
        }
        eventRepository.deleteById(id);
        return "Event with ID " + id + " has been deleted.";
     }
}
