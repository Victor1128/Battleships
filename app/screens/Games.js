import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import gamesApi from "../api/game";
import SafeView from "../components/SafeView";
import GameElement from "../components/GameElement";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { FlatList } from "react-native-gesture-handler";
import ListItemSeparator from "../components/ListItemSeparator";
import AppTextInput from "../components/AppTextInput";

export default function Games() {
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [error, setError] = useState(false);

  const getGames = async () => {
    setLoading(true);
    const result = await gamesApi.getGames();
    setError(!result.ok);
    setGames(result.data.games);
    setLoading(false);
  };

  useEffect(() => {
    console.log(gamesApi);
    getGames();
  }, []);

  return (
    <SafeView>
      <AppTextInput icon="magnify" placeholder="Player email" />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {error && (
        <>
          <AppText>Error loading games</AppText>
          <AppButton title="Retry" onPress={getGames} />
        </>
      )}

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <GameElement
            player1Email={item.player1Id && item.player1.email}
            player2Email={item.player2Id && item.player2.email}
            status={item.status}
            onPress={() => console.log(item.id)}
          />
        )}
      />
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
