import {AdvancedMarker, Map, Pin, useMap, useMapsLibrary} from "@vis.gl/react-google-maps";
import userLocationImage from "../../assets/gps.svg";
import {MarkerWithInfoWindow} from "./MarkerWithInfoWindow.jsx";
import {useEffect, useState} from "react";

const MAP_ID = import.meta.env.VITE_MAP_ID;

const useCoreLibrary = () => {
    const coreLibrary = useMapsLibrary('core');
    const [core, setCore] = useState(null);
    useEffect(() => {
        if (!coreLibrary) return;
        setCore(coreLibrary);
    }, [coreLibrary]);
    return core;
}

export const MapViewSinglePlace = ({position, place}) => {

    const map = useMap();
    const coreLibrary = useCoreLibrary();
    const [openInfoWindow, setOpenInfoWindow] = useState(null);

    useEffect(() => {
        if (!place || !map || !coreLibrary) return;
        const bounds = new coreLibrary.LatLngBounds;
        bounds.extend(position);
        bounds.extend(place.location);
        map.fitBounds(bounds);
    }, [position, place, map, coreLibrary]);

    const handleMarkerClick = (id) => {
        setOpenInfoWindow(prevId => (prevId === id ? null : id));
    }


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
            <MarkerWithInfoWindow
                place={place}
                isOpen={openInfoWindow === 1}
                onClick={() => handleMarkerClick(1)}
                onClose={() => handleMarkerClick(null)}
            />
        </>
    )
}