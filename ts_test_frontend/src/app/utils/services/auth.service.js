import { getApi, postApi } from "../apiHelper";
import Cookies from 'js-cookie';

// User login
export const loginUser = (credentials) => {
  return postApi('/account/auth/jwt/login/', credentials);
};

export const googleLoginUser = (credentials) => {
  return postApi('/account/auth/social/google/', credentials);
};

// User registration
export const registerUser = (userData) => {
  return postApi('/account/auth/signup/', userData);
};

// Refresh JWT token
export const refreshToken = (refreshToken) => {
  return postApi('/account/auth/jwt/token/refresh/', { refresh: refreshToken });
};

// User logout
export const logoutUser = () => {
  return postApi('/account/auth/logout/');
};

// Get user details
export const getUserDetails = () => {
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return getApi('/account/auth/user/', config);
}