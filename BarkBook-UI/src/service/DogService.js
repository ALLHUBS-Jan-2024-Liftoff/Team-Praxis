import axiosInstance from "../config/AxiosConfig.js";

const BASEPATH = "/api/dog";

export const createNewDog = async (dogName, dogAge, breed, weight) => {
    const dog = { dogName, dogAge, breed, weight };
    const response = await axiosInstance.post(`${BASEPATH}/add-dog`, dog)
    return response.data;
}

export const getAllDogs = async () => {
    const response = await axiosInstance.get(`${BASEPATH}`)
    return response.data;
}

export const getDogById = async (id) => {
    const response = await axiosInstance.get(`${BASEPATH}/${id}`)
    return response.data;
}

export const updateDogById = async (id, dogName, dogAge, breed, weight) => {
    const dog = { id, dogName, dogAge, breed, weight };
    const response = await axiosInstance.put(`${BASEPATH}/${id}`, dog)
    return response.data;
}

export const deleteDogById = async (id) => {
    const response = await axiosInstance.delete(`${BASEPATH}/${id}`)
    return response.data;
}