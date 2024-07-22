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

export class Match {
  private matchState: MatchState;

  constructor({ player1Name, player2Name }: NewMatchOptions) {
    this.matchState = {
      players: [player1Name, player2Name],
      activeGameScore: [0, 0],
      activeGameIsTieBreaker: false,
      activeSetScore: [0, 0],
      isMatchComplete: false,
    };
  }

  setMatchState(newState: Partial<MatchState>): void {
    this.matchState = {
      ...this.matchState,
      ...newState,
    };
  }

  /**
   * Given a match only has two players, return the key "Player1" or "Player2" based on the provided
   * players name
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

    const player = getPlayerIndex(playerName, players); // player just won the point
    const opponent = getOpponentIndex(player); // opponent did not win the point

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
