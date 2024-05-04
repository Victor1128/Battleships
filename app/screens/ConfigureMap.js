import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import React, {
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import SafeView from "../components/SafeView";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import gameSettings from "../config/gameSettings";
import Ship from "../components/gameplay/Ship";
import ShipsContainer from "../components/gameplay/ShipsContainer";
import Grid from "../components/gameplay/Grid";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import game from "../api/game";
import ErrorWithRetry from "../components/ErrorWithRetry";

export default function ConfigureMap({ route, navigation }) {
  const authContext = useContext(AuthContext);
  const [userId, setUserId] = useState();
  const [gameId, setGameId] = useState(route.params.id);
  const [xGrid, setXGrid] = useState(1);
  const [yGrid, setYGrid] = useState(1);
  const [ships, setShips] = useState([]);
  const [availableShips, setAvailableShips] = useState(
    gameSettings.AVAILABLE_SHIPS
  );
  const [errorMessage, setErrorMessage] = useState();
  const [error, setError] = useState(false);
  const [grid, setGrid] = useState(() => {
    const initialGrid = [];
    for (let i = 0; i < gameSettings.GRID_SIZE; i++) {
      initialGrid.push(Array(gameSettings.GRID_SIZE).fill(null));
    }
    return initialGrid;
  });
  const statusBarHeight = StatusBar.currentHeight || 0;

  const xGridRef = useRef(xGrid);
  const yGridRef = useRef(yGrid);
  const gridRef = useRef();
  const shipsRef = useRef(ships);
  const availableShipsRef = useRef(availableShips);
  const physicalGridRef = useRef(grid);

  useEffect(() => {
    physicalGridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    xGridRef.current = xGrid;
    yGridRef.current = yGrid;
  }, [xGrid, yGrid]);

  useEffect(() => {
    shipsRef.current = ships;
  }, [ships]);

  useEffect(() => {
    availableShipsRef.current = availableShips;
  }, [availableShips]);

  useEffect(() => {
    setUserId(authContext.user.userId);
  }, []);

  const handleShipPlacement = (shipId, size, isHorizontal, position) => {
    // return true if the ship is placed successfully
    const { x, y } = position;
    console.log("position", x, y);
    console.log("Grid", xGridRef.current, yGridRef.current);
    console.log("grid2", xGrid, yGrid);
    const cellX = Math.floor((x - xGridRef.current) / gameSettings.CELL_SIZE);
    const cellY = Math.floor((y - yGridRef.current) / gameSettings.CELL_SIZE);
    console.log("ships", shipsRef.current);
    console.log("Cells:", cellX, cellY, size, isHorizontal);
    if (isPlacementValid(size, isHorizontal, cellX, cellY)) {
      placeShip(size, isHorizontal, cellX, cellY);
      setShips([
        ...shipsRef.current,
        {
          size,
          id: shipId,
          direction: isHorizontal ? "HORIZONTAL" : "VERTICAL",
          x: String.fromCharCode(65 + cellX),
          y: cellY + 1,
        },
      ]);
      setAvailableShips(
        availableShipsRef.current.filter(({ id }) => id !== shipId)
      );
      return true;
    }
    return false;
  };

  const placeShip = (size, isHorizontal, x, y) => {
    const newGrid = [...physicalGridRef.current];
    if (isHorizontal) {
      for (let i = 0; i < size; i++) {
        newGrid[y][x + i] = "blue";
      }
    } else {
      for (let i = 0; i < size; i++) {
        newGrid[y + i][x] = "blue";
      }
    }
    setGrid(newGrid);
  };

  const isPlacementValid = (size, isHorizontal, x, y) => {
    if (
      x >= gameSettings.GRID_SIZE ||
      y >= gameSettings.GRID_SIZE ||
      x < 0 ||
      y < 0
    )
      return false;
    if (isHorizontal) {
      if (x + size > gameSettings.GRID_SIZE) {
        return false;
      }
      for (let i = 0; i < size; i++) {
        if (physicalGridRef.current[y][x + i] !== null) {
          return false;
        }
      }
    } else {
      if (y + size > gameSettings.GRID_SIZE) {
        return false;
      }
      for (let i = 0; i < size; i++) {
        if (physicalGridRef.current[y + i][x] !== null) {
          return false;
        }
      }
    }
    return true;
  };

  const setInitialGridCoordinates = () => {
    if (gridRef.current)
      gridRef.current.measure((x, y, width, height, pageX, pageY) => {
        console.log("initial1", x, y, width, height, pageX, pageY);
        console.log("status bar", statusBarHeight);
        setXGrid(pageX - statusBarHeight);
        setYGrid(pageY - statusBarHeight);
      });
  };

  const handleSubmit = async () => {
    ships.forEach((ship) => {
      delete ship.id;
    });
    const response = await game.configureMap(gameId, { ships });
    console.log(response);
    setError(!response.ok);
    if (!response.ok) {
      setErrorMessage(response.data.message);
      return;
    }
    console.log(gameId);
    navigation.navigate("Gameplay", { gameId });
  };

  const handleReset = () => {
    setGrid(() => {
      const initialGrid = [];
      for (let i = 0; i < gameSettings.GRID_SIZE; i++) {
        initialGrid.push(Array(gameSettings.GRID_SIZE).fill(null));
      }
      return initialGrid;
    });
    setAvailableShips(gameSettings.AVAILABLE_SHIPS);
    setShips([]);
  };

  // const handleUndo = () => {
  //   console.log(pastGrids.pop());
  //   console.log(pastGrids);
  //   console.log("undo", pastGrids.length, ships.length);
  //   console.log("pastGrids", pastGrids);
  //   console.log("pastGrids2", pastGrids[pastGrids.length - 2]);
  //   console.log("grid", grid);
  //   console.log(grid === pastGrids[pastGrids.length - 1]);
  //   if (pastGrids.length > 1) {
  //     setGrid(pastGrids[pastGrids.length - 2]);
  //     pastGrids.pop();

  //     const lastShip = ships[ships.length - 1];
  //     setShips(ships.slice(0, ships.length - 1));
  //     setAvailableShips([
  //       ...availableShips,
  //       gameSettings.AVAILABLE_SHIPS.find(({ id }) => id === lastShip.id),
  //     ]);
  //   }
  // };

  return (
    <SafeView style={styles.container}>
      <ShipsContainer
        onDragEnd={handleShipPlacement}
        availableShips={availableShips}
      />
      <View
        ref={gridRef}
        style={styles.gridContainer}
        onLayout={setInitialGridCoordinates}
      >
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              // <TouchableWithoutFeedback key={cellIndex}>
              <View
                key={rowIndex.toString() + cellIndex.toString()}
                style={[
                  styles.cell,
                  {
                    backgroundColor:
                      cell === null ? colors.white : colors[cell],
                  },
                ]}
              />
              // </TouchableWithoutFeedback>
            ))}
          </View>
        ))}
      </View>
      {/* <Grid /> */}
      <ErrorWithRetry errorMessage={errorMessage} error={error} retry={false} />
      <View style={styles.buttonsContainer}>
        <AppButton
          icon="trash-can-outline"
          color="danger"
          onPress={handleReset}
          style={styles.circularButton}
        />
        <AppButton
          disabled={ships.length !== gameSettings.AVAILABLE_SHIPS.length}
          icon="check"
          color="green"
          onPress={handleSubmit}
          style={styles.circularButton}
        />
        {/* <AppButton
          icon="undo"
          color="yellow"
          onPress={() => console.log("not working")}
          style={styles.circularButton}
        /> */}
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  gridContainer: {
    marginTop: 30,
    zIndex: 1,
    left: "10%",
    // alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: gameSettings.CELL_SIZE,
    height: gameSettings.CELL_SIZE,
    borderWidth: 1,
    borderColor: colors.dark,
  },
  button: { width: 200 },
  circularButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 0,
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
  },
  // shipsPanel: {
  //   alignItems: "center",
  //   paddingVertical: 10,
  // },
  // ship: {
  //   width: 100,
  //   height: 40,
  //   backgroundColor: "blue",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 5,
  //   marginHorizontal: 5,
  // },
  // shipText: {
  //   color: "white",
  // },
  // boardContainer: {
  //   flexDirection: "row",
  // },
  // cell: {
  //   width: gameSettings.CELL_SIZE,
  //   height: gameSettings.CELL_SIZE,
  //   borderWidth: 1,
  //   borderColor: "black",
  // },
});
