import { useEffect, useLayoutEffect, useState } from "react";
import Ui from "@/components/ui";
import Scene from "@/components/three/Scene";
import { useAppStore } from "@/store";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useThemeStore } from "@/store/theme";

export default function App() {
  useKeyboard();
  const initWorker = useAppStore((s) => s.initWorker);

  const cleanupWorker = useAppStore((s) => s.cleanupWorker);
  const sendWorkerMessage = useAppStore((s) => s.sendWorkerMessage);

  const [isLoading, setIsLoading] = useState(true);
  const theme = useThemeStore((s) => s.theme);
  const systemDark = useThemeStore((s) => s.systemDark);
  const setSystemDark = useThemeStore((s) => s.setSystemDark);

  useLayoutEffect(() => {
    const dark = theme === "dark" || (theme === "system" && systemDark);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [theme, systemDark]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [setSystemDark]);

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
    <div className="app-shell w-dvw h-dvh relative">
      {isLoading && <LoadingOverlay message="Initializing scene" />}
      <Scene />
      <Ui />
    </div>
  );
}
