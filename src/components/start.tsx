import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useGameContext } from "@/contexts/game-context-provider";

export default function Start() {
  const { startGame } = useGameContext();

  return (
    <motion.div className="m-auto  rounded-xl flex flex-col gap-5 justify-center items-center grow w-full h-full max-w-[600px]">
      <Button size="lg" onClick={startGame}>
        Start Game
      </Button>
    </motion.div>
  );
}
