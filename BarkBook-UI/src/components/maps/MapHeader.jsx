import {Slider} from "../Slider.jsx";
import {PlacesAutocomplete} from "./PlacesAutocomplete.jsx";

export const MapHeader = ({radius, radiusChange, centerChange, placesLib}) => {

    const handleGetUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                handleCenterChange({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                console.log("Couldn't Get Location: " + error.message)
            }
        );
    };

    const handleCenterChange = (c) => {
        centerChange(c);
    }

    const handleRadiusChange = (r) => {
        radiusChange(r);
    };

    return (
        <div className={"bg-green-200 p-1"}>
            <div className={"flex p-1"}>
                <PlacesAutocomplete onPlaceSelect={handleCenterChange}/>
            </div>
            <div className={"flex p-1"}>
                <button onClick={handleGetUserLocation} className={"rounded-md bg-black text-white p-1"}>
                    Use my Location
                </button>
            </div>
            <div className={"flex p-1"}>
                <label>Max distance: {radius} miles
                    <Slider
                        value={radius} onChange={handleRadiusChange}
                        min={"0.5"} max={"5"} step={"0.1"}/>
                </label>
            </div>
        </div>
    );
}