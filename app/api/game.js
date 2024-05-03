import apiClient from "./client";

const endpoint = "/game";

const getGames = () => apiClient.get(endpoint);

const joinGame = (gameId) => apiClient.post(`${endpoint}/join/${gameId}`);

const getGameDetails = (gameId) => apiClient.get(`${endpoint}/${gameId}`);

export default { getGames, joinGame, getGameDetails };
