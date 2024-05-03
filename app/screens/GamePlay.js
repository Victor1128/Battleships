import { View, Text } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";
import AppText from "../components/AppText";

export default function GamePlay({ gameId }) {
  return (
    <SafeView>
      <AppText>GamePlay {gameId}</AppText>
    </SafeView>
  );
}