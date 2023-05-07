import axiosClient from '../axiosClient';

const majorAPI = {
    getMajors: () => {
        const url = '/majors/';
        return axiosClient.get(url);
    },
};
export default majorAPI;
