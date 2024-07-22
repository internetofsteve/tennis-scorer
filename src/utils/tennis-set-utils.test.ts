import { hasWonSet } from "./tennis-set-utils";

describe("Set Utils", () => {
  describe("hasWonSet", () => {
    it.each`
      playerGamesWon | opponentGamesWon | expected
      ${6}           | ${4}             | ${true}
      ${5}           | ${4}             | ${false}
      ${3}           | ${4}             | ${false}
      ${0}           | ${0}             | ${false}
      ${1}           | ${1}             | ${false}
      ${6}           | ${6}             | ${false}
    `(
      "should return $expected when a player just won $playerGamesWon and the opponent has won $opponentGamesWon games",
      ({ playerGamesWon, opponentGamesWon, expected }) => {
        expect(hasWonSet(playerGamesWon, opponentGamesWon)).toBe(expected);
      }
    );
  });
});
