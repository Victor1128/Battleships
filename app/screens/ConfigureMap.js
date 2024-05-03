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
  const [grid, setGrid] = useState(
    Array(gameSettings.GRID_SIZE).fill(Array(gameSettings.GRID_SIZE).fill(null))
  );

  const gridRef = useRef();

  const handleShipPlacement = (position) => {
    console.log(position);

    gridRef.current.measure((x, y, width, height, pageX, pageY) => {
      console.log(pageX, pageY);
      console.log(position);
    });
  };

  useEffect(() => {
    setUserId(authContext.user.userId);
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
                key={cellIndex}
                style={[
                  styles.cell,
                  { backgroundColor: cell !== null ? "blue" : colors.white },
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
