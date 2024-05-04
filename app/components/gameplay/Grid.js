import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import gameSettings from "../../config/gameSettings";
import colors from "../../config/colors";
import AppButton from "../AppButton";

export default function Grid({ grid }) {
  return (
    <View style={styles.container}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex.toString()} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <TouchableWithoutFeedback
              key={rowIndex.toString() + cellIndex.toString()}
            >
              <View
                style={[
                  styles.cell,
                  {
                    backgroundColor:
                      cell !== null ? colors[cell] : colors.white,
                  },
                ]}
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    zIndex: 1,
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
