package org.teampraxis.BarkBook_API.dto;


public class PlaceDTO {

    // external Id
    private String id;

    private LocationDTO location;

    private String displayName;

    private String formattedAddress;

    private String googleMapsURI;

    public PlaceDTO() {}

    public PlaceDTO(String id, LocationDTO location, String displayName, String formattedAddress, String googleMapsURI) {
        this.id = id;
        this.location = location;
        this.displayName = displayName;
        this.formattedAddress = formattedAddress;
        this.googleMapsURI = googleMapsURI;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getFormattedAddress() {
        return formattedAddress;
    }

    public void setFormattedAddress(String formattedAddress) {
        this.formattedAddress = formattedAddress;
    }

    public String getGoogleMapsURI() {
        return googleMapsURI;
    }

    public void setGoogleMapsURI(String googleMapsURI) {
        this.googleMapsURI = googleMapsURI;
    }
}
