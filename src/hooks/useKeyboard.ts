import { useEffect } from "react";
import { hotkeysConfig } from "@/config/config";
import { useAppStore } from "@/store";

export function useKeyboard() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isHotkey = hotkeysConfig.some(
        (h) => h.key.toLowerCase() === event.key.toLowerCase(),
      );

      if (isHotkey) {
        const { sceneProps, setSceneProps, randomizeSeed } =
          useAppStore.getState();
        const key = event.key.toLowerCase();

        if (key === "g") setSceneProps({ showGrid: !sceneProps.showGrid });
        if (key === "h")
          setSceneProps({ showHelpers: !sceneProps.showHelpers });
        if (key === "u") setSceneProps({ autoUpdate: !sceneProps.autoUpdate });
        if (key === "i")
          setSceneProps({ showInfoPanel: !sceneProps.showInfoPanel });
        if (key === "r") randomizeSeed();

        console.log(`Hotkey pressed: ${event.key}`, event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    console.log("⌨️ Keyboard listener attached");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      console.log("⌨️ Keyboard listener detached");
    };
  }, []);
}
