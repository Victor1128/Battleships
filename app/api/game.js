import apiClient from "./client";

const endpoint = "/game";

const getGames = () => apiClient.get(endpoint);

export default { getGames };
