import { PLAYER_1, PLAYER_2 } from "../../common/constants";
import { Score } from "../../common/types";

const MIN_GAMES_TO_WIN_SET = 6;
const LEAD_BY_NUM_GAMES_TO_WIN_SET = 2;
const MIN_GAMES_TO_WIN_SET_TIE_BREAKER = 7;

/**
 * determine if the number of games won is enough to win a set
 */
export const hasWonSet = (
  playerSetScore: number,
  opponentSetScore: number
): boolean =>
  playerSetScore >= MIN_GAMES_TO_WIN_SET &&
  playerSetScore - opponentSetScore >= LEAD_BY_NUM_GAMES_TO_WIN_SET;

/**
 * Determing if the number of games won is enough to win a set during a tie breaker
 */
export const hasWonSetDuringTieBreaker = (gamesWon: number): boolean =>
  gamesWon === MIN_GAMES_TO_WIN_SET_TIE_BREAKER;

/**
 * Determine if a score is 6-6 and if so, indicate the need for a tie breaker game
 */
export const isTieBreakerRequired = (
  playerSetScore: number,
  opponentSetScore: number
): boolean => {
  return (
    playerSetScore === MIN_GAMES_TO_WIN_SET &&
    opponentSetScore === MIN_GAMES_TO_WIN_SET
  );
};

export const formatSetScore = (score: Score) =>
  `${score[PLAYER_1]}-${score[PLAYER_2]}`;
