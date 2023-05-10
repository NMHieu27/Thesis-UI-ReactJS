import axiosAuth from '../axiosAuth';
import axiosClient from '../axiosClient';

const thesisAPI = {
    getThesesByMajorID: (id) => {
        const url = `/majors/${id}/theses/`;
        return axiosAuth().get(url);
    },
    createThesis: (param) => {
        const url = '/theses/';
        return axiosAuth().post(url, param);
    },
    getThesisByID: (id) => {
        const url = `/theses/${id}/`;
        return axiosAuth().get(url);
    },
    updateThesis: (id , param) => {
        const url = `/theses/${id}/`;
        return axiosAuth().put(url, param);
    },
    deleteThesis: (id , param) => {
        const url = `/theses/${id}/`;
        return axiosAuth().delete(url, param);
    }
};
export default thesisAPI;
