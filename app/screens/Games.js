import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import gamesApi from "../api/game";
import SafeView from "../components/SafeView";

export default function Games() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      const result = await gamesApi.getGames();
      setLoading(false);
      console.log(result);
    };

    getGames();
  }, []);

  return (
    <SafeView>
      <Text>Games</Text>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
