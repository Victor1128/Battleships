import { View, Image, StyleSheet } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import SafeView from "../components/SafeView";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import authStorage from "../auth/storage";
import AuthContext from "../auth/context";
import authApi from "../api/auth";
import AppText from "../components/AppText";

export default function UserDetails() {
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const authContext = useContext(AuthContext);
  const handleLogout = () => {
    authStorage.deleteToken();
    authContext.setUser(null);
    authApi.removeAuthToken();
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await authApi.getUserDetails();
      if (!response.ok) {
        setError(true);
        setErrorMessage(response.data.message);
        return;
      }
      setUser(response.data);
      console.log(response.data);
    };
    getUser();
    console.log("Here", user);
  }, []);

  if (error) {
    return (
      <SafeView>
        <AppText style={styles.errorMessage}>{errorMessage}</AppText>
      </SafeView>
    );
  }

  return (
    user && (
      <SafeView>
        <View style={styles.userContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/icon.png")}
          />
          <AppText>{user.user.email}</AppText>
        </View>
        <View>
          <AppText style={styles.text}>
            Active games: {user.currentlyGamesPlaying}
          </AppText>
          <AppText style={styles.text}>
            Games Played: {user.gamesPlayed - user.currentlyGamesPlaying}
          </AppText>
          <AppText style={styles.text}>Games Won: {user.gamesWon}</AppText>
          <AppText style={styles.text}>Games Lost: {user.gamesLost}</AppText>
          {user.gamesPlayed - user.currentlyGamesPlaying !== 0 && (
            <AppText>
              Winning Percentage:
              {(
                user.gamesWon /
                (user.gamesPlayed - user.currentlyGamesPlaying)
              ).toFixed(2) * 100}
              %
            </AppText>
          )}
        </View>
        <AppButton
          style={styles.button}
          title="Logout"
          color="danger"
          onPress={handleLogout}
        />
      </SafeView>
    )
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statsContainer: {},
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },
  errorMessage: {
    color: colors.danger,
  },
  text: {
    marginTop: 10,
  },
  button: {
    position: "absolute",
    bottom: 0,
  },
});
