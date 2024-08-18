import axios from "axios";
import {logout} from "../service/AuthService.js";

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

// intercepts response, listens for errors, if error is 401, logout.
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            logout();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);
