import { useEffect } from "react";
import UiPanel from "@/components/ui";
import Scene from "@/components/scene";
import { useAppStore } from "./store";

export default function App() {
  const initWorker = useAppStore((s) => s.initWorker);
  const cleanupWorker = useAppStore((s) => s.cleanupWorker);

  useEffect(() => {
    initWorker();
    return () => cleanupWorker();
  }, [initWorker, cleanupWorker]);

  return (
    <div className="w-dvw h-dvh p-4">
      <Scene />
      <UiPanel />
    </div>
  );
}
