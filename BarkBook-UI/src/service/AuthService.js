import {useEffect, useState} from "react";
import axiosInstance from "../config/AxiosConfig.js";


export const login = async (email, password) => {
    const body = {email, password};
    try {
        const response = await axiosInstance.post(`/auth/login`, body);

        const {token, user, expiration} = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return null;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

export const createNewUser = async (email, displayName, password, verifyPassword) => {
    const body = {email, displayName, password, verifyPassword};
    const response = await axiosInstance.post(`/auth/register`, body);

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
        try {
            return JSON.parse(user);
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            return null;
        }
    }
    return null;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const usePageOwnership = (pageId) => {
    const [ownership, setOwnership] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUserId = getCurrentUser().id.toString();
        if (currentUserId === pageId) {
            setOwnership(true);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [pageId]);

    return {ownership, loading};
};
