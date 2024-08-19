import axiosInstance from "../config/AxiosConfig.js";

const BASEPATH = "/api/event";

export const createNewEvent = async (name, date, description, placeId) => {
    const event = { name, date, description };
    const response = await axiosInstance.post(`${BASEPATH}/create-event`, event, {
        params: {placeId}
    });
    return response.data;
}

export const getAllEvents = async () => {
    const response = await axiosInstance.get(`${BASEPATH}`)
    return response.data;
}

export const getEventById = async (id) => {
    const response = await axiosInstance.get(`${BASEPATH}/${id}`)
    return response.data;
}

export const updateEventById = async (id, name, location, date, description) => {
    const event = { id, name, location, date, description };
    const response = await axiosInstance.put(`${BASEPATH}/${id}`, event)
    return response.data;
}

export const deleteEventById = async (id) => {
    const response = await axiosInstance.delete(`${BASEPATH}/${id}`)
    return response.data;
}
