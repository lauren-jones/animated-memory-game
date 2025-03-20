import { TTile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type TileProps = {
  tile: TTile;
  onClick: () => void;
};

export default function Tile({ tile, onClick }: TileProps) {
  return (
    <motion.div
      className={cn(
        "relative flex justify-center items-center w-full h-full hover:cursor-pointer",
        { "hover:cursor-pointer": !tile.matched || !tile.flipped }
      )}
      onClick={onClick}
    >
      <motion.div
        className="absolute w-full h-full flex justify-center items-center bg-lilac border border-black text-6xl rounded-xl"
        style={{ backfaceVisibility: "hidden" }}
        animate={{ rotateY: tile.flipped ? 180 : 0 }}
        initial={{ rotateY: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className={cn(
          "absolute w-full h-full flex justify-center items-center bg-purple border border-black text-6xl rounded-xl",
          {
            "bg-yellow": tile.matched,
          }
        )}
        style={{ backfaceVisibility: "hidden" }}
        animate={{ rotateY: tile.flipped ? 0 : -180 }}
        initial={{ rotateY: -180 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {tile.emoji}
      </motion.div>
    </motion.div>
  );
}
