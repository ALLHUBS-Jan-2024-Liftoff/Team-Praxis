import axios from "axios";

const BASEAPIURL = "http://localhost:8080/api/event";

export const createNewEvent = async (name, location, date, description) => {
    const event = { name, location, date, description };
    const response = await axios.post(`${BASEAPIURL}/create-event`, event);
    return response.data;
}

export const getAllEvents = async () => {
    const response = await axios.get(`${BASEAPIURL}`)
    return response.data;
}

export const getEventById = async (id) => {
    const response = await axios.get(`${BASEAPIURL}/${id}`)
    return response.data;
}

export const updateEventById = async (id, name, location, date, description) => {
    const event = { id, name, location, date, description };
    const response = await axios.put(`${BASEAPIURL}/${id}`, event)
    return response.data;
}

export const deleteEventById = async (id) => {
    const response = await axios.delete(`${BASEAPIURL}/${id}`)
    return response.data;
}
