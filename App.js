import AuthContext from "./app/auth/context";
import SafeView from "./app/components/SafeView";
import LoginScreen from "./app/screens/LoginScreen";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
