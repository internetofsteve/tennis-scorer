import {
  checkForGameWin,
  checkForTieBreakerGameWin,
  formatGameScore,
  translatePointsToTennisLingo,
} from ".";

describe("Game utils", () => {
  describe("checkForGameWin", () => {
    it("should return true when player has won", () => {
      expect(checkForGameWin(4, 1)).toBe(true);
    });

    it("should return false when player has not won", () => {
      expect(checkForGameWin(3, 1)).toBe(false);
    });
  });

  describe("checkForTieBreakerGameWin", () => {
    it("should return true when player has won", () => {
      expect(checkForTieBreakerGameWin(7, 5)).toBe(true);
    });

    it("should return false when player has met normal game win conditions", () => {
      expect(checkForTieBreakerGameWin(4, 1)).toBe(false);
    });
  });

  describe("translatePointsToTennisLingo", () => {
    it("should handle 15", () => {
      expect(translatePointsToTennisLingo(1)).toBe("15");
    });
    it("should handle 30", () => {
      expect(translatePointsToTennisLingo(2)).toBe("30");
    });
    it("should handle 40", () => {
      expect(translatePointsToTennisLingo(3)).toBe("40");
    });
    it("should return the points when they do not map to a key tennis term", () => {
      expect(translatePointsToTennisLingo(4)).toBe("4");
    });
  });
  describe("formatGameScore", () => {
    it("should not use tennis terms during a tie breaker", () => {
      const isTieBreaker = true;
      expect(formatGameScore([3, 3], ["steve", "pete"], isTieBreaker)).toBe(
        "3-3"
      );
    });

    it("should use tennis term deuce when not in a tie breaker and points are event", () => {
      const isTieBreaker = false;
      expect(formatGameScore([3, 3], ["steve", "pete"], isTieBreaker)).toBe(
        "Deuce"
      );
    });

    it("should use tennis term Advantage when not in a tie breaker and points are event", () => {
      const isTieBreaker = false;
      expect(formatGameScore([3, 4], ["steve", "pete"], isTieBreaker)).toBe(
        "Advantage pete"
      );
    });
  });
});
