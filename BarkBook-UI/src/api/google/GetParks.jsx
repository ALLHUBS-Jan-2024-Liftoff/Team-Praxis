import {AdvancedMarker, useMap, useMapsLibrary} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";

const usePlacesLibrary = () => {
    const placesLibrary = useMapsLibrary('places');
    const [places, setPlaces] = useState(null);
    useEffect(() => {
        if (!placesLibrary) return;
        setPlaces(placesLibrary);
    }, [placesLibrary]);
    return places;
}

const useCoreLibrary = () => {
    const coreLibrary = useMapsLibrary('core');
    const [core, setCore] = useState(null);
    useEffect(() => {
        if (!coreLibrary) return;
        setCore(coreLibrary);
    }, [coreLibrary]);
    return core;
}

export const GetParks = (props) => {
    const map = useMap();
    const placesLibrary = usePlacesLibrary();
    const coreLibrary = useCoreLibrary();
    const [parks, setParks] = useState(null);

    // perform query
    useEffect(() => {
        if (!placesLibrary) return;

        const radiusMiles = props.radiusMiles;
        const searchCenter = props.searchCenter;
        const milesToMetres = (miles) => {
            return miles * 1609.344
        }
        const radiusMeters = milesToMetres(radiusMiles);

        // https://developers.google.com/maps/documentation/javascript/reference/place#Place
        const requestNearby = {
            fields: ["displayName", "location", "allowsDogs", "types"],
            locationRestriction: {
                center: searchCenter,
                radius: radiusMeters,
            },
            includedPrimaryTypes: [ "dog_park", "park", "national_park"],
            // includedPrimaryTypes: [ "dog_park"],
            excludedPrimaryTypes: ["amusement_park", "rv_park", "park_and_ride", "parking"],
            // maxResultCount: 10,
            rankPreference: placesLibrary.SearchNearbyRankPreference.DISTANCE,
            language: "en-US",
            region: "us",
        };

        // https://developers.google.com/maps/documentation/javascript/reference/place#SearchNearbyRequest
        const fetchData = async () => {
            try {
                const response = await placesLibrary.Place.searchNearby(requestNearby);
                setParks(response.places);
            } catch (error) {
                console.log("bad response: " + error);
            }
        }
        fetchData();
    }, [placesLibrary, props]);

    // sets zoom level of map based on query results
    useEffect(() => {
        if (!parks) return;
        const bounds = new coreLibrary.LatLngBounds;
        parks.map((park) => {
            bounds.extend(park.location);
        });
        map.fitBounds(bounds);
    }, [parks, map, coreLibrary]);

    // if no parks found by query, return no markers
    if (!parks) {
        return <></>
    }
    return (
        <>
            {parks.map((park, index) => (
                <AdvancedMarker position={park.location} key={index} />
            ))}
        </>
    )
}
