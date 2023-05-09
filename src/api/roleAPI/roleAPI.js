import axiosClient from '../axiosClient';

const roleAPI = {
    getRoles: () => {
        const url = '/roles/';
        return axiosClient.get(url);
    },
};
export default roleAPI;
