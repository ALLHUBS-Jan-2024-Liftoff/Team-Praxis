package org.teampraxis.BarkBook_API.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.teampraxis.BarkBook_API.exceptions.EventNotFoundException;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.EventRepository;
import org.teampraxis.BarkBook_API.service.EventService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/api/event")
public class EventController {

    private final EventRepository eventRepository;
    private final EventService eventService;

    public EventController(EventRepository eventRepository, EventService eventService) {
        this.eventRepository = eventRepository;
        this.eventService = eventService;
    }

    // @AuthenticationPrincipal ensures it gets the authenticated current user
    @PostMapping("/create-event")
    public ResponseEntity<?> createEvent(@AuthenticationPrincipal User currentUser, @RequestBody Event newEvent, @RequestParam String placeId) {
        Event createdEvent = eventService.createEvent(currentUser.getId(), placeId, newEvent);
        return ResponseEntity.ok(createdEvent);
    }

     @GetMapping
     List<Event> getAllEvents() {
         return eventRepository.findAll();
     }

     @GetMapping("/{id}")
     public ResponseEntity<HashMap<String, Object>> getEventById(@PathVariable Integer id) {
         Event event = eventRepository.findById(id)
                 .orElseThrow(() -> new NoSuchElementException("Event with id " + id + " not found"));

         event.getCreator().setPassword(null);
         HashMap<String, Object> body = new HashMap<>();
         body.put("event", event);
         body.put("place", event.getPlace());
         body.put("creator", event.getCreator());
         body.put("attendees", event.getAttendees());
         return ResponseEntity.ok(body);
     }

    @PutMapping("/{eventId}")
    public ResponseEntity<Event> updateEvent(@RequestBody Event newEvent,
                                             @RequestParam(required = false) String placeId,
                                             @PathVariable Integer eventId) {
        Event updatedEvent;

        if (placeId == null) {
            updatedEvent = eventService.updateEvent(eventId, newEvent);
        } else {
            updatedEvent = eventService.updateEventAndPlace(eventId, newEvent, placeId);
        }

        return ResponseEntity.ok(updatedEvent);
    }

     @DeleteMapping("/{id}")
     String deleteEvent(@PathVariable Integer id) {
        if(!eventRepository.existsById(id)) {
            throw new EventNotFoundException(id);
        }
        eventRepository.deleteById(id);
        return "Event with ID " + id + " has been deleted.";
     }

     // user
     @PostMapping("/{id}")
     public ResponseEntity<String> addUserToEvent(@PathVariable("id") Integer eventId,@RequestBody Map<String, Integer> attendee){
         try {
             Integer attendeeId = attendee.get("attendeeId");
             eventService.addUserToEvent(attendeeId, eventId);
             return ResponseEntity.ok("Attendee added to event successfully");
         } catch (Exception e) {
             return ResponseEntity.badRequest().body("Error adding attendee to event");
         }
     }


}
