import apiClient from "./client";

const endpoint = "/game";

const getGames = () => apiClient.get(endpoint);

const addGame = () => apiClient.post(endpoint);

const joinGame = (gameId) => apiClient.post(`${endpoint}/join/${gameId}`);

const getGameDetails = (gameId) => apiClient.get(`${endpoint}/${gameId}`);

const configureMap = (gameId, data) =>
  apiClient.patch(`${endpoint}/${gameId}`, data);

const sendStrike = (gameId, data) =>
  apiClient.post(`${endpoint}/strike/${gameId}`, data);

export default {
  getGames,
  joinGame,
  getGameDetails,
  configureMap,
  sendStrike,
  addGame,
};
