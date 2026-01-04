import { CameraProps } from "./ui/CameraProps";
import { BuildingProps } from "./ui/BuildingProps";
import { SceneProps } from "./ui/SceneProps";
import { ActionButtons } from "./ui/ActionButtons";
import { InfoPanel } from "./ui/InfoPanel";

export default function Ui() {
  return (
    <>
      <div className="z-100 text-white fixed top-10 left-10 w-80">
        <CameraProps />
        <BuildingProps />
        <SceneProps />
        <ActionButtons />
      </div>

      <InfoPanel />
    </>
  );
}
