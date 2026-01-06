import { useEffect, useState } from "react";
import Ui from "@/components/ui";
import Scene from "@/components/three/Scene";
import { useAppStore } from "@/store";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { useKeyboard } from "@/hooks/useKeyboard";
import Author from "@/components/ui/Author";
import Title from "@/components/ui/Title";

export default function App() {
  useKeyboard();
  const initWorker = useAppStore((s) => s.initWorker);

  const cleanupWorker = useAppStore((s) => s.cleanupWorker);
  const sendWorkerMessage = useAppStore((s) => s.sendWorkerMessage);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initWorker();
    return () => cleanupWorker();
  }, [initWorker, cleanupWorker]);

  useEffect(() => {
    const timer = setTimeout(() => {
      sendWorkerMessage(useAppStore.getState().buildingProps);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [sendWorkerMessage]);

  return (
    <div className="w-dvw h-dvh p-4 relative">
      {isLoading && <LoadingOverlay message="Initializing scene" />}
      <Scene />
      <Ui />
      <Author />
      <Title />
    </div>
  );
}
