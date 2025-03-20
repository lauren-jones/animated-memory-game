import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GameContextProvider } from "./contexts/game-context-provider.tsx";
import { AudioContextProvider } from "./contexts/audio-context-provider.tsx";
import { TimerContextProvider } from "./contexts/timer-context-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AudioContextProvider>
      <GameContextProvider>
        <TimerContextProvider>
          <App />
        </TimerContextProvider>
      </GameContextProvider>
    </AudioContextProvider>
  </StrictMode>
);
