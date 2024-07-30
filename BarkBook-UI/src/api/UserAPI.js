import axios from "axios";
import {useEffect} from "react";


export const postNewUser = async (username, password) => {
        const data = { username, password };
        const response = await axios.post(`http://localhost:8080/users/new`, data);
        return response.data;
}

export const getAllUsers = async () => {
        const response= await axios.get("http://localhost:8080/users/get/all")
        return response.data;
};
// to call the above:
// useEffect(()=> {
//         const loadUsers = async() => {
//                 const result = await getAllUsers();
//                 setUsers(result)
//         }
//         loadUsers();
// }, []);

export const getUserById = async (id) => {
        const response = await axios.get(`http://localhost:8080/users/get/${id}`)
        return response.data;
}


export const updateUserById = async (username, password, id) => {
        const data = { username, password };
        const response = await axios.put(`http://localhost:8080/users/get/${id}`, data);
        return response.data;
}

export const deleteUserById = async (id) => {
        const response = await axios.delete(`http://localhost:8080/users/delete/${id}`);
        return response.data;
};
// to call the above:
// const deleteUser = async (id) => {
//         await deleteUserById(id);
//         window.location.reload();
// };

