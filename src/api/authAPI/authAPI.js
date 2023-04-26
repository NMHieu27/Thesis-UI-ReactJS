import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";


const authAPI = {
    signIn: (params) => {
        const url = '/o/token/';
        console.log(process.env.REACT_APP_BASE_URL);
        return axiosClient.post(url, params);
    },
    signUp: (params) => {
        const url = '/users/';
        return axiosClient.post(url, params);
    },
    currentUser: ()=>{
        const url = "/users/current-user/";
        return axiosAuth().get(url);
    }
};
export default authAPI;