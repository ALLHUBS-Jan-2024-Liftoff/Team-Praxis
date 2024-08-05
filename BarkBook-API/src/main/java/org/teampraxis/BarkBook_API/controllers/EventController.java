package org.teampraxis.BarkBook_API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.exceptions.EventNotFoundException;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.repositories.EventRepository;

import java.util.List;


@RestController
@RequestMapping("/api/event")
@CrossOrigin("http://localhost:5173")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/create-event")
    public Event newEvent(@RequestBody Event newEvent) {
        return eventRepository.save(newEvent);
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
