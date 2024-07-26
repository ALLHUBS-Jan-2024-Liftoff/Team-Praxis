package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Date;

@Entity
public class Event {

    @Id
    @GeneratedValue
    private int id;

    @NotBlank(message = "Name of event is required.")
    @Size(min = 3, max = 50, message = "Name of event must be between 3 and 50 characters.")
    private String name;

    @NotBlank(message = "Location is required.")
    private String location;

    @NotBlank(message = "Event date is required.")
    private Date date;

    @Size(max = 500, message = "Description is too long!")
    private String description;

    public Event(String name, String location, Date date, String description) {
        this.name = name;
        this.location = location;
        this.date = date;
        this.description = description;
    }

    public Event() {}

    public int getId() {
        return id;
    }

    public @NotBlank(message = "Name of event is required.") @Size(min = 3, max = 50, message = "Name of event must be between 3 and 50 characters.") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name of event is required.") @Size(min = 3, max = 50, message = "Name of event must be between 3 and 50 characters.") String name) {
        this.name = name;
    }

    public @NotBlank(message = "Location is required.") String getLocation() {
        return location;
    }

    public void setLocation(@NotBlank(message = "Location is required.") String location) {
        this.location = location;
    }

    public @NotBlank(message = "Event date is required.") Date getDate() {
        return date;
    }

    public void setDate(@NotBlank(message = "Event date is required.") Date date) {
        this.date = date;
    }

    public @Size(max = 500, message = "Description is too long!") String getDescription() {
        return description;
    }

    public void setDescription(@Size(max = 500, message = "Description is too long!") String description) {
        this.description = description;
    }
}
