import axios from "axios";

// note: no trailing slash
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
})

// if token stored, send Auth header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
           config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export default axiosInstance;
