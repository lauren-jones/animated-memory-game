import { useAudio } from "@/lib/hooks";
import { PlayFunction } from "node_modules/use-sound/dist/types";
import { createContext, useContext } from "react";

type TAudioContext = {
  hasSound: Boolean;
  toggleSound: () => void;
  playMatch: PlayFunction;
  playFlip: PlayFunction;
  playWin: PlayFunction;
};

const AudioContext = createContext<TAudioContext | null>(null);

export const AudioContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const audio = useAudio();

  return (
    <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error(
      "useAudioContext must be used within an AudioContextProvider"
    );
  }
  return context;
};
