import { View, Text } from "react-native";
import React, { useCallback, useContext } from "react";

import SafeView from "../components/SafeView";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import authStorage from "../auth/storage";
import AuthContext from "../auth/context";

export default function UserDetails() {
  const authContext = useContext(AuthContext);
  const handleLogout = () => {
    authStorage.deleteToken();
    authContext.setUser(null);
  };

  return (
    <SafeView>
      <Text>UserDetails</Text>
      <AppButton title="Logout" color="danger" onPress={handleLogout} />
    </SafeView>
  );
}
