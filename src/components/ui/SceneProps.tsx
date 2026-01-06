import { useAppStore } from "@/store";
import { hotkeysConfig } from "@/config/config";

export function SceneProps() {
  const { sceneProps, setSceneProps, randomizeSeed } = useAppStore();

  const getHotkey = (label: string) =>
    hotkeysConfig.find((h) => h.label === label)?.key;

  return (
    <div className="pb-4">
      <div className="ui-section-title">Scene props</div>

      <div className="flex flex-col gap-0">
        <div className="ui-row">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showGrid"
              checked={sceneProps.showGrid}
              onChange={(e) => setSceneProps({ showGrid: e.target.checked })}
            />
            <label
              htmlFor="showGrid"
              className="ui-label text-[12px] cursor-pointer"
            >
              Show Grid
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded border border-[#444] bg-[#222] text-[9px] font-bold">
              {getHotkey("Show Grid")}
            </span>
          </div>
        </div>

        <div className="ui-row">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showHelpers"
              checked={sceneProps.showHelpers}
              onChange={(e) => setSceneProps({ showHelpers: e.target.checked })}
            />
            <label
              htmlFor="showHelpers"
              className="ui-label text-[12px] cursor-pointer"
            >
              Show Helpers
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded border border-[#444] bg-[#222] text-[9px] font-bold">
              {getHotkey("Show Helpers")}
            </span>
          </div>
        </div>

        <div className="ui-row">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoUpdate"
              checked={sceneProps.autoUpdate}
              onChange={(e) => setSceneProps({ autoUpdate: e.target.checked })}
            />
            <label
              htmlFor="autoUpdate"
              className="ui-label text-[12px] cursor-pointer"
            >
              Auto Updates
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded border border-[#444] bg-[#222] text-[9px] font-bold">
              {getHotkey("Auto Updates")}
            </span>
          </div>
        </div>

        <div className="ui-row">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showInfoPanel"
              checked={sceneProps.showInfoPanel}
              onChange={(e) =>
                setSceneProps({ showInfoPanel: e.target.checked })
              }
            />
            <label
              htmlFor="showInfoPanel"
              className="ui-label text-[12px] cursor-pointer"
            >
              Show Info Panel
            </label>
          </div>
          <div className="flex items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded border border-[#444] bg-[#222] text-[9px] font-bold">
              {getHotkey("Show Info Panel")}
            </span>
          </div>
        </div>

        <div className="ui-row">
          <div
            className="group flex cursor-pointer items-center gap-2"
            onClick={randomizeSeed}
          >
            <div className="flex h-4 w-4 items-center justify-center text-gray-500 transition-colors group-hover:text-white">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
                <path d="m18 2 4 4-4 4" />
                <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
                <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
                <path d="m18 14 4 4-4 4" />
              </svg>
            </div>
            <span className="ui-label cursor-pointer text-[12px] transition-colors group-hover:text-white">
              Randomize Building
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded border border-[#444] bg-[#222] text-[9px] font-bold">
              {getHotkey("Randomize")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
