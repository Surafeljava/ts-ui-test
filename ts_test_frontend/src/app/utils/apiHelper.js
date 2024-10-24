import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;  // Base API URL

// Helper function for GET requests
export const getApi = async (endpoint, options = {}) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, options);
    return response;  // Return the response data directly
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Helper function for POST requests
export const postApi = async (endpoint, data, options = {}) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data, options);
    return response;  // Return the response data directly
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Helper function to handle errors
const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);  // Server responded with a status other than 200 range
  } else if (error.request) {
    console.error('No response from API:', error.request);  // No response was received
  } else {
    console.error('API Request Error:', error.message);  // Something else happened while setting up the request
  }
};