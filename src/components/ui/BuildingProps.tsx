import { useAppStore } from "@/store";

export function BuildingProps() {
  const { buildingProps, setBuildingProps } = useAppStore();

  if (!buildingProps) return null;

  return (
    <div className="border-b border-[#333]">
      <div className="ui-section-title">Building props</div>

      <div className="flex flex-col gap-0 pb-2">
        {/* Size X */}
        <div className="px-3 pt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="ui-label text-[11px]">Size X</span>
            <span className="bg-[#222] border border-[#444] px-1 min-w-[24px] text-center text-[10px]">
              {buildingProps.sizeX}
            </span>
          </div>
          <input
            type="range"
            min={buildingProps.sizeXMin}
            max={buildingProps.sizeXMax}
            step={1}
            value={buildingProps.sizeX}
            onChange={(e) => setBuildingProps({ sizeX: +e.target.value })}
            className="h-1"
          />
        </div>

        {/* Size Y (Floors) */}
        <div className="px-3 pt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="ui-label text-[11px]">Size Y (Floors)</span>
            <span className="bg-[#222] border border-[#444] px-1 min-w-[24px] text-center text-[10px]">
              {buildingProps.sizeY}
            </span>
          </div>
          <input
            type="range"
            min={buildingProps.sizeYMin}
            max={buildingProps.sizeYMax}
            step={1}
            value={buildingProps.sizeY}
            onChange={(e) => setBuildingProps({ sizeY: +e.target.value })}
            className="h-1"
          />
        </div>

        {/* Size Z */}
        <div className="px-3 pt-2 pb-1">
          <div className="flex items-center justify-between mb-1">
            <span className="ui-label text-[11px]">Size Z</span>
            <span className="bg-[#222] border border-[#444] px-1 min-w-[24px] text-center text-[10px]">
              {buildingProps.sizeZ}
            </span>
          </div>
          <input
            type="range"
            min={buildingProps.sizeZMin}
            max={buildingProps.sizeZMax}
            step={1}
            value={buildingProps.sizeZ}
            onChange={(e) => setBuildingProps({ sizeZ: +e.target.value })}
            className="h-1"
          />
        </div>

        {/* Offset Row */}
        <div className="px-3 pt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="ui-label text-[11px]">offset</span>
            <span className="bg-[#222] border border-[#444] px-1 min-w-[24px] text-center text-[10px]">
              {buildingProps.offset.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={buildingProps.offset}
            onChange={(e) => setBuildingProps({ offset: +e.target.value })}
            className="h-1"
          />
        </div>

        {/* Stairs */}
        <div className="px-3 py-1 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="stairs"
                checked={buildingProps.stairs}
                onChange={(e) => setBuildingProps({ stairs: e.target.checked })}
              />
              <label
                htmlFor="stairs"
                className="ui-label text-[12px] cursor-pointer"
              >
                Stairs
              </label>
            </div>
            <span className="text-[10px] text-gray-500 font-bold uppercase">
              {buildingProps.stairs ? "ON" : "OFF"}
            </span>
          </div>
          {buildingProps.stairs && (
            <div className="pl-6 flex flex-col gap-2 pt-1">
              {/* Stairs Side */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="ui-label text-[11px]">Side</span>
                  <span className="bg-[#222] border border-[#444] px-1 min-w-[20px] text-center text-[10px]">
                    {buildingProps.stairsSide}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={buildingProps.brandmauer ? 1 : 3}
                  step={1}
                  value={buildingProps.stairsSide}
                  onChange={(e) =>
                    setBuildingProps({ stairsSide: +e.target.value })
                  }
                  className="h-1"
                />
              </div>

              {/* Stairs Position */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="ui-label text-[11px]">Position</span>
                  <span className="bg-[#222] border border-[#444] px-1 min-w-[20px] text-center text-[10px]">
                    {buildingProps.stairsIndex}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={Math.max(
                    1,
                    (buildingProps.stairsSide < 2
                      ? buildingProps.sizeX
                      : buildingProps.sizeZ) - 2,
                  )}
                  step={1}
                  value={buildingProps.stairsIndex}
                  onChange={(e) =>
                    setBuildingProps({ stairsIndex: +e.target.value })
                  }
                  className="h-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Brandmauer */}
        <div className="ui-row">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="brandmauer"
              checked={buildingProps.brandmauer}
              onChange={(e) =>
                setBuildingProps({ brandmauer: e.target.checked })
              }
            />
            <label
              htmlFor="brandmauer"
              className="ui-label text-[12px] cursor-pointer"
            >
              Brandmauer
            </label>
          </div>
          <span className="text-[10px] text-gray-500 font-bold uppercase">
            {buildingProps.brandmauer ? "ON" : "OFF"}
          </span>
        </div>

        {/* AC Unit */}
        <div className="px-3 py-1 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="aircond"
                checked={buildingProps.aircond}
                onChange={(e) =>
                  setBuildingProps({ aircond: e.target.checked })
                }
              />
              <label
                htmlFor="aircond"
                className="ui-label text-[12px] cursor-pointer"
              >
                AC Unit
              </label>
            </div>
            <span className="text-[10px] text-gray-500 font-bold uppercase">
              {buildingProps.aircond ? "ON" : "OFF"}
            </span>
          </div>
          {buildingProps.aircond && (
            <div className="pl-6 pt-1">
              <div className="text-[11px] text-gray-400 mb-1">
                AC Density: {buildingProps.aircondPercent}%
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={buildingProps.aircondPercent}
                onChange={(e) =>
                  setBuildingProps({ aircondPercent: +e.target.value })
                }
                className="h-1"
              />
            </div>
          )}
        </div>

        {/* First Floor Acc */}
        <div className="px-3 py-1 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="firstFloorAcc"
                checked={buildingProps.firstFloorAcc}
                onChange={(e) =>
                  setBuildingProps({ firstFloorAcc: e.target.checked })
                }
              />
              <label
                htmlFor="firstFloorAcc"
                className="ui-label text-[12px] cursor-pointer"
              >
                First Floor Acc
              </label>
            </div>
            <span className="text-[10px] text-gray-500 font-bold uppercase">
              {buildingProps.firstFloorAcc ? "ON" : "OFF"}
            </span>
          </div>
          {buildingProps.firstFloorAcc && (
            <div className="pl-6 pt-1">
              <div className="text-[11px] text-gray-400 mb-1">
                Acc Density: {buildingProps.firstFloorAccPercent}%
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={buildingProps.firstFloorAccPercent}
                onChange={(e) =>
                  setBuildingProps({ firstFloorAccPercent: +e.target.value })
                }
                className="h-1"
              />
            </div>
          )}
        </div>

        {/* Roof Acc */}
        <div className="px-3 py-1 flex flex-col gap-1 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="roofAcc"
                checked={buildingProps.roofAcc}
                onChange={(e) =>
                  setBuildingProps({ roofAcc: e.target.checked })
                }
              />
              <label
                htmlFor="roofAcc"
                className="ui-label text-[12px] cursor-pointer"
              >
                Roof Acc
              </label>
            </div>
            <span className="text-[10px] text-gray-500 font-bold uppercase">
              {buildingProps.roofAcc ? "ON" : "OFF"}
            </span>
          </div>
          {buildingProps.roofAcc && (
            <div className="pl-6 pt-1">
              <div className="text-[11px] text-gray-400 mb-1">
                Roof Acc Density: {buildingProps.roofAccPercent}%
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={buildingProps.roofAccPercent}
                onChange={(e) =>
                  setBuildingProps({ roofAccPercent: +e.target.value })
                }
                className="h-1"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
