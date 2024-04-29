import { StyleSheet, Text } from "react-native";
import React from "react";
import defaultStyles from "../../config/defaultStyles";

export default function ErrorMessage({ error, visible }) {
  return error && visible && <Text style={styles.errorMessage}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorMessage: {
    color: defaultStyles.colors.danger,
  },
});
