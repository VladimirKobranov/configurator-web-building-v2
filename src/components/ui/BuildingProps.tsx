import { useAppStore } from "@/store";

export function BuildingProps() {
  const { buildingProps, setBuildingProps, randomizeSeed } = useAppStore();

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold">Building props:</h2>
      <ul>
        <li>sizeX: {buildingProps?.sizeX}</li>
        <li>
          <input
            type="range"
            min={buildingProps?.sizeXMin}
            max={buildingProps?.sizeXMax}
            step={1}
            value={buildingProps?.sizeX || 0}
            onChange={(e) => setBuildingProps({ sizeX: +e.target.value })}
          />
        </li>
        <li>sizeY: {buildingProps?.sizeY}</li>
        <li>
          <input
            type="range"
            min={buildingProps?.sizeYMin}
            max={buildingProps?.sizeYMax}
            step={1}
            value={buildingProps?.sizeY || 0}
            onChange={(e) => setBuildingProps({ sizeY: +e.target.value })}
          />
        </li>
        <li>sizeZ: {buildingProps?.sizeZ}</li>
        <li>
          <input
            type="range"
            min={buildingProps?.sizeZMin}
            max={buildingProps?.sizeZMax}
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
            id="stairs"
            checked={buildingProps?.stairs || false}
            onChange={(e) => setBuildingProps({ stairs: e.target.checked })}
          />
          <label htmlFor="stairs" className="cursor-pointer">
            Stairs
          </label>
        </li>

        {buildingProps?.stairs && (
          <>
            <li>
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-sm">
                  Stairs Side: {buildingProps?.stairsSide}
                </span>
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={buildingProps?.stairsSide || 0}
                  onChange={(e) =>
                    setBuildingProps({ stairsSide: +e.target.value })
                  }
                />
              </div>
            </li>
            <li>
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-sm">
                  Stairs Index: {buildingProps?.stairsIndex}
                </span>
                <input
                  type="range"
                  min={1}
                  max={
                    ((buildingProps?.stairsSide === 0 ||
                    buildingProps?.stairsSide === 1
                      ? buildingProps?.sizeX
                      : buildingProps?.sizeZ) || 10) - 2
                  }
                  step={1}
                  value={buildingProps?.stairsIndex || 1}
                  onChange={(e) =>
                    setBuildingProps({ stairsIndex: +e.target.value })
                  }
                />
              </div>
            </li>
          </>
        )}

        <li className="mb-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="brandmauer"
            checked={buildingProps?.brandmauer || false}
            onChange={(e) => setBuildingProps({ brandmauer: e.target.checked })}
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
  );
}
