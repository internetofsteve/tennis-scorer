import { PLAYER_1, PLAYER_2 } from "../common/constants";
import { Score } from "../common/types";
import { isInitialScore, transformToScore } from "./score-utils";

describe("Score Utils", () => {
  describe("isInitialScore", () => {
    it.each`
      player1Points | player2Points | expected
      ${0}          | ${0}          | ${true}
      ${1}          | ${0}          | ${false}
      ${0}          | ${1}          | ${false}
    `(
      "should return $expected for score $player1Points - $player2Points",
      ({ player1Points, player2Points, expected }) => {
        const score: Score = [player1Points, player2Points];
        expect(isInitialScore(score)).toBe(expected);
      }
    );
  });

  describe("transformToScore", () => {
    it.each`
      playerScore | opponentScore | playerIndex | expected
      ${1}        | ${0}          | ${PLAYER_1} | ${[1, 0]}
      ${1}        | ${0}          | ${PLAYER_2} | ${[0, 1]}
    `(
      "should return $expected when player in position $playerIndex scored $playerScore and opponent scored $opponentScore",
      ({ playerScore, opponentScore, playerIndex, expected }) => {
        expect(
          transformToScore({
            playerScore,
            opponentScore,
            playerIndex,
          })
        ).toEqual(expected);
      }
    );
  });
});
