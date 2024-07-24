import { Players, Score } from "../../common/types";

const MIN_SCORE_FOR_DEUCE = 3;
const MIN_SCORE_FOR_ADVANTAGE = 3;
const SCORE_DIFF_FOR_ADVANTAGE = 1;
const MIN_SCORE_FOR_WIN = 4;
const LEAD_BY_NUM_POINTS_TO_WIN = 2;
const MIN_SCORE_FOR_TIE_BREAKER_WIN = 7;
const LEAD_BY_NUM_POINTS_TO_WIN_TIE_BREAKER = 2;

export const checkForGameWin = (
  playerScore: number,
  opponentScore: number
): boolean =>
  playerScore >= MIN_SCORE_FOR_WIN &&
  playerScore - opponentScore >= LEAD_BY_NUM_POINTS_TO_WIN;

export const checkForTieBreakerGameWin = (
  playerScore: number,
  opponentScore: number
): boolean =>
  playerScore >= MIN_SCORE_FOR_TIE_BREAKER_WIN &&
  playerScore - opponentScore >= LEAD_BY_NUM_POINTS_TO_WIN_TIE_BREAKER;

/**
 * Tennis like to make things difficult and label point as weird values
 * There are a lot of different theories why but that is a story for another time...
 */
export const translatePointsToTennisLingo = (points: number): string => {
  switch (points) {
    case 1:
      return "15";
    case 2:
      return "30";
    case 3:
      return "40";

    default:
      return `${points}`;
  }
};

/**
 * Takes the numerical score for a game and translates it to Tennis-related keywords
 */
export const formatGameScore = (
  [player1Score, player2Score]: Score,
  [player1Name, player2Name]: Players,
  isTieBreaker: boolean
): string => {
  if (isTieBreaker) {
    return `${player1Score}-${player2Score}`;
  }

  const isDeuce =
    player1Score === player2Score && player1Score >= MIN_SCORE_FOR_DEUCE;

  if (isDeuce) {
    return `Deuce`;
  }

  const isAdvantagePlayer1 =
    player1Score >= MIN_SCORE_FOR_ADVANTAGE &&
    player1Score > player2Score &&
    player1Score - player2Score === SCORE_DIFF_FOR_ADVANTAGE;

  if (isAdvantagePlayer1) {
    return `Advantage ${player1Name}`;
  }

  const isAdvantagePlayer2 =
    player2Score >= MIN_SCORE_FOR_ADVANTAGE &&
    player2Score > player1Score &&
    player2Score - player1Score === SCORE_DIFF_FOR_ADVANTAGE;

  if (isAdvantagePlayer2) {
    return `Advantage ${player2Name}`;
  }

  return `${translatePointsToTennisLingo(player1Score)}-${translatePointsToTennisLingo(player2Score)}`;
};
