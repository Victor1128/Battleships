import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";

import SafeView from "../components/SafeView";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import gameSettings from "../config/gameSettings";
import Ship from "../components/gameplay/Ship";
import ShipsContainer from "../components/gameplay/ShipsContainer";
import Grid from "../components/gameplay/Grid";
import colors from "../config/colors";

export default function ConfigureMap({ route, navigation }) {
  const authContext = useContext(AuthContext);
  const [userId, setUserId] = useState();
  const [gameId, setGameId] = useState(route.params.gameId);
  const [grid, setGrid] = useState(() => {
    const initialGrid = [];
    for (let i = 0; i < gameSettings.GRID_SIZE; i++) {
      initialGrid.push(Array(gameSettings.GRID_SIZE).fill(null));
    }
    return initialGrid;
  });
  const [xGrid, setXGrid] = useState(42.31111145019531);
  const [yGrid, setYGrid] = useState(219.022216796875);

  const gridRef = useRef();

  const handleShipPlacement = (size, isHorizontal, position) => {
    // return true if the ship is placed successfully
    const { x, y } = position;
    console.log("position", x, y);
    console.log("Grid", xGrid, yGrid);
    const cellX = Math.round((x - xGrid) / gameSettings.CELL_SIZE);
    const cellY = Math.round((y - yGrid) / gameSettings.CELL_SIZE);
    console.log(cellX, cellY, size, isHorizontal);
    if (isPlacementValid(size, isHorizontal, cellX, cellY)) {
      placeShip(size, isHorizontal, cellX, cellY);
      console.log(grid);
      return true;
    }
    return false;
  };

  const placeShip = (size, isHorizontal, x, y) => {
    if (isHorizontal) {
      for (let i = 0; i < size; i++) {
        colorCell(x + i, y);
      }
    } else {
      for (let i = 0; i < size; i++) {
        colorCell(x, y + i);
      }
    }
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
      if (x + size >= gameSettings.GRID_SIZE) {
        return false;
      }
      for (let i = 0; i < size; i++) {
        if (grid[y][x + i] !== null) {
          return false;
        }
      }
    } else {
      if (y + size >= gameSettings.GRID_SIZE) {
        return false;
      }
      for (let i = 0; i < size; i++) {
        if (grid[y + i][x] !== null) {
          return false;
        }
      }
    }
    return true;
  };

  const colorCell = (x, y) => {
    const newGrid = [...grid];
    newGrid[y][x] = "blue";
    console.log(x, y);
    console.log(grid[y] === grid[y + 1]);
    setGrid(newGrid);
  };

  const setInitialGridCoordinates = (x, y) => {
    setXGrid(x);
    setYGrid(y);
  };

  useEffect(() => {
    const f = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      gridRef.current.measure((x, y, width, height, pageX, pageY) => {
        console.log("initial1", x, y, width, height, pageX, pageY);
        setInitialGridCoordinates(pageX, pageY);
      });
    };
    setUserId(authContext.user.userId);
    f();
  }, []);

  return (
    <SafeView style={styles.container}>
      <ShipsContainer onDragEnd={handleShipPlacement} />
      <View ref={gridRef} style={styles.gridContainer}>
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
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    position: "absolute",
    top: 0,
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
