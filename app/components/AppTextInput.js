import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/defaultStyles";

export default function AppTextInput({ icon, isPassword = false, ...props }) {
  const [isVisible, setIsVisible] = useState(isPassword);
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      {isPassword && (
        <MaterialCommunityIcons
          name={isVisible ? "eye" : "eye-off"}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
          onPress={() => {
            setIsVisible((prev) => !prev);
          }}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, { width: "100%" }]}
        secureTextEntry={isVisible}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    marginTop: 3,
  },
});
