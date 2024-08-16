import axiosInstance from "../config/AxiosConfig.js";

const BASEPATH = "/api/place";

export const createPlace = async(place) => {
    const response = await axiosInstance.post(`${BASEPATH}/create`, place);
    console.log(response.data);
    return response.data;
}

export const getLocationById = async(id) => {
    const response = await axiosInstance.get(`${BASEPATH}/get/id/${id}`);
    console.log(response.data);
    return response.data;
}

export const getLocationByPlaceId = async(placeId) => {
    const response = await axiosInstance.get(`${BASEPATH}/get/place-id`, placeId);
    console.log(response.data);
    return response.data;
}

export const getAllPlaces = async() => {
    const response = await axiosInstance.get(`${BASEPATH}/get/all`);
    return response.data;
}