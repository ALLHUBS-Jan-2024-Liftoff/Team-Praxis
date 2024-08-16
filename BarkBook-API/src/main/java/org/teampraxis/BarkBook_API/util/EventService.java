package org.teampraxis.BarkBook_API.util;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.teampraxis.BarkBook_API.auth.service.UserService;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.EventRepository;
import org.teampraxis.BarkBook_API.repositories.UserRepository;

import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

   // sets current user creating an event to creator id
    public Event createEvent(Integer userId, Event event) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));
        event.setCreator(user);
        return eventRepository.save(event);
    }


}