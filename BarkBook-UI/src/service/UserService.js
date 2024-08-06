import axiosInstance from "../config/AxiosConfig.js";


export const getAllUsers = async () => {
    const response = await axiosInstance.get(`/api/user/get/all`);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosInstance.get(`/api/user/get/me`);
    return response.data;
}

export const getUserById = async (id) => {
    const response = await axiosInstance.get(`/api/user/get/${id}`)
    return response.data;
};

export const updateUserById = async (id, displayName, currentPassword, newPassword, verifyNewPassword) => {
    const response = await axiosInstance.put(`/api/user/update`, null, {
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
    const response = await axiosInstance.delete(`/api/user/delete/${id}`);
    return response.data;
};
