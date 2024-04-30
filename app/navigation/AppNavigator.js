import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import UserDetails from "../screens/UserDetails";
import GameNavigator from "./GameNavigator";
import CurrentGamesNavigator from "./CurrentGamesNavigator";
// import CurrentGames from "../screens/CurrentGames";
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <Tab.Navigator
    initialRouteName="Games"
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen
      name="Your Games"
      component={CurrentGamesNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Games"
      component={GameNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="ship-wheel" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={UserDetails}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AuthNavigator;
