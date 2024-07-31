import MapEmbed from "./MapEmbed.jsx";
import {useState} from "react";
import {Slider} from "../../components/Slider.jsx";
import {useLocation} from "react-router-dom";

export const MapContainer = () => {
    const kansasCity = {lat: 39.09, lng: -94.57};
    const [center, setCenter] = useState(kansasCity);

    /* TODO: Create different maps for different parent component contexts:
        - create event: show nearby parks, to save one for an event
        - event details page: show location of event, modal popup links to google maps directions
        - map that shows locations of events from an event search query
    */

    // get user location, setState with results
    const handleGetUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            },
            (error) => {
                console.log("Couldn't Get Location: " + error.message)
            }
        );
    };

    // setState and handler for search-radius slider
    const [sliderValue, setSliderValue] = useState(2.5);
    const handleSliderChange = (newValue) => {
        setSliderValue(newValue);
    }

    // TODO: make autocomplete for search-center functional
    const searchHeader = () => {
        return (
            <div className={"bg-green-200"}>
                <div className={"flex"}>
                    <label className="relative block">
                        <input
                            className="placeholder:italic placeholder:text-gray-400 w-full border border-black rounded-md py-2 pl-3"
                            placeholder="Search a location" type="text" name="search"/>
                    </label>
                    <button
                        type="submit"
                        className="rounded-md bg-black text-white"
                    >
                        Search
                    </button>
                </div>
                <div>
                    <button onClick={handleGetUserLocation} className={"rounded-md bg-black text-white"}>Use my Location</button>
                </div>
                <div>
                    <label>Max distance: {sliderValue}
                        <Slider
                            value={sliderValue} onChange={handleSliderChange}
                            min={"0.5"} max={"5"} step={"0.1"}/>
                    </label>
                </div>
            </div>
        )
    }

    // logic to check what Route this component is rendered on. Control type of map based on its usage context.
    const routeObject = useLocation();
    const pageContext = routeObject.pathname;
    let thisComponent;

    if (pageContext === "/map") {
        thisComponent = (
            <div className={"grid place-content-center"}>
                Testing the map...
                <div>
                    {searchHeader()}
                </div>
                <MapEmbed position={center} radius={sliderValue}/>
            </div>
        )
    } else {
        console.log("Tried to render map, but no map context provided for this page");
        thisComponent = (
            <></>
        )
    }

    return (
        <>
            {thisComponent}
        </>
    );
}