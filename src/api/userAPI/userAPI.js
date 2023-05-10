import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";


const userAPI = {
    getUsers: ()=>{
        const url = '/users/';
        return axiosAuth().get(url);
    }
};
export default userAPI;