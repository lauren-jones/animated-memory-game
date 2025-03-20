import { useGridLogic } from "@/lib/hooks";
import { motion } from "framer-motion";
import Tile from "./tile";
import { Button } from "./ui/button";
import { useGameContext } from "@/contexts/game-context-provider";

export default function Grid() {
  const { grid, handleTileClick, restartGame } = useGridLogic();
  const { gameState } = useGameContext();

  return (
    <motion.div
      className="relative m-auto grow grid grid-cols-3 grid-rows-4 w-full h-full max-w-[600px]"
      animate={{ rotateY: gameState === "gameover" ? 180 : 0 }}
      initial={{ rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {gameState === "play" ? (
        grid.map((tile) => (
          <Tile
            key={tile.id}
            tile={tile}
            onClick={() => handleTileClick(tile)}
          />
        ))
      ) : (
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex flex-col gap-8 justify-center items-center bg-black border border-lilac text-white text-4xl font-bold rounded-xl"
          style={{
            transform: "rotateY(180deg)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>You are on fire! 🔥</p>
          <Button size="lg" onClick={restartGame}>
            Play Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
