import { LOGIN_SUCCESS, LOGOUT } from '../types';
const initialState = {
    isAuthenticated: localStorage.getItem('current-user') ? true :false,
    user: JSON.parse(localStorage.getItem('current-user')) || null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem('access-token');
            localStorage.removeItem('current-user');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
