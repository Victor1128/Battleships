import * as SecureStore from "expo-secure-store";

const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync("accessToken", token);
  } catch (error) {
    console.log("Error storing the access token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("accessToken");
  } catch (error) {
    console.log("Error getting the access token", error);
  }
};

const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
  } catch (error) {
    console.log("Error deleting the access token", error);
  }
};

export default {
  storeToken,
  getToken,
  deleteToken,
};
