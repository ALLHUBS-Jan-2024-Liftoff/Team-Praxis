import {useState} from "react";
import {APIProvider} from "@vis.gl/react-google-maps";
import MapChoosePlace from "../../components/maps/MapChoosePlace.jsx";
import {MapHeader} from "../../components/maps/MapHeader.jsx";


const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const SavePlaces = ({onLocationChoice}) => {
    const [center, setCenter] = useState(null);
    const [radius, setRadius] = useState(5);

    const handleRadius = (r) => {
        setRadius(r);
    };

    const handleCenter = (c) => {
        setCenter(c);
    };

    const handleLocationChoice = (placeObj) => {
        onLocationChoice(placeObj);
    };


    return (
        <>
            <div className={"grid place-content-center"}>
                <div style={{width: '40vw', height: '40vh'}}>
                    <APIProvider apiKey={API_KEY}>
                        <MapHeader
                            radius={radius}
                            centerChange={handleCenter}
                            radiusChange={handleRadius}
                        />
                        {center ? (
                            <>
                                <MapChoosePlace
                                    radius={radius}
                                    position={center}
                                    onLocationChoice={handleLocationChoice}
                                />
                            </>
                        ) : (<></>)}
                    </APIProvider>
                </div>
            </div>
        </>
    )

}