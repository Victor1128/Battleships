import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import gamesApi from "../api/game";
import SafeView from "../components/SafeView";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import ListGames from "../components/ListGames";
import { ref } from "yup";

export default function Games() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [openGames, setOpenGames] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAllGames, setIsAllGames] = useState(true);
  const [searchText, setSearchText] = useState("");

  const handleJoinGame = async (gameId) => {
    setLoading(true);
    const result = await gamesApi.joinGame(gameId);
    setError(!result.ok);
    if (!result.ok) setErrorMessage(result.data);
    else {
      console.log({
        gameId,
      });
      navigation.navigate("Game Details", { gameId });
    }
    setLoading(false);
  };

  const getGames = async () => {
    setLoading(true);
    const result = await gamesApi.getGames();
    setError(!result.ok);
    if (result.ok) {
      setAllGames(result.data.games);
      setOpenGames(
        result.data.games.filter((game) => game.status === "CREATED")
      );
      const localGames = isAllGames
        ? result.data.games
        : result.data.games.filter((game) => game.status === "CREATED");
      setGames(filterGamesByText(localGames));
    } else setErrorMessage(result.data);
    setLoading(false);
  };

  const filterGamesByText = (gamesList) => {
    return gamesList.filter(
      (game) =>
        game.player1.email.toLowerCase().includes(searchText.toLowerCase()) ||
        (game.player2 &&
          game.player2.email.toLowerCase().includes(searchText.toLowerCase()))
    );
  };

  const filterGames = (gamesList) => {
    setLoading(true);
    gamesList = filterGamesByText(gamesList);
    setGames(gamesList);
    setLoading(false);
  };

  useEffect(() => {
    const localGames = isAllGames ? allGames : openGames;
    filterGames(localGames);
  }, [searchText]);

  useEffect(() => {
    getGames();
  }, []);

  return (
    <SafeView>
      <AppTextInput
        icon="magnify"
        placeholder="Player email"
        //onChangeText={(text) => handleSearch(text)}
        onSubmitEditing={(value) => setSearchText(value.nativeEvent.text)}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            if (isAllGames) return;
            setIsAllGames(true);
            filterGames(allGames);
          }}
        >
          <AppText>All Games</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            if (!isAllGames) return;
            setIsAllGames(false);
            filterGames(openGames);
          }}
        >
          <AppText>Open Games</AppText>
        </TouchableOpacity>
      </View>
      <ListGames
        error={error}
        errorMessage={errorMessage}
        games={games}
        loading={loading}
        getGames={getGames}
        playButtonCondition={(item) => !item.player2}
        onPress={handleJoinGame}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
