import {useEffect, useRef, useState} from "react";
import {useMapsLibrary} from "@vis.gl/react-google-maps";

const usePlacesLibrary = () => {
    const placesLibrary = useMapsLibrary('places');
    const [placesLib, setPlacesLib] = useState(null);
    useEffect(() => {
        if (!placesLibrary) return;
        setPlacesLib(placesLibrary);
    }, [placesLibrary]);
    return placesLib;
}

export const PlacesAutocomplete = ({onPlaceSelect}) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const placesLib = usePlacesLibrary();

    // define autocomplete library with a few field options
    useEffect(() => {
        if (!placesLib || !inputRef.current) return;
        const options = {
            fields: ["geometry", "name", "formatted_address"]
        };

        setPlaceAutocomplete(new placesLib.Autocomplete(inputRef.current, options));
    }, [placesLib]);

    // sends selected location to parent component
    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            if (!placeAutocomplete.getPlace().geometry) return;
            onPlaceSelect(placeAutocomplete.getPlace().geometry.location);
        });
    }, [onPlaceSelect, placeAutocomplete]);


    return (
        <div className={"autocomplete-container"}>
            <input
                ref={inputRef}
                placeholder={"Search for a place"}
                className="placeholder:italic placeholder:text-gray-400 w-full border border-black rounded-md py-2 pl-3"
            />
        </div>
    )
}