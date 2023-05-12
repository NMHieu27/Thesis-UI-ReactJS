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
axiosAuth().interceptors.request.use(
    async (config) => {
        // Handle refresh token
        if (config.url.indexOf('/o/token/') >= 0) {
            return config;
        }
        const { accessToken, expiredTime } = await axiosAuth().getLocalAccessToken();
        // accessToken && config.headers.Authorization = accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;

            console.log(`{accessToken, expiredTime}`, { accessToken, expiredTime });
            const now = new Date().getTime();
            console.log(`timeExpired:::${expiredTime} vs::now::${now}`);
            if (+expiredTime <= +now + 5 * 60 * 1000) {
                try {
                    console.log('AccessToken expired!!');
                    const params = {
                        client_id: '91GRg1kKAMzHNGqLtl1ia5neit8Sf4hWn2O4cIAq',
                        client_secret:
                            'X0BE1oiZVkECOKSECncfjVVoaH9JXeCFl6WX8ThzBcJxwjlJWEXVHs8vVpZMLWkgQiRbP3XGLwFOiqpxR83u9RhnBrzveXx8HB9X2u7nGUft6VmvqrtXvKeqP8vcjkiO',
                        grant_type: 'refresh_token',
                        refresh_token:accessToken,
                    };
                    const response = await refreshToken(params);
                    if (response.data) {
                        const newAccessToken = response.data.access_token;
                        const newExpiredTime = response.data.expires_in;
                        if (newAccessToken) {
                            config.headers.Authorization = `Bearer ${newAccessToken}`;
                        }
                        console.log({ newAccessToken, newExpiredTime });
                        await axiosAuth().setLocalAccessToken(newAccessToken, newExpiredTime);
                        return config;
                    }
                } catch (error) {
                    return Promise.reject(error);
                }
            }
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);
async function refreshToken(params) {
    const url = '/o/token/';
    return await axiosAuth().post(url, params);
}
axiosAuth().setLocalAccessToken = async (accessToken, expiredTime) => {
    window.localStorage.setItem('access-token', accessToken);
    window.localStorage.setItem('expires-in', expiredTime);
};
axiosAuth().getLocalAccessToken = async () => {
    const accessToken = window.localStorage.getItem('access-token');
    const expiredTime = window.localStorage.getItem('expires-in');
    return { accessToken, expiredTime };
};
export default axiosAuth;
