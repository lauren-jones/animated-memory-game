export type TGameState = "start" | "play" | "gameover";

export type TTile = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};
