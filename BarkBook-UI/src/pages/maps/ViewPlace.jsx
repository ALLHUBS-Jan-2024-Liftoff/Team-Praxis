import {getAllPlaces} from "../../service/PlaceService.js";
import {useEffect, useState} from "react";
import {APIProvider} from "@vis.gl/react-google-maps";
import {MapViewSinglePlace} from "../../components/maps/MapViewSinglePlace.jsx";
import {Link} from "react-router-dom";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const ViewPlace = () => {

    const [allPlaces, setAllPlaces] = useState(null);
    const [place, setPlace] = useState(null);
    const [view, setView] = useState(false);
    const kansasCity = {lat: 39.09, lng: -94.57};
    const [center, setCenter] = useState(kansasCity);

    useEffect(() => {
        const fetchAllPlaces = async () => {
            const result = await getAllPlaces();
            setAllPlaces(result);
        }
        fetchAllPlaces();
    }, []);

    useEffect(() => {
        if (!place) return;
        setView(true);
    }, [place]);

    const onClick = (place) => {
        setPlace(place);
    }


    return (
        <>

            <div className={"p-1 grid place-content-center"}>
                <Link to={"/save-places"}
                      className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-md w-auto p-1">
                    Save a new place
                </Link>
            </div>
            {allPlaces ? (
                <>
                    <p>Select a park: {place ? (<span>{place.displayName}</span>) : (<></>)}</p> <br/>
                    <div className="grid grid-cols-3 gap-2">
                        {allPlaces.map((place, index) => (
                            <button key={index}
                                    onClick={() => onClick(place)}
                                    className="bg-amber-100 hover:bg-amber-200 text-black font-bold rounded-md w-auto"
                            >
                                {place.displayName}
                            </button>
                        ))}
                    </div>
                </>
            ) : (<></>)}


            {view ? (
                <>
                    <div style={{width: '85vw', height: '60vh'}}>
                        <APIProvider apiKey={API_KEY}>
                            <MapViewSinglePlace position={center} place={place}/>
                        </APIProvider>
                    </div>
                </>
            ) : (<></>)}
        </>
    )
}