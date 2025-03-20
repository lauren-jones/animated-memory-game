import { Megaphone, MegaphoneOff } from "lucide-react";
import { Button } from "./ui/button";
import { useAudioContext } from "@/contexts/audio-context-provider";
import Timer from "./timer";

export default function Header() {
  const { hasSound, toggleSound } = useAudioContext();

  return (
    <header className="flex w-full justify-between items-center">
      <Timer />

      <Button variant="secondary" size="icon" onClick={toggleSound}>
        {hasSound ? (
          <MegaphoneOff className="w-10 h-10" />
        ) : (
          <Megaphone className="w-10 h-10" />
        )}
      </Button>
    </header>
  );
}
