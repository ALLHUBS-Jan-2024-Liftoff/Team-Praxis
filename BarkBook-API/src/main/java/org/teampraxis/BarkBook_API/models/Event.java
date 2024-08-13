package org.teampraxis.BarkBook_API.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "event")
@Data   // shortcut for setters and getters, reduces code
@NoArgsConstructor // shortcut for empty constructor, reduces code
@AllArgsConstructor // shortcut for constructors, reduces code
@Builder    // create instances of this class with an API
public class Event {

    @Id
    @GeneratedValue
    private int id;

    @NotBlank(message = "Name of event is required.")
    @Size(min = 3, max = 50, message = "Name of event must be between 3 and 50 characters.")
    private String name;

    @NotBlank(message = "Location is required.")
    private String location;

    @NotNull(message = "Event date is required.")
    private LocalDateTime date;

    @Size(max = 500, message = "Description is too long!")
    private String description;

    // for user who created event
    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    // for users attending event
    @ManyToMany(mappedBy = "attendingEvents")
    private List<User> attendees;

}