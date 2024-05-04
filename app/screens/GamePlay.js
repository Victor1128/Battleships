import { View, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";

import SafeView from "../components/SafeView";
import AppText from "../components/AppText";
import Grid from "../components/gameplay/Grid";
import gameSettings from "../config/gameSettings";
import { ScrollView } from "react-native-gesture-handler";
import AppButton from "../components/AppButton";
import game from "../api/game";
import ErrorWithRetry from "../components/ErrorWithRetry";
import AuthContext from "../auth/context";

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
  const authContext = useContext(AuthContext);

  //TODO: find an fix bug for test1 (not showing grid idk)
  const getGame = async () => {
    setError(false);
    const result = await game.getGameDetails(gameId);
    setError(!result.ok);
    if (!result.ok) {
      setErrorMessage(result.data.message);
    } else {
      const newUserGrid = initializeGrid();
      result.data.shipsCoord
        .filter((ship) => ship.playerId === authContext.user.userId)
        .forEach((element) => {
          newUserGrid[element.y][letterToNumber(element.x)] = element.hit
            ? "danger"
            : "blue";
        });
      setUserGrid(newUserGrid);

      const newOpponentGrid = initializeGrid();
      result.data.shipsCoord
        .filter((ship) => ship.playerId !== authContext.user.userId)
        .forEach((element) => {
          newOpponentGrid[element.y][letterToNumber(element.x)] = element.hit
            ? "danger"
            : "blue";
        });
      setOpponentGrid(newOpponentGrid);
    }
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
    }
  };

  const onCellPress = (x, y) => {
    if (opponentGrid[x][y] !== null) {
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
      <ScrollView contentContainerStyle={styles.gridsContainer}>
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
});
