import apiClient from "./client";

const login = (email, password) =>
  apiClient.post("/auth/login", { email, password });
const register = (email, password) =>
  apiClient.post("auth/register", { email, password });

export default {
  login,
  register,
};
