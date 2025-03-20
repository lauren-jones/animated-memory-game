import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TTile } from "./types";
import { EMOJIS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const generateTiles = (): TTile[] => {
  const pairs = EMOJIS.flatMap((emoji, i) => [
    { id: i * 2, emoji, flipped: false, matched: false },
    { id: i * 2 + 1, emoji, flipped: false, matched: false },
  ]);

  return shuffleArray(pairs);
};
