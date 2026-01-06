import { useAppStore } from "@/store";
import { buildingConfig, hotkeysConfig } from "@/config/config";

export function ActionButtons() {
  const {
    buildingProps,
    setBuildingProps,
    randomizeSeed,
    sendWorkerMessage,
    resetBuildingProps,
  } = useAppStore();

  const getHotkey = (label: string) =>
    hotkeysConfig.find((h) => h.label === label)?.key;

  if (!buildingProps) return null;

  return (
    <div className="px-3 py-3 border-b border-[#333]">
      <div className="flex flex-col gap-3">
        {/* Seed Input */}
        <div className="flex items-center gap-2">
          <span className="ui-label text-[11px]">Seed:</span>
          <input
            type="number"
            className="grow bg-[#1a1a1a] border border-[#333] text-[11px] px-2 py-1 outline-none text-gray-300"
            value={buildingProps.randomSeed}
            onChange={(e) => {
              const val = e.target.value.slice(0, 5);
              setBuildingProps({ randomSeed: +val });
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            className="w-full bg-[#2d3748] hover:bg-[#3b4a64] border border-[#4a5568] text-[11px] font-bold py-1.5 uppercase transition-colors"
            onClick={() => sendWorkerMessage(buildingProps)}
          >
            Build
          </button>
          <div className="flex gap-2">
            <button
              className="flex-1 bg-transparent hover:bg-[#222] border border-[#333] text-[11px] font-bold py-1.5 uppercase transition-colors text-gray-400 hover:text-white"
              onClick={randomizeSeed}
            >
              Randomize
              <span className="ml-2 text-[9px] opacity-40">
                [{getHotkey("Randomize")}]
              </span>
            </button>

            <button
              className="flex-1 bg-transparent hover:bg-[#222] border border-[#333] text-[11px] font-bold py-1.5 uppercase transition-colors text-gray-400 hover:text-white"
              onClick={() => {
                resetBuildingProps();
                sendWorkerMessage(buildingConfig);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
