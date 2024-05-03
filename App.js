import AuthContext from "./app/auth/context";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from "./app/auth/storage";
import authApi from "./app/api/auth";
import apiClient from "./app/api/client";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp;
      const currentTime = Date.now() / 1000;
      return expirationTime < currentTime;
    } catch (error) {
      return true;
    }
  };

  const restoreUser = async () => {
    const token = await authStorage.getToken();
    if (token) {
      if (isTokenExpired(token)) {
        authStorage.deleteToken();
        authApi.removeAuthToken();
        setUser(null);
        return;
      }
      authApi.setAuthToken(token);
      apiClient.addRequestTransform((request) => {
        console.log("Here", token);
        if (isTokenExpired(token)) {
          authStorage.deleteToken();
          authApi.removeAuthToken();
          setUser(null);
          return;
        }
      });
      setUser(jwtDecode(token));
    }
    setIsReady(true);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  useEffect(() => {
    const hideSplash = async () => {
      if (isReady) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  // if (!isReady)
  //   return (
  //     <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)} />
  //   );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
