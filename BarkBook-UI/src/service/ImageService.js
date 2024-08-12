import axiosInstance from '../config/AxiosConfig';

const BASEPATH = "/api/image"

export const uploadImage = async (file) => {
    const formData = new FormData();    // have to use form data because it can't be sent as a plain json object
    formData.append('image', file); // append file directly

    const response = await axiosInstance.post(BASEPATH, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
    });

    return response.data;


};