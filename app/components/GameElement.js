import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";
import TextWithIcon from "./TextWithIcon";
import AppButton from "./AppButton";

export default function GameElement({
  player1Email,
  player2Email,
  status,
  onPress,
}) {
  return (
    <View style={styles.container}>
      {/* <Image
          style={styles.image}
          source={require("../../assets/grid.jpeg")}
        /> */}
      <View style={styles.playersContainer}>
        <TextWithIcon icon={"account"} text={player1Email} />
        <TextWithIcon icon={"account"} text={player2Email} />
      </View>
      <View style={styles.playersContainer}>
        <AppText>Game Status: </AppText>
        <AppText>{status}</AppText>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <AppText>Join</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flexDirection: "row",
    padding: 15,
    borderRadius: 30,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  playersContainer: {
    marginLeft: 10,
    overflow: "hidden",
    flex: 1,
  },
  playerNameContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 25,
    backgroundColor: colors.green,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
