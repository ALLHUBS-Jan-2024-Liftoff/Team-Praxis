import {
    AdvancedMarker,
    Map,
    Pin, useApiIsLoaded, useMap, useMapsLibrary,
} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import userLocationImage from "/src/assets/gps.svg";
import {fetchParks} from "../../service/GoogleService.js";
import {MarkerWithInfoWindow} from "./MarkerWithInfoWindow.jsx";


const MAP_ID = import.meta.env.VITE_MAP_ID;

const usePlacesLibrary = () => {
    const placesLibrary = useMapsLibrary('places');
    const [placesLib, setPlacesLib] = useState(null);
    useEffect(() => {
        if (!placesLibrary) return;
        setPlacesLib(placesLibrary);
    }, [placesLibrary]);
    return placesLib;
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

const MapChoosePlace = ({position, radius, onLocationChoice}) => {


    const map = useMap();
    const apiIsLoaded = useApiIsLoaded();
    const placesLibrary = usePlacesLibrary();
    const coreLibrary = useCoreLibrary();

    const [loading, setLoading] = useState(true);
    const [places, setPlaces] = useState([]);
    const [openInfoWindow, setOpenInfoWindow] = useState(null);

    useEffect(() => {
        if (!placesLibrary || !radius || !position) return;

        const getParks = async () => {
            try {
                const result = await fetchParks(placesLibrary, radius, position);
                setPlaces(result);
                console.log("got parks");
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        getParks();
    }, [placesLibrary, radius, position]);

    // sets zoom level of map based on query results
    useEffect(() => {
        if (!places || !coreLibrary || !map) return;
        const bounds = new coreLibrary.LatLngBounds;
        bounds.extend(position)
        places.map((park) => {
            bounds.extend(park.location);
        });
        map.fitBounds(bounds);
        console.log("expanded map")
    }, [places, map, coreLibrary, position]);

    const handleMarkerClick = (id) => {
        setOpenInfoWindow(prevId => (prevId === id ? null : id));
    }

    const handleLocationChoice = (parkObj) => {
        onLocationChoice(parkObj);
    }

    if (loading) return <p>Loading... </p>;
    return (
        <>
            <Map
                mapId={MAP_ID}
                defaultCenter={position}
                defaultZoom={15}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
            >
            </Map>
            <AdvancedMarker position={position}>
                <Pin scale={0}>
                    <img src={userLocationImage} className={"w-7 h-auto"} alt={"My Location"}/>
                </Pin>
            </AdvancedMarker>
            {places.map((park, index) => (
                <MarkerWithInfoWindow
                    place={park}
                    key={index}
                    isOpen={openInfoWindow === index}
                    onClick={() => handleMarkerClick(index)}
                    onClose={() => handleMarkerClick(null)}
                    setChoice={() => handleLocationChoice(park)}
                />
            ))}
        </>
    )
}
export default MapChoosePlace;
