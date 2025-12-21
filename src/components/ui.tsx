import { useAppStore } from "@/store";
import { buildingConfig } from "@/config/config";

export default function Ui() {
  const {
    autoRotateSpeed,
    setAutoRotateSpeed,
    camProps,
    setCamProps,
    sendWorkerMessage,
    buildingProps,
    setBuildingProps,
    resetBuildingProps,
  } = useAppStore();

  const fmt = (v: number[]) => v.map((n) => n.toFixed(2)).join(", ");

  return (
    <div className="z-100 text-white fixed top-10 left-10">
      <div className="mb-4">
        <h1>Auto Rotate speed: {autoRotateSpeed}</h1>
        <input
          type="range"
          min={0}
          max={5}
          step={0.25}
          value={autoRotateSpeed}
          onChange={(e) => setAutoRotateSpeed(+e.target.value)}
        />
      </div>

      <div>
        <h2>Camera props:</h2>
        <ul>
          <li>position: [{fmt(camProps.position)}]</li>
          <li>rotation: [{fmt(camProps.rotation)}]</li>
          <li>fov: {camProps.fov.toFixed(3)}</li>
        </ul>

        <input
          type="range"
          min={20}
          max={120}
          step={1}
          value={camProps.fov}
          onChange={(e) => setCamProps({ fov: +e.target.value })}
        />
      </div>

      <div>
        <h2>Building props:</h2>
        <ul>
          <li>sizeX: {buildingProps?.sizeX}</li>
          <li>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={buildingProps?.sizeX || 0}
              onChange={(e) => setBuildingProps({ sizeX: +e.target.value })}
            />
          </li>
          <li>sizeY: {buildingProps?.sizeY}</li>
          <li>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={buildingProps?.sizeY || 0}
              onChange={(e) => setBuildingProps({ sizeY: +e.target.value })}
            />
          </li>
          <li>sizeZ: {buildingProps?.sizeZ}</li>
          <li>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={buildingProps?.sizeZ || 0}
              onChange={(e) => setBuildingProps({ sizeZ: +e.target.value })}
            />
          </li>
          <li>offset: {buildingProps?.offset.toFixed(1)}</li>
          <li>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={buildingProps?.offset || 0}
              onChange={(e) => setBuildingProps({ offset: +e.target.value })}
            />
          </li>
        </ul>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => sendWorkerMessage(buildingProps)}
        >
          Build
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            resetBuildingProps();
            sendWorkerMessage(buildingConfig);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
