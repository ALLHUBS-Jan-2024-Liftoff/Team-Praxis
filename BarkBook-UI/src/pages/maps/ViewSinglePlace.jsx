import {useState} from "react";
import {APIProvider} from "@vis.gl/react-google-maps";
import {MapViewSinglePlace} from "../../components/maps/MapViewSinglePlace.jsx";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const ViewSinglePlace = ({place}) => {

    const kansasCity = {lat: 39.09, lng: -94.57};
    const [center, setCenter] = useState(kansasCity);



    return (
        <>
            <div style={{width: '40vw', height: '40vh'}}>
                <APIProvider apiKey={API_KEY}>
                    <MapViewSinglePlace position={center} place={place}/>
                </APIProvider>
            </div>
        </>
    )
}