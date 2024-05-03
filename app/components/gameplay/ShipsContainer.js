import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ship from "./Ship";
import gameSettings from "../../config/gameSettings";

export default function ShipsContainer({ onDragStart, onDragEnd }) {
  return (
    <View>
      <View style={styles.row}>
        <Ship
          size={gameSettings.SHIP_SIZES[0]}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
        <Ship
          size={gameSettings.SHIP_SIZES[1]}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      </View>
      <View style={styles.row}>
        <Ship
          size={gameSettings.SHIP_SIZES[2]}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
        <Ship
          size={gameSettings.SHIP_SIZES[3]}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
        <Ship
          size={gameSettings.SHIP_SIZES[4]}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
});
