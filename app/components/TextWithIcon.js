import { View, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

export default function TextWithIcon({ icon, text }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={colors.medium}
        style={{ marginRight: 5 }}
      />
      <AppText numberOfLines={1}>{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
