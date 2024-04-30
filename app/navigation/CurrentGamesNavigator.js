import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CurrentGames from "../screens/CurrentGames";
import Game from "../screens/Game";


const Stack = createStackNavigator();

const CurrentGamesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="View Games"
      component={CurrentGames}
    />
    <Stack.Screen name="Game" component={Game} />
  </Stack.Navigator>
);

export default CurrentGamesNavigator;
