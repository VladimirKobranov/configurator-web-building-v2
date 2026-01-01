import { useAppStore } from "@/store";
import { buildingConfig } from "@/config/config";

export function ActionButtons() {
  const { sendWorkerMessage, buildingProps, resetBuildingProps } =
    useAppStore();

  return (
    <div className="flex gap-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded grow"
        onClick={() => sendWorkerMessage(buildingProps)}
      >
        Build
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded grow"
        onClick={() => {
          resetBuildingProps();
          sendWorkerMessage(buildingConfig);
        }}
      >
        Reset
      </button>
    </div>
  );
}
