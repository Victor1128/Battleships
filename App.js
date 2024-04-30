import AuthContext from "./app/auth/context";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from "./app/auth/storage";
import UserDetails from "./app/screens/UserDetails";
import LandingPage from "./app/screens/LandingPage";
import authApi from "./app/api/auth";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const token = await authStorage.getToken();
    if (token) {
      authApi.setAuthToken(token);
      setUser(jwtDecode(token));
    }
    setIsReady(true);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  useEffect(() => {
    async function hideSplash() {
      if (isReady) {
        await SplashScreen.hideAsync();
      }
    }
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
