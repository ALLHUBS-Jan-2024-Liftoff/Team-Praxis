package org.teampraxis.BarkBook_API.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.teampraxis.BarkBook_API.models.Event;
import org.teampraxis.BarkBook_API.models.Place;
import org.teampraxis.BarkBook_API.models.User;
import org.teampraxis.BarkBook_API.repositories.EventRepository;
import org.teampraxis.BarkBook_API.repositories.PlaceRepository;
import org.teampraxis.BarkBook_API.repositories.UserRepository;

import java.util.Optional;


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
    public Event createEvent(Integer userId, String placeId, Event event) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));
        Place place = placeRepository.findByPlaceId(placeId)
                .orElseThrow(() -> new EntityNotFoundException("Place not found: " + placeId));
        event.setCreator(user);
        event.setPlace(place);
        place.getEvents().add(event);

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

    public Event updateEvent(Integer eventId, Event newEvent) {
        return eventRepository.findById(eventId)
                .map(event -> {
                    event.setName(newEvent.getName());
                    event.setDate(newEvent.getDate());
                    event.setDescription(newEvent.getDescription());
                    return eventRepository.save(event);
                }).orElseThrow(() -> new EntityNotFoundException("Event not found: " + eventId));
    }

    public Event updateEventAndPlace(Integer eventId, Event event, String placeId) {

        // if oldEvent has a place, remove that event from that old place... if it's there :)
        Optional.ofNullable(event.getPlace())
                .ifPresent(oldPlace -> oldPlace.getEvents().remove(event));


        Event updatedEvent = updateEvent(eventId, event);
        Place newPlace = placeRepository.findByPlaceId(placeId)
                .orElseThrow(() -> new EntityNotFoundException("Place not found: " + placeId));
        updatedEvent.setPlace(newPlace);
        newPlace.getEvents().add(updatedEvent);

        return eventRepository.save(updatedEvent);
    }

}
