import { MatchState } from "../common/types";
import {
  checkForGameWin,
  checkForTieBreakerGameWin,
  formatGameScore,
} from "../utils/game-utils";
import { getOpponentIndex, getPlayerIndex } from "../utils/player-utils";
import { isInitialScore, transformToScore } from "../utils/score-utils";
import {
  formatSetScore,
  hasWonSet,
  hasWonSetDuringTieBreaker,
  isTieBreakerRequired,
} from "../utils/tennis-set-utils";

type NewMatchOptions = {
  player1Name: string;
  player2Name: string;
};

/**
 * The main entry point into the tennis scoring system. Everything starts with a new Match().
 * A match needs two players before it can commence.
 */
export class Match {
  /**
   * Stores all dynamic infomation of a Match such as the
   * - players,
   * - the score,
   * - tie breaker status
   * - if the match is over
   * Anything that can change during the course of a Match is considered to be part of the state
   * where as the rules governing the state such as how to calculate a point are stored in
   * stateless util functions (see ../utils)
   */
  private matchState: MatchState;

  constructor({ player1Name, player2Name }: NewMatchOptions) {
    // Typescript will generally prevent this but edge cases such as empty strings can be caught here
    if (!player1Name || !player2Name) {
      throw new Error(
        "Error creating new Match: missing player one or more players. Two players are required"
      );
    }

    // This edge case would not be picked up by Typescript as both players meet the criteria, but
    // the scoring system does not support identical players.
    if (!player1Name.toLocaleLowerCase() || !player2Name.toLocaleLowerCase()) {
      throw new Error("Error creating new Match: Players must be different!");
    }

    const initialState: MatchState = {
      players: [player1Name, player2Name],
      activeGameScore: [0, 0],
      activeGameIsTieBreaker: false,
      activeSetScore: [0, 0],
      isMatchComplete: false,
    };

    this.matchState = initialState;
  }

  /**
   * Simple state reducer that merged current state with new state
   */
  setMatchState(newState: Partial<MatchState>): void {
    this.matchState = {
      ...this.matchState,
      ...newState,
    };
  }

  /**
   * The main function for progressing the Match
   *
   * Calling `pointWonBy` will increment a point to the provided player, unless the Match has ended.
   * - If incrementing the point results in a game being completed, it will trigger a new _tennis_ set
   *   (not to be confused with a Set in Typescript)
   * - This will occur until the Match is considered to be completed based on the number of tennis
   *   sets completed
   *
   * 📝 NOTE - 'player' vs 'opponent'
   * Within the code
   * - The 'player' is the individual who won the point
   * - The 'opponent' is the individual who did not win the point
   */
  pointWonBy(playerName: string): void {
    const {
      players,
      activeGameScore,
      activeSetScore,
      activeGameIsTieBreaker,
      isMatchComplete,
    } = this.matchState;

    if (isMatchComplete) {
      return;
    }

    const player = getPlayerIndex(playerName, players);
    const opponent = getOpponentIndex(player);

    const playerGameScore = activeGameScore[player] + 1;
    const opponentGameScore = activeGameScore[opponent];

    const playerhasWonGame = activeGameIsTieBreaker
      ? checkForTieBreakerGameWin(playerGameScore, opponentGameScore)
      : checkForGameWin(playerGameScore, opponentGameScore);

    if (playerhasWonGame) {
      const playerGamesWon = activeSetScore[player] + 1;
      const opponentGamesWon = activeSetScore[opponent];

      const hasPlayerWonTheSet = activeGameIsTieBreaker
        ? hasWonSetDuringTieBreaker(playerGamesWon)
        : hasWonSet(playerGamesWon, opponentGamesWon);

      const nextGameIsTieBreaker = isTieBreakerRequired(
        playerGamesWon,
        opponentGamesWon
      );

      const setScore = transformToScore({
        playerIndex: player,
        playerScore: playerGamesWon,
        opponentScore: opponentGamesWon,
      });

      this.setMatchState({
        activeGameScore: [0, 0],
        activeGameIsTieBreaker: nextGameIsTieBreaker,
        activeSetScore: setScore,
        isMatchComplete: hasPlayerWonTheSet,
      });
    }

    if (!playerhasWonGame) {
      const nextGameScore = transformToScore({
        playerIndex: player,
        playerScore: playerGameScore,
        opponentScore: opponentGameScore,
      });

      this.setMatchState({
        activeGameScore: nextGameScore,
      });
    }
  }

  /**
   * Prints the score of the match
   * If a game is in progress, the game points are appended to the set score
   */
  score(): string {
    const {
      players,
      activeGameScore,
      activeSetScore,
      isMatchComplete,
      activeGameIsTieBreaker,
    } = this.matchState;

    const setScore = formatSetScore(activeSetScore);

    if (isInitialScore(activeGameScore) || isMatchComplete) {
      return setScore;
    } else {
      const gameScore = formatGameScore(
        activeGameScore,
        players,
        activeGameIsTieBreaker
      );

      return `${setScore}, ${gameScore}`;
    }
  }
}
