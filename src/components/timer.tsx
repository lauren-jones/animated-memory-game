import { useTimerContext } from "@/contexts/timer-context-provider";

export default function Timer() {
  const { timeElapsed } = useTimerContext();

  return (
    <div className="text-3xl text-yellow">
      {Math.floor(timeElapsed / 60)}:
      {(timeElapsed % 60).toString().padStart(2, "0")}
    </div>
  );
}
