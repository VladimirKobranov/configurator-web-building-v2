import { CameraProps } from "./ui/CameraProps";
import { BuildingProps } from "./ui/BuildingProps";
import { SceneProps } from "./ui/SceneProps";
import { ActionButtons } from "./ui/ActionButtons";
import { InfoPanel } from "./ui/InfoPanel";
import { HotkeysOverlay } from "./ui/HotkeysOverlay";

export default function Ui() {
  return (
    <>
      <div className="z-100 text-white fixed top-6 left-6 w-80 ui-panel flex flex-col pointer-events-auto">
        <CameraProps />
        <BuildingProps />
        <SceneProps />
        <ActionButtons />
      </div>

      <HotkeysOverlay />
      <InfoPanel />
    </>
  );
}
