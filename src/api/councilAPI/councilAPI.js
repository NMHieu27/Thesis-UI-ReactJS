import axiosAuth from '../axiosAuth';
import axiosClient from '../axiosClient';

const councilAPI = {
    getCouncilsByMajorID: (id) => {
        const url = `/majors/${id}/councils/`;
        return axiosAuth().get(url);
    },
    createCouncil: (param) => {
        const url = '/councils/';
        return axiosAuth().post(url, param);
    },
    getCouncilsByID: (id) => {
        const url = `/councils/${id}/`;
        return axiosAuth().get(url);
    },
    updateCouncil: (id , param) => {
        const url = `/councils/${id}/`;
        return axiosAuth().put(url, param);
    },
    deleteCouncil: (id , param) => {
        const url = `/councils/${id}/`;
        return axiosAuth().delete(url, param);
    }
};
export default councilAPI;
