import axiosInstance from "../config/AxiosConfig.js";

const BASEPATH = "/api/event";

export const createNewEvent = async (name, location, date, description) => {
    const event = { name, location, date, description };
    const response = await axiosInstance.post(`${BASEPATH}/create-event`, event);
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

export const addUserToEvent = async (eventId, attendeeId) => {
    try {
        const response = await axiosInstance.post(`${BASEPATH}/${eventId}`, { attendeeId });
        return response.data;
    } catch (error) {
        console.error("Error adding user to event:", error);
        throw error;
    }
};

