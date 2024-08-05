package org.teampraxis.BarkBook_API.exceptions;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException(Integer id) {
        super("Could not find the event with ID " + id);
    }
}
