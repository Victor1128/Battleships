import React, { useState, useContext, useEffect } from "react";

import SafeView from "../components/SafeView";
import gamesApi from "../api/game";
import AuthContext from "../auth/context";
import ListGames from "../components/ListGames";
import AppTextInput from "../components/AppTextInput";

export default function CurrentGames() {
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const getGames = async () => {
    setLoading(true);
    const result = await gamesApi.getGames();
    setError(!result.ok);
    const localGames = result.ok
      ? result.data.games.filter(
          (game) =>
            (game.player1 && game.player1.id === user.userId) ||
            (game.player2 && game.player2.id === user.userId)
        )
      : [];
    setGames(localGames);
    setAllGames(localGames);
    setLoading(false);
  };

  const handleSearch = (text) => {
    setGames(
      allGames.filter(
        (game) =>
          game.player1.email.toLowerCase().includes(text) ||
          (game.player2 && game.player2.email.toLowerCase().includes(text))
      )
    );
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <SafeView>
      <AppTextInput
        icon="magnify"
        placeholder="Player email"
        //onChangeText={(text) => handleSearch(text)}
        onSubmitEditing={(value) => handleSearch(value.nativeEvent.text)}
      />
      <ListGames
        games={games}
        loading={loading}
        error={error}
        getGames={getGames}
        playButtonCondition={(item) => item.status !== "CREATED"}
      />
    </SafeView>
  );
}
