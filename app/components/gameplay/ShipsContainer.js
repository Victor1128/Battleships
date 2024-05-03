import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ship from "./Ship";
import gameSettings from "../../config/gameSettings";

export default function ShipsContainer({ onDragEnd }) {
  return (
    <View style={styles.container}>
      {gameSettings.SHIP_SIZES.map((item, index) => {
        return <Ship key={index} size={item} onDragEnd={onDragEnd} />;
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
