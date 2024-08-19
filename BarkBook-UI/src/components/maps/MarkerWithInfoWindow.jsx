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

                        <div className={"flex items-center"}>
                            <div className={"p-1"}>
                                <button onClick={setChoice}
                                        className={"bg-blue-600 hover:bg-blue-700 text-white p-1 rounded inline-flex"}
                                >Choose
                                </button>
                            </div>
                            <div className={"p-1"}>
                                <Link target={"_blank"}
                                      to={googleMapsURI}
                                      className={"bg-blue-600 hover:bg-blue-700 text-white p-1 rounded inline-flex"}
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                </InfoWindow>
            )}
        </>
    )
}