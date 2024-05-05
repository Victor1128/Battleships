import { View, StyleSheet, RefreshControl, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";

import SafeView from "../components/SafeView";
import AppText from "../components/AppText";
import Grid from "../components/gameplay/Grid";
import gameSettings from "../config/gameSettings";
import AppButton from "../components/AppButton";
import game from "../api/game";
import ErrorWithRetry from "../components/ErrorWithRetry";
import AuthContext from "../auth/context";
import colors from "../config/colors";

const initializeGrid = () => {
  const initialGrid = [];
  for (let i = 0; i < gameSettings.GRID_SIZE; i++) {
    initialGrid.push(Array(gameSettings.GRID_SIZE).fill(null));
  }
  return initialGrid;
};

const letterToNumber = (letter) => {
  return letter.charCodeAt(0) - 65;
};

const numberToLetter = (number) => {
  return String.fromCharCode(number + 65);
};

export default function GamePlay({ route, navigation }) {
  const gameId = route.params.id;
  const [userGrid, setUserGrid] = useState(initializeGrid);
  const [opponentGrid, setOpponentGrid] = useState(initializeGrid);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [userId, setUserId] = useState();
  const [selectedCell, setSelectedCell] = useState({ x: null, y: null });
  const [refreshing, setRefreshing] = useState(false);
  const [isUserToPlay, setIsUserToPlay] = useState(false);
  const authContext = useContext(AuthContext);

  //TODO: find an fix bug for test1 (not showing grid idk)
  const getGame = async () => {
    setRefreshing(true);
    console.log("getting game");
    setError(false);
    const result = await game.getGameDetails(gameId);
    setError(!result.ok);
    if (!result.ok) {
      setErrorMessage(result.data.message);
    } else {
      const newUserGrid = initializeGrid();
      setIsUserToPlay(result.data.playerToMoveId === authContext.user.userId);
      result.data.shipsCoord
        .filter((ship) => ship.playerId === authContext.user.userId)
        .forEach((element) => {
          newUserGrid[element.y][letterToNumber(element.x)] = element.hit
            ? "danger"
            : "blue";
        });

      const newOpponentGrid = initializeGrid();
      if (result.data.moves) {
        result.data.moves.forEach((element) => {
          if (element.playerId === authContext.user.userId) {
            newOpponentGrid[element.y][letterToNumber(element.x)] =
              element.result ? "danger" : "light_blue";
          } else {
            newUserGrid[element.y][letterToNumber(element.x)] = element.result
              ? "danger"
              : "light_blue";
          }
        });
      }
      setUserGrid(newUserGrid);
      setOpponentGrid(newOpponentGrid);
    }
    setRefreshing(false);
  };

  const sendStrike = async () => {
    const result = await game.sendStrike(gameId, {
      x: numberToLetter(selectedCell.y),
      y: selectedCell.x,
    });
    setError(!result.ok);
    if (!result.ok) {
      setErrorMessage(result.data.message);
      console.log(result.data);
    } else {
      console.log(result.data);
      const newOpponentGrid = [...opponentGrid];
      newOpponentGrid[selectedCell.x][selectedCell.y] = result.data.result
        ? "danger"
        : "light_blue";
      setOpponentGrid(newOpponentGrid);
      setSelectedCell({ x: null, y: null });
      setIsUserToPlay(false);
    }
  };

  const onCellPress = (x, y) => {
    if (opponentGrid[x][y] !== null || !isUserToPlay) {
      return;
    }
    const newGrid = [...opponentGrid];
    if (selectedCell.x !== null) newGrid[selectedCell.x][selectedCell.y] = null;
    newGrid[x][y] = "light_red";
    setOpponentGrid(newGrid);
    setSelectedCell({ x, y });
    console.log(x, y);
  };

  useEffect(() => {
    setUserId(authContext.user.userId);
  }, []);

  useEffect(() => {
    getGame();
  }, []);

  return (
    <SafeView>
      <ErrorWithRetry retry={getGame} message={errorMessage} error={error} />

      <ScrollView
        contentContainerStyle={styles.gridsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getGame} />
        }
      >
        <AppText
          style={[
            styles.text,
            { color: !isUserToPlay ? colors.danger : colors.green },
          ]}
        >
          {isUserToPlay ? "Your" : "Opponent's"} turn
        </AppText>
        <AppText>Opponent's ships</AppText>
        <Grid grid={opponentGrid} onCellPress={onCellPress} />
        <AppText>Your ships</AppText>
        <Grid grid={userGrid} />
      </ScrollView>
      <AppButton
        icon="bomb"
        color="danger"
        style={styles.hitButton}
        onPress={sendStrike}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  gridsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  hitButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 1,
    padding: 0,
  },
  text: {
    fontSize: 20,
    color: colors.green,
    marginBottom: 20,
  },
});
