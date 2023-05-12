import axiosAuth from '../axiosAuth';
import axiosClient from '../axiosClient';

const thesisAPI = {
    getThesesByMajorID: (id, year) => {
        const url = `/majors/${id}/theses/?year=${year}`;
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
    },
    getThesesByUser:()=>{
        const url = '/users/theses/';
        return axiosAuth().get(url);
    },
    thesisMarked: (id) => {
        const url = `/theses/${id}/mark/`;
        return axiosAuth().get(url);
    },
    updateMark: (id, param) => {
        const url = `/theses/${id}/mark_update/`;
        return axiosAuth().post(url, param);
    }
};
export default thesisAPI;
