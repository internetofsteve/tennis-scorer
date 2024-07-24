import { Match } from ".";
import { pointAccumulator, scorePointsUntilTieBreak } from "./test-utils";

describe("Tennis Match - Integration Tests", () => {
  it("should throw when a player is invalid", () => {
    expect(() => {
      new Match({ player1Name: "", player2Name: "steve" });
    }).toThrow();
  });

  it("should throw when players are identical", () => {
    expect(() => {
      new Match({ player1Name: "", player2Name: "steve" });
    }).toThrow();
  });

  it("should return score of 1-0 when first player scores first 4 points", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    pointAccumulator({
      match,
      playerName: player1Name,
      numberOfPointsWon: 4,
    });

    expect(match.score()).toBe("1-0");
  });

  it("should return Set score of 0-0 for a brand new match", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });
    expect(match.score()).toBe("0-0");
  });

  it("should return Set score of 1-0 when player 1 has won the first game", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    pointAccumulator({
      match,
      playerName: player1Name,
      numberOfPointsWon: 4,
    });

    expect(match.score()).toBe("1-0");
  });

  it("should return Set score of 0-1 when player 2 has won the first game", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    pointAccumulator({
      match,
      playerName: player2Name,
      numberOfPointsWon: 4,
    });

    expect(match.score()).toBe("0-1");
  });

  it("should return Set score of 1-1 after each player wins a game", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    pointAccumulator({
      match,
      playerName: player1Name,
      numberOfPointsWon: 4,
    });

    pointAccumulator({
      match,
      playerName: player2Name,
      numberOfPointsWon: 4,
    });

    expect(match.score()).toBe("1-1");
  });

  it("should not update the score after a set has been won by player 1", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    pointAccumulator({
      match,
      playerName: player1Name,
      // accumulate enough points won by player 1 to have covered 7 straight sets with 0
      // points won by player2 (4 points per set * 7 sets)
      numberOfPointsWon: 4 * 7,
    });

    expect(match.score()).toBe("6-0");
  });

  it("should not update the score after a set has been won by player 1", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    pointAccumulator({
      match,
      playerName: player2Name,
      // accumulate enough points won by player 1 to have covered 7 straight sets with 0
      // points won by player2 (4 points per set * 7 sets)
      numberOfPointsWon: 4 * 7,
    });

    expect(match.score()).toBe("0-6");
  });

  it("should correctly display deuce after each player has scored 40 during a game", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 30 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 40 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    expect(match.score()).toBe("0-0, Deuce");
  });

  it("should correctly display deuce after each player has scored 40 during a game in second set where first set was won by player 1", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    // First game goes to player 1
    pointAccumulator({
      match,
      playerName: player1Name,
      numberOfPointsWon: 4,
    });

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 30 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 40 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    expect(match.score()).toBe("1-0, Deuce");
  });

  it("should correctly display deuce after each player has scored 40 during a game in second set where first set was won by player 2", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 30 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 40 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // Advantage Player 2
    match.pointWonBy(player2Name);

    // Game goes to Player 2
    match.pointWonBy(player2Name);

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 30 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 40 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    expect(match.score()).toBe("0-1, Deuce");
  });

  it("should correctly display advantaged player after each player has scored 40 and then player 1 scores a point during a game", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 30 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 40 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // Advantage Player 1
    match.pointWonBy(player1Name);

    expect(match.score()).toBe("0-0, Advantage Steve");
  });

  it("should correctly display advantaged player after each player has scored 40 and then player 2 scores a point during a game", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 30 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 40 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // Advantage Player 2
    match.pointWonBy(player2Name);

    expect(match.score()).toBe("0-0, Advantage Pete");
  });

  it("should correctly map a score of 1 point as 15 during '15 all' ", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    expect(match.score()).toBe("0-0, 15-15");
  });

  it("should return 15-30 when game score is 1-2", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 15-30

    match.pointWonBy(player2Name);

    expect(match.score()).toBe("0-0, 15-30");
  });

  it("should return 15-40 when game score is 1-3", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // 15-30
    match.pointWonBy(player2Name);

    // 15-40
    match.pointWonBy(player2Name);

    expect(match.score()).toBe("0-0, 15-40");
  });

  it("should count extra points to the next set", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    // 15 all
    match.pointWonBy(player1Name);
    match.pointWonBy(player2Name);

    // Player 2 wins 4 more points
    pointAccumulator({
      match,
      playerName: player2Name,
      numberOfPointsWon: 4,
    });

    expect(match.score()).toBe("0-1, 0-15");
  });

  it("should handle 7-5 victory", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

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

    // Games 11 and 12 go to Player 1
    pointAccumulator({
      match,
      playerName: player1Name,
      numberOfPointsWon: 4 * 2,
    });

    expect(match.score()).toBe("7-5");
  });

  it("should handle tie break victory", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    scorePointsUntilTieBreak({
      match,
      player1Name,
      player2Name,
    });

    pointAccumulator({
      match,
      playerName: player1Name,
      numberOfPointsWon: 7,
    });

    expect(match.score()).toBe("7-6");
  });

  it("should format tie break score after player 1 scores 6 points", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    scorePointsUntilTieBreak({
      match,
      player1Name,
      player2Name,
    });

    pointAccumulator({
      match,
      playerName: player1Name,
      numberOfPointsWon: 6,
    });

    expect(match.score()).toBe("6-6, 6-0");
  });

  it("should not use the term Deuce during a tie breaker", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    scorePointsUntilTieBreak({
      match,
      player1Name,
      player2Name,
    });

    pointAccumulator({
      match,
      playerName: player1Name,
      numberOfPointsWon: 3,
    });

    pointAccumulator({
      match,
      playerName: player2Name,
      numberOfPointsWon: 3,
    });

    expect(match.score()).toBe("6-6, 3-3");
  });

  it("should not use the term Advantage during a tie breaker", () => {
    const player1Name = "Steve";
    const player2Name = "Pete";
    const match = new Match({ player1Name, player2Name });

    scorePointsUntilTieBreak({
      match,
      player1Name,
      player2Name,
    });

    pointAccumulator({
      match,
      playerName: player1Name,
      numberOfPointsWon: 3,
    });

    pointAccumulator({
      match,
      playerName: player2Name,
      numberOfPointsWon: 3,
    });

    match.pointWonBy(player1Name);

    expect(match.score()).toBe("6-6, 4-3");
  });

  it("should handle the scenario from the code test instructions", () => {
    const match = new Match({
      player1Name: "player 1",
      player2Name: "player 2",
    });
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    expect(match.score()).toBe("0-0, 15-15");

    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    expect(match.score()).toBe("0-0, 40-15");

    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    expect(match.score()).toBe("0-0, Deuce");

    match.pointWonBy("player 1");
    expect(match.score()).toBe("0-0, Advantage player 1");

    match.pointWonBy("player 1");
    expect(match.score()).toBe("1-0");
  });
});
