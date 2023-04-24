import { LOGIN_SUCCESS, LOGOUT } from "../types";

// Đăng nhập thành công
export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
  });
  
  // Đăng xuất
  export const logout = () => ({
    type: LOGOUT,
  });