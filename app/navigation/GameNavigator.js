import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Games from "../screens/Games";
import GameAdd from "../screens/GameAdd";
import ConfigureMap from "../screens/ConfigureMap";
import GamePlay from "../screens/GamePlay";

const Stack = createStackNavigator();

const GameNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="All Games"
      component={Games}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen name="Game Details">
      {({ route }) => <GameDetails gameId={route.params.gameId} />}
    </Stack.Screen> */}
    <Stack.Screen name="Configure Map" component={ConfigureMap} />
    <Stack.Screen name="Gameplay" component={GamePlay} />
    <Stack.Screen name="Add Game" component={GameAdd} />
  </Stack.Navigator>
);

export default GameNavigator;
