import { useEffect, useState } from "react";
import { TGameState, TTile } from "./types";
import { generateTiles } from "./utils";
import useSound from "use-sound";
import { useGameContext } from "@/contexts/game-context-provider";
import { useAudioContext } from "@/contexts/audio-context-provider";
import { useTimerContext } from "@/contexts/timer-context-provider";

export const useGameState = () => {
  const [gameState, setGameState] = useState<TGameState>("start");

  const startGame = () => setGameState("play");
  const endGame = () => setGameState("gameover");

  return { gameState, startGame, endGame };
};

export const useGridLogic = () => {
  const [grid, setGrid] = useState<TTile[]>(generateTiles());
  const [selectedTiles, setSelectedTiles] = useState<TTile[]>([]);
  const { hasSound, playFlip, playMatch, playWin } = useAudioContext();
  const { startGame, endGame } = useGameContext();
  const { resetTimer } = useTimerContext();

  const handleTileClick = (clickedTile: TTile) => {
    if (clickedTile.flipped || clickedTile.matched) return;

    if (hasSound) playFlip();

    setGrid((prevGrid) =>
      prevGrid.map((tile) =>
        tile.id === clickedTile.id ? { ...tile, flipped: true } : tile
      )
    );

    setSelectedTiles((prev) => [...prev, clickedTile]);

    if (selectedTiles.length === 1) {
      checkForMatch(selectedTiles[0], clickedTile);
    }
  };

  const checkForMatch = (tile1: TTile, tile2: TTile) => {
    if (tile1.emoji === tile2.emoji) {
      if (hasSound) playMatch();

      setGrid((prevGrid) =>
        prevGrid.map((tile) =>
          tile.id === tile1.id || tile.id === tile2.id
            ? { ...tile, matched: true }
            : tile
        )
      );
    } else {
      setTimeout(() => {
        setGrid((prevGrid) =>
          prevGrid.map((tile) =>
            tile.id === tile1.id || tile.id === tile2.id
              ? { ...tile, flipped: false }
              : tile
          )
        );
      }, 520);
    }

    setSelectedTiles([]);
  };

  useEffect(() => {
    if (grid.every((tile) => tile.matched)) {
      if (hasSound) playWin();
      endGame();
    }
  }, [grid]);

  const restartGame = () => {
    setGrid(generateTiles());
    setSelectedTiles([]);
    resetTimer();
    startGame();
  };

  return {
    grid,
    handleTileClick,
    restartGame,
  } as const;
};

export const useAudio = () => {
  const [hasSound, setHasSound] = useState(true);
  const [playFlip] = useSound("/sounds/flip.mp3", {
    volume: 0.5,
    enabled: hasSound,
  });
  const [playMatch] = useSound("/sounds/match.mp3", {
    volume: 0.5,
    enabled: hasSound,
  });
  const [playWin] = useSound("/sounds/win.mp3", {
    volume: 0.5,
    enabled: hasSound,
  });

  const toggleSound = () => {
    setHasSound((prev) => !prev);
  };

  return { playMatch, playFlip, playWin, hasSound, toggleSound } as const;
};

export const useTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { gameState } = useGameContext();

  useEffect(() => {
    if (gameState !== "play") return;

    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState === "play"]);

  const resetTimer = () => {
    setTimeElapsed(0);
  };

  return { timeElapsed, resetTimer };
};
