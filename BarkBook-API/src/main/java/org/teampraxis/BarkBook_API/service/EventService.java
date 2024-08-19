package org.teampraxis.BarkBook_API.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.models.Place;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.EventRepository;
import org.teampraxis.BarkBook_API.repositories.PlaceRepository;
import org.teampraxis.BarkBook_API.repositories.UserRepository;


@Service
public class EventService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final PlaceRepository placeRepository;

    public EventService(UserRepository userRepository, EventRepository eventRepository, PlaceRepository placeRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.placeRepository = placeRepository;
    }

   // sets current user creating an event to creator id
    public Event createEvent(Integer userId, Event event) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));
        event.setCreator(user);
        return eventRepository.save(event);
    }


}
