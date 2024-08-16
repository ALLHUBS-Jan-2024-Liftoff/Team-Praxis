export const fetchParks = async (placesLibrary, radiusMiles, searchCenter) => {
    // required library
    if (!placesLibrary) {
        throw new Error('PlacesLibrary not found.');
    }

    const milesToMetres = (miles) => {
        return miles * 1609.344
    }
    const radiusMeters = milesToMetres(radiusMiles);

    // https://developers.google.com/maps/documentation/javascript/reference/place#Place
    const requestNearby = {
        // TODO: do something with photos
        // fields: ["location", "id", "displayName", "formattedAddress", "googleMapsURI","allowsDogs","photos"],
        fields: ["location", "id", "displayName", "formattedAddress", "googleMapsURI", "allowsDogs"],
        locationRestriction: {
            center: searchCenter,
            radius: radiusMeters,
        },
        includedPrimaryTypes: ["dog_park", "park", "national_park"], // using just "dog_park" excludes parks that are dog-friendly
        excludedPrimaryTypes: ["amusement_park", "rv_park", "park_and_ride", "parking"],
        maxResultCount: 20, // this is the most results we can get
        rankPreference: placesLibrary.SearchNearbyRankPreference.DISTANCE,
        language: "en-US",
        region: "us",
    };

    // https://developers.google.com/maps/documentation/javascript/reference/place#SearchNearbyRequest
    try {
        const response = await placesLibrary.Place.searchNearby(requestNearby);
        return placeAllowsDogs(response.places);
        // return response.places;
    } catch (error) {
        console.log("bad response: " + error);
        throw error;
    }
}

const placeAllowsDogs = (places) => {
    const result = [];
    places.map((place) => {
        if (place.allowsDogs === true) {
            result.push(place);
        }
    });
    return result;
}