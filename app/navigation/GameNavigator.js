import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Games from "../screens/Games";
import GameDetails from "../screens/GameDetails";
import GameAdd from "../screens/GameAdd";



const Stack = createStackNavigator();

const GameNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="All Games"
      component={Games}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Game Details" component={GameDetails} />
    <Stack.Screen name="Add Game" component={GameAdd} />
  </Stack.Navigator>
);

export default GameNavigator;
