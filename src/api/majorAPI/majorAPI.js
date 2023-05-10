import axiosAuth from '../axiosAuth';
import axiosClient from '../axiosClient';

const majorAPI = {
    getMajors: () => {
        const url = '/majors/';
        return axiosAuth().get(url);
    },
};
export default majorAPI;
