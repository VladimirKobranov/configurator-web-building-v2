import { useEffect, useState } from "react";
import Ui from "@/components/ui";
import Scene from "@/components/three/Scene";
import { useAppStore } from "@/store";

export default function App() {
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
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-4 bg-black/20 backdrop-blur-sm p-8 rounded-2xl">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            <p className="text-white text-lg font-medium drop-shadow-md">
              Initializing scene...
            </p>
          </div>
        </div>
      )}
      <Scene />
      <Ui />
    </div>
  );
}
