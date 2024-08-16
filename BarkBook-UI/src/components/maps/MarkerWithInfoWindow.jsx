import {AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from "@vis.gl/react-google-maps";
import {Link} from "react-router-dom";


export const MarkerWithInfoWindow = ({place, isOpen, onClick, onClose, setChoice}) => {

    const [markerRef, marker] = useAdvancedMarkerRef();
    const position = place.location;
    const displayName = place.displayName;
    const formattedAddress = place.formattedAddress;
    const googleMapsURI = place.googleMapsURI;

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={position}
                onClick={onClick}
            />
            {isOpen && (
                <InfoWindow anchor={marker} onClose={onClose}>
                    <h2>{displayName}</h2>
                    <p>Address: <span>{formattedAddress}</span></p>
                    {setChoice ? (
                        <>
                            <button onClick={setChoice}
                                    className={"rounded-md bg-slate-800 text-gray-200 p-1"}
                            >Choose
                            </button>
                        </>
                    ) : (<></>)}
                </InfoWindow>
            )}
        </>
    )
}