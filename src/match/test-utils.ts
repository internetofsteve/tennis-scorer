import { Match } from ".";

type PointAccumulatorOptions = {
  match: Match;
  playerName: string;
  numberOfPointsWon: number;
};

/**
 * Convenience function for repeatedly adding a point for
 * a player of a match
 */
export const pointAccumulator = ({
  match,
  playerName,
  numberOfPointsWon,
}: PointAccumulatorOptions): void => {
  for (let index = 0; index < numberOfPointsWon; index++) {
    match.pointWonBy(playerName);
  }
};

type ScoringUtilOptions = {
  match: Match;
  player1Name: string;
  player2Name: string;
};

/**
 * Quickly score enough points to reach a tie breaker game
 * so that tei breaker edge cases can then be tested with minimal setup
 */
export const scorePointsUntilTieBreak = ({
  match,
  player1Name,
  player2Name,
}: ScoringUtilOptions) => {
  // Games 1,2,3,4,5 go to Player 1
  pointAccumulator({
    match,
    playerName: player1Name,
    numberOfPointsWon: 4 * 5,
  });

  // Games 6,7,8,9,10 go to Player 2
  pointAccumulator({
    match,
    playerName: player2Name,
    numberOfPointsWon: 4 * 5,
  });

  // Games 11 goes to Player 1
  pointAccumulator({
    match,
    playerName: player1Name,
    numberOfPointsWon: 4,
  });

  // Games 12 goes to Player 2
  pointAccumulator({
    match,
    playerName: player2Name,
    numberOfPointsWon: 4,
  });

  // Games are now 6-6
};
