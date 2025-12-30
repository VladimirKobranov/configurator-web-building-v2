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
    randomizeSeed,
    autoUpdate,
    setAutoUpdate,
    sceneProps,
    setSceneProps,
    selectedItem,
    setSelectedItem,
  } = useAppStore();

  const fmt = (v: number[]) => v.map((n) => n.toFixed(2)).join(", ");

  return (
    <div className="z-100 text-white fixed top-10 left-10">
      <div>
        <h2 className="text-lg font-bold">Camera props:</h2>
        <ul>
          <li>position: [{fmt(camProps.position)}]</li>
          <li>target: [{fmt(camProps.target)}]</li>
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

        <div className="mb-4">
          <h3>Auto Rotate speed: {autoRotateSpeed}</h3>
          <input
            type="range"
            min={0}
            max={5}
            step={0.25}
            value={autoRotateSpeed}
            onChange={(e) => setAutoRotateSpeed(+e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold">Building props:</h2>
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

          <li className="mb-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="brandmauer"
              checked={buildingProps?.brandmauer || false}
              onChange={(e) =>
                setBuildingProps({ brandmauer: e.target.checked })
              }
            />
            <label htmlFor="brandmauer" className="cursor-pointer">
              Brandmauer
            </label>
          </li>

          <li className="mb-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="aircond"
              checked={buildingProps?.aircond || false}
              onChange={(e) => setBuildingProps({ aircond: e.target.checked })}
            />
            <label htmlFor="aircond" className="cursor-pointer">
              AC Unit
            </label>
          </li>

          {buildingProps?.aircond && (
            <li>
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-sm">
                  AC Density: {buildingProps?.aircondPercent}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={buildingProps?.aircondPercent || 0}
                  onChange={(e) =>
                    setBuildingProps({ aircondPercent: +e.target.value })
                  }
                />
              </div>
            </li>
          )}

          <li className="mb-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="firstFloorAcc"
              checked={buildingProps?.firstFloorAcc || false}
              onChange={(e) =>
                setBuildingProps({ firstFloorAcc: e.target.checked })
              }
            />
            <label htmlFor="firstFloorAcc" className="cursor-pointer">
              First Floor Acc
            </label>
          </li>

          {buildingProps?.firstFloorAcc && (
            <li>
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-sm">
                  Acc Density: {buildingProps?.firstFloorAccPercent}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={buildingProps?.firstFloorAccPercent || 0}
                  onChange={(e) =>
                    setBuildingProps({ firstFloorAccPercent: +e.target.value })
                  }
                />
              </div>
            </li>
          )}

          <li className="mb-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="roofAcc"
              checked={buildingProps?.roofAcc || false}
              onChange={(e) => setBuildingProps({ roofAcc: e.target.checked })}
            />
            <label htmlFor="roofAcc" className="cursor-pointer">
              Roof Acc
            </label>
          </li>

          {buildingProps?.roofAcc && (
            <li>
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-sm">
                  Roof Acc Density: {buildingProps?.roofAccPercent}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={buildingProps?.roofAccPercent || 0}
                  onChange={(e) =>
                    setBuildingProps({ roofAccPercent: +e.target.value })
                  }
                />
              </div>
            </li>
          )}

          <li>seed: {buildingProps?.randomSeed}</li>
          <li className="mb-4 mt-2">
            <div className="flex gap-2 flex-col w-full">
              <input
                type="number"
                min={0}
                max={99999}
                className="w-full text-black px-2 py-1 bg-gray-100 rounded"
                value={buildingProps?.randomSeed}
                onChange={(e) => {
                  const val = e.target.value.slice(0, 5);
                  setBuildingProps({ randomSeed: +val });
                }}
              />
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={randomizeSeed}
              >
                Randomize
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Scene props:</h2>
        <div className="mb-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={sceneProps.showGrid}
            onChange={(e) => setSceneProps({ showGrid: e.target.checked })}
          />
          <label htmlFor="showGrid" className="cursor-pointer">
            Show Grid
          </label>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={sceneProps.showHelpers}
            onChange={(e) => setSceneProps({ showHelpers: e.target.checked })}
          />
          <label htmlFor="showHelpers" className="cursor-pointer">
            Show Helpers
          </label>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="autoUpdate"
            checked={autoUpdate}
            onChange={(e) => setAutoUpdate(e.target.checked)}
          />
          <label htmlFor="autoUpdate" className="cursor-pointer">
            Auto Update
          </label>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-grow"
          onClick={() => sendWorkerMessage(buildingProps)}
        >
          Build
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-grow"
          onClick={() => {
            resetBuildingProps();
            sendWorkerMessage(buildingConfig);
          }}
        >
          Reset
        </button>
      </div>

      {/* Right side UI for selected item */}
      {selectedItem && (
        <div className="z-100 text-white fixed top-10 right-10">
          <div>
            <h2 className="text-lg font-bold">Element Info:</h2>
            <ul>
              <li>Type: {selectedItem.type}</li>
              <li>Instance ID: {selectedItem.instanceId}</li>
              <li>
                Position: [{selectedItem.item.position.x.toFixed(2)},{" "}
                {selectedItem.item.position.y.toFixed(2)},{" "}
                {selectedItem.item.position.z.toFixed(2)}]
              </li>
              {selectedItem.item.rotationY !== undefined && (
                <li>Rotation Y: {selectedItem.item.rotationY.toFixed(2)}</li>
              )}
              {selectedItem.item.sideIndex !== undefined && (
                <li>Side Index: {selectedItem.item.sideIndex}</li>
              )}
            </ul>
            <button
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded w-full"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
