import {
    AdvancedMarker,
    APIProvider,
    Map,
    Pin,
} from "@vis.gl/react-google-maps";
import {GetParks} from "./GetParks.jsx";
import {useState} from "react";
import userLocationImage from "/src/assets/gps.svg";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

// for testing
const kansasCity = {lat: 39.09, lng: -94.57};

const MapEmbed = (props) => {
    const center = props.position;
    const radius = props.radius;

    // TODO: handle marker states for info windows
    // marker open/closed state
    // const [open, setOpen] = useState(false);

    return (
        <div style={{width: '85vw', height: '60vh'}}>
            <APIProvider apiKey={API_KEY}>
                <Map
                    mapId={MAP_ID}
                    defaultCenter={center}
                    defaultZoom={15}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                >
                </Map>
                <AdvancedMarker position={center}>
                    <Pin scale={0}>
                        <img src={userLocationImage} className={"w-7 h-auto"} alt={"My Location"}/>
                    </Pin>
                </AdvancedMarker>
                <GetParks searchCenter={center} radiusMiles={radius} />
            </APIProvider>
        </div>
    )
}
export default MapEmbed;
