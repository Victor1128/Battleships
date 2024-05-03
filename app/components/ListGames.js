import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";

import AppText from "./AppText";
import AppButton from "./AppButton";
import GameElement from "./GameElement";
import ListItemSeparator from "./ListItemSeparator";
import ErrorWithRetry from "./ErrorWithRetry";
import AppActivityIndicator from "./AppActivityIndicator";
import { ref } from "yup";

export default function ListGames({
  error,
  errorMessage,
  loading,
  games,
  getGames,
  playButtonCondition,
  onPress,
}) {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      <ErrorWithRetry
        error={error}
        errorMessage={errorMessage}
        onPress={getGames}
      />
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <GameElement
            player1Email={item.player1Id && item.player1.email}
            player2Email={item.player2Id && item.player2.email}
            status={item.status}
            onPress={() => onPress(item)}
            hasPlayButton={playButtonCondition(item)}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => getGames(true)}
      />
      <AppActivityIndicator loading={loading} />
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
