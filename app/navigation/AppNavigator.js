import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import UserDetails from "../screens/UserDetails";
import Games from "../screens/Games";
// import CurrentGames from "../screens/CurrentGames";
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <Tab.Navigator initialRouteName="Account">
    <Tab.Screen
      name="Your Games"
      component={Games}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="All Games"
      component={Games}
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
