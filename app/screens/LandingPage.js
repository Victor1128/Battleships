import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import routes from "../navigation/routes";

export default function LandingPage() {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../../assets/ships.jpg")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.tagline}>BATTLESHIPS</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
