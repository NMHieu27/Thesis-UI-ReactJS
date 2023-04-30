import { ADD_USER, DELETE_USER, FETCH_USERS, UPDATE_USER } from "../types";

// Fetch danh sách user
export const fetchUsers = (usersData) =>({
    type:FETCH_USERS,
    payload:usersData,
});

// Thêm user
export const addUser =  (user) =>({
    type: ADD_USER,
    payload:user,
});

export const updateUser = (id, newData) =>({
    type: UPDATE_USER,
    payload:{id, newData}
});

export const deleteUser = (id) =>({
    type: DELETE_USER,
    payload:id,
});