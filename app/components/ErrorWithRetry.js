import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import AppButton from "./AppButton";
import colors from "../config/colors";

export default function ErrorWithRetry({ error, errorMessage, onPress }) {
  return (
    error && (
      <View>
        <AppText style={styles.text}>{errorMessage}</AppText>
        <AppButton title="Retry" onPress={onPress} />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.danger,
  },
});
