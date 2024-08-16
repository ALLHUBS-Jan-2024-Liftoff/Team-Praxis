package org.teampraxis.BarkBook_API.util;

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

    @Autowired
    private UserService userService;

   // this code is used if you want to handle user in the backend
//
//    public Event createEvent(Integer userId, Event event) {
//        // Logic to associate the event with the userId
//        event.setUserId(userId); // Assuming your Event entity has a userId field
//        return eventRepository.save(event);
//    }




// this code is used if you want to handle userId on the frontend
//    public Event newEvent (Integer userId, Event newEvent) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
//        newEvent.setCreator(user);
//        return eventRepository.save(newEvent);
//    }

}
