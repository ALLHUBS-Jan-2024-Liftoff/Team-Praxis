import axios from "axios";

const BASEAPIURL = "http://localhost:8080/api/dog";

export const createNewDog = async (dogName, dogAge, breed, weight) => {
    const dog = { dogName, dogAge, breed, weight };
    const response = await axios.post(`${BASEAPIURL}/add-dog`, dog)
    return response.data;
}

export const getAllDogs = async () => {
    const response = await axios.get(`${BASEAPIURL}`)
    return response.data;
}

export const getDogById = async (id) => {
    const response = await axios.get(`${BASEAPIURL}/${id}`)
    return response.data;
}

export const updateDogById = async (id, dogName, dogAge, breed, weight) => {
    const dog = { id, dogName, dogAge, breed, weight };
    const response = await axios.put(`${BASEAPIURL}/${id}`, dog)
    return response.data;
}

export const deleteDogById = async (id) => {
    const response = await axios.delete(`${BASEAPIURL}/${id}`)
    return response.data;
}