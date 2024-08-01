import axios from "axios";

const BASEAPIURL = "http://localhost:8080/api";

export const createNewUser = async (email, username, password, verifyPassword) => {
    const response = await axios.post(`${BASEAPIURL}/newUser`, null, {
        params: {
            email,
            username,
            password,
            verifyPassword
        },
    });
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(`${BASEAPIURL}/getUser/all`);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${BASEAPIURL}/getUser/${id}`)
    return response.data;
};

export const updateUserById = async (id, username, password, verifyPassword) => {
    const response = await axios.put(`${BASEAPIURL}/updateUser`, null, {
        params: {
            id,
            username,
            password,
            verifyPassword
        },
    });

    return response.data;
};

export const deleteUserById = async (id) => {
    const response = await axios.delete(`${BASEAPIURL}/deleteUser/${id}`);
    return response.data;
};
