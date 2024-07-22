import { PLAYER_1, PLAYER_2 } from "./constants";

export type PlayerIndex = typeof PLAYER_1 | typeof PLAYER_2;

export type Players = [string, string];

export type Score = [number, number];

export type MatchState = {
  players: Players;
  activeGameScore: Score;
  activeSetScore: Score;
  activeGameIsTieBreaker: boolean;
  isMatchComplete: boolean;
};
