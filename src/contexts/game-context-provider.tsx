import { useGameState } from "@/lib/hooks";
import { TGameState } from "@/lib/types";
import { createContext, useContext } from "react";

type TGameContext = {
  gameState: TGameState;
  startGame: () => void;
  endGame: () => void;
};

const GameContext = createContext<TGameContext | null>(null);

export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const game = useGameState();

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
};
