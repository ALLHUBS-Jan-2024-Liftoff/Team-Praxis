package org.teampraxis.BarkBook_API.service;

import org.springframework.stereotype.Service;
import org.teampraxis.BarkBook_API.dto.LocationDTO;
import org.teampraxis.BarkBook_API.dto.PlaceDTO;
import org.teampraxis.BarkBook_API.models.Location;
import org.teampraxis.BarkBook_API.models.Place;
import org.teampraxis.BarkBook_API.repositories.PlaceRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PlaceService {

    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    // TODO: convert to "createOrGetPlace" after relating Place and Event entities
    public PlaceDTO createPlace(PlaceDTO placeDTO) {
        Optional<Place> placeOpt = placeRepository.findByPlaceId(placeDTO.getId());

        if(placeOpt.isEmpty()) {
            Place place = convertToPlace(placeDTO);
            place = placeRepository.save(place);
            return convertToDto(place);
        } else {
            return convertToDto(placeOpt.get());
        }
    }

    public List<Place> getAllPlaces() {
        return new ArrayList<>(placeRepository.findAll());
    }

    public PlaceDTO getPlaceDtoById(Long id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(NoSuchElementException::new);
        return convertToDto(place);
    }

    public PlaceDTO convertToDto(Place place) {
        // convert PlaceId to external id, to avoid confusion in front end
        LocationDTO locationDTO = new LocationDTO(
                place.getLocation().getLat(),
                place.getLocation().getLng()
        );
        return new PlaceDTO(
                place.getPlaceId(),
                locationDTO,
                place.getDisplayName(),
                place.getFormattedAddress(),
                place.getGoogleMapsURI()
        );
    }

    public Place convertToPlace(PlaceDTO placeDTO) {
        Location location = new Location(
                placeDTO.getLocation().getLat(),
                placeDTO.getLocation().getLng()
        );
        return new Place(
                placeDTO.getId(),
                location,
                placeDTO.getDisplayName(),
                placeDTO.getFormattedAddress(),
                placeDTO.getGoogleMapsURI()
        );
    }


}
