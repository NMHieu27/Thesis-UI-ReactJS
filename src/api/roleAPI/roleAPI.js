import axiosClient from '../axiosClient';

const roleAPI = {
    getRoles: () => {
        const url = '/role/';
        return axiosClient.get(url);
    },
};
export default roleAPI;
