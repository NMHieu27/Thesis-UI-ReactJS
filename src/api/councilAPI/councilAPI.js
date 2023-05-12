import axiosAuth from '../axiosAuth';
import axiosClient from '../axiosClient';

const councilAPI = {
    getCouncilsByMajorID: (id, year) => {
        const url = `/majors/${id}/councils/?year=${year}`;
        return axiosAuth().get(url);
    },
    getCouncilsActiveByMajorID: (id) => {
        const url = `/majors/${id}/councils/active/`;
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
    },
    closeCouncil: (id) => {
        const url = `/councils/${id}/close/`;
        return axiosAuth().get(url);
    },
    openCouncil: (id) => {
        const url = `/councils/${id}/open/`;
        return axiosAuth().get(url);
    }
};
export default councilAPI;
