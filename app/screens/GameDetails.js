import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import SafeView from "../components/SafeView";
import AppText from "../components/AppText";
import gameApi from "../api/game";
import AppActivityIndicator from "../components/AppActivityIndicator";
import ErrorWithRetry from "../components/ErrorWithRetry";
import ConfigureMap from "./ConfigureMap";
import GamePlay from "./GamePlay";

export default function GameDetails({ route, navigation }) {
  const gameId = route.params.gameId;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [gameStatus, setGameStatus] = useState("");

  const getGameDetails = async () => {
    setLoading(true);
    const result = await gameApi.getGameDetails(gameId);
    setError(!result.ok);
    if (!result.ok) setErrorMessage(result.data);
    else {
      setGameStatus(result.data.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    getGameDetails();
  }, []);

  if (gameStatus === "MAP_CONFIG") {
    return <ConfigureMap gameId={gameId} />;
  }
  if (gameStatus === "IN_PROGRESS") {
    return <GamePlay gameId={gameId} />;
  }

  if (gameStatus === "CREATED")
    return (
      <SafeView style={styles.container}>
        <AppText>Waiting for another player to join...</AppText>
      </SafeView>
    );

  return (
    <SafeView>
      <ErrorWithRetry
        error={error}
        errorMessage={errorMessage}
        onPress={getGameDetails}
      />
      {!loading && <AppText>STATUS: {gameStatus}</AppText>}
      <AppActivityIndicator loading={loading} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
