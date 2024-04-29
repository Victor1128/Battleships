import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserDetails from "../screens/UserDetails";
const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Details"
      component={UserDetails}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
