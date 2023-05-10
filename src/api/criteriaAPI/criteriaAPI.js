import axiosAuth from '../axiosAuth';
import axiosClient from '../axiosClient';

const criteriaAPI = {
    getCriteriasByMajorID: (id) => {
        const url = `/majors/${id}/criteria/`;
        return axiosAuth().get(url);
    },
    getCriterias: () => {
        const url = '/criteria/';
        return axiosAuth().get(url);
    },
};
export default criteriaAPI;
