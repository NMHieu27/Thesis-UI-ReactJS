import axiosAuth from '../axiosAuth';
import axiosClient from '../axiosClient';

const roleAPI = {
    getRoles: () => {
        const url = '/roles/';
        return axiosAuth().get(url);
    },
};
export default roleAPI;
