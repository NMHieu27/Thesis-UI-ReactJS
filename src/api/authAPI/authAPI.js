import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";


const authAPI = {
    signIn: (params) => {
        const url = '/o/token/';
        return axiosClient.post(url, params);
    },
    signUp: (params) => {
        const url = '/users/';
        return axiosAuth().post(url, params,{
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
    },
    currentUser: ()=>{
        const url = "/users/current_user/";
        return axiosAuth().get(url);
    },
    changePassword: ( param )=>{
        const url = "/users/current_user/change_password/";
        return axiosAuth().post(url,param);
    }
};
export default authAPI;