import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";

import AppText from "./AppText";
import AppButton from "./AppButton";
import GameElement from "./GameElement";
import ListItemSeparator from "./ListItemSeparator";

export default function ListGames({
  error,
  loading,
  games,
  getGames,
  playButtonCondition,
}) {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      {error && (
        <>
          <AppText>Error loading games</AppText>
          <AppButton title="Retry" onPress={getGames} />
        </>
      )}
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <GameElement
            player1Email={item.player1Id && item.player1.email}
            player2Email={item.player2Id && item.player2.email}
            status={item.status}
            onPress={() => console.log(item.id)}
            hasPlayButton={playButtonCondition(item)}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={getGames}
      />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
