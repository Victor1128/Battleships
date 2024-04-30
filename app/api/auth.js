import apiClient from "./client";

const login = (email, password) =>
  apiClient.post("/auth/login", { email, password });

const register = (email, password) =>
  apiClient.post("auth/register", { email, password });

const setAuthToken = (accessToken) =>
  apiClient.setHeader("Authorization", "Bearer " + accessToken);

const removeAuthToken = () => apiClient.deleteHeader("Authorization");

export default {
  login,
  register,
  setAuthToken,
  removeAuthToken,
};
