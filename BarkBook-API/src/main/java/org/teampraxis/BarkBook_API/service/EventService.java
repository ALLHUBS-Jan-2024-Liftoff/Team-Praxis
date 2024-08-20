package org.teampraxis.BarkBook_API.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.EventRepository;
import org.teampraxis.BarkBook_API.repositories.UserRepository;


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

    // transactional makes sure both user and event are updated in the same go
    @Transactional
    public void addUserToEvent(Integer attendeeId, Integer eventId) throws Exception {
        User user = userRepository.findById(attendeeId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + attendeeId));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found: " + eventId));

        event.getAttendees().add(user);  // add user to the events list of attendees
        user.getAttendingEvents().add(event); // add the event to the users list of attending events

        eventRepository.save(event);
    }



}
