import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import SafeView from "../components/SafeView";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";

export default function ConfigureMap({ gameId }) {
  const authContext = useContext(AuthContext);
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(authContext.user.userId);
    console.log("Here", authContext.user);
  }, []);

  return (
    <SafeView>
      <AppText>ConfigureMap {gameId}</AppText>
    </SafeView>
  );
}
