import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import gameSettings from "../../config/gameSettings";
import colors from "../../config/colors";
import AppButton from "../AppButton";

export default function Grid() {
  const [grid, setGrid] = useState(
    Array(gameSettings.GRID_SIZE).fill(Array(gameSettings.GRID_SIZE).fill(null))
  );

  const myRef = useRef();

  const handleMeasure = () => {
    myRef.current.measure((x, y, width, height, pageX, pageY) => {
      console.log(pageX, pageY, width, height);
    });
  };

  return (
    <View
      ref={myRef}
      style={styles.container}
      onLayout={(event) => {
        layout = event.nativeEvent.layout;
        console.log(layout.width, layout.height);
        console.log(layout);
      }}
    >
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <TouchableWithoutFeedback key={cellIndex}>
              <View
                key={cellIndex}
                style={[
                  styles.cell,
                  { backgroundColor: cell !== null ? "blue" : colors.white },
                ]}
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
      ))}
      <AppButton title="Measure" onPress={handleMeasure} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    zIndex: 1,
    left: "10%",
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
});
