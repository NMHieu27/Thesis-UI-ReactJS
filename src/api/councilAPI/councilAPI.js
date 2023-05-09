import axiosAuth from '../axiosAuth';
import axiosClient from '../axiosClient';

const councilAPI = {
    getCouncilsByMajorID: (id) => {
        const url = `/majors/${id}/councils/`;
        return axiosClient.get(url);
    },
    createCouncil: (param) => {
        const url = '/councils/';
        return axiosClient.post(url, param);
    },
    getCouncilsByID: (id) => {
        const url = `/councils/${id}/`;
        return axiosClient.get(url);
    },
    updateCouncil: (id , param) => {
        const url = `/councils/${id}/`;
        return axiosClient.put(url, param);
    },
    deleteCouncil: (id , param) => {
        const url = `/councils/${id}/`;
        return axiosClient.delete(url, param);
    }
};
export default councilAPI;
