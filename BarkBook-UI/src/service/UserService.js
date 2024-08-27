import axiosInstance from "../config/AxiosConfig.js";

const BASEPATH = "/api/user";

export const getAllUsers = async () => {
    const response = await axiosInstance.get(`${BASEPATH}/get/all`);
    return response.data;
};

export const fetchCurrentUser = async () => {
    const response = await axiosInstance.get(`${BASEPATH}/get/me`);
    return response.data;
}

export const getUserById = async (id) => {
    const response = await axiosInstance.get(`${BASEPATH}/get/${id}`)
    return response.data;
};

export const getUserCreatedEvents = async (id) => {
    const response = await axiosInstance.get(`${BASEPATH}/get/created-events/${id}`)
    return response.data;
}

export const getUserCreatedDogs = async (id) => {
    const response = await axiosInstance.get(`${BASEPATH}/get/dogs/${id}`)
    return response.data;
}

export const updateUserById = async (id, displayName, currentPassword, newPassword, verifyNewPassword) => {
    const response = await axiosInstance.put(`${BASEPATH}/update`, null, {
        params: {
            id,
            displayName,
            currentPassword,
            newPassword,
            verifyNewPassword
        },
    });
    return response.data;
};

export const deleteUserById = async (id) => {
    const response = await axiosInstance.delete(`${BASEPATH}/delete/${id}`);
    return response.data;
};
