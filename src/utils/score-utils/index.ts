import { PLAYER_1, PLAYER_2 } from "../../common/constants";
import { PlayerIndex, Score } from "../../common/types";

export const transformToScore = ({
  playerScore,
  playerIndex,
  opponentScore,
}: {
  playerScore: number;
  playerIndex: PlayerIndex;
  opponentScore: number;
}): Score => {
  return [
    playerIndex === PLAYER_1 ? playerScore : opponentScore,
    playerIndex === PLAYER_2 ? playerScore : opponentScore,
  ];
};

export const isInitialScore = (score: Score): boolean =>
  score[PLAYER_1] === 0 && score[PLAYER_2] === 0;
