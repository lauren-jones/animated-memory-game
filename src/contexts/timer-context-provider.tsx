import { useTimer } from "@/lib/hooks";
import { createContext, useContext } from "react";

type TTimerContext = {
  timeElapsed: number;
  resetTimer: () => void;
};

const TimerContext = createContext<TTimerContext | null>(null);

export const TimerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const timer = useTimer();

  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error(
      "useTimerContext must be used within a TimerContextProvider"
    );
  }
  return context;
};
