import axiosAuth from '../axiosAuth';
import axiosClient from '../axiosClient';

const statsAPI = {
    getGradeStat: (year) => {
        const url = `/stats/mark/?year=${year}`;
        return axiosAuth().get(url);
    },
    getFrequencyStat: (year) => {
        const url = `/stats/frequency/?year=${year}`;
        return axiosAuth().get(url);
    },
};
export default statsAPI;