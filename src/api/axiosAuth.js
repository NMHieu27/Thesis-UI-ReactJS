import axios from 'axios';
// import queryString from 'query-string';

const axiosAuth = () => axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        // 'content-type': 'multipart/form-data',
    },
    // paramsSerializer: (params) => queryString.stringify(params),
});
// axiosAuth().interceptors.response.use(
//     (response) => {
//         if (response && response.data) {
//             return response.data;
//         }
//         return response;
//     },
//     (error) => {
//         // Handle errors
//         throw error;
//     },
// );

export default axiosAuth;
