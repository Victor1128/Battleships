import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppButton({
  title,
  style,
  onPress,
  color = "primary",
  disabled = false,
  icon,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: !disabled ? colors[color] : colors.light_medium },
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      {icon ? (
        <MaterialCommunityIcons name={icon} size={24} color="black" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
