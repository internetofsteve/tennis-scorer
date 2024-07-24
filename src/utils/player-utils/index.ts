import { PLAYER_1, PLAYER_2 } from "../../common/constants";
import { MatchState, PlayerIndex } from "../../common/types";

export const getPlayerIndex = (
  playerName: string,
  players: MatchState["players"]
): PlayerIndex => {
  const playerIndex = players.indexOf(playerName);

  if (playerIndex !== PLAYER_1 && playerIndex !== PLAYER_2) {
    throw new Error(`Player ${playerName} not found`);
  }

  return playerIndex;
};

export const getOpponentIndex = (playerIndex: PlayerIndex): PlayerIndex =>
  playerIndex === PLAYER_1 ? PLAYER_2 : PLAYER_1;
