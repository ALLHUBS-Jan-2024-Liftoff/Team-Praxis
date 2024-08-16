import {useCallback, useEffect, useRef, useState} from "react";
import {createPlace} from "../../service/PlaceService.js";
import {Link} from "react-router-dom";
import {APIProvider} from "@vis.gl/react-google-maps";
import MapChoosePlace from "../../components/maps/MapChoosePlace.jsx";
import {MapHeader} from "../../components/maps/MapHeader.jsx";
import {PlacesAutocomplete} from "../../components/maps/PlacesAutocomplete.jsx";


const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const SavePlaces = () => {
    const [chosenPlace, setChosenPlace] = useState(null);
    const [center, setCenter] = useState(null);
    const [radius, setRadius] = useState(5);

    const handleRadius = (r) => {
        setRadius(r);
    };

    const handleCenter = (c) => {
        setCenter(c);
    };

    const handleLocationChoice = (placeObj) => {
        setChosenPlace(placeObj);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await createPlace(chosenPlace);
    }


    return (
        <>
            <div className={"grid place-content-center"}>
                <div className={"p-1 grid place-content-center"}>
                    <Link to={"/view-places"}
                          className="bg-green-600 hover:bg-green-500 text-gray-200 font-bold rounded-md w-auto p-1"
                    >
                        View saved places
                    </Link>
                </div>
                {chosenPlace ?
                    (<>
                        <h2 className={"font-bold"}>Chosen Place: </h2>
                        <div className={"w-auto p-1"}>
                            <span>{chosenPlace.displayName}<br/>{chosenPlace.formattedAddress}</span>
                            <br/>
                            <Link target={"_blank"}
                                  to={chosenPlace.googleMapsURI}
                                  className={"rounded-md bg-slate-800 text-gray-200 p-1"}
                            >
                                More Details
                            </Link>
                        </div>
                        <div className={"p-1"}>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <button type={"submit"} value={"submitLocation"}
                                        className="bg-green-600 hover:bg-green-500 text-gray-200 font-bold py-2 px-4 rounded">
                                    Save this place
                                </button>
                            </form>
                        </div>
                    </>) : (<h2 className={"font-bold"}>Choose a Location</h2>)}
                <div style={{width: '85vw', height: '60vh'}}>
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
                    <div className={"grid place-content-center p-4"}>
                        <h1 className={"font-bold"}>Brief instructions</h1>
                        <p>Enter a location to search from, click the pin, click "choose," then save.</p>
                    </div>
                </div>
            </div>
        </>
    )

}