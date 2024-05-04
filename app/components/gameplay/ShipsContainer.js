import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ship from "./Ship";
import gameSettings from "../../config/gameSettings";

export default function ShipsContainer({ onDragEnd, availableShips }) {
  return (
    <View style={styles.container}>
      {availableShips.map((item) => {
        return <Ship key={item.id} id={item.id} size={item.size} onDragEnd={onDragEnd} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    height: "20%",
  },
});
