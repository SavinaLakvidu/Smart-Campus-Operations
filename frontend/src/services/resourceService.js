import axios from "axios";

const API_URL = "http://localhost:8080/api/resources";

export const getAllResources = () => {
  return axios.get(API_URL);
};

export const searchResources = (params) => {
  return axios.get(`${API_URL}/search`, { params });
};