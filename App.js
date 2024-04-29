import AuthContext from "./app/auth/context";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { AppLoading } from "expo";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from "./app/auth/storage";
import UserDetails from "./app/screens/UserDetails";
import LandingPage from "./app/screens/LandingPage";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (token) setUser(jwtDecode(token));
    setIsReady(true);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  useEffect(() => {
    async function hideSplash() {
      if (isReady) {
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync();
      }
      hideSplash();
    }
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
