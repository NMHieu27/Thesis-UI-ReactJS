import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";


const authAPI = {
    signIn: (params) => {
        const url = '/o/token/';
        return axiosClient.post(url, params);
    },
    signUp: (params) => {
        const url = '/users/';
        return axiosClient.post(url, params);
    },
    currentUser: ()=>{
        const url = "/users/current_user/";
        return axiosAuth().get(url);
    }
};
export default authAPI;