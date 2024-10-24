// service.js
import { getApi, postApi } from "../apiHelper";

// User login (POST /api/login/)
export const loginUser = (credentials) => {
  return postApi('/auth/jwt/login/', credentials);
};

// User registration (POST /registration/)
export const registerUser = (userData) => {
  return postApi('/auth/signup/', userData);
};

// Refresh JWT token (POST /api/token/refresh/)
export const refreshToken = (refreshToken) => {
  return postApi('/auth/token/refresh/', { refresh: refreshToken });
};

// User logout (POST /auth/logout/)
export const logoutUser = () => {
  return postApi('/auth/logout/');
};

// Get user details (GET /auth/user/)
export const getUserDetails = () => {
  return getApi('/auth/user/');
}