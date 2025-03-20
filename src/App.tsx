import Grid from "./components/grid";
import Header from "./components/header";
import Start from "./components/start";

import { useGameContext } from "./contexts/game-context-provider";

function App() {
  const { gameState } = useGameContext();

  return (
    <div className="bg-black text-white box-border min-h-screen">
      <div className="max-w-[1110px] m-auto py-8 md:py-10 px-8 flex flex-col gap-12 justify-between min-h-screen">
        <Header />

        {gameState === "start" && <Start />}
        {gameState !== "start" && <Grid />}
      </div>
    </div>
  );
}

export default App;
