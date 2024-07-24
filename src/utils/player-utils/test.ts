import { getOpponentIndex, getPlayerIndex } from ".";

describe("Player Utils", () => {
  describe("getPlayerIndex", () => {
    it("should return 0 for first player", () => {
      expect(getPlayerIndex("steve", ["steve", "pete"])).toBe(0);
    });

    it("should return 1 for first player", () => {
      expect(getPlayerIndex("pete", ["steve", "pete"])).toBe(1);
    });
  });

  describe("getOpponentIndex", () => {
    it("should return 1 when given 0", () => {
      expect(getOpponentIndex(1)).toBe(0);
    });

    it("should return 0 when given 1", () => {
      expect(getOpponentIndex(0)).toBe(1);
    });
  });
});
