package org.teampraxis.BarkBook_API.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // external Id
    @NotNull
    private String placeId;

    @Embedded
    private Location location;

    @NotNull
    private String displayName;

    @NotNull
    private String formattedAddress;

    @NotNull
    private String googleMapsURI;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("place-ref")
    private List<Event> events = new ArrayList<>();

    public Place() {}

    public Place(String placeId, Location location, String displayName, String formattedAddress, String googleMapsURI) {
        this.placeId = placeId;
        this.location = location;
        this.displayName = displayName;
        this.formattedAddress = formattedAddress;
        this.googleMapsURI = googleMapsURI;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotNull String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(@NotNull String placeId) {
        this.placeId = placeId;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public @NotNull String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(@NotNull String displayName) {
        this.displayName = displayName;
    }

    public @NotNull String getFormattedAddress() {
        return formattedAddress;
    }

    public void setFormattedAddress(@NotNull String formattedAddress) {
        this.formattedAddress = formattedAddress;
    }

    public @NotNull String getGoogleMapsURI() {
        return googleMapsURI;
    }

    public void setGoogleMapsURI(@NotNull String googleMapsURI) {
        this.googleMapsURI = googleMapsURI;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }
}
